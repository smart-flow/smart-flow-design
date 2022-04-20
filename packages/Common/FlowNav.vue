<template>
  <div class="designer-nav-box">
    <div class="designer-nav-return">
      <img :src="backIcon" />
      <div class="select-version-box">
        <span class="title">test</span>
        <span class="version">&nbsp;V1</span>
        <i class="el-icon-caret-bottom selec-down"></i>
      </div>
    </div>
    <div class="designer-nav-center">
      <div class="designer-nav-center-wrap">
        <div class="designer-nav-center-wrap-item" @click="onChange(1)">
          <span :class="{ 'act-item': currentNav == 1 }">流程</span>
        </div>
      </div>
      <div class="designer-nav-center-wrap">
        <div class="designer-nav-center-wrap-item" @click="onChange(2)">
          <span :class="{ 'act-item': currentNav == 2 }">配置</span>
        </div>
      </div>
    </div>
    <div class="designer-nav-button">
      <a-button type="primary" :size="size" @click="onClick">
        <span>{{ buttonName }}</span>
      </a-button>
    </div>
  </div>
</template>
<script>
  import { flowMixin } from '../mixins/flowMixin';
  export default {
    name: 'FlowNav',
    components: {},
    mixins: [flowMixin],
    props: {
      currentNav: {
        type: Number,
        default: 1,
      },
      buttonName: {
        type: String,
        default: '发布',
      },
    },
    data() {
      return {};
    },
    methods: {
      onChange(type) {
        this.$emit('change', type);
      },
      onClick() {
        this.$emit('click');
      },
    },
  };
</script>
