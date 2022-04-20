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
        <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <div class="flow-setting-item">
            <p class="flow-setting-item-title">节点名称</p>
            <a-form-item name="name">
              <a-input v-model="node.nodeName" :size="size" class="w-full" placeholder="节点名称" />
            </a-form-item>
          </div>
          <div class="flow-setting-item">
            <p class="flow-setting-item-title">通知类型</p>
            <a-checkbox-group v-model="noticeType">
              <a-row :gutter="[24, 24]">
                <a-col :span="8">
                  <a-checkbox value="1">站内通信</a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="2">短信通知</a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="4">邮件通知</a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="8">钉钉通知</a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="16">企业微信</a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="32">WeLink</a-checkbox>
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
            <a-textarea v-model="noticeContext" :size="size" class="w-full h-100" placeholder="通知内容" higth />
          </div>
          <div class="flow-setting-item">
            <p class="flow-setting-item-title">指定通知人</p>
            <!-- <a-textarea v-model="noticeContext" :size="size" class="w-full" placeholder="通知内容" /> -->
          </div>
        </a-form>
      </div>
    </div>
    <FlowDrawerFooter @close="onClose" />
  </a-drawer>
</template>
<script>
  import { flowMixin } from '../../mixins/flowMixin';
  import EditName from '../../Common/EditName.vue';
  import FlowDrawerFooter from '../../Common/DrawerFooter.vue';
  export default {
    name: 'FlowNoticeSetting',
    mixins: [flowMixin],
    components: { EditName, FlowDrawerFooter },
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
