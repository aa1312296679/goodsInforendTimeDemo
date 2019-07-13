// component/goods/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsInfor: { // 商品信息
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _goodsInfor: {
      type: Object,
      value: null
    }
  },
  observers: {
    'goodsInfor': function(goodsInforPro) {
      this.setData({
        _goodsInfor: goodsInforPro
      });
    }
  }
})