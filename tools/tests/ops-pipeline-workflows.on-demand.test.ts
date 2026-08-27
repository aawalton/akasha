import { beforeEach, describe, expect, mock, test } from "bun:test"
import type * as PipelinePages from "../lib/pipeline-pages/read.ts"

const PAGES = "../lib/pipeline-pages/read.ts"

const UNAVAILABLE = "unavailable"

type Row = Record<string, unknown>

const real = (await import(PAGES)) as typeof PipelinePages

let rows: readonly Row[] = []
let askedStatus: string | undefined

mock.module(PAGES, () => ({
  ...real,
  getPipelineBySeq: (): Row => ({ seq: 8200 }),
  listWorkflowsForPipeline: (
    _roots: unknown,
    args: { readonly status?: string }
  ): readonly Row[] => {
    askedStatus = args.status
    return rows
  },
}))

const workflowsModule = await import("../commands/pipeline/workflows.ts")
const pipelineWorkflows = workflowsModule.default

const { commandDocuments } = await import("../ops/documented.ts")
const documented =
  commandDocuments().find((one) => one.path.join(" ") === "pipeline workflows")?.help ?? ""

const COLUMNS: readonly string[] = (/Columns: ([^.\n]+)\./.exec(documented)?.[1] ?? "")
  .split(",")
  .map((name) => name.trim())

type Write = typeof process.stdout.write

async function printed(args: readonly string[]): Promise<string> {
  const chunks: string[] = []
  const original: Write = process.stdout.write.bind(process.stdout)
  process.stdout.write = ((chunk: string | Uint8Array): boolean => {
    chunks.push(typeof chunk === "string" ? chunk : new TextDecoder().decode(chunk))
    return true
  }) as Write
  try {
    await pipelineWorkflows(args)
  } finally {
    process.stdout.write = original
  }
  return chunks.join("")
}

async function oneRow(row: Row): Promise<readonly string[]> {
  rows = [row]
  const out = await printed(["--seq", "8200"])
  return out.replace(/\n$/, "").split("\t")
}

async function cell(row: Row, column: string): Promise<string | undefined> {
  return (await oneRow(row))[COLUMNS.indexOf(column)]
}

interface Projection {
  readonly failedSteps: readonly string[] | null
  readonly blockedSteps: readonly string[] | null
}

async function projected(row: Row): Promise<Projection & Record<string, unknown>> {
  rows = [row]
  const out = await printed(["--seq", "8200", "--json"])
  const parsed = JSON.parse(out) as (Projection & Record<string, unknown>)[]
  const first = parsed[0]
  if (first === undefined) throw new Error("no row was projected")
  return first
}

beforeEach(() => {
  rows = []
  askedStatus = undefined
})

describe("ops pipeline workflows — the documented column set", () => {
  test("the help names six columns, ending in the combined reason", () => {
    expect(COLUMNS).toEqual([
      "name",
      "kind",
      "status",
      "failedSteps",
      "blockedSteps",
      "reason",
    ])
  })

  test("an all-absent row and a populated one both emit one cell per column", async () => {
    expect(await oneRow({ workflowName: "checks" })).toHaveLength(COLUMNS.length)
    expect(
      await oneRow({
        workflowName: "checks",
        kind: "check",
        status: "blocked",
        failedSteps: ["check-lint"],
        blockedSteps: [],
        failedDependency: "checks",
      })
    ).toHaveLength(COLUMNS.length)
  })

  test("an empty result prints nothing at all", async () => {
    rows = []
    expect(await printed(["--seq", "8200"])).toBe("")
  })

  test("--status is handed to the query rather than filtered after the read", async () => {
    rows = []
    await printed(["--seq", "8200", "--status", "failed"])
    expect(askedStatus).toBe("failed")
  })
})

