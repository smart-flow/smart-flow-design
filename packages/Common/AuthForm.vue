<template>
  <div class="flow-setting-auth-table">
    <div class="flow-setting-auth-table-header">
      <div :class="{ 'flow-setting-auth-table-name-column-30': !readable, 'flow-setting-auth-table-name-column-25': readable }">
        <span>表单</span>
      </div>
      <div class="flow-setting-auth-table-option-column">
        <div :class="{ 'flow-setting-auth-table-option-column-item-50': !readable, 'flow-setting-auth-table-option-column-item-25': readable }" v-if="readable">
          <a-checkbox :checked="writableChecked" @change="onAllWritableChange">
            编辑
          </a-checkbox>
        </div>
        <div :class="{ 'flow-setting-auth-table-option-column-item-50': !readable, 'flow-setting-auth-table-option-column-item-25': readable }">
          <a-checkbox :checked="readableChecked" @change="onAllReadableChange">
            只读
          </a-checkbox>
        </div>
        <div :class="{ 'flow-setting-auth-table-option-column-item-50': !readable, 'flow-setting-auth-table-option-column-item-25': readable }">
          <a-checkbox :checked="displayableChecked" @change="onAllDisplayableChange">
            隐藏
          </a-checkbox>
        </div>
        <div :class="{ 'flow-setting-auth-table-option-column-item-50': !readable, 'flow-setting-auth-table-option-column-item-25': readable }" v-if="readable">
          <a-checkbox :checked="requiredChecked" @change="onAllRequiredChange">
            必填
          </a-checkbox>
        </div>
      </div>
    </div>
    <div class="flow-setting-auth-table-body">
      <div class="flow-setting-auth-table-name-column-row" v-for="(item, i) in fields" :key="i">
        <div :class="{ 'flow-setting-auth-table-name-column-30': !readable, 'flow-setting-auth-table-name-column-25': readable }">
          <span>{{ item.name }}</span>
        </div>
        <div class="flow-setting-auth-table-option-column">
          <div :class="{ 'flow-setting-auth-table-option-column-item-50': !readable, 'flow-setting-auth-table-option-column-item-25': readable }" v-if="readable">
            <a-checkbox :checked="item.writable" :v-model="item.writable" @change="writableChange($event, item)">
              编辑
            </a-checkbox>
          </div>
          <div :class="{ 'flow-setting-auth-table-option-column-item-50': !readable, 'flow-setting-auth-table-option-column-item-25': readable }">
            <a-checkbox :checked="item.readable" :v-model="item.readable" @change="readableChange($event, item)">
              只读
            </a-checkbox>
          </div>
          <div :class="{ 'flow-setting-auth-table-option-column-item-50': !readable, 'flow-setting-auth-table-option-column-item-25': readable }">
            <a-checkbox :checked="item.displayable" :v-model="item.displayable" @change="displayableChange($event, item)">
              隐藏
            </a-checkbox>
          </div>
          <div :class="{ 'flow-setting-auth-table-option-column-item-50': !readable, 'flow-setting-auth-table-option-column-item-25': readable }" v-if="readable">
            <a-checkbox :checked="item.required" :v-model="item.required" @change="displayableRequired($event, item)">
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
      readable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        fields: [
          {
            name: '姓名',
            writable: false,
            readable: true,
            displayable: false,
            required: false,
          },
          {
            name: '工号',
            writable: false,
            readable: false,
            displayable: false,
            required: false,
          },
          {
            name: '部门',
            writable: false,
            readable: false,
            displayable: false,
            required: false,
          },
          {
            name: '性别',
            writable: false,
            readable: false,
            displayable: false,
            required: false,
          },
          {
            name: '职位',
            writable: false,
            readable: false,
            displayable: false,
            required: false,
          },
          {
            name: '账号',
            writable: false,
            readable: false,
            displayable: false,
            required: false,
          },
          {
            name: '学历',
            writable: false,
            readable: false,
            displayable: false,
            required: false,
          },
          {
            name: '毕业证书',
            writable: false,
            readable: false,
            displayable: false,
            required: false,
          },
          {
            name: '资格证书',
            writable: false,
            readable: false,
            displayable: false,
            required: false,
          },
          {
            name: '身份证正面',
            writable: false,
            readable: false,
            displayable: false,
            required: false,
          },
          {
            name: '身份证反面',
            writable: false,
            readable: false,
            displayable: false,
            required: false,
          },
          {
            name: '银行信息',
            writable: false,
            readable: false,
            displayable: false,
            required: false,
          },
          {
            name: '相关附件',
            writable: false,
            readable: false,
            displayable: false,
            required: false,
          },
        ],
      };
    },
    computed: {
      writableChecked: function() {
        let me = this;
        let checked = me.fields.filter((item) => item.writable == false).length == 0;
        return checked;
      },
      readableChecked: function() {
        let me = this;
        return me.fields.filter((item) => item.readable == false).length == 0;
      },
      displayableChecked: function() {
        let me = this;
        return me.fields.filter((item) => item.displayable == false).length == 0;
      },
      requiredChecked: function() {
        let me = this;
        return me.fields.filter((item) => item.required == false).length == 0;
      },
    },
    mounted() {
      console.log(this.readable);
    },
    methods: {
      onAllWritableChange(e) {
        this.fields.forEach((item, i) => {
          this.writableChange(e, item);
        });
      },
      onAllReadableChange(e) {
        for (let item of this.fields) {
          this.readableChange(e, item);
        }
      },
      onAllDisplayableChange(e) {
        this.fields.forEach((item, i) => {
          this.displayableChange(e, item);
        });
      },
      onAllRequiredChange(e) {
        this.fields.forEach((item, i) => {
          this.displayableRequired(e, item);
        });
      },
      writableChange(e, item) {
        item.writable = e.target.checked;
        if (e.target.checked) {
          item.readable = !e.target.checked;
          item.displayable = !e.target.checked;
        } else {
          item.required = e.target.checked;
        }
      },
      readableChange(e, item) {
        item.readable = e.target.checked;
        if (e.target.checked) {
          item.writable = !e.target.checked;
          item.displayable = !e.target.checked;
          item.required = !e.target.checked;
        }
      },
      displayableChange(e, item) {
        item.displayable = e.target.checked;
        if (e.target.checked) {
          item.writable = !e.target.checked;
          item.readable = !e.target.checked;
          item.required = !e.target.checked;
        }
      },
      displayableRequired(e, item) {
        item.required = e.target.checked;
        if (e.target.checked) {
          item.readable = !e.target.checked;
          item.displayable = !e.target.checked;
          item.writable = e.target.checked;
        }
      },
    },
  };
</script>
