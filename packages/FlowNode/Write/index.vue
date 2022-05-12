<template>
  <div class="flow-row">
    <div class="flow-box">
      <div class="flow-item" :class="{ 'flow-item-active': isActive }" @click="!readable && open('flowWriteSetting', node)">
        <div class="flow-node-box" :class="{ 'has-error': node.error }">
          <div
            class="node-name"
            :class="{ 'node-fill': node.status == -1, 'node-status-not': node.status == 0, 'node-status-current': node.status == 1, 'node-status-complete': node.status == 2 }"
          >
            <EditName v-model="node.nodeName" />
            <img :src="writeIcon" style="margin-left: 10px;" />
          </div>
          <div class="node-main"><span class="hint-title">设置此节点</span></div>
          <!-- 错误提示 -->
          <a-icon v-if="node.error" type="exclamation-circle" theme="filled" class="node-error" />
          <!-- 只有是填写节点才能删除，发起节点不能删除 -->
          <div v-if="node.type == 6" class="close-icon"><a-icon type="close-circle" @click.stop="delNode(node)" /></div>
        </div>
      </div>
      <FlowAddNode :node.sync="node" :nodeType="6" />
    </div>
    <FlowWriteSetting ref="flowWriteSetting" @close="isActive = false" />
  </div>
</template>
<script>
  import { flowMixin } from '../../mixins/flowMixin';
  import FlowAddNode from '../Add/index.vue';
  import FlowWriteSetting from '../../FlowNodeSetting/Write/index.vue';
  import EditName from '../../Common/EditName.vue';
  export default {
    name: 'WriteNode',
    components: { FlowAddNode, EditName, FlowWriteSetting },
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
