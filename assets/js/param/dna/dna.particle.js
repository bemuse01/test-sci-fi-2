PARAM.object.dna.particle = class{
    constructor(param = {}){
        this.particles = param.particles || 120
        this.color = param.color || 0xffffff
        this.opacity = param.opacity || 0.35
        this.rd = param.rd || 0.8
        this.vel = param.vel || 0.4
    }
}