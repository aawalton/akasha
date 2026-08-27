import { describe, expect, it } from "bun:test"

type GlobalsWithEsoStubs = typeof globalThis & {
  ZO_CreateStringId: (id: string, value: string) => undefined
}

Object.assign(globalThis, {
  ZO_CreateStringId: (_id: string, _value: string): undefined => undefined,
} satisfies Pick<GlobalsWithEsoStubs, "ZO_CreateStringId">)

const { scribingMotifActivityLabel } = await import("./scribing-sources")

describe("scribingMotifActivityLabel", () => {
  it("renders DLC delve sources as `{Zone} Delve Daily`", () => {
    expect(
      scribingMotifActivityLabel("DLC Delve Dailies", "Delve dailies from Guruzug (Orsinium)")
    ).toBe("Orsinium Delve Daily")
  })

  it("renders DLC world boss sources as `{Zone} World Boss Daily`", () => {
    expect(scribingMotifActivityLabel("DLC World Boss Dailies", "WB dailies (High Isle)")).toBe(
      "High Isle World Boss Daily"
    )
  })

  it("renders DLC incursion sources as `{Zone} Incursion Daily`", () => {
    expect(
      scribingMotifActivityLabel(
        "DLC Incursion Dailies",
        "Mirrormoor Incursion dailies (Gold Road)"
      )
    ).toBe("Gold Road Incursion Daily")
  })

  it("keeps a dual-zone parenthetical verbatim", () => {
    expect(
      scribingMotifActivityLabel("DLC Delve Dailies", "Delve dailies (Deadlands/Fargrave)")
    ).toBe("Deadlands/Fargrave Delve Daily")
  })

  it("drops the zone prefix for base-game guild-sourced rows", () => {
    expect(
      scribingMotifActivityLabel("Mages Guild Daily", "FG/MG/Undaunted dailies (base game)")
    ).toBe("Mages Guild Daily")
    expect(
      scribingMotifActivityLabel("Fighters Guild Daily", "FG/MG/Undaunted dailies (base game)")
    ).toBe("Fighters Guild Daily")
  })

  it("renders the bare source label when the label has no activity mapping", () => {
    expect(
      scribingMotifActivityLabel("Undaunted Delve Dailies", "FG/MG/Undaunted dailies (base game)")
    ).toBe("Undaunted Delve Dailies")
  })

  it("renders the bare source label when no trailing parenthetical exists", () => {
    expect(scribingMotifActivityLabel("DLC Delve Dailies", "Delve dailies somewhere")).toBe(
      "DLC Delve Dailies"
    )
  })
})
