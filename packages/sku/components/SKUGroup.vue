<template>
  <div class="ease-sku-group">
    <div class="group-title">
      <span class="group-title__label">规格名：</span>
      <el-select size="mini" v-model="skuValue" placeholder="请选择"
        allow-create
        filterable
        :filter-method="filterMethod"
        @change="handleSelectSku">
        <el-option
          v-for="item in ease.skuTreeData"
          :key="item[optionValue]"
          :label="item[optionText]"
          :value="item[optionValue]">
        </el-option>
      </el-select>
      <el-checkbox size="mini" v-if="index === 0 && ease.showAddSkuImage" class="check-img" v-model="hasSkuImage" @change="handleCheckedSkuImage">添加规格图片</el-checkbox>
      <i class="el-icon-error group-remove" @click="onSkuRemove(index)"></i>
    </div>
    <sku-container :sku="sku" :hasSkuImage="hasSkuImage" :onSkuLeafChange="handleSkuLeafChange"/>
    <div class="sku-notice">
      <template v-if="hasSkuImage">
        <p>目前只支持为第一个规格设置不同的规格图片</p>
        <p>设置后，用户选择不同规格会显示不同图片</p>
        <p>建议尺寸：640 x 640像素</p>
      </template>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Select, Option, Checkbox } from 'element-ui'
import SKUContainer from './SKUContainer'

Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)

const noop = res => res

export default {
  inject: [
    'ease'
  ],

  components: {
    'sku-container': SKUContainer
  },

  data () {
    return {
      skuValue: '',
      newsSkuText: '',
      hasSkuImage: this.sku.leaf
        ? this.sku.leaf.some(item => item.img_url)
        : false
    }
  },

  props: {
    index: {
      type: Number,
      default: 0
    },
    sku: {
      type: Object,
      default () {
        return {}
      }
    },
    // 自定义sku的id key
    optionValue: {
      type: String,
      default: 'id'
    },
    // 自定义sku的text key
    optionText: {
      type: String,
      default: 'text'
    },
    onSkuChange: {
      type: Function,
      default: noop
    },
    onSkuRemove: {
      type: Function,
      default: noop
    }
  },

  methods: {
    filterMethod (keyword) {
      // let { optionText } = this
      // if (this.ease.skuTreeData.some(item => item[optionText] === keyword)) return

      // this.newsSkuText = keyword
    },
    // 选择sku
    handleSelectSku (value) {
      let { index, optionValue } = this

      if (typeof (value) === 'number') {
        let sku = this.ease.skuTreeData.find(item => item[optionValue] === value)
        sku.leaf = []
        if (this.onSkuChange(sku, index) === false) {
          this.skuValue = ''
        }
        return
      }

      this.createSku(value)
    },
    // 创建sku
    createSku (text) {
      let { sku, index, optionValue, optionText } = this

      this.ease.onCreateGroup(text).then(data => {
        if (data > 0) {
          sku = {
            [optionValue]: data,
            [optionText]: text,
            leaf: []
          }

          this.onSkuChange(sku, index)
        }
      })
    },
    handleCheckedSkuImage (checked) {
      let { sku, index } = this
      sku.leaf = sku.leaf.map(item => {
        item.is_show = checked
        return item
      })

      this.onSkuChange(sku, index)
    },
    handleSkuLeafChange (leaf) {
      let { sku, index } = this
      sku.leaf = leaf
      console.log(sku.leaf)
      this.onSkuChange(sku, index)
    }
  },

  watch: {
    sku: {
      deep: true,
      immediate: true,
      handler (sku) {
        if (sku[this.optionValue]) {
          this.$nextTick(() => {
            this.skuValue = sku[this.optionValue]
          })
        }
      }
    }
  }

  // updated () {
  //   if (this.sku[this.optionValue]) {
  //     this.skuValue = this.sku[this.optionValue]
  //   }
  // }
}
</script>

<style lang="scss">
.ease-sku-group {
  overflow: hidden;

  &:hover {
    .group-remove {
      margin-right: 0;
      opacity: 1;
    }
  }

  .group-title {
    padding: 7px 10px;
    background-color: #f8f8f8;
    color: #666;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .group-title__label {
    font-size: 12px;
  }

  .group-remove {
    position: absolute;
    right: 10px;
    top: 12px;
    cursor: pointer;
    transition: all .3s;
    margin-right: -40px;
    opacity: 0;
  }

  .check-img {
    margin-left: 12px;

    .el-checkbox__label {
      font-size: 12px;
      color: #666;
      font-weight: 400;
    }

    .el-checkbox__inner {
      display: block;
    }
  }

  .sku-notice {
    padding: 0 10px;
    color: #999;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 14px;

    p {
      padding: 0;
      margin: 6px 0 0;
    }
  }
}
</style>
