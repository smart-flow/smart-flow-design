<template>
  <div class="after-node-btn" @click="visible = true">
    <a-popover placement="right" v-model="visible">
      <template slot="content">
        <a-menu mode="vertical" class="flow-ant-menu-vertical">
          <a-menu-item key="1" @click="addType(1)">
            <img :src="approverIcon2" class="anticon" />
            <span>审批节点</span>
          </a-menu-item>
          <a-menu-item key="4" @click="addType(4)">
            <img :src="branchIcon2" class="anticon" />
            <span>分支节点</span>
          </a-menu-item>
          <a-menu-item v-if="nodeType == 1 && $store.state.flow.suggestBranchEnable" key="7" @click="addType(7)">
            <img :src="branchIcon2" class="anticon" />
            <span>意见分支</span>
          </a-menu-item>
          <a-menu-item v-if="nodeType != 10 && $store.state.flow.parallelBranchEnable" key="9" @click="addType(9)">
            <img :src="childflowIcon2" class="anticon" />
            <span>并行分支</span>
          </a-menu-item>
          <a-menu-item key="2" @click="addType(2)">
            <img :src="ccIcon2" class="anticon" />
            <span>抄送节点</span>
          </a-menu-item>
          <a-menu-item key="20" @click="addType(20)">
            <img :src="noticeIcon2" class="anticon" />
            <span>通知节点</span>
          </a-menu-item>
          <a-menu-item key="5" @click="addType(5)">
            <img :src="webhookIcon2" class="anticon" />
            <span>事件节点</span>
          </a-menu-item>
          <a-menu-item key="6" @click="addType(6)">
            <img :src="writeIcon" class="anticon" />
            <span>填写节点</span>
          </a-menu-item>
        </a-menu>
      </template>
      <!-- 当审批节点下添加意见分支,就不允许添加其他类型的节点了 -->
      <img :src="plusIcon" v-if="!read && (nodeType != 1 || (nodeType == 1 && node.showAdd))" />
    </a-popover>
  </div>
