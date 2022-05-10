<template>
  <a-drawer
    v-if="node.approverGroup"
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
            <FlowNodeApproval :groups="node.approverGroup" :node="node" />
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
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="表单权限">
          <div class="flow-setting-content">
            <div class="flow-setting-item">
              <p class="flow-setting-item-title">表单权限</p>
              <AuthForm readable />
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="高级设置">
          <div class="flow-setting-content">
            <div class="flow-setting-item">
              <p class="flow-setting-item-title">操作配置</p>
              <div class="flow-setting-option" v-for="(operation, i) in operations" :key="i">
                <div class="flow-setting-option-item">
                  <div class="flow-setting-option-item-left">
                    <img :src="optionIcon" />
                    <div class="flow-setting-option-desc">
                      <p class="setting-option-title">{{ operation.name }}</p>
                      <p class="setting-option-desc">{{ operation.content }}</p>
                    </div>
                  </div>
                  <div class="flow-setting-option-item-switch">
                    <a-switch checked-children="开" un-checked-children="关" default-checked />
                  </div>
                </div>
              </div>
            </div>
            <div class="flow-setting-item">
              <p class="flow-setting-item-title">超时配置</p>
              <div class="flow-setting-option">
                <div class="flow-setting-option-item">
                  <div class="flow-setting-option-item-left">
                    <img :src="optionIcon" />
                    <div class="flow-setting-option-desc">
                      <p class="setting-option-title">审批限时处理</p>
                      <p class="setting-option-desc">支持自动提醒、转交等，为每条审批流设一个智能闹钟</p>
                    </div>
                  </div>
                  <div class="flow-setting-option-item-switch">
                    <a-switch checked-children="开" un-checked-children="关" />
                  </div>
                </div>
              </div>
            </div>
            <div class="flow-setting-item">
              <p class="flow-setting-item-title">安全配置</p>
              <div class="flow-setting-option">
                <div class="flow-setting-option-item">
                  <div class="flow-setting-option-item-left">
                    <img :src="optionIcon" />
                    <div class="flow-setting-option-desc">
                      <p class="setting-option-title">审批同意是否需要手写签名</p>
                      <p class="setting-option-desc">如果全局设置了需要签字，则此处不生效</p>
                    </div>
                  </div>
                  <div class="flow-setting-option-item-switch">
                    <a-switch checked-children="开" un-checked-children="关" />
                  </div>
                </div>
              </div>
              <div class="flow-setting-option">
                <div class="flow-setting-option-item">
                  <div class="flow-setting-option-item-left">
                    <img :src="optionIcon" />
                    <div class="flow-setting-option-desc">
                      <p class="setting-option-title">填写密码</p>
                      <p class="setting-option-desc">凭密码才能填写表单</p>
                    </div>
                  </div>
                  <div class="flow-setting-option-item-switch">
                    <a-switch checked-children="开" un-checked-children="关" @click.stop @change="openPasswordModal" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <p>{{ node }}</p>
    <!-- 填写密码 -->
    <a-modal :visible="passwordVisible" :width="drawerWidth()" title="填写密码" @cancel="passwordVisible = false">
      <div class="flow-setting-module">
        <a-input-password placeholder="输入密码" />
      </div>
    </a-modal>
    <FlowDrawerFooter @close="onClose" @save="onSave" />
  </a-drawer>
</template>
<script>
  import { flowMixin } from '../../mixins/flowMixin';
  import FlowDrawerFooter from '../../Common/DrawerFooter.vue';
  import FlowNodeApproval from './Approval.vue';
  import EditName from '../../Common/EditName.vue';
  import AuthForm from '../../Common/AuthForm.vue';
  export default {
    name: 'FlowApproverSetting',
    components: {
      FlowDrawerFooter,
      EditName,
      FlowNodeApproval,
      AuthForm,
    },
    mixins: [flowMixin],
    data() {
      return {
        node: {},
        visible: false,
        // 填写密码弹窗
        passwordVisible: false,
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
        // 操作配置
        operations: [
          {
            name: '转交',
            value: '1',
            content: '转交给他人办理，依然在当前节点',
            code: 'turn',
          },
          {
            name: '抄送',
            value: '2',
            content: '选择抄送给谁，可以在待阅和已阅中查看',
            code: 'cc',
          },
          {
            name: '退回',
            value: '3',
            content: '退回给申请人，申请人修改完成后，流程按节点开始走',
            code: 'back',
          },
          {
            name: '撤回',
            value: '4',
            content: '允许申请人对未进入流程（第一个流程节点为待处理状态）的申请进行撤回',
            code: '',
          },
          {
            name: '加签',
            value: '5',
            content: '这个事情我不能完全做主，需要某些人先处理，再右我处理',
            code: 'addSign',
          },
          {
            name: '跟踪',
            value: '6',
            content: '流程实例所有的进度我要发短信和email给我，可在我的跟踪查看',
            code: 'trace',
          },
          {
            name: '拒绝',
            value: '6',
            content: '节点负责人可以拒绝该流程（拒绝后流程直接结束，标记为已拒绝）',
            code: 'end',
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
      openPasswordModal(checked) {
        if (checked) {
          this.passwordVisible = true;
        }
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
        this.node.approverGroup.forEach((group) => {
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
