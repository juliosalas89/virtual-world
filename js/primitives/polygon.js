// given an array of points, generates a polygon
class Polygon {
    constructor(points = []) {
        this.points = points
        this.polygonSegments = points.map((point, index) => {
            const nextIndex = (index + 1) % points.length
            return new Segment(point, points[nextIndex])
            })
    }
    static union (polygons) {
        Polygon.multiBreak(polygons)
        const keptSegments = []
        polygons.forEach((polygon1, i) => {
            polygon1.polygonSegments.forEach(segment => {
                const contained = polygons.some((polygon2, j) => i !== j && polygon2.containsSegment(segment))
                !contained && keptSegments.push(segment)
            })
        })
        
        return keptSegments
    }

    static multiBreak (polygons) {
        for(let i = 0; i < polygons.length -1; i++) {
            for(let j = (i + 1); j < polygons.length; j++) {
                Polygon.break(polygons[i], polygons[j])
            }
        }
    }
    static break (polygon1, polygon2) {
        const segments1 = polygon1.polygonSegments
        const segments2 = polygon2.polygonSegments
        for (let i = 0; i < segments1.length; i++) {
            for (let j = 0; j < segments2.length; j++) {
                const int = getIntersection(segments1[i].p1, segments1[i].p2, segments2[j].p1, segments2[j].p2)
                if (int && int.offset !==1 && int.offset !== 0) {
                    const intPoint = new Point(int.x, int.y)

                    // Now we replace the end of the segment with the intersection point, so that the polygon is broken
                    let aux = segments1[i].p2
                    segments1[i].p2 = intPoint
                    // And we add a new segment in the missing part of the polygon
                    segments1.splice(i+1, 0, new Segment(intPoint, aux))
                    // this way we broke the segment in two, right in the intersection point
                    // and we repeat the proccess for the other polygon
                    aux = segments2[j].p2
                    segments2[j].p2 = intPoint
                    segments2.splice(j+1, 0, new Segment(intPoint, aux))
                }
            }
        }
    }

    distanceToPoint (point) {
        return Math.min(...this.polygonSegments.map(segment => segment.distanceToPoint(point)))
    }

    distanceToPolygon (polygon) {
        return Math.min(...this.points.map(point => polygon.distanceToPoint(point)))
    }

    containsSegment (segment) {
        const midPoint = average(segment.p1, segment.p2)
        return this.containsPoint(midPoint)
    }

    intersectsPolygon(polygon) {
        return this.polygonSegments.some(segment => {
            return polygon.polygonSegments.some(otherSegment => getIntersection(segment.p1, segment.p2, otherSegment.p1, otherSegment.p2))
        })
    }

    containsPoint (point) {
        // We generate a point that is outside the polygon and we draw a segment from this point to the point we want to check
        // If this imaginary segment intersect the polygon an odd number of times, the point is inside the polygon
        const outerPoint = new Point(-1000, -1000)
        let nuymberOfIntersections = 0
        this.polygonSegments.forEach(segment => {
            const int = getIntersection(outerPoint, point, segment.p1, segment.p2)
            int && nuymberOfIntersections++
        })
        return nuymberOfIntersections % 2
    }

    // drawSegments (ctx) {
    //     this.polygonSegments.forEach(segment => segment.draw(ctx, { color: getRandomColor()}))
    // }

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