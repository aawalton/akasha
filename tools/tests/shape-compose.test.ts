
import { describe, expect, test } from "bun:test"
import { shape as s } from "../lib/shape.ts"
import { ShapeError } from "../lib/shape-core"
import { accepts, refusal, refuses } from "./shape-fixture.ts"

describe("union", () => {
  const verdict = s.union([
    s.object({ drive: s.literal("none") }),
    s.object({ drive: s.enum(["spawn-argv", "rail"]), notice: s.string().min(1) }),
  ])

  test("refuses what matches no arm", () => {
    for (const value of [
      {},
      null,
      "none",
      { drive: "other" },
      { drive: "rail" },
      { drive: "rail", notice: "" },
      { drive: "spawn-argv", notice: 1 },
    ]) {
      refuses(verdict, value)
    }
  })

  test("accepts each arm", () => {
    expect(accepts(verdict, { drive: "none" })).toEqual({ drive: "none" })
    expect(accepts(verdict, { drive: "rail", notice: "go" })).toEqual({ drive: "rail", notice: "go" })
    expect(accepts(verdict, { drive: "spawn-argv", notice: "go" })).toBeTruthy()
  })

  test("the first matching arm wins, and strips as it would on its own", () => {
    expect(accepts(verdict, { drive: "none", extra: 1 })).toEqual({ drive: "none" })
    expect(accepts(verdict, { drive: "none", notice: 1 })).toEqual({ drive: "none" })
  })
})

describe("discriminatedUnion", () => {
  const plan = s.discriminatedUnion("kind", [
    s.object({
      kind: s.literal("nudge"),
      reason: s.string(),
      nudge: s.string().refine((text) => text.trim() !== "", {
        message: "the nudge text is blank, which would reach the seat as an empty turn",
      }),
      floorMs: s.number().refine((ms) => Number.isFinite(ms) && ms > 0, {
        message: "the floor window is not a positive finite number, which would disable the floor",
      }),
    }),
    s.object({ kind: s.literal("hold"), reason: s.string() }),
    s.object({ kind: s.literal("wait"), reason: s.string() }),
  ])

  test("refuses an unknown discriminator, and complains at the discriminator", () => {
    expect(refusal(plan, { kind: "zzz", reason: "r" }).at).toBe("kind")
    expect(refusal(plan, { kind: "zzz", reason: "r" }).message).toBe(
      "Invalid discriminator value. Expected 'nudge' | 'hold' | 'wait'"
    )
  })

  test("refuses a missing or non-string discriminator", () => {
    expect(refusal(plan, { reason: "r" }).at).toBe("kind")
    expect(refusal(plan, { kind: 1 }).at).toBe("kind")
    expect(refusal(plan, { kind: null }).at).toBe("kind")
  })

  test("refuses what is not an object", () => {
    expect(refusal(plan, null).message).toBe("Invalid input: expected object, received null")
    refuses(plan, [])
    refuses(plan, "wait")
  })

  test("once the arm is picked, that arm's own failures are what is reported", () => {
    expect(refusal(plan, { kind: "wait" }).at).toBe("reason")
    expect(refusal(plan, { kind: "nudge", reason: "r" }).at).toBe("nudge")
  })

  test("a refine on the picked arm refuses with the message it was given", () => {
    const blank = refusal(plan, { kind: "nudge", reason: "r", nudge: "   ", floorMs: 1 })
    expect(blank.at).toBe("nudge")
    expect(blank.code).toBe("custom")
    expect(blank.message).toBe("the nudge text is blank, which would reach the seat as an empty turn")

    const floor = refusal(plan, { kind: "nudge", reason: "r", nudge: "go", floorMs: 0 })
    expect(floor.at).toBe("floorMs")
    expect(floor.message).toBe(
      "the floor window is not a positive finite number, which would disable the floor"
    )
  })

  test("accepts each arm", () => {
    expect(accepts(plan, { kind: "wait", reason: "r" })).toEqual({ kind: "wait", reason: "r" })
    expect(accepts(plan, { kind: "hold", reason: "r" })).toEqual({ kind: "hold", reason: "r" })
    expect(accepts(plan, { kind: "nudge", reason: "r", nudge: "go", floorMs: 5 })).toBeTruthy()
  })

  test("refuses to be built at all from members that cannot be told apart", () => {
    expect(() => s.discriminatedUnion("kind", [s.object({ kind: s.string() })])).toThrow(
      /no literal `kind`/
    )
  })
})

