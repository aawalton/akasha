import type { TemperCommand } from "./types"

export interface CommandRegistry {
  register: (this: void, command: TemperCommand) => undefined
  list: (this: void) => readonly TemperCommand[]
  find: (this: void, name: string) => TemperCommand | undefined
}

export function createCommandRegistry(): CommandRegistry {
  const commands: TemperCommand[] = []

  function register(command: TemperCommand): undefined {
    const existing = commands.findIndex((c) => c.name === command.name)
    if (existing >= 0) {
      commands[existing] = command
      return
    }
    commands.push(command)
  }

  function list(): readonly TemperCommand[] {
    return commands
  }

  function find(name: string): TemperCommand | undefined {
    return commands.find((c) => c.name === name)
  }

  return { register, list, find }
}
