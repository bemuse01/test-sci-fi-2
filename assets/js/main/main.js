new Vue({
    el: '#wrap',
    data(){
        return{
            element: {
                dna: new CLASS.element.dna()
            }
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        // init
        init(){
            this.initThree()
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
        },


        // init three
        initThree(){
            COMP.object.app = new CLASS.object.app.build()

            this.createObject(COMP.object.app.param)
        },
        // render three
        renderThree(){
            for(let i in COMP.object) COMP.object[i].animate()
        },
        // create object
        createObject(app){
            this.createObjectDna(app)
        },
        createObjectDna(app){
            COMP.object.dna = new CLASS.object.dna.build(app)
        },


        // event
        onWindowResize(){
            PARAM.util.width = window.innerWidth
            PARAM.util.height = window.innerHeight

            for(let i in COMP.object) COMP.object[i].resize()
        },


        // render
        render(){
            this.renderThree()
            TWEEN.update()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})