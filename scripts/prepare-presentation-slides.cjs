// Dedicated, reusable synthetic presentation examples. Never changes the guide projects.
const fs = require('node:fs')
const path = require('node:path')
const { randomUUID } = require('node:crypto')
const { api, items } = require('./mediakit-api.cjs')
const original = require('../cypress/fixtures/5.0/mediakit.json')
const fixturePath = path.resolve('cypress/fixtures/presentation-slides-mediakit.json')
const repositoryQuestion = '80a682bd-8a5c-4a52-935d-680509838a4e'
const integrationQuestion = '221c322e-dff5-438f-8a2e-90e762681156'
const nationalAnswer = 'fb96d008-f31a-4a1a-b203-b3f9bb32fcc8'
async function example(name) {
  let p = items(await api('/projects?size=100')).find(p => p.name === name)
  if (!p) {
    p = await api('/projects/' + original.projectUuid + '/clone', { method: 'POST' })
    const s = await api('/projects/' + p.uuid + '/settings')
    await api('/projects/' + p.uuid + '/settings', { method: 'PUT', json: {
      name, description: 'Synthetic examples retained for reproducible presentation screenshots.',
      projectTags: s.projectTags, isTemplate: false,
      documentTemplateUuid: s.documentTemplate?.uuid || null, formatUuid: s.formatUuid,
      documentTemplateLanguage: s.documentTemplateLanguage ?? null, language: s.language ?? null
    } })
  }
  return p.uuid
}
async function event(project, data) { await api('/projects/' + project + '/events', { method: 'POST', json: { uuid: randomUUID(), ...data } }) }
async function main() {
  const repositoryProjectUuid = await example('Presentation Slides — Questionnaire')
  const integrationProjectUuid = await example('Presentation Slides — Integrations')
  const repository = await api('/projects/' + repositoryProjectUuid + '/questionnaire')
  const repositoryPath = Object.keys(repository.replies).find(p => p.endsWith(repositoryQuestion))
  if (!repositoryPath) throw Error('Repository example is missing from the cloned project')
  await event(repositoryProjectUuid, { type: 'SetReplyEvent', path: repositoryPath, value: { type: 'AnswerReply', value: nationalAnswer } })
  const integration = await api('/projects/' + integrationProjectUuid + '/questionnaire')
  const previous = fs.existsSync(fixturePath) ? JSON.parse(fs.readFileSync(fixturePath)) : {}
  // A prior run may have cleared this answer; the question path still exists.
  const integrationPath = Object.keys(integration.replies).find(p => p.endsWith(integrationQuestion))
    || (previous.integrationProjectUuid === integrationProjectUuid && previous.integrationPath)
  if (!integrationPath || !integration.knowledgeModel.entities.questions[integrationQuestion]) throw Error('Integration example is missing from the cloned project')
  await event(integrationProjectUuid, { type: 'ClearReplyEvent', path: integrationPath })
  fs.writeFileSync(fixturePath, JSON.stringify({ repositoryProjectUuid, integrationProjectUuid, repositoryPath, integrationPath, repositoryQuestion, integrationQuestion,
    repositoryChapter: repositoryPath.split('.')[0], integrationChapter: integrationPath.split('.')[0],
    sourceQuestion: { bundle: 'dsw.root_2.7.0 (1).km', uuid: repositoryQuestion, title: 'What repository will this data be stored in?' },
    integrationSearch: 'banana' }, null, 2) + '\n')
  console.log('Presentation examples ready; the guide projects are unchanged.')
}
main().catch(e => { console.error(e.message); process.exitCode = 1 })
