/*
 * @Author: lu
 * @Date: 2022-07-21 09:51:26
 * @LastEditTime: 2022-07-21 10:30:25
 * @FilePath: \interviewCollection\patch.js
 * @Description:
 */
// 1. 初始化 patch(container, vnode)
// 2. 更新 update(vnode, newNode)

// 虚拟dom转化成真实dom 初始化
function createElement(vnode) {
  let tag = vnode.tag; // 目标元素 父元素
  let attrs = vnode.attrs || {}; // 属性
  let children = vnode.children || []; // 子节点

  if (!tag) {
    return null;
  }

  // 创建对应的dom
  let elem = document.createElement(tag);
  let attrName;
  // 给dom添加属性
  for (let attrName in attrs) {
    if (attrs.hasOwnProperty(attrName)) {
      elem.setAttribute(attrName, attrs[attrName]);
    }
  }

  //   将子元素添加到目标上
  children.forEach((childVnode) => {
    elem.appendChild(createElement(childVnode));
  });

  return elem;
}

// 更新
function updateChildren(vnode, newVnode) {
  let children = vnode.children || []; //现有节点
  let newChildren = newVnode.children || []; // 新节点

  children.forEach(function (childrenVnode, index) {
    let newChildrenVnode = newChildren[index];
    // 第一层么有变化
    if (childrenVnode.tag === newChildrenVnode.tag) {
      updateChildren(childrenVnode, newChildrenVnode);
    } else {
      // 两者tag不一样
      replaceNode(childrenVnode, newChildrenVnode);
    }
  });
}
