function collapseGlobalSidebar(){cy.get('body').then($body=>{if($body.find('button').toArray().some(b=>b.textContent.trim()==='Collapse sidebar'))cy.contains('button','Collapse sidebar').click()})}
const config=Cypress.expose('capture'),f=config.fixture
let scene
const field=(id,text)=>cy.getField(id).clear().type(text)
function listAction(uuid){cy.openListingItemActions(uuid)}
function lastListAction(){cy.get('button[id^="listing-item-actions-"][id$="-trigger"]').last().click()}
const actions={
 'affiliations-example'(){},'support-example'(){},role(){field('name','Project Support');cy.get('#permission-projects-create').click()},
 'create-user'(){field('email','marie.curie@example.com');field('firstName','Marie');field('lastName','Curie')},
 'api-key'(){cy.contains('button','Create').click();field('name','Research reporting');field('expiresAt','2027-12-31');cy.contains('dialog h2','Create API Key').click()},
 'group-list'(){lastListAction()},'list-last'(){lastListAction()},
 'group-create'(){field('name','Geology Research Team');field('description','Researchers and data stewards preparing the geology data management plan.')},
 'group-member-add'(){cy.getCy('user-group-members_add-button').click();cy.get('#user-group-add-member').click();cy.focused().type('Marie');cy.get(`[data-cy="user-group-add-member_option_${f.secondResearcherUuid}"]`).click()},
 'km-migration-list'(){listAction(f.migrationEditorUuid)},
 'km-migration-update'(){listAction(f.migrationEditorUuid);cy.getCy('listing-item_action_update').click();cy.get('#form-targetPackageUuid').select(f.kmUuid)},
 'km-list'(){lastListAction()},'dt-list'(){lastListAction()},'km-editor-list'(){lastListAction()},'dt-editor-list'(){lastListAction()},
 'km-delete'(){cy.get('#km-detail-actions-trigger').click();cy.getCy('listing-item_action_delete').click();cy.get('#library-delete-confirm').should('be.visible')},
 'dt-delete'(){cy.get('#document-template-actions-trigger').click();cy.getCy('listing-item_action_delete').click();cy.get('#library-delete-confirm').should('be.visible')},
 'import-file'(){cy.contains('[role="tab"]',/file/i).click()},'import-registry'(){cy.contains('[role="tab"]',/registry/i).click()},
 'km-editor-create'(){field('name','Research Knowledge Model');field('id','example.research-model')},'dt-editor-create'(){field('name','Research Report');field('id','example.research-report')},
 'km-publish'(){cy.getCy('km-editor_publish').click()},'dt-publish'(){cy.getCy('dt-editor_publish').click()},
 'collapse-sidebar'(){collapseGlobalSidebar()},
 'dt-open-file'(){cy.contains('[data-cy=dt-editor_file-tree_file]','default.html.j2').click();cy.get('.cm-content').should('be.visible')},
 'dt-preview'(){cy.get('h1').should('exist')},
 'project-clone'(){listAction(f.projectUuid);cy.getCy('listing-item_action_clone').click()},
 'questionnaire-view'(){cy.get('#questionnaire-view-menu-trigger').click()},
 'questionnaire-search'(){cy.getCy('questionnaire-search').click();cy.get('.ui-workspace__aside input[type="search"],.ui-workspace__aside input[type="text"]').first().type('data')},
 'questionnaire-todos'(){cy.getCy('questionnaire_toolbar_todos').click()},'questionnaire-warnings'(){cy.getCy('questionnaire_toolbar_warnings').click()},
 'announcement'(){},'menu-link'(){},
 'compare'(){cy.get('#km-comparison-right').click();cy.focused().type('Common');cy.get('[data-cy="km-comparison-right_option_'+f.kmUuid+'"]').click();cy.get('select#km-comparison-right-version').should('be.visible').select('4a5747cb-dcfe-4e3c-9f58-313856b65a79');cy.getCy('km-comparison_compare').click();cy.get('dialog[open]').should('not.exist')},'km-warnings'(){cy.contains('button','Warnings').click()},'km-url-checker'(){cy.contains('button','URL Checker').click()},
 'users-import'(){const csv='email,firstName,lastName,affiliation\nmarie.curie@example.com,Marie,Curie,Example University\n';cy.getCy('file-upload_dropzone').selectFile({contents:Cypress.Buffer.from(csv),fileName:'research-team.csv',mimeType:'text/csv'},{action:'drag-drop'})},
 'about'(){cy.get('#c-user-menu-trigger').click();cy.contains('[role=menuitem]','About').click()},
 'report-issue'(){cy.get('#c-user-menu-trigger').click();cy.contains('[role=menuitem]',/Report issue/i).click()},
 'command-palette'(){cy.get('body').type('{ctrl}k')},
 'project-list'(){lastListAction()},
 'create-custom'(){cy.get('#project-create-starting-point input[value="knowledge-model"]').check({scrollBehavior:false});field('name','New Experiment');cy.getField('knowledgeModelPackageUuid').click();cy.focused().type('Common');cy.get(`[data-cy="form-knowledgeModelPackageUuid_option_${f.kmUuid}"]`).click()},
 'create-template'(){cy.get('#project-create-starting-point input[value="template"]').check({scrollBehavior:false});field('name','New Experiment');cy.getField('projectUuid').click();cy.focused().type('Geology');cy.get(`[data-cy="form-projectUuid_option_${f.secondProjectUuid}"]`).click()},
 'sharing'(){cy.getCy('project_detail_share-button').click()},

 'sharing-populated'(){
   cy.getCy('project_detail_share-button').click()
   cy.get('#projectShareUserGroups-trigger').click();cy.focused().type('Research Team')
   cy.get(`[data-cy="projectShareUserGroups_option_${f.groupUuid}"]`).click()
   for(const [name,uuid] of [['Nikola',f.stewardUuid],['Marie',f.secondResearcherUuid]]){
     cy.get('#projectShareUsers-trigger').click();cy.focused().clear().type(name)
     cy.get(`[data-cy="projectShareUsers_option_${uuid}"]`).click()
   }
   cy.get(`[data-cy="share-members_item_${f.stewardUuid}"] select`).select('Owner');cy.get(`[data-cy="share-members_item_${f.secondResearcherUuid}"] select`).select('Editor')
 },
 'openid-example'(){field('name','Example University');field('clientId','10000000-0000-4000-8000-000000000001');field('clientSecret','example-secret-not-a-real-credential');field('directoryId','20000000-0000-4000-8000-000000000002');cy.get('h1').then($h=>{let el=$h[0].parentElement;while(el){el.scrollTop=0;el=el.parentElement}})},
 'crop-section'(){cy.get('h1,h2').filter((_,el)=>el.textContent.trim()===scene.sectionTitle).first().closest('.ui-stack').invoke('attr','data-capture-section',scene.id)},
 'new-document'(){field('name','My Experiment — review copy');cy.getField('documentTemplateUuid').click();cy.focused().type('Questionnaire Report');cy.get(`[data-cy="form-documentTemplateUuid_option_${f.templateUuid}"]`).click();cy.contains('#form-formatUuid label','PDF Document').click()},
 'api-key-list'(){cy.contains('Research reporting (demo)').should('be.visible')},
 'preview-ready'(){cy.get('iframe',{timeout:60000}).should('be.visible').invoke('attr','src').then(url=>cy.task('capture:asset-ready',url,{log:false,timeout:65000}));cy.window().should(win=>{const frame=win.document.querySelector('iframe');expect(win.performance.getEntriesByName(frame.src).some(e=>e.responseEnd>0),'preview loaded').to.equal(true)})},
 'phases'(){cy.get('button[data-cy="phase-selection"]').click()},
 'history'(){cy.getCy('questionnaire-version-history').click();cy.get('.c-questionnaire-history__day').should('exist');cy.get('.c-questionnaire-history__toggle').first().click()},
 'comments'(){cy.getCy('questionnaire_toolbar_comments').click();cy.get('.ui-workspace__aside').should('not.contain.text','Loading')},
 'validation-existing'(){cy.getCy('questionnaire_toolbar_warnings').click();cy.contains('.ui-workspace__aside .c-questionnaire-panel__link','E-mail address').click();cy.get('[data-cy=questionnaire_question-title]').contains('E-mail address').closest('.c-questionnaire-question').first().invoke('attr','data-capture-validation','')},
 'unanswered'(){cy.getCy('questionnaire_toolbar_unanswered-questions').click()},
 'chapters'(){cy.get('.ui-tree[aria-label=Chapters] .ui-tree__toggle[aria-expanded=true]').first().click()},
 'profile-menu'(){cy.get('#c-user-menu-trigger').click()},
 'document-submit'(){cy.openListingItemActions(f.documentUuid);cy.getCy('listing-item_action_submit').click()},
 'migration-field'(){cy.get('#form-knowledgeModelPackageUuid').closest('.ui-field').invoke('attr','data-capture-migration','')},
 'question'(s){cy.get('body').then($body=>{const selector=s.collapseItems?'.c-questionnaire-item__toggle[aria-expanded="true"]':'.c-questionnaire-item__toggle[aria-expanded="false"]';const items=[...$body[0].querySelectorAll(selector)];items.forEach(el=>cy.wrap(el).click({scrollBehavior:false}))});cy.get(`.c-questionnaire-question[data-path$="${s.questionUuid}"]`).first().then($q=>{if(s.id==='question-multi-choice'){cy.wrap($q).children('.c-questionnaire-question__header').invoke('attr','data-capture-question',s.id);cy.wrap($q).find('.ui-choice').eq(5).invoke('attr','data-capture-choice','multi-choice')}else {cy.wrap($q).invoke('attr','data-capture-question',s.id);if(s.id==='question-list'){const titleId=$q.find('[data-cy=questionnaire_question-title]').attr('id');cy.get(`[aria-labelledby="${titleId}"] .c-questionnaire-items-end`).should('contain.text','Add').invoke('attr','data-capture-list-end','')}}})},
 'dt-format-steps'(){collapseGlobalSidebar();cy.get('#dt-settings-step-0-0').closest('.ui-field').invoke('attr','data-capture-start','format-steps');cy.get('[id^="dt-settings-step-option-0-0-"][id$="-value"]').last().closest('.ui-field').invoke('attr','data-capture-end','format-steps')}
}
function resolve(text){const v={project:f.projectUuid,km:f.kmUuid,template:f.templateUuid,editor:f.kmEditorUuid,dtEditor:f.templateEditorUuid,group:f.groupUuid,alex:f.researcherUuid,...f};return text?.replace(/\{([^}]+)\}/g,(_,k)=>{if(!v[k])throw Error('Missing fixture '+k);return v[k]})}
describe('DSW 5.0 guide screenshots',()=>{
 afterEach(function(){if(this.currentTest.state==='failed')cy.document({log:false}).then(d=>cy.task('capture:diagnose',{id:scene.id,headings:[...d.querySelectorAll('h1,h2,h3')].map(x=>x.textContent),inputs:[...d.querySelectorAll('input,select,textarea')].map(x=>({id:x.id,type:x.type})),buttons:[...d.querySelectorAll('button')].map(x=>({id:x.id,testId:x.dataset.cy,label:x.getAttribute('aria-label')||x.textContent?.trim().slice(0,80)}))},{log:false}))})
 for(const s of config.selected)it(s.id+': '+s.caption,()=>{
 scene=s;cy.viewport(1280,s.height||800);cy.intercept('GET','**?version=*&permissions=*',[]);cy.loginAs();
 cy.intercept({url:config.apiUrl+'/**',middleware:true},req=>{const p=new URL(req.url).pathname;const query=req.method==='POST'&&p==='/api/knowledge-models/preview';if(!['GET','HEAD','OPTIONS'].includes(req.method)&&!query)throw Error('Screenshot attempted a data change: '+req.method+' '+p)});
 if(s.signedOut)cy.visit(resolve(s.route),{onBeforeLoad(win){win.localStorage.removeItem('session');win.localStorage.setItem('ui-mode',config.theme)}});else cy.visitTenant(resolve(s.route));cy.get(resolve(s.ready)||'h1',{timeout:s.action==='preview-ready'?60000:12000}).first().should('exist');cy.get('.ui-async--loading:visible,.ui-page-loading:visible',{timeout:s.action==='preview-ready'?60000:12000}).should('not.exist');cy.get('h1').should('not.contain.text','Not Found').and('not.contain.text','Not Allowed');if(s.action){if(!actions[s.action])throw Error('Missing action '+s.action);actions[s.action](s)}
 cy.captureRegion(s,resolve(s.selector)||'.ui-page__inner',{padding:s.padding??10,through:resolve(s.through),keepFocus:s.keepFocus})
 })
})
