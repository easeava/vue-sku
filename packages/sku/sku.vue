<template>
  <div class="ease-sku">
    <sku-group
      v-for="(item, index) in data"
      :key="index"
      :index="index"
      :sku="item"
      :skuTree="skuTreeData"
      :onSkuChange="rebuildSku"
      :onSkuRemove="handleSkuRemove"/>
    <sku-button v-if="data.length < maxSize" :onClick="addSku" />
  </div>
</template>

<script>
import SKUGroup from './components/SKUGroup'
import SKUButton from './components/SKUButton'
import { Message } from 'element-ui'

const noop = res => res
const noopPromise = () => Promise.resolve(noop)

export default {
  name: 'vue-sku',

  provide () {
    return {
      'ease': this
    }
  },

  data () {
    return {
      data: this.value,
      skuTreeData: this.skuTree
    }
  },

  watch: {
    data: {
      deep: true,
      immediate: true,
      handler (value) {
        this.$emit('input', value)
      }
    },

    skuTree (skuTree) {
      this.skuTreeData = skuTree
    }
  },

  props: {
    maxSize: {
      type: Number,
      default: 3
    },
    showAddSkuImage: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    action: {
      type: String,
      default: ''
    },
    headers: {
      type: Object,
      default () {
        return {}
      }
    },
    accept: {
      type: String,
      default: ''
    },
    uploadName: {
      type: String,
      default: 'resource'
    },
    // 可选规格列表
    skuTree: {
      type: Array,
      default () {
        return []
      }
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
    // 异步获取规格列表
    onFetchGroup: {
      type: Function,
      default: noopPromise
    },
    // 异步获取规格可选值
    onFetchSku: {
      type: Function,
      default: noopPromise
    },
    // 创建新的规格名
    onCreateGroup: {
      type: Function,
      default: noopPromise
    },
    // 创建新的规格值
    onCreateSku: {
      type: Function,
      default: noopPromise
    }
  },

  components: {
    'sku-group': SKUGroup,
    'sku-button': SKUButton
  },

  methods: {
    addSku () {
      this.data.push({
        leaf: []
      })
    },

    rebuildSku (sku, index) {
      let { skuTreeData, optionValue } = this

      if (
        this.data.some(
          (item, idx) => item[optionValue] === sku[optionValue] && index !== idx
        )
      ) {
        Message.error('规格名不能重复')
        return false
      }

      this.$set(this.data, index, Object.assign({}, sku))

      if (!skuTreeData.some(item => item[optionValue] === sku[optionValue])) {
        skuTreeData.push(sku)
      }

      this.$emit('on-change', this.data)
    },

    handleSkuRemove (index) {
      let { data } = this
      data.splice(index, 1)

      this.$emit('on-change', this.data)
    }
  },

  beforeMount () {
    let { onFetchGroup } = this
    if (typeof (onFetchGroup) === 'function') {
      onFetchGroup().then(skuTree => {
        this.skuTreeData = skuTree
      })
    }
  }
}
</script>

<style lang="scss">
.ease-sku {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
}
</style>
