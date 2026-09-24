import { expect, test } from "bun:test"
import {
  nameFaultIn,
  namesWritten,
  parseEnums,
  parseEvents,
  parseFunctions,
  parseObjects,
  typeFaultIn,
} from "akasha/temper/eso/declaration/modules/eso-doc-tokens/eso-doc-tokens.module.code.ts"

test("a type the map names may be written into a declaration", () => {
  expect(typeFaultIn("string")).toBeNull()
  expect(typeFaultIn("Record<string, unknown>")).toBeNull()
  expect(typeFaultIn("(...args: unknown[]) => unknown")).toBeNull()
})

test("a type that is a name, or a name or nothing, may be written too", () => {
  expect(typeFaultIn("Widget")).toBeNull()
  expect(typeFaultIn("Widget | undefined")).toBeNull()
})

test("a type spelling more than a name is answered as a fault naming that type", () => {
  const said = typeFaultIn("number; declare const OWNED: number")
  expect(said).toContain("is no type name")
  expect(said).toContain("number; declare const OWNED: number")
})

test("a type carrying a quote or a brace is answered as a fault", () => {
  expect(typeFaultIn('string"')).toContain("is no type name")
  expect(typeFaultIn("{ owned: 1 }")).toContain("is no type name")
})

test("a type the documentation states as nothing at all is answered as a fault", () => {
  expect(typeFaultIn("")).toContain("is no type name")
  expect(typeFaultIn(" | undefined")).toContain("is no type name")
})

test("a name that is an identifier may be written into a declaration", () => {
  expect(nameFaultIn("GetUnitName")).toBeNull()
  expect(nameFaultIn("ABILITY_TYPE_HEAL")).toBeNull()
  expect(nameFaultIn("_unit$2")).toBeNull()
})

test("a name opening on a digit is answered as a fault naming that name", () => {
  const said = nameFaultIn("2ndSlot")
  expect(said).toContain("is no identifier")
  expect(said).toContain("2ndSlot")
})

test("a name that is nothing at all is answered as a fault", () => {
  expect(nameFaultIn("")).toContain("is no identifier")
})

test("every name a declaration is written under is weighed, and an event's parameters are not", () => {
  const names = namesWritten({
    enums: [{ name: "AbilityType", values: ["ABILITY_TYPE_HEAL"] }],
    functions: [
      {
        name: "GetThing",
        params: [{ name: "slot", type: "number", isOptional: false }],
        returns: [{ name: "count", type: "number" }],
        hasVariableReturns: false,
      },
    ],
    events: [{ name: "EVENT_ONE", params: [{ name: "unwritten", type: "number" }] }],
    objects: [
      {
        name: "Button",
        inheritsFrom: ["Control"],
        methods: [
          {
            name: "GetState",
            params: [{ name: "which", type: "number", isOptional: false }],
            returns: [{ name: "state", type: "number" }],
            hasVariableReturns: false,
          },
        ],
      },
    ],
  })
  expect([...names].sort()).toEqual(
    [
      "ABILITY_TYPE_HEAL",
      "AbilityType",
      "Button",
      "Control",
      "EVENT_ONE",
      "GetState",
      "GetThing",
      "count",
      "slot",
      "state",
      "which",
    ].sort()
  )
})

const ENUM_DUMP = [
  "h5. AbilityType",
  "* ABILITY_TYPE_ATTACK",
  "* ABILITY_TYPE_HEAL",
  "h5. EmptyKind",
  "h4. Something Else",
].join("\n")

test("an enum is read with every value listed under its heading", () => {
  expect(parseEnums(ENUM_DUMP)).toEqual([
    { name: "AbilityType", values: ["ABILITY_TYPE_ATTACK", "ABILITY_TYPE_HEAL"] },
  ])
})

const FUNCTION_DUMP = [
  "h2. Game API",
  "* GetUnitName(*string* _unitTag_)",
  "** _Returns:_ *string* _name_",
  "",
  "* GetLoot()",
  "** _Uses variable returns..._",
  "** _Returns:_ *integer* _count_",
  "",
  "h2. Object API",
].join("\n")

