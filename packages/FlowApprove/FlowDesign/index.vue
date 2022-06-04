<template>
  <transition name="router-fade" mode="out-in">
    <div class="designer-wrap" :style="{ height: readable ? '100vh' : navable ? 'calc(100vh - 50px)' : '100vh' }">
      <div class="designer-content-box">
        <div class="flow-design-wrap">
          <div id="flow-design" class="flow-design-container" :style="zoomStyle">
            <div id="flow-design-content" class="flow-design-content">
              <FlowStartNode :node="nodeData" />
              <FlowNode :node="nodeData" :readable="readable" />
              <FlowEndNode :node="nodeData" :readable="readable" />
            </div>
          </div>
          <FlowHelper v-if="!readable" />
          <FlowTips v-if="readable" />
          <FlowZoom v-model="zoomValue" />
          <FlowMap v-if="!isMobile" />
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import { flowMixin } from '../../mixins/flowMixin';
  import { getStartNode, validate } from '../../util/nodeUtil';
  import FlowZoom from '../../Common/FlowZoom.vue';
  import FlowMap from '../../Common/FlowMap.vue';
  import FlowNav from '../../Common/FlowNav.vue';
  import FlowHelper from '../../Common/FlowHelper.vue';
  import FlowTips from '../../Common/FlowTips.vue';
  import FlowNode from '../../FlowNode/index.vue';
  import FlowStartNode from '../../FlowNode/Start';
  import FlowEndNode from '../../FlowNode/End';
  export default {
    name: 'FlowDesign',
    mixins: [flowMixin],
    components: { FlowMap, FlowZoom, FlowNav, FlowHelper, FlowTips, FlowStartNode, FlowNode, FlowEndNode },
    props: {
      node: {
        type: Object,
        default: () => {
          return getStartNode();
        },
      },
      navable: {
        type: Boolean,
        default: false,
      },
      readable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        zoomValue: 100,
      };
    },
    computed: {
      zoomStyle() {
        const zoom = this.zoomValue / 100;
        return {
          zoom: zoom,
        };
      },
      nodeData() {
        return this.$store.getters['flow/node'];
      },
    },
    mounted() {
      // 初始数据
      this.$store.dispatch('flow/setNode', this.node);
    },
    methods: {
      getData() {
        // 初始数据
        const data = this.nodeData;
        if (validate(data)) {
          console.log('flowDesign: ', data);
          return data;
        }
        return null;
      },
    },
  };
</script>
