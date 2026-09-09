import { expect, test } from "bun:test"
import type { SignedInReader } from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"
import {
  namesWholeTask,
  parseTaskCompletions,
} from "../watcher-task-capture/watcher-task-capture.module.code.ts"
import {
  applyCompletion,
  clearCompletion,
  completionSet,
  isCompleteForever,
  rolledDueDate,
  runImportTasks,
  seamsReady,
  tasksByName,
} from "./watcher-import-tasks.module.code.ts"
import {
  applied,
  buildLua,
  COMPLETED_AT_ISO,
  COMPLETED_AT_MS,
  COMPLETED_AT_S,
  LANDED,
  landing,
  NO_CLIENT,
  NOW,
  NOW_ISO,
  ONE_OFF_ID,
  OTHER_DAY_MS,
  RECURRING_ID,
  SAME_DAY_MS,
  tallying,
  taskOf,
  UNKNOWN_ID,
} from "./watcher-import-tasks.module.test-fixtures.ts"

test("a saved-variables file reads back one entry for each numeric completion", () => {
  expect(
    parseTaskCompletions(
      buildLua([
        { taskId: ONE_OFF_ID, timestamp: COMPLETED_AT_S },
        { taskId: RECURRING_ID, timestamp: 0 },
      ])
    )
  ).toEqual([
    { taskId: ONE_OFF_ID, timestamp: COMPLETED_AT_S },
    { taskId: RECURRING_ID, timestamp: 0 },
  ])
})

test("a key carrying a colon after the uuid is left out and a shorter one is kept", () => {
  expect(
    parseTaskCompletions(
      buildLua([
        { taskId: ONE_OFF_ID, timestamp: COMPLETED_AT_S },
        { taskId: `${ONE_OFF_ID}:overland`, timestamp: COMPLETED_AT_S },
        { taskId: "short:key", timestamp: COMPLETED_AT_S },
      ])
    )
  ).toEqual([
    { taskId: ONE_OFF_ID, timestamp: COMPLETED_AT_S },
    { taskId: "short:key", timestamp: COMPLETED_AT_S },
  ])
})

test("a colon before the thirty-seventh character leaves the key whole", () => {
  expect(namesWholeTask("short:key")).toBe(true)
  expect(namesWholeTask(`${ONE_OFF_ID}:overland`)).toBe(false)
})

test("a saved-variables file holding no completions reads back nothing", () => {
  expect(parseTaskCompletions(buildLua([]))).toEqual([])
})

test("a file with no Default table is refused", () => {
  expect(() => parseTaskCompletions("TemperCharacters_SavedVariables =\n{\n}\n")).toThrow(
    "TemperCharacters_SavedVariables carries no Default table"
  )
})

test("a file whose account key holds no account-wide table is refused", () => {
  const content =
    'TemperCharacters_SavedVariables =\n{\n    ["Default"] =\n    {\n        ["@aawal"] =\n        {\n        },\n    },\n}\n'
  expect(() => parseTaskCompletions(content)).toThrow("$AccountWide")
})

test("a daily task due the day before rolls to the day after the clock", () => {
  const task = taskOf({ rruleRule: "FREQ=DAILY", dueDate: "2024-03-14" })
  expect(rolledDueDate(task, COMPLETED_AT_MS, NOW)).toBe("2024-03-16")
})

test("a weekly task anchored on its due date and one anchored on the completion part ways", () => {
  const fromDue = taskOf({ rruleRule: "FREQ=WEEKLY", dueDate: "2024-03-14" })
  const fromCompletion = taskOf({
    rruleRule: "FREQ=WEEKLY",
    dueDate: "2024-03-14",
    rruleAnchorFromCompletion: true,
  })
  expect(rolledDueDate(fromDue, COMPLETED_AT_MS, NOW)).toBe("2024-03-21")
  expect(rolledDueDate(fromCompletion, COMPLETED_AT_MS, NOW)).toBe("2024-03-19")
})

test("the anchor written as the text true is read as true", () => {
  const task = taskOf({
    rruleRule: "FREQ=DAILY",
    dueDate: "2024-03-14",
    rruleAnchorFromCompletion: "true",
  })
  expect(rolledDueDate(task, COMPLETED_AT_MS, NOW)).toBe("2024-03-16")
})

