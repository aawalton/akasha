const SINGLE_QUOTED = /'[^']*'/g

const DOUBLE_QUOTED = /"[^"]*"/g

const SEPARATOR = /[|;&]{1,2}/g

const LEADING_SPACE = /^\s+/

const CONTINUED = /\\\n/g

export function joinedContinuations(command: string): string {
  return command.replace(CONTINUED, " ")
}

export function dequoted(command: string): string {
  return command
    .split("\n")
    .map((line) => line.replace(SINGLE_QUOTED, "").replace(DOUBLE_QUOTED, ""))
    .join("\n")
}

export function segmentsOf(command: string): readonly string[] {
  return dequoted(command)
    .split("\n")
    .map((line) => line.replace(SEPARATOR, "\n"))
    .join("\n")
    .split("\n")
    .map((segment) => segment.replace(LEADING_SPACE, ""))
    .filter((segment) => segment !== "")
}

export function wordsOf(segment: string): readonly string[] {
  return segment.split(/\s+/).filter((word) => word !== "")
}
