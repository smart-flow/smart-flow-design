<template>
  <div class="flow-row">
    <div class="flow-box">
      <div class="flow-item" :class="{ 'flow-item-active': isActive }" @click="!readable && open('flowCopyerSetting', node)">
        <div class="flow-node-box" :class="{ 'has-error': node.error }">
          <div
            class="node-name"
            :class="{ 'node-cc': node.status == -1, 'node-status-not': node.status == 0, 'node-status-current': node.status == 1, 'node-status-complete': node.status == 2 }"
          >
            <EditName v-model="node.nodeName" />
            <div class="search-input el-input" style="display: none;">
              <input type="text" autocomplete="off" id="1460664942574174208" class="el-input__inner" />
            </div>
            <img :src="ccIcon" alt="" style="margin-left: 10px;" />
          </div>
          <div class="node-main">
            <span v-if="node.content">
              抄送人:
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
          <div class="close-icon"><a-icon type="close-circle" @click.stop="!readable && delNode(node)" /></div>
        </div>
      </div>
      <FlowAddNode :node.sync="node" :nodeType="2" :readable="readable" />
    </div>
    <FlowCopyerSetting ref="flowCopyerSetting" @close="isActive = false" />
  </div>
</template>
<script>
  import { flowMixin } from '../../mixins/flowMixin';
  import FlowAddNode from '../Add/index.vue';
  import FlowCopyerSetting from '../../FlowNodeSetting/Copyer/index.vue';
  import EditName from '../../Common/EditName.vue';
  export default {
    name: 'FlowCopyerNode',
    components: { FlowAddNode, FlowCopyerSetting, EditName },
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
