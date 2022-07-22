/*
 * @Author: lu
 * @Date: 2022-07-22 10:18:42
 * @LastEditTime: 2022-07-22 10:48:55
 * @FilePath: \interviewCollection\面试题.js
 * @Description:
 */
var a = 10;
function test() {
  a = 100;
  console.log(a); // 100
  console.log(this.a); // 10 此时this指向window
  var a;
  console.log(a); // 100
}
test();
// 考察点：作用域， this， 变量提升

(function () {
  var a = (b = 3); // b=3; var a=b;
})();
console.log(b); // 3 b：是全局变量
console.log(a); // 报错 a: 在函数作用域里面
// 考察点：自执行  作用域

for (var i = 1; i <= 3; i++) {
  setTimeout(() => {
    console.log(i); // 4 4 4
  }, 0);
}
// 考察点：事件循环， 等待队列， 异步，js是单线程
// var => let  1 2 3 （块级作用域）
// 作用域  函数作用域  全局作用域  块级作用域（es6）

function fun(n) {
  console.log(n); // 123
  var n = 456;
  console.log(n); // 456
}
var n = 123;
fun(n);
// 考察点：作用域 变量提升 参数
