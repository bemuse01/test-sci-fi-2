PARAM.object.dna.particle = class{
    constructor(param = {}){
        this.particles = param.particles || 120
        this.color = param.color || 0x73eaff
        this.opacity = param.opacity || {
            point: 0.4,
            line: 0.2
        }
        this.rd = param.rd || 0.7
        this.vel = param.vel || 0.4
        this.minDistance = param.minDistance || 200
        this.size = 3.0
    }
}