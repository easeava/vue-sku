import { flatten, isEqual } from './utils'
import Sku from './sku'
import SkuTable from './components/SKUTable'

const components = [
  Sku,
  SkuTable
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  flatten,
  isEqual,
  Sku,
  SkuTable
}
