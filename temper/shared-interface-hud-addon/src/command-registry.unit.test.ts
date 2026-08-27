import { describe, expect, test } from "bun:test"
import { createCommandRegistry } from "./command-registry"
import type { TemperCommand } from "./types"

const command = (name: string, addon = "TemperHud", description = ""): TemperCommand => {
  return { name, description, addon, handler: () => undefined }
}

describe("createCommandRegistry", () => {
  test("an empty registry lists nothing and finds nothing", () => {
    const reg = createCommandRegistry()
    expect(reg.list()).toEqual([])
    expect(reg.find("help")).toBeUndefined()
  })

  test("commands list in registration order (help grouping relies on it)", () => {
    const reg = createCommandRegistry()
    reg.register(command("help"))
    reg.register(command("inventory", "TemperInventory"))
    reg.register(command("characters", "TemperCharacters"))
    expect(reg.list().map((c) => c.name)).toEqual(["help", "inventory", "characters"])
  })

  test("re-registering a name replaces the prior command in place, keeping position", () => {
    const reg = createCommandRegistry()
    reg.register(command("help"))
    reg.register(command("inventory", "TemperInventory", "old"))
    reg.register(command("inventory", "TemperInventory", "new"))
    const commands = reg.list()
    expect(commands.map((c) => c.name)).toEqual(["help", "inventory"])
    expect(reg.find("inventory")?.description).toBe("new")
  })

  test("find returns the registered command by name, undefined when absent", () => {
    const reg = createCommandRegistry()
    reg.register(command("characters", "TemperCharacters"))
    expect(reg.find("characters")?.addon).toBe("TemperCharacters")
    expect(reg.find("nope")).toBeUndefined()
  })

  test("catalog entries (no handler) coexist with subcommands in list order", () => {
    const reg = createCommandRegistry()
    reg.register(command("inventory", "TemperInventory"))
    reg.register({ name: "/temperinv", description: "manual scan", addon: "TemperInventory" })
    const commands = reg.list()
    expect(commands.map((c) => c.name)).toEqual(["inventory", "/temperinv"])
    expect(commands[0]?.handler).toBeDefined()
    expect(commands[1]?.handler).toBeUndefined()
  })
})
