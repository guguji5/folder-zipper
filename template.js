const path = require('path')
const fs = require('fs')
// const absolutePath = '/Users/didi/Desktop/pub'
const absolutePath = '/root/ecmc8026/pub'
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
    
    template +='<br /><br /><br /><br /><br />背景介绍：复选框实例   &lt;input type="checkbox" name=ams>'
    template +='<br />先随便选择几个文件，然后我的问题是：如何通过原生js获取勾选的文件名,如  ams，dstor'
   
    return template
}


