PARAM.object.dna.points = class{
    constructor(param = {}){
        this.rd = param.rd || {
            width: 0.7,
            height: 0.85,
            noise: 0.001
        } 
        this.seg = param.seg || 160
        this.color = param.color || 0xffffff
        this.opacity = param.opacity || 0.6 
        this.size = param.size || 0.5
        this.layers = param.layers || NORMAL
        this.smooth = param.smooth || {
            points: 5,
            mesh: 100
        }
        this.range = param.range || {
            min: 0.99,
            max: 1.01
        }
    }
}