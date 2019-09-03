import Sku from './sku'

const install = function (Vue) {
  Vue.component('ease-sku', Sku)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
