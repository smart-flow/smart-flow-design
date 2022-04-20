<template>
  <!-- <FlowDesign ref="FlowDesign" :node.sync="childNode" /> -->
  <FlowDesign ref="FlowDesign" />
</template>
<script>
  export default {
    data() {
      return {
        childNode: {},
        /* childNode: {
          nodeName: '审批节点',
          type: 1,
          settype: 2,
          childNode: {
            nodeName: '路由',
            type: 4,
            settype: 1,
            childNode: {
              nodeName: '抄送人',
              type: 2,
              ccSelfSelectFlag: 1,
              childNode: {
                nodeName: '钉钉通知',
                type: 5,
                settype: 1,
              },
              nodeUserList: [],
              error: false,
            },
            conditionNodes: [
              {
                nodeName: '条件1',
                type: 3,
                settype: 1,
                childNode: {
                  nodeName: '审核人',
                  type: 1,
                  settype: 1,
                  childNode: null,
                  conditionNodes: [],
                },
                conditionNodes: [],
              },
              {
                nodeName: '条件2',
                type: 3,
                settype: 1,
                childNode: null,
                conditionNodes: [],
              },
            ],
          },
          nodeUserList: [],
        }, */
      };
    },
    created() {},
    methods: {
      toReturn() {
        this.$router.push({ path: '/flow/model' });
      },
      handleSave() {
        this.$refs.FlowDesign.handleSave();
      },
    },
  };
</script>
