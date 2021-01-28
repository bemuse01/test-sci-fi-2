PARAM.object.dna.particle = class{
    constructor(param = {}){
        this.particles = param.particles || 250
        this.color = param.color || {
            point: 0x10d8fa,
            line: 0x10d8fa
        }
        this.opacity = param.opacity || {
            point: 0.5,
            line: 0.25
        }
        this.rd = param.rd || {
            width: 1.0,
            height: 1.0
        }
        this.vel = param.vel || 0.4
        this.minDistance = param.minDistance || 200
        this.size = 2.5
    }
}