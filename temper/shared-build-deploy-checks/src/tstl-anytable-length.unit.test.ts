import { describe, expect, test } from "bun:test"
import { scanBundle } from "./tstl-anytable-length"

describe("scanBundle — the #12742 reproduction", () => {
  const PRE_FIX = `function buildAppearanceSettings(self, settings, LibHarvensAddonSettings)
    do
        local Modes = asAnyTable({{name = "a", data = 1}, {name = "b", data = 2}})
        local ModeToData = asAnyTable({})
        for i = 1, asNumber(Modes.length) do
            ModeToData[i] = asAnyTableMember(Modes[i])
        end
    end
end`

  test("FIRES on Modes.length whose receiver is subscripted in scope", () => {
    const issues = scanBundle(PRE_FIX, "TemperVotansMiniMap.lua")
    expect(issues).toHaveLength(1)
    expect(issues[0]?.receiver).toBe("Modes")
  })

  test("FIRES on a cross-closure upvalue (callbacks: .length and [index] in sibling closures)", () => {
    const lua = `function setup()
    local callbacks
    local function Callback(index)
        local cb = callbacks and callbacks[index]
    end
    local function DoCallbacks(task)
        if callbacks == nil or asNumber(callbacks.length) == 0 then
            return
        end
        task:For(1, callbacks.length):Do(Callback)
    end
end`
    const issues = scanBundle(lua, "TemperVotansMiniMap.lua")
    expect(issues).toHaveLength(2)
    for (const i of issues) expect(i.receiver).toBe("callbacks")
  })
})

describe("scanBundle — genuine record .length fields are not flagged", () => {
  test("OK: ArrayShape.length — receiver field-accessed only, never subscripted", () => {
    const lua = `function encodeValue(value)
    local shape = classifyShape(value)
    if shape.isArray then
        local parts = {}
        for i = 1, shape.length do
            parts[i] = encodeValue(value[i])
        end
    end
end`
    expect(scanBundle(lua, "TemperInventory.lua")).toHaveLength(0)
  })

  test("OK: optional-chain temp .length on a record (LibDataEncode controlCharConfig)", () => {
    const lua = `DecodeStringId = function(self, controlChar)
    local ____opt_0 = controlCharConfig[controlChar]
    local length = ____opt_0 and ____opt_0.length
    local encodedItem = self:GetEncodedItem(length)
end`
    expect(scanBundle(lua, "LibDataEncode.lua")).toHaveLength(0)
  })
})

describe("scanBundle — function-scope isolation (file-wide would false-positive)", () => {
  test("OK: same temp name, record-field in one fn, subscripted in another", () => {
    const lua = `function A()
    local ____opt_0 = registry[key]
    local n = ____opt_0 and ____opt_0.length
    return n
end
function B()
    local ____opt_0 = otherTable
    local v = ____opt_0[idx]
    return v
end`
    expect(scanBundle(lua, "Big.lua")).toHaveLength(0)
  })

  test("FIRES only for the scope where the receiver is actually subscripted", () => {
    const lua = `function A()
    local q = makeRecord()
    local n = q.length
    return n
end
function B()
    local q = makeSeq()
    for i = 1, q.length do
        use(q[i])
    end
end`
    const issues = scanBundle(lua, "Big.lua")
    expect(issues).toHaveLength(1)
    expect(issues[0]?.line).toBe(8)
  })
})

describe("scanBundle — shape and comment edges", () => {
  test("a .length inside a Lua comment is ignored", () => {
    const lua = `function f()
    local Modes = makeSeq()
    -- motifKnowledge[styleId].length === Modes.length, a note
    return Modes[1]
end`
    expect(scanBundle(lua, "a.lua")).toHaveLength(0)
  })

  test("a real array length already lowered to #X carries no .length to flag", () => {
    const lua = `function f()
    local mapPins = getPins()
    for i = 1, #mapPins do
        use(mapPins[i])
    end
end`
    expect(scanBundle(lua, "a.lua")).toHaveLength(0)
  })

  test("clean bundle yields no issues", () => {
    const lua = `local x = 1\nlocal y = 2\nreturn x + y`
    expect(scanBundle(lua, "a.lua")).toHaveLength(0)
  })
})
