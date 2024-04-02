const fs = require('fs')
const glob = require('glob')
const cliProgress = require('cli-progress')

const [, , docsDir, screenshotsDir] = process.argv

console.info('Copying screenshots')

glob(`${screenshotsDir}/**/*.png`, (err, files) => {
    const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
    let value = 0
    bar.start(files.length, value)
    files.forEach((file) => {
        const docsPath = `${docsDir}${file.replace(screenshotsDir, '')}`
        fs.copyFile(file, docsPath, (err) => {
            if (err) {
                bar.stop()
                console.error(err)
                return
            }

            bar.update(++value)
            if (value === files.length) {
                bar.stop()
            }
        })
    })
})
