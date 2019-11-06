/************************************
  This codepen is part of the svg.js
  advent calendar. You can find all 
  the pens at twitter: @svg_js
*************************************/

// Create <svg>, add it to body and give it a size
const canvas = SVG().addTo('body').size(800, 650)

// Some text
canvas.text('Fast animations!').font('size', 30).move(30, 30)

// build and animate tiles
for (let i = 0; i < 15; i++) {
  for (let j = 0; j < 10; j++) {
    // Make the rect and give it a nice random color
    let rect = canvas.rect(40, 40)
      .move(30 + 50 * i, 50 * j + 100)
      .fill(SVG.Color.random())

    // Animate the rect with random delay
    rect.animate(3000, Math.random() * 2000)
      .transform({
        rotate: 720
      }, true)
      .fill(SVG.Color.random())
  }
}</svg>