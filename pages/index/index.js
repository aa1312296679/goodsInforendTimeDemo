import goods from '../../services/goods.js'

var timeOut = null; //timeout
//总毫秒


//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    timeDifference: 0, //客户端与服务端的毫秒时间差
    goodsInfor: { //商品信息模拟数据结构
      goodsName: "柚子",
      h: "43",
      m: "52",
      s: "51",
      ms: "10"
    }
  },
  onLoad: function() {
    //模拟一个服务器时间的总毫秒
    var server_time = new Date().getTime() + 20;
    //更新客户端与服务器端的毫秒时间差
    this.data.timeDifference = goods.difference(server_time);

    //模拟的原生数据结构
    var goods_infor = {
      goodsName: "柚子",
      endTime: 1563053883000, //截止时间总毫秒 用于计算剩余时间
      curMs: 60 //显示界面的总毫秒数 用于伪造毫秒显示到界面
    };

    this.doSuccess(goods_infor);
  },

  /**
   * 格式化原生数据
   * @param data 原生数据
   */
  doSuccess(data) {
    //计算剩余的活动时间 单位:毫秒 可通过总毫秒转换天 时 分 秒等等
    var remainingTime = goods.endTimeFormat(data.endTime, this.data.timeDifference);
    //计算剩余的活动时间,用于显示到界面的毫秒 毫秒只能递减伪造，这里的毫秒不是真正意义上的1毫秒
    data['curMs'] = goods.remainingMs(data['curMs']);
    //计算活动截止状态 通过剩余的活动时间计算活动截止状态
    data['status'] = goods.endState(remainingTime);

    //剩余时间格式为小时
    data['h'] = goods.timeFormat(remainingTime, "h", data['status']);
    //剩余时间格式为分钟
    data['m'] = goods.timeFormat(remainingTime, "m", data['status']);
    //剩余时间格式为秒
    data['s'] = goods.timeFormat(remainingTime, "s", data['status']);
    //剩余时间格式为毫秒
    data['ms'] = goods.timeFormat(data['curMs'], "ms", data['status']);

    //更新至数据层
    this.data.goodsInfor = data;

    //重新渲染数据层对应的模板
    this.setData({
      goodsInfor: this.data.goodsInfor
    });

    //活动结束时停止执行
    if (!data['status']) {
      return false;
    }

    //清除递归定时器
    if (timeOut) {
      clearTimeout(timeOut);
    }

    //递归更新数据
    timeOut = setTimeout(() => {
      this.doSuccess(data);
    }, 100)
  }
})