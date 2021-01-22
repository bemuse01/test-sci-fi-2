CLASS.object.dna.bone = class{
    constructor(group, param, direction, opacity){
        this.#create(param, direction, opacity)
        this.#add(group)
    }

    #add(group){
        group.add(this.mesh)
    }

    #create(param, direction, opacity){
        this.#createMesh(param, direction, opacity)
    }

    #createMesh(param, direction, opacity){
        const geometry = this.#createGeometry(param, direction, opacity)
        const material = this.#createMaterial(param)
        this.mesh = new THREE.Points(geometry, material)
        this.mesh.rotation.x = 90 * radian
        this.mesh.layers.set(param.layers)
    }

    #createGeometry(param, direction, opacity){
        const geometry = new THREE.BufferGeometry()

        this.attr = {
            position: null,
            size: null
        }

        METHOD.object.dna.createDnaBone(param, direction, this.attr)

        geometry.setAttribute('position', new THREE.BufferAttribute(this.attr.position, 3))
        geometry.setAttribute('opacity', new THREE.BufferAttribute(opacity.bone, 1))
        geometry.setAttribute('vSize', new THREE.BufferAttribute(this.attr.size, 1))

        return geometry
    }

    #createMaterial(param){
        const material = new THREE.ShaderMaterial({
            vertexShader: SHADER.dna.vertex,
            fragmentShader: SHADER.dna.fragment,
            transparent: true,
            uniforms: {
                color: {value: new THREE.Color(param.color.bone)}
            }
        })
        return material
    }
}