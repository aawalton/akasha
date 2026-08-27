import { beforeEach, describe, expect, it } from "bun:test"

interface FixtureAntiquity {
  readonly id: number
  readonly name: string
  readonly quality: number
  readonly hasLead: boolean
  readonly loreTotal: number
  readonly loreAcquired: number
}

const QUALITY = { NORMAL: 1, FINE: 2, GOLD: 4, ORANGE: 5 } as const

let fixture: readonly FixtureAntiquity[] = []
const byId = (): Map<number, FixtureAntiquity> => new Map(fixture.map((a) => [a.id, a]))

type LuaStubs = typeof globalThis & {
  string: { find: (s: string, pat: string, init?: number, plain?: boolean) => [number?, number?] }
  math: { max: (...n: number[]) => number }
  zo_strformat: (fmt: string, s: string) => string
  ANTIQUITY_QUALITY_GOLD: number
  ANTIQUITY_QUALITY_ORANGE: number
  GetNextAntiquityId: (prev?: number) => number | undefined
  DoesAntiquityHaveLead: (id: number) => boolean
  GetAntiquityName: (id: number) => string
  GetAntiquityQuality: (id: number) => number
  GetNumAntiquityLoreEntries: (id: number) => number
  GetNumAntiquityLoreEntriesAcquired: (id: number) => number
}

Object.assign(globalThis, {
  string: {
    find: (s: string, pat: string, init?: number, _plain?: boolean): [number?, number?] => {
      const idx = s.indexOf(pat, (init ?? 1) - 1)
      return idx === -1 ? [undefined] : [idx + 1, idx + pat.length]
    },
  },
  math: { max: Math.max },
  zo_strformat: (_fmt: string, s: string): string => s,
  ANTIQUITY_QUALITY_GOLD: QUALITY.GOLD,
  ANTIQUITY_QUALITY_ORANGE: QUALITY.ORANGE,
  GetNextAntiquityId: (prev?: number): number | undefined => {
    const ids = fixture.map((a) => a.id).sort((a, b) => a - b)
    if (prev === undefined) return ids[0]
    return ids.find((id) => id > prev)
  },
  DoesAntiquityHaveLead: (id: number): boolean => byId().get(id)?.hasLead === true,
  GetAntiquityName: (id: number): string => byId().get(id)?.name ?? "",
  GetAntiquityQuality: (id: number): number => byId().get(id)?.quality ?? QUALITY.NORMAL,
  GetNumAntiquityLoreEntries: (id: number): number => byId().get(id)?.loreTotal ?? 0,
  GetNumAntiquityLoreEntriesAcquired: (id: number): number => byId().get(id)?.loreAcquired ?? 0,
} satisfies Partial<LuaStubs>)

const {
  collectActiveAntiquityLeads,
  hasNoActionableAntiquityLeads,
  hasNoLegendaryAntiquityLeads,
  hasNoMotifAntiquityLeads,
  isMotifAntiquity,
} = await import("./antiquity-lead-checks")

const ANCESTRAL: FixtureAntiquity = {
  id: 1,
  name: "Ancestral High Elf Belt",
  quality: QUALITY.GOLD,
  hasLead: true,
  loreTotal: 2,
  loreAcquired: 0,
}
const DWARVEN: FixtureAntiquity = {
  id: 2,
  name: "Dwarven Puzzle Box",
  quality: QUALITY.FINE,
  hasLead: true,
  loreTotal: 1,
  loreAcquired: 1,
}
const DAEDRIC: FixtureAntiquity = {
  id: 3,
  name: "Ancient Daedric Box",
  quality: QUALITY.ORANGE,
  hasLead: true,
  loreTotal: 0,
  loreAcquired: 0,
}
const NO_LEAD: FixtureAntiquity = {
  id: 4,
  name: "Some Trinket",
  quality: QUALITY.GOLD,
  hasLead: false,
  loreTotal: 5,
  loreAcquired: 0,
}
const GOLDEN: FixtureAntiquity = {
  id: 5,
  name: "Golden Goblet",
  quality: QUALITY.GOLD,
  hasLead: true,
  loreTotal: 3,
  loreAcquired: 1,
}

beforeEach(() => {
  fixture = [ANCESTRAL, DWARVEN, DAEDRIC, NO_LEAD, GOLDEN]
})

describe("isMotifAntiquity", () => {
  it("matches the Ancestral and Ancient Daedric name prefixes only", () => {
    expect(isMotifAntiquity("Ancestral High Elf Belt")).toBe(true)
    expect(isMotifAntiquity("Ancient Daedric Box")).toBe(true)
    expect(isMotifAntiquity("Dwarven Puzzle Box")).toBe(false)
    expect(isMotifAntiquity("Ancient Nord Helm")).toBe(false)
    expect(isMotifAntiquity("Worn Ancestral Belt")).toBe(false)
    expect(isMotifAntiquity("Reinforced Ancient Daedric Cuirass")).toBe(false)
  })
})

describe("collectActiveAntiquityLeads", () => {
  it("captures only lead-bearing antiquities with name/quality/lore-remaining", () => {
    const leads = collectActiveAntiquityLeads()
    expect(leads.map((l) => l.antiquityId)).toEqual([1, 2, 3, 5])
    expect(leads.find((l) => l.antiquityId === 1)).toEqual({
      antiquityId: 1,
      name: "Ancestral High Elf Belt",
      quality: QUALITY.GOLD,
      loreRemaining: 2,
    })
    expect(leads.find((l) => l.antiquityId === 2)?.loreRemaining).toBe(0)
    expect(leads.find((l) => l.antiquityId === 3)?.loreRemaining).toBe(0)
    expect(leads.find((l) => l.antiquityId === 5)?.loreRemaining).toBe(2)
  })
})

describe("hasNo* predicates derive from the collection", () => {
  it("reports work outstanding when matching leads exist", () => {
    expect(hasNoActionableAntiquityLeads()).toBe(false)
    expect(hasNoMotifAntiquityLeads()).toBe(false)
    expect(hasNoLegendaryAntiquityLeads()).toBe(false)
  })

  it("reports nothing-to-do when no antiquity has a lead", () => {
    fixture = [
      { ...ANCESTRAL, hasLead: false },
      { ...GOLDEN, hasLead: false },
    ]
    expect(hasNoActionableAntiquityLeads()).toBe(true)
    expect(hasNoMotifAntiquityLeads()).toBe(true)
    expect(hasNoLegendaryAntiquityLeads()).toBe(true)
  })

  it("separates the card filters: a fine-quality fully-acquired lead trips none", () => {
    fixture = [DWARVEN]
    expect(hasNoActionableAntiquityLeads()).toBe(true)
    expect(hasNoMotifAntiquityLeads()).toBe(true)
    expect(hasNoLegendaryAntiquityLeads()).toBe(true)
  })
})
