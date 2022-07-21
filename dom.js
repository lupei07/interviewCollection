/*
 * @Author: lu
 * @Date: 2022-07-18 14:33:44
 * @LastEditTime: 2022-07-21 16:54:32
 * @FilePath: \interviewCollection\dom.js
 * @Description:
 */
// 匿名自执行函数
// 单例模式
// 1. 立即执行 2. 避免变量污染
var $ = (jQuery = (function (window) {
  let jquery = function (nodeSelector) {
    this.nodes = document.querySelectorAll(nodeSelector);
  };
  //   原型方法
  jquery.prototype = {
    each: function (callback) {
      for (let i = 0; i < this.nodes.length; i++) {
        callback.call(this, i, this.nodes[i]);
      }
    },
    addClass: function (classes) {
      let className = classes.split(" ");
      className.forEach((value) => {
        this.each(function (index, obj) {
          obj.classList.add(value);
        });
      });
    },
    setText: function (text) {
      this.each(function (index, obj) {
        obj.textContent = text;
      });
    },
  };
  return function (nodeSelector) {
    return new jquery(nodeSelector);
  };
})());
