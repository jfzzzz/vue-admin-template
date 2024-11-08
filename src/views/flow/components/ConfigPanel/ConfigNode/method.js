import FlowGraph from '../../../graph/index'

export function nodeOpt(id, globalGridAttr) {
  let curCel = null
  if (id) {
    const { graph } = FlowGraph
    const cell = graph.getCellById(id)
    if (!cell || !cell.isNode()) {
      return
    }
    curCel = cell
    globalGridAttr.nodeStroke = cell.attr('body/stroke')
    globalGridAttr.nodeStrokeWidth = cell.attr('body/strokeWidth')
    globalGridAttr.nodeFill = cell.attr('body/fill')
    globalGridAttr.nodeFontSize = cell.attr('text/fontSize')
    globalGridAttr.nodeColor = cell.attr('text/fill')
    globalGridAttr.nodeUsers = cell.attr('approve/users')
    globalGridAttr.title = cell.attr('title/text')
    globalGridAttr.text = cell.attr('text/text')
    globalGridAttr.text2 = cell.attr('text2/text')
    globalGridAttr.text3 = cell.attr('text3/text')
  }
  return curCel
}