describe("unknown", () => {
  test("holds anything, undefined included", () => {
    for (const value of [undefined, null, 0, "", false, [], {}, Number.NaN]) {
      expect(s.unknown().safeParse(value).success).toBe(true)
    }
  })
})

describe("json", () => {
  test("refuses what JSON cannot carry", () => {
    for (const value of [
      undefined,
      Number.NaN,
      Number.POSITIVE_INFINITY,
      () => 1,
      new Date(),
      Symbol("s"),
      1n,
      { a: undefined },
      { a: () => 1 },
      { a: new Date() },
      [undefined],
      { a: { b: [Number.NaN] } },
    ]) {
      refuses(s.json(), value)
    }
    expect(refusal(s.json(), undefined).message).toBe("Invalid input")
  })

  test("accepts every JSON value, nested and at the top", () => {
    for (const value of [null, "x", 1, 0, true, false, [], {}, [1, "x", null, true], { a: { b: [{ c: 1 }] } }]) {
      expect(accepts(s.json(), value)).toEqual(value)
    }
  })

  test("keeps the payload whole rather than narrowing it", () => {
    const payload = { a: 1, b: { c: [1, 2, 3] }, d: null }
    expect(accepts(s.json(), payload)).toEqual(payload)
  })
})

describe("refine, transform and pipe", () => {
  test("refine refuses with the message it was handed", () => {
    const filled = s.string().refine((text) => text.trim() !== "", { message: "blank" })
    expect(refusal(filled, "   ").message).toBe("blank")
    expect(refusal(filled, "   ").code).toBe("custom")
    expect(accepts(filled, "x")).toBe("x")
  })

  test("refine does not run when the value never became the right type", () => {
    let ran = false
    const guarded = s.string().refine(() => {
      ran = true
      return true
    }, { message: "never" })
    refuses(guarded, 1)
    expect(ran).toBe(false)
  })

  test("transform only runs on a value that parsed", () => {
    const boolEnv = s
      .string()
      .min(1)
      .transform((raw) => !["0", "false", "no", "off"].includes(raw.trim().toLowerCase()))
    expect(accepts(boolEnv, "0")).toBe(false)
    expect(accepts(boolEnv, "OFF")).toBe(false)
    expect(accepts(boolEnv, "yes")).toBe(true)
    refuses(boolEnv, "")
    refuses(boolEnv, undefined)
    refuses(boolEnv, 1)
  })

  test("pipe checks what the transform produced rather than trusting it", () => {
    const port = s
      .string()
      .regex(/^\d+$/)
      .transform((raw) => Number.parseInt(raw, 10))
      .pipe(s.number().int().min(1).max(65535))
    expect(accepts(port, "8080")).toBe(8080)
    expect(accepts(port, "65535")).toBe(65535)
    refuses(port, "0")
    refuses(port, "65536")
    refuses(port, "abc")
    refuses(port, 8080)
    expect(refusal(port, "70000").message).toBe("Too big: expected number to be <=65535")
  })
})

describe("the error surface the supervisor reads", () => {
  test("parse throws a ShapeError and safeParse hands one back", () => {
    expect(() => s.string().parse(1)).toThrow(ShapeError)
    const result = s.string().safeParse(1)
    expect(result.success).toBe(false)
    if (result.success) return
    expect(result.error).toBeInstanceOf(ShapeError)
    expect(result.error).toBeInstanceOf(Error)
    expect(result.error.name).toBe("ShapeError")
  })

  test("parse returns the value rather than a wrapper", () => {
    expect(s.string().parse("x")).toBe("x")
    expect(s.object({ a: s.number() }).parse({ a: 1 })).toEqual({ a: 1 })
  })

  test("issues[0].path joins to the dotted path the supervisor logs", () => {
    const answer = s.object({ limitResume: s.object({ nudge: s.string() }) })
    const result = answer.safeParse({ limitResume: { nudge: 1 } })
    expect(result.success).toBe(false)
    if (result.success) return
    const issue = result.error.issues[0]
    expect(issue).toBeDefined()
    expect(issue?.path.join(".")).toBe("limitResume.nudge")
    expect(issue?.message).toBe("Invalid input: expected string, received number")
  })

  test("a refusal at the root has an empty path, which the log renders as no location", () => {
    const result = s.string().safeParse(1)
    if (result.success) return
    const issue = result.error.issues[0]
    expect(issue?.path.length).toBe(0)
  })
})

