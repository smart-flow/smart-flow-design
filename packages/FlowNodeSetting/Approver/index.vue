<template>
  <a-drawer
    v-if="node.approverGroups"
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
      <img :src="approverIcon" class="anticon" />
      <span class="flow-ant-drawer-title">
        <EditName v-model="node.nodeName" />
      </span>
    </template>
    <div class="flow-setting-module">
      <div class="flow-setting-content">
        <!-- 审批类型 -->
        <div class="flow-setting-item">
          <p class="flow-setting-item-title">审批类型</p>
          <a-radio-group v-model="node.approvalMethod" button-style="solid" class="w-full">
            <a-radio :value="approvalMethod.value" v-for="(approvalMethod, i) in approvalMethods" :key="i">
              {{ approvalMethod.name }}
            </a-radio>
          </a-radio-group>
        </div>
        <div class="flow-setting-item">
          <p class="flow-setting-item-title" v-for="(approvalMethod, i) in approvalMethods" :key="i">
            <span v-if="node.approvalMethod == approvalMethod.value">{{ approvalMethod.name }}设置</span>
          </p>
        </div>
      </div>

      <a-tabs v-if="node.approvalMethod == 1">
        <a-tab-pane key="1" tab="审批设置">
          <div class="flow-setting-content">
            <!-- 审批方式 -->
            <div class="flow-setting-item">
              <p class="flow-setting-item-title">审批方式</p>
              <a-select v-model="node.approvalMode" :size="size" class="w-fill">
                <a-select-option value="1">
                  依次审批(一人通过再到下一个人处理)
                </a-select-option>
                <a-select-option value="2">
                  多人会签(所有人都通过才到下一个环节)
                </a-select-option>
                <a-select-option value="3">
                  多人会签(通过只需一人,否决需全员)
                </a-select-option>
                <a-select-option value="4">
                  多人或签(一人通过或否决)
                </a-select-option>
                <!--  <a-select-option value="5">
                  逐级审批(一级一级领导审批,直至结束)
                </a-select-option> -->
              </a-select>
            </div>
            <!-- 审批人 -->
            <FlowNodeApproval :groups="node.approverGroups" :node="node" />
            <!-- 审批人与发起人为同一人时 -->
            <div class="flow-setting-item">
              <p class="flow-setting-item-title">
                <span>审批人与发起人为同一人时</span>
              </p>
              <a-radio-group v-model="node.sameMode" :size="size">
                <a-radio v-for="(sameApproval, i) in sameApprovals" :key="i" :value="sameApproval.value" :style="radioStyle">
                  <span>{{ sameApproval.name }}</span>
                  <a-popover v-if="sameApproval.popovers && sameApproval.popovers.length > 0" placement="topLeft" trigger="click">
                    <template slot="content">
                      <div class="approver-tip-content">
                        <div class="approver-tip-main-content">
                          <div v-for="(popover, k) in sameApproval.popovers" :key="k">
                            <p class="main-title">{{ popover.title }}</p>
                            <p class="content">{{ popover.content }}</p>
                          </div>
                        </div>
                      </div>
                    </template>
                    <a-icon style="margin-left: 5px;" type="question-circle" />
                  </a-popover>
                </a-radio>
              </a-radio-group>
            </div>
            <!-- 审批人为空时 -->
            <div class="flow-setting-item">
              <p class="flow-setting-item-title">
                <span>审批人为空时</span>
                <a-popover placement="topLeft" trigger="click">
                  <template slot="content">
                    <div class="approver-tip-content">
                      <div class="approver-tip-main-content">
                        <p class="main-title">什么情况下会出现审批人为空？</p>
                        <p class="content">设置了“上级”审批，但申请人在飞书管理后台 - 组织架构中没有上级</p>
                        <p class="content">设置了“部门负责人”审批，但申请人在飞书管理后台 - 组织架构中没有部门负责人</p>
                        <p class="content">设置了“角色”审批，但该角色在飞书管理后台 - 组织架构中没有任何成员</p>
                        <p class="content">设置了“用户组”审批，但该用户组在飞书管理后台 - 组织架构中没有任何成员</p>
                      </div>
                    </div>
                  </template>
                  <a-icon style="margin-left: 5px;" type="question-circle" />
                </a-popover>
              </p>
              <a-radio-group v-model="node.noHander" :size="size">
                <a-radio v-for="(approvalWithNull, i) in approvalWithNulls" :key="i" :value="approvalWithNull.value" :style="radioStyle">
                  <span>{{ approvalWithNull.name }}</span>
                  <a-popover v-if="approvalWithNull.popovers && approvalWithNull.popovers.length > 0" placement="topLeft" trigger="click">
                    <template slot="content">
                      <div class="approver-tip-content">
                        <div class="approver-tip-main-content">
                          <div v-for="(popover, k) in approvalWithNull.popovers" :key="k">
                            <p class="main-title">{{ popover.title }}</p>
                            <p class="content">{{ popover.content }}</p>
                          </div>
                        </div>
                      </div>
                    </template>
                    <a-icon style="margin-left: 5px;" type="question-circle" />
                  </a-popover>
                </a-radio>
              </a-radio-group>
            </div>
            <div class="flow-setting-item">
              <p class="flow-setting-item-title">提示：</p>
              <div class="hint-info">
                <p>若审批人离职，会自动转交给审批人的上级代为处理</p>
                <p>抄送的人数最多支持100人以内</p>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="表单权限">
          <div class="flow-setting-content">
            <div class="flow-setting-item">
              <p class="flow-setting-item-title">表单权限</p>
              <AuthForm v-model="node.privileges" readable />
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="高级设置">
          <FlowNodeApprovalConfigure v-model="node.configure" />
        </a-tab-pane>
      </a-tabs>
    </div>
    <p>{{ node }}</p>
    <FlowDrawerFooter @close="onClose" @save="onSave" />
  </a-drawer>
