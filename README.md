<!--
 * @Author: lu
 * @Date: 2022-07-12 10:28:08
 * @LastEditTime: 2022-07-20 17:32:56
 * @FilePath: \interviewCollection\README.md
 * @Description: 
-->
# interviewCollection
面试合集
## 快速布局
1. 实现div的水平垂直居中
```js
// 最高效的方法
.con{
    width: 300px;
    height: 300px;
    background-color: yellowgreen;
    margin: auto; // *
}
body{
    height: 100%; // *
    display: flex; // *
}
```
## css面试集锦
### 1. padding 和 margin 有什么不同（深信服，字节）
    - 作用对象不同，内边距padding针对的是自身，外边距margin作用于外部对象
### 2. vw和百分比的区别
    - vw只和设备的宽度有关系
    - 百分比有继承关系
### 3. 行内元素和块元素
    - 块元素：占一行
    - 行内元素：内容多大就显示多大
### 4. 如何让谷歌浏览器支持小字体
    - 通过缩放
```css
    .small-font{
        transform: scale(0.8);
        -webkit-transform: scale(0.8);
    }
```

## let 和 var
    - 声明提升 => 先上车后买票
    - 没有局部作用域 => 红杏出墙
    - 声明覆盖 => 套牌车
```js
// console.log(name); // Uncaught ReferenceError: Cannot access 'name' before initialization
        // let name = "李长歌"

        // 1. 声明提升 => 先上车后买票
        console.log(name1); // undefined
        var name1 = "驭灵师"

        // 2. 没有局部作用域 => 红杏出墙
        function fn1(){
            for(var i=0; i<5; i++){
            }
            console.log(i) // 5
        }
        fn1()
        function fn2(){
            for(let i=0; i<5; i++){
            }
            // console.log(i) // i is not defined at fn1
        }
        fn2()

        // 3. 声明覆盖 => 套牌车
        var name2 = "纪云禾"
        var name2 = "长意"
        console.log(name2); // 长意
```

## 深拷贝与浅拷贝
### 1. 基本数据类型 => 严格意义上不能算拷贝，叫赋值
```js
    let a = 5;
    let b = a;
    b = 3;
    console.log(a, b); // 5 3
```
### 2. 数组与对象的赋值都叫做浅拷贝（藕断丝连）
```js
    let arr = [1, 2, 3];
    let newArr = arr;
    newArr.push(4);
    console.log(arr, newArr); // arr 发生变化
```
### 3.解构赋值是深拷贝还是浅拷贝？
- 针对一位数组和对象可以看做是深拷贝，多为数组就是浅拷贝
```js
    let arr1 = [1, 2, 3];
    let newArr1 = [...arr];
    newArr1.push(4);
    console.log(arr1, newArr1); // arr 不变

    let arr2 = [[1,2,3],[4,5,6]];
    let newArr2 = [...arr2];
    newArr2[0].push(888);
    console.log(arr2, newArr2); // arr 发生变化
```
### 深拷贝的用法
- 能解决80%，当有function方法的时候 不管用
```js
    let list = [
        {id: 1, stuName: "小米", class: "五年一班"},
        {id: 2, stuName: "小好", class: "五年二班"},
        {id: 3, stuName: "小得", class: "五年三班"},
    ]

    let newList = JSON.parse(JSON.stringify(list))
    newList.push({id:4})
    console.log(list, newList); // list 不变
```
### 标准的深拷贝 => 针对  引用数据类型（数组，对象）
#### - `hasOwnProperty`检测一个属性是否是对象的自有属性
```JS
    function deepClone(source){
        const targetObj = source.constructor === Array ? [] : {};
        for(let keys in source){
            if(source.hasOwnProperty(keys)){
                // keys => 3种，基本数据类型，引用数据类型
                // 引用数据类型
                if(source[keys] && typeof source[keys] === "object"){
                    // 递归
                    targetObj[keys] = deepClone(source[keys])
                }else{ 
                    // 基本数据类型，直接赋值
                    targetObj[keys] = source[keys]                       
                }
            }
            
        }
        return targetObj;
    }

    let objC = {
        name: "热巴",
        arr: [[1,2,3], 5,6,7],
        list: list,
        obj: {name:"冷巴", actor:{title:"长歌行"}}
    }
    const newObjC = deepClone(objC);
    newObjC.obj.age = 18
    console.log('objC',objC);
    console.log('newObjC',newObjC);
```

