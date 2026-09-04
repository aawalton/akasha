interface GroupBroadcastNumericFieldOptions {
  minValue: number
  maxValue: number
}

interface GroupBroadcastField {
  readonly fieldName: string
}

interface GroupBroadcastFinalizeOptions {
  isRelevantInCombat: boolean
  replaceQueuedMessages: boolean
}

interface GroupBroadcastProtocol {
  AddField: (this: GroupBroadcastProtocol, field: GroupBroadcastField) => void
  OnData: (
    this: GroupBroadcastProtocol,
    callback: (this: void, ...values: readonly number[]) => void
  ) => void
  Finalize: (this: GroupBroadcastProtocol, options: GroupBroadcastFinalizeOptions) => boolean
  Send: (this: GroupBroadcastProtocol, payload: Record<string, number>) => void
}

interface GroupBroadcastHandler {
  SetDisplayName: (this: GroupBroadcastHandler, name: string) => void
  SetDescription: (this: GroupBroadcastHandler, description: string) => void
  DeclareProtocol: (this: GroupBroadcastHandler, id: number, name: string) => GroupBroadcastProtocol
}

interface GroupBroadcastLibrary {
  RegisterHandler: (this: GroupBroadcastLibrary, name: string) => GroupBroadcastHandler
  CreateNumericField: (
    this: GroupBroadcastLibrary,
    name: string,
    options: GroupBroadcastNumericFieldOptions
  ) => GroupBroadcastField
}

declare const LibGroupBroadcast: GroupBroadcastLibrary | undefined
