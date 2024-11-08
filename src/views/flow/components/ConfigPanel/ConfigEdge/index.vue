<template>
    <el-form :model="form" label-width="80px">
    <el-tabs v-model="activeName">
      <el-tab-pane name="1" label="线条">
        <el-form-item label="宽度">
          <el-slider v-model="globalGridAttr.strokeWidth" style="width: 90%;" :min="1" :max="5" :step="1" @change="onStrokeWidthChange" />
        </el-form-item>
        <el-form-item label="颜色">
          <el-color-picker
            v-model="globalGridAttr.stroke"
            @change="onStrokeChange"
          />
        </el-form-item>
        <el-form-item label="连线类型">
          <el-select v-model="globalGridAttr.connector" style="width: 90%" @change="onConnectorChange">
            <el-option value="normal">Normal</el-option>
            <el-option value="smooth">Smooth</el-option>
            <el-option value="rounded">Rounded</el-option>
            <el-option value="jumpover">Jumpover</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Label">
          <el-input v-model="globalGridAttr.label" style="width: 90%" @change="onLabelChange" />
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script setup name="ConfigEdge">
import FlowGraph from '../../../graph/index';
const globalGridAttr = inject('globalGridAttr');

const id = inject('id');

let curCell;

let activeName = ref('1')

const form = ref({})

watch(
  [() => id.value],
  () => {
    const { graph } = FlowGraph;
    const cell = graph.getCellById(id.value);
    if (!cell || !cell.isEdge()) {
      return;
    }
    curCell = cell;
    const connector = cell.getConnector() || {
      name: 'normal',
    };
    globalGridAttr.stroke = cell.attr('line/stroke');
    globalGridAttr.strokeWidth = cell.attr('line/strokeWidth');
    globalGridAttr.connector = connector.name;
    globalGridAttr.label = (cell.getLabels()[0]?.attrs)?.text?.text || '';
  },
  {
    immediate: false,
    deep: false,
  },
);

const onStrokeWidthChange = (val) => {
  globalGridAttr.strokeWidth = val;
  curCell?.attr('line/strokeWidth', val);
};

const onStrokeChange = (e) => {
  const val = e.target.value;
  globalGridAttr.stroke = val;
  curCell?.attr('line/stroke', val);
};

const onConnectorChange = (val) => {
  globalGridAttr.connector = val;
  curCell?.setConnector(val);
};

const onLabelChange = (e) => {
  const val = e.target.value;
  globalGridAttr.label = val;
  curCell.setLabels([
    {
      attrs: {
        text: {
          text: val,
        },
      },
      position: {
        distance: 0.5,
      },
    },
  ]);
  // curCell.appendLabel({
  //   attrs: {
  //     text: {
  //       text: val,
  //     },
  //   },
  //   position: {
  //     distance: 0.25,
  //   },
  // })
};
</script>

<style lang="less" scoped></style>
