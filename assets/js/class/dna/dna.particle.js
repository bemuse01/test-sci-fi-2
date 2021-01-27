CLASS.object.dna.particle = class{
    constructor(group, param, camera){
        this.#init(param, camera)
        this.#create()
        this.#add(group)
        this.#createTween()
    }

    #init(param, camera){
        this.param = param
        this.view = {
            width: METHOD.object.util.getVisibleWidth(camera, 0),
            height: METHOD.object.util.getVisibleHeight(camera, 0)
        }
        this.play = false
        this.lineOpacity = 0
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
                size: null,
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
        this.geometry.point.setAttribute('opacity', new THREE.BufferAttribute(this.attr.point.opacity, 1))
        this.geometry.point.setAttribute('vSize', new THREE.BufferAttribute(this.attr.point.size, 1))

        this.geometry.line.setAttribute('position', new THREE.BufferAttribute(this.attr.line.position, 3).setUsage(THREE.DynamicDrawUsage))
        this.geometry.line.setAttribute('opacity', new THREE.BufferAttribute(this.attr.line.opacity, 1).setUsage(THREE.DynamicDrawUsage))
    }

    #createMaterial(){
        this.material = { 
            // point: new THREE.PointsMaterial({
            //     color: this.param.color,
            //     transparent: true,
            //     opacity: this.param.opacity.point,
            //     size: 1.0
            // }),
            point: new THREE.ShaderMaterial({
                vertexShader: SHADER.dna.particle.point.vertex,
                fragmentShader: SHADER.dna.particle.point.fragment,
                transparent: true,
                uniforms: {
                    color: {value: new THREE.Color(this.param.color.point)}
                }
            }),
            line: new THREE.ShaderMaterial({
                vertexShader: SHADER.dna.particle.line.vertex,
                fragmentShader: SHADER.dna.particle.line.fragment,
                transparent: true,
                uniforms: {
                    color: {value: new THREE.Color(this.param.color.line)}
                }
            })
        }
    }

    #createTween(){
        this.#createPointTween()
    }
    #createPointTween(){
        for(let i = 0; i < this.attr.point.opacity.length; i++){
            const start = {opacity: 0}, end = {opacity: this.param.opacity.point}

            const tw = new TWEEN.Tween(start)
            .to(end, TIME.dna.object.transition.particle.point)
            .onUpdate(() => this.#updatePointTween(this.attr.point.opacity, i, start))
            .onComplete(() => {if(i === this.attr.point.opacity.length - 1) this.#completeTween()})
            .delay(TIME.dna.object.start.particle + TIME.dna.object.delay * i)
            .start()
        }
    }
    #createLineTween(){
        const start = {opacity: 0}, end = {opacity: this.param.opacity.line}

        const tw = new TWEEN.Tween(start)
        .to(end, TIME.dna.object.transition.particle.line)
        .onUpdate(() => this.#updateLineTween(start))
        .start()
    }
    #updatePointTween(e, i, start){
        e[i] = start.opacity
    }
    #updateLineTween(start){
        this.lineOpacity = start.opacity
    }
    #completeTween(){
        this.#createLineTween()
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

            if(point.position[i * 3] <= -(this.view.width / 2) * this.param.rd.width || point.position[i * 3] >= (this.view.width / 2) * this.param.rd.width) point.data[i].velocity.x *= -1
            if(point.position[i * 3 + 1] <= -(this.view.height / 2) * this.param.rd.height || point.position[i * 3 + 1] >= (this.view.height / 2) * this.param.rd.height) point.data[i].velocity.y *= -1

            for(let j = i + 1; j < this.param.particles; j++){
                const dx = point.position[i * 3] - point.position[j * 3]
                const dy = point.position[i * 3 + 1] - point.position[j * 3 + 1]
                // const dz = point.position[i * 3 + 2] - point.position[j * 3 + 2]
                // const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
                const dist = Math.sqrt(dx * dx + dy * dy)

                if(dist < this.param.minDistance){
                    const alpha = this.lineOpacity - dist / this.param.minDistance

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
        this.geometry.point.attributes.opacity.needsUpdate = true

        this.geometry.line.setDrawRange(0, connection * 2)
        this.geometry.line.attributes.position.needsUpdate = true
        this.geometry.line.attributes.opacity.needsUpdate = true
    }

    resize(camera){
        this.view.width = METHOD.object.util.getVisibleWidth(camera, 0)
        this.view.height = METHOD.object.util.getVisibleHeight(camera, 0)

        for(let i = 0; i < this.param.particles; i++){
            const x = Math.random() * this.view.width * this.param.rd.width - (this.view.width / 2) * this.param.rd.width
            const y = Math.random() * this.view.height * this.param.rd.height - (this.view.height / 2) * this.param.rd.height
            const z = 0

            this.attr.point.position[i * 3] = x
            this.attr.point.position[i * 3 + 1] = y
            this.attr.point.position[i * 3 + 2] = z
        }
    }
}