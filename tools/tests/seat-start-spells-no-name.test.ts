import { describe, expect, test } from "bun:test"
import { compositionOf, decideSpawnName } from "../lib/decide-spawn-name.ts"
import { refuseStatedName } from "../lib/refuse-stated-name.ts"

const DEFAULT_ROLE = "worker"

describe("what a bare start spells", () => {
  test("a name spelled from nothing but the default role spells no name at all", () => {
    expect(
      compositionOf({ spelled: DEFAULT_ROLE, role: DEFAULT_ROLE, roleIsDefault: true })
    ).toEqual({ kind: "none" })
  })

  test("a domain beside the default role spells one, the default doing its work", () => {
    expect(
      compositionOf({
        spelled: `agent-harness-${DEFAULT_ROLE}`,
        role: DEFAULT_ROLE,
        roleIsDefault: true,
      })
    ).toEqual({ kind: "composed", name: `agent-harness-${DEFAULT_ROLE}` })
  })

  test("a role the caller stated spells one alone, the caller having typed it", () => {
    expect(
      compositionOf({ spelled: DEFAULT_ROLE, role: DEFAULT_ROLE, roleIsDefault: false })
    ).toEqual({ kind: "composed", name: DEFAULT_ROLE })
  })

  test("attributes spelling nothing spell no name, whatever the role holds", () => {
    expect(compositionOf({ spelled: null, role: DEFAULT_ROLE, roleIsDefault: true })).toEqual({
      kind: "none",
    })
  })
})

describe("a name typed where the attributes belong", () => {
  test("is refused, a seat being named by what it is rather than by hand", () => {
    expect(refuseStatedName(["athena-worker"])).not.toBeNull()
  })

  test("is not read out of a flag, which is not a name typed beside the attributes", () => {
    expect(refuseStatedName(["--persona", "athena"])).toBeNull()
    expect(refuseStatedName([])).toBeNull()
  })

  test("is answered with the attributes that name spells, which is what to type instead", () => {
    const refusal = refuseStatedName(["agent-harness-worker"]) ?? ""
    expect(refusal).toContain("--domain agent-harness")
    expect(refusal).toContain("--role worker")
  })

  test("spells a persona standing alone, a persona naming a seat rather than joining one", () => {
    expect(refuseStatedName(["athena"]) ?? "").toContain("--persona athena")
    expect(refuseStatedName(["athena-worker"]) ?? "").toContain("spells no attributes")
  })

  test("is answered with the route where the name spells no attribute at all", () => {
    const refusal = refuseStatedName(["zzz-not-a-thing"]) ?? ""
    expect(refusal).toContain("--persona")
    expect(refusal).toContain("--domain")
    expect(refusal).toContain("--role")
  })
})

describe("the refusal a caller who stated nothing reads", () => {
  const decision = decideSpawnName({ composed: { kind: "none" } })

  test("names the flags that would spell a name, which is what the caller must supply", () => {
    if (decision.kind !== "reject") throw new Error("unreachable")
    expect(decision.reason).toContain("--domain")
    expect(decision.reason).toContain("--persona")
  })

  test("names no token the caller never typed, which is what sent them looking", () => {
    if (decision.kind !== "reject") throw new Error("unreachable")
    expect(decision.reason).not.toContain(`'${DEFAULT_ROLE}'`)
    expect(decision.reason).not.toContain("--seq")
    expect(decision.reason).not.toContain("no name was stated")
  })
})
