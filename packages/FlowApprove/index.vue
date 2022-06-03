<template>
  <div>
    <FlowNav v-if="navable && !readable" :currentNav="currentNav" @click="publish" @change="change" />
    <FlowInfo v-if="currentNav == 1" ref="flowInfo" :readable="readable" :navable="navable" />
    <FlowDesign v-if="currentNav == 2" ref="flowDesign" :readable="readable" :navable="navable" :node="node" />
    <FlowSetting v-if="currentNav == 3" ref="flowSetting" :readable="readable" :navable="navable" />
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
      getData() {},
      publish() {},
    },
  };
</script>
