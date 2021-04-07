const path = require('path')
const fs = require('fs')
const { absoluteDir, formatDate } = require('./constant');
const priorityFolder=['crds', 'mis','zstack','portal','layout','rdb','metal','bill','dstor','mon','job', 'ams', 'rds','redis','mongodb']
exports.getTemplate =function(){
    let paths = fs.readdirSync(absoluteDir)
    let template = '<style>.block{float:left; width: 33%} .labal{display:inline-block;width: 150px;margin-bottom: 20px;} .highlight{color:#2f81f9} .date{display:inline-block;width:50px} .time{display:inline-block;width:50px}</style>'
    paths.filter(item =>{
      let absolutePath = path.join(absoluteDir, item)
      return fs.existsSync(absolutePath) && fs.lstatSync(absolutePath).isDirectory() && item != 'dstor-dky'
    }).sort((a,b) => {
      let orderLength = priorityFolder.length
      return (priorityFolder.includes(b) ? Math.pow(2,orderLength - priorityFolder.indexOf(b)) : -1) - (priorityFolder.includes(a) ? Math.pow(2,orderLength - priorityFolder.indexOf(a)) : -1)
    })
    .forEach(item => {
        let stats = fs.statSync(path.join(absoluteDir,item))
        const {month, date, hour, minute, second} = formatDate(new Date(stats.birthtime))
        template+=`<div class="block"><input type="checkbox" name=${item}> <span class="labal ${priorityFolder.includes(item) ? 'highlight' :''}">${item}</span>更新时间：<span class="date ${priorityFolder.includes(item) ? 'highlight' :''}">${month}.${date}</span><span class="time ${priorityFolder.includes(item) ? 'highlight' :''}">${hour}:${minute}:${second}</span></div>`
    })

    template +='<div class="block" style="width: 100%"><button onclick="download()">点击下载</button></div>'
    template +='<div class="block" style="width: 100%;margin-top: 20px">部署说明：<ol><li>勾选需要部署的子应用，点击下载</li><li>跳板机或者去电科院现场部署</li><li>外网机器：172.17.238.5（root/498NStJg） 172.17.238.6（root/ZNu#AE7e） ；内网机器：10.85.233.81（root/FGo8M7HsSoUN) 10.85.233.82（root/B6j9enkQsrfE）端口均为7755 </li><li>进入 root/ecmcMicro/pub目录</li><li>该目录下拷贝刚才下载的zip包</li><li>unzip 解压（e.g. unzip pub3-26-19-8-7.zip -d pub3-26）</li><li>进去刚才生成的目录（e.g. cd pub3-26)</li><li>执行sh deploy.sh，部署完毕</li></ol></div>'
    template +=`<script>function download(){let checkedNodes = document.querySelectorAll('input:checked'); let names = []; checkedNodes.forEach(item=>{ names.push(item.name)}); console.log(names); window.open( 'http://'+location.hostname+':8000/download?'+names, '_blank') }</script>`

    return template
}


