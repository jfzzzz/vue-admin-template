<template>
  <div id="wrap" class="wrap">
    <!--    <div class="header">-->
    <!--      <span>流程设计器</span>-->
    <!--      <span>-->
    <!--&lt;!&ndash;          <span style="margin-right: 16px; cursor: pointer">&ndash;&gt;-->
    <!--&lt;!&ndash;            设计指南&ndash;&gt;-->
    <!--&lt;!&ndash;          </span>&ndash;&gt;-->
    <!--&lt;!&ndash;      <GithubOutlined onClick={openGithub} />&ndash;&gt;-->
    <!--      </span>-->
    <!--    </div>-->
    <div class="content">
      <!--左侧工具栏-->
      <div id="stencil" class="sider" />
      <div class="panel">
        <!--流程图工具栏-->
        <div class="toolbar">
          <tool-bar v-if="isReady" />
        </div>
        <!--流程图画板-->
        <div id="container" class="x6-graph" />
      </div>
      <!--右侧工具栏-->
      <div class="config">
        <config-panel v-if="isReady" />
      </div>
    </div>
  </div>
</template>

<script setup name="Flow">
import FlowGraph from './graph'
import ToolBar from './components/ToolBar/index.vue'
import ConfigPanel from './components/ConfigPanel/index.vue'

const getContainerSize = () => {
  const wrap = document.getElementById('wrap')
  if (wrap) {
    return {
      width: wrap.offsetWidth - 590,
      height: wrap.offsetHeight - 50,
    }
  } else {
    return {
      width: 1000,
      height: 600,
    }
  }
}
const isReady = ref(false)

const initGraph = function () {
  const graph = FlowGraph.init()
  const resizeFn = () => {
    const { width, height } = getContainerSize()
    graph.resize(width, height)
    graph.centerContent()
  }
  isReady.value = true
  resizeFn()
  window.addEventListener('resize', resizeFn)
  return () => {
    window.removeEventListener('resize', resizeFn)
  }
}

onMounted(() => {
  initGraph()
})
</script>

<style lang="scss" scoped>
@import url(./index.scss);
@import url(./reset/global.css);
@import url(./reset/reset.scss);
</style>
