
import { describe, expect, test } from "bun:test"
import { type ClearRebindHooks, performClearRebind } from "../lib/supervisor-rebind.ts"
import { pickCarriedAgentName } from "../lib/supervisor-rebind-carry"
import { type ClearRebindDeps } from "../lib/supervisor-rebind-deps"

const VALID_UUID = "11111111-2222-4333-8444-555555555555"

describe("a successor stands where its predecessor stood", () => {
  const PREDECESSOR = "01a00806-7f95-7d54-b710-a4d3035b8b8c"
  const SUCCESSOR = "01a00900-0000-7000-8000-000000000000"
  const PARENT = "019fcc5d-c5ec-7e5f-ad43-85b29a81a0e3"

  interface Made {
    readonly launch: string
    readonly parent: string | null
  }

  type Predecessor = Awaited<ReturnType<ClearRebindDeps["readPredecessor"]>>

  async function rebound(predecessor: Predecessor): Promise<Made | null> {
    const made: Made[] = []
    const deps: ClearRebindDeps = {
      readPredecessor: async () => predecessor,
      markStopped: async () => {},
      createSuccessor: async (_account, launch, parent) => {
        made.push({ launch, parent })
        return SUCCESSOR
      },
      setSessionId: async () => {},
      bindAgentName: async () => {},
    }
    const hooks: ClearRebindHooks = {
      selectedAccount: "aawalton",
      projDir: "/var/tmp",
      getAgentId: () => PREDECESSOR,
      getAgentProc: () => undefined,
      setAgentId: () => {},
      setSessionId: () => {},
      applyConsoleRedirect: () => {},
      startSessionWatch: () => () => {},
    }
    await performClearRebind(VALID_UUID, hooks, deps)
    return made[0] ?? null
  }

  test("the successor takes the parent its predecessor answered to", async () => {
    const made = await rebound({ name: "a-seat", launch: "spawned", parent: PARENT })
    expect(made).toEqual({ launch: "spawned", parent: PARENT })
  })

  test("a predecessor that answered to nobody hands on nobody, rather than an invented parent", async () => {
    const made = await rebound({ name: "a-seat", launch: "opened", parent: null })
    expect(made).toEqual({ launch: "opened", parent: null })
  })

  test("a row that could not be read hands on nothing, and the launch falls back to opened", async () => {
    const made = await rebound(null)
    expect(made).toEqual({ launch: "opened", parent: null })
  })
})

describe("pickCarriedAgentName", () => {
  test("null / undefined row → null (nothing to carry)", () => {
    expect(pickCarriedAgentName(null)).toBeNull()
    expect(pickCarriedAgentName(undefined)).toBeNull()
  })

  test("unnamed row (name null) → null", () => {
    expect(pickCarriedAgentName({ name: null, title: null })).toBeNull()
  })

  test("empty-string name counts as unnamed → null", () => {
    expect(pickCarriedAgentName({ name: "", title: "Whatever" })).toBeNull()
  })

  test("named row → carries name and title verbatim, and no slot it did not hold", () => {
    expect(pickCarriedAgentName({ name: "aelwyn", title: "Aelwyn" })).toEqual({
      name: "aelwyn",
      title: "Aelwyn",
      slots: {},
    })
  })

  test("named row with empty title → title falls back to undefined (setAgentName defaults it to name)", () => {
    expect(pickCarriedAgentName({ name: "aelwyn", title: "" })).toEqual({
      name: "aelwyn",
      title: undefined,
      slots: {},
    })
  })

  test("every slot the predecessor held travels, including the seq and the mode", () => {
    expect(
      pickCarriedAgentName({
        name: "sophia",
        title: "Sophia",
        role: "persona-craft",
        domain: "persona",
        persona: "sophia",
        task: "define-definition",
        mode: "interactive",
        principal: "alan",
      })?.slots
    ).toEqual({
      role: "persona-craft",
      domain: "persona",
      persona: "sophia",
      task: "define-definition",
      mode: "interactive",
      principal: "alan",
    })
  })

  test("a persona travels with the one she answers to, the successor row being a fresh one", () => {
    expect(pickCarriedAgentName({ name: "sophia", persona: "sophia", principal: "alan" })?.slots).toEqual({
      persona: "sophia",
      principal: "alan",
    })
  })

  test("a slot the predecessor did not hold is absent rather than defaulted", () => {
    expect(
      pickCarriedAgentName({ name: "s", persona: "sophia", role: null, domain: "" })?.slots
    ).toEqual({ persona: "sophia" })
  })
})
