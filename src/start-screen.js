const screen = document.getElementById('start-screen')
const canvas = document.querySelector('canvas')
const finish = document.getElementById('finish-screen')
module.exports = {
    show: () => {
        finish.classList.remove('hide')
        canvas.classList.add('hide')
    },
    hide: () => {
        screen.classList.add('hide')
        canvas.classList.remove('hide')
    }
}