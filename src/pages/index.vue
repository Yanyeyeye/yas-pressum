<script lang="ts" setup>
const el = $ref<HTMLCanvasElement>()
const ctx = $computed(() => el.getContext('2d')!)

const WIDTH = 600
const HEIGHT = 600

interface Point {
  x: number
  y: number
}

interface Branch {
  start: Point
  length: number
  theta: number
}

function init() {
  ctx.strokeStyle = '#000'

  step({
    start: { x: WIDTH / 2, y: HEIGHT },
    length: 20,
    theta: -Math.PI / 2,
  })
}

// 执行一个闭包函数
const pendingTask: Function[] = []

// depth为深度即多少深度之前一定会长出来
function step(b: Branch, depth = 0) {
  const end = getEndPoint(b)
  drawBranch(b)
  if (depth < 3 || Math.random() < 0.5) {
    pendingTask.push(() => {
      step({
        start: end,
        length: b.length + (Math.random() * 10 - 5),
        theta: b.theta - 0.3 * Math.random(),
      }, depth + 1)
    })
  }
  if (depth < 3 || Math.random() < 0.5) {
    pendingTask.push(() => {
      step({
        start: end,
        length: b.length + (Math.random() * 10 - 5),
        theta: b.theta + 0.3 * Math.random(),
      }, depth + 1)
    })
  }
}

function frame() {
  const tasks = [...pendingTask] // 浅拷贝防止原来的数组被篡改
  pendingTask.length = 0
  tasks.forEach(fn => fn())
}

let framesCount = 0
function startFrame() {
  requestAnimationFrame(() => {
    framesCount++
    if (framesCount % 5 === 0) // 5帧画一次
      frame()
    startFrame()
  })
}

startFrame()

function lineTo(p1: Point, p2: Point) {
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.stroke()
}

function getEndPoint(b: Branch): Point {
  return {
    x: b.start.x + b.length * Math.cos(b.theta),
    y: b.start.y + b.length * Math.sin(b.theta),
  }
}

function drawBranch(l: Branch) {
  lineTo(l.start, getEndPoint(l))
}

onMounted(() => {
  init()
})
</script>

<template>
  <canvas ref="el" width="600" height="600" />
</template>

<style scoped>

</style>
