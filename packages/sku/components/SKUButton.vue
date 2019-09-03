<template>
  <div class="ease-sku-group">
    <div class="group-title">
      <el-button size="mini">添加规格项目</el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'element-ui'

Vue.use(Button)

export default {
}
</script>

<style lang="scss">
.ease-sku-group {

  .group-title {
    padding: 7px 10px;
    background-color: #f8f8f8;
    color: #666;
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }
}
</style>
