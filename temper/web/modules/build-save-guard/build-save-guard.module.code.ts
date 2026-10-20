import { z } from "zod"

const GUARDED_PAGE_TYPES: ReadonlySet<string> = new Set(["character-build", "companion-build"])

const PATCHING_OPS: ReadonlySet<string> = new Set(["patchPage", "patchPages", "patchPageById"])

const BUILD_HASH = "buildHash"

const STALE_SAVE_STATUS = 409

const WRITE = z.looseObject({
  op: z.string(),
  args: z.looseObject({
    pageTypeSlug: z.string(),
    where: z.array(z.looseObject({ key: z.string().optional() })).optional(),
    set: z.record(z.string(), z.unknown()).optional(),
  }),
})

export function buildSaveRefusal(body: unknown): string | null {
  const read = WRITE.safeParse(body)
  if (!read.success) return null
  const { op, args } = read.data
  if (!PATCHING_OPS.has(op) || !GUARDED_PAGE_TYPES.has(args.pageTypeSlug)) return null
  if (args.set === undefined || !(BUILD_HASH in args.set)) return null
  const named = (args.where ?? []).some((one) => one.key === BUILD_HASH && "eq" in one)
  if (named) return null
  return `${op}(${args.pageTypeSlug}): a save of a build's hash names the hash it replaces, and this one names none, so it is refused. Reload the page to save over the build the server has now.`
}

export async function refusedBuildSave(request: Request): Promise<Response | null> {
  let body: unknown
  try {
    body = await request.clone().json()
  } catch {
    return null
  }
  const why = buildSaveRefusal(body)
  return why === null ? null : Response.json({ error: why }, { status: STALE_SAVE_STATUS })
}
