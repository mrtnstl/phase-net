# Data Models

### Persistence Layer via IndexedDB [prototype, React SPA]:

**Responsibilities:**

- Long-term data storage

Despite IndexedDB being a NoSQL database, models are shaped in a way that they can fit into traditional SQL tables. That is because the short-term goal of the project is to create a desktop version with SQLite as the persistence layer, and later on a web service with PostgreSQL.

### Identity and Sync Rules:

- Project IDs are prefixed by origin to avoid collisions:
    - local project id: `lcl_<id>`
    - cloud project id: `cld_<id>`
- Primary key strategy: user-generated records use String IDs; local content records use `lcl_<id>`, and cloud project references use `cld_<id>`.
- `Currencies` remains a reference table with numeric IDs.

Behavioral sync workflows (project handoff and customer sync conflict resolution) are defined in `docs/architecture.temp.md`.

### Monetary Contract:

- All monetary values are stored as integers in currency smallest units (minor units).
- A project uses exactly one currency.
- User rates (`rate_hourly`, `rate_task`, `rate_project`) are stored in minor units.
- Project-level `rate_amount` is stored in minor units.
- Expense `amount` is stored in minor units of the expense currency.
- Invoice totals are computed from line items, rounding each line first, then summing.
- Hourly calculation uses task duration in seconds:

$$
labor\_minor = \text{round\_half\_up}\left(\frac{duration\_seconds \times rate\_hourly}{3600}\right)
$$

### Denormalization Policy:

- `Projects.customer_name` is a cached copy of `Customers.customer_name`.
- `Projects.current_phase` is a cached value derived from `Phases`.
- Source of truth remains normalized tables (`Customers`, `Phases`).
- On source updates, cached fields are updated in the same write transaction.
- If cached values drift, app rebuilds them on startup or via repair job.

### Deletion Policy:

- `Projects`, `Phases`, `Tasks`, and `Expenses` are hard deleted.
- `Customers` are soft deleted via `deleted_at`.
- Deleting a project hard-deletes its full local graph (`Phases`, `Tasks`, `Expenses`) in one transaction.
- For cloud-managed projects, local `ProjectCloudRefs` is removed only after cloud delete succeeds.

### Models:

```js
User(
    id String           // PK, derived from the user's name, current date and a random, 24-bit, hex-encoded character sequence
    first_name String
    last_name String
    bio String          // optional field
    currency_id Number  // FK
    rate_hourly Number     // minor units per hour
    rate_task Number       // minor units per task
    rate_project Number    // minor units per project
    created_at Date
    updated_at Date
)
```
```js
Currencies(
    id Number                   // PK
    smallest_unit String        // e.g. cent for euro
    main_unit String            // e.g. euro for euro
    main_unit_symbol String     // e.g. EUR
    multiplier Number           // e.g. 100
)
```
```js
Projects(
    id String                   // PK, local project id: lcl_<id>
    user_id String              // FK, nullable for visitor-owned local projects
    synced_at Date              // nullable, set on successful one-time handoff to cloud
    name String
    type String
    description String          // optional field
    state String(enum)          // active | closed | on_hold
    customer_id String          // FK, optional field
    customer_name String        // nullable, denormalized
    rate_type String(enum)      // nullable, project_based | hourly | task_based
    rate_amount Number          // nullable, minor units; if not set users default rate is used by the application
    current_phase String        // phase name denormalized
    created_at Date
    updated_at Date
)
```

```js
ProjectCloudRefs(
    cloud_project_id String     // PK, cld_<id>
    user_id String              // FK
    name String                 // general metadata cached locally
    type String                 // general metadata cached locally
    state String(enum)          // general metadata cached locally
    synced_at Date
    updated_at Date
)
```

`ProjectCloudRefs` stores only lightweight local metadata for cloud-managed projects. Detailed project data is not stored locally after handoff.

```js
Phases(
    id String           // PK, local phase id: lcl_<id>
    project_id String   // FK -> Projects.id
    name String
    is_done Boolean
    created_at Date
    updated_at Date
)
```
```js
Tasks(
    id String               // PK, local task id: lcl_<id>
    phase_id String         // FK -> Phases.id
    name String
    is_done Boolean
    description String      // optional field
    duration Number         // elapsed time in seconds
    created_at Date
    updated_at Date
)
```
```js
Customers(
    id String               // PK
    cloud_id String         // nullable, cld_<id>; set after customer is created/synced in cloud
    sync_status String(enum) // local | pending_upload | synced | pending_delete | conflict
    version Number          // cloud-authoritative; starts at 1, incremented only by cloud on accepted writes
    last_synced_version Number // nullable, last cloud version acknowledged by this client
    synced_at Date          // nullable, timestamp of last successful customer sync
    customer_name String    // company or individual name
    rep_name String         // optional field, if the customer is a company with a representative
    phone String
    email String
    website String          // optional
    created_at Date
    updated_at Date
    deleted_at Date         // soft deletions for auditability
)
```
```js
Expenses(
    id String               // PK, local expense id: lcl_<id>
    project_id String       // FK -> Projects.id
    name String
    currency_id Number      // FK
    amount Number           // minor units of the set currency
    created_at Date
    updated_at Date
)
```
### Entity Relationship Diagram(crow's foot notation):

![erd](erd.png)