describe("known divergence from zod, pinned deliberately", () => {
  test("a union that matches nothing refuses at its own path with a bare message", () => {
    const verdict = s.union([
      s.object({ drive: s.literal("none") }),
      s.object({ drive: s.enum(["spawn-argv", "rail"]), notice: s.string().min(1) }),
    ])
    const near = refusal(verdict, { drive: "rail", notice: "" })
    expect(near.code).toBe("invalid_union")
    expect(near.message).toBe("Invalid input")
    expect(near.at).toBe("")
  })

  test("a length check on the wrong type reports the type failure alone", () => {
    const one = refusal(s.string().min(1), [])
    expect(one.count).toBe(1)
    expect(one.message).toBe("Invalid input: expected string, received array")
  })

  test("a printed refusal names the class and carries no zod-only fields", () => {
    let printed = ""
    let first: Record<string, unknown> = {}
    try {
      s.object({ mode: s.enum(["spawn-argv", "rail"]) }).parse({ mode: "other" })
    } catch (error) {
      printed = String(error)
      first = (error as ShapeError).issues[0] as unknown as Record<string, unknown>
    }
    expect(printed.startsWith("ShapeError: ")).toBe(true)
    expect(Object.keys(first).sort()).toEqual(["code", "message", "path"])
  })
})

describe("shapes the supervisor actually declares", () => {
  test("the agent-respawned payload refuses an extra key on the wire", () => {
    const payload = s
      .object({
        name: s.string().min(1),
        ts: s.string().datetime(),
        cause: s.enum(["absent"]),
      })
      .strict()
    const good = { name: "agent-a", ts: "2026-08-12T00:00:00Z", cause: "absent" }
    expect(accepts(payload, good)).toEqual(good)
    refuses(payload, { ...good, extra: 1 })
    refuses(payload, { ...good, name: "" })
    refuses(payload, { ...good, ts: "2026-08-12" })
    refuses(payload, { ...good, cause: "other" })
  })

  test("the Claude config gate tolerates keys it does not own and refuses the slice it does", () => {
    const entry = s.object({ disabledMcpServers: s.array(s.string()).optional() }).passthrough()
    const config = s.object({ projects: s.record(s.string(), entry).optional() }).passthrough()
    expect(accepts(config, { projects: { "/p": { disabledMcpServers: ["a"], other: 1 } }, top: 2 })).toEqual({
      projects: { "/p": { disabledMcpServers: ["a"], other: 1 } },
      top: 2,
    })
    expect(accepts(config, {})).toEqual({})
    refuses(config, { projects: { "/p": { disabledMcpServers: "a" } } })
    refuses(config, { projects: { "/p": { disabledMcpServers: [1] } } })
    refuses(config, { projects: [] })
  })

  test("the asked payload keeps what it does not narrow and still refuses a renamed field", () => {
    const lookup = s.looseObject({ matched: s.boolean(), declared: s.boolean().nullable() })
    const asked = s.looseObject({
      remoteControl: s.array(s.looseObject({ seat: s.string(), question: lookup })),
      outcome: s.looseObject({ failed: s.boolean(), durationMs: s.number() }),
    })
    const good = {
      remoteControl: [{ seat: "a", question: { matched: true, declared: null } }],
      outcome: { failed: false, durationMs: 3 },
      unknownKey: "kept",
    }
    expect(accepts(asked, good)).toEqual(good)
    refuses(asked, { ...good, remoteControl: [{ seat: 1, question: { matched: true, declared: null } }] })
    refuses(asked, { ...good, outcome: { failed: false } })
    refuses(asked, { ...good, remoteControl: [{ seatName: "a", question: { matched: true, declared: null } }] })
  })
})
