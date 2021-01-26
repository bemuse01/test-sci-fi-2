CLASS.object.dna.points = class{
    constructor(group, param, camera){
        this.#init(param, camera)
        this.#create()
        this.#add(group)        
    }

    #init(param, camera){
        this.param = param
        this.view = {
            width: METHOD.object.util.getVisibleWidth(camera, 0),
            height: METHOD.object.util.getVisibleHeight(camera, 0)
        }
    }

    #add(group){
       for(let i in this.mesh) group.add(this.mesh[i])
       group.position.y = this.param.groupPos
    }

    #create(){
        this.#createMesh()
    }

    #createMesh(){
        const geometry = this.#createGeometry()
        const material = this.#createMaterial()
        this.mesh = {top: new THREE.Points(geometry.top, material), bottom: new THREE.Points(geometry.bottom, material)}
        for(let i in this.mesh) this.mesh[i].layers.set(this.param.layers)
    }

    #createGeometry(){
        const w = this.view.width * this.param.rd.width, h = this.view.height * this.param.rd.height
        this.sample = new THREE.PlaneGeometry(w, h, this.param.seg).vertices

        const geometry = {top: new THREE.Geometry(), bottom: new THREE.Geometry()}

        this.sample.forEach((e, i) => {
            if(i < this.sample.length / 2) geometry.top.vertices.push(new THREE.Vector3(e.x, e.y, e.z))
            else geometry.bottom.vertices.push(new THREE.Vector3(e.x, e.y, e.z))
        })

        console.log(this.sample)

        return geometry
    }

    #createMaterial(){
        const material = new THREE.PointsMaterial({
            color: this.param.color,
            transparent: true,
            opacity: this.param.opacity,
            size: this.param.size
        })
        return material
    }

    animate(){
        const time = window.performance.now()

        this.#movePoints(time)
        this.#moveMesh(time)   
    }
    #moveMesh(time){
        const r = noise.noise2D(1 / this.param.smooth.mesh, time * this.param.rd.noise)
        this.mesh.top.position.y = -r
        this.mesh.bottom.position.y = r
    }
    #movePoints(time){
        for(let m in this.mesh){
           const geometry = this.mesh[m].geometry
           const sample = this.sample.slice(m === 'top' ? 0 : this.sample.length / 2, m === 'top' ? this.sample.length / 2 : this.sample.length)

           geometry.vertices.forEach((e, i) => {
               const r = noise.noise2D(e.x / this.param.smooth.points, time * this.param.rd.noise)
               const n = METHOD.object.util.normalize(r, this.param.range.min, this.param.range.max, 1, -1)
              
                e.y = sample[i].y * n
           })

           geometry.verticesNeedUpdate = true
        }
    }

    resize(){

    }
}