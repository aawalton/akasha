
import { ROOT } from "./entry-points.ts"

const AW_CLI = `${ROOT}/tools/aw/cli.ts`

export const RELOAD_FN = "_aw_reload"

export function implName(name: string): string {
  return `_aw_fn_${name}`
}

export function launcher(name: string, impl: string): string {
  return [
    `${name}() {`,
    `  ${RELOAD_FN}`,
    `  ${implName(name)} "$@"`,
    "}",
    "",
    impl,
  ].join("\n")
}

export function reloadFnLines(): readonly string[] {
  return [
    `${RELOAD_FN}() {`,
    `  local _aw_cli="${AW_CLI}" _aw_text _aw_why=""`,
    '  if [ ! -f "$_aw_cli" ]; then',
    '    _aw_why="no generator at $_aw_cli"',
    '  elif ! _aw_text=$(bun run "$_aw_cli" init bash); then',
    '    _aw_why="the generator exited nonzero"',
    '  elif [ -z "$_aw_text" ]; then',
    '    _aw_why="the generator produced nothing"',
    '  elif ! bash -n <<<"$_aw_text"; then',
    '    _aw_why="the generated set does not parse"',
    '  elif ! eval "$_aw_text"; then',
    '    _aw_why="the generated set would not load"',
    "  else",
    "    return 0",
    "  fi",
    '  echo "aw: $_aw_why — the shell functions were not reloaded, so this one is running ' +
      "the definition your terminal started with, which may be stale. Run 's.' once the " +
      'checkout is sound." >&2',
    "  return 1",
    "}",
  ]
}
