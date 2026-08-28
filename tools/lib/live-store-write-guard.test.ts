import { describe, expect, it } from "bun:test"
import { mkdtempSync, readdirSync, rmSync } from "node:fs"

import { CHECKOUT_HERE } from "../../repo/roots/roots.ts"
import { refuseALiveTestWrite, TEST_RUN } from "./live-store-write-guard.ts"

const CLI = `${import.meta.dir}/../ops/cli.ts`

const ENTRIES = `${CHECKOUT_HERE}/pages/food-entry`

function headOf(root: string): string {
  return Bun.spawnSync(["git", "-C", root, "rev-parse", "HEAD"]).stdout.toString().trim()
}

function storeNow(): { readonly head: string; readonly entries: number } {
  return { head: headOf(CHECKOUT_HERE), entries: readdirSync(ENTRIES).length }
}

describe("the `written` route — a write a test reaches by spawning `ops`", () => {
  it("refuses `ops food log`, and Alan's store stands where it did", async () => {
    const before = storeNow()

    const ran = Bun.spawn(
      ["bun", CLI, "food", "log", "--title", "Guard control broccoli", "--plant-grams", "40"],
      { stdout: "pipe", stderr: "pipe" }
    )
    const said = await new Response(ran.stderr).text()
    await ran.exited

    expect(ran.exitCode).not.toBe(0)
    expect(said).toContain("a test run asked to")
    expect(said).toContain("the `written` route")
    expect(said).toContain(CHECKOUT_HERE)

    expect(storeNow()).toEqual(before)
  })

  it("carries the mark into what it spawns, which `Bun.main` cannot", async () => {
    const ran = Bun.spawn(["bun", "-e", `process.stdout.write(String(process.env.${TEST_RUN}))`], {
      stdout: "pipe",
    })
    expect(await new Response(ran.stdout).text()).toBe("1")
  })
})

describe("the `landOne` and `commitAll` routes — a write reaching `page-write.ts` directly", () => {
  it("refuses a root that is Alan's own checkout", () => {
    expect(() => refuseALiveTestWrite(CHECKOUT_HERE, "write probe/one", "`landOne`")).toThrow(
      CHECKOUT_HERE
    )
  })

  it("lets a fixture root past untouched", () => {
    const root = mkdtempSync("/var/tmp/live-store-write-guard-")
    try {
      expect(() => refuseALiveTestWrite(root, "write probe/one", "`landOne`")).not.toThrow()
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })
})
