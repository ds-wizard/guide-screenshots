const fs = require('node:fs')
const path = require('node:path')
const docs = path.resolve(process.argv[2] || '../dsw-guide/docs')
const scenes = require('../cypress/fixtures/5.0/scenes.json')
const mapping = require('../cypress/fixtures/5.0/guide-map.json')
// Intentionally fixed to guide scenes/output. Presentation captures have a separate manifest.
const output = path.resolve('output/5.0')
const manifest = JSON.parse(fs.readFileSync(path.join(output, 'manifest.json')))
if (manifest.baseUrl !== 'https://mediakit.ds-wizard.org') throw Error('Unexpected capture environment')
const records = new Map(manifest.records.map(record => [record.id, record]))
const installed = [], missing = []
function figure(id) {
  const scene = scenes.find(scene => scene.id === id)
  const source = path.join(output, 'images', id + '.png')
  if (!scene || !records.has(id) || !fs.existsSync(source)) throw Error('Missing capture: ' + id)
  const bytes = fs.readFileSync(source)
  const limit = scene.selector?.includes('dialog') ? 480 : (scene.selector?.includes('ui-page__header') ? 520 : 760)
  const width = Math.min(limit, Math.round(bytes.readUInt32BE(16) / 2))
  const target = path.join(docs, '_static/screenshots/5.0', id + '.png')
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.copyFileSync(source, target)
  return `.. figure:: /_static/screenshots/5.0/${id}.png\n    :figclass: guide-screenshot\n    :alt: ${scene.alt}\n    :width: ${width}\n\n    ${scene.caption}.\n`
}
for (const entry of mapping.placements) {
  const file = path.join(docs, entry.page)
  let text = fs.readFileSync(file, 'utf8')
  const marker = `.. todo::\n\n   Screenshot: ${entry.todo}\n`
  if (!entry.images.every(id => records.has(id))) { missing.push(entry); continue }
  if (entry.after && !entry.images.every(id => text.includes(`/_static/screenshots/5.0/${id}.png`))) {
    if (!text.includes(entry.after)) throw Error('Guide insertion point changed: ' + entry.page);
    text = text.replace(entry.after, entry.after + '\n\n' + entry.images.map(figure).join('\n').trimEnd());
    fs.writeFileSync(file, text);
  } else if (text.includes(marker)) {
    text = text.replace(marker, entry.images.map(figure).join('\n'))
    fs.writeFileSync(file, text)
  } else if (entry.images.every(id => text.includes(`/_static/screenshots/5.0/${id}.png`))) {
    entry.images.forEach(id => {
      const start = text.indexOf(`.. figure:: /_static/screenshots/5.0/${id}.png`);
      const foundEnd = text.indexOf('\n\n', text.indexOf('\n\n', start) + 2);
      const end = foundEnd < 0 ? text.length : foundEnd;
      if (start < 0) throw Error('Cannot refresh generated figure: ' + id);
      text = text.slice(0, start) + figure(id).trimEnd() + (end === text.length ? '\n' : text.slice(end));
    })
    fs.writeFileSync(file, text)
  } else {
    throw Error('Guide placeholder changed: ' + entry.page + ': ' + entry.todo)
  }
  installed.push(entry)
}
const remaining = []
function walk(folder) {
  for (const item of fs.readdirSync(folder, { withFileTypes: true })) {
    if (item.name.startsWith('.')) continue
    const file = path.join(folder, item.name)
    if (item.isDirectory()) walk(file)
    else if (item.name.endsWith('.rst')) {
      for (const match of fs.readFileSync(file, 'utf8').matchAll(/\.\. todo::\n\n\s+Screenshot: ([^\n]+)/g)) remaining.push({ page: path.relative(docs, file), description: match[1] })
    }
  }
}
walk(docs)
const report = { date: '2026-11-03', source: 'DSW mediakit 5.0; Cypress/Chrome', installedPlacements: installed.length, installedImages: new Set(installed.flatMap(e => e.images)).size, missingCaptures: missing, remainingScreenshotTodos: remaining, blocked: mapping.blocked }
const maintenance = path.join(docs, '..', 'maintenance')
fs.mkdirSync(maintenance, { recursive: true })
fs.writeFileSync(path.join(maintenance, 'screenshot-integration.json'), JSON.stringify(report, null, 2) + '\n')
console.log(JSON.stringify({ placements: installed.length, images: report.installedImages, missingCaptures: missing.length, remainingTodos: remaining.length }))
