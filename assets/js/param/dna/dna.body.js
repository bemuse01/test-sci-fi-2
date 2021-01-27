PARAM.object.dna.body = class{
    constructor(param = {}){
        this.count = param.count || 150
        // this.gap = param.gap || 0.6
        // this.dist = param.dist || 9
        // this.deg = param.deg || 2
        // this.gap = param.gap || 1.2
        this.dist = param.dist || 23
        this.deg = param.deg || 2
        this.size = param.size || 2.5
        this.opacity = param.opacity || 1.0
        this.color = param.color || {
            bone: 0xffffff,
            nucleic: 0x10d8fa
        }
        this.rand = param.rand || {
            bone: 3.5,
            nucleic: 3.0
        }
        // this.point = param.point || 30
        // this.div = param.div || 12
        this.point = param.point || 30
        this.div = param.div || 10
        this.layers = param.layers || PROCESS
        this.rotate = param.rotate || 0.01
        this.rd = param.rd || 0.8
    }
}