import { expect, test } from "bun:test"
import type { LandingDeps } from "../watcher-page-landing/watcher-page-landing.module.code.ts"
import {
  landTaskGone,
  landTaskValues,
  TASK_PAGE_TYPE_SLUG,
  taskBodyWith,
  taskPagePath,
  taskProgressPath,
} from "./watcher-task-landing.module.code.ts"

const PAGE_PATH =
  "akasha/temper/temper-progress/tasks/pages/hireling-mails/hireling-mails.temper-task.ts"

const PROGRESS_PATH =
  "akasha/temper/temper-progress/tasks/pages/hireling-mails/hireling-mails.temper-task.progress.jsonl"

const BODY =
  'import type { TemperTask } from "../../temper-task.page-type.ts"\n\nexport const hirelingMails = {\n  id: "019db533-f3b3-77e0-bac5-71806d6387b1",\n  pageTypeSlug: "temper-task",\n  slug: "hireling-mails",\n  title: "Hireling Mails",\n  dueDate: "2026-03-05",\n} as const satisfies TemperTask\n'

type Body = { readonly path: string; readonly content: string | null }

function store(
  bodies: readonly Body[],
  answers: readonly ({ ok: true; at: string } | { ok: false; why: string })[]
): { deps: LandingDeps; wrote: unknown[]; took: unknown[] } {
  const wrote: unknown[] = []
  const took: unknown[] = []
  let at = 0
  const answer = (): { ok: true; at: string } | { ok: false; why: string } => {
    const one = answers[at] ?? { ok: false as const, why: "no answer was set up" }
    at++
    return one
  }
  const deps: LandingDeps = {
    waiting: async () => undefined,
    read: (async (paths: readonly string[]) => ({
      ok: true,
      at: "read-commit",
      bodies: paths.map((path) => ({
        path,
        content: bodies.find((one) => one.path === path)?.content ?? null,
      })),
      unplaced: [],
    })) as LandingDeps["read"],
    write: (async (
      given: unknown,
      writer: string,
      message: string,
      _fetcher: unknown,
      _rest: unknown,
      read: string | null
    ) => {
      wrote.push({ given, writer, message, read })
      return answer()
    }) as LandingDeps["write"],
    remove: (async (
      paths: readonly string[],
      writer: string,
      message: string,
      _fetcher: unknown,
      _rest: unknown,
      read: string | null
    ) => {
      took.push({ paths, writer, message, read })
      return answer()
    }) as LandingDeps["remove"],
  }
  return { deps, wrote, took }
}

test("a task names its page and the progress lines beside it", () => {
  expect(taskPagePath("hireling-mails")).toBe(PAGE_PATH)
  expect(taskProgressPath("hireling-mails")).toBe(PROGRESS_PATH)
  expect(TASK_PAGE_TYPE_SLUG).toBe("temper-task")
})

test("a key the body already carries is restated in place", () => {
  expect(taskBodyWith(BODY, { dueDate: "2026-03-12" })).toBe(
    'import type { TemperTask } from "../../temper-task.page-type.ts"\n\nexport const hirelingMails = {\n  id: "019db533-f3b3-77e0-bac5-71806d6387b1",\n  pageTypeSlug: "temper-task",\n  slug: "hireling-mails",\n  title: "Hireling Mails",\n  dueDate: "2026-03-12",\n} as const satisfies TemperTask\n'
  )
})

test("a key the body carries nowhere is added on the line before the closing", () => {
  expect(taskBodyWith(BODY, { completedAt: "2026-03-05T13:57:43.192Z" })).toBe(
    'import type { TemperTask } from "../../temper-task.page-type.ts"\n\nexport const hirelingMails = {\n  id: "019db533-f3b3-77e0-bac5-71806d6387b1",\n  pageTypeSlug: "temper-task",\n  slug: "hireling-mails",\n  title: "Hireling Mails",\n  dueDate: "2026-03-05",\n  completedAt: "2026-03-05T13:57:43.192Z",\n} as const satisfies TemperTask\n'
  )
})

test("a key told null is taken off the body", () => {
  expect(taskBodyWith(BODY, { dueDate: null })).toBe(
    'import type { TemperTask } from "../../temper-task.page-type.ts"\n\nexport const hirelingMails = {\n  id: "019db533-f3b3-77e0-bac5-71806d6387b1",\n  pageTypeSlug: "temper-task",\n  slug: "hireling-mails",\n  title: "Hireling Mails",\n} as const satisfies TemperTask\n'
  )
})

test("several keys are taken off, restated, and added in the order they were given", () => {
  expect(
    taskBodyWith(BODY, {
      dueDate: null,
      completedAt: "2026-03-05T13:57:43.192Z",
      streak: 4,
      paused: true,
    })
  ).toBe(
    'import type { TemperTask } from "../../temper-task.page-type.ts"\n\nexport const hirelingMails = {\n  id: "019db533-f3b3-77e0-bac5-71806d6387b1",\n  pageTypeSlug: "temper-task",\n  slug: "hireling-mails",\n  title: "Hireling Mails",\n  completedAt: "2026-03-05T13:57:43.192Z",\n  streak: 4,\n  paused: true,\n} as const satisfies TemperTask\n'
  )
})

