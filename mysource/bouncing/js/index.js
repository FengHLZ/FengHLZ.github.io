var width = 400
var height = 400
var canvas = SVG().addTo('#canvas').size(width, height)

// Create the background which is visible trough the rect
const background = canvas.rect(400, 400).fill('https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80&.jpg')

// Create mask and apply it to the background
const mask = canvas.mask()
const mover = mask.rect(300, 80).fill('#fff').center(width/2, height/2)
background.maskWith(mask)

// A simple indicator showing the transformed boxx
let border = canvas.rect(0, 0).fill('none').stroke('white')

// State vars
let vx = 50
let vy = 50
let vRot = 15
let tx = 0
let ty = 0
let rot = 0

let box = mover.bbox()
let time = performance.now()
const update = () => {
  const now = performance.now()
  const dt = (now - time) / 1000
  time = now

  // Normally you would just use rbox but the rect is in the defs and therefore
  // not visible. Calling rbox would make it visible in the parser and return
  // wrong x and y from there
  const transform = mover.transform()
  const {x, y, x2, y2, w, h} = box.transform(transform)

  // Move the border to visualize the transformed box
  border.attr({x, y, width:w, height:h})

  // Update state vars
  tx += vx * dt
  ty += vy * dt
  rot = (rot + vRot * dt) % 360

  // Check which direction to go for the next frame
  if (x < 0) vx = Math.abs(vx)
  if (x2 > width) vx = -Math.abs(vx)

  if (y < 0) vy = Math.abs(vy)
  if (y2 > height) vy = -Math.abs(vy)

  // Transform rectangle
  mover.transform({
    translate: [tx, ty],
    rotate: rot,
    origin: [box.cx,  box.cy]
  })

  // Request next frame
  SVG.Animator.frame(update)
}

// Start
SVG.Animator.frame(update)