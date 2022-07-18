/*
 * @Author: lu
 * @Date: 2022-07-18 14:33:44
 * @LastEditTime: 2022-07-18 17:45:07
 * @FilePath: \interviewCollection\dom.js
 * @Description:
 */

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
