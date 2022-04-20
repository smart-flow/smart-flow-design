<template>
  <div class="flow-row">
    <div class="flow-box">
      <div class="flow-item" :class="{ 'flow-item-active': isActive }" @click="!read && open('flowNoticeSetting', node)">
        <div class="flow-node-box">
          <div
            class="node-name"
            :class="{ 'node-tz': node.status == -1, 'node-status-not': node.status == 0, 'node-status-current': node.status == 1, 'node-status-complete': node.status == 2 }"
          >
            <EditName v-model="node.nodeName" />
            <img :src="noticeIcon" alt="" style="margin-left: 10px;" />
          </div>
          <div class="node-main"><span class="hint-title">设置此节点</span></div>
          <div class="close-icon"><a-icon type="close-circle" @click.stop="!read && delNode(node)" /></div>
        </div>
      </div>
      <FlowAddNode :node.sync="node" :nodeType="5" :read="read" />
    </div>
    <FlowNoticeSetting ref="flowNoticeSetting" @close="isActive = false" />
  </div>
</template>
<script>
  import { flowMixin } from '../../mixins/flowMixin';
  import FlowAddNode from '../Add/index.vue';
  import FlowNoticeSetting from '../../FlowNodeSetting/Notice/index.vue';
  import EditName from '../../Common/EditName.vue';
  export default {
    name: 'NoticeNode',
    components: { FlowAddNode, FlowNoticeSetting, EditName },
    mixins: [flowMixin],
    props: {
      node: {
        type: Object,
        default: function() {
          return {};
        },
      },
      read: {
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
