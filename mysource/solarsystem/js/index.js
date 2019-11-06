/************************************
  This codepen is part of the svg.js
  advent calendar. You can find all 
  the pens at twitter: @svg_js
*************************************/

var canvas = SVG().addTo('body')
  .size(window.innerWidth, window.innerHeight - 10)
  .viewbox(0, -500, 1500, 1500)

// Draw the earth model
const earthGroup = canvas.group()
const water = earthGroup.circle(509).fill('#86DAF1')
const continents = earthGroup.group()
continents.polygon('88,238 70,256 70,282 88,317 132,326 132,414 150,459 176,467 176,423 211,397 211,370 247,335 255,291 220,291 194,247 132,247 114,211')
continents.polygon('465,403 441,379 441,344 423,309 406,273 406,238 379,220 344,229 282,203 273,141 300,114 353,114 370,141 423,150 476,132 479,130 700, 130')
continents.polygon('441,79 414,97 370,88 344,79 308,88 282,79 300,44 335,44 370,26 400,26')
continents.polygon('160,18 185,35 238,44 229,70 203,79 176,123 132,150 70,158 70,185 88,203 88,238 61,220 35,203 19,156 19, 19')
continents.children().fill('#03AA6F')
continents.clipWith(water.clone())

// Scale the earth and move to start position
let {w} = earthGroup.bbox()
earthGroup.transform({
  translate: [950, 250],
  scale: 100 / w,
  origin: [0, 0]
})

// Create gradient for sun
// and add pulse effect
let gradient = canvas.gradient('radial', function(gradient) {
  gradient.stop(0, '#f00')
  gradient.stop(0, '#f00')
    .animate(2000)
    .update(0.8)
    .loop(Infinity, true)
  gradient.stop(1, '#ff0')
})

// Create sun, earth and moon
let sun = canvas.circle(200)
  .center(500, 300)
  .fill(gradient)
let earth = canvas.group().add(earthGroup)
let moon = canvas.circle(50)
  .center(1200, 300)
  .fill('#ffa')

// Rotate around the sun while spinning itself
earth.animate(10000).loop().ease('-')
  .transform({rotate: 360, origin: [500, 300]}, true)
  .transform({rotate: 720, origin: 'center'}, true)

// Rotate around the sun while
// rotating around the earth
moon.animate(10000).loop().ease('-')
  .transform({rotate: 360, origin: [500, 300]}, true)
  .transform({rotate: 3600, origin: [1000, 300]}, true)