import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperScribingSources } from "./temper-scribing-sources.ts"

const ZONE_GOLD_COAST = "00000000-0000-0000-0000-00000000z001"
const ZONE_STORMHAVEN = "00000000-0000-0000-0000-00000000z002"

const goldCoast = Page({
  id: ZONE_GOLD_COAST,
  title: "Gold Coast",
  isDlc: true,
  dropsScripts: false,
})

const stormhaven = Page({
  id: ZONE_STORMHAVEN,
  title: "Stormhaven",
  isDlc: false,
  dropsScripts: true,
})

const makeSource = (zoneRefs: readonly string[]) =>
  Page({
    id: "00000000-0000-0000-0000-00000000s001",
    title: "Test Source",
    scriptType: "affix",
    displayOrder: 0,
    tierAchievements: [{ achievementId: 1, name: "test" }],
    zoneRefs,
  })

describe("generateTemperScribingSources zone-refs validator", () => {
  test("throws when a zoneRefs target has dropsScripts=false", () => {
    expect(() =>
      generateTemperScribingSources([makeSource([ZONE_GOLD_COAST])], [goldCoast, stormhaven])
    ).toThrow(/Gold Coast.*dropsScripts=false/)
  })

  test("throws when a zoneRefs target is not a known zone", () => {
    expect(() =>
      generateTemperScribingSources(
        [makeSource(["00000000-0000-0000-0000-00000000zNNN"])],
        [stormhaven]
      )
    ).toThrow(/is not a temper-zone row/)
  })

  test("passes when every zoneRefs target has dropsScripts=true", () => {
    expect(() =>
      generateTemperScribingSources([makeSource([ZONE_STORMHAVEN])], [stormhaven])
    ).not.toThrow()
  })
})
