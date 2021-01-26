PARAM.object.dna.particle = class{
    constructor(param = {}){
        this.particles = param.particles || 150
        this.color = param.color || {
            point: 0x10d8fa,
            line: 0x10d8fa
        }
        this.opacity = param.opacity || {
            point: 0.4,
            line: 0.2
        }
        this.rd = param.rd || 0.65
        this.vel = param.vel || 0.4
        this.minDistance = param.minDistance || 150
        this.size = 2.5
    }
}