test("the clock the caller hands in decides how far a due date rolls", () => {
  const task = taskOf({ rruleRule: "FREQ=WEEKLY", dueDate: "2024-03-14" })
  expect(rolledDueDate(task, COMPLETED_AT_MS, new Date("2024-04-20T18:00:00.000Z"))).toBe(
    "2024-04-25"
  )
})

test("a weekly task with no due date rolls from the clock", () => {
  const task = taskOf({ rruleRule: "FREQ=WEEKLY" })
  expect(rolledDueDate(task, COMPLETED_AT_MS, NOW)).toBe("2024-03-22")
})

test("a task carrying no rule rolls to nothing", () => {
  expect(rolledDueDate(taskOf({}), COMPLETED_AT_MS, NOW)).toBeUndefined()
})

test("a cumulative task at its cap is complete forever and one below it is not", () => {
  const at = { rruleRule: "FREQ=DAILY", completionCardId: "skill-lines" }
  expect(isCompleteForever(taskOf({ ...at, progressCurrent: 16, progressTotal: 16 }))).toBe(true)
  expect(isCompleteForever(taskOf({ ...at, progressCurrent: 15, progressTotal: 16 }))).toBe(false)
  expect(isCompleteForever(taskOf({ ...at, progressCurrent: 0, progressTotal: 0 }))).toBe(false)
})

test("no rule and a card that is not cumulative each rule out complete forever", () => {
  const full = { progressCurrent: 16, progressTotal: 16 }
  expect(isCompleteForever(taskOf({ ...full, completionCardId: "skill-lines" }))).toBe(false)
  expect(
    isCompleteForever(taskOf({ ...full, rruleRule: "FREQ=DAILY", completionCardId: "daily-writs" }))
  ).toBe(false)
})

test("a task holding no rule takes the stamp and the key saying it is done", () => {
  expect(completionSet(taskOf({}), COMPLETED_AT_MS, NOW)).toEqual({
    lastCompletedAt: COMPLETED_AT_ISO,
    completedAt: COMPLETED_AT_ISO,
  })
})

test("a task holding a rule takes the stamp and its next due date", () => {
  const task = taskOf({ rruleRule: "FREQ=DAILY", dueDate: "2024-03-14" })
  expect(completionSet(task, COMPLETED_AT_MS, NOW)).toEqual({
    lastCompletedAt: COMPLETED_AT_ISO,
    dueDate: "2024-03-16",
  })
})

test("a task at its cumulative cap takes the key saying it is done rather than a due date", () => {
  const capped = taskOf({
    rruleRule: "FREQ=DAILY",
    completionCardId: "skill-lines",
    progressCurrent: 16,
    progressTotal: 16,
  })
  expect(completionSet(capped, COMPLETED_AT_MS, NOW)).toEqual({
    lastCompletedAt: COMPLETED_AT_ISO,
    completedAt: COMPLETED_AT_ISO,
  })
})

test("a completion carrying no instant is refused", async () => {
  await expect(applyCompletion(taskOf({}), 0, seamsReady(landing()))).rejects.toThrow(
    "carries no instant"
  )
})

test("a recurring task already completed on this logical day is skipped", async () => {
  const task = taskOf({ rruleRule: "FREQ=DAILY", lastCompletedAt: COMPLETED_AT_ISO })
  const outcome = await applyCompletion(task, COMPLETED_AT_MS, seamsReady(landing()))
  expect(outcome).toEqual({ action: "skip", reason: "already completed this logical day" })
})

test("a recurring task takes its rolled due date and its completion instant in one landing", async () => {
  const it = tallying()
  const task = taskOf({ slug: "recurring-task", rruleRule: "FREQ=DAILY", dueDate: "2024-03-14" })
  const outcome = await applyCompletion(task, COMPLETED_AT_MS, it.seams)
  expect(outcome).toEqual({ action: "completed", nextDue: "2024-03-16" })
  expect(it.landed).toEqual([
    {
      slug: "recurring-task",
      values: { lastCompletedAt: COMPLETED_AT_ISO, dueDate: "2024-03-16" },
    },
  ])
})

test("a one-off task is marked done and keeps its page", async () => {
  const it = await applied({})
  expect(it.outcome).toEqual({ action: "completed", nextDue: null })
  expect(it.landed).toEqual([
    {
      slug: "one-off-task",
      values: { lastCompletedAt: COMPLETED_AT_ISO, completedAt: COMPLETED_AT_ISO },
    },
  ])
})

