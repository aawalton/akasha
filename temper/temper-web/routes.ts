import { index, layout, type RouteConfig, route } from "@react-router/dev/routes"

const PAGE_ROUTES: RouteConfig = [
  layout("routes/_app-layout.tsx", [
    route("home", "routes/home/home.route.code.tsx"),
    route("catalog", "routes/catalog/catalog.route.code.tsx"),
    route("cli-link", "routes/cli-link/cli-link.route.code.tsx"),
    route("completion", "routes/completion/completion.route.code.tsx"),
    route(
      "completion/u/:userId",
      "routes/temper-user-completion/temper-user-completion.route.code.tsx"
    ),
    route("import", "routes/data-import/data-import.route.code.tsx"),
    route("inventory", "routes/inventory/inventory.route.code.tsx"),
    route("keyboard-shortcuts", "routes/keyboard-shortcuts/keyboard-shortcuts.route.code.tsx"),
    route("methodology", "routes/methodology/methodology.route.code.tsx"),
    route("settings", "routes/settings/settings.route.code.tsx"),
    route("shopping", "routes/shopping/shopping.route.code.tsx"),
    route("watcher", "routes/watcher/watcher.route.code.tsx"),
    route(":pageTypeSlug/:pageHrefParam", "routes/page-detail/page-detail.route.code.tsx"),
    route(":pageTypeSlug", "routes/temper-page-listing/temper-page-listing.route.code.tsx"),
  ]),
]

const PUBLIC_ROUTES: RouteConfig = [
  index("routes/landing/landing.route.code.tsx"),
  route("sign-in", "routes/sign-in/sign-in.route.code.tsx"),
  route("sign-up", "routes/sign-up/sign-up.route.code.tsx"),
]

const API_ROUTES: RouteConfig = [
  route("api/errors", "routes/api-errors/api-errors.route.code.ts"),
  route("api/ask", "routes/api-ask/api-ask.route.code.ts"),
  route("api/page-types", "routes/api-page-types/api-page-types.route.code.ts"),
  route("api/pages/:pageTypeSlug", "routes/temper-api-pages/temper-api-pages.route.code.ts"),
  route("api/page-write", "routes/api-page-write/api-page-write.route.code.ts"),
  route("api/live-version", "routes/api-live-version/api-live-version.route.code.ts"),
  route("api/items", "routes/api-items/api-items.route.code.ts"),
  route("api/items/search", "routes/api-items-search/api-items-search.route.code.ts"),
  route(
    "api/shopping/optimize",
    "routes/api-shopping-optimize/api-shopping-optimize.route.code.ts"
  ),
  route("api/cli-link/mint", "routes/api-cli-link-mint/api-cli-link-mint.route.code.ts"),
  route("api/nav-icon/:idSuffix", "routes/temper-api-nav-icon/temper-api-nav-icon.route.code.ts"),
  route("api/watcher/version", "routes/api-watcher-version/api-watcher-version.route.code.ts"),
  route("api/watcher/download", "routes/api-watcher-download/api-watcher-download.route.code.ts"),
  route(
    "api/watcher/worker/version",
    "routes/api-watcher-worker-version/api-watcher-worker-version.route.code.ts"
  ),
  route(
    "api/watcher/worker/download",
    "routes/api-watcher-worker-download/api-watcher-worker-download.route.code.ts"
  ),
  route(
    "api/watcher/upsert-listings",
    "routes/api-watcher-upsert-listings/api-watcher-upsert-listings.route.code.ts"
  ),
  route(
    "api/watcher/upsert-mined-items",
    "routes/api-watcher-upsert-mined-items/api-watcher-upsert-mined-items.route.code.ts"
  ),
  route(
    "api/watcher/upsert-mined-quests",
    "routes/api-watcher-upsert-mined-quests/api-watcher-upsert-mined-quests.route.code.ts"
  ),
  route(
    "api/watcher/upsert-pricing-extract",
    "routes/api-watcher-upsert-pricing-extract/api-watcher-upsert-pricing-extract.route.code.ts"
  ),
  route(
    "api/watcher/upsert-pricing-snapshot",
    "routes/api-watcher-upsert-pricing-snapshot/api-watcher-upsert-pricing-snapshot.route.code.ts"
  ),
  route("api/addons/version", "routes/addon-bundle-version/addon-bundle-version.route.code.ts"),
  route("api/addons/download", "routes/addon-bundle/addon-bundle.route.code.ts"),
  route(
    "character-build/h/:hash",
    "routes/temper-character-build-hash/temper-character-build-hash.route.code.ts"
  ),
  route(
    "companion-build/h/:hash",
    "routes/temper-companion-build-hash/temper-companion-build-hash.route.code.ts"
  ),
]

const ACTION_ROUTES: RouteConfig = [
  route(
    "api/character-versions/:buildId",
    "routes/character-versions/character-versions.route.code.ts"
  ),
  route(
    "api/companion-versions/:buildId",
    "routes/companion-versions/companion-versions.route.code.ts"
  ),
]

export default [
  ...PAGE_ROUTES,
  ...PUBLIC_ROUTES,
  ...API_ROUTES,
  ...ACTION_ROUTES,
] satisfies RouteConfig
