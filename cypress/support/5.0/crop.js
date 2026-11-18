// Pure geometry: reject clipping rather than silently shrinking readable content.
function clipFor(rect, viewport, padding = 10) {
  if (![rect.x, rect.y, rect.width, rect.height, viewport.width, viewport.height, padding].every(Number.isFinite)) throw new Error('Invalid capture geometry')
  if (padding < 0 || rect.width <= 0 || rect.height <= 0) throw new Error('Capture must have positive size and non-negative padding')
  const x = Math.floor(rect.x - padding)
  const y = Math.floor(rect.y - padding)
  const right = Math.ceil(rect.x + rect.width + padding)
  const bottom = Math.ceil(rect.y + rect.height + padding)
  if (x < 0 || y < 0 || right > viewport.width || bottom > viewport.height) throw new Error('Capture does not fit the viewport with its margin. Choose a tighter region or increase this scene viewport; do not scale down or use negative padding. ' + JSON.stringify({ rect, viewport, padding }))
  return { x, y, width: right - x, height: bottom - y }
}
function unionRect(first, last) {
  if (!last) return { x: first.x, y: first.y, width: first.width, height: first.height }
  const x = Math.min(first.x, last.x), y = Math.min(first.y, last.y)
  return { x, y, width: Math.max(first.x + first.width, last.x + last.width) - x, height: Math.max(first.y + first.height, last.y + last.height) - y }
}
module.exports = { clipFor, unionRect }
