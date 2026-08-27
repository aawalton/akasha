import type { Repo } from "../../../../../page/document/types.ts"
import { parseFrontmatter } from "../../../../../page/frontmatter.ts"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { repoFiles } from "../lib/repo-files.ts"
import type { IosAppAttrs, IosAppSources } from "./types.ts"

export const IOS_APP_PAGE_DIR = "pages/ios-app"

export const IOS_APP_PAGE_REPO: Repo = "instructions"

export const IOS_APP_SUBJECT_REPO: Repo = "code"

export const NATIVE_SHELL_KEY = "native-shell-repo-path"

export const CAPACITOR_CONFIG_KEY = "capacitor-config-repo-path"

export const SHARED_WIDGET_KEY = "shared-widget-repo-path"

export const OWN_WIDGET_KEY = "own-widget-repo-path"

export const SEAM_SCRIPT_KEY = "seam-script"

export const SIM_BUILD_SCRIPT_KEY = "sim-build-script"

export const ENTITLEMENTS_KEY = "entitlements-repo-path"

export const ICON_KEY = "icon-repo-path"

export const WWW_STAGE_SCRIPT_KEY = "www-stage-script"

export const WEB_DIR_KEY = "web-dir-repo-path"

export const SPA_SOURCE_KEY = "spa-source-repo-path"

export type PageTree = {
  readonly files: readonly string[]
  readonly read: (path: string) => string | null
}

const isPage = (rel: string): boolean =>
  rel.startsWith(`${IOS_APP_PAGE_DIR}/`) && rel.endsWith(".md")

const textOf = (value: unknown): string | null => (typeof value === "string" ? value : null)

type PageFields = {
  readonly rel: string
  readonly fields: ReadonlyMap<string, unknown>
}

const eachPage = (tree: PageTree): readonly PageFields[] => {
  const found: PageFields[] = []
  for (const rel of tree.files) {
    if (!isPage(rel)) continue
    const body = tree.read(rel)
    if (body === null) {
      throw new Error(`graph: ${rel} stands as an iOS app and the snapshot carries no body`)
    }
    const front = parseFrontmatter(body)
    if (front.error !== null) {
      throw new Error(`graph: ${rel} stands as an iOS app and its frontmatter ${front.error}`)
    }
    found.push({ rel, fields: front.fields })
  }
  return found
}

const nameOf = (page: PageFields): string => {
  const name = textOf(page.fields.get("slug"))
  if (name === null) {
    throw new Error(`graph: ${page.rel} stands as an iOS app and names no slug`)
  }
  return name
}

const statedPath = (page: PageFields, key: string): string | null => {
  const held = textOf(page.fields.get(key))
  return held === null || held.trim() === "" ? null : held.trim()
}

export const readIosAppPages = (tree: PageTree): readonly IosAppAttrs[] => {
  const apps: IosAppAttrs[] = []
  const seen = new Set<string>()
  for (const page of eachPage(tree)) {
    const name = nameOf(page)
    if (seen.has(name)) {
      throw new Error(`graph: two iOS app pages both call themselves ${name}`)
    }
    seen.add(name)
    apps.push({ name })
  }
  apps.sort((a, b) => a.name.localeCompare(b.name))
  return apps
}

export const readIosAppSources = (tree: PageTree): readonly IosAppSources[] => {
  const sources = eachPage(tree).map(
    (page): IosAppSources => ({
      name: nameOf(page),
      nativeShellRepoPath: statedPath(page, NATIVE_SHELL_KEY),
      capacitorConfigRepoPath: statedPath(page, CAPACITOR_CONFIG_KEY),
      sharedWidgetRepoPath: statedPath(page, SHARED_WIDGET_KEY),
      ownWidgetRepoPath: statedPath(page, OWN_WIDGET_KEY),
      seamScript: statedPath(page, SEAM_SCRIPT_KEY),
      simBuildScript: statedPath(page, SIM_BUILD_SCRIPT_KEY),
      entitlementsRepoPath: statedPath(page, ENTITLEMENTS_KEY),
      iconRepoPath: statedPath(page, ICON_KEY),
      wwwStageScript: statedPath(page, WWW_STAGE_SCRIPT_KEY),
      webDirRepoPath: statedPath(page, WEB_DIR_KEY),
      spaSourceRepoPath: statedPath(page, SPA_SOURCE_KEY),
    })
  )
  return [...sources].sort((a, b) => a.name.localeCompare(b.name))
}

const pageTreeOf = (ctx: BuildContext, repo: Repo): PageTree => ({
  files: repoFiles(ctx, repo),
  read: (path) => readRepoFile(ctx, repo, path),
})

export const discoverIosApps = (ctx: BuildContext, repo: Repo): readonly IosAppAttrs[] =>
  readIosAppPages(pageTreeOf(ctx, repo))

export const discoverIosAppSources = (ctx: BuildContext, repo: Repo): readonly IosAppSources[] =>
  readIosAppSources(pageTreeOf(ctx, repo))
