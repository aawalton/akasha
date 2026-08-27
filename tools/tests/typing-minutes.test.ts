
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import {
  createTypingMinuteRecorder,
  distinctMinutes,
  minuteIndex,
  parseSpool,
  selectShippable,
  spoolLine,
  type TypingMinuteRecord,
} from "../lib/typing-minutes.ts"

const MS_PER_MINUTE = 60_000

const SEAT = "alan"

async function settle(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0))
}

function recorderCapturing(seat: string | undefined): {
  readonly note: (ms: number) => undefined
  readonly appended: readonly string[]
} {
  const appended: string[] = []
  const recorder = createTypingMinuteRecorder({
    pid: 4242,
    append: async (_index, line) => {
      appended.push(line)
    },
    resolveSeat: async () => seat,
  })
  return { note: recorder.note, appended }
}

const SHIPPABLE_RECORDS: readonly TypingMinuteRecord[] = [
  { minute: 10, seat: "amy" },
  { minute: 10, seat: "amy" },
  { minute: 10, seat: "athena" },
  { minute: 11, seat: "amy" },
  { minute: 12, seat: "amy" },
]

function threwOn(act: () => void): boolean {
  try {
    act()
    return false
  } catch {
    return true
  }
}

interface Case {
  readonly name: string
  readonly run: () => Record<string, unknown> | Promise<Record<string, unknown>>
  readonly standing: Record<string, unknown>
}

