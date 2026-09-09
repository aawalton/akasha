import type {
  AutoCompleteProvider,
  Command,
} from "../slash-commander-types/slash-commander-types.module.code.ts"

export function asCommand(value: unknown): Command {
  return value as Command
}

export type CommandMeta = Record<string, unknown>

export function asCommandMeta(value: unknown): CommandMeta {
  return value as CommandMeta
}

export type AnyRecord = Record<string, unknown>

export function asAnyRecord(value: unknown): AnyRecord {
  return value as AnyRecord
}

export type VarargFn = (this: void, ...args: unknown[]) => unknown

export function asVarargFn(value: unknown): VarargFn {
  return value as VarargFn
}

export type Validator = (this: void, value: unknown) => boolean

export function asValidator(value: unknown): Validator {
  return value as Validator
}

export type CallableCommand = (this: void, input?: string) => void

export function asCallableCommand(value: unknown): CallableCommand {
  return value as CallableCommand
}

export type PreHookHandler = (this: void, ...args: unknown[]) => unknown

export function asPreHookHandler(value: unknown): PreHookHandler {
  return value as PreHookHandler
}

export function asAutoCompleteProvider(value: unknown): AutoCompleteProvider {
  return value as AutoCompleteProvider
}

export type CommandAliasMap = Record<string, Command>

export function asCommandAliasMap(value: unknown): CommandAliasMap {
  return value as CommandAliasMap
}

export type OptionalString = string | undefined

export function asOptionalString(value: unknown): OptionalString {
  return value as OptionalString
}

export type StringArray = readonly string[]

export function asStringArray(value: unknown): StringArray {
  return value as StringArray
}

export type DescriptionThunk = (this: void) => string

export function asDescriptionThunk(value: unknown): DescriptionThunk {
  return value as DescriptionThunk
}
