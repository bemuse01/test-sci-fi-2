CLASS.object.dna.build = class{
    constructor(app){
        this.#init(app)
        this.#create()
        this.#render()
        this.#createTween()
    }


    // init
    #init(app){
        this.param = {
            body: {
                big: new PARAM.object.dna.body(), 
                small: new PARAM.object.dna.body({size: 1.125, rand: {bone: 8.0, nucleic: 7.0}, point: 60})
            },
            particle: new PARAM.object.dna.particle()
        }

        this.opacity = {
            body: {
                big: METHOD.object.dna.createOpacityArray(this.param.body.big),
                small: METHOD.object.dna.createOpacityArray(this.param.body.small)
            }
        }

        this.#initGroup()
        this.#initRenderObject()
        this.#initComposer(app)
    }
    #initGroup(){
        this.group = {
            body: new THREE.Group(),
            particle: new THREE.Group()
        }

        this.build = new THREE.Group()
    }
    #initRenderObject(){
        this.element = document.querySelector('.ui-dna-object')

        const {width, height} = this.element.getBoundingClientRect()
        const camera = new PARAM.object.app({cameraPos: 150})

        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(camera.fov, width / height, camera.near, camera.far)
        this.camera.position.z = camera.cameraPos

    }
    #initComposer(app){
        this.bloom = 1.25

        const {width, height} = this.element.getBoundingClientRect()

        this.composer = new THREE.EffectComposer(app.renderer)
        this.composer.setSize(width, height)

        const renderScene = new THREE.RenderPass(this.scene, this.camera)

        const copyShader = new THREE.ShaderPass(THREE.CopyShader)
        copyShader.renderToScreen = true

        const filmPass = new THREE.FilmPass(0, 0, 0, false)

        const bloomPass = new THREE.BloomPass(this.bloom)

        this.fxaa = new THREE.ShaderPass(THREE.FXAAShader)
        this.fxaa.uniforms['resolution'].value.set(1 / width, 1 / height)

        this.composer.addPass(renderScene)
        this.composer.addPass(bloomPass)
        this.composer.addPass(filmPass)
        this.composer.addPass(this.fxaa)
    }


    // render
    #render(){
        for(let i in this.group) this.build.add(this.group[i])

        this.scene.add(this.build)
    }


    // create
    #create(){
        this.#createBody()
        this.#createParticle()
    }
    // body
    #createBody(){
        for(let i = 0; i < 5; i++){
            const param = i < 2 ? this.param.body.big : this.param.body.small
            const opacity = i < 2 ? this.opacity.body.big : this.opacity.body.small
            this.#createBone(param, opacity)
            this.#createNucleic(param, opacity)
        }
    }
    #createBone(param, opacity){
        const direction  = ['bottom-normal', 'bottom-reverse', 'top-normal', 'top-reverse']

        direction.forEach(e => new CLASS.object.dna.bone(this.group.body, param, e, opacity))
    }
    #createNucleic(param, opacity){
        const direction = ['bottom', 'top']

        direction.forEach(e => new CLASS.object.dna.nucleic(this.group.body, param, e, opacity))
    }
    // particle
    #createParticle(){
        this.particle = new CLASS.object.dna.particle(this.group.particle, this.param.particle, this.camera)
    }


    // tween
    #createTween(){
        for(let g in this.opacity.body){
            for(let o in this.opacity.body[g]){
                const easing = BezierEasing(...TIME.dna.object.easing[o])
                const time = 1 / this.opacity.body[g][o].length
                const temp = []
                for(let i = 0; i < this.opacity.body[g][o].length; i++) temp[i] = i
                const index = METHOD.object.util.shuffle(temp)

                for(let i = 0; i < this.opacity.body[g][o].length; i++){
                    const bezier = easing(i * time)
                    const start = {opacity: 0}, end = {opacity: this.param.body.big.opacity}

                    const tw = new TWEEN.Tween(start)
                    .to(end, TIME.dna.object.transition)
                    .onUpdate(() => this.#updateTween(this.opacity.body[g][o], index[i], start))
                    .delay(TIME.dna.object.start[o] + TIME.dna.object.duration[o] * bezier)
                    .start()
                }
            }
        }
    }
    #updateTween(e, i, start){
        e[i] = start.opacity
    }
    #updateOpacity(){
        this.group.body.children.forEach(e => {
            e.geometry.attributes.opacity.needsUpdate = true
        })
    }
    

    // animate
    animate(){
        this.#rotateY()
        this.#updateOpacity()
        this.particle.animate()
    }
    #rotateY(){
        this.group.body.rotation.x += 0.02
    }


    // event
    resize(){
        const {width, height} = this.element.getBoundingClientRect()
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.composer.setSize(width, height)

        this.fxaa.uniforms['resolution'].value.set(1 / width, 1 / height)

        this.particle.resize(this.camera)
    }
}