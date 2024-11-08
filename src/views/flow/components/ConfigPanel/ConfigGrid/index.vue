<template>
  <el-form :model="form" label-width="80px">
    <el-tabs v-model="activeName">
      <el-tab-pane name="1" label="网格">
        <el-form-item label="网格类型">
          <el-select v-model="globalGridAttr.type" style="width: 90%" @change="(val) => {
            globalGridAttr.type = val;
          }
            ">
            <el-option :value="GRID_TYPE.DOT">Dot</el-option>
            <el-option :value="GRID_TYPE.FIXED_DOT">Fixed Dot</el-option>
            <el-option :value="GRID_TYPE.MESH">Mesh</el-option>
            <el-option :value="GRID_TYPE.DOUBLE_MESH">Double Mesh</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网格尺寸">
          <el-slider v-model="globalGridAttr.size" :min="1" :max="20" :step="1" style="width: 90%;" @change="(val) => {
            globalGridAttr.size = val;
          }
            " />
        </el-form-item>
        <div v-if="globalGridAttr.type === 'doubleMesh'">
          <el-form-item label="Primary颜色">
            <el-color-picker v-model="globalGridAttr.color" @change="(val) => {
              globalGridAttr.color = val;
            }
              " />
          </el-form-item>
          <el-form-item label="Primary Thickness">
            <el-slider v-model="globalGridAttr.thickness" style="width: 90%;" :min="0.5" :max="10" :step="0.5" @change="(val) => {
              globalGridAttr.thickness = val;
            }
              " />
          </el-form-item>
          <el-form-item label="Secondary Color">
            <el-color-picker v-model="globalGridAttr.colorSecond" @change="(val) => {
              globalGridAttr.colorSecond = val;
            }
              " />
          </el-form-item>
          <el-form-item label="Secondary Thickness">
            <el-slider v-model="globalGridAttr.thicknessSecond" style="width: 90%;" :min="0.5" :max="10" :step="0.5"
              @change="(val) => {
                globalGridAttr.thicknessSecond = val;
              }
                " />
          </el-form-item>
          <el-form-item label="Scale Factor">
            <el-slider v-model="globalGridAttr.factor" style="width: 90%;" :min="1" :max="10" :step="1" @change="(val) => {
              globalGridAttr.factor = val;
            }
              " />
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="网格颜色">
            <el-color-picker v-model="globalGridAttr.color" @change="(val) => {
              globalGridAttr.color = val;
            }
              " />
          </el-form-item>
          <el-form-item label="Thickness">
            <el-slider v-model="globalGridAttr.thickness" style="width: 90%;" :min="0.5" :max="10" :step="0.5" @change="(val) => {
              globalGridAttr.thickness = val;
            }
              " />
          </el-form-item>
        </div>
      </el-tab-pane>

      <el-tab-pane name="2" label="背景">
        <el-form-item label="颜色">
          <el-color-picker v-model="globalGridAttr.bgColor" @change="(val) => {
            globalGridAttr.bgColor = val;
          }
            " />
        </el-form-item>
        <el-form-item label="水印">
          <el-checkbox v-model="globalGridAttr.showImage" @change="(e) => {
            globalGridAttr.showImage = e;
          }
            ">
            Show Image
          </el-checkbox>
        </el-form-item>
        <div v-if="globalGridAttr.showImage">
          <el-form-item label="重复类型">
            <el-select v-model="globalGridAttr.repeat" style="width: 100%" @change="(val) => {
              globalGridAttr.repeat = val;
            }
              ">
              <el-option :value="REPEAT_TYPE.NO_REPEAT">No Repeat</el-option>
              <el-option :value="REPEAT_TYPE.REPEAT">Repeat</el-option>
              <el-option :value="REPEAT_TYPE.REPEAT_X">Repeat X</el-option>
              <el-option :value="REPEAT_TYPE.REPEAT_Y">Repeat Y</el-option>
              <el-option :value="REPEAT_TYPE.ROUND">Round</el-option>
              <el-option :value="REPEAT_TYPE.SPACE">Space</el-option>
              <el-option :value="REPEAT_TYPE.FLIPX">Flip X</el-option>
              <el-option :value="REPEAT_TYPE.FLIPY">Flip Y</el-option>
              <el-option :value="REPEAT_TYPE.FLIPXY">Flip XY</el-option>
              <el-option :value="REPEAT_TYPE.WATERMARK">Watermark</el-option>
            </el-select>
          </el-form-item>
          <div v-if="globalGridAttr.repeat === 'watermark'">
            <el-form-item label="Watermark Angle">
              <el-slider v-model="globalGridAttr.angle" style="width: 90%;" :min="0" :max="360" :step="1" @change="(val) => {
                globalGridAttr.angle = val;
              }
                " />
            </el-form-item>
          </div>

          <el-form-item label="Position">
            <el-select v-model="globalGridAttr.position" style="width: 90%" @change="(val) => {
              globalGridAttr.position = val;
            }
              ">
              <el-option value="center">center</el-option>
              <el-option value="left">left</el-option>
              <el-option value="right">right</el-option>
              <el-option value="top">top</el-option>
              <el-option value="bottom">bottom</el-option>
              <el-option value="50px 50px">50px 50px</el-option>
              <el-option :value="JSON.stringify({ x: 50, y: 50 })"> {`{ x: 50, y: 50 }`} </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Size">
            <el-select v-model="globalGridAttr.bgSize" style="width: 90%" @change="(val) => {
              globalGridAttr.bgSize = val;
            }
              ">
              <el-option value="auto auto">auto auto</el-option>
              <el-option value="cover">cover</el-option>
              <el-option value="contain">contain</el-option>
              <el-option value="30px 30px">30px 30px</el-option>
              <el-option value="100% 100%">100% 100%</el-option>
              <el-option :value="JSON.stringify({ width: 150, height: 150 })"> {`{width: 150, height: 150 }`}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Opacity">
            <el-slider v-model="globalGridAttr.opacity" style="width: 90%;" :min="0.05" :max="1" :step="0.05" @change="(val) => {
              globalGridAttr.opacity = val;
            }
              " />
          </el-form-item>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script setup name="ConfigGrid">
