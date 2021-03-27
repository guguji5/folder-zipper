module.exports = {
    // absoluteDir :'/Users/didi/Desktop/pub',
    absoluteDir :'/root/ecmc8026/pub',
    formatDate(time){
        const month = time.getMonth()+1
        const date = time.getDate()
        const hour = time.getHours()
        const minute = time.getMinutes()
        const second = time.getSeconds()
        return {month, date, hour, minute, second}
    }
}