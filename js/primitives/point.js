class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    equals(point) {
        return this.x === point.x && this.y === point.y
    }

    draw(ctx, { size = 18, color = 'black', outline = false, fill = false } = {}) {
        const radius = size / 2
        ctx.beginPath()
        ctx.fillStyle = color
        // the following draws a circle located at (this.x, this.y) with radius 'radius' (last parameters are the angle in radians, 0 to 2 * Math.PI is a full circle)
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI)
        ctx.fill()
        
        if (outline) {
            ctx.beginPath()
            ctx.lineWidth = 2
            ctx.strokeStyle = 'yellow'
            ctx.arc(this.x, this.y, radius * 0.6, 0, 2 * Math.PI)
            ctx.stroke()
        }
        if (fill) {
            ctx.beginPath()
            ctx.lineWidth = 2
            ctx.fillStyle = 'yellow'
            ctx.arc(this.x, this.y, radius * 0.4, 0, 2 * Math.PI)
            ctx.fill()
        }
    }
}