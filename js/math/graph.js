class Graph {
    constructor(points = [], segments = []) {
        this.points = points
        this.segments = segments
    }

    addPoint(point) {
        this.points.push(point)
    }

    containsPoint(point) {
        return this.points.some(p => p.equals(point))
    }

    tryAddPoint (point) {
        if (!this.containsPoint(point)) {
            this.addPoint(point)
            return true
        }
        return false
    }

    addSegment(segment) {
        this.segments.push(segment)
    }

    containsSegment(segment) {
        return this.segments.some(seg => seg.equals(segment))
    }
    
    tryAddSegment (segment) {
        const canBeAdded = !this.containsSegment(segment) && !segment.p1.equals(segment.p2)
        canBeAdded && this.addSegment(segment)
        return canBeAdded
    }
    removeSegment(segment) {
        this.segments = this.segments.filter(seg => !seg.equals(segment))
    }

    removePoint (point) {
        const pointSegments = this.segments.filter(seg => seg.includes(point))
        pointSegments.forEach(seg => this.removeSegment(seg))
        this.points = this.points.filter(p => !p.equals(point))
    }

    dispose () {
        this.points.length = 0
        this.segments.length = 0
    }

    draw(ctx) {
        this.segments.forEach(seg => seg.draw(ctx))
        this.points.forEach(point => point.draw(ctx))
    }
}