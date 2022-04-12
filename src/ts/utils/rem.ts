const baseSize = 37.5
function setRem () {undefined
const scale = document.documentElement.clientWidth / 375
document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
setRem()
window.onresize = function () {undefined
console.log("我执行了")
setRem()
}