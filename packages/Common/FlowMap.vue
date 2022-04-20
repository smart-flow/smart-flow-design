<template>
  <div id="flow-design-map" class="flow-design-map">
    <img :src="$store.state.flow.mapImg" />
    <div id="flow-design-map-mask" class="map-mask" :style="mapMask" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseleave="handleMouseUp"></div>
  </div>
</template>
<script>
  import { flowMixin } from '../mixins/flowMixin';
  export default {
    name: 'FlowMap',
    components: {},
    mixins: [flowMixin],
    props: {
      element: {
        type: String,
        default: '#flow-design-content',
      },
    },
    data() {
      return {
        // 是否有滚动条
        scroll: false,
        flowDesign: null,
        flowMap: null,
        flowMapMsk: null,

        wrapHeight: 0,
        top: 0,

        mouseDown: false,
      };
    },
    computed: {
      // 流程图视窗高度与流程总高度的比
      scaleHeight() {
        return this.containerHeight / this.wrapHeight;
      },
      // 小地图高度与流程总高度的比
      scaleOffsetHeight() {
        if (!this.flowMap && this.wrapHeight) {
          return 1;
        }
        return this.flowMap.clientHeight / this.wrapHeight;
      },
      // 流程图视窗高度
      containerHeight() {
        if (this.flowDesign) {
          return this.flowDesign.clientHeight;
        }
        return 0;
      },
      mapMask() {
        return {
          width: '100%',
          height: `${this.scaleHeight * 100}%`,
          left: '0px',
          top: `${this.top}px`,
        };
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.flowDesign = document.querySelector('#flow-design');
        this.flowMap = document.querySelector('#flow-design-map');
        this.flowMapMsk = document.querySelector('#flow-design-map-mask');
        this.initSize(this.flowDesign);
        this.$store.dispatch('flow/updateMap', { element: this.element });

        // 监听滚动条
        window.addEventListener('scroll', this.handleScroll, true);
        // 监听出现滚动条
        const timer = setInterval(() => {
          if (this.flowDesign.scrollHeight > this.flowDesign.clientHeight) {
            this.scroll = true;
          } else {
            this.scroll = false;
          }
          this.initSize(this.flowDesign);
        }, 1000);
        this.$once('hook:beforeDestroy', () => {
          clearInterval(timer);
        });

        // 监听鼠标移动
        window.addEventListener('mousemove', this.handleMouseMove);
        // 监听页面的mouseleave事件，当鼠标移出浏览器页面可用区域 并 松开按键时，停止拖动
        window.addEventListener('mouseleave', this.handleMouseUp);
      });
    },
    methods: {
      initSize(flowDesign) {
        this.wrapHeight = flowDesign.scrollHeight;
      },
      handleScroll(e) {
        this.top = this.flowDesign.scrollTop * this.scaleOffsetHeight;
      },
      handleMouseDown(e) {
        const me = this;
        this.mouseDown = true;
      },
      handleMouseMove(e) {
        if (this.mouseDown) {
          const directionY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
          if (directionY >= 0 && this.flowMapMsk.offsetHeight + this.top < this.flowMap.offsetHeight) {
            this.top++;
          } else if (this.top > 0) {
            this.top--;
          }
          this.flowDesign.scrollTop = this.top / this.scaleOffsetHeight;
        }
      },
      handleMouseUp(e) {
        this.mouseDown = false;
        document.onmousemove = document.onmouseup = null;
      },
    },
  };
</script>
