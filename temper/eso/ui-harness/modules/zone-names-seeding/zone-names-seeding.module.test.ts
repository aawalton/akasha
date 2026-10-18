import { expect, test } from "bun:test"
import { zoneNamesLua } from "akasha/temper/eso/ui-harness/modules/zone-names-seeding/zone-names-seeding.module.code.ts"

test("a zone's name is answered by its id", () => {
  expect(zoneNamesLua()).toContain('[64] = "Blessed Crucible"')
})

test("a zone no table names is answered with no name", () => {
  expect(zoneNamesLua()).toContain('return names[zoneId] or ""')
})
