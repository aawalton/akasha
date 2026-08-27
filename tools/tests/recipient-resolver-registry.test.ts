
import { describe, expect, it } from "bun:test"
import { digestOf } from "../lib/digest-harness.ts"
import { type CommsRule, type OnDemandAgentSpec } from "../lib/decide-wake-match.ts"
import { onDemandAgentSpecSchema, standingPersonaSpec } from "../lib/wake-armed-specs.ts"
import {
  ALAN_HANDLER_SEAT,
  ARIA_STAGED_SPEC,
  assembleRecipientResolverSpecs,
  IRIS_SPEC,
  KI_HANDLER_SPEC,
  SMS_ENTRY_POINT_SPECS,
} from "../lib/recipient-resolver-registry.ts"

const ABSENT = "<<absent>>"

function project(specs: readonly OnDemandAgentSpec[]): unknown {
  return specs.map((spec) => ({
    name: spec.name,
    wakeSources: spec.wakeSources.map((rule) => ({
      id: rule.id,
      senderMatch: rule.senderMatch,
      contentRegex: rule.contentRegex ?? ABSENT,
      target: rule.target,
      status: rule.status,
    })),
    stateAuthority: spec.stateAuthority.map((one) => ({ kind: one.kind, detail: one.detail })),
    resumePolicy: spec.resumePolicy,
    owner: spec.owner,
    bootPrompt: spec.bootPrompt ?? ABSENT,
    valid: onDemandAgentSpecSchema.safeParse(spec).success,
  }))
}

const personas =
  (...slugs: readonly string[]) =>
  async (): Promise<readonly string[]> =>
    slugs

const sources =
  (entries: Readonly<Record<string, readonly CommsRule[]>>) =>
  async (): Promise<ReadonlyMap<string, readonly CommsRule[]>> =>
    new Map(Object.entries(entries))

const AMY_EMAIL_RULE: CommsRule = {
  id: "amy-email-surface",
  senderMatch: "system:email-surface",
  contentRegex: undefined,
  target: "amy",
  status: "LIVE",
}

const AMY_REGEX_RULE: CommsRule = { ...AMY_EMAIL_RULE, contentRegex: "triage" }

describe("assembleRecipientResolverSpecs reads its enumerations fresh", () => {
  it("reads every enumeration FRESH — a page created between ticks arms on the next assembly", async () => {
    const readings: (readonly string[])[] = [["amy"], ["amy", "selah"]]
    let call = 0
    const growing = async (): Promise<readonly string[]> => readings[call++] ?? []

    const first = (await assembleRecipientResolverSpecs(growing)).map((spec) => spec.name)
    const second = (await assembleRecipientResolverSpecs(growing)).map((spec) => spec.name)

    expect(first).not.toContain("selah")
    expect(second).toContain("selah")
  })
})

describe("the absence encoding, which the digests above rest on", () => {
  it("tells an absent contentRegex from a held one — the two vectors differ in nothing else", async () => {
    const absent = project(
      await assembleRecipientResolverSpecs(personas("amy"), sources({ amy: [AMY_EMAIL_RULE] }))
    )
    const held = project(
      await assembleRecipientResolverSpecs(personas("amy"), sources({ amy: [AMY_REGEX_RULE] }))
    )
    expect(digestOf(absent)).not.toBe(digestOf(held))
  })

  it("spells an absent bootPrompt rather than dropping it", async () => {
    const specs = await assembleRecipientResolverSpecs(personas())
    const iris = specs.find((spec) => spec.name === "iris")
    const ki = specs.find((spec) => spec.name === "amy-ki-handler")
    expect(iris?.bootPrompt).toBeUndefined()
    expect(ki?.bootPrompt).toBe("/handler ki")
    expect(digestOf(project([iris as OnDemandAgentSpec]))).not.toBe(
      digestOf(project([{ ...(iris as OnDemandAgentSpec), bootPrompt: "/x" }]))
    )
  })
})

describe("the declared specs are referenced, not rebuilt", () => {
  it("hands back the module constants themselves", async () => {
    const specs = await assembleRecipientResolverSpecs(personas())
    expect(specs).toContain(IRIS_SPEC)
    expect(specs).toContain(ARIA_STAGED_SPEC)
    for (const entryPoint of SMS_ENTRY_POINT_SPECS) {
      expect(specs.find((spec) => spec.name === entryPoint.name)).toBe(entryPoint)
    }
  })

  it("keeps the declared constant when a persona page collides with its name", async () => {
    const specs = await assembleRecipientResolverSpecs(personas("iris", "amy-ki-handler"))
    expect(specs.filter((spec) => spec.name === "iris")).toEqual([IRIS_SPEC])
    expect(specs.find((spec) => spec.name === "iris")).toBe(IRIS_SPEC)
    expect(specs.find((spec) => spec.name === "amy-ki-handler")).toBe(KI_HANDLER_SPEC)
  })

  it("arms Alan's handler seat as a SEATED PERSONA, not as a derived person handler", async () => {
    const specs = await assembleRecipientResolverSpecs(personas("amy"), sources({}), async () => [
      { persona: "amy", slug: "alan" },
    ])
    const seat = specs.find((spec) => spec.name === ALAN_HANDLER_SEAT)
    expect(seat).toEqual(standingPersonaSpec(ALAN_HANDLER_SEAT))
  })
})
