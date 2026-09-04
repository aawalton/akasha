import { expect, test } from "bun:test"
import { temperInventoryDecodeLink } from "./temper-inventory-decode-link.command.code.ts"

const TWENTY_ONE = [
  "45237",
  "6",
  "50",
  "0",
  "0",
  "0",
  "3",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "0",
  "17",
  "12",
  "1",
  "1",
  "0",
  "500",
  "9001",
]

function linkOf(fields: readonly string[], marker = "|H1:item:"): string {
  return `${marker}${fields.join(":")}|h[Test Item]|h`
}

test("a link carrying twenty-one fields after its item marker is read", () => {
  const said = temperInventoryDecodeLink([linkOf(TWENTY_ONE)])
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  const whole = said.report.join("\n")
  expect(whole).toContain("itemId")
  expect(whole).toContain("45237")
})

test("the fields are named beside their values", () => {
  const said = temperInventoryDecodeLink([linkOf(TWENTY_ONE)])
  const whole = said.report.join("\n")
  expect(whole).toContain("potionData")
  expect(whole).toContain("9001")
  expect(whole).toContain("charges")
  expect(whole).toContain("500")
  expect(whole).toContain("style")
  expect(whole).toContain("12")
})

test("a link carrying fewer than twenty-one fields refuses the call", () => {
  const said = temperInventoryDecodeLink([linkOf(TWENTY_ONE.slice(0, 20))])
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("21 fields")
  expect(said.report).toEqual([])
})

test("a link carrying more than twenty-one fields is read rather than refused", () => {
  const said = temperInventoryDecodeLink([linkOf([...TWENTY_ONE, "77", "88"])])
  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("9001")
})

test("a link naming no item marker refuses the call", () => {
  const said = temperInventoryDecodeLink(["|H1:quest:45237:6:50|h[Not An Item]|h"])
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("item marker")
})

test("the unlinked marker is read as well as the linked one", () => {
  const said = temperInventoryDecodeLink([linkOf(TWENTY_ONE, "|H0:item:")])
  expect(said.code).toBe(0)
  expect(said.report.join("\n")).toContain("45237")
})

test("naming no link refuses the call", () => {
  const said = temperInventoryDecodeLink([])
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("no link to read")
})

test("a flag alone is not taken for the link", () => {
  const said = temperInventoryDecodeLink(["--json"])
  expect(said.code).not.toBe(0)
  expect(said.refusals.join("\n")).toContain("no link to read")
})

test("the json answer parses and carries the named fields", () => {
  const said = temperInventoryDecodeLink([linkOf(TWENTY_ONE), "--json"])
  expect(said.code).toBe(0)
  const parsed = JSON.parse(said.report.join("\n")) as Record<string, unknown>
  expect(parsed["itemId"]).toBe(45237)
  expect(parsed["potionData"]).toBe(9001)
  expect(parsed["crafted"]).toBe(true)
  expect(parsed["stolen"]).toBe(false)
})

test("the flags a link carries are read as true and false rather than as digits", () => {
  const said = temperInventoryDecodeLink([linkOf(TWENTY_ONE), "--json"])
  const parsed = JSON.parse(said.report.join("\n")) as Record<string, unknown>
  expect(parsed["bound"]).toBe(true)
  expect(parsed["stolen"]).toBe(false)
})
