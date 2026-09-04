interface CompanionsConfigGlobal {
  readonly version: number
  readonly companionTargetBuilds?: Record<number, string>
  readonly companionTargetTimestamps?: Record<number, number>
}

declare var TemperCompanionsConfig: CompanionsConfigGlobal | undefined

declare var Temper_SavedVariables: unknown
