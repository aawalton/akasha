declare const TemperWrit_AutoQuest: ((this: void) => void) | undefined

interface LscSubCommand {
  AddAlias: (this: LscSubCommand, alias: string) => void
  SetCallback: (this: LscSubCommand, callback: (this: void) => void) => void
  SetDescription: (this: LscSubCommand, description: string) => void
}

interface LscRegisteredCommand {
  RegisterSubCommand: (this: LscRegisteredCommand) => LscSubCommand
}
