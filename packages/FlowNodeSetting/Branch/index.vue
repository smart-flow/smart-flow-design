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
      <img :src="branchIcon2" class="anticon" />
      <span class="flow-ant-drawer-title">
        <EditName v-model="node.nodeName" />
      </span>
    </template>
    <div class="flow-setting-module">
      <div class="flow-setting-content">
        <div class="flow-setting-item">
          <p class="flow-setting-item-title">分支等级</p>
          <a-select v-model="node.priorityLevel" :size="size" style="width: 100%" placeholder="请选择等级" :options="levelOptions"></a-select>
        </div>
        <div class="flow-setting-item">
          <p class="flow-setting-item-title">分支类型</p>
          <a-radio checked>规则</a-radio>
        </div>
        <div class="flow-setting-item">
          <p class="flow-setting-item-title">分支条件</p>
          <div class="flow-setting-condition-box">
            <div v-for="(group, i) in groups" :key="i">
              <div class="flow-setting-condition-group">
                <div class="flow-setting-condition-item" v-for="(condition, k) in group.conditions" :key="k">
                  <a-select v-model="condition.columnValue" :size="size" style="width: 140px" placeholder="字段" @change="handleChange">
                    <a-select-option :value="column.value" v-for="(column, i) in group.columns" :key="i">{{ column.label }}</a-select-option>
                  </a-select>
                  <div class="flow-setting-condition-option">
                    <a-select v-model="condition.optType" :size="size" style="width: 30%;" placeholder="判断符" @change="handleChange">
                      <a-select-option :value="optType.value" v-for="(optType, t) in optTypes" :key="t">
                        {{ optType.label }}
                      </a-select-option>
                    </a-select>
                    <a-select v-model="condition.valueType" :size="size" style="width: 30%;" placeholder="值类型" @change="condition.conditionValue = null">
                      <a-select-option :value="valueType.value" v-for="(valueType, u) in valueTypes" :key="u">
                        {{ valueType.label }}
                      </a-select-option>
                    </a-select>
                    <div class="flow-setting-condition-value">
                      <!-- 动态值 -->
                      <a-select v-if="condition.valueType == 2" v-model="condition.conditionValue" :size="size" placeholder="数值" class="w-fill">
                        <a-select-option :value="dynamic.value" v-for="(dynamic, j) in dynamicValueTypes" :key="j">
                          {{ dynamic.label }}
                        </a-select-option>
                      </a-select>
                      <!-- 流程值 -->
                      <a-select v-else-if="condition.valueType == 3" v-model="condition.conditionValue" :size="size" placeholder="数值" class="w-fill">
                        <a-select-option :value="flow.value" v-for="(flow, j) in flowValueTypes" :key="j">
                          {{ flow.label }}
                        </a-select-option>
                      </a-select>
                      <!-- 数据源 -->
                      <a-select v-else-if="condition.valueType == 4" v-model="condition.conditionValue" :size="size" placeholder="数值" class="w-fill">
                        <a-select-option :value="column.value" v-for="(column, k) in group.columns" :key="k">
                          {{ column.label }}
                        </a-select-option>
                      </a-select>
                      <!-- 固定 -->
                      <a-input v-else v-model="condition.conditionValue" :size="size" placeholder="数值" />
                      <!-- <a-cascader v-if="condition.valueType == 4" v-model="condition.conditionValue" :options="dataSourceOptions" :size="size" placeholder="数值" class="w-fill"/> -->
                    </div>
                  </div>
                  <div class="flow-setting-condition-del" @click="delCondition(1, group, condition)">
                    <a-icon type="delete" theme="filled" />
                  </div>
                </div>
                <div class="flow-setting-condition-add" @click="addCondition(1, group)">
                  <a-icon type="plus-circle" theme="filled" />
                  <span style="margin-left: 5px;">且条件</span>
                </div>
              </div>
              <div v-if="groups.length > 1 && i != groups.length - 1" class="flow-setting-condition-group-connector">或</div>
            </div>
            <div class="flow-setting-condition-add" @click="addGroup(1)">
              <a-icon type="plus-circle" theme="filled" />
              <span style="margin-left: 5px;">或条件</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- {{ groups }} -->
    <FlowDrawerFooter @close="onClose" @save="onSave" />
  </a-drawer>
