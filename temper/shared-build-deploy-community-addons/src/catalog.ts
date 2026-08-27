import { OperationalError } from "@shared/errors-core/exit"
import { z } from "zod"
import type { CatalogEntry } from "./plan"

const FILELIST_URL = "https://api.mmoui.com/v3/game/ESO/filelist.json"
const filedetailsUrl = (uid: string): string =>
  `https://api.mmoui.com/v3/game/ESO/filedetails/${uid}.json`

const filelistItemSchema = z
  .object({
    UID: z.string(),
    UIName: z.string(),
    UIVersion: z.string(),
    UIDir: z.array(z.string()).nullish(),
  })
  .passthrough()

const filelistSchema = z.array(filelistItemSchema)

const filedetailsItemSchema = z
  .object({
    UID: z.string(),
    UIVersion: z.string(),
    UIDownload: z.string().url(),
    UIMD5: z.string(),
    UIFileName: z.string().nullish(),
  })
  .passthrough()

const filedetailsSchema = z.array(filedetailsItemSchema).min(1)

export interface FileDetails {
  readonly uid: string
  readonly version: string
  readonly downloadUrl: string
  readonly md5: string
  readonly fileName: string | undefined
}

async function fetchJson(url: string): Promise<unknown> {
  let res: Response
  try {
    res = await fetch(url)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new OperationalError(`network error fetching ${url}: ${message}`)
  }
  if (!res.ok) {
    throw new OperationalError(`HTTP ${res.status} ${res.statusText} fetching ${url}`)
  }
  return res.json()
}

export async function fetchCatalog(): Promise<readonly CatalogEntry[]> {
  const raw = await fetchJson(FILELIST_URL)
  const parsed = filelistSchema.parse(raw)
  return parsed.map((item) => ({
    uid: item.UID,
    name: item.UIName,
    version: item.UIVersion,
    dirs: item.UIDir ?? [],
  }))
}

export async function fetchFileDetails(uid: string): Promise<FileDetails> {
  const raw = await fetchJson(filedetailsUrl(uid))
  const item = filedetailsSchema.parse(raw)[0]
  if (item === undefined) throw new OperationalError(`empty filedetails response for file ${uid}`)
  return {
    uid: item.UID,
    version: item.UIVersion,
    downloadUrl: item.UIDownload,
    md5: item.UIMD5,
    fileName: item.UIFileName ?? undefined,
  }
}
