SHADER.dna.body = {
    vertex: `
        attribute float vSize;
        attribute float opacity;
        varying float vOpacity;
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vOpacity = opacity;
            gl_PointSize = vSize;
        }
    `,
    fragment: `
        uniform vec3 color;
        uniform float size;
        varying float vOpacity;
        void main() {
            gl_FragColor = vec4(color, vOpacity);
        }
    `
}

SHADER.dna.particle.point = {
    vertex: `
        attribute float vSize;
        attribute float opacity;
        varying float vOpacity;
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vOpacity = opacity;
            gl_PointSize = vSize;
        }
    `,
    fragment: `
        uniform vec3 color;
        varying float vOpacity;
        void main() {
            gl_FragColor = vec4(color, vOpacity);
        }
    `
}

SHADER.dna.particle.line = {
    vertex: `
        attribute float opacity;
        varying float vOpacity;
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vOpacity = opacity;
        }
    `,
    fragment: `
        uniform vec3 color;
        varying float vOpacity;
        void main() {
            gl_FragColor = vec4(color, vOpacity);
        }
    `
}