</template>
<script>
  import { flowMixin } from '../../mixins/flowMixin';
  import FlowDrawerFooter from '../../Common/DrawerFooter.vue';
  import FlowNodeApproval from './Approval.vue';
  import FlowNodeApprovalConfigure from './Configure.vue';
  import EditName from '../../Common/EditName.vue';
  import AuthForm from '../../Common/AuthForm.vue';
  export default {
    name: 'FlowApproverSetting',
    components: {
      FlowDrawerFooter,
      EditName,
      FlowNodeApproval,
      FlowNodeApprovalConfigure,
      AuthForm,
    },
    mixins: [flowMixin],
    data() {
      return {
        node: {},
        visible: false,
        headerStyle: {
          background: 'linear-gradient(89.96deg,#fa6f32 .05%,#fb9337 79.83%)',
          // 'background-color': '#ff8126',
          'border-radius': '0px 0px 0 0',
        },
        // 审批类型
        approvalMethods: [
          {
            name: '人工审批',
            value: 1,
          },
          {
            name: '自动通过',
            value: 2,
          },
          {
            name: '自动拒绝',
            value: 3,
          },
        ],
        approvalWithNulls: [
          {
            name: '自动通过',
            value: 1,
            popovers: [
              {
                title: '什么是自动通过？',
                content: '当该角色或主管没有人的时候，审批单将自动通过',
              },
            ],
          },
          {
            name: '指定人员审批',
            value: 2,
          },
          {
            name: '找不到主管时，由上级主管代审批',
            value: 3,
            popovers: [
              {
                title: '什么是由上级主管代审批？',
                content: '当该角色或主管没有人的时候，审批单将自动通过',
              },
            ],
          },
          {
            name: '转交给审批管理员',
            value: 4,
            popovers: [
              {
                title: '什么是转交给审批管理员？',
                content: '若审批人为空，则自动转交给该审批流程的管理员',
              },
              {
                content: '提示：可在“基础信息 - 谁可以管理这个审批”中，查看和编辑该审批流程的管理员',
              },
            ],
          },
        ],
        sameApprovals: [
          {
            name: '由发起人对自己审批',
            value: 1,
          },
          {
            name: '自动跳过',
            value: 2,
            popovers: [
              {
                title: '什么是自动跳过？',
                content: '如果当前节点还有其他审批人，则交由其他审批人进行审批',
              },
              {
                content: '如果当前节点还有其他审批人，则交由其他审批人进行审批如果当前节点没有其他审批人，则该节点自动通过',
              },
            ],
          },
          {
            name: '转交给直属上级审批',
            value: 3,
            popovers: [
              {
                title: '什么是转交给直属上级审批？',
                content: '若直属上级为空，则自动通过',
              },
            ],
          },
          {
            name: '转交给部门负责人审批',
            value: 4,
            popovers: [
              {
                title: '什么是转交给部门负责人审批？',
                content: '若部门负责人为空，则自动通过',
              },
            ],
          },
        ],
      };
    },
    methods: {
      afterVisibleChange(val) {
        console.log('visible', val);
      },
      showDrawer(node) {
        this.node = node;
        this.visible = true;
      },
      onClose() {
        this.visible = false;
        this.$emit('close');
      },
      /**
       * 保存配置
       */
      onSave() {
        // 更新节点显示信息
        let content = '';
        this.node.approverGroups.forEach((group) => {
          if (group.approverNames.length > 0) {
            content += group.approverNames.join(',');
          }
          if (content) {
            content += ',';
          }
        });
        if (content) {
          this.$store.dispatch('flow/updateNode', { currNode: this.node, field: 'content', value: content });
          this.$store.dispatch('flow/updateNode', { currNode: this.node, field: 'error', value: false });
          this.onClose();
        } else {
          this.$store.dispatch('flow/updateNode', { currNode: this.node, field: 'content', value: null });
          this.$store.dispatch('flow/updateNode', { currNode: this.node, field: 'error', value: true });
        }
      },
    },
  };
</script>
