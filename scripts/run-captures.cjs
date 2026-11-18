const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')
const state = path.resolve('output/state/project-settings-before-captures.json')
fs.mkdirSync(path.dirname(state), { recursive: true })
let exitCode = 1
try {
  if (!fs.existsSync(state)) {
    const setup = spawnSync(process.execPath, ['scripts/project-capture-state.cjs'], { stdio: 'inherit' })
    if (setup.status !== 0) throw new Error('Could not prepare project screenshots')
  }
  const run = spawnSync(path.resolve('node_modules/.bin/cypress'), ['run', '--browser', 'chrome'], { stdio: 'inherit', env: process.env })
  exitCode = run.status ?? 1
  if (exitCode === 0 && !process.env.DSW_SCENES) {
    const migration = spawnSync(process.execPath, ['scripts/capture-km-migration.cjs'], { stdio: 'inherit', env: process.env })
    exitCode = migration.status ?? 1
  }
} finally {
  if (fs.existsSync(state)) {
    const restore = spawnSync(process.execPath, ['scripts/project-capture-state.cjs', 'restore'], { stdio: 'inherit' })
    if (restore.status !== 0) exitCode = 1
  }
}
process.exitCode = exitCode
