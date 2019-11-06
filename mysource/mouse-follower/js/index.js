/************************************
  This codepen is part of the svg.js
  advent calendar. You can find all 
  the pens at twitter: @svg_js
*************************************/

const width = window.innerWidth -10
const height = window.innerHeight - 10

const canvas = SVG()
  .addTo('body')
  .size(width, height)

// Some instructions
canvas.text('Move your mouse!')
  .font('size', 20)
  .move(30, 30)
  .fill('white')

// Thats new: You can wrap all dom nodes
// you want with SVG() and call methods
// of the Dom class on it
SVG(document).on('mousemove', (e) => {
  
  // point() gives you x, y transformed into the 
  // coordinate system of the element
  const {x, y} = canvas.point(e.pageX, e.pageY)
  setTimeout(() => {
    const fillColor = SVG.Color.random()
    
    // Thats new: You can pass an object with attrs
    // into every factory function instead of the old
    // parameters
    canvas.circle({r:25})
      .center(x, y)
      .fill(fillColor)
      .stroke({
        width: 15,
        color: fillColor,
        opacity: 0.4
      })
      // Simply shrink the circles
      .animate()
      .attr({r:0})
      .after(function () {
        // 'this' is bound to the runner here
        // element() gives back the element which
        // is animated
        this.element().remove()
      })
  }, 200)
})