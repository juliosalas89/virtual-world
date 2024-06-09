function getHoveredtPoint (click, points, threshold = Math.MAX_SAFE_INTEGER) {
    const distances = points.map(point => distance(point, click))
    const minDistance = Math.min(...distances)
    const index = distances.indexOf(minDistance)
    return (minDistance < threshold) && points[index]
}

function distance (p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}