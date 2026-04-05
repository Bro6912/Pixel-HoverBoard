const container = document.getElementById('container')
const xSlider = document.getElementById('xSlider')
const ySlider = document.getElementById('ySlider')
const xValue = document.getElementById('xValue')
const yValue = document.getElementById('yValue')
const totalBoxes = document.getElementById('totalBoxes')
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71','#fce040','#3416b9','#e6319a','#22d1c8']

let gridX = parseInt(xSlider.value) || 25
let gridY = parseInt(ySlider.value) || 34

function createSquares(x, y) {
    container.innerHTML = ''
    const totalCount = x * y
    
    // Calculate optimal square size
    const containerWidth = window.innerWidth * 0.88 // Account for sidebar and padding
    const containerHeight = window.innerHeight * 0.85 // Account for title and padding
    
    const maxSquareWidth = Math.floor(containerWidth / x)
    const maxSquareHeight = Math.floor(containerHeight / y)
    const squareSize = Math.min(maxSquareWidth, maxSquareHeight, 60) // Max 60px per square
    
    for(let i = 0; i < totalCount; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        square.style.width = squareSize + 'px'
        square.style.height = squareSize + 'px'

        square.addEventListener('mouseover', () => setColor(square))
        square.addEventListener('mouseout', () => removeColor(square))

        container.appendChild(square)
    }
    
    container.style.gridTemplateColumns = `repeat(${x}, ${squareSize}px)`
    container.style.gridTemplateRows = `repeat(${y}, ${squareSize}px)`
}

function setColor(element) {
    const color = getRandomColor()
    element.style.background = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function removeColor(element) {
    element.style.background = '#1d1d1d'
    element.style.boxShadow = '0 0 5px #000'
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function updateGrid() {
    gridX = parseInt(xSlider.value)
    gridY = parseInt(ySlider.value)
    xValue.textContent = gridX
    yValue.textContent = gridY
    totalBoxes.innerHTML = '<span style="background: linear-gradient(90deg, #1DBDE6 0%, #F1515E 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: bold; text-shadow: 0 0 2px rgba(241, 81, 94, 0.1);">' + gridX + '</span> <span style="font-size: 0.7em; vertical-align: middle;">x</span> <span style="background: linear-gradient(90deg, #1DBDE6 0%, #F1515E 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: bold; text-shadow: 0 0 2px rgba(241, 81, 94, 0.1);">' + gridY + '</span>'
    createSquares(gridX, gridY)
}

// Event listeners for sliders
xSlider.addEventListener('input', updateGrid)
ySlider.addEventListener('input', updateGrid)

// Initialize
updateGrid()

// Recalculate on window resize
window.addEventListener('resize', () => {
    createSquares(gridX, gridY)
})

function startAnimatedFavicon() {
    const favicon = document.getElementById('favicon') || document.querySelector("link[rel*='icon']")
    if (!favicon) return

    // Stop any old animation loop if this script runs more than once.
    if (window.__hoverboardFaviconTimer) {
        clearInterval(window.__hoverboardFaviconTimer)
    }

    favicon.type = 'image/png'

    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const frameCount = 24
    const frames = []
    let frameIndex = 0
    const accent = ['#00d2ff', '#ff7a59', '#a78bfa', '#ffe066']

    function drawFrame(frame) {
        ctx.clearRect(0, 0, 64, 64)

        // Background tile
        ctx.fillStyle = '#141926'
        ctx.fillRect(0, 0, 64, 64)

        // Orbiting highlight ring
        const pulse = 12 + Math.sin(frame * 0.26) * 4
        ctx.strokeStyle = accent[frame % accent.length]
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(32, 32, pulse + 9, 0, Math.PI * 2)
        ctx.stroke()

        // 2x2 pixel board style dots
        const dotShift = frame % accent.length
        const dots = [
            [20, 20],
            [44, 20],
            [20, 44],
            [44, 44]
        ]

        dots.forEach((dot, i) => {
            ctx.fillStyle = accent[(i + dotShift) % accent.length]
            ctx.beginPath()
            ctx.arc(dot[0], dot[1], 7, 0, Math.PI * 2)
            ctx.fill()
        })
    }

    for (let i = 0; i < frameCount; i++) {
        drawFrame(i)
        frames.push(canvas.toDataURL('image/png'))
    }

    function renderNextFrame() {
        favicon.href = frames[frameIndex]
        frameIndex = (frameIndex + 1) % frames.length
    }

    renderNextFrame()
    window.__hoverboardFaviconTimer = setInterval(renderNextFrame, 180)
}

startAnimatedFavicon()// Last updated: 2026-04-05
