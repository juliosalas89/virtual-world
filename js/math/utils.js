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