// import FlowGraph from '@/views/graph'

import { gridOpt, backGroundOpt, gridSizeOpt } from './method';

const GRID_TYPE_ENUM = {
  DOT: 'dot',
  FIXED_DOT: 'fixedDot',
  MESH: 'mesh',
  DOUBLE_MESH: 'doubleMesh',
}

const REPEAT_TYPE_ENUM = {
  NO_REPEAT: 'no-repeat',
  REPEAT: 'repeat',
  REPEAT_X: 'repeat-x',
  REPEAT_Y: 'repeat-y',
  ROUND: 'round',
  SPACE: 'space',
  FLIPX: 'flipX',
  FLIPY: 'flipY',
  FLIPXY: 'flipXY',
  WATERMARK: 'watermark',
}

const GRID_TYPE = reactive(GRID_TYPE_ENUM);
const REPEAT_TYPE = reactive(REPEAT_TYPE_ENUM);
const globalGridAttr = inject('globalGridAttr');

gridOpt(globalGridAttr);
gridSizeOpt(globalGridAttr);
backGroundOpt(globalGridAttr);

let activeName = ref('1')
const form = ref({})

// 监听网格变化
watch(
  [
    () => globalGridAttr.type,
    () => globalGridAttr.color,
    () => globalGridAttr.thickness,
    () => globalGridAttr.thicknessSecond,
    () => globalGridAttr.colorSecond,
    () => globalGridAttr.factor,
  ],
  () => {
    gridOpt(globalGridAttr);
  },
  {
    immediate: false,
    deep: false,
  },
);

// 监听网格大小变化
watch(
  [() => globalGridAttr.size],
  () => {
    gridSizeOpt(globalGridAttr);
  },
  {
    immediate: false,
    deep: false,
  },
);

// 监听背景变化
watch(
  [
    () => globalGridAttr.bgColor,
    () => globalGridAttr.showImage,
    () => globalGridAttr.repeat,
    () => globalGridAttr.angle,
    () => globalGridAttr.bgSize,
    () => globalGridAttr.position,
    () => globalGridAttr.opacity,
  ],
  () => {
    backGroundOpt(globalGridAttr);
  },
  {
    immediate: false,
    deep: false,
  },
);
</script>

<style lang="less" scoped></style>
