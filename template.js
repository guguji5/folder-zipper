const path = require('path')
const fs = require('fs')
const absolutePath = '/Users/didi/Desktop/pub'
exports.getTemplate =function(){
    let paths = fs.readdirSync(absolutePath)
    // paths.forEach(item =>{
    //   let a = path.join(absolutePath, item)
    //   console.log(fs.existsSync(a) && fs.lstatSync(a).isDirectory())
    // })
    console.log(paths)
    let template = ''

    paths.forEach(item => {
    template+=`<input type="checkbox" name=${item}> ${item}`
    })
    template +='<br /><button onclick="download()">点击下载</button>'
    template +=`<script>function download(){let checkedNodes = document.querySelectorAll('input:checked'); let names = Array.prototype.call(checkedNodes).map(item=>item.name); console.log(name)}</script>`
    return template
}


