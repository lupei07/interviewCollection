/*
 * @Author: lu
 * @Date: 2022-07-22 10:18:42
 * @LastEditTime: 2022-07-22 16:32:52
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

var n = 123; // 全局
function f1() {
  console.log(n); // 123
}
function f2() {
  var n = 456;
  f1();
}
f2();
console.log(n); // 123
// 考察点：预解析， 作用域

var length = 100;
function f1() {
  console.log("this", this);
  console.log(this.length);
}
var obj = {
  x: 10,
  f2: function (f1) {
    f1(); // this=>window  100
    arguments[0](); // 2
  },
};
obj.f2(f1, 1);
// 考察点：预解析，作用域，arguments（js内置对象，参数数组）

function f() {
  console.log(this.a);
}
var obj = {
  a: 2,
  f: f,
};
var f2 = obj.f;
var a = "hello";
f2(); // 无调用者 this=>window hello
obj.f(); // 有调用者 this=>obj // 2
// 考察点：预解析，字面量，作用域

// apply  call
function f(s) {
  console.log(this.a, s); // 2, 3
  return this.a + s;
}
var obj = {
  a: 2,
};
var f2 = function () {
  return f.apply(obj, arguments);
};
var b = f2(3);
console.log(b); // 5
// 考察点：预解析，字面量，apply，arguments，作用域

function b() {
  console.log(a); // fn
  var a = 10;
  function a() {} // 函数a的优先级高
  a = 100;
  console.log(a); // 100
}
b();
// 考察点：预解析，var fun

(function (num) {
  console.log(num); // 100
  var num = 10;
})(100);
// 考察点：自执行函数 预解析

function m() {
  console.log(a1); // un
  console.log(a2); // un
  console.log(b1); // un
  console.log(b2); // un
  if (false) {
    // 代码块
    function b1() {}
    var a1 = 100;
  }
  if (true) {
    // 代码块
    function b2() {}
    var a2 = 10;
  }
  console.log(a1); // un
  console.log(a2); // 10
  console.log(b1); // un
  console.log(b2); // fn
}
m();
// 考察点：预解析（代码块无预解析）作用域

var R = (function () {
  var u = { a: 1, b: 2 };
  var r = {
    fn: function (k) {
      // k ==> "a"
      return u[k]; // u["a"]
    },
  };
  return r;
})();
console.log(R.fn("a")); //1
// 考察点：自执行，闭包，对象属性访问
