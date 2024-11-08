<template>
  <div class="config">
    <config-grid v-show="type === 'grid'" />
    <config-node v-show="type === 'node'" />
    <config-edge v-show="type === 'edge'" />
  </div>
</template>

<script setup name="Index">
import ConfigGrid from './ConfigGrid/index.vue';
import ConfigNode from './ConfigNode/index.vue';
import ConfigEdge from './ConfigEdge/index.vue';
import FlowGraph from '../../graph/index';
import './index.scss';
import { globalGridAttr } from '../../models/global';

const type = ref('grid');
const id = ref('');
// 待优化
const boundEvent = function () {
  const { graph } = FlowGraph;
  graph.on('blank:click', () => {
    type.value = 'grid';
  });
  graph.on('cell:click', ({ cell }) => {
    type.value = cell.isNode() ? 'node' : 'edge';
    id.value = cell.id;
  });
};
boundEvent();
provide('globalGridAttr', globalGridAttr);
provide('id', id);

</script>

<style lang="less" scoped></style>
