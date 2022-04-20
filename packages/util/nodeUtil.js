import { uuid } from 'vue-uuid';
import html2canvas from 'html2canvas';
/**
 *   获取ID
 */
export function getId() {
  return uuid.v4();
}

/**
 *   获取发起人节点
 */
 export function getStartNode() {
  return {
    uid: getId(),
    nodeName: '发起人',
    type: 0,
    status: -1,
    childNode: null,
    // 显示添加按钮
    showAdd: true,
  };
}

/**
 *   获取条件/并行节点
 */
export function addCondition(node, len) {
  return {
    pid: node.uid,
    uid: uuid.v4(),
    nodeName: (node.type == 4 ? '条件' : '并行') + len,
    type: node.type == 4 ? 3 : 10,
    priorityLevel: len.toString(),
    childNode: null,
  };
}


/**
 *   添加节点
 */
export function addNode(node, currNode, addNodeData) {
  if (node && node.uid == currNode.uid) {
    // 当前节点的子节点暂存
    const childNode = currNode.childNode;
    if (childNode) {
      childNode.pid = addNodeData.uid;
    }
    // 如果添加的是并行节点
    if (addNodeData.type == 9) {
      if (childNode) {
        // 聚合节点作为其父节点
        childNode.pid = addNodeData.childNode.uid;
      }
      //  将需要添加的节点后面挂载当前聚合节点子节点
      addNodeData.childNode.childNode = childNode;
    } else {
      //  将需要添加的节点后面挂载当前子节点
      addNodeData.childNode = childNode;
    }
    //  当前添加节点父节点
    addNodeData.pid = currNode.uid;
    //  当前子节点上添加需要添加的节点
    node.childNode = addNodeData;
  } else if (node) {
    addNode(node.childNode, currNode, addNodeData);
    if (node.conditionNodes) {
      node.conditionNodes.forEach((conditionNode, i) => {
        addNode(conditionNode, currNode, addNodeData);
      });
    }
  }
}

/**
 *   添加分支
 */
export function addBranch(node, currNode) {
  if (node && node.uid == currNode.uid) {
    node.conditionNodes = currNode.conditionNodes;
  } else if (node) {
    addBranch(node.childNode, currNode);
    if (node.conditionNodes) {
      node.conditionNodes.forEach((conditionNode, i) => {
        addBranch(conditionNode, currNode);
      });
    }
  }
}

/**
 *   删除节点
 */
export function delNode(node, currNode) {
  if (node && currNode && node.uid == currNode.pid) {
    // 当前节点的子节点暂存
    let childNode = currNode.childNode;
    // 如果删除的是并行节点
    if (currNode.type == 9) {
      childNode = currNode.childNode.childNode;
    }
    if (childNode && childNode.hasOwnProperty('nodeName')) {
      childNode.pid = currNode.pid;
    }
    //  将当前节点的子节点挂载到父节点
    node.childNode = childNode;
  } else if (node && currNode) {
    delNode(node.childNode, currNode);
    if (node.conditionNodes) {
      node.conditionNodes.forEach((conditionNode, i) => {
        delNode(conditionNode, currNode);
      });
    }
  }
}

/**
 *   删除分支节点
 */
export function delBranchNode(state, node, currNode) {
  if (node && currNode && node.uid == currNode.pid) {
    // 只有两个分支
    if (node.conditionNodes.length == 2) {
      if (node.uid == state.node.uid) {
        state.node = {};
      } else {
        // 需要讲路由节点删除
        delNode(state.node, node);
      }
    } else {
      // 执行删除当前分支
      node.conditionNodes.forEach((conditionNode, index) => {
        if (conditionNode.uid == currNode.uid) {
          node.conditionNodes.splice(index, 1);
        }
      });
    }
  } else if (node && currNode) {
    delBranchNode(state, node.childNode, currNode);
    if (node.conditionNodes) {
      node.conditionNodes.forEach((conditionNode, i) => {
        delBranchNode(state, conditionNode, currNode);
      });
    }
  }
}

/**
 * 更新节点
 *
 */
export function updateNode(node, currNode, field, value) {
  if (node && currNode && node.uid == currNode.uid) {
    node[field] = value;
  } else if (node && currNode) {
    updateNode(node.childNode, currNode, field, value);
    if (node.conditionNodes) {
      node.conditionNodes.forEach((conditionNode, i) => {
        updateNode(conditionNode, currNode, field, value);
      });
    }
  }
}

/**
 * 更新地图
 *
 */
export function updateMap(state) {
  setTimeout(() => {
    const content = document.querySelector('#flow-design-content');
    html2canvas(content, {
      backgroundColor: '#aaa',
      scale: 1,
      width: content.clientWidth,
      height: content.scrollHeight,
      windowHeight: content.scrollHeight,
    }).then((canvas) => {
      state.mapImg = canvas.toDataURL('image/jpeg', 0.8);
    });
  }, 100);
}
