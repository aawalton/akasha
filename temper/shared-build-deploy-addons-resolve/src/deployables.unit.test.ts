import { describe, expect, test } from "bun:test"
import { join } from "node:path"
import { listDeployables } from "./deployables"
import type { AddonInfo } from "./index"

const repoRoot = join(import.meta.dir, "..", "..", "..", "..", "..", "..")

function addon(canonicalName: string, workspaceClosure: readonly string[] = []): AddonInfo {
  return {
    dir: `/fake/${canonicalName}`,
    canonicalName,
    repoRelDir: `packages/temper/addons/${canonicalName}`,
    workspaceClosure,
  }
}

describe("listDeployables", () => {
  test("standalone deployable carries its own closure verbatim", () => {
    const roster: readonly AddonInfo[] = [addon("TemperInventory", ["packages/temper/inventory"])]
    expect(listDeployables(roster)).toEqual([
      { name: "TemperInventory", workspaceClosure: ["packages/temper/inventory"] },
    ])
  })

  test("an all-standalone roster yields one deployable per addon, sorted by name", () => {
    const roster: readonly AddonInfo[] = [addon("TemperHud"), addon("TemperAlpha")]
    expect(listDeployables(roster).map((d) => d.name)).toEqual(["TemperAlpha", "TemperHud"])
  })
})

describe("live roster", () => {
  test("the live roster resolves to a non-empty standalone deployable set", () => {
    const deployables = listDeployables({ repoRoot })
    expect(deployables.length).toBeGreaterThan(0)
  })
})
