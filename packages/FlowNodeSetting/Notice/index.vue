<template>
  <a-drawer
    :width="drawerWidth()"
    :headerStyle="headerStyle"
    :bodyStyle="bodyStyle"
    placement="right"
    :closable="true"
    :visible="visible"
    :after-visible-change="afterVisibleChange"
    @close="onClose"
  >
    <template slot="title">
      <img :src="noticeIcon" class="anticon" />
      <span class="flow-ant-drawer-title">
        <EditName v-model="node.nodeName" />
      </span>
    </template>
    <div class="flow-setting-module">
      <div class="flow-setting-content">
        <div class="flow-setting-item">
          <p class="flow-setting-item-title">节点名称</p>
          <a-input v-model="node.nodeName" :size="size" class="w-full" placeholder="节点名称" />
        </div>
        <div class="flow-setting-item">
          <p class="flow-setting-item-title">通知类型</p>
          <a-checkbox-group v-model="noticeType">
            <a-row :gutter="[24, 24]">
              <a-col :span="8" v-for="(notice, i) in notices" :key="i">
                <a-checkbox :value="notice.value">{{ notice.name }}</a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </div>
        <div class="flow-setting-item">
          <p class="flow-setting-item-title">通知内容</p>
          <div class="tpl-flex-box">
            <div>选择已审核模板</div>
            <a-button type="link" icon="plus-circle">
              创建新模板
            </a-button>
          </div>
          <a-select :size="size" style="width: 100%;margin-bottom: 20px;" placeholder="请选择模板"></a-select>
          <a-textarea v-model="noticeContext" :size="size" :rows="4" placeholder="通知内容" higth />
        </div>
        <div class="flow-setting-item" v-if="noticeType.includes(2)">
          <p class="flow-setting-item-title">手机号</p>
          <a-button type="link" icon="plus" block>
            添加手机号
          </a-button>
        </div>
        <div class="flow-setting-item">
          <p class="flow-setting-item-title">发送通知人</p>
          <FlowNodeApproval :groups="node.approverGroup" :node="node" title="通知人" />
        </div>
      </div>
    </div>
    <FlowDrawerFooter @close="onClose" />
  </a-drawer>
</template>
<script>
  import { flowMixin } from '../../mixins/flowMixin';
  import EditName from '../../Common/EditName.vue';
  import FlowNodeApproval from '../Approver/Approval.vue';
  import FlowDrawerFooter from '../../Common/DrawerFooter.vue';
  export default {
    name: 'FlowNoticeSetting',
    mixins: [flowMixin],
    components: { EditName, FlowNodeApproval, FlowDrawerFooter },
    data() {
      return {
        node: {},
        visible: false,
        headerStyle: {
          'background-color': '#498ff2',
          'border-radius': '0px 0px 0 0',
        },
        noticeContext: '',
        noticeType: [],
        notices: [
          {
            name: '站内通信',
            value: 1,
          },
          {
            name: '短信通知',
            value: 2,
          },
          {
            name: '邮件通知',
            value: 3,
          },
          {
            name: '钉钉通知',
            value: 4,
          },
          {
            name: '企业微信',
            value: 5,
          },
          {
            name: 'WeLink',
            value: 6,
          },
        ],
      };
    },
    methods: {
      afterVisibleChange(val) {
        console.log('visible', val);
      },
      showDrawer(node) {
        this.visible = true;
        this.node = node;
      },
      onClose() {
        this.visible = false;
        this.$emit('close');
      },
    },
  };
</script>
