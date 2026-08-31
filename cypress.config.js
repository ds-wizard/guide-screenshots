const fs = require('fs')
const path = require('path')
const { defineConfig } = require('cypress')
const env = require('./cypress.env')


const width = 1440
const height = 900
const publicConfigKeys = [
  'url',
  'appTitle',
  'appTitleShort',
  'primaryColor',
  'illustrationsColor',
  'logoFixture',
]
const expose = Object.fromEntries(Object.entries(env).filter(([key]) => publicConfigKeys.includes(key)))
const privateEnv = Object.fromEntries(Object.entries(env).filter(([key]) => !publicConfigKeys.includes(key)))

module.exports = defineConfig({
  allowCypressEnv: false,
  env: privateEnv,
  expose,
  screenshotsFolder: 'output/screenshots',
  videosFolder: 'output/videos',
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
          launchOptions.args = launchOptions.args.filter((arg) => !arg.startsWith('--force-device-scale-factor=') && !arg.startsWith('--window-size='))
          launchOptions.args.push('--force-device-scale-factor=2')
          launchOptions.args.push(`--window-size=${width},${height + 200}`)
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
