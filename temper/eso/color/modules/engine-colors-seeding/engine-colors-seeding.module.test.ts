import { describe, expect, test } from "bun:test"
import {
  colorsLua,
  engineColorsTable,
} from "akasha/temper/eso/color/modules/engine-colors-seeding/engine-colors-seeding.module.code.ts"
import { makeLuaVm } from "akasha/temper/eso/lua-runner/modules/lua-vm/lua-vm.module.code.ts"

const HELD = {
  apiVersion: 101050,
  colors: { "1": { "4": [0.6, 0.2, 0.9, 1] as const } },
}

describe("colorsLua", () => {
  test("answers the captured color for a type and field", async () => {
    const vm = await makeLuaVm()
    try {
      await vm.run(colorsLua(HELD))
      expect(await vm.run("return table.concat({GetInterfaceColor(1, 4)}, ',')")).toBe(
        "0.6,0.2,0.9,1"
      )
    } finally {
      await vm.close()
    }
  })

  test("answers white where the capture holds no color", async () => {
    const vm = await makeLuaVm()
    try {
      await vm.run(colorsLua(HELD))
      expect(await vm.run("return table.concat({GetInterfaceColor(7, 0)}, ',')")).toBe("1,1,1,1")
    } finally {
      await vm.close()
    }
  })
})

describe("engineColorsTable", () => {
  test("reads the table akasha holds", () => {
    expect(typeof engineColorsTable().colors).toBe("object")
  })
})
