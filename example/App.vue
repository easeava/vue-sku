<template>
  <div id="app">
    <div class="container">
      <vue-sku
        v-model="value"
        action="http://localhost:8081/index.php"
        :sku-tree="skuTree"
        :on-fetch-group="fetchSkuTree"
        :on-fetch-sku="fetchSku"
        :on-create-group="createGroup"
        :on-create-sku="createSku"
        @on-change="change"/>
      <sku-table :data="value" :flatten="flatten" @on-change-data="handleChangeData" />
      <br>
      <small>规格组合
        <pre>{{value}}</pre>
      </small>
      <small>表格组合
        <pre>{{data}}</pre>
      </small>
    </div>
  </div>
</template>

<script>
import { Sku, SkuTable } from '../packages/sku'

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
  },
  {
    id: 121,
    text: 'xxl'
  },
  {
    id: 94,
    text: 'xxxl'
  }
]

export default {
  components: {
    'vue-sku': Sku,
    'sku-table': SkuTable
  },
  data () {
    return {
      value: [
        {
          'id': 10740,
          'text': '颜色',
          'leaf': [
            {
              'id': 3,
              'text': '蓝色',
              'is_show': false
            },
            {
              'id': 10,
              'text': '红色',
              'is_show': false
            }
          ]
        },
        {
          'id': 40732,
          'text': '尺寸',
          'leaf': [
            {
              'id': 121,
              'text': 'xxl',
              'is_show': false
            },
            {
              'id': 94,
              'text': 'xxxl',
              'is_show': false
            }
          ]
        }
      ],
      skuTree,
      data: [],
      flatten: [
        {
          'skus': [
            {
              'k_id': 10740,
              'k': '颜色',
              'v_id': 3,
              'v': '蓝色'
            },
            {
              'k_id': 40732,
              'k': '尺寸',
              'v_id': 121,
              'v': 'xxl'
            }
          ],
          'price': 222222,
          'stock': 12222,
          'marked_price': 12312
        },
        {
          'skus': [
            {
              'k_id': 10740,
              'k': '颜色',
              'v_id': 3,
              'v': '蓝色'
            },
            {
              'k_id': 40732,
              'k': '尺寸',
              'v_id': 94,
              'v': 'xxxl'
            }
          ],
          'price': 233333,
          'stock': 222222,
          'marked_price': 111111
        },
        {
          'skus': [
            {
              'k_id': 10740,
              'k': '颜色',
              'v_id': 10,
              'v': '红色'
            },
            {
              'k_id': 40732,
              'k': '尺寸',
              'v_id': 121,
              'v': 'xxl'
            }
          ]
        },
        {
          'skus': [
            {
              'k_id': 10740,
              'k': '颜色',
              'v_id': 10,
              'v': '红色'
            },
            {
              'k_id': 40732,
              'k': '尺寸',
              'v_id': 94,
              'v': 'xxxl'
            }
          ]
        }
      ]
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
        console.log(data)
        resolve(data.data.map(item => {
          return {
            id: parseInt(Math.random() * 100, 10) + parseInt(Math.random() * 100, 10),
            text: item
          }
        }))
      })
    },

    change (data) {
    },

    handleChangeData (data) {
      this.data = data
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
