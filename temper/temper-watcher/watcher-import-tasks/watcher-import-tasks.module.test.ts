import { expect, test } from "bun:test"
import type { SignedInReader } from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"
import {
  applyCompletion,
  clearCompletion,
  completionValuesFor,
  isCompleteForever,
  namesWholeTask,
  parseTaskCompletions,
  rolledDueDate,
  runImportTasks,
  seamsReady,
  type TaskPage,
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
  ONE_OFF_ID,
  OTHER_DAY_MS,
  RECURRING_ID,
  SAME_DAY_MS,
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

test("a completion carries what is true of the completion and makes its own id", () => {
  const task = taskOf({
    character: "Aawal",
    esoCharacterId: "eso-1",
    dueDate: "2024-03-14",
    completionCardId: "skill-lines",
    completionItemPath: ["a", "b"],
  })
  expect(completionValuesFor(task, COMPLETED_AT_ISO, COMPLETED_AT_MS, () => "minted-id")).toEqual({
    id: "minted-id",
    completedAt: COMPLETED_AT_ISO,
    task: "one-off-task",
    title: "One Off Task",
    character: "Aawal",
    esoCharacterId: "eso-1",
    dueDate: "2024-03-14",
    completionCardId: "skill-lines",
    completionItemPath: ["a", "b"],
  })
})

test("a task carrying no title files no completion", () => {
  const task = { id: ONE_OFF_ID, slug: "one-off-task" } as TaskPage
  expect(() =>
    completionValuesFor(task, COMPLETED_AT_ISO, COMPLETED_AT_MS, () => "minted-id")
  ).toThrow("the task one-off-task carries no title")
})

test("a completion carrying no instant files nothing", () => {
  expect(() => completionValuesFor(taskOf({}), COMPLETED_AT_ISO, 0, () => "minted-id")).toThrow(
    "carries no instant"
  )
})

test("a recurring task already completed on this logical day is skipped", async () => {
  const task = taskOf({ rruleRule: "FREQ=DAILY", lastCompletedAt: COMPLETED_AT_ISO })
  const outcome = await applyCompletion(task, COMPLETED_AT_MS, seamsReady(landing()))
  expect(outcome).toEqual({ action: "skip", reason: "already completed this logical day" })
})

test("a completion the day already holds is reported as imported before", async () => {
  const seams = seamsReady(
    landing({ fileCompletion: async () => ({ outcome: "already", at: "c0" }) })
  )
  const outcome = await applyCompletion(taskOf({}), COMPLETED_AT_MS, seams)
  expect(outcome).toEqual({ action: "skip", reason: "already imported" })
})

test("a recurring task takes its rolled due date and its completion instant", async () => {
  const rolls: unknown[] = []
  const seams = seamsReady(
    landing({
      rollTask: async (slug, values, message) => {
        rolls.push({ slug, values, message })
        return LANDED
      },
    })
  )
  const task = taskOf({ slug: "recurring-task", rruleRule: "FREQ=DAILY", dueDate: "2024-03-14" })
  const outcome = await applyCompletion(task, COMPLETED_AT_MS, seams)
  expect(outcome).toEqual({ action: "completed", recurring: true })
  expect(rolls).toEqual([
    {
      slug: "recurring-task",
      values: { lastCompletedAt: COMPLETED_AT_ISO, dueDate: "2024-03-16" },
      message: `temper: recurring-task was completed at ${COMPLETED_AT_ISO}`,
    },
  ])
})

test("a one-off task goes with the progress file beside that task", async () => {
  const taken: unknown[] = []
  const seams = seamsReady(
    landing({
      removeTask: async (slug, beside, message) => {
        taken.push({ slug, beside, message })
        return LANDED
      },
    })
  )
  const outcome = await applyCompletion(taskOf({}), COMPLETED_AT_MS, seams)
  expect(outcome).toEqual({ action: "completed", recurring: false })
  expect(taken).toHaveLength(1)
})

test("a cumulative task at its cap goes rather than rolling", async () => {
  let rolled = 0
  let taken = 0
  const seams = seamsReady(
    landing({
      rollTask: async () => {
        rolled++
        return LANDED
      },
      removeTask: async () => {
        taken++
        return LANDED
      },
    })
  )
  const at = { rruleRule: "FREQ=DAILY", completionCardId: "skill-lines" }
  await applyCompletion(
    taskOf({ ...at, progressCurrent: 16, progressTotal: 16 }),
    COMPLETED_AT_MS,
    seams
  )
  expect(rolled).toBe(0)
  expect(taken).toBe(1)
})

test("a completion the day page refuses names the day page it never reached", async () => {
  const seams = seamsReady(
    landing({ fileCompletion: async () => ({ outcome: "refused", why: "the store said no" }) })
  )
  await expect(applyCompletion(taskOf({}), COMPLETED_AT_MS, seams)).rejects.toThrow(
    "temper-completed-day/day-2023-11-14"
  )
})

test("a task that will not roll refuses by name", async () => {
  const seams = seamsReady(
    landing({ rollTask: async () => ({ outcome: "refused", why: "the store said no" }) })
  )
  const task = taskOf({ slug: "recurring-task", rruleRule: "FREQ=DAILY" })
  await expect(applyCompletion(task, COMPLETED_AT_MS, seams)).rejects.toThrow(
    "the task recurring-task kept its old due date — the store said no"
  )
})

test("the newest day holding a line for the task is the day the line comes off", async () => {
  const cleared: unknown[] = []
  const seams = seamsReady(
    landing({
      ask: async () => ({
        rows: [
          { day: "2024-03-15", completions: [{ id: "other", task: "another-task" }] },
          {
            day: "2024-03-14",
            completions: [
              { id: "first", task: "one-off-task" },
              { id: "second", task: "one-off-task" },
            ],
          },
        ],
      }),
      clearCompletionLine: async (day, id) => {
        cleared.push({ day, id })
        return LANDED
      },
    })
  )
  expect(await clearCompletion(taskOf({}), seams)).toEqual({ action: "cleared" })
  expect(cleared).toEqual([{ day: "2024-03-14", id: "second" }])
})

test("no day holding a line for the task clears nothing", async () => {
  const seams = seamsReady(landing({ ask: async () => ({ rows: [] }) }))
  expect(await clearCompletion(taskOf({}), seams)).toEqual({
    action: "skip",
    reason: "no completion to clear",
  })
})

test("days that go unread clear nothing and say why", async () => {
  const seams = seamsReady(landing({ ask: async () => ({ refused: "the pages answered 500" }) }))
  expect(await clearCompletion(taskOf({}), seams)).toEqual({
    action: "skip",
    reason: "the days went unread — the pages answered 500",
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
  const cleared: unknown[] = []
  const tasks = [
    { id: ONE_OFF_ID, slug: "one-off-task", title: "One Off Task", accountPage: "u1" },
    { id: RECURRING_ID, slug: "recurring-task", title: "Recurring", accountPage: "u1" },
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
          ? { rows: tasks }
          : {
              rows: [
                { day: "2024-03-14", completions: [{ id: "line-1", task: "recurring-task" }] },
              ],
            },
      clearCompletionLine: async (day, id) => {
        cleared.push({ day, id })
        return LANDED
      },
      report: (message) => said.push(message),
      reportError: (message) => errors.push(message),
    })
  )
  expect(errors).toEqual([`Task ${UNKNOWN_ID}: no such task, skipping`])
  expect(cleared).toEqual([{ day: "2024-03-14", id: "line-1" }])
  expect(said[said.length - 1]).toBe("Task import: 1 completed, 1 cleared, 0 swept, 1 skipped.")
})

test("a task at its cumulative cap that no completion named is swept away", async () => {
  const taken: string[] = []
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
      ask: async () => ({ rows: [capped] }),
      removeTask: async (slug) => {
        taken.push(slug)
        return LANDED
      },
      report: (message) => said.push(message),
    })
  )
  expect(taken).toEqual(["cumulative-task"])
  expect(said[said.length - 1]).toBe("Task import: 0 completed, 0 cleared, 1 swept, 0 skipped.")
})

