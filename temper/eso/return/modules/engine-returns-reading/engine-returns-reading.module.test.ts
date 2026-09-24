import { describe, expect, test } from "bun:test"
import {
  apiVersionIn,
  engineReturnsIn,
  returnKindOf,
  returnsBody,
} from "akasha/temper/eso/return/modules/engine-returns-reading/engine-returns-reading.module.code.ts"

const DOC = `h1. ESO UI Documentation for API Version 101050

h2. Game API

h3. Items
* GetItemName(*integer* _slot_)
** _Returns:_ *string* _name_

* GetItemType(*integer* _slot_)
** _Returns:_ *[ItemType|#ItemType]* _itemType_, *[Bag|#Bag]* _bagId_

* ClearItem(*integer* _slot_)

* IsItemStolen(*integer* _slot_)
** _Returns:_ *bool* _isStolen_

* GetItemOwner(*integer* _slot_)
** _Returns:_ *object* _owner_, *string:nilable* _name_

h2. Object API

h3. Control
* GetName()
** _Returns:_ *string* _name_
`

describe("returnKindOf", () => {
  test("names a truth, a word and nothing", () => {
    expect(returnKindOf("boolean")).toBe("truth")
    expect(returnKindOf("string")).toBe("word")
    expect(returnKindOf("unknown")).toBe("nothing")
  })

  test("names a number for a type it does not carry, because an enumeration is a number", () => {
    expect(returnKindOf("ItemType")).toBe("number")
    expect(returnKindOf("Id64")).toBe("number")
    expect(returnKindOf("number")).toBe("number")
  })

  test("keeps the kind a return that may be absent has when it is there", () => {
    expect(returnKindOf("string | undefined")).toBe("word")
    expect(returnKindOf("boolean | undefined")).toBe("truth")
  })
})

describe("apiVersionIn", () => {
  test("reads the version off the documentation's first heading", () => {
    expect(apiVersionIn(DOC)).toBe(101050)
  })

  test("reads a document carrying no heading as nothing", () => {
    expect(apiVersionIn("nothing here")).toBe(0)
  })
})

describe("engineReturnsIn", () => {
  test("keeps a function the documentation gives no return", () => {
    expect(engineReturnsIn(DOC).returns.ClearItem).toEqual([])
  })

  test("keeps every return in the order the documentation names them", () => {
    expect(engineReturnsIn(DOC).returns.GetItemOwner).toEqual(["nothing", "word"])
    expect(engineReturnsIn(DOC).returns.GetItemType).toEqual(["number", "number"])
  })

  test("keeps no function of an object, because no such function is a global", () => {
    expect(engineReturnsIn(DOC).returns.GetName).toBeUndefined()
  })

  test("sorts the names, so a document writes the same body twice", () => {
    expect(Object.keys(engineReturnsIn(DOC).returns)).toEqual([
      "ClearItem",
      "GetItemName",
      "GetItemOwner",
      "GetItemType",
      "IsItemStolen",
    ])
  })
})

describe("returnsBody", () => {
  test("writes a body ending in one newline", () => {
    const body = returnsBody(engineReturnsIn(DOC))
    expect(body.endsWith("}\n")).toBe(true)
    expect(JSON.parse(body).apiVersion).toBe(101050)
  })
})
