const credentials=require('../cypress.env.js')
const base='https://mediakit.ds-wizard.org/api'
let token
async function login(){const r=await fetch(base+'/tokens',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:credentials.adminUsername,password:credentials.adminPassword}),signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error('Administrator sign-in HTTP '+r.status);const data=await r.json();if(data.type!=='UserToken')throw Error('Sign-in needs further interaction');token=data.token;return{token:data.token,expiresAt:data.expiresAt}}
async function api(path, options={}){if(!token)await login();const headers={authorization:'Bearer '+token,...options.headers};if(options.json){headers['content-type']='application/json';options.body=JSON.stringify(options.json);delete options.json}const r=await fetch(base+path,{...options,headers,signal:AbortSignal.timeout(45000)});const text=await r.text();if(!r.ok)throw Error(`${options.method||'GET'} ${path}: HTTP ${r.status}: ${text.slice(0,450)}`);return text?JSON.parse(text):null}
const items=d=>Array.isArray(d)?d:Object.values(d?._embedded||{}).find(Array.isArray)||[]
module.exports={api,login,items,base}
