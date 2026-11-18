// The existing clean Chemistry editor provides a real migration example.
// Capture before/after starting it, then cancel only this temporary migration.
const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')
const { api, items } = require('./mediakit-api.cjs')
const f = require('../cypress/fixtures/5.0/mediakit.json')
function capture(ids) {
  const run = spawnSync(path.resolve('node_modules/.bin/cypress'), ['run','--browser','chrome'], {stdio:'inherit',env:{...process.env,DSW_SCENES:ids.join(',')}})
  if (run.status !== 0) throw Error('Migration screenshot capture failed')
}
async function main() {
  const editorUrl = '/knowledge-model-editors/'+f.migrationEditorUuid
  const editors = items(await api('/knowledge-model-editors?size=100'))
  const editor = editors.find(x=>x.uuid===f.migrationEditorUuid)
  if (editor?.state !== 'OutdatedKnowledgeModelEditorState') throw Error('Expected the clean, outdated Chemistry editor; do not overwrite another migration')
  const before = await api(editorUrl)
  const stateFile = 'output/state/km-migration-before-captures.json'
  fs.mkdirSync(path.dirname(stateFile),{recursive:true})
  if (fs.existsSync(stateFile)) throw Error('An unresolved migration capture backup exists')
  fs.writeFileSync(stateFile,JSON.stringify({editorUuid:editor.uuid,before},null,2),{mode:0o600})
  let started = false
  try {
    if (!process.argv.includes('--review-only')) capture(['km-migration-list','km-migration-update'])
    await api(editorUrl+'/migrations/current',{method:'POST',json:{targetPackageUuid:f.kmUuid}})
    started = true
    capture(['km-migration-review'])
  } finally {
    if (started) await api(editorUrl+'/migrations/current',{method:'DELETE'})
    const after = await api(editorUrl)
    if (JSON.stringify(after)!==JSON.stringify(before)) throw Error('Editor differs from its pre-capture snapshot; preserve the backup for review')
    fs.renameSync(stateFile,stateFile.replace('.json','.restored-'+Date.now()+'.json'))
    console.log('Chemistry editor restored exactly; no changes applied or published')
  }
}
main().catch(error=>{console.error(error.message);process.exitCode=1})
