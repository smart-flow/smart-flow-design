<template>
  <div class="flow-row">
    <div class="flow-branch">
      <div class="branch-node" @click="!read && addBranch(node)">
        <img :src="branchPlusIcon" />
      </div>
      <div class="meet-node"></div>
      <div class="flow-col" v-for="(conditionNode, index) in node.conditionNodes" :key="conditionNode.uid">
        <div class="clear-left-border" v-if="index == 0"></div>
        <div class="clear-right-border" v-if="node.conditionNodes.length - 1 == index"></div>
        <div class="flow-row">
          <div class="flow-box">
            <div class="flow-item flow-node-branch" @click="!read && open('flowBranchSetting', conditionNode)">
              <div class="flow-node-box" :class="{ 'has-error': conditionNode.error }">
                <div class="node-name">
                  <EditName v-model="conditionNode.nodeName" />
                  <img :src="childflowIcon2" style="margin-left: 10px;" />
                </div>
                <div class="branch-main">
                  <div v-if="!conditionNode.error" class="branch-filter-view">
                    <span>已有配置条件</span>
                  </div>
                  <div class="branch-filter-hint">
                    <span>配置筛选条件</span>
                  </div>
                </div>
                <!-- 错误提示 -->
                <a-icon v-if="conditionNode.error" type="exclamation-circle" theme="filled" class="node-error" />
                <div class="close-icon"><a-icon type="close-circle" @click.stop="!read && delNode(conditionNode)" /></div>
              </div>
            </div>
            <FlowAddNode :node.sync="node" :nodeType="3" :uid="conditionNode.uid" :read="read" />
          </div>
        </div>
        <FlowNode v-if="conditionNode.childNode && conditionNode.childNode.hasOwnProperty('nodeName')" :node="conditionNode.childNode" :read="read" />
      </div>
    </div>
    <div class="after-branch-btn">
      <!-- <FlowAddNode :node.sync="node" :nodeType="4" :read="read" /> -->
    </div>
    <FlowBranchSetting ref="flowBranchSetting" @close="isActive = false" />
  </div>
</template>
<script>
  import { flowMixin } from '../../mixins/flowMixin';
  import FlowNode from '../index.vue';
  import FlowAddNode from '../Add/index.vue';
  import FlowBranchSetting from '../../FlowNodeSetting/Branch/index.vue';
  import EditName from '../../Common/EditName.vue';
  export default {
    name: 'BranchNode',
    components: { FlowNode, FlowAddNode, FlowBranchSetting, EditName },
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
