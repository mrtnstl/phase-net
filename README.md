# phase-net

An offline-first project management tool that doubles as a professional network.

Available as a desktop and web app: create projects, phases and tasks, track time spent, costs and rates, then generate a PDF invoice with one click. Everything works fully offline.

Register to sync projects to the cloud and access them on other devices or the web client. Create a public tracking page for your clients, add colleagues to your network, and invite them to join your projects.Simple, clear project management + professional connections — all in one place.


### Monorepo architecture

The different distributions and packages are being kept as a small monorepo for convenience, with the layout below:

```text
desktop/                # The cross-platform, desktop version
├── build/
└── frontend/           # The UI is implemented via React application
docs/
packages/
└── ui/                 # Shared React UI components
services/               # Backend services
web/                    # The web version (React SPA)
```

### Build and run

Each version depends on the `packages` module, so it needs to be built before one of the specific distribution.

```bash
npm run build:ui    # there are scripts for linting and testing in the root package.json
```

|platform|lint|test   |build|dev|
|--------|----|-------|-----|---|
|browser|`npm run lint:web`|`npm run test:web`|`npm run build:web`|`npm run dev:web`|
|desktop|`npm run lint:desktop`|`npm run test:desktop`|`npm run build:desktop`|`npm run dev:desktop`|

> ### Important!
> The desktop versions `dev` and `build` scripts have the tag webkit2_41
>
>This is needed on Linux, where webkit2_41 is available instead of the wails default, webkit2_40