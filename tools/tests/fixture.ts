import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname } from "node:path"
import { attachmentFileOf, readAttachment, writeAttachment } from "../../page/attachment-file.ts"
import { blobId } from "../../repo/git/git.ts"
import { READINGS } from "../lib/read-record.ts"
import { REFUSAL_DIR } from "../../refusal/refusal.ts"
import { canonicalize } from "../../repo/path/path.ts"
import { seatAbove } from "../lib/subagent.ts"
import { AKASHA, REPOS, rootEnvName } from "../../repo/roots/roots.ts"

export function documentBody(frontmatter: string, lines = 40): string {
  const body = Array.from({ length: lines }, (_, i) => `body line ${i + 1}`).join("\n")
  return `---\n${frontmatter}\n---\n\n${body}\n`
}

export interface Fixture {
  readonly root: string
  readonly memory: string
  readonly akasha: string
  readonly home: string
  put: (relPath: string, body: string) => void
  putMemory: (relPath: string, body: string) => void
  document: (relPath: string, frontmatter: string, lines?: number) => void
  memoryDocument: (relPath: string, frontmatter: string, lines?: number) => void
  installRecorder: (agent?: string) => void
  forgetRecord: (agent?: string) => void
  recordAt: (agent?: string) => string
  plantReading: (agent: string, absolute: string) => void
  readIt: (agent: string, relPath: string) => void
  sweepOnDispose: (path: string) => void
  dispose: () => void
}

const LIVE = dirname(dirname(import.meta.dir))

const SCRATCH = "/var/tmp"

const REPO_PAGES = "pages/repo"

const PAGE_SUFFIX = ".md"

const EXTENSION = "json"

const UNCOMMITTED = true

interface Held {
  readonly oid: string
  readonly seenAt: number
}

export function installRefusals(root: string): void {
  cpSync(`${LIVE}/${REFUSAL_DIR}`, `${root}/${REFUSAL_DIR}`, { recursive: true })
}

export function installRepos(root: string): void {
  cpSync(`${LIVE}/${REPO_PAGES}`, `${root}/${REPO_PAGES}`, { recursive: true })
}

export function installPages(root: string, relPaths: readonly string[]): void {
  for (const relPath of relPaths) {
    mkdirSync(dirname(`${root}/${relPath}`), { recursive: true })
    cpSync(`${LIVE}/${relPath}`, `${root}/${relPath}`)
  }
}

