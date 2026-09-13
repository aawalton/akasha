import { afterAll, expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { DATA, OK } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import { put } from "akasha/testing-system/modules/putting/putting.module.code.ts"
import { REFUSES_CODE } from "akasha/testing-system/test-fixtures/minting/minting.test-fixture.code.ts"
import {
  checking,
  givenIn,
  landedFrom,
  PROPOSED,
  REFUSES_TAKING,
  repoWith,
  scratch,
  wrote,
  wroteWith,
} from "akasha/testing-system/test-fixtures/repo-seeding/repo-seeding.test-fixture.code.ts"

afterAll(scratch.sweep)

test("a check is handed a removal, and can refuse it", async () => {
  const root = repoWith({ "akasha/one.ts": "committed\n", "akasha/two.ts": "committed\n" })
  checking(root, "refuses-taking", REFUSES_TAKING)
  const said = await wroteWith(root, ["--remove", "akasha/two.ts", "--message", "held"])
  expect(said.code).toBe(DATA)
  expect(said.refusals.join("\n")).toContain("akasha/two.ts — a check judged this going away")
  expect(existsSync(join(root, "akasha/two.ts"))).toBe(true)
})

test("breaking the glass runs no check", async () => {
  const root = repoWith()
  checking(root, "refuses", REFUSES_CODE)
  const said = await wrote(root, [
    "--message",
    "held",
    "--break-the-glass",
    "the checks are themselves broken",
  ])
  expect(said.code).toBe(OK)
  expect(readFileSync(join(root, "akasha/two.ts"), "utf8")).toBe(PROPOSED)
})

test("a body that lands is recorded as read, so writing over it again is not refused", async () => {
  const root = repoWith()
  expect((await wrote(root, ["--message", "held"])).code).toBe(OK)
  const again = put(root, "again.txt", "written twice\n")
  const said = await landedFrom(
    ["--file-path", "akasha/two.ts", "--content-file", again],
    givenIn(root)
  )
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(OK)
})
