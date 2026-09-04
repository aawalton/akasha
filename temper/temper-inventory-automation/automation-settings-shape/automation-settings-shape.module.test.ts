import { expect, test } from "bun:test"
import {
  AutomationSettingsShape,
  automationSettingsFrom,
} from "./automation-settings-shape.module.code.ts"

test("the emptiest settings there can be are read", () => {
  expect(automationSettingsFrom({ characters: {}, companions: {} })).toEqual({
    characters: {},
    companions: {},
  })
})

test("settings naming no character map are refused", () => {
  expect(AutomationSettingsShape.safeParse({ companions: {} }).success).toBe(false)
})

test("settings naming no companion map are refused", () => {
  expect(AutomationSettingsShape.safeParse({ characters: {} }).success).toBe(false)
})

test("a toggle carrying something other than a boolean is refused", () => {
  const said = { characters: { "@alan__nord": { food: "yes" } }, companions: {} }
  expect(AutomationSettingsShape.safeParse(said).success).toBe(false)
})

test("locking worn gear is a toggle rather than an unknown key", () => {
  const said = { characters: { "@alan__nord": { lockWornGear: 1 } }, companions: {} }
  expect(AutomationSettingsShape.safeParse(said).success).toBe(false)
})

test("a key no toggle name holds comes through", () => {
  const said = { characters: { "@alan__nord": { mounts: true } }, companions: {} }
  const read = AutomationSettingsShape.parse(said)
  expect(JSON.stringify(read.characters["@alan__nord"])).toBe('{"mounts":true}')
})

test("a toggle set for everyone is read under the global scope", () => {
  const said = { global: { characters: { food: true } }, characters: {}, companions: {} }
  expect(automationSettingsFrom(said).global?.characters?.food).toBe(true)
})

test("a companion carries the two toggles a companion has", () => {
  const said = { characters: {}, companions: { bastian: { equipment: true, skills: false } } }
  expect(automationSettingsFrom(said).companions.bastian).toEqual({
    equipment: true,
    skills: false,
  })
})
