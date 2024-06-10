// Group of polygons wraping segments of a given graph
class World {
    constructor(graph, roadWIdth = 100, roadRoundness = 4) {
        this.graph = graph
        this.roadWIdth = roadWIdth
        this.roadRoundness = roadRoundness

        this.envelopes = []
        this.intersections = []

        this.generate()
    }

    generate() {
        this.envelopes.length = 0
        this.envelopes = this.graph.segments.map(segment => new Envelope(segment, this.roadWIdth, this.roadRoundness))
        
        this.intersections = Polygon.break(
            this.envelopes[0].polygon,
            this.envelopes[1].polygon
        )
    }

    draw(ctx) {
        this.envelopes.forEach(envelope => envelope.draw(ctx))
        this.intersections.forEach(intersection => intersection.draw(ctx, { size: 5, color: 'red', fill: true }))
    }
}