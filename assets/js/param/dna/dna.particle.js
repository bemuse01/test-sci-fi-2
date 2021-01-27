PARAM.object.dna.particle = class{
    constructor(param = {}){
        this.particles = param.particles || 250
        this.color = param.color || {
            point: 0x10d8fa,
            line: 0x10d8fa
        }
        this.opacity = param.opacity || {
            point: 0.4,
            line: 0.2
        }
        this.rd = param.rd || {
            width: 0.9,
            height: 0.8
        }
        this.vel = param.vel || 0.4
        this.minDistance = param.minDistance || 200
        this.size = 2.5
    }
}