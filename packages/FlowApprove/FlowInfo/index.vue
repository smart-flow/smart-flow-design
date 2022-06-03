<template>
  <div class="designer-wrap" :style="{ height: readable ? '100vh' : navable ? 'calc(100vh - 50px)' : '100vh' }">
    <div class="designer-base-info">
      <div class="base-info-panel">
        <a-form :layout="formLayout" :form="form">
          <a-form-item label="图标">
            <a-avatar shape="square" size="large" icon="red-envelope" />
          </a-form-item>
          <a-form-item label="名称">
            <a-input placeholder="请输入名称" :size="size" v-decorator="['flowName', { rules: [{ required: true, message: '名称必填' }] }]" />
          </a-form-item>
          <a-form-item label="分组">
            <FlowSimpleSelect
              :datas="flowGroups"
              labelName="label"
              placeholder="请选择分组"
              @change="(value) => form.setFieldsValue({ flowGroup: value })"
              v-decorator="['flowGroup', { rules: [{ required: true, message: '分组必填' }] }]"
            />
          </a-form-item>
          <a-form-item label="绑定表单">
            <FlowSelect
              :datas="forms"
              mode="multiple"
              labelName="label"
              placeholder="请选择表单"
              @change="changeBindForm"
              v-decorator="['bindForm', { rules: [{ required: true, message: '表单必选' }] }]"
            />
          </a-form-item>
          <a-form-item v-if="showType" label="多表单显示模式">
            <a-radio-group :size="size" class="w-fill" v-decorator="['type', { initialValue: '1', rules: [{ required: false, message: '表单必选' }] }]">
              <a-radio value="1">
                <span>标签栏</span>
              </a-radio>
              <a-radio value="2">
                <span>步进式</span>
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="谁可以管理这个审批">
            <UserSelector type="button" />
          </a-form-item>
          <a-form-item label="说明">
            <a-textarea
              :size="size"
              :rows="4"
              placeholder="说明"
              @change="(value) => form.setFieldsValue({ remark: value })"
              v-decorator="['remark', { rules: [{ required: false, message: '表单必选' }] }]"
            />
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
  import { flowMixin } from '../../mixins/flowMixin';
  import FlowNav from '../../Common/FlowNav.vue';
  import FlowSelect from '../../Component/FlowSelect.vue';
  import FlowSimpleSelect from '../../Component/FlowSimpleSelect.vue';
  export default {
    name: 'FlowInfo',
    mixins: [flowMixin],
    components: { FlowNav, FlowSelect, FlowSimpleSelect },
    props: {
      navable: {
        type: Boolean,
        default: true,
      },
      readable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        form: this.$form.createForm(this, {
          flowName: null,
          flowGroup: null,
          bindForm: null,
          type: 1,
          remark: null,
        }),
        showType: false,
        buttonName: '保存',
        formLayout: 'vertical',
        flowGroups: [
          { label: '人事', value: '人事' },
          { label: '考勤', value: '考勤' },
          { label: '行政', value: '行政' },
          { label: '财务', value: '财务' },
          { label: '薪酬', value: '薪酬' },
          { label: '资产', value: '资产' },
        ],
        forms: [
          { label: '请假表单', value: '人事表单' },
          { label: '加班表单', value: '考勤表单' },
          { label: '调休表单', value: '调休表单' },
          { label: '补卡表单', value: '补卡表单' },
          { label: '出差表单', value: '出差表单' },
          { label: '销假表单', value: '销假表单' },
        ],
      };
    },
    computed: {},
    mounted() {},
    methods: {
      changeBindForm(values) {
        this.form.setFieldsValue({ bindForm: values });
        if (values.length > 1) {
          this.showType = true;
        } else {
          this.showType = false;
        }
      },
      getData() {
        let result = null;
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('flowInfo: ', values);
            result = values;
          }
        });
        return result;
      },
    },
  };
</script>