const CASES: readonly Case[] = [
  {
    name: "floors to the minute, so every moment in one minute shares an index",
    run: () => ({
      atZero: minuteIndex(0),
      lastMsOfMinute: minuteIndex(59_999),
      firstMsOfNext: minuteIndex(60_000),
    }),
    standing: { atZero: 0, lastMsOfMinute: 0, firstMsOfNext: 1 },
  },

  {
    name: "records the minute a keystroke fell in",
    run: async () => {
      const { note, appended } = recorderCapturing(SEAT)
      note(100 * MS_PER_MINUTE)
      await settle()
      return { appended: [...appended] }
    },
    standing: { appended: [`{"minute":100,"seat":"${SEAT}"}\n`] },
  },
  {
    name: "records a minute of composing once, whatever it took to compose",
    run: async () => {
      const { note, appended } = recorderCapturing(SEAT)
      for (let i = 0; i < 500; i += 1) note(100 * MS_PER_MINUTE + i)
      await settle()
      return { appendedLength: appended.length }
    },
    standing: { appendedLength: 1 },
  },
  {
    name: "records every minute typing continues across",
    run: async () => {
      const { note, appended } = recorderCapturing(SEAT)
      for (const minute of [100, 101, 102]) {
        note(minute * MS_PER_MINUTE)
        note(minute * MS_PER_MINUTE + 30_000)
      }
      await settle()
      return { appended: [...appended] }
    },
    standing: {
      appended: [
        `{"minute":100,"seat":"${SEAT}"}\n`,
        `{"minute":101,"seat":"${SEAT}"}\n`,
        `{"minute":102,"seat":"${SEAT}"}\n`,
      ],
    },
  },
  {
    name: "records nothing when nobody types",
    run: async () => {
      const { appended } = recorderCapturing(SEAT)
      await settle()
      return { appended: [...appended] }
    },
    standing: { appended: [] },
  },
  {
    name: "records nothing when the seat cannot be named, rather than a placeholder",
    run: async () => {
      const { note, appended } = recorderCapturing(undefined)
      note(100 * MS_PER_MINUTE)
      await settle()
      return { appended: [...appended] }
    },
    standing: { appended: [] },
  },
  {
    name: "swallows an append that throws — a reading is worth less than a keystroke",
    run: async () => {
      const recorder = createTypingMinuteRecorder({
        pid: 1,
        append: async () => {
          throw new Error("spool is gone")
        },
        resolveSeat: async () => "athena",
      })
      const threw = threwOn(() => recorder.note(100 * MS_PER_MINUTE))
      await settle()
      return { threw }
    },
    standing: { threw: false },
  },
  {
    name: "swallows a seat lookup that throws",
    run: async () => {
      const recorder = createTypingMinuteRecorder({
        pid: 1,
        append: async () => undefined,
        resolveSeat: async () => {
          throw new Error("cache unreadable")
        },
      })
      const threw = threwOn(() => recorder.note(100 * MS_PER_MINUTE))
      await settle()
      return { threw }
    },
    standing: { threw: false },
  },
  {
    name: "returns before the append begins, so no keystroke waits on the spool",
    run: () => {
      let appendStarted = false
      const recorder = createTypingMinuteRecorder({
        pid: 1,
        append: async () => {
          appendStarted = true
        },
        resolveSeat: async () => "athena",
      })
      recorder.note(100 * MS_PER_MINUTE)
      return { appendStarted }
    },
    standing: { appendStarted: false },
  },

  {
    name: "reads back what spoolLine wrote",
    run: () => {
      const record: TypingMinuteRecord = { minute: 7, seat: "ryn-lead" }
      const { records, dropped } = parseSpool(spoolLine(record))
      return { records: [...records], dropped }
    },
    standing: { records: [{ minute: 7, seat: "ryn-lead" }], dropped: 0 },
  },
  {
    name: "drops a torn final line and keeps the whole day before it",
    run: () => {
      const good = spoolLine({ minute: 1, seat: "amy" }) + spoolLine({ minute: 2, seat: "amy" })
      const { records, dropped } = parseSpool(`${good}{"minute":3,"se`)
      return { recordsLength: records.length, dropped }
    },
    standing: { recordsLength: 2, dropped: 1 },
  },
  {
    name: "drops a line whose fields are the wrong shape",
    run: () => {
      const { records, dropped } = parseSpool('{"minute":"soon","seat":"amy"}\n{"seat":"amy"}\n')
      return { records: [...records], dropped }
    },
    standing: { records: [], dropped: 2 },
  },

  {
    name: "ships each seat at most once per minute",
    run: () => ({ shipped: [...selectShippable(SHIPPABLE_RECORDS, 9, 10)] }),
    standing: {
      shipped: [
        { minute: 10, seat: "amy" },
        { minute: 10, seat: "athena" },
      ],
    },
  },
  {
    name: "never ships a minute still running",
    run: () => ({
      shipsTwelve: selectShippable(SHIPPABLE_RECORDS, 9, 11).some((r) => r.minute === 12),
    }),
    standing: { shipsTwelve: false },
  },
  {
    name: "ships nothing twice across consecutive drains",
    run: () => ({
      firstDrain: selectShippable(SHIPPABLE_RECORDS, 9, 10).map((r) => r.minute),
      secondDrain: selectShippable(SHIPPABLE_RECORDS, 10, 11).map((r) => r.minute),
    }),
    standing: { firstDrain: [10, 10], secondDrain: [11] },
  },
  {
    name: "catches up over a missed drain rather than skipping the gap",
    run: () => ({ shippedLength: selectShippable(SHIPPABLE_RECORDS, 9, 12).length }),
    standing: { shippedLength: 4 },
  },

  {
    name: "counts a minute Alan split across two seats once",
    run: () => ({
      count: distinctMinutes([
        { minute: 10, seat: "amy" },
        { minute: 10, seat: "athena" },
        { minute: 11, seat: "amy" },
      ]),
    }),
    standing: { count: 2 },
  },
]

const ABSENT = "«absent»"

function projected(
  answered: Record<string, unknown>,
  standing: Record<string, unknown>
): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(standing)) {
    picked[key] = key in answered ? answered[key] : ABSENT
  }
  return picked
}

describe("the typing-minutes recorder, held against what the code repository asserts", () => {
  for (const one of CASES) {
    it(one.name, async () => {
      const answered = decided("ported", { value: await one.run(), notice: null })
      const verdict = hold(one.name, one.standing, projected(answered, one.standing))
      expect(verdict.matches).toBe(true)
    })
  }

  it("carries the standing suite's whole population, and compares something in every case", () => {
    for (const one of CASES) expect(Object.keys(one.standing).length).toBeGreaterThan(0)
  })

  it("tells an absent slot from a held one, so a missing field cannot pass as agreement", () => {
    const held = hold("absence", { seat: "amy" }, projected({ seat: "amy" }, { seat: "amy" }))
    const missing = hold("absence", { seat: "amy" }, projected({}, { seat: "amy" }))
    expect(held.matches).toBe(true)
    expect(missing.matches).toBe(false)
  })
})
