import { LINK_EARLY } from "../writ-link-data-table-early/writ-link-data-table-early.module.code.ts"
import { LINK_LATE } from "../writ-link-data-table-late/writ-link-data-table-late.module.code.ts"

export const LINK: Record<string, string> = { ...LINK_EARLY, ...LINK_LATE }
