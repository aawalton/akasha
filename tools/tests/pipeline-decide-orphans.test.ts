import { describe, expect, test } from "bun:test"
import {
  decideOrphans,
  type LiveResource,
  ORPHAN_ALLOWLIST,
  ORPHAN_MANAGED_BY,
  resourceKey,
} from "../lib/pipeline-decide/decide-orphans.ts"

const held = { managedByValues: ORPHAN_MANAGED_BY, allowlist: ORPHAN_ALLOWLIST } as const

function live(kind: string, namespace: string, name: string, managedBy: string | null): LiveResource {
  return { kind, namespace, name, managedBy }
}

describe("resourceKey", () => {
  test("spells one resource one way", () => {
    expect(resourceKey("Deployment", "alanwalton", "web")).toBe("Deployment/alanwalton/web")
  })
})

describe("decideOrphans", () => {
  test("a resource this system deploys with no manifest behind it is an orphan", () => {
    const sourced = new Set([resourceKey("Deployment", "alanwalton", "web")])
    const orphans = decideOrphans(
      sourced,
      [
        live("Deployment", "alanwalton", "web", "deploy-script"),
        live("Deployment", "alanwalton", "idle", "deploy-script"),
        live("StatefulSet", "projects", "leftover", "bootstrap"),
      ],
      held
    )
    expect(orphans.map((one) => one.name).toSorted()).toEqual(["idle", "leftover"])
  })

  test("a resource nothing here deploys is left alone, whoever made it", () => {
    const orphans = decideOrphans(
      new Set<string>(),
      [
        live("Service", "alanwalton", "cnpg-rw", "cloudnative-pg"),
        live("Deployment", "temper", "vendor-x", null),
      ],
      held
    )
    expect(orphans).toEqual([])
  })

  test("every sourced resource leaves nothing to report", () => {
    const sourced = new Set([
      resourceKey("Deployment", "alanwalton", "web"),
      resourceKey("Service", "alanwalton", "web"),
    ])
    const orphans = decideOrphans(
      sourced,
      [
        live("Deployment", "alanwalton", "web", "deploy-script"),
        live("Service", "alanwalton", "web", "deploy-script"),
      ],
      held
    )
    expect(orphans).toEqual([])
  })

  test("an allowlisted key is not reported", () => {
    const orphans = decideOrphans(
      new Set<string>(),
      [live("Deployment", "alanwalton", "kept", "deploy-script")],
      {
        managedByValues: ORPHAN_MANAGED_BY,
        allowlist: new Set([resourceKey("Deployment", "alanwalton", "kept")]),
      }
    )
    expect(orphans).toEqual([])
  })

  test("the shipped allowlist suppresses nothing and the labels are the two this system writes", () => {
    expect(ORPHAN_ALLOWLIST.size).toBe(0)
    expect([...ORPHAN_MANAGED_BY].toSorted()).toEqual(["bootstrap", "deploy-script"])
  })
})
