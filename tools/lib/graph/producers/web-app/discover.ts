import type { Repo } from "../../../../../page/document/types.ts"
import { REPOS } from "../../../../../repo/roots/roots"
import { parseFrontmatter } from "../../../../../page/frontmatter.ts"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { repoFiles } from "../lib/repo-files.ts"
import type { WebApp } from "./types.ts"

export const WEB_APP_PAGE_DIR = "pages/web-app"

export const WEB_APP_PAGE_REPO: Repo = "instructions"

export const WEB_APP_REPO_KEY = "repo"

export type PageTree = {
  readonly files: readonly string[]
  readonly read: (path: string) => string | null
}

const isPage = (rel: string): boolean =>
  rel.startsWith(`${WEB_APP_PAGE_DIR}/`) && rel.endsWith(".md")

const textOf = (value: unknown): string | null => (typeof value === "string" ? value : null)

const isRepo = (value: string): value is Repo => (REPOS as readonly string[]).includes(value)

const readPage = (rel: string, body: string): WebApp => {
  const front = parseFrontmatter(body)
  if (front.error !== null) {
    throw new Error(`graph: ${rel} stands as a web app and its frontmatter ${front.error}`)
  }
  const name = textOf(front.fields.get("slug"))
  if (name === null) {
    throw new Error(`graph: ${rel} stands as a web app and names no slug`)
  }
  const repo = textOf(front.fields.get(WEB_APP_REPO_KEY))
  if (repo === null) {
    throw new Error(`graph: ${rel} stands as a web app and names no repository the app stands in`)
  }
  if (!isRepo(repo)) {
    throw new Error(`graph: ${rel} stands as a web app in \`${repo}\`, which names no repository`)
  }
  return { name, repo }
}

export const readWebAppPages = (tree: PageTree): readonly WebApp[] => {
  const apps: WebApp[] = []
  const seen = new Set<string>()
  for (const rel of tree.files) {
    if (!isPage(rel)) continue
    const body = tree.read(rel)
    if (body === null) {
      throw new Error(`graph: ${rel} stands as a web app and the snapshot carries no body`)
    }
    const app = readPage(rel, body)
    if (seen.has(app.name)) {
      throw new Error(`graph: two web app pages both call themselves ${app.name}`)
    }
    seen.add(app.name)
    apps.push(app)
  }
  apps.sort((a, b) => a.name.localeCompare(b.name))
  return apps
}

export const discoverWebApps = (ctx: BuildContext, repo: Repo): readonly WebApp[] =>
  readWebAppPages({
    files: repoFiles(ctx, repo),
    read: (path) => readRepoFile(ctx, repo, path),
  })