test("a task that will not take its completion refuses by name", async () => {
  const seams = seamsReady(
    landing({ landTask: async () => ({ outcome: "refused", why: "the store said no" }) })
  )
  const task = taskOf({ slug: "recurring-task", rruleRule: "FREQ=DAILY" })
  await expect(applyCompletion(task, COMPLETED_AT_MS, seams)).rejects.toThrow(
    "the task recurring-task was not marked done — the store said no"
  )
})

test("clearing a completion takes off every key the completion set", async () => {
  const it = tallying()
  const task = taskOf({ lastCompletedAt: COMPLETED_AT_ISO, completedAt: COMPLETED_AT_ISO })
  expect(await clearCompletion(task, it.seams)).toEqual({ action: "cleared" })
  expect(it.landed).toEqual([
    { slug: "one-off-task", values: { lastCompletedAt: null, completedAt: null } },
  ])
})

test("a task carrying no completion clears nothing", async () => {
  const it = tallying()
  expect(await clearCompletion(taskOf({}), it.seams)).toEqual({
    action: "skip",
    reason: "no completion to clear",
  })
  expect(it.landed).toEqual([])
})

test("a clearing the store refuses says why", async () => {
  const seams = seamsReady(
    landing({ landTask: async () => ({ outcome: "refused", why: "the store said no" }) })
  )
  const task = taskOf({ lastCompletedAt: COMPLETED_AT_ISO })
  expect(await clearCompletion(task, seams)).toEqual({
    action: "skip",
    reason: "the completion did not clear — the store said no",
  })
})

test("a task is reached by its id and by its slug alike", () => {
  const task = taskOf({})
  const byName = tasksByName([task])
  expect(byName.get(ONE_OFF_ID)).toBe(task)
  expect(byName.get("one-off-task")).toBe(task)
})

test("a session carrying no user refuses the import, naming the work", async () => {
  const session: SignedInReader = {
    auth: {
      getUser: async () => ({ data: { user: null }, error: { message: "no session" } }),
    },
  }
  await expect(runImportTasks(buildLua([]), session, landing())).rejects.toThrow(
    "no signed-in user to import these completions (no session)"
  )
})

test("an import completes what it resolves, clears a zero, and reports the rest unknown", async () => {
  const said: string[] = []
  const errors: string[] = []
  const landed: { slug: string; values: Readonly<Record<string, unknown>> }[] = []
  const tasks = [
    { id: ONE_OFF_ID, slug: "one-off-task", title: "One Off Task", accountPage: "u1" },
    {
      id: RECURRING_ID,
      slug: "recurring-task",
      title: "Recurring",
      accountPage: "u1",
      lastCompletedAt: COMPLETED_AT_ISO,
    },
  ]
  await runImportTasks(
    buildLua([
      { taskId: ONE_OFF_ID, timestamp: COMPLETED_AT_S },
      { taskId: RECURRING_ID, timestamp: 0 },
      { taskId: UNKNOWN_ID, timestamp: COMPLETED_AT_S },
    ]),
    NO_CLIENT,
    landing({
      userId: "u1",
      ask: async (query) =>
        query.pageTypeSlug === "temper-task"
          ? { rows: tasks, n: tasks.length }
          : { rows: [], n: 0 },
      landTask: async (slug, values) => {
        landed.push({ slug, values })
        return LANDED
      },
      report: (message) => said.push(message),
      reportError: (message) => errors.push(message),
    })
  )
  expect(errors).toEqual([`Task ${UNKNOWN_ID}: no such task, skipping`])
  expect(landed).toEqual([
    {
      slug: "one-off-task",
      values: { lastCompletedAt: COMPLETED_AT_ISO, completedAt: COMPLETED_AT_ISO },
    },
    { slug: "recurring-task", values: { lastCompletedAt: null, completedAt: null } },
  ])
  expect(said[said.length - 1]).toBe(
    "Task import: 1 completed, 1 cleared, 0 swept, 1 skipped, 0 rolled, 0 progress file(s) landed."
  )
})

