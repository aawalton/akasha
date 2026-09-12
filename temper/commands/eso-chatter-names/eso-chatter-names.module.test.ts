import { expect, test } from "bun:test"
import { chatterNamesModule } from "akasha/temper/commands/eso-chatter-names/eso-chatter-names.module.code.ts"

const SOURCE = `declare const CHATTER_BEGIN: number
declare const CHATTER_ACCEPT_QUEST_BESTOWAL: number
declare const INTERACTION_BANK: number
`

test("the module opens with the declaration it renders rather than with prose", () => {
  const said = chatterNamesModule(SOURCE)

  expect(said.text.startsWith("export const CHATTER_OPTION_TYPE_NAMES")).toBe(true)
})

test("the module rendered carries no comment in either form a parser reads", () => {
  const said = chatterNamesModule(SOURCE)

  expect(said.text).not.toContain("/*")
  expect(said.text).not.toContain("//")
})

test("a name is rendered as a quoted literal rather than pasted between two quotes", () => {
  const said = chatterNamesModule(SOURCE)

  expect(said.text).toContain('  "CHATTER_BEGIN",')
})

test("the names of each kind come back sorted and apart", () => {
  const said = chatterNamesModule(SOURCE)

  expect(said.chatter).toEqual(["CHATTER_ACCEPT_QUEST_BESTOWAL", "CHATTER_BEGIN"])
  expect(said.interaction).toEqual(["INTERACTION_BANK"])
})
