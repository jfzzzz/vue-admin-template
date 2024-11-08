<template>
  <div class="bar">
    <el-tooltip content="清屏 (Cmd + D)" placement="bottom">
      <el-button name="clear" class="item-space" size="small" @click="handleClick">清屏</el-button>
    </el-tooltip>
    <el-tooltip content="删除" placement="bottom">
      <el-button name="delete" class="item-space" size="small" @click="handleClick">删除</el-button>
    </el-tooltip>

    <el-tooltip content="撤销 (Cmd + Z)" placement="bottom">
      <el-button :disabled="!canUndo" name="undo" class="item-space" size="small" @click="handleClick">撤销</el-button>
    </el-tooltip>

    <el-tooltip content="重做 (Cmd + Shift + Z)" placement="bottom">
      <el-button :disabled="!canRedo" name="redo" class="item-space" size="small" @click="handleClick">重做</el-button>
    </el-tooltip>

    <el-tooltip content="复制 (Cmd + Shift + Z)" placement="bottom">
      <el-button name="copy" class="item-space" size="small" @click="handleClick">复制 </el-button>
    </el-tooltip>

    <el-tooltip content="剪切 (Cmd + X)" placement="bottom">
      <el-button name="cut" class="item-space" size="small" @click="handleClick">剪切</el-button>
    </el-tooltip>

    <el-tooltip content="粘贴 (Cmd + V)" placement="bottom">
      <el-button name="paste" class="item-space" size="small" @click="handleClick">粘贴</el-button>
    </el-tooltip>

    <el-tooltip content="保存PNG (Cmd + S)" placement="bottom">
      <el-button name="savePNG" class="item-space" size="small" @click="handleClick">保存PNG</el-button>
    </el-tooltip>

    <el-tooltip content="保存SVG (Cmd + S)" placement="bottom">
      <el-button name="saveSVG" class="item-space" size="small" @click="handleClick">保存SVG</el-button>
    </el-tooltip>

    <el-tooltip content="打印 (Cmd + P)" placement="bottom">
      <el-button name="print" class="item-space" size="small" @click="handleClick">打印</el-button>
    </el-tooltip>

    <el-tooltip content="导出 (Cmd + P)" placement="bottom">
      <el-button name="toJSON" class="item-space" size="small" @click="handleClick">导出</el-button>
    </el-tooltip>
  </div>
</template>

<script setup name="ToolBar">
import FlowGraph from '../../graph';
import { DataUri } from '@antv/x6';

const { graph } = FlowGraph;
const { history } = graph;

const canUndo = ref(history.canUndo());
const canRedo = ref(history.canRedo());

const copy = () => {
  const { graph } = FlowGraph;
  const cells = graph.getSelectedCells();
  if (cells.length) {
    graph.copy(cells);
  }
  return false;
};

const cut = () => {
  const { graph } = FlowGraph;
  const cells = graph.getSelectedCells();
  if (cells.length) {
    graph.cut(cells);
  }
  return false;
};

const paste = () => {
  const { graph } = FlowGraph;
  if (!graph.isClipboardEmpty()) {
    const cells = graph.paste({ offset: 32 });
    graph.cleanSelection();
    graph.select(cells);
  }
  return false;
};

const handleClick = (event) => {
  const { graph } = FlowGraph;
  const name = (event.currentTarget).name;
  switch (name) {
    case 'undo':
      graph.history.undo();
      break;
    case 'redo':
      graph.history.redo();
      break;
    case 'delete':
      // graph.clearCells();
      graph.removeCells(graph.getSelectedCells());
      break;
    case 'savePNG':
      graph.toPNG(
        (dataUri) => {
          // 下载
          DataUri.downloadDataUri(dataUri, 'chartx.png');
        },
        {
          backgroundColor: 'white',
          padding: {
            top: 20,
            right: 30,
            bottom: 40,
            left: 50,
          },
          quality: 1,
        },
      );
      break;
    case 'saveSVG':
      graph.toSVG((dataUri) => {
        // 下载
        DataUri.downloadDataUri(DataUri.svgToDataUrl(dataUri), 'chart.svg');
      });
      break;
    case 'print':
      graph.printPreview();
      break;
    case 'copy':
      copy();
      break;
    case 'cut':
      cut();
      break;
    case 'paste':
      paste();
      break;
    case 'toJSON':
      console.log(graph.toJSON());
      // graph.fromJSON({cells:[graph.toJSON().cells[0],graph.toJSON().cells[1]]})
      break;
    default:
      break;
  }
};

history.on('change', () => {
  canUndo.value = history.canUndo();
  canRedo.value = history.canRedo();
});
graph?.bindKey(['command+z', 'ctrl+z'], () => {
  if (graph?.history.canUndo()) {
    graph?.history.undo()
  }
  return false
})
graph?.bindKey(['command+shift+z', 'ctrl+shift+z'], () => {
  if (graph?.history.canRedo()) {
    graph?.history.redo()
  }
  return false
})
graph?.bindKey(['command+d', 'ctrl+d'], () => {
  graph.clearCells()
  return false
})
graph?.bindKey(['command+s', 'ctrl+s'], () => {
  graph.toPNG((datauri) => {
    DataUri.downloadDataUri(datauri, 'chart.png')
  })
  return false
})
graph?.bindKey(['command+p', 'ctrl+p'], () => {
  graph.printPreview()
  return false
})
graph?.bindKey(['command+c', 'ctrl+c'], copy)
graph?.bindKey(['command+v', 'ctrl+v'], paste)
graph?.bindKey(['command+x', 'ctrl+x'], cut)

</script>

<style lang="scss" scoped>
.bar {
  margin-right: 16px;
}

.item-space {
  margin-left: 16px;
}
</style>
