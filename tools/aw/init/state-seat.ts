
export const SEAT_COMMAND_REL = "tools/seat-call.ts"

export function payloadEscapeLines(varPrefix: string): readonly string[] {
  return [
    `  _${varPrefix}_json_escape() {`,
    '    local _s="$1"',
    `    _s=\${_s//\\\\/\\\\\\\\}`,
    `    _${varPrefix}_json=\${_s//\\"/\\\\\\"}`,
    "  }",
  ]
}

export function resolveTokensLines(varPrefix: string): readonly string[] {
  return [
    `    local _${varPrefix}_tokens="" _${varPrefix}_token _${varPrefix}_json=""`,
    `    for _${varPrefix}_token in "\${@:2}"; do`,
    `      _${varPrefix}_json_escape "$_${varPrefix}_token"`,
    `      _${varPrefix}_tokens="$_${varPrefix}_tokens\${_${varPrefix}_tokens:+,}\\"$_${varPrefix}_json\\""`,
    "    done",
    `    _${varPrefix}_sorted=$(printf '%s' "{\\"resolve\\":true,\\"token\\":[$_${varPrefix}_tokens]}" ` +
      `| bun "$_root/${SEAT_COMMAND_REL}") || {`,
  ]
}
