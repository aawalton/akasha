import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, realpathSync, rmSync } from "node:fs"
import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { withShaPinnedTree } from "../lib/main-pipeline-creator/sha-pinned-tree.ts"
import { codeRoot } from "../lib/code-root.ts"
import { discoverWorkflows } from "../lib/workflow-dsl/discovery.ts"
import { commitSha40 } from "../lib/workflow-dsl/ci-identifiers.ts"
import { ownRepoRoot } from "../../repo/roots/roots"

const SCRATCH = "/var/tmp"
const PAGES = "pages/workflow-template"
const GIT_CEILING_MS = 120_000

const PROBE = "workflow-pinning-probe"
const LATER = "workflow-pinning-later"

const declaring = (name: string, stepName: string): string =>
  [
    'import { step } from "../../tools/lib/workflow-dsl/step"',
    'import { workflow } from "../../tools/lib/workflow-dsl/workflow"',
    `export default workflow("${name}", {`,
    '  when: { event: "push" },',
    `  steps: [step({ name: "${stepName}", image: "debian:bookworm-slim", commands: ["true"] })],`,
    "})",
    "",
  ].join("\n")

const pageFor = (slug: string): string =>
  `---\npage-type-slug: workflow-template\nslug: ${slug}\nkind: checks\n---\n`

const held = mkdtempSync(join(SCRATCH, "workflow-pages-at-a-commit-"))
const repo = realpathSync(held)
const pins = join(repo, ".pins")

function ran(spelled: readonly string[], cwd: string): void {
  const proc = Bun.spawnSync([...spelled], { cwd, timeout: GIT_CEILING_MS })
  if ((proc.exitCode ?? 1) !== 0) {
    throw new Error(
      `\`${spelled.join(" ")}\` in ${cwd} failed: ${new TextDecoder().decode(proc.stderr ?? new Uint8Array())}`
    )
  }
}

function committed(message: string): string {
  ran(["git", "add", "-A"], repo)
  ran(["git", "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-q", "-m", message], repo)
  const proc = Bun.spawnSync(["git", "rev-parse", "HEAD"], { cwd: repo, timeout: GIT_CEILING_MS })
  return new TextDecoder().decode(proc.stdout ?? new Uint8Array()).trim()
}

async function layOut(): Promise<{ readonly before: string; readonly after: string }> {
  const archive = Bun.spawn(["git", "-C", ownRepoRoot(), "archive", "--format=tar", "HEAD"], {
    stdout: "pipe",
    stderr: "pipe",
  })
  const untar = Bun.spawn(["tar", "-x", "-C", repo], { stdin: archive.stdout, stderr: "pipe" })
  const [archived, untarred] = await Promise.all([archive.exited, untar.exited])
  if (archived !== 0 || untarred !== 0) {
    throw new Error(
      `the instructions tree at HEAD could not be laid out in ${repo} (archive ${String(archived)}, tar ${String(untarred)}), so there is no repository to pin a commit in`
    )
  }
  rmSync(join(repo, PAGES), { recursive: true, force: true })
  await mkdir(join(repo, PAGES), { recursive: true })
  ran(["git", "init", "-q", "."], repo)

  await writeFile(join(repo, PAGES, `${PROBE}.workflow-template.md`), pageFor(PROBE))
  await writeFile(
    join(repo, PAGES, `${PROBE}.workflow-template.declaration.attachment.ts`),
    declaring("pinning-probe", "as-it-stood")
  )
  const before = committed("the probe workflow as it stood")

  await writeFile(
    join(repo, PAGES, `${PROBE}.workflow-template.declaration.attachment.ts`),
    declaring("pinning-probe", "as-it-stands-now")
  )
  await writeFile(join(repo, PAGES, `${LATER}.workflow-template.md`), pageFor(LATER))
  await writeFile(
    join(repo, PAGES, `${LATER}.workflow-template.declaration.attachment.ts`),
    declaring("pinning-later", "arrived-afterwards")
  )
  const after = committed("the probe workflow changed and a second workflow added")

  return { before, after }
}

async function workflowsAt(sha: string): Promise<Readonly<Record<string, readonly string[]>>> {
  return withShaPinnedTree(
    { gitDir: repo, sha: commitSha40(sha), scratchRoot: pins },
    async (pinned) => {
      const found = await discoverWorkflows(pinned, { codeRoot: codeRoot() })
      return Object.fromEntries(
        found.map((one) => [one.name, (one.steps ?? []).map((step) => step.name)])
      )
    }
  )
}

const { before, after } = await layOut()
const stood = await workflowsAt(before)
const stands = await workflowsAt(after)

afterAll(() => {
  rmSync(repo, { recursive: true, force: true })
})

test("a commit's workflows are the ones that stood at it, not the ones standing now", () => {
  expect(Object.keys(stood).sort()).toEqual(["pinning-probe"])
  expect(Object.keys(stands).sort()).toEqual(["pinning-later", "pinning-probe"])
})

test("a later change to a workflow's declaration leaves the earlier commit's steps alone", () => {
  expect(stood["pinning-probe"]).toEqual(["as-it-stood"])
  expect(stands["pinning-probe"]).toEqual(["as-it-stands-now"])
})
