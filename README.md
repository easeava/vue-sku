# vue-sku
基于element-ui实现zent sku商品规格组件。
demo中有部分参数使用，具体参数自行阅读代码

## [JSFiddle](https://jsfiddle.net/easeava/L6zc4p79/25/)
## [在线 DEMO](https://vue-sku.ease.smhx.net)

![规格设置和展示](./example/assets/demo.jpg)


## 使用
必须配合element-ui使用
```
yarn add element-vue-sku
import 'element-vue-sku/lib/sku.css'

import { Sku, SkuTable } from 'element-vue-sku'
```

demo
```html
<div id="app">
  <div class="container">
    <vue-sku
      v-model="value"
      action="http://localhost:8081/index.php"
      :sku-tree="skuTree"
      :on-fetch-group="fetchSkuTree"
      :on-fetch-ku="fetchSku"
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
```

> Flatten、isEqual 直接copy的zent-sku [官方文档](https://youzan.github.io/zent/zh/component/sku)

```javascript
import { flatten } from 'element-vue-sku'

let skus = [
  { id: 1, text: '颜色', leaf: [{id: 11, text: '红色'}, {id: 12, text: '蓝色'}] },
  { id: 2, text: '尺寸', leaf: [{id: 21, text: '大'}, {id: 22, text: '小'}] }
];

console.log(flatten(skus));
/**
 * output:
 * [
 *   {"skus":[{"k_id":1,"k":"颜色","v_id":11,"v":"红色"},{"k_id":2,"k":"尺寸","v_id":21,"v":"大"}]},
 *   {"skus":[{"k_id":1,"k":"颜色","v_id":11,"v":"红色"},{"k_id":2,"k":"尺寸","v_id":22,"v":"小"}]}
 *   {"skus":[{"k_id":1,"k":"颜色","v_id":12,"v":"蓝色"},{"k_id":2,"k":"尺寸","v_id":21,"v":"大"}]}
 *   {"skus":[{"k_id":1,"k":"颜色","v_id":12,"v":"蓝色"},{"k_id":2,"k":"尺寸","v_id":22,"v":"小"}]}
 * ]
 */

let items = [
  {
    "price": "10.00",
    "code": "AE86",
    "skus":[{"k_id":1,"k":"颜色","v_id":11,"v":"红色"},{"k_id":2,"k":"尺寸","v_id":22,"v":"小"}]
  }
];
console.log(flatten(skus, items));

/**
 * output:
 * [
 *   {"skus":[{"k_id":1,"k":"颜色","v_id":11,"v":"红色"},{"k_id":2,"k":"尺寸","v_id":21,"v":"大"}]},
 *   {
 *    "price":"10.00",
 *    "code":"AE86",
 *    "skus":[{"k_id":1,"k":"颜色","v_id":11,"v":"红色"},{"k_id":2,"k":"尺寸","v_id":22,"v":"小"}]
 *   },
 *   {"skus":[{"k_id":1,"k":"颜色","v_id":12,"v":"蓝色"},{"k_id":2,"k":"尺寸","v_id":21,"v":"大"}]}
 *   {"skus":[{"k_id":1,"k":"颜色","v_id":12,"v":"蓝色"},{"k_id":2,"k":"尺寸","v_id":22,"v":"小"}]}
 * ]
 */
```

```javascript
import { isEqual } from 'element-vue-sku'

let skuA = [
  { id: 1, text: '颜色', leaf: [{id: 11, text: '红色'}, {id: 12, text: '蓝色'}] },
  { id: 2, text: '尺寸', leaf: [{id: 21, text: '大'}, {id: 22, text: '小'}] }
];

let skuB = [
  { id: 1, text: '颜色', leaf: [{id: 11, text: '红色'}, {id: 12, text: '蓝色'}] },
  { id: 2, text: '尺寸', leaf: [{id: 21, text: '大'}, {id: 22, text: '小'}] }
];

let skuC = [
  { id: 1, text: '颜色', leaf: [{id: 11, text: '红色'}, {id: 12, text: '蓝色'}] },
  { id: 2, text: '尺寸', leaf: [{id: 22, text: '小'}, {id: 21, text: '大'}] }
];

let skuD = [
  { id: 1, text: '颜色', leaf: [{id: 11, text: '红色'}, {id: 12, text: '蓝色'}] },
  { id: 3, text: '尺寸', leaf: [{id: 21, text: '大'}, {id: 22, text: '小'}] }
];

console.log(isEqual(skuA, skuB));
console.log(isEqual(skuA, skuC));
console.log(isEqual(skuA, skuD));

/**
 * output:
 *
 * true
 * false
 * false
 */
```
