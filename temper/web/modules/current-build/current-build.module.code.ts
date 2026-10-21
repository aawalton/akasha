import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

type Row = Readonly<Record<string, unknown>>

const ACCOUNT_CHARACTER = "temper-account-character"

const CHARACTER_BUILD = "character-build"

const READINGS = "readings"

function textIn(row: Row, key: string): string | null {
  const value = row[key]
  return typeof value === "string" && value !== "" ? value : null
}

async function liveBuildOf(buildPageTypeSlug: string, page: Row): Promise<Row | null> {
  const liveBuildId = textIn(page, "liveBuildId")
  if (liveBuildId === null) return null
  const { rows } = await getPages({
    pageTypeSlug: buildPageTypeSlug,
    where: [{ key: "id", eq: liveBuildId }],
    limit: 1,
  })
  return rows[0] ?? null
}

async function besideBodyOf(
  pageTypeSlug: string,
  id: string,
  file: string
): Promise<string | null> {
  const asked = await askingFor({
    pageTypeSlug,
    where: { id: { is: id } },
    keys: ["id", file],
    files: [file],
    limit: 1,
  })
  if ("refused" in asked) {
    throw new Error(`the ${file} beside ${pageTypeSlug} ${id} went unread: ${asked.refused}`)
  }
  const body = asked.rows[0]?.[file]
  return typeof body === "string" && body !== "" ? body : null
}

function newestReadingHash(body: string): string | null {
  let newest: string | null = null
  let newestAt = Number.NEGATIVE_INFINITY
  for (const line of body.split("\n")) {
    if (line.trim() === "") continue
    const one = JSON.parse(line) as { buildHash?: unknown; reading?: { capturedAt?: unknown } }
    const capturedAt = one.reading?.capturedAt
    if (typeof one.buildHash !== "string" || typeof capturedAt !== "number") continue
    if (capturedAt < newestAt) continue
    newest = one.buildHash
    newestAt = capturedAt
  }
  return newest
}

function capturedBuildRow(page: Row, id: string, buildHash: string): Row {
  const title = textIn(page, "title") ?? textIn(page, "firstName")
  return { id, buildHash, visibility: "live", ...(title === null ? {} : { title }) }
}

export async function currentCharacterBuild(page: Row, id: string): Promise<Row | null> {
  const live = await liveBuildOf(CHARACTER_BUILD, page)
  if (live !== null) return live
  const body = await besideBodyOf(ACCOUNT_CHARACTER, id, READINGS)
  const buildHash = body === null ? null : newestReadingHash(body)
  return buildHash === null ? null : capturedBuildRow(page, id, buildHash)
}

const COMPANION_PROGRESS = "temper-companion-progress"

const COMPANION_BUILD = "companion-build"

const COMPLETION = "completion"

function capturedCompanionHash(body: string): string | null {
  const completion = JSON.parse(body) as { build?: { hash?: unknown } }
  const hash = completion.build?.hash
  return typeof hash === "string" && hash !== "" ? hash : null
}

export async function currentCompanionBuild(page: Row, id: string): Promise<Row | null> {
  const live = await liveBuildOf(COMPANION_BUILD, page)
  if (live !== null) return live
  const body = await besideBodyOf(COMPANION_PROGRESS, id, COMPLETION)
  const buildHash = body === null ? null : capturedCompanionHash(body)
  return buildHash === null ? null : capturedBuildRow(page, id, buildHash)
}
