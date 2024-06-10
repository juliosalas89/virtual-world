// Al the functions related with editing a graph
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
        this.leftMouseDown = false

        this.#addEventListeners()
    }

    // private function
    #addEventListeners () {
        this.canvas.addEventListener('contextmenu', event => event.preventDefault())
        document.addEventListener('keydown', this.#handleEscKeyDown.bind(this))
        this.canvas.addEventListener('mousemove', this.#handleMouseMove.bind(this))
        this.canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this))
        this.canvas.addEventListener('mouseup', this.#handleMouseUp.bind(this))
    }

    #handleEscKeyDown (event) {
        event.key === 'Escape' && (this.selectedPoint = null)
    }

    #handleMouseMove (event) {
        this.mousePosition = this.viewport.getMousePosition(event, true)
        this.hoveredPoint = getHoveredtPoint(this.mousePosition, this.graph.points, 10 * this.viewport.zoom)
        if (this.dragging) {
            this.selectedPoint.x = this.mousePosition.x
            this.selectedPoint.y = this.mousePosition.y
        }
        if(this.leftMouseDown) this.dragging = true
    }

    #handleMouseDown (event) {
        if(event.button === 2) { // right click
            if(this.selectedPoint) return (this.selectedPoint = null)
            if(this.hoveredPoint) return this.#removePopint(this.hoveredPoint) 
        }

        if(event.button === 0) { // left click
            if (this.hoveredPoint) {
                this.leftMouseDown = true
                this.#selectPoint(this.hoveredPoint)
                return
            }
            this.graph.addPoint(this.mousePosition)
            this.#selectPoint(this.mousePosition)
            this.hoveredPoint = this.mousePosition
        }
    }
    
    #handleMouseUp () {
        this.leftMouseDown = false
        if (this.dragging) {
            this.selectedPoint = null
            this.dragging = false
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

    dispose () {
        this.selectedPoint = null
        this.hoveredPoint = null
        this.graph.dispose()
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