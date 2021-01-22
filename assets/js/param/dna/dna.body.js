PARAM.object.dna.body = class{
    constructor(param = {}){
        this.count = param.count || 80
        this.gap = param.gap || 0.6
        this.dist = param.dist || 9
        this.deg = param.deg || 2
        this.size = param.size || 2.8
        this.opacity = param.opacity || 1.0
        this.color = param.color || {
            bone: 0xffffff,
            nucleic: 0x73eaff
        }
        this.rand = param.rand || {
            bone: 2.1,
            nucleic: 1.5
        }
        this.point = param.point || 30
        this.div = param.div || 12
        this.layers = param.layers || PROCESS
    }
}