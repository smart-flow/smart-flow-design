<template>
  <a-select v-model="currentValue" :size="size" class="w-fill" @change="onChange">
    <a-select-option :value="data[valueName]" v-for="(data, i) in datas" :key="i">
      {{ data[labelName] }}
    </a-select-option>
  </a-select>
</template>
<script>
  export default {
    name: 'FlowSelect',
    props: {
      datas: {
        type: Array,
        required: false,
        default: () => [],
      },
      valueName: {
        type: String,
        required: false,
        default: 'value',
      },
      labelName: {
        type: String,
        required: false,
        default: 'name',
      },
      size: {
        type: String,
        required: false,
        default: 'large',
      },
      value: {
        type: Array,
        required: false,
        default: () => [],
      },
    },
    data() {
      return {
        currentValue: null,
      };
    },
    mounted() {
      if (this.value && this.value.length > 0) {
        this.currentValue = this.value[0];
      }
    },
    methods: {
      onChange(value) {
        this.$emit('input', [value]);
        this.$emit(
          'update:name',
          this.datas.filter((data) => data[this.valueName] == value).map((data) => data[this.labelName]),
        );
      },
    },
  };
</script>
