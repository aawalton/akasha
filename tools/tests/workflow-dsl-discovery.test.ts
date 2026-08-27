import { afterAll, expect, test } from "bun:test"
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { codeRoot } from "../lib/code-root.ts"
import { discoverWorkflows } from "../lib/workflow-dsl/discovery.ts"
import type { DiscoveredWorkflow, WorkflowKind } from "../lib/workflow-dsl/types.ts"

const SCRATCH = "/var/tmp"
const PAGES = "pages/workflow-template"
const TYPES = "pages/page-type"

const PAGE_TYPE = [
  "---",
  "page-type-slug: page-type",
  'title: "Workflow template"',
  "extends-slug: page",
  `files: instructions:${PAGES}/**/*.md`,
  "body-shape-slug: empty",
  "slug: workflow-template",
  "plural-slug: workflow-templates",
  "domain-parent-slug: change-harness-cluster",
  "---",
  "",
].join("\n")

interface Planted {
  readonly slug: string
  readonly kind: string | null
  readonly declaration: string | null
}

const MAIN: readonly Planted[] = [
  {
    slug: "workflow-apps-by-name",
    kind: "cleanup",
    declaration: 'export default { name: "byName", kind: "apps", when: { event: "push" } }',
  },
  {
    slug: "workflow-bare",
    kind: "preparation",
    declaration: 'export default { name: "bare", when: { event: "manual" } }',
  },
  {
    slug: "workflow-many",
    kind: "checks",
    declaration: [
      "export const workflows = [",
      '  { name: "first", when: { event: "push" } },',
      '  { name: "second", when: { event: "push" } },',
      "]",
    ].join("\n"),
  },
]

const REFUSING: Planted = {
  slug: "workflow-refuses",
  kind: "foundation",
  declaration: 'throw new Error("this declaration refuses to load")',
}

const ODD_KIND: Planted = { slug: "workflow-sideways", kind: "sideways", declaration: null }

const NO_KIND: Planted = { slug: "workflow-unkinded", kind: null, declaration: null }

const EMPTY_DECLARATION: Planted = {
  slug: "workflow-says-nothing",
  kind: "apps",
  declaration: 'export const notes = "no workflow stands here"',
}

const FROM_THE_TREE: Planted = {
  slug: "workflow-from-the-tree",
  kind: "checks",
  declaration: [
    "export default (context) => ({",
    '  name: "fromTheTree",',
    '  when: { event: "push" },',
    '  steps: [{ name: context.codeRoot, image: "debian", commands: [] }],',
    "})",
  ].join("\n"),
}

const REFUSING_ROOT: Planted = {
  slug: "workflow-refuses-its-root",
  kind: "checks",
  declaration: [
    "export default (context) => {",
    "  throw new Error(`nothing stands at ${context.codeRoot}`)",
    "}",
  ].join("\n"),
}

const made: string[] = []

const plant = async (root: string, one: Planted): Promise<void> => {
  const states = one.kind === null ? "" : `kind: ${one.kind}\n`
  await writeFile(
    join(root, PAGES, `${one.slug}.md`),
    `---\npage-type-slug: workflow-template\nslug: ${one.slug}\n${states}---\n`
  )
  if (one.declaration === null) return
  await writeFile(join(root, PAGES, `${one.slug}.declaration.attachment.ts`), `${one.declaration}\n`)
}

const rootHolding = async (planted: readonly Planted[]): Promise<string> => {
  const root = await mkdtemp(join(SCRATCH, "workflow-template-pages-"))
  made.push(root)
  await mkdir(join(root, TYPES), { recursive: true })
  await mkdir(join(root, PAGES), { recursive: true })
  await writeFile(join(root, TYPES, "workflow-template.md"), PAGE_TYPE)
  for (const one of planted) await plant(root, one)
  return root
}

const discoverOver = async (
  planted: readonly Planted[],
  over: string = codeRoot()
): Promise<readonly DiscoveredWorkflow[]> =>
  discoverWorkflows(await rootHolding(planted), { codeRoot: over })

const discovered = await discoverOver(MAIN)

const named = (name: string): DiscoveredWorkflow => {
  const found = discovered.find((one) => one.name === name)
  if (found === undefined) throw new Error(`no workflow named ${name} was discovered`)
  return found
}

afterAll(async () => {
  for (const root of made) await rm(root, { recursive: true, force: true })
})

test("takes each workflow's kind from its page, whatever its file is named", () => {
  const kinds: ReadonlyArray<readonly [string, WorkflowKind]> = [
    ["byName", "cleanup"],
    ["bare", "preparation"],
    ["first", "checks"],
    ["second", "checks"],
  ]
  for (const [name, kind] of kinds) expect(named(name).kind).toBe(kind)
})

test("keeps what a declaration states as its kind apart from the kind its page gives", () => {
  expect(named("byName").declaredKind).toBe("apps")
  expect(named("bare").declaredKind).toBeUndefined()
})

test("admits every workflow a declaration exports, including ones inside an array", () => {
  expect(discovered.map((one) => one.name).sort()).toEqual(["bare", "byName", "first", "second"])
})

test("reports the declaration standing beside the page, as a path inside its repo", () => {
  expect(named("byName").sourcePath).toBe(
    `${PAGES}/workflow-apps-by-name.declaration.attachment.ts`
  )
  for (const one of discovered) expect(one.sourcePath.startsWith("/")).toBe(false)
})

test("reads the pages standing in the tree it is given, not the one this process runs from", async () => {
  const held = await discoverOver([MAIN[1] as Planted])
  expect(held.map((one) => one.name)).toEqual(["bare"])
})

test("refuses the whole discovery where one declaration will not load", async () => {
  await expect(discoverOver([...MAIN, REFUSING])).rejects.toThrow(
    /workflow-refuses\.declaration\.attachment\.ts` did not load/
  )
})

test("refuses a page stating a kind no workflow can carry", async () => {
  await expect(discoverOver([ODD_KIND])).rejects.toThrow(/`kind: sideways`, which is none of/)
})

test("refuses a page that states no kind at all, rather than guessing one", async () => {
  await expect(discoverOver([NO_KIND])).rejects.toThrow(/states no `kind`/)
})

test("refuses a page whose declaration states no workflow", async () => {
  await expect(discoverOver([EMPTY_DECLARATION])).rejects.toThrow(/exports no workflow/)
})

test("hands a declaration stated as a function the code root discovery was given", async () => {
  const held = await discoverOver([FROM_THE_TREE], "/a/code/root")
  expect(held.map((one) => one.name)).toEqual(["fromTheTree"])
  expect((held[0]?.steps ?? []).map((one) => one.name)).toEqual(["/a/code/root"])
})

test("refuses the whole discovery where a declaration refuses the root it is handed", async () => {
  await expect(discoverOver([REFUSING_ROOT], "/a/code/root")).rejects.toThrow(
    /refused the code root `\/a\/code\/root`/
  )
})
