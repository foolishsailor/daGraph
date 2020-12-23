import { daGraph } from "../src/daGraph/daGraph.js"

let newGraph = new daGraph({
  containerName: "graphContainer",
  backgroundColor: "#c3b299",
  height: 500,
  width: 800
})

newGraph.buildMap()

const newPath = newGraph.addPath({
  strokeColor: "orange",
  points: [
    { position: { x: 20, y: 20 } },
    { stroke: 4, position: { x: 100, y: 100 } }
  ]
})

newPath.addPoints([
  { stroke: 8, position: { x: 80, y: 120 } },
  { stroke: 2, strokeColor: "green", position: { x: 100, y: 200 } }
])