## Promise
[Promise链接](https://github.com/lupei07/Promise)

## 原型与原型链
```js
    // 原型  prototype ==> 原型函数特有的
    // 原型链 _proto_ => [[prototype]]

    let obj = {}
    let arr = []
    // 常规的对象，数组是没有原型的
    // obj.prototype.a = 666 // 报错

    function Person(){

    }
    Person.prototype.name="唱歌"
    Person.prototype.age =18
    Person.prototype.getAge = function(){
        console.log(this.age);
    }

    // 实例
    let person1 = new Person(); // 通过new关键字继承Person的原型属性和方法
    person1.age = 28
    console.log(person1.name);
    person1.getAge()

    // 从当前的实例属性去查找，如果找到了返回，否则顺着原型链一层一层网上找
    // 直到找到null为止，如果null都没有找到，报错
    console.log(person1.demo) // undefined
    // person1.fn() // 不错


    // 找自身的私有属性
    let item;
    for(item in person1){
        if(person1.hasOwnProperty(item)){
            console.log(item);
        }
    }
```

## 防抖与节流
```js
    // 防抖 =>  固定时间内，事件只允许发生一次
    // 场景：搜索，鼠标滚动

    function debounce(fn, wait){
        let timer = null;
        return args =>{
            if(timer) clearTimeout(timer)
            timer = setTimeout(fn, wait)
        }
    }


    // 节流 => 一定时间内只调用一次函数
    // 场景：提交表单 高频监听
    function throttle(fn, time){
        let timer = null;
        return function(){
            if(!timer){
                timer=setTimeout(()=>{
                    fn();
                    timer = null;
                },time)
            }
        }
    }

    // 通过时间戳
```

## 闭包
```js
    // 1. 闭包是什么？ -- 方法里返回一个方法
    function fn(){
        let a1 = 1;
        return function(){
            return a1
        }
    }

    // 2. 闭包存在的意义？
    // 2.1 延长变量的生命周期
    // 2.2 创建私有环境
    function fn1(){
        let num = 0
        function change(val){
            num += val
        }
        return {
            add: function(){
                change(1)
            },
            value: function(){
                return num
            }
        }
    }
```

## ES6相关
### 1. var let const
```js
    // var 
    // 1. 声明提升  2. 变量覆盖  3. 没有块级作用域
    console.log(num); // undefined
    var num = 123

    // const
    // 1. const声明之后必须赋值 否则就报错
    // 2. 定义的值不能修改，否则报错
    // 3. 支持let的其他属性
```
### 2. 解构
```js
    let a = 1;
    let b = 2;
    [a, b] = [b, a] // a b 值互换
```
### 3. 快速去重
```js
    let arr = [12, 23, 53, 23, 12, 43]
    let item = [...new Set(arr)]
```
### 4. Promise
```js
    // 标杆 => 构造函数同步执行
    const promise = new Promise((resolve, reject)=>{
        console.log('1');
        resolve();
        console.log('2');
    })
    // .then()异步执行
    promise.then(()=>{
        console.log('3');
    })
    console.log('4');
    // 1 2 4 3
```

## v-model 双向数据绑定
```js
    <input type="text" id="username">
    显示值：<p id="uName"></p>
    <script>
        let obj = {};
        Object.defineProperty(obj, "name", {
            get: function(){
                console.log('取值');
            },
            set: function(val){
                console.log('设置值');
                document.getElementById("uName").innerText = val
            }
        })
        document.getElementById("username").addEventListener("keyup", function(){
            obj.name = event.target.value;
        })
    </script>
```
## vue中的data为什么是个函数
1. 闭包设计：每一个组件都有自己的私有作用域，确保各组件数据不会相互干扰
2. 如果是纯对象设计：会有干扰

## 虚拟dom详解
### 1. 虚拟dom是什么？
- vue2.x 才有的虚拟dom
- 本质：就是js对象 => 跨平台
### 2. 虚拟dom在vue中做了什么？
- vue的渲染过程（HTML，css，js）
    - 将真实dom转化虚拟dom（js对象）
    - 更新的时候做对比
### 3. 虚拟dom是如何提升vue的渲染效率的？
- 局部更新（节点数据）
- 将直接操作dom的地方拿到两个js对象中去做比较
## diff中patch

## 打包
```js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
let isProduction = process.env.NODE_ENV;
module.exports = {
  configureWebpack: (config) => {
    // 生产环境相关配置
    if (isProduction == "production") {
      // 代码压缩
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            // 生产环境自动删除console
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ["console.log"],
            },
          },
          sourceMap: false, // 不打印日志
          parallel: true, // 开启并行化，加快打包速度
        })
      );
    }
  },
};
```

## 拯救繁乱的template
- 页面中有很多的v-if的判断 可以考虑优化
### 使用 `render()`函数
- template => render() => 虚拟dom => 转化成真实dom  
[csdn文档](https://blog.csdn.net/w807139809/article/details/122106086?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-1-122106086-blog-110071512.pc_relevant_multi_platform_whitelistv1_exp2&spm=1001.2101.3001.4242.2&utm_relevant_index=3)
![render](render.jpg)
```js
<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'normal'
            },
            text: {
                type: String,
                default: 'normal'
            }
        },
        render(h){
            // h => 原生JS中createElement()
            // 第一个参数【必须】：要渲染的标签名称
            // 第二个参数【可选】：渲染标签的属性
            // 第三个参数【可选】：渲染标签的子元素数组
            return h('button',
            {
                // v-bind: class
                class: {
                    btn: true,
                    'btn-success': this.type === 'success',
                    'normal': !this.type
                },
                // 与 v-bind:style 的API相同
                // 接收一个字符串，对象，或对象组成的数组
                style:{
                    color: "red",
                    fontSize: "14px"
                },
                // 普通的 HTML attribute
                attrs: {
                    id: "foo"
                },
                // dom属性
                domProps: {
                    innerText: this.text || '默认按钮'
                },
                // v-on:click
                // 但不在支持如 v-on:keyup.enter这样的修饰器
                on: {
                    click: this.clickHandler
                }
            },
            [
                
            ]
            )
        }
    }
</script>
<style>
.btn{}
.btn-success{}
.normal{}
</style>
``` 
## 路由拦截
```js
router.beforeEach((to, from, next) => {
  const loginInfo = useStore();

  let requiredAuth = to.meta.requiredAuth || undefined;
  if (requiredAuth && !loginInfo.isLogin) {
    alert("need required");
    next({ path: "/" });
    return;
  }
  next();
});
```

## 指令的权限控制
```js
export const permission = {
  mounted(el, binding) {
    const { value } = binding;
    const roles = ["bills-capital"];
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;
      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role);
      });
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`need array like v-permission='[""]'`);
    }
  },
};

```

## 面向对象编程
## JS发布订阅模式
1. 发布订阅模式是什么
2. 实现中有哪些应用场景
3. 如何利用发布订阅模式解耦代码
4. 高内聚，低耦合的设计思想
- 耦合度越高，可复用性越低，耦合度越低，可复用性更高
```js
    const houseObj = {}; // 发布者

      // houseObj.list = []; // 花名册，缓存
      houseObj.list = {}; // [] => {} 为何把数组定义成对象  阿里面试题
      // 因为如果是数组，在this.list[key] 取值的时候会是一个深拷贝，深拷贝比浅拷贝更加耗性能；对象的可读性较好一些

      // 添加订阅者
      houseObj.listen = function (key, fn) {
        // if(!this.list[key]){
        //     this.list[key] = [];
        // }
        // this.list[key].push(fn);
        // 短路表达式
        (this.list[key] || (this.list[key] = [])).push(fn);
      };

      // 发布
      houseObj.trigger = function () {
        // 类数组转真实数组
        let key = Array.prototype.shift.call(arguments); // 数组的第一项
        let fns = this.list[key]; // 取出该消息对应的回调函数
        if (!fns || fns.length == 0) {
          return;
        }
        console.log("arguments", arguments);
        for (let i = 0, fn; (fn = fns[i++]); ) {
          fn.apply(this, arguments);
        }
        // console.log('xxx',Array.from(arguments));
        // // let arr = Array.prototype.slice.call(arguments) // 真实数组
      };

      houseObj.listen("small", function (size) {
        console.log(`小红：我要的房子是${size}平米`);
      });
      houseObj.listen("big", function (size) {
        console.log(`小明：我要的房子是${size}平米`);
      });
      houseObj.trigger("small", 100);
      houseObj.trigger("big", 150);
```
#### 深度解耦
```js
    const event = {
        list: {},
        listen: function (key, fn) {
          (this.list[key] || (this.list[key] = [])).push(fn);
        },
        trigger: function () {
          // 类数组转真实数组
          let key = Array.prototype.shift.call(arguments); // 数组的第一项
          let fns = this.list[key]; // 取出该消息对应的回调函数
          if (!fns || fns.length == 0) {
            return;
          }
          for (let i = 0, fn; (fn = fns[i++]); ) {
            fn.apply(this, arguments);
          }
        },
      };
    //   初始化 业务赋能
    let initEvent = function(obj){
        for(let i in event){
            obj[i] = event[i]
        }
    }
    let houseObj = {}
    initEvent(houseObj)
    houseObj.listen("small", function (size) {
        console.log(`小红：我要的房子是${size}平米`);
      });
      houseObj.listen("big", function (size) {
        console.log(`小明：我要的房子是${size}平米`);
      });
      houseObj.trigger("small", 100);
      houseObj.trigger("big", 150);
```
#### 高级解耦
```js
    let Event = (function () {
        let list = {},
          listen,
          trigger,
          remove;
        listen = function (key, fn) {
          (list[key] || (list[key] = [])).push(fn);
        };
        trigger = function () {
          let key = Array.prototype.shift.call(arguments);
          let fns = list[key];
          if (!fns || fns.length == 0) {
            return;
          }
          for (let i = 0, fn; (fn = fns[i++]); ) {
            fn.apply(this, arguments);
          }
        };
        remove = function (key, fn) {
          let fns = list[key];
          if (!fns) {
            return false;
          }
          if (!fn) {
            fns && (fns.length = 0);
          } else {
            for (let i = fns.length - 1; i >= 0; i--) {
              let _fn = fns[i];
              _fn === fn && fn.splice(i, 1);
            }
          }
        };
        return {
          listen: listen,
          trigger: trigger,
          remove: remove,
        };
      })();
      Event.listen("small", function (size) {
        console.log(`小红：我要的房子是${size}平米`);
      });
      Event.trigger("small", 100)
```

## 结构优化与链式调用实现
```js
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
```

```js
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
```

## 性能优化
### 1. 在浏览器中输入URL并回车后都发生了什么？
- url（https://www.baidu.com）：统一资源定位符，俗称网址
- url是IP的一个映射
  - https: 传输协议（http和TCP之间加了一层 TSL或者SSL的安全层）
  - www：万维网，服务器
  - baidu.com：域名

- 第一次访问：解析url，DNS域名系统匹配真实IP
  - www.baidu.com => DNS域名系统 => 拿到真实IP => 建立连接（TCP三次握手） => 拿数据，渲染页面 => 四次挥手
- 第二次访问：将域名解析的IP存在本地 => 读取浏览器缓存 => 查看IP有没有过期等等
![输入url浏览器的变化](输入url浏览器的变化.png)
![浏览器渲染页面的过程](浏览器渲染页面的过程.png)


### 2. 从哪些点做性能优化？
- 页面加载性能（加载事件，用户体验）
  - 减少http请求（精灵图雪碧图，文件的合并）
  - 减少文件大小（资源压缩，图片压缩，代码压缩）
  - CDN（第三方库，大文件，大图）通过链接来引入
  - SSR服务端渲染，预渲染
  - 懒加载
  - 分包
- 动画与操作性能（是否流畅无卡顿）
  - 减少dom操作，避免回流，文档碎片
- 内存占用（内存占用过大，浏览器崩掉等）
- 电量消耗（游戏方面，可以暂不考虑）
![性能优化](性能优化.png)

## 虚拟
