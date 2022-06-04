<template>
  <div>
    <FlowNav v-if="navable && !readable" :currentNav="currentNav" :key="0" @click="publish" @change="change" />
    <FlowInfo v-show="currentNav == 1" ref="flowInfo" :key="1" :readable="readable" :navable="navable" />
    <FlowDesign v-show="currentNav == 2" ref="flowDesign" :key="2" :readable="readable" :navable="navable" :node="node" />
    <FlowSetting v-show="currentNav == 3" ref="flowSetting" :key="3" :readable="readable" :navable="navable" />
  </div>
</template>
<script>
  import { flowMixin } from '../mixins/flowMixin';
  import FlowNav from '../Common/FlowNav.vue';
  import FlowInfo from './FlowInfo/index.vue';
  import FlowDesign from './FlowDesign/index.vue';
  import FlowSetting from './FlowSetting/index.vue';
  import { getStartNode } from '../util/nodeUtil';
  export default {
    name: 'FlowApprove',
    mixins: [flowMixin],
    components: { FlowNav, FlowInfo, FlowDesign, FlowSetting },
    props: {
      node: {
        type: Object,
        default: function() {
          return getStartNode();
        },
      },
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
        currentNav: 1,
      };
    },
    computed: {},
    mounted() {},
    methods: {
      toReturn() {},
      change(item) {
        this.currentNav = item.value;
      },
      handleSave() {},
      publish() {
        const flowInfoData = this.$refs['flowInfo'].getData();
        if (!flowInfoData) {
          this.currentNav = 1;
          return;
        }
        const flowDesignData = this.$refs['flowDesign'].getData();
        if (!flowDesignData) {
          this.currentNav = 2;
          return;
        }
      },
    },
  };
</script>
