/************************************
  This codepen is part of the svg.js
  advent calendar. You can find all
  the pens at twitter: @svg_js
*************************************/

const width = window.innerWidth
const height = window.innerHeight - 10

// Create SVG and set viewbox so that
// we zoom into the point 0,0
const canvas = SVG()
  .addTo('body')
  .size(width, height)
  .viewbox(-width/8, -height/8, width/4, height/4)

// Create template-circle with attr syntax
// for later use
const circle = new SVG.Circle({
  r:3, cx: 0, cy: -20, fill: 'white'
})

// Create timeline
const timeline = new SVG.Timeline()

// Create background circle
const stroke = canvas.circle(40)
  .center(0,0)
  .fill('none')
  .stroke({
    color: 'white',
    opacity: 0.5,
    width: 6
  })

// Clone our template to get the circles
// which will be animated
const list = new SVG.List([
  circle.clone(),
  circle.clone(),
  circle.clone()
]).timeline(timeline).addTo(canvas)

// Animate circles with a custom easing function
// http://cubic-bezier.com/#0,.8,1,.2
list.forEach((c, i) => {
  c.animate(1000, i * 150, 'absolute')
    .ease(SVG.easing.bezier(0,.8,1,.2))
    .transform({rotate: 360, origin: [0, 0]}, true)
    .loop()
})