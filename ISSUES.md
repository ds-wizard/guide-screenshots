# DSW mediakit 5.0 — findings and remaining screenshots

## Verified content/environment issues

- **Common KM/template compatibility (resolved):** Common was 2.7.0. The supplied Horizon Europe 3.1.1, Science Europe 3.0.1 and maDMP 3.1.0 descriptors require Common/LS 2.8.1 or newer. The templates imported but needed the newer Common. Following approval, Common was updated to 2.8.3 and My Experiment migrated with named versions preserved. LS stays old by request
- **OS report cover:** the supplied Questionnaire Report 3.0.0 renders `WORKSPACE: Default Tenant` in DSW, although OS has no user-facing workspaces. In `questionnaire-report.zip`, `template/template.json`, file `src/default.html.j2`, lines 328–331 unconditionally print the Workspace label when `dc.workspace` exists. The equivalent label is in `src/for-word.html.j2:282–285`, `src/default.md.j2:205–206` and `src/default.tex.j2:420–421`. This is a template wording issue observed in a successful actual render; the attachment was not silently modified
- **Legacy gateway:** the separate `dsw_mediakit_gateway` service is crash-looping with `Can't locate revision identified by '37cb34f64ef7'`. Its current and previous image digest are identical (`312eea020e77fdec4916c493bfebd56f77ccc995006e3d4973b6baad4e8b04e8`); no gateway source/config/database repair was performed. This does not establish when the problem began. The four core 5.0 services and HTML document generation work
- **Registry translation catalogue:** no selectable 5.0 translation catalogue was available for the replacement-warning screenshot. The legitimate empty page is captured for review but not used in place of that guide example. No production Registry was upgraded

- **Registry pull compatibility:** the normal 5.0 pull could not resolve Common against the current production Registry. The official 2.8.3 bundle was downloaded through the legacy Registry API using the existing connection credential (never logged), then imported through the standard 5.0 bundle API. No production Registry changes or compatibility proxy aliases were added

## Screenshot coverage

- The three KM migration examples are now captured using the existing clean Chemistry editor. The temporary migration is cancelled afterward; the editor is verified against its original snapshot
- Other screenshot/diagram placeholders were removed at the user's request. Their feature explanations remain. The unsupported-format preview is a real download fallback in the current client; its text remains without a screenshot
- No visible screenshot TODOs remain. Document Context 19.0 and related contributor material still belong to the separate PR

## Capture problems resolved

- Old 4.x session/routes/selectors replaced by the current 5.0 contracts
- CSV user-import captures excluded: those routes belong to FW rather than this DSW client
- OpenID now has the requested clearly labelled demo provider on a reserved `.invalid` host, with dummy credentials and registration disabled. It is a screenshot example, not a working external sign-in connection
- Crops use real rendered bounds; dialogs retain their grey backdrop and shadow. A tall multi-choice list is shown as a focused example rather than an unreadably scaled full page
- Preview screenshots wait for the actual HTML asset and its browser load, not merely an iframe element
- History/comments wait for content before capture
- Temporary project settings are restored, including the distinction between null and empty language values; exact restoration was verified for both projects

No document was submitted, deletion previews were never confirmed by Cypress, and no third project was added. The obsolete Resource Pages template was deleted separately only after explicit approval and an empty dependency check.

## Refinement review — 3 November 2026

- Charles Darwin is inactive and therefore correctly absent from sharing suggestions. Kept that disabled-user example; after explicit approval, added one active Researcher, Marie Curie, for the second-researcher screenshot
- Added synthetic sample-register CSV, sampling protocol and README attachments, and generated real named HTML/PDF examples. Exactly two original projects retained
- A fixed Chrome window height clipped tall images even though the DOM crop fit the declared Cypress viewport. Corrected window sizing and added a saved-image aspect check. Re-captured the sharing modal and KM editor creation; all 118 mapped images now pass the dimension check
- News removed from the DSW guide by confirmed product scope. Personal Submission Settings image and redundant mail-upload screenshot removed; translation tables have inline action buttons rather than dropdown menus
- Five user FAQ entries selected from the supplied input and checked against the current guide/client. Document Context 19.0 remains assigned to the separate contributor PR
