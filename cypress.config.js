const fs = require('node:fs')
const path = require('node:path')
const { defineConfig } = require('cypress')
const fixture = require('./cypress/fixtures/5.0/mediakit.json')
const presentationSlides = process.env.DSW_CAPTURE_SET === 'presentation-slides'
let scenes = require(presentationSlides ? './cypress/fixtures/presentation-slides.json' : './cypress/fixtures/5.0/scenes.json')
if (presentationSlides) Object.assign(fixture, require('./cypress/fixtures/presentation-slides-mediakit.json'))
if (process.env.DSW_SCENES) {
  const wanted = new Set(process.env.DSW_SCENES.split(',').map(id => id.trim()).filter(Boolean))
  scenes = scenes.filter(scene => wanted.has(scene.id))
  if (scenes.length !== wanted.size) throw Error('Unknown screenshot scene')
} else {
  scenes = scenes.filter(scene => !scene.staged)
}
const output = path.resolve(presentationSlides ? 'output/presentation-slides' : 'output/5.0')
const records = []
const capture = {
  baseUrl: 'https://mediakit.ds-wizard.org',
  apiUrl: 'https://mediakit.ds-wizard.org/api',
  theme: 'light', selected: scenes, fixture
}
module.exports = defineConfig({
  allowCypressEnv: false,
  expose: { capture },
  viewportWidth: 1280, viewportHeight: 800,
  video: false, screenshotOnRunFailure: false,
  screenshotsFolder: path.join(output, 'screenshots'),
  downloadsFolder: path.join(output, 'downloads'),
  defaultCommandTimeout: 12000, numTestsKeptInMemory: 0, retries: presentationSlides ? 1 : 0,
  e2e: {
    baseUrl: capture.baseUrl,
    specPattern: presentationSlides ? 'cypress/e2e/presentation-slides.cy.js' : 'cypress/e2e/5.0/**/*.cy.js',
    supportFile: 'cypress/support/5.0/e2e.js',
    setupNodeEvents(on) {
      let session
      let externalRecordUrl
      on('task', {
        'presentation:record-url': value => { if (value) { const u = new URL(value); if (u.hostname !== 'fairsharing.org') throw Error('Unexpected record host'); externalRecordUrl = u.href } return externalRecordUrl || null },
        'capture:login': async () => {
          if (!session) session = await require('./scripts/mediakit-api.cjs').login()
          return session
        },
        'capture:asset-ready': async url => {
          const parsed = new URL(url)
          if (!['s3.ds-wizard.org', 'mediakit.ds-wizard.org'].includes(parsed.hostname)) throw Error('Unexpected preview host')
          for (let attempt = 0; attempt < 20; attempt++) {
            const response = await fetch(url, { signal: AbortSignal.timeout(10000) })
            const body = await response.text()
            if (response.ok && /<(?:!doctype|html)/i.test(body)) return true
            if (response.status !== 404) throw Error('Preview asset HTTP ' + response.status)
            await new Promise(resolve => setTimeout(resolve, 1000))
          }
          throw Error('Preview asset did not become available')
        },
        'capture:record': record => {
          const scene = scenes.find(scene => scene.path === record.path)
          const bytes = fs.readFileSync(path.join(output, 'images', scene.id + '.png'))
          const width = bytes.readUInt32BE(16), height = bytes.readUInt32BE(20)
          const expectedHeight = record.crop.height * width / record.crop.width
          if (Math.abs(height - expectedHeight) > 2) throw Error('Screenshot was clipped by the browser window: ' + scene.id)
          if (presentationSlides && record.path.includes('external-record')) record.sourceUrl = externalRecordUrl
          records.push(record)
          return null
        },
        'capture:diagnose': record => {
          fs.mkdirSync(output, { recursive: true })
          fs.writeFileSync(path.join(output, record.id + '-diagnostic.json'), JSON.stringify(record, null, 2))
          return null
        }
      })
      on('before:browser:launch', (browser = {}, options) => {
        if (browser.family === 'chromium') {
          options.args = options.args.filter(arg => !arg.startsWith('--force-device-scale-factor=') && !arg.startsWith('--window-size='))
          const height = Math.max(1000, ...scenes.map(scene => (scene.height || 800) + 200))
          options.args.push('--force-device-scale-factor=2', `--window-size=1280,${height}`)
        }
        return options
      })
      on('after:screenshot', details => {
        const scene = scenes.find(scene => details.name === scene.path || details.name.endsWith('/' + scene.path))
        if (!scene) throw Error('Unrecognized screenshot')
        const target = path.join(output, 'images', scene.id + '.png')
        fs.mkdirSync(path.dirname(target), { recursive: true })
        fs.copyFileSync(details.path, target)
      })
      on('after:run', results => {
        fs.mkdirSync(output, { recursive: true })
        const file = path.join(output, 'manifest.json')
        const previous = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : {}
        const merged = new Map((previous.records || []).map(record => [record.path, record]))
        records.forEach(record => merged.set(record.path, { ...scenes.find(scene => scene.path === record.path), ...record }))
        const failures = results.runs.flatMap(run => run.tests.filter(test => test.state === 'failed').map(test => ({
          title: test.title.join(' / '), error: test.displayError?.split('\n')[0]
        })))
        fs.writeFileSync(file, JSON.stringify({
          capturedAt: new Date().toISOString(), baseUrl: capture.baseUrl, theme: capture.theme,
          records: [...merged.values()], lastRun: { passed: results.totalPassed, failed: results.totalFailed, failures }
        }, null, 2) + '\n')
      })
    }
  }
})
