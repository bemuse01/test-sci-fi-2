CLASS.object.app.build = class{
    constructor(){
        this.#init()
    }

    #init(){
        this.param = new PARAM.object.app()

        const canvas = document.querySelector('#canvas')

        this.param.scene = new THREE.Scene()
    
        this.param.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: canvas})
        this.param.renderer.setSize(PARAM.util.width, PARAM.util.height)
        this.param.renderer.setPixelRatio(ratio)
        this.param.renderer.setClearColor(0x000000)
        this.param.renderer.setClearAlpha(0.0)

        this.param.camera = new THREE.PerspectiveCamera(this.param.fov, PARAM.util.width / PARAM.util.height, this.param.near, this.param.far)
        this.param.camera.position.z = this.param.cameraPos
        this.param.scene.add(this.param.camera)

        // this.param.scene.add(new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial))
    }

    animate(){
        this.#render()
    }
    #render(){
        // this.param.camera.lookAt(this.param.scene.position)
        // this.param.renderer.render(this.param.scene, this.param.camera)

        this.param.renderer.setScissorTest(false)
        this.param.renderer.clear()
        this.param.renderer.setScissorTest(true)

        for(let i in CLASS.object){
            if(i === 'app') continue
            const {scene, camera, element, composer} = COMP.object[i]

            const {left, top, width, height} = element.getBoundingClientRect()

            camera.aspect = width / height
            camera.updateProjectionMatrix()

            this.param.renderer.setViewport(left, top, width, height)
            this.param.renderer.setScissor(left, top, width, height)

            if(composer !== null || composer !== undefined) {
                this.param.renderer.autoClear = false
                this.param.renderer.clear()

                camera.layers.set(PROCESS)
                composer.render()

                this.param.renderer.clearDepth()
                camera.layers.set(NORMAL)
                this.param.renderer.render(scene, camera)
            }else{
                camera.layers.set(NORMAL)
                this.param.renderer.render(scene, camera)
            }
        }
    }

    resize(){
        this.param.renderer.setSize(PARAM.util.width, PARAM.util.height)
    }
}