<template>
  <div class="flow-row">
    <div class="flow-box">
      <div class="flow-item flow-node-branch">
        <div class="flow-branch-suggest">
          <div class="node-name">
            <EditName v-model="node.nodeName" style="width:90%" />
            <img :src="childflowIcon2" style="margin-left: 10px;" />
          </div>
         <!--  <div class="close-icon"><a-icon type="close-circle" @click.stop="!read && delNode(node)" /></div> -->
        </div>
      </div>
      <!-- 如果子节点是意见分支,则只能添加一个意见分支 -->
      <FlowAddNode :node.sync="node" :nodeType="node.type" :read="read" />
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
    name: 'FlowPolymerizeNode',
    components: { FlowAddNode, FlowApproverSetting, EditName },
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
