<template>
  <div id="app">
    <div class="container">
      <vue-sku
        v-model="value"
        action="http://localhost:8081/index.php"
        :skuTree="skuTree"
        :onFetchGroup="fetchSkuTree"
        :onFetchSku="fetchSku"
        :onCreateGroup="createGroup"
        :onCreateSku="createSku"
        @onChange="change"/>
        <pre>{{value}}</pre>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Sku from '../packages/sku'

Vue.use(Sku)

const skuTree = [
  {
    id: 10740,
    text: '颜色'
  },
  {
    id: 40732,
    text: '尺寸'
  }
]

const sku = [
  {
    id: 3,
    text: '蓝色'
  },
  {
    id: 10,
    text: '红色'
  },
  {
    id: 30,
    text: '土豪金'
  },
  {
    id: 137,
    text: '黑色'
  },
  {
    id: 138,
    text: '灰色'
  }
]

export default {
  data () {
    return {
      value: [],
      skuTree
    }
  },

  methods: {
    fetchSkuTree () {
      return new Promise(resolve => {
        resolve(skuTree)
      })
    },

    fetchSku (id) {
      return new Promise(resolve => {
        resolve(sku)
      })
    },

    createGroup (text) {
      return new Promise((resolve, reject) => {
        if (text) {
          resolve(parseInt(Math.random() * 100, 10) + 1)
        } else {
          reject(new Error())
        }
      })
    },

    createSku (data) {
      return new Promise((resolve, reject) => {
        resolve(data)
      })
    },

    change (data) {
    }
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  justify-content: center;
  padding-top: 20px;

  .container {
    width: 1000px;
  }
}
</style>
