export default class ClickIndicator {
    constructor(canvas){
        canvas.addEventListener('click',(event) => {
            console.log(event)
        })
    }
    log(){
        console.log()
    }
}