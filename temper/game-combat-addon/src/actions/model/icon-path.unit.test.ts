import { expect, test } from "bun:test"
import { matchIconPath, normalizeIconPath } from "./icon-path"

test("normalizeIconPath lowercases and strips trailing .dds", () => {
  expect(normalizeIconPath("/ESOUI/Art/Icons/Ability_Foo_001.DDS")).toBe(
    "/esoui/art/icons/ability_foo_001"
  )
})

test("normalizeIconPath keeps only up to the first three-digit run (variant suffix dropped)", () => {
  expect(normalizeIconPath("/esoui/art/icons/ability_werewolf_002_rend_b.dds")).toBe(
    "/esoui/art/icons/ability_werewolf_002"
  )
})

test("normalizeIconPath with no three-digit run keeps the whole body minus .dds", () => {
  expect(normalizeIconPath("/esoui/art/icons/ability_foo.dds")).toBe("/esoui/art/icons/ability_foo")
})

test("matchIconPath matches morph variants _a and _b of the same numeric stem", () => {
  const a = "/esoui/art/icons/ability_mage_010_a.dds"
  const b = "/esoui/art/icons/ability_mage_010_b.dds"
  expect(matchIconPath(a, b)).toBe(true)
})

test("matchIconPath matches across .dds presence/absence", () => {
  expect(
    matchIconPath("/esoui/art/icons/ability_mage_010_a.dds", "/esoui/art/icons/ability_mage_010")
  ).toBe(true)
})

test("matchIconPath returns true on the fast exact-equality check", () => {
  const p = "/esoui/art/icons/ability_mage_010_a.dds"
  expect(matchIconPath(p, p)).toBe(true)
})

test("matchIconPath returns false for different numeric stems", () => {
  expect(
    matchIconPath(
      "/esoui/art/icons/ability_mage_010_a.dds",
      "/esoui/art/icons/ability_mage_011_a.dds"
    )
  ).toBe(false)
})

test("matchIconPath returns false for empty or root paths", () => {
  expect(matchIconPath("", "/esoui/art/icons/x_001.dds")).toBe(false)
  expect(matchIconPath("/", "/esoui/art/icons/x_001.dds")).toBe(false)
  expect(matchIconPath("/esoui/art/icons/x_001.dds", "")).toBe(false)
})
