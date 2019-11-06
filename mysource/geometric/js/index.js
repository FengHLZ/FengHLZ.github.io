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

function perspective ( i, p ) {
  return width / ( 0.8 * ( i - p ) )
}

const aspect = width / height
const cx = width / 2
const cy = height / 2

canvas.ellipse({ x: cx, y: cy, rx: 2, ry: 2  })

const n = 50
for ( let i = 0 ; i < n ; i ++ ) {
  
  // Go through the rects
  const width = perspective ( i, 0 )
  const height = width / aspect

  // Work out the 
  const lastWidth = perspective ( i, 1 )
  const lastHeight = lastWidth / aspect
  
  // Go through the 
  const rect = canvas
    .rect({ x: cx - width / 2 , y: cy - height / 2, width, height })
    .stroke( 'white' )
    .fill( 'none' )  
    .opacity( 0.8 * Math.cos( i / n * Math.PI  ) )
    
  rect.animate()
    .ease( t => t )
    .loop()
    .x( cx - lastWidth / 2 )
    .y( cy - lastHeight / 2 )
    .width ( lastWidth )
    .height( lastHeight )

   rect.animate( 3000, 50 * i, 'now' )
    .ease( t => t )
    .loop()
    .rotate( 180 )
}