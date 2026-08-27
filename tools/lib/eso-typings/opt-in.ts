import { readFileSync } from "node:fs"
import type { EsoOptIn } from "./select.ts"

const MANIFEST_PATH = new URL("./data/opt-in.manifest.json", import.meta.url).pathname

export const ESO_OPT_IN: EsoOptIn = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"))
