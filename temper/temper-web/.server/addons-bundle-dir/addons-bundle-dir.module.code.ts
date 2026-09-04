import { join } from "node:path"
import { z } from "zod"

const ADDONS_BUNDLE_DIR_SCHEMA = z.string().min(1).default("build/addons")
const ADDONS_BUNDLE_DIR_RAW = ADDONS_BUNDLE_DIR_SCHEMA.parse(process.env["ADDONS_BUNDLE_DIR"])

export const ADDONS_BUNDLE_DIR = ADDONS_BUNDLE_DIR_RAW.startsWith("/")
  ? ADDONS_BUNDLE_DIR_RAW
  : join(process.cwd(), ADDONS_BUNDLE_DIR_RAW)
