import { index, layout, type RouteConfig, route } from "@react-router/dev/routes"

const PAGE_ROUTES: RouteConfig = [
  layout("routes/_app-layout.tsx", [
    route("home", "routes/home.tsx"),
    route("catalog", "routes/catalog.tsx"),
    route("cli-link", "routes/cli-link.tsx"),
    route("completion", "routes/completion.tsx"),
    route("completion/u/:userId", "routes/completion.u.$userId.tsx"),
    route("import", "routes/import.tsx"),
    route("inventory", "routes/inventory.tsx"),
    route("keyboard-shortcuts", "routes/keyboard-shortcuts.tsx"),
    route("methodology", "routes/methodology.tsx"),
    route("settings", "routes/settings.tsx"),
    route("shopping", "routes/shopping.tsx"),
    route("watcher", "routes/watcher.tsx"),
    route(":pageTypeSlug/:pageHrefParam", "routes/$pageTypeSlug.$pageHrefParam.tsx"),
    route(":pageTypeSlug", "routes/$pageTypeSlug.tsx"),
  ]),
]

const PUBLIC_ROUTES: RouteConfig = [
  index("routes/landing.tsx"),
  route("sign-in", "routes/sign-in.tsx"),
  route("sign-up", "routes/sign-up.tsx"),
]

const API_ROUTES: RouteConfig = [
  route("api/errors", "routes/api.errors.ts"),
  route("api/ask", "routes/api.ask.ts"),
  route("api/page-types", "routes/api.page-types.ts"),
  route("api/pages/:pageTypeSlug", "routes/api.pages.$pageTypeSlug.ts"),
  route("api/page-write", "routes/api.page-write.ts"),
  route("api/live-version", "routes/api.live-version.tsx"),
  route("api/items", "routes/api.items.tsx"),
  route("api/items/search", "routes/api.items.search.tsx"),
  route("api/shopping/optimize", "routes/api.shopping.optimize.tsx"),
  route("api/cli-link/mint", "routes/api.cli-link.mint.tsx"),
  route("api/nav-icon/:idSuffix", "routes/api.nav-icon.$idSuffix.tsx"),
  route("api/watcher/version", "routes/api.watcher.version.tsx"),
  route("api/watcher/download", "routes/api.watcher.download.tsx"),
  route("api/watcher/worker/version", "routes/api.watcher.worker.version.tsx"),
  route("api/watcher/worker/download", "routes/api.watcher.worker.download.tsx"),
  route("api/watcher/upsert-listings", "routes/api.watcher.upsert-listings.tsx"),
  route("api/watcher/upsert-mined-items", "routes/api.watcher.upsert-mined-items.tsx"),
  route("api/watcher/upsert-mined-quests", "routes/api.watcher.upsert-mined-quests.tsx"),
  route("api/watcher/upsert-pricing-extract", "routes/api.watcher.upsert-pricing-extract.tsx"),
  route("api/watcher/upsert-pricing-snapshot", "routes/api.watcher.upsert-pricing-snapshot.tsx"),
  route("api/addons/version", "routes/api.addons.version.tsx"),
  route("api/addons/download", "routes/api.addons.download.tsx"),
  route("character-build/h/:hash", "routes/character.h.$hash.tsx"),
  route("companion-build/h/:hash", "routes/companion.h.$hash.tsx"),
]

const ACTION_ROUTES: RouteConfig = [
  route("api/character-versions/:buildId", "routes/api.character-versions.$buildId.ts"),
  route("api/companion-versions/:buildId", "routes/api.companion-versions.$buildId.ts"),
]

export default [
  ...PAGE_ROUTES,
  ...PUBLIC_ROUTES,
  ...API_ROUTES,
  ...ACTION_ROUTES,
] satisfies RouteConfig
