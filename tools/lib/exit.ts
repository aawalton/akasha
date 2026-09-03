import {
  DataError,
  EXIT,
  exitCodeForThrowable,
  InputError,
  OperationalError,
} from "@akasha/errors-core/exit-code"

export { EXIT }

export function inputError(message: string): InputError {
  return new InputError(message)
}

export function dataError(message: string): DataError {
  return new DataError(message)
}

export function operationalError(message: string): OperationalError {
  return new OperationalError(message)
}

export function exitCodeOf(thrown: unknown): number {
  return exitCodeForThrowable(thrown)
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
