/************************************
  This codepen is part of the svg.js
  advent calendar. You can find all 
  the pens at twitter: @svg_js
*************************************/

// This is the timeline which we will
// use throughout the whole code
const timeline = new SVG.Timeline().persist(true)

// Get a reference to our canvas
// and adjust its width and height
const canvas = SVG('svg').size(window.innerWidth, window.innerHeight - 10)

// Get the viewbox width for later use
const { width } = canvas.viewbox()

// Reference to timeline area
const timelineArea = SVG('#timeline')

/****************************
  Setting up all Animations
*****************************/

// Reference to car (setting the correct timeline)
const car = SVG('#car').timeline(timeline)

// Animate car
car.transform({ tx: width - 500 }).opacity(0.1)
// Move ths car over 10 sec starting at timeline zero
car.animate(10000, 0, 'absolute').ease('-')
  .transform({ tx: -width })
  // Fade in the car after one second
  .animate(1000, 1000, 'absolute')
  .opacity(1)
  // Fade out the car after 8 seconds
  .animate(1000, 8000, 'absolute')
  .opacity(0.1)

// Reference to fence (and timeline...)
const fence = SVG('#fence').timeline(timeline)
// Animate the fence, loop 10 times
fence.animate(1000, 0, 'absolute').ease('-')
  .loop(10)
  .transform({ tx: 375 }, true)

// Reference to road (timeline...)
const road = SVG('#road').timeline(timeline)
// Animate the road, loop 5 times
road.animate(2000, 0, 'absolute').ease('-')
  .loop(5)
  .transform({ tx: 750 }, true)

// Reference to island (jeah - you know what...)
const island = SVG('#island').timeline(timeline)
// Move it slowly for nice effect
island.animate(10000, 0, 'absolute').ease('-')
  .transform({ tx: 500 }, true)

// Reference to clouds (I will skip that now!)
const clouds = SVG('#clouds').timeline(timeline)
// Same as for the island
clouds.animate(10000, 0, 'absolute').ease('-')
  .transform({ tx: -300 }, true)

// Get wheels and put them into a lost to save code
const frontWheel = SVG('#frontWheel')
const backWheel = SVG('#backWheel')
const wheels = new SVG.List([frontWheel, backWheel])

// Execute this for the items in the list
wheels.timeline(timeline)
  .animate(1000, 0, 'absolute').ease('-')
  .loop(10)
  // The wheel goes round and round
  .transform({ rotate: -360 }, true)

/********************************************
  Drawing the timeline and make it function
*********************************************/

// In our case these are 10 seconds.
// But you don't you know that always
const endTime = timeline.getEndTime()

// Shrinking the box of the timeline for easier use later
const padding = 50
let box = timelineArea.bbox()
box.x += padding
box.y += padding
box.width -= padding * 2
box.height -= padding * 2

// Calculate a factor from the width
// of the box and the timeline duration
const factor = box.width / endTime

// Get the schedule of the timeline
const schedule = timeline.schedule()
const lenSchedule = schedule.length

// Create a group to hold the schedule items
const runners = timelineArea.group().move(box.x, box.y)
const runnerHeight = box.height / lenSchedule

schedule.forEach((runnerInfo, i) => {
  const { start, duration } = runnerInfo

  // For every runner on the schedule draw a rectangle
  runners.rect(factor * duration, runnerHeight * 0.9)
    .move(start * factor, 0.05 * runnerHeight + i * runnerHeight)
    .fill('white')
    .radius(10)
})

// The stepper shows us where we are in the Animation
const stepper = runners.rect(10, box.height)
  .fill('black')

// It is updated whenever the timeline makes a tick
timeline.on('time', (e) => {
  stepper.move(e.detail * factor, 0)
})

// When we click on the timeline we want jump there
timelineArea.on('click', (e) => {
  let { x } = runners.point(e.pageX, e.pageY)
  timeline.time(x / factor)
})

// Just a nice line when we hover the timeline
let timeout
const pointer = runners.rect(10, box.height).opacity(0).fill('black')
timelineArea.on('mousemove', (e) => {
  if (timeout) clearTimeout(timeout)

  pointer.opacity(1)
  let { x } = runners.point(e.pageX, e.pageY)

  pointer.move(x, 0)

  setTimeout(() => {
    pointer.opacity(0)
  }, 1000)
})

/***********************
  Drawing the controls
************************/

const controls = canvas.group().translate(150, 150)

// Play / Pause
const play = controls.group()
play.circle(100).fill('white').stroke({
  color: 'white',
  width: 10,
  opacity: 0.3
})

const playIcon = play.group()
playIcon.polygon([0, 0, 0, 50, 30, 25])
playIcon.line([40, 0, 40, 50]).stroke({ width: 5, color: 'black' })
playIcon.line([55, 0, 55, 50]).stroke({ width: 5, color: 'black' })
playIcon.center(50, 50)

play.on('click', () => {
  if (timeline._paused) return timeline.play()
  timeline.pause()
})

// Stop
const stop = controls.group().translate(120, 0)
stop.circle(100).fill('white').stroke({
  color: 'white',
  width: 10,
  opacity: 0.3
})

stop.rect(50, 50).center(50, 50)

stop.on('click', () => {
  timeline.stop()
})

// Reverse
const reverse = controls.group().translate(240, 0)
reverse.circle(100).fill('white').stroke({
  color: 'white',
  width: 5
})

reverse.polygon([0, 25, 50, 0, 50, 50]).center(45, 50)

reverse.on('click', () => {
  timeline.reverse().play()
})

// Slower
const slower = controls.group().translate(360, 0)
slower.circle(100).fill('white').stroke({
  color: 'white',
  width: 10,
  opacity: 0.3
})

const slowerIcon = slower.group()
slowerIcon.polygon([0, 25, 25, 0, 25, 50])
slowerIcon.polygon([25, 25, 50, 0, 50, 50])
slowerIcon.center(45, 50)

slower.on('click', () => {
  timeline.speed(timeline.speed() * 0.5)
})

// Faster
const faster = controls.group().translate(480, 0)
faster.circle(100).fill('white').stroke({
  color: 'white',
  width: 10,
  opacity: 0.3
})

const fasterIcon = faster.group()
fasterIcon.polygon([0, 0, 0, 50, 25, 25])
fasterIcon.polygon([25, 0, 25, 50, 50, 25])
fasterIcon.center(55, 50)

faster.on('click', () => {
  timeline.speed(timeline.speed() * 2)
})