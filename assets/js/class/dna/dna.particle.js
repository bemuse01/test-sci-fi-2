CLASS.object.dna.particle = class{
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
    }

    #create(){
        this.#createGeometry()
        this.#createMaterial()
        this.#createMesh()
    }

    #createMesh(){
        this.mesh = {
            point: new THREE.Points(this.geometry.point, this.material.point)
        }
    }

    #createGeometry(){
        this.attr = {
            point: {
                position: null,
                opacity: new Float32Array(this.param.particles),
                data: []
            },
            line: {
                position: new Float32Array((this.param.particles ** 2) * 3),
                opacity: new Float32Array(this.param.particles ** 2)
            },
        }
                
        this.geometry = {
            point: new THREE.BufferGeometry(),
            line: new THREE.BufferGeometry()
        }

        METHOD.object.dna.createPoint(this.param, this.view, this.attr)

        // this.geometry.point.setDrawRange(0, param.particles)
        this.geometry.point.setAttribute('position', new THREE.BufferAttribute(this.attr.point.position, 3))
        console.log(this.attr.point.position)
    }

    #createMaterial(){
        this.material = { 
            point: new THREE.PointsMaterial({
                color: this.param.color,
                transparent: true,
                opacity: this.param.opacity,
                size: 1.0
            }),
            line: null
        }
    }

    animate(){
        for(let i = 0; i < this.param.particles; i++){
            const point = this.attr.point
            point.position[i * 3] += point.data[i].velocity.x
            point.position[i * 3 + 1] += point.data[i].velocity.y
            // point.position[i * 3 + 2] += point.data[i].z

            if(point.position[i * 3] <= -this.view.width / 2 || point.position[i * 3] >= this.view.width / 2) point.data[i].velocity.x *= -1
            if(point.position[i * 3 + 1] <= -(this.view.height / 2) * this.param.rd || point.position[i * 3 + 1] >= (this.view.height / 2) * this.param.rd) point.data[i].velocity.y *= -1
        }
        this.geometry.point.attributes.position.needsUpdate = true
    }

    resize(camera){
        this.view.width = METHOD.object.util.getVisibleWidth(camera, 0)
        this.view.height = METHOD.object.util.getVisibleHeight(camera, 0)
    }
}