describe("ops pipeline workflows — absent, empty and populated are three states", () => {
  test("an absent step list projects as null, never as a count or an empty list", async () => {
    expect((await projected({ workflowName: "checks" })).failedSteps).toBeNull()
  })

  test("a rollup that ran and found nothing negative projects as an empty list", async () => {
    expect((await projected({ workflowName: "checks", failedSteps: [] })).failedSteps).toEqual([])
  })

  test("a rollup that found failures projects the real names, in order", async () => {
    const row = await projected({
      workflowName: "checks",
      failedSteps: ["check-typesafety-bundle-apps", "check-lint"],
    })
    expect(row.failedSteps).toEqual(["check-typesafety-bundle-apps", "check-lint"])
  })

  test("non-string elements are dropped at the JSON boundary", async () => {
    const row = await projected({ workflowName: "checks", failedSteps: ["a", 1, null, "b"] })
    expect(row.failedSteps).toEqual(["a", "b"])
  })

  test("a row carrying no blockedSteps attribute projects null, as no writer produces one", async () => {
    expect((await projected({ workflowName: "checks", failedSteps: [] })).blockedSteps).toBeNull()
  })

  test("the absent-when-absent fields are OMITTED from the JSON rather than nulled", async () => {
    const row = await projected({ workflowName: "checks" })
    expect(Object.hasOwn(row, "failedSteps")).toBe(true)
    expect(Object.hasOwn(row, "blockedSteps")).toBe(true)
    expect(Object.hasOwn(row, "skipReason")).toBe(false)
    expect(Object.hasOwn(row, "failedDependency")).toBe(false)
  })
})

describe("ops pipeline workflows — the TSV cells for those three states", () => {
  test("an absent list reads unavailable, not 0 and not blank", async () => {
    expect(await cell({ workflowName: "checks" }, "failedSteps")).toBe(UNAVAILABLE)
  })

  test("a present-but-empty list reads blank, which is distinct from unavailable", async () => {
    const blank = await cell({ workflowName: "checks", failedSteps: [] }, "failedSteps")
    expect(blank).toBe("")
    expect(blank).not.toBe(UNAVAILABLE)
  })

  test("populated names join on a bare comma", async () => {
    const joined = await cell(
      { workflowName: "checks", failedSteps: ["check-typesafety-bundle-apps", "check-lint"] },
      "failedSteps"
    )
    expect(joined).toBe("check-typesafety-bundle-apps,check-lint")
  })

  test("whitespace inside a name collapses, so no cell can carry a tab or a newline", async () => {
    const collapsed = await cell(
      { workflowName: "checks", failedSteps: ["check\tone", "check\ntwo"] },
      "failedSteps"
    )
    expect(collapsed).toBe("check one,check two")
  })
})

describe("ops pipeline workflows — the combined reason", () => {
  test("skipReason is preferred when both are somehow present", async () => {
    const reason = await cell(
      { workflowName: "checks", skipReason: "deploy-ref-match", failedDependency: "checks" },
      "reason"
    )
    expect(reason).toBe("deploy-ref-match")
  })

  test("failedDependency carries the reason when skipReason is absent", async () => {
    expect(await cell({ workflowName: "checks", failedDependency: "checks" }, "reason")).toBe(
      "checks"
    )
  })

  test("neither present reads empty rather than a placeholder", async () => {
    expect(await cell({ workflowName: "checks" }, "reason")).toBe("")
  })

  test("whitespace in the reason collapses, so it cannot break the grid", async () => {
    const reason = await cell(
      { workflowName: "checks", skipReason: "deploy-ref-match:\tbranch\nmain" },
      "reason"
    )
    expect(reason).toBe("deploy-ref-match: branch main")
  })

  test("the failed step names and the reason ride the same row", async () => {
    const cells = await oneRow({
      workflowName: "checks",
      status: "blocked",
      failedSteps: ["check-lint"],
      failedDependency: "checks",
    })
    expect(cells[COLUMNS.indexOf("failedSteps")]).toBe("check-lint")
    expect(cells[COLUMNS.indexOf("reason")]).toBe("checks")
  })
})
