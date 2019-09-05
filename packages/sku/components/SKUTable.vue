<template>
  <div class="ease-sku-table">
    {{columns}}
    <el-table
      size="mini"
      :data="lists">
      <el-table-column
        :label="label" v-for="(label, index) in columns" :key="index">
        <template>
          {{index}}
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="160">
        <template>
          <el-input-number size="mini"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        prop="stock"
        label="库存"
        width="160">
        <template>
          <el-input-number size="mini"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        prop="marked_price"
        label="成本价"
        width="160">
        <template>
          <el-input-number size="mini"></el-input-number>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from 'vue'
import { Table, TableColumn, InputNumber } from 'element-ui'
import { flatten } from '../utils'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(InputNumber)

export default {
  name: 'sku-table',

  props: {
    data: {
      type: Array,
      default () {
        return []
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
    }
  },

  computed: {
    lists () {
      return flatten(this.data)
    },

    columns () {
      return this.data.map(item => {
        console.log(item[this.optionText])
        return item[this.optionText]
      })
    }
  }
}
</script>
