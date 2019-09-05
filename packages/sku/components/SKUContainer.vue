<template>
  <div class="group-container">
    <div class="sku-list">
      <span class="sku-list__label">规格值：</span>
      <div class="sku-list__body">
        <div class="sku-item"
          v-for="(item, index) in sku.leaf"
          :key="index">
          <div>
            <el-tag slot="reference" size="small" effect="plain" closable @close="handleRemoveSkuLeaf(index)">{{ item[optionText] }}</el-tag>
          </div>
          <div v-if="hasSkuImage" class="sku-item__upload">
            <div class="arrow"></div>
            <div class="upload-img">
              <el-upload
                :action="ease.action"
                :headers="ease.headers"
                :accept="ease.accept"
                :name="ease.uploadName"
                class="img-uploader"
                :show-file-list="false"
                :on-success="(response, file, fileList) => handleUploadSuccess(response, file, fileList, item[optionValue])">
                <el-image v-if="item.img_url" :src="item.img_url"></el-image>
                <i v-else class="el-icon-upload uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </div>
        <div class="sku-item" v-if="sku[optionValue] > 0">
          <el-popover
            placement="bottom"
            width="200"
            trigger="click"
            v-model="visiable">
            <el-select
              class="popover-select"
              size="mini"
              v-model="leafValue"
              multiple
              filterable
              allow-create
              placeholder="规格值"
              @change="createSkuLeaf"
              @visible-change="status => !status && this.handleSelectSku()"
              :popper-append-to-body="false">
              <el-option
                v-for="item in skuOptions"
                :key="item[optionValue]"
                :label="item[optionText]"
                :value="item[optionValue]">
              </el-option>
            </el-select>
            <!-- <div style="text-align: right; margin: 10px 0 0">
              <el-button size="mini" type="text" @click="handleHideVisiable">取消</el-button>
              <el-button type="primary" size="mini" @click="handleSelectSku">确定</el-button>
            </div> -->
            <el-tag slot="reference" size="small" class="cursor"><i class="el-icon-circle-plus"></i></el-tag>
          </el-popover>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Popover, Tag, Image, Upload, Button, Select } from 'element-ui'

Vue.use(Popover)
Vue.use(Tag)
Vue.use(Image)
Vue.use(Upload)
Vue.use(Button)
Vue.use(Select)

const noop = res => res

export default {
  inject: [
    'ease'
  ],

  data () {
    return {
      visiable: false,
      leafValue: [],
      skuOptions: [],
      id: 0
    }
  },

  props: {
    sku: {
      type: Object,
      default () {
        return {}
      }
    },
    hasSkuImage: {
      type: Boolean,
      default: false
    },
    onSkuLeafChange: {
      type: Function,
      default: noop
    }
  },

  computed: {
    optionValue () {
      return this.ease.optionValue
    },

    optionText () {
      return this.ease.optionText
    }
  },

  watch: {
    sku: {
      deep: true,
      immediate: true,
      handler (sku) {
        this.fetchLeafById(sku[this.optionValue])
      }
    }
  },

  methods: {
    handleHideVisiable () {
      this.visiable = false
    },

    handleResetLeafValue () {
      this.leafValue = []
    },

    fetchLeafById (id) {
      if (!id) return

      this.ease.onFetchSku(id).then(skuOptions => {
        this.id = id
        this.skuOptions = skuOptions
      })
    },

    handleRemoveSkuLeaf (index) {
      let { sku } = this
      sku.leaf.splice(index, 1)

      this.onSkuLeafChange(sku.leaf)
    },

    handleRemoveImage (id) {
      let { sku, optionValue } = this
      sku.leaf.forEach(item => {
        if (item[optionValue] === id) {
          item.img_url = ''
        }
      })

      this.onSkuLeafChange(sku.leaf)
    },

    createSkuLeaf (data) {
      let { sku, optionValue, skuOptions } = this
      // 过滤需要新增的规格值
      data = data.filter(item => typeof (item) === 'string')
      if (!data.length) return

      this.ease.onCreateSku({
        data: data,
        id: sku[optionValue]
      }).then((options) => {
        // const options = data.map(item => {
        //   return {
        //     id: parseInt(Math.random() * 100, 10) + parseInt(Math.random() * 100, 10),
        //     text: item
        //   }
        // })

        skuOptions.push(...options)

        this.$nextTick(() => {
          const values = options.map(item => item.id)
          this.leafValue = this.leafValue.filter(item => typeof (item) === 'number')
          this.leafValue.push(...values)
        })
      })
    },

    handleSelectSku () {
      let { sku, hasSkuImage, optionValue, skuOptions, leafValue } = this

      let skuLeaf = skuOptions.filter(item => leafValue.indexOf(item[optionValue]) >= 0)
      skuLeaf.map(item => {
        item.is_show = hasSkuImage
      })

      let skuLeafIds = sku.leaf.map(item => item[optionValue])
      skuLeaf.forEach(item => {
        if (skuLeafIds.indexOf(item[optionValue]) < 0) {
          sku.leaf.push(item)
        }
      })

      this.handleResetLeafValue()
      this.handleHideVisiable()
      this.onSkuLeafChange(sku.leaf)
    },

    handleUploadSuccess (response, file, fileList, id) {
      let { sku, optionValue } = this

      sku.leaf.forEach(item => {
        if (item[optionValue] === id) {
          item.img_url = response.img_url
        }
      })

      this.onSkuLeafChange(sku.leaf)
    }
  },

  created () {
    let { sku, optionValue } = this

    sku[optionValue] = this.fetchLeafById(sku[optionValue])
  }
}
</script>

<style lang="scss">
.group-container {
  padding: 10px 10px 0;
  color: #666;
  font-size: 12px;

  .sku-list {
    display: flex;
    flex-flow: row;
    align-items: center;

    .sku-item {
      display: inline-block;
      margin-right: 10px;
    }

    .sku-list__icon {
      font-size: 20px;
    }
  }

  .cursor {
    cursor: pointer;
  }

  .sku-list__body {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
  }
}

  .popover-select {
    width: 100% !important;
  }

.sku-item__upload {
  margin-top: 6px;
  padding: 4px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: #fff;
  position: relative;
  margin-bottom: 10px;

  .arrow {
    position: absolute;
    width: 0;
    height: 0;
    top: -8px;
    left: 10%;
    border-style: solid;
    border-color: transparent;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #333;

    &::after {
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      top: 0;
      margin-left: -10px;
      border-color: transparent transparent #fff;
      border-style: solid;
      border-width: 0 10px 10px;
      content: "";
    }
  }

  .el-image, .img-uploader, .uploader-icon {
    width: 84px;
    height: 84px;
  }

  .uploader-icon {
    line-height: 84px;
    font-size: 30px;
  }

  .el-image {
    display: block;
  }
}
</style>
