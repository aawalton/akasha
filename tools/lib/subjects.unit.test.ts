import { expect, test } from "bun:test"
import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import { soleRepoOf } from "../../page/page-types.ts"
import { readSubject, SUBJECTS, type Subject } from "./subjects.ts"
import { resolveRoots, rootFor } from "../../repo/roots/roots.ts"

const ROOT = new URL("../../", import.meta.url).pathname.replace(/\/$/, "")

const TYPE_OF: Readonly<Record<Exclude<Subject, "domains">, string>> = {
  personas: "persona",
  persons: "person",
  roles: "role",
}

function repoNaming(slug: string): string {
  const roots = { ...resolveRoots(), akasha: ROOT }
  const type = registryOf(diskFileTree(roots)).find((one) => one.slug === slug)
  const repo = type === undefined ? null : soleRepoOf(type)
  if (repo === null) throw new Error(`no page type \`${slug}\` states where its files stand`)
  return repo
}

test("every subject reads from the repo its page type names, not the one asking", () => {
  for (const subject of SUBJECTS) {
    if (subject === "domains") continue
    const repo = repoNaming(TYPE_OF[subject])
    const roots = { ...resolveRoots(), akasha: ROOT }
    expect(readSubject(ROOT, subject).root).toBe(rootFor(roots, repo))
  }
})

test("a subject filed outside the instructions repo still resolves", () => {
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
