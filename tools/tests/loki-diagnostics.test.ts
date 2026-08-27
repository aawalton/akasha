import { describe, expect, it } from "bun:test"
import { chooseLogsDiagnostic, describeBounds, type LogsDiagnosticArgs } from "../lib/loki-diagnostics.ts"

const COMPLETE: LogsDiagnosticArgs = {
  command: "loki-cli logs",
  pod: "worker-runtime",
  namespace: "workers",
  since: "1h",
  lineCount: 12,
  isDone: true,
  limit: 500,
  olderLinesBeforeWindow: false,
  retentionLabel: "7d",
  otherNamespaces: [],
}

describe("chooseLogsDiagnostic — the negative control", () => {
  it("nothing bounded the output → no marker at all", () => {
    expect(chooseLogsDiagnostic(COMPLETE)).toBeNull()
  })

  it("a complete fetch stays silent regardless of how large the limit was", () => {
    expect(chooseLogsDiagnostic({ ...COMPLETE, limit: 5000, lineCount: 4999 })).toBeNull()
  })
})

describe("chooseLogsDiagnostic — the --limit bound", () => {
  it("limit hit → marker names the limit, the window, and both remedies", () => {
    const d = chooseLogsDiagnostic({ ...COMPLETE, lineCount: 500, isDone: false })
    expect(d?.kind).toBe("truncated")
    expect(d?.message).toContain("BOUNDED OUTPUT")
    expect(d?.message).toContain("500")
    expect(d?.message).toContain("1h")
    expect(d?.message).toContain("--all")
    expect(d?.message).toContain("--since")
    expect(d?.message).toContain("NOT evidence of absence")
  })
})

describe("chooseLogsDiagnostic — the --since bound (previously silent)", () => {
  it("window clipped the log → marker fires even though isDone is true", () => {
    const d = chooseLogsDiagnostic({ ...COMPLETE, olderLinesBeforeWindow: true })
    expect(d?.kind).toBe("window-clipped")
    expect(d?.message).toContain("BOUNDED OUTPUT")
    expect(d?.message).toContain("older than the --since window")
    expect(d?.message).toContain("7d")
    expect(d?.message).toContain("NOT evidence of absence")
  })

  it("olderLinesBeforeWindow is the ONLY difference between silence and the marker", () => {
    expect(chooseLogsDiagnostic({ ...COMPLETE, olderLinesBeforeWindow: false })).toBeNull()
    expect(chooseLogsDiagnostic({ ...COMPLETE, olderLinesBeforeWindow: true })).not.toBeNull()
  })

  it("probe could not run → reports undetermined rather than claiming completeness", () => {
    const d = chooseLogsDiagnostic({ ...COMPLETE, olderLinesBeforeWindow: null })
    expect(d?.kind).toBe("window-undetermined")
    expect(d?.message).toContain("BOUNDED OUTPUT (undetermined)")
    expect(d?.message).toContain("NOT evidence of absence")
  })
})

describe("chooseLogsDiagnostic — precedence", () => {
  it("a limit hit short-circuits the window question, and its remedy names both levers", () => {
    const d = chooseLogsDiagnostic({
      ...COMPLETE,
      lineCount: 500,
      isDone: false,
      olderLinesBeforeWindow: null,
    })
    expect(d?.kind).toBe("truncated")
    expect(d?.message).not.toContain("undetermined")
    expect(d?.message).toContain("--all")
    expect(d?.message).toContain("wider --since")
  })

  it("zero results resolve to zero-result even if isDone were false", () => {
    const d = chooseLogsDiagnostic({ ...COMPLETE, lineCount: 0, isDone: false })
    expect(d?.kind).toBe("zero-result")
  })
})

