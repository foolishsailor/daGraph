/**
 *
 * @param {object}      ctx                     - html5 chart context
 * @param {object}      path                    - path object
 *  @param {number}     path.stroke              - width of path
 *  @param {string}     path.strokeColor              - color of point/path
 *  @param {array}      path.points             - array of point objects
 *    @param {object}   path.points.position
 *      @param {number} path.points.position.x
 *      @param {number} path.points.position.y
 *
 * These are optional and will be chosen first.  If not found then will use above
 *    @param {number}    path.points.stroke       - width of path
 *    @param {string}    path.points.strokeColor - color of point/path
 */
export const Path = function ({ ctx, path }) {
  const defaultStrokeColor = "black"
  const defaultStroke = 1
  let pathPoints = path.points || []

  const drawPath = () => {
    for (var j = 0; j < pathPoints.length; j++) {
      const pathStroke = pathPoints[j].stroke
        ? pathPoints[j].stroke
        : path.stroke
        ? path.stroke
        : defaultStroke
      const pathStrokeColor = pathPoints[j].strokeColor
        ? pathPoints[j].strokeColor
        : path.strokeColor
        ? path.strokeColor
        : defaultStrokeColor

      ctx.strokeStyle = pathStrokeColor
      ctx.lineWidth = pathStroke

      if (j === 0) {
        ctx.beginPath()
        ctx.moveTo(pathPoints[j].position.x, pathPoints[j].position.y)
      } else {
        ctx.lineTo(pathPoints[j].position.x, pathPoints[j].position.y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(pathPoints[j].position.x, pathPoints[j].position.y)
      }
    }
  }

  const addPoints = (points) => {
    pathPoints = [...pathPoints, ...points]
    drawPath()
  }

  //If there is data when object created then draw
  if (path.points && path.points.length > 0) drawPath()

  return {
    addPoints,
    drawPath
  }
}