test("a body nothing would move on is answered as nothing", () => {
  expect(taskBodyWith(BODY, {})).toBeNull()
  expect(taskBodyWith(BODY, { dueDate: "2026-03-05" })).toBeNull()
  expect(taskBodyWith(BODY, { streak: null })).toBeNull()
})

test("a body carrying no closing line is refused where a key must be added", () => {
  expect(taskBodyWith('export const x = {\n  id: "a",\n}\n', { streak: 1 })).toBeNull()
})

test("a body carrying no closing line still has a key it carries restated", () => {
  expect(taskBodyWith('export const x = {\n  id: "a",\n}\n', { id: "b" })).toBe(
    'export const x = {\n  id: "b",\n}\n'
  )
})

test("only a key indented by two spaces is matched", () => {
  const nested = 'export const x = {\n    dueDate: "2026-03-05",\n} as const satisfies TemperTask\n'
  expect(taskBodyWith(nested, { dueDate: "2026-03-12" })).toBe(
    'export const x = {\n    dueDate: "2026-03-05",\n  dueDate: "2026-03-12",\n} as const satisfies TemperTask\n'
  )
})

test("a task's whole body goes back with the values the completion changes", async () => {
  const { deps, wrote } = store([{ path: PAGE_PATH, content: BODY }], [{ ok: true, at: "c1" }])
  const landed = await landTaskValues(
    "hireling-mails",
    { dueDate: "2026-03-12" },
    "temper: hireling mails came round again",
    deps
  )
  expect(landed).toEqual({ outcome: "landed", at: "c1" })
  expect(wrote).toEqual([
    {
      given: [{ path: PAGE_PATH, content: taskBodyWith(BODY, { dueDate: "2026-03-12" }) }],
      writer: "temper watcher <watcher@alanwalton.com>",
      message: "temper: hireling mails came round again",
      read: "read-commit",
    },
  ])
})

test("a body already carrying these values counts as landed rather than as a refusal", async () => {
  const { deps, wrote } = store([{ path: PAGE_PATH, content: BODY }], [])
  expect(
    await landTaskValues("hireling-mails", { dueDate: "2026-03-05" }, "no change", deps)
  ).toEqual({ outcome: "already", at: "read-commit" })
  expect(wrote).toEqual([])
})

test("a task the store holds no body for is refused, naming the path", async () => {
  const { deps } = store([], [])
  expect(await landTaskValues("hireling-mails", { dueDate: "2026-03-12" }, "any", deps)).toEqual({
    outcome: "refused",
    why: `the store holds no body at ${PAGE_PATH}`,
  })
})

test("a task and the files beside it are taken away together", async () => {
  const { deps, took } = store(
    [
      { path: PAGE_PATH, content: BODY },
      { path: PROGRESS_PATH, content: '{"id":"a"}\n' },
    ],
    [{ ok: true, at: "c1" }]
  )
  const landed = await landTaskGone(
    "hireling-mails",
    [PROGRESS_PATH],
    "temper: hireling mails will not come round again",
    deps
  )
  expect(landed).toEqual({ outcome: "landed", at: "c1" })
  expect(took).toEqual([
    {
      paths: [PAGE_PATH, PROGRESS_PATH],
      writer: "temper watcher <watcher@alanwalton.com>",
      message: "temper: hireling mails will not come round again",
      read: "read-commit",
    },
  ])
})

test("a file beside a task the store holds nothing for is left out of the taking", async () => {
  const { deps, took } = store([{ path: PAGE_PATH, content: BODY }], [{ ok: true, at: "c1" }])
  await landTaskGone("hireling-mails", [PROGRESS_PATH], "gone", deps)
  expect(took).toEqual([
    {
      paths: [PAGE_PATH],
      writer: "temper watcher <watcher@alanwalton.com>",
      message: "gone",
      read: "read-commit",
    },
  ])
})

test("a task already gone counts as taken away", async () => {
  const { deps, took } = store([], [])
  expect(await landTaskGone("hireling-mails", [PROGRESS_PATH], "gone", deps)).toEqual({
    outcome: "already",
    at: "read-commit",
  })
  expect(took).toEqual([])
})

test("four takings the store turned back are refused, naming the last reason", async () => {
  const { deps } = store(
    [{ path: PAGE_PATH, content: BODY }],
    [
      { ok: false, why: "one" },
      { ok: false, why: "two" },
      { ok: false, why: "three" },
      { ok: false, why: "four" },
    ]
  )
  expect(await landTaskGone("hireling-mails", [], "gone", deps)).toEqual({
    outcome: "refused",
    why: "four — 4 attempts were spent",
  })
})
