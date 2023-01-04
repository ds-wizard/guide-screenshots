const fs = require('fs')
const path = require('path')
const { defineConfig } = require("cypress");

const width = 1440
const height = 900

module.exports = defineConfig({
  screenshotsFolder: 'output/screenshots',
  videosFolder: 'output/videos',
  videoUploadOnPasses: false,
  numTestsKeptInMemory: 1,
  viewportWidth: width,
  viewportHeight: height,
  retries: {
    openMode: 0,
    runMode: 0,
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--force-device-scale-factor=2')
          launchOptions.args.push(`--window-size=${width},${height}`)
        }
        return launchOptions
      })

      on('after:screenshot', (details) => {
        const parts = details.path.replace(config.screenshotsFolder, '').split(path.sep)

        const a = parts.slice(2)
        const newPath = `${config.screenshotsFolder}${path.sep}${a.join(path.sep)}`

        const originalDir = `${config.screenshotsFolder}${path.sep}${parts[1]}`
        const newDir = newPath.split(path.sep).slice(0, -1).join(path.sep)

        return new Promise((resolve, reject) => {
          fs.mkdirSync(newDir, { recursive: true })
          fs.rename(details.path, newPath, (err) => {
            if (err) return reject(err)
            fs.rmdirSync(originalDir, { recursive: true })
            resolve({ path: newPath })
          })
        })
      })
    },
  },
})
