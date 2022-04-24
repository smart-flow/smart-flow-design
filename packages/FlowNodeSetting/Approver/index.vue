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
          <a-radio-group v-model="node.approvalSetting.approveType" button-style="solid" class="w-full">
            <a-radio value="1">
              人工审批
            </a-radio>
            <a-radio value="2">
              自动通过
            </a-radio>
            <a-radio value="3">
              自动拒绝
            </a-radio>
          </a-radio-group>
        </div>
        <div class="flow-setting-item">
          <p class="flow-setting-item-title" v-if="node.approveType == 1">人工审批设置</p>
          <p class="flow-setting-item-title" v-if="node.approveType == 2">自动通过设置</p>
          <p class="flow-setting-item-title" v-if="node.approveType == 3">自动拒绝设置</p>
        </div>
      </div>

      <a-tabs v-if="node.approvalSetting.approveType == 1">
        <a-tab-pane key="1" tab="审批设置">
          <div class="flow-setting-content">
            <!-- 审批方式 -->
            <div class="flow-setting-item">
              <p class="flow-setting-item-title">审批方式</p>
              <a-select v-model="node.approvalSetting.approveMode" :size="size" class="w-fill">
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
                <a-select-option value="5">
                  逐级审批(一级一级领导审批,直至结束)
                </a-select-option>
              </a-select>
            </div>
            <!-- 审批人 -->
            <div class="flow-setting-item">
              <p class="flow-setting-item-title">
                <span>审批人</span>
              </p>
              <a-radio-group v-model="node.approvalSetting.approvalMode" class="w-fill" :size="size">
                <a-radio v-for="(approval, i) in approvals" :key="i" :style="approvalRadioStyle" :value="approval.value">
                  <span>{{ approval.name }}</span>
                  <a-popover v-if="approval.popovers && approval.popovers.length > 0" placement="topLeft" trigger="click">
                    <template slot="content">
                      <div class="approver-tip-content">
                        <div class="approver-tip-main-content">
                          <div v-for="(popover, k) in approval.popovers" :key="k">
                            <p class="main-title">{{ popover.title }}</p>
                            <p class="content">{{ popover.content }}</p>
                          </div>
                        </div>
                        <a v-if="approval.href" :href="approval.href" target="_blank">{{ approval.hrefName }}</a>
                      </div>
                    </template>
                    <a-icon style="margin-left: 5px;" type="question-circle" />
                  </a-popover>
                </a-radio>
              </a-radio-group>
              <!-- 上级 -->
              <div v-if="node.approvalMode == 1">
                <p class="flow-setting-item-title">
                  <span>指定层级</span>
                </p>
                <a-radio-group :size="size" v-model="node.approvalSetting.levelMode" class="w-fill">
                  <a-radio v-for="(higherLevel, i) in higherLevelModes" :key="i" :style="radioStyle" :value="higherLevel.value">
                    <span>{{ higherLevel.name }}</span>
                    <a-popover v-if="higherLevel.popovers && higherLevel.popovers.length > 0" placement="topLeft" trigger="click">
                      <template slot="content">
                        <div class="approver-tip-content">
                          <div class="approver-tip-main-content">
                            <div v-for="(popover, k) in higherLevel.popovers" :key="k">
                              <p class="main-title">{{ popover.title }}</p>
                              <p class="content">{{ popover.content }}</p>
                            </div>
                          </div>
                          <a v-if="higherLevel.href" :href="higherLevel.href" target="_blank">{{ higherLevel.hrefName }}</a>
                        </div>
                      </template>
                      <a-icon style="margin-left: 5px;" type="question-circle" />
                    </a-popover>
                  </a-radio>
                </a-radio-group>
                <a-select :size="size" class="w-fill" default-value="1">
                  <a-select-option :value="higherLevel.value" v-for="(higherLevel, i) in higherLevels" :key="i">
                    {{ higherLevel.name }}
                  </a-select-option>
                </a-select>
              </div>
              <!-- 部门负责人 -->
              <div v-if="node.approvalSetting.approvalMode == 2">
                <p class="flow-setting-item-title">
                  <span>指定层级</span>
                </p>
                <a-radio-group :size="size" v-model="node.settype" class="w-fill">
                  <a-radio v-for="(departmentHead, i) in departmentHeadModes" :key="i" :style="radioStyle" :value="departmentHead.value">
                    <span>{{ departmentHead.name }}</span>
                    <a-popover v-if="departmentHead.popovers && departmentHead.popovers.length > 0" placement="topLeft" trigger="click">
                      <template slot="content">
                        <div class="approver-tip-content">
                          <div class="approver-tip-main-content">
                            <div v-for="(popover, k) in departmentHead.popovers" :key="k">
                              <p class="main-title">{{ popover.title }}</p>
                              <p class="content">{{ popover.content }}</p>
                            </div>
                          </div>
                          <a v-if="departmentHead.href" :href="departmentHead.href" target="_blank">{{ departmentHead.hrefName }}</a>
                        </div>
                      </template>
                      <a-icon style="margin-left: 5px;" type="question-circle" />
                    </a-popover>
                  </a-radio>
                </a-radio-group>
                <a-select :size="size" class="w-fill" default-value="1">
                  <a-select-option :value="departmentHead.value" v-for="(departmentHead, i) in departmentHeads" :key="i">
                    {{ departmentHead.name }}
                  </a-select-option>
                </a-select>
              </div>
              <!-- 部门审批人 -->
              <div v-if="node.approvalSetting.approvalMode == 3">
                <p class="flow-setting-item-title">
                  <span>部门审批人</span>
                </p>
                <a-select :size="size" class="w-fill" default-value="1">
                  <a-select-option :value="departmentApproval.value" v-for="(departmentApproval, i) in departmentApprovals" :key="i">
                    {{ departmentApproval.name }}
                  </a-select-option>
                </a-select>
              </div>
              <!-- 编码审批人 -->
              <div v-if="node.approvalSetting.approvalMode == 4">
                <p class="flow-setting-item-title">
                  <span>编码审批人</span>
                </p>
                <!-- <a-radio-group :size="size" v-model="node.approvalSetting.approvalMode" class="w-fill">
                  <a-radio v-for="(departmentHead, i) in departmentHeadModes" :key="i" :style="radioStyle" :value="departmentHead.value">
                    <span>{{ departmentHead.name }}</span>
                    <a-popover v-if="departmentHead.popovers && departmentHead.popovers.length > 0" placement="topLeft" trigger="click">
                      <template slot="content">
                        <div class="approver-tip-content">
                          <div class="approver-tip-main-content">
                            <div v-for="(popover, k) in departmentHead.popovers" :key="k">
                              <p class="main-title">{{ popover.title }}</p>
                              <p class="content">{{ popover.content }}</p>
                            </div>
                          </div>
                          <a v-if="departmentHead.href" :href="departmentHead.href" target="_blank">{{ departmentHead.hrefName }}</a>
                        </div>
                      </template>
                      <a-icon style="margin-left: 5px;" type="question-circle" />
                    </a-popover>
                  </a-radio>
                </a-radio-group> -->
                <a-select :size="size" class="w-fill" default-value="1">
                  <a-select-option :value="departmentHead.value" v-for="(departmentHead, i) in departmentHeads.concat(departmentApprovals)" :key="i">
                    {{ departmentHead.name }}
                  </a-select-option>
                </a-select>
              </div>
              <!-- 角色 -->
              <div v-if="node.approvalSetting.approvalMode == 5">
                <p class="flow-setting-item-title">
                  <span>选择角色</span>
                </p>
                <a-select :size="size" class="w-fill" default-value="1">
                  <a-select-option :value="role.value" v-for="(role, i) in roles" :key="i">
                    {{ role.name }}
                  </a-select-option>
                </a-select>
              </div>
              <!-- 岗位 -->
              <div v-if="node.approvalSetting.approvalMode == 6">
                <p class="flow-setting-item-title">
                  <span>选择岗位</span>
                </p>
                <a-select :size="size" class="w-fill" default-value="1">
                  <a-select-option :value="post.value" v-for="(post, i) in posts" :key="i">
                    {{ post.name }}
                  </a-select-option>
                </a-select>
              </div>
              <!-- 用户组 -->
              <div v-if="node.approvalSetting.approvalMode == 7">
                <p class="flow-setting-item-title">
                  <span>选择用户组</span>
                </p>
                <a-select :size="size" class="w-fill" default-value="1">
                  <a-select-option :value="userGroup.value" v-for="(userGroup, i) in userGroups" :key="i">
                    {{ userGroup.name }}
                  </a-select-option>
                </a-select>
              </div>
            </div>
            <!-- 审批人与发起人为同一人时 -->
            <div class="flow-setting-item">
              <p class="flow-setting-item-title">
                <span>审批人与发起人为同一人时</span>
              </p>
              <a-radio-group v-model="node.approvalSetting.sameMode" :size="size">
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
              <a-radio-group v-model="node.approvalSetting.noHander" :size="size">
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
              <AuthForm isEdit />
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
    <FlowDrawerFooter @close="onClose" />
  </a-drawer>