</template>
<script>
  import { flowMixin } from '../../mixins/flowMixin';
  import EditName from '../../Common/EditName.vue';
  import FlowDrawerFooter from '../../Common/DrawerFooter.vue';
  export default {
    name: 'FlowBranchSetting',
    components: { EditName, FlowDrawerFooter },
    mixins: [flowMixin],
    data() {
      return {
        node: {},
        visible: false,
        headerStyle: {
          'background-color': '#5ccc98',
          'border-radius': '0px 0px 0 0',
        },
        // 等级
        levelOptions: [],
        groups: [
          {
            id: this.uuid(),
            condition: 'OR',
            columns: [
              { label: '姓名', value: '姓名' },
              { label: '工号', value: '工号' },
              { label: '部门', value: '部门' },
              { label: 'Base地', value: 'Base地' },
              { label: '所属体系', value: '所属体系' },
              { label: '归属地', value: '归属地' },
            ],
            conditions: [
              {
                id: this.uuid(),
                columnId: '姓名',
                columnName: '姓名',
                columnValue: '姓名',
                columnType: '',
                optType: 'eq',
                valueType: '1',
                conditionValue: '',
              },
            ],
          },
        ],
        optTypes: [
          { label: '等于', value: 'eq' },
          { label: '不等于', value: 'ne' },
          { label: '大于', value: 'gt' },
          { label: '大于等于', value: 'ge' },
          { label: '小于', value: 'lt' },
          { label: '小于等于', value: 'le' },
          { label: '为空', value: '7' },
          { label: '不为空', value: '8' },
        ],
        valueTypes: [
          { label: '固定', value: '1' },
          { label: '动态值', value: '2' },
          { label: '流程值', value: '3' },
          /* { label: '数据源', value: '4' }, */
        ],
        dynamicValueTypes: [
          { label: '当前员工', value: '1' },
          { label: '当前员工工号', value: '2' },
          { label: '当前部门', value: '3' },
          { label: '当前组织', value: '4' },
          { label: '下级部门', value: '5' },
          { label: '上级部门', value: '6' },
          { label: '当前日期', value: '7' },
          { label: '当前时间', value: '8' },
        ],
        flowValueTypes: [
          { label: '流程状态', value: '1' },
          { label: '流程创建人', value: '2' },
        ],
        dataSourceOptions: [
          {
            value: '1',
            label: '本表单',
            children: [
              { label: '姓名', value: '姓名' },
              { label: '工号', value: '工号' },
              { label: '部门', value: '部门' },
              { label: 'Base地', value: 'Base地' },
              { label: '所属体系', value: '所属体系' },
              { label: '归属地', value: '归属地' },
            ],
          },
        ],
      };
    },
    methods: {
      afterVisibleChange(val) {
        console.log('visible', val);
      },
      showDrawer(node, routeNode) {
        this.visible = true;
        this.node = node;
        // 等级
        this.levelOptions = [];
        routeNode.conditionNodes.forEach((item, index) => {
          let priorityLevel = index + 1;
          this.levelOptions.push({ label: '优先' + priorityLevel, value: priorityLevel });
        });
      },
      onClose() {
        this.visible = false;
        this.$emit('close');
      },
      handleChange() {},
      addGroup(type) {
        if (type == 1) {
          this.groups.push({
            id: this.uuid(),
            condition: 'OR',
            columns: [
              { label: '姓名', value: '姓名' },
              { label: '工号', value: '工号' },
              { label: '部门', value: '部门' },
              { label: 'Base地', value: 'Base地' },
              { label: '所属体系', value: '所属体系' },
              { label: '归属地', value: '归属地' },
            ],
            conditions: [
              {
                id: this.uuid(),
                columnId: '姓名',
                columnName: '姓名',
                columnValue: '姓名',
                columnType: undefined,
                optType: 'eq',
                valueType: '1',
                conditionValue: '',
              },
            ],
          });
        }
      },
      addCondition(type, currGroup) {
        if (type == 1) {
          this.groups.forEach((group) => {
            if (currGroup.id == group.id) {
              group.conditions.push({
                id: this.uuid(),
                columnId: undefined,
                columnName: undefined,
                columnValue: undefined,
                columnType: undefined,
                optType: undefined,
                valueType: undefined,
                conditionValue: undefined,
              });
            }
          });
        }
      },
      delCondition(type, currGroup, CurrCondition) {
        if (type == 1) {
          this.groups.forEach((group, k) => {
            if (currGroup.id == group.id) {
              group.conditions.forEach((condition, index) => {
                if (CurrCondition.id == condition.id) {
                  group.conditions.splice(index, 1);
                  // 当前组没有条件了，当前组也需要删除
                  if (group.conditions.length == 0) {
                    this.groups.splice(k, 1);
                  }
                }
              });
            }
          });
        }
      },
      onSave() {
        if (this.groups.length > 0) {
          this.node.error = false;
        } else {
          this.node.error = true;
        }
        this.visible = false;
      },
    },
  };
</script>
