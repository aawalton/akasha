import { afterAll, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { isInputError } from "../lib/exit.ts"
import { readStdin, readStdinOrFile } from "../lib/read-stdin-or-file.ts"

const SCRATCH = "/var/tmp"

const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

describe("readStdinOrFile", () => {
  test("hands back what stands in the file it was given", async () => {
    const dir = mkdtempSync(join(SCRATCH, "read-stdin-or-file-"))
    made.push(dir)
    const path = join(dir, "payload.json")
    writeFileSync(path, `{"k":"v"}`)
    expect(await readStdinOrFile(path)).toBe(`{"k":"v"}`)
  })

  test("a path standing nowhere is the caller's mistake, and says which path", async () => {
    const path = join(SCRATCH, `absent-${Math.random()}`)
    const thrown = await readStdinOrFile(path).then(
      () => null,
      (err: unknown) => err
    )
    expect(thrown).not.toBeNull()
    expect(isInputError(thrown)).toBe(true)
    expect((thrown as Error).message).toContain(path)
  })
})

describe("readStdin", () => {
  test("is the one route stdin is read through", () => {
    expect(typeof readStdin).toBe("function")
  })
})
