/************************************
  This codepen is part of the svg.js
  advent calendar. You can find all 
  the pens at twitter: @svg_js
*************************************/

const width = window.innerWidth
const height = window.innerHeight - 10
const { random } = Math

  // Thats new: height and with are not set automatically anymore
const canvas = SVG()
  .addTo('body')
  .size(width, height)

// Some instructions
canvas.text('Mouse over any circle!')
  .font('size', 20)
  .move(30, 30)
  .fill('white')

// Create a few circles
// and give them a random color size and posirion
for (let i = 0; i < 20; ++i) {
  let fillColor = SVG.Color.random()
  canvas
    .circle(10 + random() * 50)
    .fill(fillColor)
    .stroke({
      width: 15,
      color: fillColor,
      opacity: 0.4
    })
    .center(random() * width, random() * height)
}

// Here we get a list with find
// You can create own lists with new SVG.List()
// It is a real or faked array (depending on your browser version)
const list = canvas.find('circle')

// Thats new: Animation with a controller instead of a duration
const animationRunners = list.animate(new SVG.Spring(1000, 20))

// Whenever we move over a rectangle, we want the controller
// to move each circle to a new position
list.on('mousemove', (e) => {
  animationRunners.each(circleAnim => {
    circleAnim.center(random() * width, random() * height)
  })
})