</template>
<script>
  import { flowMixin } from '../../mixins/flowMixin';
  import FlowDrawerFooter from '../../Common/DrawerFooter.vue';
  import EditName from '../../Common/EditName.vue';
  import AuthForm from '../../Common/AuthForm.vue';
  export default {
    name: 'FlowApproverSetting',
    components: { FlowDrawerFooter, EditName, AuthForm },
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
        approvals: [
          {
            name: '上级',
            code: 'higherLevel',
            value: 1,
          },
          {
            name: '部门负责人',
            value: 2,
            popovers: [
              {
                title: '什么是部门负责人审批？',
                content: '这里指在管理后台 - 组织架构中所设置的部门负责人',
              },
              {
                title: '什么是部门负责人审批？',
                content:
                  '部门负责人审批与上级审批的区别？一个部门内可能存在多层的上下级关系，但通常有指定的部门负责人。由部门负责人审批 ，则不涉及上下级关系，直接由该固定人员进行审批',
              },
            ],
            href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
            hrefName: '如何配置部门负责人？',
          },
          {
            name: '部门审批人',
            value: 3,
            popovers: [
              {
                title: '什么是部门负责人审批？',
                content: '这里指在管理后台 - 组织架构中所设置的部门负责人',
              },
              {
                title: '什么是部门负责人审批？',
                content:
                  '部门负责人审批与上级审批的区别？一个部门内可能存在多层的上下级关系，但通常有指定的部门负责人。由部门负责人审批 ，则不涉及上下级关系，直接由该固定人员进行审批',
              },
            ],
            href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
            hrefName: '如何配置部门负责人？',
          },
          {
            name: '编码审批人',
            value: 4,
            popovers: [
              {
                title: '什么是部门负责人审批？',
                content: '这里指在管理后台 - 组织架构中所设置的部门负责人',
              },
              {
                title: '什么是部门负责人审批？',
                content:
                  '部门负责人审批与上级审批的区别？一个部门内可能存在多层的上下级关系，但通常有指定的部门负责人。由部门负责人审批 ，则不涉及上下级关系，直接由该固定人员进行审批',
              },
            ],
            href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
            hrefName: '如何配置部门负责人？',
          },
          {
            name: '角色',
            value: 5,
            popovers: [
              {
                title: '什么是角色？',
                content: '角色指团队成员的专业分工类别，如人事、行政、财务等，每类角色可由 1 位或多位成员组成',
              },
              {
                title: '如何使用？',
                content: '用角色作为审批人，当有成员离职变动时，该角色中的其他成员可继续完成审批，从而避免审批流程失效的情况',
              },
              {
                content: '提示：若选择的角色中包含多名成员，则按照设置“多人审批时采用的审批方式”来处理',
              },
            ],
            href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
            hrefName: '如何配置角色？',
          },
          {
            name: '岗位',
            value: 6,
            popovers: [
              {
                title: '什么是角色？',
                content: '角色指团队成员的专业分工类别，如人事、行政、财务等，每类角色可由 1 位或多位成员组成',
              },
              {
                title: '如何使用？',
                content: '用角色作为审批人，当有成员离职变动时，该角色中的其他成员可继续完成审批，从而避免审批流程失效的情况',
              },
              {
                content: '提示：若选择的角色中包含多名成员，则按照设置“多人审批时采用的审批方式”来处理',
              },
            ],
            href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
            hrefName: '如何配置角色？',
          },
          {
            name: '用户组',
            value: 7,
            popovers: [
              {
                title: '什么是用户组？',
                content: '用户组主要用于权限管控，设置某个用户组作为审批人，则只有该用户组中的成员可进行审批。',
              },
              {
                title: '如何使用？',
                content: '用户组主要用于权限管控，设置某个用户组作为审批人，则只有该用户组中的成员可进行审批。',
              },
              {
                content: '提示：若选择的用户组中包含多名成员，则按照设置“多人审批时采用的审批方式”来处理',
              },
            ],
            href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
            hrefName: '如何配置用户组？',
          },
          {
            name: '指定成员',
            value: 8,
          },
          {
            name: '发起人自选',
            value: 9,
          },
          {
            name: '发起人本人',
            value: 10,
            popovers: [
              {
                title: '什么是发起人审批？',
                content: '将发起人自己设置为审批人，可用于需要发起人进行信息复核的场景',
              },
            ],
          },
          {
            name: '连续多级上级审批',
            value: 11,
            popovers: [
              {
                title: '什么是连续多级上级审批？',
                content: '从发起人的直属上级开始，依次逐级向上审批，直到所设置的审批终点为止。是手动逐个添加多级上级审批的一种便捷设置',
              },
            ],
            href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
            hrefName: '查看和设置上级信息',
          },
          {
            name: '表单内联系人',
            value: 12,
            popovers: [
              {
                title: '如何配置表单内联系人？',
                content: '在表单设计中添加联系人控件后，该人员/其上级/部门负责人将可以配置为本节点的审批人。',
              },
            ],
          },
          {
            name: '表单内部门',
            value: 13,
            popovers: [
              {
                title: '何配置表单内部门？',
                content: '在表单设计中添加部门控件后，其部门负责人可以配置为本节点的审批人。',
              },
            ],
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
        // 上级方式
        higherLevelModes: [
          {
            name: '自下而上（以发起人的直属上级为第一级）',
            value: 1,
            popovers: [
              {
                title: '什么是上级 - 自下而上？',
                content: '以发起人的直属上级为第一级，向更高管理层级递增',
              },
              {
                content: '图示：若小王为发起人，则小张是小王的“直属上级”，小李是小王的“第二级上级”',
              },
            ],
            href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
            hrefName: '查看和设置上级信息',
          },
          {
            name: '自上而下（以公司的最高上级为第一级）',
            code: 'higherLevel',
            value: 2,
            popovers: [
              {
                title: '什么是上级 - 自上而下？',
                content: '以公司组织架构中的最高上级为第一级，向更低管理层级递增',
              },
              {
                content: '图示：若小王为发起人，则小赵是小王的“最高上级”，小周是小王的“第二级上级”',
              },
            ],
            href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
            hrefName: '查看和设置上级信息',
          },
        ],
        // 上级层级
        higherLevels: [
          {
            name: '直属上级',
            value: '1',
          },
          {
            name: '第二级上级',
            value: '2',
          },
          {
            name: '第三级上级',
            value: '3',
          },
          {
            name: '第四级上级',
            value: '4',
          },
          {
            name: '第五级上级',
            value: '5',
          },
          {
            name: '第六级上级',
            value: '6',
          },
          {
            name: '第七级上级',
            value: '7',
          },
          {
            name: '第八级上级',
            value: '8',
          },
          {
            name: '第九级上级',
            value: '9',
          },
          {
            name: '第十级上级',
            value: '10',
          },
          {
            name: '第十一级上级',
            value: '11',
          },
          {
            name: '第十二级上级',
            value: '12',
          },
        ],
        // 部门负责人方式
        departmentHeadModes: [
          {
            name: '自下而上（以发起人的直接部门负责人为第一级）',
            value: 1,
            popovers: [
              {
                title: '什么是部门负责人 - 自下而上？',
                content: '以发起人的直接部门负责人为第一级，向更高管理层级递增',
              },
              {
                content: '图示：若小王为发起人，则小张是小王的“直接部门负责人”，小李是小王的“第二级部门负责人”',
              },
            ],
            href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
            hrefName: '如何配置部门负责人？',
          },
          {
            name: '自上而下（以公司的最高部门负责人为第一级）',
            code: 'higherLevel',
            value: 2,
            popovers: [
              {
                title: '什么是部门负责人 - 自上而下？',
                content: '以公司组织架构中的最高部门负责人为第一级，向更低管理层级递增',
              },
              {
                content: '图示：若小王为发起人，则小赵是小王的“最高部门负责人”，小周是小王的“第二级部门负责人”',
              },
            ],
            href: 'https://www.feishu.cn/hc/zh-CN/articles/360044810913',
            hrefName: '查看和设置上级信息',
          },
        ],
        // 部门负责人层级
        departmentHeads: [
          {
            name: '直属部门负责人',
            value: '1',
          },
          {
            name: '第二级部门负责人',
            value: '2',
          },
          {
            name: '第三级部门负责人',
            value: '3',
          },
          {
            name: '第四级部门负责人',
            value: '4',
          },
          {
            name: '第五级部门负责人',
            value: '5',
          },
          {
            name: '第六级部门负责人',
            value: '6',
          },
          {
            name: '第七级部门负责人',
            value: '7',
          },
          {
            name: '第八级部门负责人',
            value: '8',
          },
          {
            name: '第九级部门负责人',
            value: '9',
          },
          {
            name: '第十级部门负责人',
            value: '10',
          },
          {
            name: '第十一级部门负责人',
            value: '11',
          },
          {
            name: '第十二级部门负责人',
            value: '12',
          },
        ],
        // 部门审批人
        departmentApprovals: [
          {
            name: '部长',
            value: '101',
          },
          {
            name: '体系负责人',
            value: '102',
          },
          {
            name: 'HRBP',
            value: '103',
          },
          {
            name: '部门助理',
            value: '104',
          },
          {
            name: '资产助理',
            value: '105',
          },
          {
            name: '办公账号员',
            value: '106',
          },
          {
            name: '门禁员',
            value: '107',
          },
          {
            name: '转岗须知员',
            value: '108',
          },
          {
            name: '编码责任人',
            value: '109',
          },
          {
            name: '项目负责人',
            value: '110',
          },
        ],
        // 角色
        roles: [
          {
            name: '人事',
            value: '1',
          },
          {
            name: '行政',
            value: '2',
          },
          {
            name: '招聘',
            value: '3',
          },
          {
            name: '财务',
            value: '4',
          },
          {
            name: '法务',
            value: '5',
          },
          {
            name: '经理',
            value: '6',
          },
        ],
        // 岗位
        posts: [
          {
            name: '技术顾问',
            value: '1',
          },
          {
            name: 'HRBP',
            value: '2',
          },
          {
            name: '部门助理',
            value: '3',
          },
          {
            name: '行政专员',
            value: '4',
          },
          {
            name: '商务专员',
            value: '5',
          },
          {
            name: '现场助理',
            value: '6',
          },
          {
            name: '项目经理',
            value: '7',
          },
          {
            name: '薪酬专员',
            value: '8',
          },
          {
            name: '招聘专员',
            value: '9',
          },
          {
            name: '考勤专员',
            value: '10',
          },
          {
            name: '副总经理',
            value: '11',
          },
        ],
        // 用户组
        userGroups: [
          {
            name: '采购组',
            value: '1',
          },
          {
            name: '报销组',
            value: '2',
          },
          {
            name: '资产组',
            value: '3',
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
        this.visible = true;
        this.node = node;
      },
      onClose() {
        this.visible = false;
        this.$emit('close');
      },
      openPasswordModal(checked) {
        if (checked) {
          this.passwordVisible = true;
        }
      },
    },
  };
</script>
