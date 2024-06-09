class Polygon {
    constructor(points = []) {
        this.points = points
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