// given an array of points, generates a polygon
class Polygon {
    constructor(points = []) {
        this.points = points
        this.polygonSegments = points.map((point, index) => {
            const nextIndex = (index + 1) % points.length
            return new Segment(point, points[nextIndex])
        })
    }

    static break (polygon1, polygon2) {
        const segments1 = polygon1.polygonSegments
        const segments2 = polygon2.polygonSegments
        const intersections = segments1.map(segment1 => {
            return segments2.map(segment2 => {
                const int = getIntersection(segment1, segment2)
                return int && int.offset !== 1 && int.offset !== 0 && new Point(int.x, int.y)
            })
        }).flat().filter(point => point).map(point => new Point(point.x, point.y))
        return intersections
    }

    draw(ctx, { stroke = 'blue', lineWidth = 2, fill = 'rgba(0, 0, 255, 0.3)' } = {}) {
        ctx.beginPath()
        ctx.strokeStyle = stroke
        ctx.lineWidth = lineWidth
        ctx.fillStyle = fill
        ctx.moveTo(this.points[0].x, this.points[0].y)
        this.points.forEach( point => {
            ctx.lineTo(point.x, point.y)
        })
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
    }
}