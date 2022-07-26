/*
 * @Author: lu
 * @Date: 2022-07-25 10:43:32
 * @LastEditTime: 2022-07-25 11:28:43
 * @FilePath: \interviewCollection\call-apply-bind.js
 * @Description:
 */
// 如何改变指针
var name = "windowName";
var a = {
  name: "cherry",
  func1: function () {
    console.log(this.name);
  },
  func2: function () {
    setTimeout(
      function () {
        console.log(this);
        this.func1();
      }.call(a),
      100
    );
    setTimeout(() => {
      this.func1();
    }, 100);
  },
};
a.func2();

// Call的实现原理  ctx--作用域对象
Function.prototype.mycall = function (ctx) {
  ctx = ctx || window;
  ctx.fn = this; // 添加属性 this => b
  let arg = [...arguments].splice(1); // 取参数
  let result = ctx.fn(...arg); // 执行b函数
  return result;
};

// call apply bind的区别
var a = {
  name: "cherry",
  fn: function (a, b) {
    console.log(a + b);
  },
};
var b = a.fn;
b.apply(a, [1, 2]);
b.call(a, 1, 4);
b.mycall(a, 4, 6);
var c = b.bind(a, 2, 5); // 绑定作用域
c();
