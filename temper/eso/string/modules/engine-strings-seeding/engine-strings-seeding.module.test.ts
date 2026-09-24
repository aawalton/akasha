import { describe, expect, test } from "bun:test"
import { makeLuaVm } from "akasha/temper/eso/lua-runner/modules/lua-vm/lua-vm.module.code.ts"
import {
  engineStringsTable,
  stringsLua,
} from "akasha/temper/eso/string/modules/engine-strings-seeding/engine-strings-seeding.module.code.ts"

const HELD = {
  apiVersion: 101050,
  strings: { SI_DIALOG_ACCEPT: "Accept", SI_ITEMTYPE2: "Armor" },
}

const NUMBERED = "SI_DIALOG_ACCEPT = 40 SI_ITEMTYPE2 = 77"

async function answered(asked: string): Promise<unknown> {
  const vm = await makeLuaVm()
  try {
    await vm.run(NUMBERED)
    await vm.run(stringsLua(HELD))
    return await vm.run(asked)
  } finally {
    await vm.close()
  }
}

describe("stringsLua", () => {
  test("answers the captured text for a string's number", async () => {
    expect(await answered("return GetString(40)")).toBe("Accept")
  })

  test("answers the captured text for a name's prefix and the number after it", async () => {
    expect(await answered('return GetString("SI_ITEMTYPE", 2)')).toBe("Armor")
  })

  test("answers the empty string where the capture holds no text", async () => {
    expect(await answered("return GetString(9999)")).toBe("")
  })
})

describe("engineStringsTable", () => {
  test("reads the table akasha holds", () => {
    expect(typeof engineStringsTable().strings).toBe("object")
  })
})
