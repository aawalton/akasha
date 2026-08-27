import { describe, expect, test } from "bun:test"
import { scanBundle } from "./tstl-range-double-shift"

describe("scanBundle — the #12738 reproduction", () => {
  const PRE_FIX = `AddonSettings.AddSettings = function(self, params, index, playAnimation)
    local ret = {}
    local indexes = {}
    for i = 1, #params do
        local setting, settingIndex = self:AddSetting(asSettingParams(params[i + 1]), index, playAnimation)
        ret[i + 1] = setting
        indexes[i + 1] = settingIndex
    end
    return ret, indexes
end`

  test("FIRES on each [i + 1] subscript inside for i = 1, #params do", () => {
    const issues = scanBundle(PRE_FIX, "LibHarvensAddonSettings.lua")
    expect(issues).toHaveLength(3)
    expect(issues.map((i) => i.arrayText).sort()).toEqual(["indexes", "params", "ret"])
    for (const i of issues) {
      expect(i.loopVar).toBe("i")
      expect(i.bound).toBe("#params")
    }
  })
})

describe("scanBundle — correct emissions are not flagged", () => {
  test("OK: bare arr[i] (source arr[i - 1], or an AnyTable) emits no + 1", () => {
    const lua = `for i = 1, #mapPins do
    local name = mapPins[i]
    use(name)
end`
    expect(scanBundle(lua, "a.lua")).toHaveLength(0)
  })

  test("OK: AnyTable with .length bound and bare [i] (Votans Modes shape)", () => {
    const lua = `for i = 1, #Modes do
    ModeToData[i] = asAnyTableMember(Modes[i])
end`
    expect(scanBundle(lua, "a.lua")).toHaveLength(0)
  })

  test("OK: skip-receiver idiom — bound #args - 1 excludes [i + 1]", () => {
    const lua = `for i = 1, #hookArgs - 1 do
    methodArgs[#methodArgs + 1] = hookArgs[i + 1]
end`
    expect(scanBundle(lua, "a.lua")).toHaveLength(0)
  })

  test("OK: 0-based loop legitimately uses [i + 1] (TSTL __TS__Spread)", () => {
    const lua = `for i = 0, #iterable - 1 do
    strArr[i + 1] = __TS__StringAccess(iterable, i)
end`
    expect(scanBundle(lua, "a.lua")).toHaveLength(0)
  })

  test("OK: a function(i) param with [i + 1] is not a for-loop counter", () => {
    const lua = `for j = 1, #cats do
    use(cats[j])
end
task:For(1, numEvents):Do(function(i)
    local entry = events[i + 1]
end)`
    expect(scanBundle(lua, "a.lua")).toHaveLength(0)
  })
})

