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
            point: new THREE.Points(this.geometry.point, this.material.point),
            line: new THREE.LineSegments(this.geometry.line, this.material.line)
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
                opacity: new Float32Array((this.param.particles ** 2) * 3)
            }
        }
        console.log(this.attr)
                
        this.geometry = {
            point: new THREE.BufferGeometry(),
            line: new THREE.BufferGeometry()
        }

        METHOD.object.dna.createPoint(this.param, this.view, this.attr)

        this.geometry.point.setDrawRange(0, this.param.particles)
        this.geometry.point.setAttribute('position', new THREE.BufferAttribute(this.attr.point.position, 3).setUsage(THREE.DynamicDrawUsage))

        this.geometry.line.setAttribute('position', new THREE.BufferAttribute(this.attr.line.position, 3).setUsage(THREE.DynamicDrawUsage))
        this.geometry.line.setAttribute('opacity', new THREE.BufferAttribute(this.attr.line.opacity, 1).setUsage(THREE.DynamicDrawUsage))
    }

    #createMaterial(){
        this.material = { 
            point: new THREE.PointsMaterial({
                color: this.param.color,
                transparent: true,
                opacity: this.param.opacity,
                size: 1.0
            }),
            line: new THREE.ShaderMaterial({
                vertexShader: SHADER.dna.particle.vertex,
                fragmentShader: SHADER.dna.particle.fragment,
                transparent: true,
                uniforms: {
                    color: {value: new THREE.Color(this.param.color)}
                }
            })
            // line: new THREE.LineBasicMaterial({
            //     vertexColors: true,
            //     blending: THREE.AdditiveBlending,
            //     transparent: true
            // })
        }
    }

    animate(){
        const point = this.attr.point, line = this.attr.line
        
        let vertexPos = 0
        let opacityPos = 0
        let connection = 0

        for(let i = 0; i < this.param.particles; i++){
            point.position[i * 3] += point.data[i].velocity.x
            point.position[i * 3 + 1] += point.data[i].velocity.y
            // point.position[i * 3 + 2] += point.data[i].z

            if(point.position[i * 3] <= -this.view.width / 2 || point.position[i * 3] >= this.view.width / 2) point.data[i].velocity.x *= -1
            if(point.position[i * 3 + 1] <= -(this.view.height / 2) * this.param.rd || point.position[i * 3 + 1] >= (this.view.height / 2) * this.param.rd) point.data[i].velocity.y *= -1
            
            for(let j = i + 1; j < this.param.particles; j++){
                const dx = point.position[i * 3] - point.position[j * 3]
                const dy = point.position[i * 3 + 1] - point.position[j * 3 + 1]
                // const dz = point.position[i * 3 + 2] - point.position[j * 3 + 2]
                // const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
                const dist = Math.sqrt(dx * dx + dy * dy)

                if(dist < this.param.minDistance){
                    // particleData.numConnections ++
                    // particleDataB.numConnections ++

                    const alpha = this.param.opacity - dist / this.param.minDistance

                    line.position[vertexPos++] = point.position[i * 3]
                    line.position[vertexPos++] = point.position[i * 3 + 1]
                    line.position[vertexPos++] = point.position[i * 3 + 2]

                    line.position[vertexPos++] = point.position[j * 3]
                    line.position[vertexPos++] = point.position[j * 3 + 1]
                    line.position[vertexPos++] = point.position[j * 3 + 2]

                    line.opacity[opacityPos++] = alpha
                    line.opacity[opacityPos++] = alpha

                    connection++
                }
            }

        }
        this.geometry.point.attributes.position.needsUpdate = true

        this.geometry.line.setDrawRange(0, connection * 2)
        this.geometry.line.attributes.position.needsUpdate = true
        this.geometry.line.attributes.opacity.needsUpdate = true
    }

    resize(camera){
        this.view.width = METHOD.object.util.getVisibleWidth(camera, 0)
        this.view.height = METHOD.object.util.getVisibleHeight(camera, 0)
    }
}