import { Graph, Addon, FunctionExt, Shape } from '@antv/x6'
import './shape'
import graphData from './opData'

export default class FlowGraph {
  static init() {
    this.graph = new Graph({
      container: document.getElementById('container'),
      // width: 1000, //画布宽度，默认使用容器宽度。
      // height: 800, // 	画布高度，默认使用容器高度。
      grid: { // 网格，默认使用 10px 的网格，但不绘制网格背景。
        size: 10,
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#cccccc',
            thickness: 1
          },
          {
            color: '#5F95FF',
            thickness: 1,
            factor: 4
          }
        ]
      },

      scroller: { // 滚动画布，默认禁用。
        enabled: true, // 是否启用
        pageVisible: true, // 是否允许页面滚动
        pageBreak: true,
        pannable: false
      },
      mousewheel: { // 鼠标滚轮缩放，默认禁用。
        enabled: true, // 是否启用
        modifiers: ['ctrl', 'meta'], // 鼠标滚轮缩放的快捷键
        minScale: 0.5, // 最小缩放比例
        maxScale: 2 // 最大缩放比例
      },

      selecting: { // 点选/框选，默认禁用。
        enabled: true, // 是否启用
        multiple: true, // 是否允许多选
        rubberband: true, // 是否允许框选
        movable: true, // 是否允许移动
        showNodeSelectionBox: true // 是否显示节点选择框
      },
      connecting: { // 连线选项。
        anchor: 'center', // 	锚点类型：中心点
        connectionPoint: 'anchor', // 	连接点类型：锚点或者箭头
        allowBlank: false, // 	是否允许连接到空白区域
        highlight: true, // 	是否高亮
        snap: true, // 	是否自动对齐到节点。
        connector: 'rounded', // 	连接器类型:圆角
        createEdge() { // 	自定义边
          return new Shape.Edge({
            attrs: { // 	边的样式
              line: { // 	边的样式
                stroke: '#5F95FF', // 边颜色
                strokeWidth: 1, // 边宽
                targetMarker: { // 边的箭头
                  name: 'classic', // 箭头类型
                  size: 8 // 箭头大小
                }
              }
            },
            router: { // 	边的拐点类型
              name: 'manhattan' // 拐点类型
            }
          })
        },
        validateConnection({ // 	自定义连接
          sourceView, // 	起始节点
          targetView,
          sourceMagnet,
          targetMagnet
        }) {
          if (sourceView === targetView) {
            return false
          }
          if (!sourceMagnet) {
            return false
          }
          if (!targetMagnet) {
            return false
          }
          return true
        }
      },
      highlighting: { // 	高亮选项。
        magnetAvailable: { // 	高亮选中的锚点
          name: 'stroke', // 	高亮选中的锚点的样式:描边
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: 'rgba(223,234,255)'
            }
          }
        }
      },
      snapline: true, // 对齐线，默认禁用。
      history: true, // 撤销/重做，默认禁用。
      clipboard: { // 剪切板，默认禁用。
        enabled: true
      },
      keyboard: { // 键盘快捷键，默认禁用。
        enabled: true
      },
      embedding: { // 嵌套节点，默认禁用。
        enabled: true,
        findParent({ node }) { // 寻找父节点
          const bbox = node.getBBox()
          return this.getNodes().filter(node => {
            // 只有 data.parent 为 true 的节点才是父节点
            const data = node.getData()
            if (data && data.parent) {
              const targetBBox = node.getBBox()
              return bbox.isIntersectWithRect(targetBBox)
            }
            return false
          })
        }
      },
      autoResize: true
    })
    this.initStencil()
    this.initShape()
    this.initGraphShape()
    this.initEvent()
    return this.graph
  }

  static initStencil() {
    this.stencil = new Addon.Stencil({
      target: this.graph,
      stencilGraphWidth: 280, // 画布宽度
      search: { rect: true },
      collapsable: true,
      groups: [
        {
          name: 'basic',
          title: '基础节点',
          graphHeight: 180
        },
        {
          name: 'combination',
          title: '组合节点',
          layoutOptions: {
            columns: 1,
            marginX: 60
          },
          graphHeight: 360
        },
        {
          name: 'group',
          title: '节点组',
          graphHeight: 100,
          layoutOptions: {
            columns: 1,
            marginX: 60
          }
        }
      ]
    })
    const stencilContainer = document.querySelector('#stencil')
    stencilContainer?.appendChild(this.stencil.container)
  }

  static initShape() {
    const { graph } = this
    const r1 = graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        body: {
          rx: 24,
          ry: 24
        },
        text: {
          text: '起始节点'
        }
      }
    })
    const r2 = graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        text: {
          text: '流程节点'
        }
      }
    })
    const r3 = graph.createNode({
      shape: 'flow-chart-rect',
      width: 52,
      height: 52,
      angle: 45,
      attrs: {
        'edit-text': {
          style: {
            transform: 'rotate(-45deg)'
          }
        },
        text: {
          text: '判断节点',
          transform: 'rotate(-45deg)'
        }
      },
      ports: {
        groups: {
          top: {
            position: {
              name: 'top',
              args: {
                dx: -26
              }
            }
          },
          right: {
            position: {
              name: 'right',
              args: {
                dy: -26
              }
            }
          },
          bottom: {
            position: {
              name: 'bottom',
              args: {
                dx: 26
              }
            }
          },
          left: {
            position: {
              name: 'left',
              args: {
                dy: 26
              }
            }
          }
        }
      }
    })
    const r4 = graph.createNode({
      shape: 'flow-chart-rect',
      width: 70,
      height: 70,
      attrs: {
        body: {
          rx: 35,
          ry: 35
        },
        text: {
          text: '链接节点'
        }
      }
    })

    const c1 = graph.createNode({
      shape: 'flow-chart-image-rect'
    })
    const c2 = graph.createNode({
      shape: 'flow-chart-title-rect'
    })
    const c3 = graph.createNode({
      shape: 'flow-chart-animate-text'
    })
    const c4 = graph.createNode({
      shape: 'flow-chart-combination-rect'
    })

    const g1 = graph.createNode({
      shape: 'groupNode',
      attrs: {
        text: {
          text: 'Group Name'
        }
      },
      data: {
        parent: true
      }
    })
    this.stencil.load([r1, r2, r3, r4], 'basic')
    this.stencil.load([c1, c2, c3, c4], 'combination')
    this.stencil.load([g1], 'group')
  }

  static initGraphShape() {
    this.graph.fromJSON(graphData)
  }

  static showPorts(ports, show) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }

  static initEvent() {
    const { graph } = this
    const container = document.getElementById('container')

    graph.on('node:contextmenu', ({ cell, view }) => {
      console.log(view.container)
      const oldText = cell.attr('text/text')
      cell.attr('text/style/display', 'none')
      const elem = view.container.querySelector('.x6-edit-text')
      if (elem) {
        elem.innerText = oldText
        elem.focus()
      }
      const onBlur = () => {
        cell.attr('text/text', elem.innerText)
      }
      if (elem) {
        elem.addEventListener('blur', () => {
          onBlur()
          elem.removeEventListener('blur', onBlur)
        })
      }
    })
    graph.on(
      'node:mouseenter',
      FunctionExt.debounce(() => {
        const ports = container.querySelectorAll('.x6-port-body')
        this.showPorts(ports, true)
      }),
      500
    )
    graph.on('node:mouseleave', () => {
      const ports = container.querySelectorAll('.x6-port-body')
      this.showPorts(ports, false)
    })

    graph.on('node:collapse', ({ node, e }) => {
      e.stopPropagation()
      node.toggleCollapse()
      const collapsed = node.isCollapsed()
      const cells = node.getDescendants()
      cells.forEach(n => {
        if (collapsed) {
          n.hide()
        } else {
          n.show()
        }
      })
    })
    // backspace
    graph.bindKey('delete', () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.removeCells(cells)
      }
    })
  }
}
