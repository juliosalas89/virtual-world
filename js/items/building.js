class Building {
    constructor (base, heightCoef = 0.09) {
        this.base = base
        this.heightCoef = heightCoef
    }
    draw (ctx, viewPoint) {
        const topPoints = this.base.points.map(point => add(point, scale(substract(point, viewPoint), this.heightCoef)))
        const ceiling = new Polygon(topPoints)
        const sides = []
        for (let i = 0; i < this.base.points.length; i++) {
            const nextIndex = (i + 1) % this.base.points.length
            const side = new Polygon([
                this.base.points[i],
                this.base.points[nextIndex],
                topPoints[nextIndex],
                topPoints[i]
            ])
            sides.push(side)
        }
        // now we sort the sides by distance to the viewPoint, so the ones that are closer are drawn last
        sides.sort((a, b) => b.distanceToPoint(viewPoint) - a.distanceToPoint(viewPoint))

        this.base.draw(ctx, { fill: 'white', stroke: '#AAA' })
        sides.forEach(side => side.draw(ctx,{ fill: 'white', stroke: '#AAA' }))
        ceiling.draw(ctx, { fill: 'white', stroke: '#AAA' })
    }
}