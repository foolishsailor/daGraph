export const addMouseEvents = (context) => {
  const canvasBounds = context.canvas.getBoundingClientRect()

  let mouseDownPosition,
    mouseDown = false

  const handleMouseDown = (e) => {
    mouseDown = true
    mouseDownPosition = {
      x: e.clientX - canvasBounds.left,
      y: e.clientY - canvasBounds.top
    }
    console.log("Mouse POsition", mouseDownPosition)
  }

  const handleMouseUp = () => {
    mouseDown = false
    mouseDownPosition = {}
    console.log("Mouse Up")
  }

  const handleMouseOut = () => {
    mouseDown = false
    mouseDownPosition = {}
    console.log("Mouse Out")
  }

  const handleMouseMove = (e) => {
    if (mouseDown) {
    }
  }

  //attache mouse event listeners
  context.canvas.onmousedown = handleMouseDown
  context.canvas.onmouseup = handleMouseUp
  context.canvas.onmouseout = handleMouseOut
  context.canvas.onmousemove = handleMouseMove

  return context
}
