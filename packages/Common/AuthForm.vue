<template>
  <div class="flow-setting-auth-table">
    <div class="flow-setting-auth-table-header">
      <div :class="{ 'flow-setting-auth-table-name-column-30': !isEdit, 'flow-setting-auth-table-name-column-25': isEdit }">
        <span>表单</span>
      </div>
      <div class="flow-setting-auth-table-option-column" >
        <div :class="{ 'flow-setting-auth-table-option-column-item-50': !isEdit, 'flow-setting-auth-table-option-column-item-25': isEdit }" v-if="isEdit">
          <a-checkbox :checked="editChecked" @change="onAllEditChange">
            编辑
          </a-checkbox>
        </div>
        <div :class="{ 'flow-setting-auth-table-option-column-item-50': !isEdit, 'flow-setting-auth-table-option-column-item-25': isEdit }">
          <a-checkbox :checked="isEditChecked" @change="onAllisEditChange">
            只读
          </a-checkbox>
        </div>
        <div :class="{ 'flow-setting-auth-table-option-column-item-50': !isEdit, 'flow-setting-auth-table-option-column-item-25': isEdit }">
          <a-checkbox :checked="showChecked" @change="onAllShowChange">
            隐藏
          </a-checkbox>
        </div>
        <div :class="{ 'flow-setting-auth-table-option-column-item-50': !isEdit, 'flow-setting-auth-table-option-column-item-25': isEdit }" v-if="isEdit">
          <a-checkbox :checked="requiredChecked" @change="onAllRequiredChange">
            必填
          </a-checkbox>
        </div>
      </div>
    </div>
    <div class="flow-setting-auth-table-body">
      <div class="flow-setting-auth-table-name-column-row" v-for="(item, i) in datas" :key="i">
        <div :class="{ 'flow-setting-auth-table-name-column-30': !isEdit, 'flow-setting-auth-table-name-column-25': isEdit }">
          <span>{{ item.label }}</span>
        </div>
        <div class="flow-setting-auth-table-option-column">
          <div :class="{ 'flow-setting-auth-table-option-column-item-50': !isEdit, 'flow-setting-auth-table-option-column-item-25': isEdit }" v-if="isEdit">
            <a-checkbox :checked="item.edit" :v-model="item.edit" @change="editChange($event, item)">
              编辑
            </a-checkbox>
          </div>
          <div :class="{ 'flow-setting-auth-table-option-column-item-50': !isEdit, 'flow-setting-auth-table-option-column-item-25': isEdit }">
            <a-checkbox :checked="item.isEdit" :v-model="item.isEdit" @change="isEditChange($event, item)">
              只读
            </a-checkbox>
          </div>
          <div :class="{ 'flow-setting-auth-table-option-column-item-50': !isEdit, 'flow-setting-auth-table-option-column-item-25': isEdit }">
            <a-checkbox :checked="item.show" :v-model="item.show" @change="showChange($event, item)">
              隐藏
            </a-checkbox>
          </div>
          <div :class="{ 'flow-setting-auth-table-option-column-item-50': !isEdit, 'flow-setting-auth-table-option-column-item-25': isEdit }" v-if="isEdit">
            <a-checkbox :checked="item.required" :v-model="item.required" @change="showRequired($event, item)">
              必填
            </a-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'FlowNodeSettingAuthForm',
    props: {
      isEdit: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        datas: [
          {
            label: '姓名',
            edit: false,
            isEdit: true,
            show: false,
            required: false,
          },
          {
            label: '工号',
            edit: false,
            isEdit: false,
            show: false,
            required: false,
          },
          {
            label: '部门',
            edit: false,
            isEdit: false,
            show: false,
            required: false,
          },
          {
            label: '性别',
            edit: false,
            isEdit: false,
            show: false,
            required: false,
          },
          {
            label: '职位',
            edit: false,
            isEdit: false,
            show: false,
            required: false,
          },
          {
            label: '账号',
            edit: false,
            isEdit: false,
            show: false,
            required: false,
          },
          {
            label: '学历',
            edit: false,
            isEdit: false,
            show: false,
            required: false,
          },
          {
            label: '毕业证书',
            edit: false,
            isEdit: false,
            show: false,
            required: false,
          },
          {
            label: '资格证书',
            edit: false,
            isEdit: false,
            show: false,
            required: false,
          },
          {
            label: '身份证正面',
            edit: false,
            isEdit: false,
            show: false,
            required: false,
          },
          {
            label: '身份证反面',
            edit: false,
            isEdit: false,
            show: false,
            required: false,
          },
          {
            label: '银行信息',
            edit: false,
            isEdit: false,
            show: false,
            required: false,
          },
          {
            label: '相关附件',
            edit: false,
            isEdit: false,
            show: false,
            required: false,
          },
        ],
      };
    },
    computed: {
      editChecked: function() {
        let me = this;
        let checked = me.datas.filter((item) => item.edit == false).length == 0;
        return checked;
      },
      isEditChecked: function() {
        let me = this;
        return me.datas.filter((item) => item.isEdit == false).length == 0;
      },
      showChecked: function() {
        let me = this;
        return me.datas.filter((item) => item.show == false).length == 0;
      },
      requiredChecked: function() {
        let me = this;
        return me.datas.filter((item) => item.required == false).length == 0;
      },
    },
    mounted(){
      console.log(this.isEdit)
    },
    methods: {
      onAllEditChange(e) {
        this.datas.forEach((item, i) => {
          this.editChange(e, item);
        });
      },
      onAllisEditChange(e) {
        for (let item of this.datas) {
          this.isEditChange(e, item);
        }
      },
      onAllShowChange(e) {
        this.datas.forEach((item, i) => {
          this.showChange(e, item);
        });
      },
      onAllRequiredChange(e) {
        this.datas.forEach((item, i) => {
          this.showRequired(e, item);
        });
      },
      editChange(e, item) {
        item.edit = e.target.checked;
        if (e.target.checked) {
          item.isEdit = !e.target.checked;
          item.show = !e.target.checked;
        } else {
          item.required = e.target.checked;
        }
      },
      isEditChange(e, item) {
        item.isEdit = e.target.checked;
        if (e.target.checked) {
          item.edit = !e.target.checked;
          item.show = !e.target.checked;
          item.required = !e.target.checked;
        }
      },
      showChange(e, item) {
        item.show = e.target.checked;
        if (e.target.checked) {
          item.edit = !e.target.checked;
          item.isEdit = !e.target.checked;
          item.required = !e.target.checked;
        }
      },
      showRequired(e, item) {
        item.required = e.target.checked;
        if (e.target.checked) {
          item.isEdit = !e.target.checked;
          item.show = !e.target.checked;
          item.edit = e.target.checked;
        }
      },
    },
  };
</script>
