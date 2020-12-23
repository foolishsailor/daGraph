import { Path } from "./path.js"
import { addMouseEvents } from "./addMouseEvents.js"

export const daGraph = function ({
  containerName = "mapContainer",
  height = 500,
  width = 1000,
  padding = 10,
  pathColor = "white",
  pathWidth = 2,
  backgroundColor,
  resize = false
}) {
  let canvasBounds,
    chartCanvas = document.createElement("canvas"),
    overlayCanvas = document.createElement("canvas"),
    overlayContext = overlayCanvas.getContext("2d"),
    chartContext = chartCanvas.getContext("2d")

  const paths = []

  const fillBackground = (context) => {
    //background color or transparent
    if (typeof backgroundColor != "undefined") {
      context.fillStyle = backgroundColor
      context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    }
  }

  /********************** PUBLIC METHODS *****************/

  /**
   *   Create canvas and attach to dom element
   */

  const buildMap = () => {
    chartCanvas.id = "chartCanvas"
    chartCanvas.setAttribute("z-index", 1)
    chartCanvas.style.position = "absolute"

    overlayCanvas.id = "overlayCanvas"
    overlayCanvas.setAttribute("z-index", 0)
    overlayCanvas.style.position = "absolute"

    document.getElementById(containerName).appendChild(chartCanvas)
    document.getElementById(containerName).appendChild(overlayCanvas)

    chartContext.canvas.height = height
    chartContext.canvas.width = width

    overlayContext.canvas.height = chartContext.canvas.height
    overlayContext.canvas.width = chartContext.canvas.width

    canvasBounds = chartContext.canvas.getBoundingClientRect()
    console.log("Canvas Bounds", canvasBounds)

    fillBackground(chartContext)
    addMouseEvents(overlayContext)
  }

  /**
   * Add data to map
   */
  const addPath = (path) => {
    const newPath = new Path({
      ctx: chartContext,
      path
    })

    paths.push(newPath)
    return newPath
  }

  /**
   *   Clear canvas
   */
  const eraseMap = () => {
    chartContext.clearRect(0, 0, chartCanvas.width, chartCanvas.height)
    overlayContext.clearRect(0, 0, chartCanvas.width, chartCanvas.height)
  }

  /**
   *   Remove canvas from DOM
   */
  const removeCanvas = () => {
    let children =
      document.getElementById(containerName).querySelectorAll("canvas") || []

    children.forEach((child) => {
      child.parentNode.removeChild(child)
    })
  }

  return {
    paths,
    buildMap,
    addPath,
    eraseMap,
    removeCanvas
  }
}
