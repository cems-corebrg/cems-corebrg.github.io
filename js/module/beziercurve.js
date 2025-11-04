"use strict";

export default class BezierCurve {

    points = [];

    add (x, y) {
        this.points.push([x, y]);
    }

    draw (container) {
        const
            path = document.createElementNS("http://www.w3.org/2000/svg", "path"),
            moveTo = this.points[0],
            d = this.points.reduce((acc, point, i, a) => i === 0? acc: `${acc} ${bezierCommand(point, i, a)}`
            , `M${moveTo[0]} ${moveTo[1]}`);
        
        path.setAttributeNS(null, "d", d);
        
        container.appendChild(path);
    }
}

function bezierCommand (point, i, a) {
    const
        [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point),
        [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true);

    return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
}

function line (p1, p2) {
    const
        x = p2[0] - p1[0],
        y = p2[1] - p1[1];

    return {
        length: Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
        angle: Math.atan2(y, x)
    }
}

function controlPoint (current, previous, next, reverse) {
    const
        p = previous || current,
        n = next || current,
        o = line(p, n),
        smoothing = 0.2,
        angle = o.angle + (reverse ? Math.PI : 0),
        length = o.length * smoothing;
    
    return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
}