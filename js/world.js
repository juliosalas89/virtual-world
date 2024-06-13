// Group of polygons wraping segments of a given graph
class World {
    constructor(
        graph, 
        roadWIdth = 100, 
        roadRoundness = 10,
        buildingWidth = 150,
        buildingMinLength = 150,
        spacing = 50
    ) {
        this.graph = graph
        this.roadWIdth = roadWIdth
        this.roadRoundness = roadRoundness
        this.buildingWidth = buildingWidth
        this.buildingMinLength = buildingMinLength
        this.spacing = spacing

        this.envelopes = []
        this.roadBorders = []
        this.buildings = []
        this.trees = []

        this.generate()
    }

    generate() {
        this.envelopes.length = 0
        this.envelopes = this.graph.segments.map(segment => new Envelope(segment, this.roadWIdth, this.roadRoundness))
        
        this.roadBorders = Polygon.union(this.envelopes.map(envelope => envelope.polygon))
        this.buildings = this.#generateBuildings()
        this.trees = this.#generateTrees()
    }

    #generateTrees(count = 10) {
        const points = [
            ...this.roadBorders.map(segment => [segment.p1, segment.p2]).flat(),
            ...this.buildings.map(bases => bases.points).flat()
        ] 
        const left = Math.min(...points.map(point => point.x))
        const right = Math.max(...points.map(point => point.x))
        const top = Math.min(...points.map(point => point.y))
        const bottom = Math.max(...points.map(point => point.y))

        const trees = []
        while(trees.length < count) {
            const treeLocation = new Point(
                lerp(left, right, Math.random()),
                lerp(top, bottom, Math.random())
            )
            trees.push(treeLocation)
        }
        return trees
    }

    #generateBuildings() {
        const temporaryEnvelopes = this.graph.segments.map(segment =>  new Envelope(segment, this.roadWIdth + this.buildingWidth + this.spacing, this.roadRoundness))
        const segmentsUnion = Polygon.union(temporaryEnvelopes.map(envelope => envelope.polygon))
        const guides = segmentsUnion.filter(segment => segment.length() > this.buildingMinLength)
        const supports = []
        guides.forEach(segment => {
            const length = segment.length() + this.spacing
            const buildingCount = Math.floor(length / (this.buildingMinLength + this.spacing))
            const buildingLength = (length / buildingCount) - this.spacing
            const directionVector = segment.directionVector()

            let q1 = segment.p1
            let q2 = add(q1, scale(directionVector, buildingLength))
            supports.push(new Segment(q1, q2))

            for (let i = 2; i <= buildingCount; i++) {
                q1 = add(q2, scale(directionVector, this.spacing))
                q2 = add(q1, scale(directionVector, buildingLength))
                supports.push(new Segment(q1, q2))
            }
        })
        
        const bases = supports.map(support => {
            return new Envelope(support, this.buildingWidth).polygon
        })

        for (let i = 0; i < bases.length - 1; i++) {
            for (let j = i + 1; j < bases.length; j++) {
                if(bases[i].intersectsPolygon(bases[j])) {
                    bases.splice(j, 1)
                    j--
                }
            }
        }
        

        return bases
    }

    draw(ctx) {
        this.envelopes.forEach(envelope => envelope.draw(ctx, { fill: '#BBB', stroke: '#BBB', lineWidth: 15 }))
        this.graph.segments.forEach(segment => segment.draw(ctx, { color: 'white', width: 4, dash: [10, 10] }))
        this.roadBorders.forEach(border => border.draw(ctx, { color: 'white', width: 4}))
        this.buildings.forEach(elem => elem.draw(ctx))
        this.trees.forEach(tree => tree.draw(ctx))
    }
}