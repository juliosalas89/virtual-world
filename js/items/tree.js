class Tree {
    constructor (center, size, heightCoef = 0.09) {
        this.center = center
        this.size = size
        this.heightCoef = heightCoef
        this.base = this.#generateLevels(center, size) // We store the base so the cars can interact with the trees
    }

    #generateLevels(point, size) {
        const points = []
        const baseRaiuds = size / 2
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 16) {
            const fakeRandom = Math.cos(((angle + this.center.x) * size) % 17) **2
            const randomRadius = baseRaiuds * lerp(0.5, 1, fakeRandom)
            points.push(translate(point, angle, randomRadius)) 
        }
        return new Polygon(points)
    }

    draw(ctx, viewPoint) {
        const diff = substract(this.center, viewPoint)
        const top = add(this.center, scale(diff, this.heightCoef))
        const levels = 7
        for (let level = 0; level < levels; level++) {
            const t = level / (levels - 1)
            const point = lerp2d(this.center, top, t)
            const color = `rgb(30, ${lerp(50, 200, t)}, 70)`
            const size = lerp(this.size, 40, t)
            const polygon = this.#generateLevels(point, size)
            polygon.draw(ctx, { fill: color, stroke: color })
        }
    }
}