<template>
  <div class="ease-sku-table">

    <el-table
      size="mini"
      :data="lists"
      :span-method="handleSpanMethod">
      <template v-for="(label, index) in columns">
        <!-- 为什么要判断label: 动态添加规格名的时候规格名不为undefiend时未动态显示, 没有看table-column实现暂时这么解决  -->
        <el-table-column
          v-if="label"
          :label="label"
          :key="index">
          <template slot-scope="scope">
            {{scope.row.skus[index] && scope.row.skus[index].v}}
          </template>
        </el-table-column>
      </template>

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
    <pre>
      {{rowspan}}
      {{lists}}
    </pre>
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

  data () {
    return {
      rowspan: []
    }
  },

  computed: {
    filter () {
      return this.data.filter(item => item.text && item.leaf.length)
    },

    lists () {
      return flatten(this.filter)
    },

    columns () {
      return this.filter.map(item => item[this.optionText])
    }
  },

  watch: {
    lists () {
      this.computeRowspan()
    }
  },

  methods: {
    computeRowspan () {
      this.rowspan = []
      const rowspan = (index) => {
        let span = []
        let dot = 0

        this.lists.map((item, idx) => {
          if (idx === 0) {
            span.push(1)
          } else {
            if (item.skus[index].v === this.lists[idx - 1].skus[index].v) {
              span[dot] += 1
              span.push(0)
            } else {
              dot = idx
              span.push(1)
            }
          }
        })

        this.rowspan.push(span)
      }

      this.filter.map((item, index) => {
        rowspan(index)
      })
    },

    handleSpanMethod ({ row, column, rowIndex, columnIndex }) {
      for (let i = 0; i < this.filter.length; i++) {
        if (columnIndex === i) {
          if (this.rowspan[i] && this.rowspan[i][rowIndex]) {
            return {
              rowspan: this.rowspan[i][rowIndex],
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
    }
  }
}
</script>
