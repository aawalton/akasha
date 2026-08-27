
import { PTY_PROXY_REL, SUPERVISOR_REL } from "../../lib/tmux-launch-recipe.ts"

export const ROOT = "${INSTRUCTIONS_ROOT:-$HOME/repos/instructions}"
export const ROOT_LOCAL = `local _root="${ROOT}"`
export const SUPERVISOR = `"$_root/${SUPERVISOR_REL}"`
export const PROXY = `"$_root/${PTY_PROXY_REL}"`
export const SEAT_START_DIR = "$HOME/repos"
export const OPS = "~/repos/instructions/tools/ops/cli.ts"
