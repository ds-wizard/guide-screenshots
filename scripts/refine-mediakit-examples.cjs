// Small, idempotent screenshot examples for the authorized DSW mediakit instance.
const fs = require('node:fs')
const { api, items } = require('./mediakit-api.cjs')
const fixturePath = 'cypress/fixtures/5.0/mediakit.json'
const fixture = require('../' + fixturePath)
const filesDir = 'cypress/fixtures/5.0/project-files'
async function main() {
  let users = items(await api('/users?size=100'))
  // Explicitly approved by the user: one active dummy researcher for sharing.
  if (!users.some(u => u.email === 'marie.curie@example.com')) {
    await api('/users',{method:'POST',json:{firstName:'Marie',lastName:'Curie',email:'marie.curie@example.com',affiliation:'Example University',roleUuid:users.find(u=>u.firstName==='Isaac').role.uuid,password:require('node:crypto').randomBytes(30).toString('base64url')}})
    users = items(await api('/users?size=100'))
  }
  const user = name => users.find(u => u.firstName === name)
  fixture.stewardUuid = user('Nikola').uuid
  fixture.secondResearcherUuid = user('Marie').uuid
  // Requested mock provider: reserved .invalid host, dummy credentials, registration off.
  const providers = await api('/open-id-clients')
  let provider = providers.find(p => p.name === 'Example University (demo)')
  if (!provider) provider = await api('/open-id-clients',{method:'POST',json:{name:'Example University (demo)',url:'https://identity.example.invalid',clientId:'dsw-demo',clientSecret:'example-only-not-a-real-secret',parameters:[],style:{icon:'fas fa-university',background:'#333333',color:'#ffffff'},registrationEnabled:false,scopeEmail:true,scopeProfile:true}})
  fixture.openIdUuid = provider.uuid
  const group = await api('/user-groups/' + fixture.groupUuid)
  const members = new Map(group.users.map(u => [u.uuid, {userUuid:u.uuid,mType:u.membershipType}]))
  members.delete(user('Charles').uuid) // Leave one researcher available for the Add member example.
  for (const [name,type] of [['Albert','Owner'],['Nikola','Owner'],['Isaac','Member']]) {
    members.set(user(name).uuid, {userUuid:user(name).uuid,mType:type+'UserGroupMembershipType'})
  }
  await api('/user-groups/'+fixture.groupUuid+'/memberships', {method:'PUT',json:[...members.values()]})
  const changes = {
    'dashboard-and-menu': value => ({...value,announcements:[{level:'InfoAnnouncementLevelType',content:'Working on your data management plan? Use the [DSW guide](https://guide.ds-wizard.org/) for step-by-step instructions.'}],customMenuLinks:[{title:'Research data guidance',url:'https://guide.ds-wizard.org/',icon:'fas fa-book-open',newWindow:true}]}),
    'login-screen': value => ({...value,loginInfo:'## Plan your research data\n\nCreate a data management plan, work with your collaborators and keep your plan up to date.',loginInfoSidebar:'New to DSW? Read the [getting started guide](https://guide.ds-wizard.org/).',announcements:[{level:'InfoAnnouncementLevelType',content:'This is the DSW demonstration instance. Please use example data only.'}]}),
    projects: value => ({...value,projectTagging:{...value.projectTagging,tags:['Biology','Chemistry','Geology']}})
  }
  for (const [section,change] of Object.entries(changes)) {
    const settings = await api('/settings/'+section)
    await api('/settings/'+section,{method:'PUT',json:{...settings,value:change(settings.value)}})
  }
  fs.mkdirSync(filesDir,{recursive:true})
  const files = [
    ['sample-register.csv','text/csv','sample_id,site,rock_type,collection_date\nGEO-001,Site A,Granite,2026-09-14\nGEO-002,Site A,Basalt,2026-09-14\nGEO-003,Site B,Limestone,2026-09-15\n'],
    ['sampling-protocol.txt','text/plain','Geology experiment: sampling protocol\n\nSynthetic example for the DSW guide.\n1. Record the site and sample identifier.\n2. Photograph the sample and note its rock type.\n3. Add the sample to the register.\n'],
    ['README.md','text/markdown','# Geology experiment files\n\nThese synthetic files demonstrate project attachments in DSW.\n\n- sample-register.csv: example sample metadata\n- sampling-protocol.txt: collection procedure\n\nNo real research data or personal information is included.\n']
  ]
  const existing = items(await api('/projects/'+fixture.secondProjectUuid+'/files?size=100'))
  for (const [name,type,content] of files) {
    fs.writeFileSync(filesDir+'/'+name,content)
    if (existing.some(f=>f.fileName===name)) continue
    const form = new FormData()
    form.append('file',new Blob([content],{type}),name)
    form.append('fileName',name)
    await api('/projects/'+fixture.secondProjectUuid+'/files/a105fda6-6970-4cd1-9536-0ec7b8448b6d',{method:'POST',body:form})
    console.log('Added synthetic file:',name)
  }
  const template = await api('/document-templates/'+fixture.templateUuid)
  const existingDocuments = items(await api('/projects/'+fixture.projectUuid+'/documents?size=100'))
  for (const [name,formatName] of [['My Experiment — working draft','HTML Document'],['My Experiment — review copy','PDF Document']]) {
    if (existingDocuments.some(d=>d.name===name)) continue
    const format = template.formats.find(f=>f.name===formatName)
    if (!format) throw Error('Missing format: '+formatName)
    await api('/documents',{method:'POST',json:{name,projectUuid:fixture.projectUuid,projectEventUuid:null,documentTemplateUuid:fixture.templateUuid,formatUuid:format.uuid,language:null}})
    console.log('Requested real document:',name)
  }
  fs.writeFileSync(fixturePath,JSON.stringify(fixture,null,2)+'\n')
  console.log('Example settings and group members saved; existing two projects retained')
}
main().catch(error=>{console.error(error.message);process.exitCode=1})
