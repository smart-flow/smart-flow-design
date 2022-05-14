<template>
  <div class="designer-wrap">
    <FlowNav v-if="navable && !readable" :currentNav="1" :buttonName="buttonName" @click="publish" @change="change" />
    <div class="designer-base-info">
      <div class="base-info-panel">
        <a-form :layout="formLayout">
          <a-form-item label="图标">
            <a-avatar shape="square" size="large" icon="red-envelope" />
          </a-form-item>
          <a-form-item label="名称">
            <a-input placeholder="请输入名称" :size="size" />
          </a-form-item>
          <a-form-item label="分组">
            <FlowSimpleSelect :datas="flowGroups" labelName="label" placeholder="请选择分组" />
          </a-form-item>
          <a-form-item label="全局表单">
            <FlowSimpleSelect :datas="forms" labelName="label" placeholder="请选择表单" />
          </a-form-item>
          <a-form-item label="谁可以管理这个审批">
            <UserSelector type="button" />
          </a-form-item>
          <a-form-item label="说明">
            <a-textarea :size="size" :rows="4" placeholder="说明" />
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
  import { flowMixin } from '../mixins/flowMixin';
  import FlowNav from '../Common/FlowNav.vue';
  import FlowSimpleSelect from '../Component/FlowSimpleSelect.vue';
  export default {
    name: 'BasicInfo',
    mixins: [flowMixin],
    components: { FlowNav, FlowSimpleSelect },
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
          { label: '请假', value: '人事' },
          { label: '加班', value: '考勤' },
          { label: '调休', value: '调休' },
          { label: '补卡', value: '补卡' },
          { label: '出差', value: '出差' },
          { label: '销假', value: '销假' },
        ],
      };
    },
    computed: {},
    mounted() {},
    methods: {
      toReturn() {},
      change(type) {},
      handleSave() {},
      getData() {
        return this.nodeData;
      },
      publish() {
        this.$emit('publish', this.nodeData);
      },
    },
  };
</script>
