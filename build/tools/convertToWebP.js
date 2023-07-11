const sharp = require('sharp')
const fs = require('node:fs')

const dir = '../logo'

fs.readdir(dir , async (err, files) => {
    if (err){
        console.error(err)
        return
    }

    async function convert() {
        let count = 0;
        files.forEach(file => {
            try{
                fs.readFile(`${dir}/${file}`, async (err, data) => {
                    if (err) {
                        console.error(err)
                        return;
                    }

                    const buffer = Buffer.from(data, 'binary')
                    const converted = await sharp(buffer).webp().toBuffer()

                    fs.writeFile(`${dir}/${file.split('.')[0]}.webp`, converted, (err) => {
                        if (err){
                            console.log(err)
                        }
                        else{
                            console.log(`file created...`)

                            fs.rm(`${dir}/${file}`, (err) => {
                                if (err){
                                    console.error(err)
                                }
                                else{
                                    console.log(`${file} removed`)
                                }
                            })
                        }
                    })
                })
            }
            catch(e){
                console.log(err)
            }finally{
                count++;
                if (count == files.length)
                    return Promise.resolve()
            }
        })
    }

    await convert();
    
    console.log(files)
})