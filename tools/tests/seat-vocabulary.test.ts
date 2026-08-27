
import { describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { vocabularyOf } from "../lib/seat-vocabulary.ts"

function document(root: string, relPath: string, slug: string): void {
  mkdirSync(`${root}/${relPath}`.slice(0, `${root}/${relPath}`.lastIndexOf("/")), { recursive: true })
  writeFileSync(`${root}/${relPath}`, `---\nslug: ${slug}\n---\n\n# Definition\n\n- **A** — a.\n`)
}

function root(): string {
  return mkdtempSync(`${tmpdir()}/seat-vocabulary-`)
}

describe("what this repository declares", () => {
  test("a task is the stem of a document at any depth below `pages/task/`", () => {
    const at = root()
    try {
      document(at, "pages/task/verify-handback.task.md", "verify-handback")
      document(at, "pages/task/nested/change-instructions.task.md", "change-instructions")
      expect(vocabularyOf(at).task).toEqual(["change-instructions", "verify-handback"])
    } finally {
      rmSync(at, { recursive: true, force: true })
    }
  })

  test("a domain is every document declaring a slug, wherever it sits", () => {
    const at = root()
    try {
      document(at, "pages/page-type/role.page-type.md", "role")
      document(at, "pages/domain/test-file.domain.md", "test-file")
      expect(vocabularyOf(at).domain).toEqual(["role", "test-file"])
    } finally {
      rmSync(at, { recursive: true, force: true })
    }
  })

  test("the quarantine declares nothing, on any slot", () => {
    const at = root()
    try {
      document(at, "dirty/tasks/gone.md", "gone")
      const vocabulary = vocabularyOf(at)
      expect(vocabulary.task).toEqual([])
      expect(vocabulary.domain).toEqual([])
    } finally {
      rmSync(at, { recursive: true, force: true })
    }
  })
})
