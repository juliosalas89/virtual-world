function getHoveredtPoint (click, points, threshold = Math.MAX_SAFE_INTEGER) {
    const distances = points.map(point => distance(point, click))
    const minDistance = Math.min(...distances)
    const index = distances.indexOf(minDistance)
    return (minDistance < threshold) && points[index]
}

function distance (p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}

function add (p1, p2) {
    return new Point(p1.x + p2.x, p1.y + p2.y)
}

function substract (p1, p2) {
    return new Point(p1.x - p2.x, p1.y - p2.y)
}

function scale (point, scaleFactor) {
    return new Point(point.x * scaleFactor, point.y * scaleFactor)
}

function translate (point, angle, distance) {
    return new Point(
        point.x + distance * Math.cos(angle),
        point.y + distance * Math.sin(angle)
    )
}

function angle (cathetos) {
    return Math.atan2(cathetos.y, cathetos.x)
}

function getIntersection (segment1, segment2) {
    const { p1: A, p2: B } = segment1
    const { p1: C, p2: D } = segment2

    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x)
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y)
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y)
    
    const t = bottom && (tTop / bottom)
    const u = bottom && (uTop / bottom)
    const condition = t && u && t >= 0 && t <= 1 && u >= 0 && u <= 1
    
    return condition && {
        x: A.x + t * (B.x - A.x),
        y: A.y + t * (B.y - A.y),
        offset: t
    }
}

function getRandomColor () {
    const hue = 290 + Math.random() * 260
    return `hsl(${hue}, 100%, 60%)`
}