test("a task at its cumulative cap that no completion named is marked done at the end", async () => {
  const landed: { slug: string; values: Readonly<Record<string, unknown>> }[] = []
  const said: string[] = []
  const capped = {
    id: RECURRING_ID,
    slug: "cumulative-task",
    title: "Cumulative",
    rruleRule: "FREQ=DAILY",
    completionCardId: "skill-lines",
    progressCurrent: 16,
    progressTotal: 16,
  }
  await runImportTasks(
    buildLua([]),
    NO_CLIENT,
    landing({
      userId: "u1",
      ask: async (query) =>
        query.pageTypeSlug === "temper-task" ? { rows: [capped], n: 1 } : { rows: [], n: 0 },
      landTask: async (slug, values) => {
        landed.push({ slug, values })
        return LANDED
      },
      report: (message) => said.push(message),
    })
  )
  expect(landed).toEqual([
    { slug: "cumulative-task", values: { lastCompletedAt: NOW_ISO, completedAt: NOW_ISO } },
  ])
  expect(said[said.length - 1]).toBe(
    "Task import: 0 completed, 0 cleared, 1 swept, 0 skipped, 0 rolled, 0 progress file(s) landed."
  )
})

test("a task already marked done is swept no second time", async () => {
  const landed: unknown[] = []
  const capped = {
    id: RECURRING_ID,
    slug: "cumulative-task",
    title: "Cumulative",
    rruleRule: "FREQ=DAILY",
    completionCardId: "skill-lines",
    progressCurrent: 16,
    progressTotal: 16,
    completedAt: COMPLETED_AT_ISO,
  }
  await runImportTasks(
    buildLua([]),
    NO_CLIENT,
    landing({
      userId: "u1",
      ask: async (query) =>
        query.pageTypeSlug === "temper-task" ? { rows: [capped], n: 1 } : { rows: [], n: 0 },
      landTask: async (slug, values) => {
        landed.push({ slug, values })
        return LANDED
      },
    })
  )
  expect(landed).toEqual([])
})

test("a recurring task completed earlier in this same day is skipped", async () => {
  const it = await applied({ rruleRule: "FREQ=DAILY", lastCompletedAt: SAME_DAY_MS })
  expect(it.outcome).toEqual({ action: "skip", reason: "already completed this logical day" })
  expect(it.landed).toEqual([])
})

test("a recurring task completed on an earlier day rolls on and stays", async () => {
  const it = await applied({ slug: "r", rruleRule: "FREQ=DAILY", lastCompletedAt: OTHER_DAY_MS })
  expect(it.landed).toEqual([
    { slug: "r", values: { lastCompletedAt: COMPLETED_AT_ISO, dueDate: "2024-03-16" } },
  ])
})

test("the recomputation is handed every task and what it landed is reported", async () => {
  const said: string[] = []
  const handed: unknown[] = []
  const task = {
    id: ONE_OFF_ID,
    slug: "one-off-task",
    title: "One Off Task",
    completionCardId: "daily-writs",
  }
  await runImportTasks(
    buildLua([]),
    NO_CLIENT,
    landing({
      userId: "u1",
      ask: async (query) =>
        query.pageTypeSlug === "temper-task" ? { rows: [task], n: 1 } : { rows: [], n: 0 },
      refreshProgress: async (forUser, tasks) => {
        handed.push(forUser, ...tasks)
        return 3
      },
      report: (message) => said.push(message),
    })
  )
  expect(handed).toEqual(["u1", { slug: "one-off-task", completionCardId: "daily-writs" }])
  expect(said[said.length - 1]).toContain("3 progress file(s) landed")
})

test("a task naming no card is handed over with its slug alone", async () => {
  const handed: unknown[] = []
  await runImportTasks(
    buildLua([]),
    NO_CLIENT,
    landing({
      userId: "u1",
      ask: async (query) =>
        query.pageTypeSlug === "temper-task"
          ? { rows: [{ id: ONE_OFF_ID, slug: "one-off-task", title: "One Off" }], n: 1 }
          : { rows: [], n: 0 },
      refreshProgress: async (_forUser, tasks) => {
        handed.push(...tasks)
        return 0
      },
    })
  )
  expect(handed).toEqual([{ slug: "one-off-task" }])
})

test("seams the caller leaves out fall back to the real ones", () => {
  const ready = seamsReady()
  expect(typeof ready.now()).toBe("object")
  expect(typeof ready.landTask).toBe("function")
})
