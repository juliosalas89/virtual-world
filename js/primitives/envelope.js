class Envelope {
    constructor (skeleton, width, roundness = 1) {
        this.skeleton = skeleton
        this.polygon = this.#generatePolygon(width, roundness)
    }

    #generatePolygon (width, roundness) {
        const { p1, p2 } = this.skeleton
        const radius = width / 2
        const alpha = angle(substract(p2, p1))
        const alpha_cw = alpha + Math.PI / 2  // clockwise
        const alpha_ccw = alpha - Math.PI / 2  // counter clockwise
        const points = []
        const step = Math.PI / Math.max(1, roundness)
        const halfStep = step / 2 // We use this half step to make sure the last point is added, because sometimes it fails the last iteration
        for (let i = alpha_ccw; i < alpha_cw + halfStep; i += step) {
            points.push(translate(p2, i, radius))
        }
        for (let i = alpha_ccw; i < alpha_cw + halfStep; i += step) {
            points.push(translate(p1, Math.PI + i, radius))
        }
        return new Polygon(points)
    }

    draw () {
        this.polygon.draw(ctx)
    }
}