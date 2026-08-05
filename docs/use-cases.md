# Use Cases

List of all the basic use cases.

### Roles:

* visitor: person without a registration

* user: person with registration



|who|what|why|offline|online|
|---|----|---|----------|------|
|visitors|can create projects|so their tasks can be organized|x|x|
||can create phases under projects|so they can granularly track project timelines|x|x|
||can create tasks under phases|so they can organize individual blocks of work|x|x|
||can track the time they spent on tasks| so they can see how much time a project and individual tasks took|x|x|
||can set up their preferred currency and hourly, task- or project-based rate|so they can get an accurate bill when the project concludes|x|x|
||can export project bills in .pdf format||x|x|
||can see their projects in one place|so they can easily navigate between them|x|x|
||can see project specific statistics||x|x|
||can register|to access online functionality|x|-|
|users|can keep using local projects without login after registration|so offline workflow remains available|x|-|
||can edit projects|so project details can be updated as requirements change|x|x|
||can edit phases|so timelines can be adjusted during execution|x|x|
||can edit tasks|so work items stay accurate and up to date|x|x|
||can delete projects|so abandoned or invalid work can be removed|x|x|
||can delete phases|so outdated milestones can be removed|x|x|
||can delete tasks|so invalid or duplicate work items can be removed|x|x|
||can sync projects to cloud|so they can access them on other devices or the web client|x|-|
||can create cloud projects directly|so work can start in cloud mode from the beginning|-|x|
||can sync a local project to cloud and receive a cloud project id|so local and cloud identities do not collide|x|x|
||can keep only project id and general metadata locally after sync|so full synced project data is available after login|x|x|
||can sync customers between local and cloud|so customer data stays consistent across devices|x|x|
||can edit customers offline and sync later|so work is not blocked by connectivity|x|x|
||can resolve customer conflicts when versions diverge|so no customer changes are silently overwritten|x|x|
||can resolve customer conflict by keeping cloud version|so canonical cloud data can be preserved|x|x|
||can resolve customer conflict by keeping local version|so local intended changes can be applied as the next cloud version|x|x|
||can reset password|so account access can be restored securely|-|x|
||can delete account|so user data can be permanently removed from the service|-|x|
||can create a public tracking page for project phase|so their customer can be informed and up to date on the project state|-|x|
<!--||can add others to their colleagues (friends) list|so they can build their network|-|x|
||can invite colleagues to their projects as participants||-|x|-->

### Capability Mode Contract:

- `local-only`: action is fully handled on device, no cloud write required.
- `cloud-only`: action requires authenticated cloud access.
- `hybrid`: action can be performed locally and later synchronized to cloud.
- In the table above:
	- `offline: x` and `online: -` means `local-only`.
	- `offline: -` and `online: x` means `cloud-only`.
	- `offline: x` and `online: x` means `hybrid`.
