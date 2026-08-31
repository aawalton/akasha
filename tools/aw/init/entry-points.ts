
import { PTY_PROXY_REL, SUPERVISOR_REL } from "../../lib/tmux-launch-recipe.ts"

export const ROOT = "${AKASHA_ROOT:-$HOME/repos/akasha}"
export const ROOT_LOCAL = `local _root="${ROOT}"`
export const SUPERVISOR = `"$_root/${SUPERVISOR_REL}"`
export const PROXY = `"$_root/${PTY_PROXY_REL}"`
export const SEAT_START_DIR = "$HOME/repos"
export const OPS = "~/repos/akasha/tools/ops/cli.ts"
export const AKASHA = `"${ROOT}/dotfiles/bin/akasha"`