export function fixture(): Fixture {
  const root = mkdtempSync(`${SCRATCH}/govtest-root-`)
  installRefusals(root)
  Bun.spawnSync(["git", "init", "-q", "-b", "main", "."], { cwd: root })
  Bun.spawnSync(["git", "config", "user.email", "fixture@example.com"], { cwd: root })
  Bun.spawnSync(["git", "config", "user.name", "fixture"], { cwd: root })
  const memory = root
  const akasha = root
  const planted: string[] = []
  const home = mkdtempSync(`${SCRATCH}/govtest-home-`)
  const priorHome = process.env.HOME
  const priorRoot = process.env.AKASHA_ROOT
  process.env.HOME = home
  process.env.AKASHA_ROOT = root
  const elsewhere = mkdtempSync(`${SCRATCH}/govtest-elsewhere-`)
  const priorElsewhere = new Map<string, string | undefined>()
  for (const repo of REPOS) {
    if (repo === AKASHA) continue
    const named = rootEnvName(repo)
    priorElsewhere.set(named, process.env[named])
    mkdirSync(`${elsewhere}/${repo}`, { recursive: true })
    process.env[named] = `${elsewhere}/${repo}`
  }

  const putInto =
    (into: string) =>
    (relPath: string, body: string): void => {
      mkdirSync(dirname(`${into}/${relPath}`), { recursive: true })
      writeFileSync(`${into}/${relPath}`, body, "utf8")
    }
  const put = putInto(root)
  const putMemory = putInto(memory)
  const putAkasha = putInto(akasha)
  const kindOf = (agent: string): string => (seatAbove(agent) === null ? "seat" : "subagent")
  const placeOf = (agent: string): string => `agent/${kindOf(agent)}/${agent}.${kindOf(agent)}.md`
  const pageOf = (agent: string): string => `${akasha}/${placeOf(agent)}`
  const installRecorder = (agent = "agent-one"): void => {
    const above = seatAbove(agent)
    if (above !== null) installRecorder(above)
    if (existsSync(pageOf(agent))) return
    const kind = kindOf(agent)
    const named = kind === "seat" ? `id: ${agent}` : `subagent-id: ${agent}`
    planted.push(pageOf(agent))
    putAkasha(placeOf(agent), `---\npage-type-slug: ${kind}\n${named}\ntitle: "${agent}"\n---\n`)
  }
  const forgetRecord = (agent = "agent-one"): void => {
    const page = pageOf(agent)
    rmSync(attachmentFileOf(page, READINGS, EXTENSION, UNCOMMITTED), { force: true })
    rmSync(page, { force: true })
  }
  const plantReading = (agent: string, absolute: string): void => {
    installRecorder(agent)
    const page = pageOf(agent)
    const held = readAttachment(page, READINGS, EXTENSION, UNCOMMITTED)
    const records = (held === null ? {} : JSON.parse(held)) as Record<string, Held | undefined>
    records[canonicalize(absolute)] = {
      oid: blobId(readFileSync(absolute)),
      seenAt: Date.now(),
    }
    writeAttachment(page, READINGS, EXTENSION, JSON.stringify(records), UNCOMMITTED)
  }
  return {
    root,
    memory,
    akasha,
    home,
    put,
    putMemory,
    sweepOnDispose: (path: string) => {
      planted.push(path)
    },
    installRecorder,
    forgetRecord,
    recordAt: (agent = "agent-one") =>
      attachmentFileOf(pageOf(agent), READINGS, EXTENSION, UNCOMMITTED),
    document: (relPath, frontmatter, lines = 40) => put(relPath, documentBody(frontmatter, lines)),
    memoryDocument: (relPath, frontmatter, lines = 40) =>
      putMemory(relPath, documentBody(frontmatter, lines)),
    plantReading,
    readIt: (agent, relPath) => plantReading(agent, `${root}/${relPath}`),
    dispose: () => {
      if (priorHome !== undefined) process.env.HOME = priorHome
      if (priorRoot === undefined) delete process.env.AKASHA_ROOT
      else process.env.AKASHA_ROOT = priorRoot
      for (const [named, was] of priorElsewhere) {
        if (was === undefined) delete process.env[named]
        else process.env[named] = was
      }
      for (const page of planted) {
        const dir = dirname(page)
        const stem = `${page.slice(dir.length + 1, -PAGE_SUFFIX.length)}.`
        for (const name of readdirSync(dir)) {
          if (name.startsWith(stem)) rmSync(`${dir}/${name}`, { force: true })
        }
        rmSync(page, { force: true })
      }
      rmSync(root, { recursive: true, force: true })
      rmSync(home, { recursive: true, force: true })
      rmSync(elsewhere, { recursive: true, force: true })
    },
  }
}

export const CLAIMED = "subject-path"

export function fileKeyDeclared(at: Fixture): void {
  at.document(
    "pages/page-property-definition/domain-subject-path.md",
    `slug: domain-subject-path\nkey: ${CLAIMED}\ntype: file`,
    6
  )
}

export function personaPages(at: Fixture): void {
  fileKeyDeclared(at)
  at.document(
    "pages/domain/persona.md",
    `slug: persona\nrequired-reading-slugs:\n  - agent-harness\n${CLAIMED}: pages/persona/aria.persona.md`
  )
  at.document(
    "pages/domain/agent-harness.domain.md",
    "slug: agent-harness\nrequired-reading-slugs:\n  - global",
    30
  )
  at.document("pages/domain/global.domain.md", "slug: global\ndomain-parent-slug: global", 20)
}
