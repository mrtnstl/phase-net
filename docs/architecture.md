# Application Architecture

### Sync Architecture:

- Project sync uses a one-time handoff model from local to cloud.
- Customer sync uses bi-directional synchronization with cloud-authoritative versioning.
- Capability scope (local-only, cloud-only, hybrid) is defined in `docs/use-cases.md`.

### Project Handoff Lifecycle:

1. Local Active
	- Project exists in `Projects` with full data and `lcl_<id>`.
	- `synced_at` is `null`.

2. Handoff Pending
	- User triggers sync.
	- App creates a temporary handoff job with `local_project_id` and `started_at`.
	- Project remains fully local until cloud confirms success.

3. Handoff Succeeded
	- Cloud returns `cld_<id>`.
	- App writes/updates `ProjectCloudRefs` with `cloud_project_id` and cached metadata.
	- App hard-deletes the local project graph from `Projects`, `Phases`, `Tasks`, and `Expenses` for that local project.

4. Handoff Failed
	- Local project graph is not deleted.
	- Project remains editable locally.
	- User can retry sync safely.

5. Invariant
	- If a row exists in `ProjectCloudRefs` for a project, full local project data for that project must not exist in `Projects`, `Phases`, `Tasks`, or `Expenses`.

6. Recovery Rule
	- On app startup, unfinished handoff jobs are reconciled.
	- App confirms cloud result first, then either completes local deletion or returns to Local Active.

### Customer Sync Protocol:

- Customer data can be edited both locally and in cloud.
- Cloud is the authoritative source for `version`.
- Every customer record has a `version` number; cloud increments `version` on every accepted write.
- Local writes never increment `version`; local writes are marked `pending_upload` until accepted by cloud.
- Client sends `last_synced_version` with customer updates.
- If `last_synced_version` does not match current cloud `version`, sync status becomes `conflict`.
- Conflicts are resolved explicitly by user action (no automatic merge):
	- keep cloud: discard local pending payload and accept current cloud record
	- keep local: re-submit local payload and cloud creates a new highest `version`

