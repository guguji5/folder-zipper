// require modules
const fs = require('fs');
const path = require('path')
const archiver = require('archiver');
const { absoluteDir } = require('./constant');

exports.download=function(projectArr, timeStamp, cb){
    // create a file to stream archive data to.
    const target = __dirname + `/public/pub${timeStamp}.zip`
    if(fs.existsSync(target)){
        fs.unlinkSync(target)
    }
    const output = fs.createWriteStream(target);
    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function() {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
        cb && cb()
    });

    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function() {
        console.log('Data has been drained');
        cb && cb()
    });

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function(err) {
        if (err.code === 'ENOENT') {
            // log warning
        } else {
            // throw error
            throw err;
        }
    });

    // good practice to catch this error explicitly
    archive.on('error', function(err) {
        throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);

    archive.append(`${projectArr.join(' ')}\n${timeStamp}`, { name: 'a.txt' });
    archive.file('./deploy.sh', { name: 'deploy.sh' });

    projectArr.forEach(item =>{
        const folder = path.join(absoluteDir, item);
        archive.directory(folder, item);
    })
    
    archive.finalize();
    
}