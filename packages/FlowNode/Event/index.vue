<template>
  <div class="flow-row">
    <div class="flow-box">
      <div class="flow-item" :class="{ 'flow-item-active': isActive }" @click="!readable && open('flowEventSetting', node)">
        <div
          class="node-name"
          :class="{ 'node-temmi': node.status == -1, 'node-status-not': node.status == 0, 'node-status-current': node.status == 1, 'node-status-complete': node.status == 2 }"
        >
          事件
          <div class="close-icon"><a-icon type="close-circle" @click.stop="!readable && delNode(node)" /></div>
        </div>
      </div>
      <FlowAddNode :node.sync="node" :nodeType="5" :readable="readable" />
    </div>
    <FlowEventSetting ref="flowEventSetting" @close="isActive = false" />
  </div>
</template>
<script>
  import { flowMixin } from '../../mixins/flowMixin';
  import FlowAddNode from '../Add/index.vue';
  import FlowEventSetting from '../../FlowNodeSetting/Event/index.vue';
  export default {
    name: 'EventNode',
    components: { FlowAddNode, FlowEventSetting },
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
