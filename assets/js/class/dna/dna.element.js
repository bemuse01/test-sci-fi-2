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
            const style = {
                parent: {height: `${eHeight}%`},
                child: {
                    top: i === 0 ? '0' : i === this.param.sideNumber.count - 1 ? 'initial' : `${i * 14}%`,
                    bottom: i === this.param.sideNumber.count - 1 ? '0' : 'initial',
                    transform: `translate(0, ${i === 0 || i === this.param.sideNumber.count - 1 ? 0 : -50}%)`
                }
            }
            this.sideNumber.left.push({
                id: i,
                text: Math.floor(Math.random() * this.param.sideNumber.range),
                style: style
            })
            this.sideNumber.right.push({
                id: i,
                text: Math.floor(Math.random() * this.param.sideNumber.range),
                style: style
            })
        }
    }


    // animate
    animate(){
        this.#animateSideNumber()
    }
    #animateSideNumber(){
        for(let g in this.sideNumber) this.sideNumber[g].forEach(e => {
            if(Math.random() > this.param.sideNumber.chance){
                e.text = Math.floor(Math.random() * this.param.sideNumber.range)
            }
        })
    }


    // event
    resize(){

    }
    #resizeSideNumber(){

    }
}