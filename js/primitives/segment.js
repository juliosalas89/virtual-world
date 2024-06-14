// Segments between two points
class Segment {
    constructor(p1, p2) {
        this.p1 = p1
        this.p2 = p2
    }

    equals (segment) {
        return this.includes(segment.p1) && this.includes(segment.p2)
    }

    includes (point) {
        return this.p1.equals(point) || this.p2.equals(point)
    }

    length () {
        return distance(this.p1, this.p2)
    }

    directionVector () {
        return normalize(substract(this.p2, this.p1))
    }

    projectPoint(point) {
        const a = substract(point, this.p1)
        const b = substract(this.p2, this.p1)
        const normB = normalize(b)
        const scaler = dotProduct(a, normB)
        const projection = {
            point: add(this.p1, scale(normB, scaler)),
            offset: scaler / magnitud(b)
        }
        return projection
    }

    distanceToPoint(point) {
        const projection = this.projectPoint(point)
        if(projection.offset > 0 && projection.offset < 1) return distance(point, projection.point)
        
        const d1 = distance(this.p1, point)
        const d2 = distance(this.p2, point)
        return Math.min(d1, d2)
    }

    draw(ctx, { width = 2, color = 'black', dash = [] } = {}) {
        ctx.beginPath()
        ctx.strokeStyle = color
        dash.length && ctx.setLineDash(dash)
        ctx.lineWidth = width
        ctx.moveTo(this.p1.x, this.p1.y)
        ctx.lineTo(this.p2.x, this.p2.y)
        ctx.stroke()
        ctx.setLineDash([])

    }
}