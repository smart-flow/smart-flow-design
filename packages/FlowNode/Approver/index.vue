<template>
  <div class="flow-row">
    <div class="flow-box">
      <div class="flow-item" :class="{ 'flow-item-active': isActive }" @click="!readable && open('flowApproverSetting', node)">
        <div class="flow-node-box" :class="{ 'has-error': node.error }">
          <div
            class="node-name"
            :class="{ 'node-sp': node.status == -1, 'node-status-not': node.status == 0, 'node-status-current': node.status == 1, 'node-status-complete': node.status == 2 }"
          >
            <EditName v-model="node.nodeName" />
            <img :src="approverIcon" style="margin-left: 10px;" />
          </div>
          <div class="node-main">
            <span v-if="node.content">
              审批人:
              <a-tooltip placement="top">
                <template slot="title">
                  <span>{{ node.content }}</span>
                </template>
                {{ node.content }}
              </a-tooltip>
            </span>
            <span v-else class="hint-title">设置此节点</span>
          </div>
          <!-- 错误提示 -->
          <a-icon v-if="node.error" type="exclamation-circle" theme="filled" class="node-error" />
          <div v-if="!readable" class="close-icon"><a-icon type="close-circle" @click.stop="delNode(node)" /></div>
        </div>
      </div>
      <!-- 如果子节点是意见分支,则只能添加一个意见分支 -->
      <FlowAddNode :node.sync="node" :nodeType="node.type" :readable="readable" />
    </div>
    <FlowApproverSetting ref="flowApproverSetting" @close="isActive = false" />
  </div>
</template>
<script>
  import { flowMixin } from '../../mixins/flowMixin';
  import FlowAddNode from '../Add/index.vue';
  import FlowApproverSetting from '../../FlowNodeSetting/Approver/index.vue';
  import EditName from '../../Common/EditName.vue';
  export default {
    name: 'FlowApproverNode',
    components: { FlowAddNode, FlowApproverSetting, EditName },
    mixins: [flowMixin],
    props: {
      node: {
        type: Object,
        default: function() {
          return {};
        },
      },
      readable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
