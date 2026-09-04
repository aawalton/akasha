export type OutcomeVerdict = "pass" | "fail" | "advisory" | "not-applicable"

export interface Population {
  readonly measured: number
  readonly unit: string
}

export function over(measured: number, unit: string): Population {
  return { measured, unit }
}

export interface Outcome {
  readonly name: string
  readonly verdict: OutcomeVerdict
  readonly detail: string
  readonly messages: readonly string[]
  readonly population?: Population
  readonly elapsedMs?: number
  readonly bandReplaced?: OutcomeVerdict
}

export function judge(name: string, detail: string, messages: readonly string[]): Outcome {
  return {
    name,
    verdict: messages.length === 0 ? "pass" : "fail",
    detail,
    messages,
  }
}

export function advise(name: string, detail: string, notices: readonly string[]): Outcome {
  return { name, verdict: notices.length === 0 ? "pass" : "advisory", detail, messages: notices }
}

export function skip(name: string, detail: string): Outcome {
  return { name, verdict: "not-applicable", detail, messages: [] }
}

function pad(text: string, width: number): string {
  return text.length >= width ? `${text} ` : text + " ".repeat(width - text.length)
}

export function render(outcomes: readonly Outcome[]): readonly string[] {
  const lines: string[] = []
  for (const each of outcomes) {
    const searched =
      each.population === undefined
        ? ""
        : `[over ${each.population.measured} ${each.population.unit}] `
    lines.push(`  ${pad(`[${each.name}]`, 21)}${pad(each.verdict, 16)}${searched}${each.detail}`)
    for (const message of each.messages)
      for (const line of message.split("\n")) lines.push(line === "" ? "" : `      ${line}`)
  }
  return lines
}

export function refusals(outcomes: readonly Outcome[]): readonly string[] {
  return outcomes.flatMap((each) => (each.verdict === "fail" ? each.messages : []))
}

export function anyRefused(outcomes: readonly Outcome[]): boolean {
  return outcomes.some((each) => each.verdict === "fail")
}
