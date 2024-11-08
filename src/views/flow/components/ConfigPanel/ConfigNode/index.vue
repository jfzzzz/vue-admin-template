<template>
  <el-form :model="form" label-width="80px">
    <el-tabs v-model="activeName">
      <el-tab-pane name="1" label="节点">
        <el-form-item label="边框颜色">
          <el-color-picker v-model="globalGridAttr.nodeStroke" size="default" @change="onStrokeChange" />
        </el-form-item>
        <el-form-item label="边框宽度">
          <el-slider v-model="globalGridAttr.nodeStrokeWidth" style="width: 90%;" :min="1" :max="5" :step="1"
            @change="onStrokeWidthChange" />
        </el-form-item>
        <el-form-item label="填充颜色">
          <el-color-picker v-model="globalGridAttr.nodeFill" size="default" @change="onFillChange" />
        </el-form-item>
        <el-form-item v-if="globalGridAttr.title" style="width: 90%;" label="title">
          <el-input v-model="globalGridAttr.title" @change="onTitleChange" />
        </el-form-item>
        <el-form-item v-if="globalGridAttr.text" style="width: 90%;" label="text">
          <el-input v-model="globalGridAttr.text" @change="onTextChange" />
        </el-form-item>
        <el-form-item v-if="globalGridAttr.text2" style="width: 90%;" label="text2">
          <el-input v-model="globalGridAttr.text2" @change="onText2Change" />
        </el-form-item>
        <el-form-item v-if="globalGridAttr.text3" style="width: 90%;" label="text3">
          <el-input v-model="globalGridAttr.text3" @change="onText3Change" />
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane name="2" label="文本">
        <el-form-item label="文本大小">
          <el-slider v-model="globalGridAttr.nodeFontSize" style="width: 90%;" :min="8" :max="16" :step="1"
            @change="onFontSizeChange" />
        </el-form-item>
        <el-form-item label="文本颜色">
          <el-color-picker v-model="globalGridAttr.nodeColor" size="default" @change="onColorChange" />
        </el-form-item>
      </el-tab-pane>
      <el-tab-pane name="3" label="属性">
        <el-form-item label="用户">
          <el-input v-model="globalGridAttr.nodeUsers" style="width: 90%;" @change="onUsersChange" />
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script setup name="ConfigNode">
import { nodeOpt } from './method';

const globalGridAttr = inject('globalGridAttr');
const id = inject('id');
const form = ref({})
let activeName = ref('1')
let curCel;
watch(
  id,
  (newV) => {
    curCel = nodeOpt(newV, globalGridAttr);
  },
  {
    immediate: false,
    deep: false,
  },
);

const onStrokeChange =(val)=> {
  globalGridAttr.nodeStroke = val
  curCel?.attr('body/stroke', val)
}
const onStrokeWidthChange = (val)=> {
  globalGridAttr.nodeStrokeWidth = val
  curCel?.attr('body/strokeWidth', val)
}
const onFillChange = (val)=> {
  globalGridAttr.nodeFill = val
  curCel?.attr('body/fill', val)
}
const onFontSizeChange = (val)=> {
  globalGridAttr.nodeFontSize = val
  curCel?.attr('text/fontSize', val)
}
const onColorChange = (val)=> {
  globalGridAttr.nodeColor = val
  curCel?.attr('text/fill', val)
}
const onUsersChange = (val)=> {
  globalGridAttr.nodeUsers = val
  curCel?.attr('approve/users', val)
}
const onTitleChange = (val)=> {
  // globalGridAttr.title = val
  curCel?.attr('title/text', globalGridAttr.title)
}
const onTextChange = (val)=> {
  // globalGridAttr.title = val
  curCel?.attr('text/text', globalGridAttr.text)
}
const onText2Change = (val)=> {
  // globalGridAttr.title = val
  curCel?.attr('text2/text', globalGridAttr.text2)
}
const onText3Change = (val)=> {
  // globalGridAttr.title = val
  curCel?.attr('text3/text', globalGridAttr.text3)
}

</script>

<style lang="less" scoped></style>
