class Viewport {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d')
        this.zoom = 1

        this.#addEventListeners()
    }
    getMousePosition (event) {
        return new Point(event.offsetX * this.zoom, event.offsetY * this.zoom)
    }

    #addEventListeners() {
        this.canvas.addEventListener('mousewheel', this.#handleMouseWheel.bind(this))
    }

    #handleMouseWheel (event) {
        const dir = Math.sign(event.deltaY)
        const step = 0.1
        const newValue = this.zoom + dir * step
        this.zoom = Math.max(1, Math.min(5, newValue)) // keep values between 1 and 5
    }
}