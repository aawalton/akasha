import { expect, test } from "bun:test"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  answering,
  OPERATIONAL,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Laying } from "akasha/temper/community-addons/modules/addon-download/addon-download.module.code.ts"
import { layEach } from "akasha/temper/community-addons/modules/addon-download/addon-download.module.code.ts"

const AT = "/nowhere/addons"

const STAGING = "/scratch/extract"

const DIRS = ["Alpha", "Beta"]

const CLEARED_ALPHA = `Alpha was cleared from ${AT}`

const LAID_ALPHA = `Alpha was laid into ${AT}`

const CLEARED_BETA = `Beta was cleared from ${AT}`

const LAID_BETA = `Beta was laid into ${AT}`

function laying(upTo: number): Laying {
  let reached = 0
  const step = (what: string): Promise<void> => {
    reached += 1
    if (reached > upTo) throw new OperationalError(`the disk would not ${what}`)
    return Promise.resolve()
  }
  return { cleared: () => step("clear a folder"), laid: () => step("copy a folder") }
}

test("a folder is named as soon as it is cleared and again once it is laid down", async () => {
  const done: string[] = []

  await layEach(DIRS, STAGING, AT, laying(4), done)
  expect(done).toEqual([CLEARED_ALPHA, LAID_ALPHA, CLEARED_BETA, LAID_BETA])
})

test("an install that threw part way names in its refusal the folder it had cleared", async () => {
  const held = await answering(async (done) => {
    await layEach(DIRS, STAGING, AT, laying(3), done)
    return told(done)
  })

  expect(held.code).toBe(OPERATIONAL)
  expect(held.report).toEqual([CLEARED_ALPHA, LAID_ALPHA, CLEARED_BETA])
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain(CLEARED_BETA)
  expect(last).not.toContain(LAID_BETA)
})

test("an install that threw before a folder was cleared names no folder", async () => {
  const held = await answering(async (done) => {
    await layEach(DIRS, STAGING, AT, laying(0), done)
    return told(done)
  })

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})
