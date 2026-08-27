import { describe, expect, it } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import type { InventoryDatabase } from "@temper/game-items-core/inventory-types"
import { ruleFingerprint } from "@temper/game-items-rules-core/filters/rule-fingerprint"
import type { InventoryRuleSettings } from "@temper/game-items-rules-core/inventory-rule-types"
import { z } from "zod"
import { classifyAllInventoryItems } from "./inventory-item-classifier"

const PERF_FIXTURE_SCHEMA: z.ZodType<{
  settings: InventoryRuleSettings
  inventory: InventoryDatabase
}> = z
  .object({
    settings: z.custom<InventoryRuleSettings>((v) => v !== null && typeof v === "object"),
    inventory: z.custom<InventoryDatabase>((v) => v !== null && typeof v === "object"),
  })
  .passthrough()

interface PerfFixture {
  settings: InventoryRuleSettings
  inventory: InventoryDatabase
}

const FIXTURE_PATH = resolve(import.meta.dir, "./__fixtures__/perf-fixture.json")
const fixtureAvailable = existsSync(FIXTURE_PATH)

function loadFixture(): PerfFixture {
  const raw = PERF_FIXTURE_SCHEMA.parse(JSON.parse(readFileSync(FIXTURE_PATH, "utf-8")))
  return {
    settings: raw.settings,
    inventory: raw.inventory,
  }
}

function rulesFingerprint(s: InventoryRuleSettings): string {
  const rules = [...s.rules]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map(
      (r) =>
        `${r.id}:${r.categoryId}:${r.action}:${r.destination ?? ""}:${r.updatedAt ?? 0}:${r.active !== false}:${r.locked === true}`
    )
    .join("|")
  const itemRules = [...(s.itemRules ?? [])]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map(
      (r) =>
        `${r.id}:${r.itemId}:${r.action}:${r.destination ?? ""}:${r.updatedAt ?? 0}:${r.active !== false}:${r.locked === true}`
    )
    .join("|")
  return `${rules}~${itemRules}`
}

function measure(fn: () => void, iterations = 1): { totalCpuMs: number; avgCpuMs: number } {
  const start = process.cpuUsage()
  for (let i = 0; i < iterations; i++) fn()
  const { user, system } = process.cpuUsage(start)
  const totalCpuMs = (user + system) / 1000
  return { totalCpuMs, avgCpuMs: totalCpuMs / iterations }
}

function measureReturn<T>(fn: () => T): { result: T; cpuMs: number } {
  const start = process.cpuUsage()
  const result = fn()
  const { user, system } = process.cpuUsage(start)
  const cpuMs = (user + system) / 1000
  return { result, cpuMs }
}

if (!fixtureAvailable) {
  console.log(
    `[perf skip] inventory-rules-perf: missing ${FIXTURE_PATH} — extract with scripts/extract-perf-fixtures.script.ts`
  )
}

describe.skipIf(!fixtureAvailable)("Category Rules panel card — performance", () => {
  if (!fixtureAvailable) return
  const fixture = loadFixture()
  const { settings, inventory } = fixture
  const rules = settings.rules

  let classifiedItems = classifyAllInventoryItems(inventory)

  it("reports fixture dimensions", () => {
    let itemCount = 0
    for (const loc of Object.values(inventory.locations)) {
      for (const slots of Object.values(loc.bags)) {
        itemCount += Object.keys(slots).length
      }
    }
    console.log(
      `  Fixture: ${rules.length} rules, ${itemCount} items, ${Object.keys(inventory.locations).length} locations`
    )
    expect(rules.length).toBeGreaterThan(0)
    expect(itemCount).toBeGreaterThan(0)
  })

  describe("classifyAllInventoryItems", () => {
    it("classifies all items under budget", () => {
      const { result, cpuMs } = measureReturn(() => classifyAllInventoryItems(inventory))
      classifiedItems = result

      console.log(
        `  classifyAllInventoryItems: ${cpuMs.toFixed(2)}ms CPU → ${classifiedItems.length} classified items`
      )
      expect(cpuMs).toBeLessThan(50)
    })

    it("is stable across repeated calls (10×)", () => {
      const { avgCpuMs } = measure(() => classifyAllInventoryItems(inventory), 10)
      console.log(`  classifyAllInventoryItems (avg 10×): ${avgCpuMs.toFixed(2)}ms CPU`)
      expect(avgCpuMs).toBeLessThan(50)
    })
  })

  describe("rulesFingerprint", () => {
    it("computes under budget", () => {
      const { avgCpuMs } = measure(() => rulesFingerprint(settings), 100)
      console.log(`  rulesFingerprint (avg 100×): ${avgCpuMs.toFixed(3)}ms CPU`)
      expect(avgCpuMs).toBeLessThan(1)
    })
  })

  describe("ruleFingerprint (duplicate detection)", () => {
    it("computes all fingerprints under budget", () => {
      const { totalCpuMs } = measure(() => {
        const seen = new Set<string>()
        for (const rule of rules) {
          seen.add(ruleFingerprint(rule))
        }
      }, 10)
      const avgCpuMs = totalCpuMs / 10

      console.log(
        `  ruleFingerprint × ${rules.length} rules (avg 10×): ${avgCpuMs.toFixed(3)}ms CPU`
      )
      expect(avgCpuMs).toBeLessThan(5)
    })
  })

  describe("full render cycle", () => {
    it("simulates initial load cost", () => {
      const start = process.cpuUsage()

      const classified = classifyAllInventoryItems(inventory)

      rulesFingerprint(settings)

      const seen = new Set<string>()
      const dupes = new Set<string>()
      for (const rule of rules) {
        const fp = ruleFingerprint(rule)
        if (seen.has(fp)) dupes.add(rule.id)
        else seen.add(fp)
      }

      const { user, system } = process.cpuUsage(start)
      const totalCpuMs = (user + system) / 1000

      console.log(`  Full initial load simulation:`)
      console.log(`    Total: ${totalCpuMs.toFixed(2)}ms CPU`)
      console.log(`    Classified: ${classified.length} items`)
      console.log(`    Duplicates: ${dupes.size}`)

      expect(totalCpuMs).toBeLessThan(200)
    })

    it("simulates single-rule edit cost", () => {
      const iterations = 50
      const { avgCpuMs } = measure(() => {
        rulesFingerprint(settings)

        const seen = new Set<string>()
        for (const rule of rules) {
          seen.add(ruleFingerprint(rule))
        }
      }, iterations)

      console.log(
        `  Single-rule edit simulation (avg ${iterations}×): ${avgCpuMs.toFixed(2)}ms CPU`
      )

      expect(avgCpuMs).toBeLessThan(100)
    })
  })
})
