CLASS.object.dna.build = class{
    constructor(app){
        this.#init(app)
        this.#create()
        this.#render()
    }


    // init
    #init(app){
        this.param = {
            body: {
                big: new PARAM.object.dna.body(), 
                small: new PARAM.object.dna.body({size: 1.125, rand: {bone: 5.0, nucleic: 4.0}, point: 60})
            }
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
        const camera = new PARAM.object.app()

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


    // animate
    animate(){
        this.#rotateY()
    }
    #rotateY(){
        this.build.rotation.y += 0.02
    }


    // event
    resize(){
        const {width, height} = this.element.getBoundingClientRect()
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.composer.setSize(width, height)

        this.fxaa.uniforms['resolution'].value.set(1 / width, 1 / height)
    }
}