test("a function carries its parameters and its single return type", () => {
  const [first] = parseFunctions(FUNCTION_DUMP)
  expect(first).toEqual({
    name: "GetUnitName",
    params: [{ name: "unitTag", type: "string", isOptional: false }],
    returns: [{ name: "name", type: "string" }],
    hasVariableReturns: false,
  })
})

test("a function using variable returns says so", () => {
  const found = parseFunctions(FUNCTION_DUMP).find((one) => one.name === "GetLoot")
  expect(found?.hasVariableReturns).toBe(true)
})

test("a function marked private or protected is read, and says so", () => {
  const dump = [
    "h2. Game API",
    "* GetOpen()",
    "** _Returns:_ *bool* _open_",
    "* GetHidden *private* (*integer* _group_)",
    "** _Returns:_ *integer* _count_",
    "* SetGuarded *protected* ()",
    "",
    "h2. Object API",
  ].join("\n")
  const found = parseFunctions(dump)
  expect(found.map((one) => [one.name, one.access])).toEqual([
    ["GetOpen", undefined],
    ["GetHidden", "private"],
    ["SetGuarded", "protected"],
  ])
  expect(found[0]?.returns).toEqual([{ name: "open", type: "boolean" }])
  expect(found[1]?.returns).toEqual([{ name: "count", type: "number" }])
})

test("a documented type outside the map is answered as the dump spells it", () => {
  const dump = ["h2. Game API", "* GetThing(*Widget* _w_)", "", "h2. Object API"].join("\n")
  expect(parseFunctions(dump)[0]?.params[0]?.type).toBe("Widget")
})

test("a documented type named for a 64-bit identifier is answered as that identifier", () => {
  const dump = [
    "h2. Game API",
    "* GetSlot(*[WidgetSlot_id64|#WidgetSlot_id64]* _slot_)",
    "** _Returns:_ *[WidgetSlot_id64|#WidgetSlot_id64]:nilable* _slot_",
    "",
    "h2. Object API",
  ].join("\n")
  const [first] = parseFunctions(dump)
  expect(first?.params[0]?.type).toBe("Id64")
  expect(first?.returns[0]?.type).toBe("Id64 | undefined")
})

const EVENT_DUMP = [
  "h2. Events",
  "* EVENT_COMBAT_EVENT (*integer* _result_)",
  "* EVENT_PLAYER_DEAD",
  "h2. UI XML Layout",
].join("\n")

test("an event carries the parameters written beside it", () => {
  expect(parseEvents(EVENT_DUMP)).toEqual([
    { name: "EVENT_COMBAT_EVENT", params: [{ name: "result", type: "number" }] },
    { name: "EVENT_PLAYER_DEAD", params: [] },
  ])
})

const OBJECT_DUMP = [
  "h2. Object API",
  "h3. Control",
  "Objects that inherit behavior from Control",
  "[Button|#Button]",
  "* GetName()",
  "** _Returns:_ *string* _name_",
  "h3. Button",
  "h2. Events",
].join("\n")

test("a child object states the parent it inherits from", () => {
  const objects = parseObjects(OBJECT_DUMP)
  expect(objects.find((one) => one.name === "Button")?.inheritsFrom).toEqual(["Control"])
  expect(objects.find((one) => one.name === "Control")?.inheritsFrom).toEqual([])
})

test("a function after two blank lines in the object section is global, not a method", () => {
  const dump = [
    "h2. Game API",
    "* GetOpen()",
    "",
    "h2. Object API",
    "h3. WindowManager",
    "* GetTopLevel()",
    "",
    "",
    "* GetUIGlobalScale()",
    "** _Returns:_ *number* _scale_",
    "",
    "h3. Button",
    "* GetState()",
    "h2. Events",
  ].join("\n")
  expect(parseFunctions(dump).map((one) => one.name)).toEqual(["GetOpen", "GetUIGlobalScale"])
  const methods = parseObjects(dump).map((one) => [one.name, one.methods.map((m) => m.name)])
  expect(methods).toEqual([
    ["WindowManager", ["GetTopLevel"]],
    ["Button", ["GetState"]],
  ])
})

test("a section the dump does not carry is read as nothing", () => {
  expect(parseFunctions("no headings here")).toEqual([])
  expect(parseEvents("no headings here")).toEqual([])
  expect(parseObjects("no headings here")).toEqual([])
})