describe("chooseLogsDiagnostic — zero results", () => {
  const EMPTY = { ...COMPLETE, lineCount: 0, pod: "worker-supervisor", namespace: "ci" }

  it("empty and genuinely nothing older → states the emptiness, claims no bound", () => {
    const d = chooseLogsDiagnostic(EMPTY)
    expect(d?.kind).toBe("zero-result")
    expect(d?.message).toContain("worker-supervisor")
    expect(d?.message).toContain("ci")
    expect(d?.message).toContain("1h")
    expect(d?.message).not.toContain("Did you mean")
    expect(d?.message).not.toContain("BOUNDED OUTPUT")
  })

  it("empty ONLY because the window excluded them → says the window emptied it", () => {
    const d = chooseLogsDiagnostic({ ...EMPTY, olderLinesBeforeWindow: true })
    expect(d?.message).toContain("BOUNDED OUTPUT")
    expect(d?.message).toContain("older than the --since")
    expect(d?.message).toContain("7d")
    expect(d?.message).toContain("NOT evidence of absence")
  })

  it("empty and the probe failed → refuses to present the emptiness as absence", () => {
    const d = chooseLogsDiagnostic({ ...EMPTY, olderLinesBeforeWindow: null })
    expect(d?.message).toContain("undetermined")
    expect(d?.message).toContain("NOT evidence of absence")
  })

  it("prefix has streams elsewhere → did-you-mean names the other namespace", () => {
    const d = chooseLogsDiagnostic({ ...EMPTY, otherNamespaces: ["workers"] })
    expect(d?.message).toContain("Did you mean --namespace workers?")
  })

  it("multiple candidate namespaces → suggests the first, lists all", () => {
    const d = chooseLogsDiagnostic({ ...EMPTY, otherNamespaces: ["default", "workers"] })
    expect(d?.message).toContain("Did you mean --namespace default?")
    expect(d?.message).toContain("default, workers")
  })
})

describe("chooseLogsDiagnostic — the marker names the command that produced it", () => {
  it.each([["loki-cli logs"], ["loki-cli tail"]])("%s prefixes its own diagnostics", (command) => {
    const truncated = chooseLogsDiagnostic({
      ...COMPLETE,
      command,
      lineCount: 500,
      isDone: false,
    })
    const clipped = chooseLogsDiagnostic({ ...COMPLETE, command, olderLinesBeforeWindow: true })
    const empty = chooseLogsDiagnostic({ ...COMPLETE, command, lineCount: 0 })
    expect(truncated?.message.startsWith(`${command}:`)).toBe(true)
    expect(clipped?.message.startsWith(`${command}:`)).toBe(true)
    expect(empty?.message.startsWith(`${command}:`)).toBe(true)
  })
})

describe("describeBounds — the --json twin of the stderr marker", () => {
  it("nothing bound the output → complete, with an empty reason list", () => {
    expect(describeBounds({ isDone: true, olderLinesBeforeWindow: false })).toEqual({
      complete: true,
      boundedBy: [],
    })
  })

  it("limit bound → not complete, reason names the limit", () => {
    expect(describeBounds({ isDone: false, olderLinesBeforeWindow: false })).toEqual({
      complete: false,
      boundedBy: ["limit"],
    })
  })

  it("window bound → not complete even though isDone is true", () => {
    expect(describeBounds({ isDone: true, olderLinesBeforeWindow: true })).toEqual({
      complete: false,
      boundedBy: ["since"],
    })
  })

  it("undetermined → never reported as complete", () => {
    expect(describeBounds({ isDone: true, olderLinesBeforeWindow: null })).toEqual({
      complete: false,
      boundedBy: ["unknown"],
    })
  })

  it("a proven limit bound is not diluted by an unprobed window", () => {
    expect(describeBounds({ isDone: false, olderLinesBeforeWindow: null })).toEqual({
      complete: false,
      boundedBy: ["limit"],
    })
  })

  it("complete is true only when boundedBy is empty", () => {
    const cases = [
      { isDone: true, olderLinesBeforeWindow: false },
      { isDone: false, olderLinesBeforeWindow: false },
      { isDone: true, olderLinesBeforeWindow: true },
      { isDone: true, olderLinesBeforeWindow: null },
      { isDone: false, olderLinesBeforeWindow: null },
    ] as const
    for (const c of cases) {
      const r = describeBounds(c)
      expect(r.complete).toBe(r.boundedBy.length === 0)
    }
  })
})
