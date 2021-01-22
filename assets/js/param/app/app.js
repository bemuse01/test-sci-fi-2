PARAM.object.app = class{
    constructor(param = {}){
        this.renderer = param.renderer || null
        this.scene = param.scene || null
        this.camera = param.camera || null
        this.cameraPos = param.cameraPos || 100
        this.composer = param.composer || null
        this.fov = param.fov || 60
        this.near = param.near || 0.1
        this.far = param.far || 10000
    }
}