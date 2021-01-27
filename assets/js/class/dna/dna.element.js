CLASS.element.dna = class{
    constructor(){
        this.#init()
        this.#create()
    }


    // init
    #init(){
        this.param = {
            sideNumber: new PARAM.element.dna.sideNumber()
        }

        this.element = document.querySelector('.ui-dna')
    }

    
    // create
    #create(){
        this.#createSideNumber()
    }
    // side number
    #createSideNumber(){
        this.sideNumber = {
            left: [],
            right: []
        }

        const eHeight = 100 / this.param.sideNumber.count

        for(let i = 0; i < this.param.sideNumber.count; i++){
            this.sideNumber.left.push({
                id: i,
                text: Math.floor(Math.random() * this.param.sideNumber.range),
                style: {
                    parent: {height: `${eHeight}%`},
                    child: {}
                }
            })
            this.sideNumber.right.push({
                id: i,
                text: Math.floor(Math.random() * this.param.sideNumber.range),
                style: {
                    parent: {height: `${eHeight}%`},
                    child: {}
                }
            })
        }
    }


    // animate
    animate(){

    }


    // event
    resize(){

    }
    #resizeSideNumber(){

    }
}