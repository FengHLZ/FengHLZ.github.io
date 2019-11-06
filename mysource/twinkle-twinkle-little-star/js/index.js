/************************************
  This codepen is part of the svg.js
  advent calendar. You can find all 
  the pens at twitter: @svg_js
*************************************/

const width = window.innerWidth
const height = window.innerHeight-10

const canvas = SVG()
  .addTo('body')
  .size(width, height)

// Every 100ms we decide if we want to create
// a new star and after which time
setInterval(() => {
  if (Math.random() < 0.7) {
    setTimeout(() => {
      createStar()
    }, Math.random() * 1000)
  }
}, 100)

// Creates a circle of random size and fades it in
const createStar = () => {
  const x = Math.random() * width
  const y = Math.random() * height

  const size = Math.random() * 15
  canvas.circle(size)
    .fill('yellow')
    .center(x, y)
    .opacity(0)
    .animate(2000)
    .opacity(1)
    .delay(500)
    // After fading in and delay
    // we twinkle the star away
    .after(function () {
      twinkle(x, y, size)
      this.element().remove()
    })
}

// Creates a polygon and animates it size
// while fading out
const twinkle = (x, y, size) => {
  canvas.polygon([0, 0, 10, 2, 12, 12, 14, 2, 24, 0, 14, -2, 12, -12, 10, -2])
    .fill('#f3eccf')
    .center(x, y)
    .scale(size/10, x, y)
    .animate(1000)
    .scale(size/3, x, y)
    .opacity(0)
    .after(function () {
      this.element().remove()
    })
}