function getHoveredtPoint (click, points, threshold = Math.MAX_SAFE_INTEGER) {
    const distances = points.map(point => distance(point, click))
    const minDistance = Math.min(...distances)
    const index = distances.indexOf(minDistance)
    return (minDistance < threshold) && points[index]
}

function distance (p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}

function magnitud (vector) {
    return Math.hypot(vector.x, vector.y)
}

function normalize (vector) {
    return scale(vector, 1/magnitud(vector))
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

function average (p1, p2) {
    return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2)
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

function lerp (a, b, t) {
    return a + (b - a) * t
}

function getIntersection (A, B, C, D) {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x)
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y)
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y)
    
    const eps = 0.001
    const t = Math.abs(bottom) > eps  && (tTop / bottom) // the idea here is that bottom !== 0, but we can't trust floating point numbers
    const u = Math.abs(bottom) > eps && (uTop / bottom)
    const condition = t && u && t >= 0 && t <= 1 && u >= 0 && u <= 1
    
    return condition && {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t
    }
}

function getRandomColor () {
    const hue = 290 + Math.random() * 260
    return `hsl(${hue}, 100%, 60%)`
}