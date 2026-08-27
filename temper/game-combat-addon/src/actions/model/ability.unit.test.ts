import { expect, test } from "bun:test"
import { buildAbility, parseDescriptionDuration, parseDescriptionNums } from "./ability"

const base = {
  id: 1,
  name: "Test Ability",
  icon: "esoui/art/icons/ability_foo_001.dds",
  description: "Deals damage.",
  type: 1,
}

test("buildAbility prepends a leading slash to an icon path lacking one", () => {
  const a = buildAbility(base)
  expect(a.icon).toBe("/esoui/art/icons/ability_foo_001.dds")
})

test("buildAbility keeps an icon path that already starts with a slash", () => {
  const a = buildAbility({ ...base, icon: "/esoui/art/icons/x.dds" })
  expect(a.icon).toBe("/esoui/art/icons/x.dds")
})

test("buildAbility defaults showName to the bracket-stripped name", () => {
  const a = buildAbility({ ...base, name: "Morph <Inner Name> extra" })
  expect(a.showName).toBe("Inner Name")
})

test("buildAbility leaves showName equal to name when there is no bracket group", () => {
  const a = buildAbility({ ...base, name: "Plain Name" })
  expect(a.showName).toBe("Plain Name")
})

test("buildAbility honors an explicit showName", () => {
  const a = buildAbility({ ...base, showName: "Override" })
  expect(a.showName).toBe("Override")
})

test("buildAbility carries optional icon2/icon3/progressionName with slash prefix", () => {
  const a = buildAbility({
    ...base,
    icon2: "esoui/art/icons/two.dds",
    icon3: "/esoui/art/icons/three.dds",
    progressionName: "Prog",
  })
  expect(a.icon2).toBe("/esoui/art/icons/two.dds")
  expect(a.icon3).toBe("/esoui/art/icons/three.dds")
  expect(a.progressionName).toBe("Prog")
})

test("parseDescriptionDuration parses an integer-second duration to ms", () => {
  expect(parseDescriptionDuration("This effect lasts 10 seconds.")).toBe(10000)
})

test("parseDescriptionDuration parses a decimal-second duration to ms", () => {
  expect(parseDescriptionDuration("Stuns for 3.5 seconds.")).toBe(3500)
})

test("parseDescriptionDuration parses a single second (singular 'second')", () => {
  expect(parseDescriptionDuration("Snared for 1 second.")).toBe(1000)
})

test("parseDescriptionDuration keeps the largest value under 30s across segments", () => {
  expect(parseDescriptionDuration("Channel for 2 seconds, detonating after 2.5 seconds.")).toBe(
    2500
  )
})

test("parseDescriptionDuration ignores values at or above 30 seconds after the first", () => {
  expect(parseDescriptionDuration("Lasts 5 seconds. Cooldown 40 seconds.")).toBe(5000)
})

test("parseDescriptionDuration returns undefined when no seconds phrase is present", () => {
  expect(parseDescriptionDuration("Deals damage with no listed duration.")).toBeUndefined()
})

test("parseDescriptionNums collects distinct whole-second integers", () => {
  expect(parseDescriptionNums("Lasts 10 seconds, hits 4 times over 4 seconds.")).toEqual([10, 4])
})

test("parseDescriptionNums excludes non-integer (decimal) numbers", () => {
  expect(parseDescriptionNums("Stuns for 3.5 seconds then 6 ticks.")).toEqual([6])
})

test("parseDescriptionNums returns empty when the description has no numbers", () => {
  expect(parseDescriptionNums("Deals damage to the target.")).toEqual([])
})
