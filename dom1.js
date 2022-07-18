/*
 * @Author: lu
 * @Date: 2022-07-18 16:07:20
 * @LastEditTime: 2022-07-18 17:58:30
 * @FilePath: \interviewCollection\dom1.js
 * @Description: 链式调用
 */

var $ = (jQuery = (function (window) {
  // dom 存储
  function Query(dom, selector) {
    let i,
      len = dom ? dom.length : 0;
    for (i; i < len; i++) {
      this[i] = dom[i];
    }
    this.length = len;
    this.selector = selector || "";
    console.log("thisQuery", this);
    return this;
  }

  // 生成jQuery对象
  function Z(elements, selector) {
    return Query.call(this, elements, selector);
  }

  // 具体的dom查找
  function qsa(element, selector) {
    return element.querySelectorAll(selector);
  }

  Z.prototype = {
    each(callback) {
      [].every.call(this, function (el, index) {
        return callback.call(el, index, el) !== false;
      });
    },
    find(selector) {
      let doms = [];
      this.each(function (index, el) {
        let childs = this.querySelectorAll(selector);
        doms.push(...childs);
      });
      return new Z(doms, selector);
    },
    eq(i) {
      let doms = [];
      this.each(function (index, el) {
        if (i == index) {
          doms.push(this);
        }
      });
      console.log("this", this);
      return new Z(doms, this.selector);
    },
    remove() {
      this.each(function (index, el) {
        this.remove();
      });
    },
  };

  //   全局方法
  function isFunction(value) {
    return typeof value == "function";
  }

  function $(nodeSelector) {
    let doms = qsa(document, nodeSelector);
    return new Z(doms, nodeSelector);
  }

  //   挂载
  $.isFunction = isFunction;
  return $;
})());
