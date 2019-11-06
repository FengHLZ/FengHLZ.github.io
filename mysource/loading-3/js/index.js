/************************************
  This codepen is part of the svg.js
  advent calendar. You can find all
  the pens at twitter: @svg_js
*************************************/

const width = window.innerWidth
const height = window.innerHeight - 10

const canvas = SVG().addTo('body')
  .size(width, height)
  .viewbox(0, 0, width*2, height*2)

// Easing function taken from svg.easing plugin
const swingTo = function(pos) {
  var s = 1.70158
  return (pos-=1)*pos*((s+1)*pos + s) + 1
}

// A few helper functions to calculate
// radius and circumference
const getRadius = (i) => 25 + i * 20
const circum = (r) => r * 2 * Math.PI

// Create new timeline and keep runners forever
const t = new SVG.Timeline().persist(true)

// Start over when timline is finished
t.on('finished', (e) => {
  setTimeout(() => {
    t.stop().play()
  }, 1000)
})

// Create "num" circles
const makeCircles = (num) => {
  const l = new SVG.List()

  for (let i = 0; i < num; ++i) {
    let r = getRadius(i)
    let len = circum(r)
    // Offset the circles from the center at start
    let jitter = [
      Math.random() * 50 - 25,
      Math.random() * 50 - 25
    ]

    // Create circle, give random color and calculate
    // width, dasharray and dashoffset
    l.push(
      new SVG.Circle({r}).fill('none').stroke({
        color: SVG.Color.random('pastel'),
        width: 15 / (1 + i * 0.3),
        dasharray: [
          Math.round(len * 0.75),
          Math.round(len * 0.25)
        ],
        dashoffset: (i % 4) * Math.round(len * 0.25),
        linecap: 'round'
      }).transform({
        translate: jitter,
        scale: 1 + i * 0.3
      }).remember('jitter', jitter).timeline(t)
    )
  }

  return l
}


// Starts the animation. The circle is scaled,
// and  the dashoffset and stroke-width is changed
// In the end a runner is returned
const animate = (c, i) => {
  let r = getRadius(i)
  let len = circum(r)

  return c.animate(4000, 0, 'absolute').ease('<>')
    .stroke({
      dashoffset: (i % 4) * Math.round(len * 0.25) + (i % 2 ? len : -len),
      width: 15
    })
    .transform(new SVG.Matrix())
}

// Here, "c" is a runner. We chain another
// animation, which basically resets the
// circle to its start state
const reset = (c, i) => {
  let r = getRadius(i)
  let len = circum(r)
  let jitter = c.element().remember('jitter')

  return c.animate(500, 5000, 'absolute').ease(swingTo)
    .transform({
      translate: jitter,
      scale: 1 + i * 0.3
    })
    .stroke({width: 15 / (1 + i * 0.3)})
}

// And thats how it looks like in the end.
// Pretty simple, right?
const circles = makeCircles(6)
  .addTo(canvas.group().translate(width, height))
  .map(animate)
  .map(reset)