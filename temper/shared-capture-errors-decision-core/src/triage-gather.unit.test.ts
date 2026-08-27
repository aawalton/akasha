import { describe, expect, test } from "bun:test"
import type { ErrorEntry } from "@temper/shared-capture-errors-core/types"
import { gatherTriage } from "./triage-gather"

function entry(over: Partial<ErrorEntry> = {}): ErrorEntry {
  return {
    traceback: "stack traceback:\n\tuser:/AddOns/TemperFoo/TemperFoo.lua:10: in function 'f'",
    message: "attempt to index a nil value",
    count: 1,
    firstSeenAt: 1_700_000_000,
    lastSeenAt: 1_700_000_100,
    account: "@alan",
    character: "Tank",
    world: "NA",
    esoVersion: "10.0.0",
    apiVersion: 101_044,
    eventCode: 0,
    ...over,
  }
}

describe("gatherTriage", () => {
  test("attributed addon, loaded != deployed → stale-ram (the pre-deploy-residue case)", async () => {
    const e = entry({ attributedAddon: "TemperFoo", attributedBuildId: "aaaaaaaa" })
    const r = await gatherTriage(e, async (folder) =>
      folder === "TemperFoo" ? "bbbbbbbb" : undefined
    )
    expect(r.triage).toBe("stale-ram")
    expect(r.reason).toBe("loaded-differs-from-deployed")
    expect(r.inferred).toBeUndefined()
  })

  test("attributed addon, loaded == deployed → live-recurrence (genuine, on latest bytes)", async () => {
    const e = entry({ attributedAddon: "TemperFoo", attributedBuildId: "aaaaaaaa" })
    const r = await gatherTriage(e, async () => "aaaaaaaa")
    expect(r.triage).toBe("live-recurrence")
    expect(r.reason).toBe("loaded-matches-deployed")
  })

  test("attributed addon, no deployed build readable → unknown", async () => {
    const e = entry({ attributedAddon: "TemperFoo", attributedBuildId: "aaaaaaaa" })
    const r = await gatherTriage(e, async () => undefined)
    expect(r.triage).toBe("unknown")
    expect(r.reason).toBe("no-deployed-build")
  })

  test("attributed addon, loaded build unknown → live-recurrence (unprovable, conservative)", async () => {
    const e = entry({ attributedAddon: "TemperFoo", attributedBuildId: undefined })
    const r = await gatherTriage(e, async () => "bbbbbbbb")
    expect(r.triage).toBe("live-recurrence")
    expect(r.reason).toBe("loaded-build-unknown")
  })

  test("unattributed crash whose signature maps to a culprit compares the snapshot build", async () => {
    const e = entry({
      attributedAddon: undefined,
      traceback: "stack traceback:\n\tCraftStoreFixed_CookCategoryButton14_Clicked:2",
      message: "CraftStoreFixed_CookCategoryButton14_Clicked:2: function expected instead of nil",
      buildIds: { TemperCrafting: "aaaaaaaa" },
    })
    const r = await gatherTriage(e, async (folder) =>
      folder === "TemperCrafting" ? "bbbbbbbb" : undefined
    )
    expect(r.triage).toBe("stale-ram")
    expect(r.reason).toBe("inferred-loaded-differs-from-deployed")
    expect(r.inferred?.addon).toBe("TemperCrafting")
    expect(r.inferred?.loadedBuildId).toBe("aaaaaaaa")
    expect(r.inferred?.deployedBuildId).toBe("bbbbbbbb")
  })

  test("unattributed crash with no culprit signature → unknown", async () => {
    const e = entry({
      attributedAddon: undefined,
      traceback: "stack traceback:\n\tsomething base-game",
      message: "plain error",
    })
    const r = await gatherTriage(e, async () => "bbbbbbbb")
    expect(r.triage).toBe("unknown")
    expect(r.reason).toBe("unattributed")
    expect(r.inferred).toBeUndefined()
  })
})
