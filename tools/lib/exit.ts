export const EXIT = {
  OK: 0,
  INPUT: 1,
  DATA: 2,
  OPERATIONAL: 3,
  UNCLASSIFIED: 70,
} as const

const CARRIES_A_CODE: ReadonlySet<string> = new Set([
  "ExitError",
  "CliError",
  "InputError",
  "DataError",
  "OperationalError",
])

export class ExitError extends Error {
  readonly code: number

  constructor(message: string, code: number) {
    super(message)
    this.name = "ExitError"
    this.code = code
  }
}

export function inputError(message: string): ExitError {
  return new ExitError(message, EXIT.INPUT)
}

export function dataError(message: string): ExitError {
  return new ExitError(message, EXIT.DATA)
}

export function operationalError(message: string): ExitError {
  return new ExitError(message, EXIT.OPERATIONAL)
}

export function cliError(message: string, code: number): ExitError {
  return new ExitError(message, code)
}

export function exitCodeOf(thrown: unknown): number {
  if (!(thrown instanceof Error) || !CARRIES_A_CODE.has(thrown.name)) return EXIT.UNCLASSIFIED
  const code = (thrown as { readonly code?: unknown }).code
  return typeof code === "number" ? code : EXIT.UNCLASSIFIED
}

export function isInputError(thrown: unknown): boolean {
  return exitCodeOf(thrown) === EXIT.INPUT
}

export function isDataError(thrown: unknown): boolean {
  return exitCodeOf(thrown) === EXIT.DATA
}

export function isOperationalError(thrown: unknown): boolean {
  return exitCodeOf(thrown) === EXIT.OPERATIONAL
}

export const UNCLASSIFIED_EXIT_HELP = {
  code: EXIT.UNCLASSIFIED,
  meaning:
    "unclassified error: the command threw something the CLI could not classify, so nothing is " +
    "established about what went wrong — not a caller mistake, and not a failure this command " +
    "knows how to have. An unhandled defect. Inherited by every ops command.",
}
