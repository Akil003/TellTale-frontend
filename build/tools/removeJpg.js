const fs = require('node:fs')

fs.readdir('../banner', (err, files) => {

    files.forEach(file => {
        if (file.indexOf('.jpg') !== -1) {
            fs.rm(`../banner/${file}`, () => {
                console.log('file removed...')
            })
        }
    })

})