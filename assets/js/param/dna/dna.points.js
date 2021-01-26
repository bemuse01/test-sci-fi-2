PARAM.object.dna.points = class{
    constructor(param = {}){
        this.rd = param.rd || {
            width: 0.675,
            height: 0.75,
            noise: 0.001
        } 
        this.seg = param.seg || 200
        this.color = param.color || 0xbdecff
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
        this.groupPos = param.groupPos || -12
    }
}