describe("scanBundle — the generic-for form (#16024 reproduction)", () => {
  const LIBSETS_PRE_FIX = `local possibleSetSearchFavoriteCategoriesSorted = {}
for index, setSearchFavoriteCategory in ipairs(possibleSetSearchFavoriteCategoriesForSort) do
    possibleSetSearchFavoriteCategoriesSorted[index + 1] = {
        category = setSearchFavoriteCategory
    }
end`

  test("FIRES on the write that leaves Lua key 1 nil", () => {
    const issues = scanBundle(LIBSETS_PRE_FIX, "LibSets.lua")
    expect(issues).toHaveLength(1)
    expect(issues[0]?.loopVar).toBe("index")
    expect(issues[0]?.arrayText).toBe("possibleSetSearchFavoriteCategoriesSorted")
    expect(issues[0]?.bound).toBe("ipairs(possibleSetSearchFavoriteCategoriesForSort)")
  })

  test("FIRES on a READ shifted one slot late, through a nested iterator call", () => {
    const lua = `for langIdx, cleanTranslatedSetName in ipairs(asStringArray(otherLanguagesSetName)) do
    local lang = supportedLanguagesIndex[langIdx + 1]
end`
    const issues = scanBundle(lua, "LibSets.lua")
    expect(issues).toHaveLength(1)
    expect(issues[0]?.arrayText).toBe("supportedLanguagesIndex")
  })

  test("FIRES on the LibZone twin", () => {
    const lua = `for langIdx, lang in ipairs(supportedLanguages) do
    otherLanguagesZoneName[langIdx + 1] = otherLanguageZoneName
end`
    expect(scanBundle(lua, "LibZone.lua")).toHaveLength(1)
  })

  test("FIRES on pairs() too — it also yields raw keys", () => {
    const lua = `for k, v in pairs(src) do
    dest[k + 1] = v
end`
    expect(scanBundle(lua, "a.lua")).toHaveLength(1)
  })

  test("OK: a VALUE binding holding a 0-based number is not the key (TemperCombat)", () => {
    const lua = `for k, castindex in ipairs(started) do
    local cast = castData[castindex + 1]
end`
    expect(scanBundle(lua, "TemperCombat.lua")).toHaveLength(0)
  })

  test("OK: an index-signature target gets no + 1, so nothing to flag", () => {
    const lua = `for langIdx, lang in ipairs(supportedLanguagesIndex) do
    otherLanguagesSetName[langIdx] = asString(otherLanguageSetName)
end`
    expect(scanBundle(lua, "LibSets.lua")).toHaveLength(0)
  })

  test("OK: the correct append idiom is untouched", () => {
    const lua = `for _, supportedLanguage in ipairs(langs) do
    supportedLanguagesIndex[#supportedLanguagesIndex + 1] = tostring(supportedLanguage)
end`
    expect(scanBundle(lua, "LibSets.lua")).toHaveLength(0)
  })

  test("an inner 0-based loop re-binding the key ends the outer reach", () => {
    const lua = `for i, row in ipairs(outer) do
    for i = 0, #inner - 1 do
        use(inner[i + 1])
    end
end`
    expect(scanBundle(lua, "a.lua")).toHaveLength(0)
  })

  test("a shared key name across nested generic-fors is reported ONCE", () => {
    const lua = `for i, row in ipairs(outer) do
    for i, cell in ipairs(inner) do
        use(cell[i + 1])
    end
end`
    expect(scanBundle(lua, "a.lua")).toHaveLength(1)
  })
})

describe("scanBundle — scope and shape edges", () => {
  test("body is delimited by indentation (dedent ends the loop)", () => {
    const lua = `for i = 1, #rows do
    use(rows[i + 1])
end
local other = pool[i + 1]`
    const issues = scanBundle(lua, "a.lua")
    expect(issues).toHaveLength(1)
    expect(issues[0]?.arrayText).toBe("rows")
  })

  test("an inner loop re-binding the counter ends the outer reach", () => {
    const lua = `for i = 1, #outer do
    for i = 0, #inner - 1 do
        use(inner[i + 1])
    end
end`
    expect(scanBundle(lua, "a.lua")).toHaveLength(0)
  })

  test("the re-bind stops mattering where its block ends — inner for", () => {
    const lua = `for i = 1, #arr do
    for i = 0, #inner - 1 do
        use(inner[i + 1])
    end
    arr[i + 1] = 5
end`
    const issues = scanBundle(lua, "a.lua")
    expect(issues).toHaveLength(1)
    expect(issues[0]?.arrayText).toBe("arr")
    expect(issues[0]?.line).toBe(5)
  })

  test("the re-bind stops mattering where its block ends — local in an if", () => {
    const lua = `for i = 1, #arr do
    if cond then
        local i = 7
        use(i)
    end
    arr[i + 1] = 5
end`
    const issues = scanBundle(lua, "a.lua")
    expect(issues).toHaveLength(1)
    expect(issues[0]?.arrayText).toBe("arr")
    expect(issues[0]?.line).toBe(6)
  })

  test("a local re-bind DOES shadow the rest of its own block", () => {
    const lua = `for i = 1, #arr do
    local i = compute()
    if cond then
        use(arr[i + 1])
    end
end`
    expect(scanBundle(lua, "a.lua")).toHaveLength(0)
  })

  test("member-expression arrays are captured (this.queue[i + 1])", () => {
    const lua = `for i = 1, #self.queue do
    use(self.queue[i + 1])
end`
    const issues = scanBundle(lua, "a.lua")
    expect(issues).toHaveLength(1)
    expect(issues[0]?.arrayText).toBe("self.queue")
  })

  test("clean bundle yields no issues", () => {
    const lua = `local x = 1\nlocal y = 2\nreturn x + y`
    expect(scanBundle(lua, "a.lua")).toHaveLength(0)
  })
})