test("a recurring task completed earlier in this same day is skipped", async () => {
  const it = await applied({ rruleRule: "FREQ=DAILY", lastCompletedAt: SAME_DAY_MS })
  expect(it.outcome).toEqual({ action: "skip", reason: "already completed this logical day" })
  expect(it.filed).toEqual([])
})

test("a recurring task completed on an earlier day rolls on and stays", async () => {
  const it = await applied({ slug: "r", rruleRule: "FREQ=DAILY", lastCompletedAt: OTHER_DAY_MS })
  expect(it.rolled).toEqual([
    { slug: "r", values: { lastCompletedAt: COMPLETED_AT_ISO, dueDate: "2024-03-16" } },
  ])
  expect(it.filed).toHaveLength(1)
  expect(it.taken).toEqual([])
})

test("a one-off task rolls nothing at all and goes with its progress file", async () => {
  const it = await applied({})
  expect(it.rolled).toEqual([])
  expect(it.taken).toHaveLength(1)
})

test("a completion the day already holds neither rolls nor takes the task", async () => {
  const it = await applied(
    { rruleRule: "FREQ=DAILY" },
    { fileCompletion: async () => ({ outcome: "already", at: "c0" }) }
  )
  expect(it.rolled).toEqual([])
  expect(it.taken).toEqual([])
})

test("seams the caller leaves out fall back to the real ones", () => {
  const ready = seamsReady()
  expect(typeof ready.now()).toBe("object")
  expect(typeof ready.mintId()).toBe("string")
})
