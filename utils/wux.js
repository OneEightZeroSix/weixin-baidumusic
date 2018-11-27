const wux = {
  store: {
    position: '温哥华',
    skill: ['jsx', 'ts']
  },
  list: {},
  on: function (key, fn) {
    // 如果有则继续加队列
    if (!this.list[key]) {
      // 没有创建新的队列
      this.list[key] = [];
    }
    this.list[key].push(fn);
  },
  emit: function (key, param) {
    let fns = this.list[key];
    // 遍历更改仓库的值
    for (p in param) {
      this.store[p] = param[p]
    }
    // 触发数组中的回调函数
    fns.forEach(fn => {
      fn(param);
    });
  }
};

module.exports = wux