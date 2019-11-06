/************************************
  This codepen is part of the svg.js
  advent calendar. You can find all
  the pens at twitter: @svg_js
*************************************/

const width = window.innerWidth
const height = window.innerHeight - 10

// Create SVG and set viewbox
// so that we zoom into the center
const canvas = SVG('#carSVG')
  .size(width, height)
  .viewbox(0, 0, width, height)

// Get the template for the car and its bbox
const template = SVG('#car')
const box = template.bbox()

// Add the track to the canvas and scale/move it
// accoring to window width and height
canvas.add(
    SVG('#track')
      .stroke({width: height/15})
      .size(width*0.9, height*0.9)
      .move(width/20, height/20)
  )

// Add car to group and scale it according to
// width and height
const car = canvas.group()
  .add(
    template.move(0, 0)
      .transform({
        scale: (height/20) / box.height,
        origin: [0, 0],
        translate: [width/2, height * 0.93]
      })
  )

// Create state vars for arrow keys
let bottomDown = false
let upDown = false
let leftDown = false
let rightDown = false

// Update state vars on keydown and keyup
SVG(document).on('keydown keyup', (e) => {
  const state = e.type == 'keydown' ? true : false
  switch (e.which) {
    case 38:
      upDown = state
      break
    case 40:
      bottomDown = state
      break
      break
    case 37:
      leftDown = state
      break
      break
    case 39:
      rightDown = state
      break
  }
})

// Define velocity and set start time
let v = 0
let start = performance.now()
const run = (now) => {
  // Calculate passed time
  const dt = (now - start) / 100
  start = now

  // Calculate the change of teh velocity
  // The velocity decreases when nohing is pressed
  // We can accellerate and hit break
  let dv = 0
  if (!bottomDown && !upDown) {
    dv -= Math.sign(v) * 0.5

    // Male sure, that we end up at zero
    // when this step lets us cross zero
    if (Math.sign(v) != Math.sign(v+dv*dt)) {
      v = -dv * dt
    }
  } else if (bottomDown) {
    if (v < 0) {
      // Make sure that we cannot accelerate forever
      dv -= 1 / (Math.max(1, Math.abs(v)))
    } else {
      // Breaking!
      dv -= 2
    }
  } else if (upDown) {
    if (v > 0) {
      // Make sure that we cannot accelerate forever
      dv += 1 / (Math.max(1, Math.abs(v)))
    } else {
      // Breaking!
      dv += 2
    }
  }

  // Calculate new velocity
  v += dv * dt

  // How much should the car turn?
  let angle = leftDown ? -3 : rightDown ? 3 : 0

  // At greater speed we cannot turn that well
  angle /= Math.max(1, Math.abs(v)/5)

  const rot = car.transform().rotate

  // Calculate changes of x and y values
  const dx = Math.cos(rot/180 * Math.PI) * v
  const dy = Math.sin(rot/180 * Math.PI) * v

  // Do the actual transform
  car.transform({
    translate: [dx, dy],
    rotate: angle,
    origin: 'center'
  }, true)

  // Request next frame
  SVG.Animator.frame(run)
}

// Start!
SVG.Animator.frame(run)