</template>
<script>
  import { flowMixin } from '../../mixins/flowMixin';
  export default {
    name: 'FlowAddNode',
    components: {},
    mixins: [flowMixin],
    props: {
      node: {
        type: Object,
        default: function() {
          return {
            showAdd: true,
          };
        },
      },
      nodeType: {
        type: Number,
        default: 1,
      },
      uid: {
        type: String,
        default: '',
      },
      read: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      addType(type) {
        var addNode = null;
        if (type == 1) {
          addNode = this.addApproverNode(type);
        } else if (type == 2) {
          addNode = this.addCcNode(type);
        } else if (type == 4) {
          addNode = this.addBranchNode(type);
        } else if (type == 5) {
          addNode = this.addEventNode(type);
        } else if (type == 6) {
          addNode = this.addWriteNode(type);
        } else if (type == 7) {
          addNode = this.addSuggestNode(type);
        } else if (type == 9) {
          addNode = this.addParallelNode(type);
        } else if (type == 20) {
          addNode = this.addNoticeNode(type);
        }
        const nodeType = this.nodeType;
        const currNode = this.node;
        const uid = this.uid;
        this.$store.dispatch('flow/addNode', { addNode, currNode, nodeType, uid });
        if (nodeType == 1 && type == 7) {
          // 当审批节点下添加意见分支,就不允许添加其他类型的节点了
          this.$store.dispatch('flow/updateNode', { currNode, field: 'showAdd', value: false });
        }
        // this.$message.success('节点添加成功');
      },
      /**
       * 添加审批节点 ||
       */
      addApproverNode(type) {
        return {
          uid: this.uuid(),
          nodeName: '审核人',
          type: type,
          status: -1,
          // 审批类型
          approvalMethod: 1,
          // 审批方式
          approvalMode: '1',
          // 审批设置
          approverGroup: [
            {
              id: this.uuid(),
              // 审批人模式
              approverType: 1,
              // 层级模式
              levelMode: 1,
              // 审批人ID
              approverIds: [],
              // 审批人名称
              approverNames: [],
            },
          ],
          // 审批人与发起人为同一人时
          sameMode: 2,
          // 审批人为空时
          noHander: null,
          // 表单权限
          privilege: [
            {
              // 表单ID
              id: null,
              // 表单名称
              name: '姓名',
              // 表单编辑
              writable: false,
              // 表单只读
              readable: true,
              // 表单隐藏
              displayable: false,
              // 表单必填
              required: false,
            },
          ],
          // 子节点
          childNode: null,
          // 显示添加按钮
          showAdd: true,
          // 是否有错误
          error: true,
          // 显示内容
          content: null,
        };
      },
      /**
       * 添加抄送节点
       */
      addCcNode(type) {
        return {
          uid: this.uuid(),
          nodeName: '抄送人',
          type: type,
          status: -1,
          // 抄送人设置
          approverGroup: [
            {
              id: this.uuid(),
              // 审批人模式
              approverType: 1,
              // 层级模式
              levelMode: 1,
              // 审批人ID
              approverIds: [],
              // 审批人名称
              approverNames: [],
            },
          ],
          childNode: null,
          // 显示添加按钮
          showAdd: true,
          // 是否有错误
          error: true,
          // 显示内容
          content: null,
        };
      },
      /**
       * 添加通知节点
       */
      addNoticeNode(type) {
        return {
          uid: this.uuid(),
          nodeName: '通知',
          type: type,
          status: -1,
          childNode: null,
          // 显示添加按钮
          showAdd: true,
          // 是否有错误
          error: true,
        };
      },
      /**
       * 添加事件节点
       */
      addEventNode(type) {
        return {
          uid: this.uuid(),
          nodeName: '事件',
          type: type,
          status: -1,
          childNode: null,
          // 显示添加按钮
          showAdd: true,
          // 是否有错误
          error: true,
        };
      },
      /**
       * 添加填写节点
       */
      addWriteNode(type) {
        return {
          uid: this.uuid(),
          nodeName: '填写',
          type: type,
          status: -1,
          childNode: null,
          // 显示添加按钮
          showAdd: true,
          // 是否有错误
          error: true,
        };
      },
      /**
       * 添加分支节点
       */
      addBranchNode(type) {
        const uid = this.uuid();
        return {
          uid: uid,
          nodeName: '路由',
          type: type,
          status: -1,
          childNode: null,
          // 显示添加按钮
          showAdd: true,
          // 是否有错误
          error: true,
          conditionNodes: [
            {
              uid: this.uuid(),
              pid: uid,
              nodeName: '分支节点1',
              type: 3,
              priorityLevel: 1,
              status: -1,
              error: true,
              childNode: null,
              // 显示添加按钮
              showAdd: true,
              // 显示优先级
              showPriorityLevel: true,
            },
            {
              uid: this.uuid(),
              pid: uid,
              nodeName: '分支节点2',
              type: 3,
              priorityLevel: 2,
              error: true,
              status: -1,
              childNode: null,
              // 显示添加按钮
              showAdd: true,
              // 显示优先级
              showPriorityLevel: true,
            },
          ],
        };
      },
      /**
       * 添加意见分支节点
       */
      addSuggestNode(type) {
        const uid = this.uuid();
        return {
          uid: uid,
          nodeName: '意见',
          type: type,
          status: -1,
          childNode: null,
          // 显示添加按钮
          showAdd: true,
          // 是否有错误
          error: true,
          conditionNodes: [
            {
              uid: this.uuid(),
              pid: uid,
              nodeName: '同意',
              type: 8,
              priorityLevel: 1,
              status: -1,
              error: true,
              childNode: null,
              // 显示添加按钮
              showAdd: true,
            },
            {
              uid: this.uuid(),
              pid: uid,
              nodeName: '不同意',
              type: 8,
              priorityLevel: 2,
              error: true,
              status: -1,
              childNode: null,
              // 显示添加按钮
              showAdd: true,
            },
          ],
        };
      },
      /**
       * 添加并行节点
       */
      addParallelNode(type) {
        const uid = this.uuid();
        return {
          uid: uid,
          nodeName: '并行',
          type: type,
          status: -1,
          // 显示添加按钮
          showAdd: true,
          // 是否有错误
          error: true,
          childNode: {
            uid: this.uuid(),
            pid: uid,
            nodeName: '聚合',
            type: 11,
            settype: 1,
            status: -1,
            noHanderAction: 1, // 审批人为空时
            childNode: null,
            // 显示添加按钮
            showAdd: true,
          },
          conditionNodes: [
            {
              uid: this.uuid(),
              pid: uid,
              nodeName: '并行1',
              type: 10,
              status: -1,
              error: true,
              childNode: null,
              // 显示添加按钮
              showAdd: true,
            },
            {
              uid: this.uuid(),
              pid: uid,
              nodeName: '并行2',
              type: 10,
              error: true,
              status: -1,
              childNode: null,
              // 显示添加按钮
              showAdd: true,
            },
          ],
        };
      },
    },
  };
</script>
