import { readFiles, removeFiles, writeFiles } from "@akasha/pages-query"

/**
 * A temper task is a TypeScript file under `akasha/temper/temper-progress/tasks`, and the store
 * writes a path and a whole body rather than the keys a page carries. So marking a task done carries
 * the task's whole body back with the lines the completion changes restated, and sweeping a task
 * that will not come round again takes the file away.
 */
const FOLDER = "akasha/temper/temper-progress/tasks/pages"

export const TASK_PAGE_TYPE_SLUG = "temper-task"

/** The writer the store records these commits against: a name and an address, or it refuses. */
export const TASK_WRITER = "temper watcher <watcher@alanwalton.com>"

const CLOSING = "} as const satisfies TemperTask"

export type Landed =
  | { readonly outcome: "landed"; readonly at: string }
  | { readonly outcome: "already"; readonly at: string }
  | { readonly outcome: "refused"; readonly why: string }

export function taskPagePath(slug: string): string {
  return `${FOLDER}/${slug}/${slug}.${TASK_PAGE_TYPE_SLUG}.ts`
}

/** Where a task's progress lines stand, whether or not the task carries any. */
export function taskProgressPath(slug: string): string {
  return `${FOLDER}/${slug}/${slug}.${TASK_PAGE_TYPE_SLUG}.progress.jsonl`
}

function lineFor(key: string): RegExp {
  return new RegExp(`^ {2}${key}: .*,$`, "m")
}

/**
 * The body a task's file becomes carrying these values: a line restated where one stands, a line
 * taken away where the value is null, and otherwise a line added last, where a key needs no import
 * and no ordering to be read back. Answers null where the body is not one this can change, so a
 * caller refuses rather than guesses, and where nothing about the body would move.
 */
export function taskBodyWith(
  body: string,
  values: Readonly<Record<string, string | number | boolean | null>>
): string | null {
  let put = body
  for (const [key, value] of Object.entries(values)) {
    const found = lineFor(key)
    if (value === null) {
      put = put.replace(new RegExp(`^ {2}${key}: .*,\\n`, "m"), "")
      continue
    }
    const line = `  ${key}: ${JSON.stringify(value)},`
    if (found.test(put)) {
      put = put.replace(found, line)
      continue
    }
    const at = put.lastIndexOf(CLOSING)
    if (at < 0) return null
    put = `${put.slice(0, at)}${line}\n${put.slice(at)}`
  }
  return put === body ? null : put
}

const ATTEMPTS = 4

const PAUSE_MS = 1_500

const sleep = (ms: number): Promise<undefined> =>
  new Promise((done) => {
    setTimeout(() => {
      done(undefined)
    }, ms)
  })

/**
 * Each try reads afresh, because a try the client gave up waiting on may have landed, and a body
 * already carrying these values counts as landed rather than as a refusal.
 */
export async function landTaskValues(
  slug: string,
  values: Readonly<Record<string, string | number | boolean | null>>,
  message: string
): Promise<Landed> {
  const path = taskPagePath(slug)
  let why = `no attempt to land ${path} was made`
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    if (attempt > 1) await sleep(PAUSE_MS)
    const found = await readFiles([path])
    if (!found.ok) {
      why = found.why
      continue
    }
    const held = found.bodies.find((one) => one.path === path)?.content ?? null
    if (held === null) return { outcome: "refused", why: `no body stands at ${path}` }
    const content = taskBodyWith(held, values)
    if (content === null) return { outcome: "already", at: found.at }
    const landed = await writeFiles(
      [{ path, content }],
      TASK_WRITER,
      message,
      undefined,
      undefined,
      found.at
    )
    if (landed.ok) return { outcome: "landed", at: landed.at }
    why = landed.why
  }
  return { outcome: "refused", why: `${why} — ${ATTEMPTS} attempts were spent` }
}

/**
 * A task that will not come round again is taken away. A task carrying files beside it — the
 * progress of a cumulative card — has those taken away with it, or the folder is left holding a
 * property whose page has gone.
 */
export async function landTaskGone(
  slug: string,
  beside: readonly string[],
  message: string
): Promise<Landed> {
  const paths = [taskPagePath(slug), ...beside]
  let why = `no attempt to take ${taskPagePath(slug)} away was made`
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    if (attempt > 1) await sleep(PAUSE_MS)
    const found = await readFiles(paths)
    if (!found.ok) {
      why = found.why
      continue
    }
    const standing = found.bodies.filter((one) => one.content !== null).map((one) => one.path)
    if (standing.length === 0) return { outcome: "already", at: found.at }
    const gone = await removeFiles(standing, TASK_WRITER, message, undefined, undefined, found.at)
    if (gone.ok) return { outcome: "landed", at: gone.at }
    why = gone.why
  }
  return { outcome: "refused", why: `${why} — ${ATTEMPTS} attempts were spent` }
}
