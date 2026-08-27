
import type { AliasEntry } from "../aw/init/alias-snapshot.ts"
import { generateBashInit } from "../aw/init/bash.ts"
import { SEAT_LIVE_FN, TMUX_LAUNCH_FN } from "../aw/init/bash-tmux.ts"
import { implName, RELOAD_FN } from "../aw/init/reload.ts"

export const FIXTURE_ACCOUNTS: readonly AliasEntry[] = [
  { account: "aawalton", aliasIndex: 1 },
  { account: "alanwalton", aliasIndex: 2 },
  { account: "audhdalan", aliasIndex: 3 },
  { account: "tempereso", aliasIndex: 4 },
  { account: "ctw", aliasIndex: 5 },
  { account: "aow", aliasIndex: 6 },
]

export const FIXTURE_CN = FIXTURE_ACCOUNTS.map((a) => `c${a.aliasIndex}`)
export const SUPERVISOR_FN_NAMES = [...FIXTURE_CN]
export const SEAT_FN_NAMES = ["sn", "sr"]
export const PUBLIC_FUNCTION_NAMES = ["cu", ...FIXTURE_CN, "cna", ...SEAT_FN_NAMES]
export const EXPECTED_FUNCTION_NAMES = [
  RELOAD_FN,
  SEAT_LIVE_FN,
  TMUX_LAUNCH_FN,
  ...PUBLIC_FUNCTION_NAMES,
  ...PUBLIC_FUNCTION_NAMES.map(implName),
]

export const EXPECTED_ALIASES = ["s.", "gs", "gc", "gca", "gcc", "gp", "gl", "gg", "gcb"]

export const SUPERVISOR = '"$_root/tools/run-supervisor.ts"'
export const PROXY = '"$_root/tools/lib/pty-proxy.ts"'
export const OPS = "~/repos/instructions/tools/ops/cli.ts"

export const output = generateBashInit(FIXTURE_ACCOUNTS)

export function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\/~]/g, "\\$&")
}
