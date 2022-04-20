<template>
  <div class="flow-row-container">
    <FlowApproverNode v-if="node && node.type == 1" :node="node" :read="read" />
    <FlowCopyerNode v-if="node && node.type == 2" :node="node" :read="read" />
    <BranchNode v-if="node && node.type == 4" :node="node" :read="read" />
    <EventNode v-if="node && node.type == 5" :node="node" :read="read" />
    <WriteNode v-if="node && (node.type == 0 || node.type == 6)" :node="node" :read="read" />
    <SuggestNode v-if="node && node.type == 7" :node="node" :read="read" />
    <ParallelNode v-if="node && node.type == 9" :node="node" :read="read" />
    <PolymerizeNode v-if="node && node.type == 11" :node="node" :read="read"/>
    <NoticeNode v-if="node && node.type == 20" :node="node" :read="read" />
    <FlowNode v-if="node && node.childNode && node.childNode.hasOwnProperty('nodeName')" :node="node.childNode" :read="read" />
  </div>
</template>
<script>
  import { flowMixin } from '../mixins/flowMixin';
  import FlowApproverNode from './Approver/index.vue';
  import FlowCopyerNode from './Copyer/index.vue';
  import NoticeNode from './Notice/index.vue';
  import WriteNode from './Write/index.vue';
  import EventNode from './Event/index.vue';
  import FlowAddNode from './Add/index.vue';
  import FlowBranchSetting from '../FlowNodeSetting/Branch/index.vue';
  import EditName from '../Common/EditName.vue';
  export default {
    name: 'FlowNode',
    components: {
      FlowApproverNode,
      FlowCopyerNode,
      BranchNode: () => import('./Branch/index.vue'),
      SuggestNode: () => import('./Branch/Suggest.vue'),
      ParallelNode: () => import('./Branch/Parallel.vue'),
      PolymerizeNode: () => import('./Branch/Polymerize.vue'),
      NoticeNode,
      WriteNode,
      EventNode,
      FlowAddNode,
      FlowBranchSetting,
      EditName,
    },
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
