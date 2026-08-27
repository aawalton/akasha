import { expect, test } from "bun:test"
import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import { soleRepoOf } from "../../page/page-types.ts"
import { readSubject, SUBJECTS, type Subject } from "./subjects.ts"
import { resolveRoots } from "../../repo/roots/roots"

const ROOT = new URL("../../", import.meta.url).pathname.replace(/\/$/, "")

const TYPE_OF: Readonly<Record<Exclude<Subject, "domains">, string>> = {
  personas: "persona",
  persons: "person",
  roles: "role",
  tasks: "task",
}

function repoNaming(slug: string): string {
  const roots = { ...resolveRoots(), instructions: ROOT }
  const type = registryOf(diskFileTree(roots)).find((one) => one.slug === slug)
  const repo = type === undefined ? null : soleRepoOf(type)
  if (repo === null) throw new Error(`no page type \`${slug}\` states where its files stand`)
  return repo
}

test("every subject reads from the repo its page type names, not the one asking", () => {
  for (const subject of SUBJECTS) {
    if (subject === "domains") continue
    const repo = repoNaming(TYPE_OF[subject])
    const roots = { ...resolveRoots(), instructions: ROOT } as unknown as Record<string, string>
    expect(readSubject(ROOT, subject).root).toBe(roots[repo]!)
  }
})

test("a subject filed outside the instructions repo still resolves", () => {
  // `persona` moved to akasha; a reader keyed on the instructions root found none and called it a
  // dead read, which is the failure this asserts against rather than the repo it happens to name.
  const found = readSubject(ROOT, "personas")
  expect(found.records.length).toBeGreaterThan(0)
  expect(found.root).toBe(
    (resolveRoots() as unknown as Record<string, string>)[repoNaming("persona")]!
  )
})

test("every record a subject hands back stands under the root it reports", () => {
  for (const subject of SUBJECTS) {
    const found = readSubject(ROOT, subject)
    for (const record of found.records) {
      expect(record.path.startsWith("/")).toBe(false)
      expect(Bun.file(`${found.root}/${record.path}`).size).toBeGreaterThan(0)
    }
  }
})
