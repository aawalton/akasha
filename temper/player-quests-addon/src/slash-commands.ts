import { toggleAutoQuest, toggleAutoQuestDebug } from "./auto-quest/handler"

declare global {
  var TemperHud:
    | {
        registerCommand: (
          this: void,
          command: {
            name: string
            description: string
            addon: string
            handler?: (this: void, args: string) => undefined
          }
        ) => undefined
      }
    | undefined
}

export function registerSlashCommands(): undefined {
  SLASH_COMMANDS["/temperautoquest"] = toggleAutoQuest
  SLASH_COMMANDS["/temperautoquestdebug"] = toggleAutoQuestDebug

  globalThis.TemperHud?.registerCommand({
    name: "/temperautoquest",
    description: "Toggle auto-quest on/off",
    addon: "TemperQuests",
  })
  globalThis.TemperHud?.registerCommand({
    name: "/temperautoquestdebug",
    description: "Toggle auto-quest debug logging",
    addon: "TemperQuests",
  })
}
