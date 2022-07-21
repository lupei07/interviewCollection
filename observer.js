/*
 * @Author: lu
 * @Date: 2022-07-21 16:00:26
 * @LastEditTime: 2022-07-21 16:35:56
 * @FilePath: \interviewCollection\observer.js
 * @Description:Vue原理分析（四）-- 变化侦测
 */
export class Observer {
  constructor(value) {
    this.value = value;
    if (Array.isArray(value)) {
      // 数组逻辑
    } else {
      // 对象逻辑
      this.walk(value);
    }
  }

  walk(obj) {
    // { name: "lily", age: 12 }
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
  }
}

function defineReactive(obj, key, val) {
  if (arguments.length === 2) {
    val = obj[key]; // 对象的某个值
  }

  if (typeof val === "object") {
    // 递归
    new Observer(val);
  }

  Object.defineProperty(obj, key, {
    enumerable: true, // 可枚举
    configurable: true, // 可改变
    get() {
      console.log(`${key}属性被读取了`);
      return val;
    },
    set(newVal) {
      console.log(`${key}属性被修改了，新值为${newVal}`);
      val = newVal;
    },
  });
}
