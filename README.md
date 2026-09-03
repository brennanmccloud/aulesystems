# Aule CRE Intelligence

Map-first commercial real estate acquisition intelligence for the St. Louis metro.

## Production interaction model

- Full-screen Leaflet map with multifamily acquisition markers
- Independently scrollable ranked deal board
- Filters for asset type, action tier, evidence grade, jurisdiction, units and score
- Auditable 30/35/20/15 score presentation with hard data-confidence and underwriting gates
- Scenario MAO ranges and explicit "not underwritable" states
- Property drawer with overview, underwriting, signals, ownership and evidence tabs
- Local saved list and CSV export

The browser loads the sanitized public payload from the DealFlow Supabase edge function. Public responses contain no phone numbers or email addresses.

## Deployment

The default branch is `main`. Production should be deployed from the root static files in this branch.

The production `app.js` is a small bootstrapper. The readable application source is bundled losslessly as a gzip payload under `app-payload/`; this keeps the GitHub API deployment atomic while preserving the exact tested browser code.
