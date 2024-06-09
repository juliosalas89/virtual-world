class Viewport {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d')
        this.zoom = 1
        this.center = new Point(this.canvas.width / 2, this.canvas.height / 2)
        this.offset = scale(this.center, -1)
        this.drag = {
            start: new Point(0, 0),
            end: new Point(0, 0),
            offset: new Point(0, 0),
            active: false
        }

        this.#addEventListeners()
    }

    reset() {
        this.ctx.restore()
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.save()
        this.ctx.translate(this.center.x, this.center.y)
        this.ctx.scale(1/ this.zoom, 1/ this.zoom)
        const offset = this.getOffset()
        this.ctx.translate(offset.x, offset.y)
    }

    getMousePosition (event, substractDragOffset = false) {
        const position = new Point(
            (event.offsetX - this.center.x) * this.zoom - this.offset.x, 
            (event.offsetY - this.center.y) * this.zoom - this.offset.y
        )
        return substractDragOffset ? substract(position, this.drag.offset) : position
    }

    getOffset () {
        return add(this.offset, this.drag.offset)
    }

    #addEventListeners() {
        this.canvas.addEventListener('mousewheel', this.#handleMouseWheel.bind(this))
        this.canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this))
        this.canvas.addEventListener('mousemove', this.#handleMouseMove.bind(this))
        this.canvas.addEventListener('mouseup', this.#handleMouseUp.bind(this))
    }

    #handleMouseDown (event) {
        if (event.button === 1) { // middle click
            this.drag.start = this.getMousePosition(event)
            this.drag.active = true
        }
    }

    #handleMouseMove (event) {
        if (this.drag.active) {
            this.drag.end = this.getMousePosition(event)
            this.drag.offset = substract(this.drag.end, this.drag.start)
        }
    }

    #handleMouseUp () {
        if (this.drag.active) {
            this.offset = add(this.offset, this.drag.offset)
            this.drag = {
                start: new Point(0, 0),
                end: new Point(0, 0),
                offset: new Point(0, 0),
                active: false
            }
        }
    }

    #handleMouseWheel (event) {
        const dir = Math.sign(event.deltaY)
        const step = 0.1
        const newValue = this.zoom + dir * step
        this.zoom = Math.max(1, Math.min(5, newValue)) // keep values between 1 and 5
    }
}