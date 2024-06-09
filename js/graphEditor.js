class GraphEditor {
    constructor(viewport, graph) {
        this.viewport = viewport
        this.canvas = viewport.canvas
        this.graph = graph
        this.ctx = this.canvas.getContext('2d')

        this.mousePosition = { x: 0, y: 0 }
        this.selectedPoint = null
        this.hoveredPoint = null
        this.dragging = false

        this.#addEventListeners()
    }

    // private function
    #addEventListeners () {
        this.canvas.addEventListener('contextmenu', event => event.preventDefault())
        document.addEventListener('keydown', this.#handleEscKeyDown.bind(this))
        this.canvas.addEventListener('mousemove', this.#handleMouseMove.bind(this))
        this.canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this))
        this.canvas.addEventListener('mouseup', () => (this.dragging = false))
    }

    #handleEscKeyDown (event) {
        event.key === 'Escape' && (this.selectedPoint = null)
    }

    #handleMouseMove (event) {
        this.mousePosition = this.viewport.getMousePosition(event)
        this.hoveredPoint = getHoveredtPoint(this.mousePosition, this.graph.points, 10 * this.viewport.zoom)
        if (this.dragging) {
            this.selectedPoint.x = this.mousePosition.x
            this.selectedPoint.y = this.mousePosition.y
        }
    }

    #handleMouseDown (event) {
        if(event.button === 2) { // right click
            if(this.selectedPoint) return (this.selectedPoint = null)
            if(this.hoveredPoint) return this.#removePopint(this.hoveredPoint) 
        }

        if(event.button === 0) { // left click
            if (this.hoveredPoint) {
                this.dragging = true
                this.#selectPoint(this.hoveredPoint)
                return
            }
            this.graph.addPoint(this.mousePosition)
            this.#selectPoint(this.mousePosition)
            this.hoveredPoint = this.mousePosition
        }
    }

    #selectPoint (point) {
        this.selectedPoint && this.graph.tryAddSegment(new Segment(this.selectedPoint, point))
        this.selectedPoint = point
    }

    #removePopint (point) {
        this.graph.removePoint(point)
        this.hoveredPoint = null
        this.selectedPoint == point && (this.selectedPoint = null)
    }

    display () {
        this.graph.draw(this.ctx)
        this.hoveredPoint && this.hoveredPoint.draw(this.ctx, { fill: true })
        if (this.selectedPoint) {
            new Segment(this.selectedPoint, this.hoveredPoint || this.mousePosition).draw(this.ctx, { color: 'yellow',  width: 1, dash: [3, 3] })
            this.selectedPoint.draw(this.ctx, { outline: true })
        }
    }
}