
import { chmod, mkdir, mkdtemp, rm } from "node:fs/promises"
import { basename, dirname, join } from "node:path"
import { bash } from "./aw-run.ts"
import type { AliasEntry } from "../aw/init/alias-snapshot.ts"
import { SEAT_COMMAND_REL } from "../aw/init/state-seat.ts"

function captureText(raw: unknown): string {
  if (typeof raw !== "string") throw new Error("capture file did not read as text")
  return raw
}

export const SCRATCH_ROOT = "/var/tmp"

export const FIXTURE_ACCOUNTS: readonly AliasEntry[] = [
  { account: "aawalton", aliasIndex: 1 },
  { account: "alanwalton", aliasIndex: 2 },
]

export interface Classified {
  readonly role?: string
  readonly domain?: string
  readonly persona?: string
  readonly preClaimId?: string | null
  readonly stopResolves?: string
  readonly stopExit?: number
  readonly stopStderr?: string
  readonly seatCommand?: "present" | "refusing"
  readonly sorted?: { readonly role?: string; readonly domain?: string } | "refusing"
  readonly skillDirs?: readonly string[]
  readonly personaSlugs?: readonly string[]
  readonly roleSlugs?: readonly string[]
  readonly domainSlugs?: readonly string[]
  readonly liveTmux?: boolean
  readonly tmuxKillRefuses?: boolean
}

export interface SnRun {
  readonly launched: string
  readonly opsCalls: string
  readonly tmuxCalls: string
  readonly stderr: string
  readonly exitCode: number
}

export async function runSn(
  initScript: string,
  args: readonly string[] = ["amy"],
  classified: Classified = {}
): Promise<SnRun> {
  const home = await mkdtemp(join(SCRATCH_ROOT, "sn-front-"))
  const akasha = join(home, "repos", "akasha")
  try {
    for (const dir of classified.skillDirs ?? []) {
      await mkdir(join(akasha, "skills", dir), { recursive: true })
      await Bun.write(join(akasha, "skills", dir, "SKILL.md"), "# document\n")
      await mkdir(join(akasha, "dirty", "skills", dir), { recursive: true })
      await Bun.write(join(akasha, "dirty", "skills", dir, "SKILL.md"), "# document\n")
    }
    for (const [type, slugs] of [
      ["persona", classified.personaSlugs ?? []],
      ["role", classified.roleSlugs ?? []],
      ["domain", classified.domainSlugs ?? []],
    ] as const) {
      for (const slug of slugs) {
        const dir = join(akasha, "pages", type)
        await mkdir(dir, { recursive: true })
        await Bun.write(join(dir, `${slug}.${type}.md`), "# document\n")
      }
    }
    const bin = join(home, "bin")
    const capture = join(home, "captured")
    const opsCapture = join(home, "ops-calls")
    const tmuxCapture = join(home, "tmux-calls")
    await mkdir(bin, { recursive: true })
    await Bun.write(capture, "")
    await Bun.write(opsCapture, "")
    await Bun.write(tmuxCapture, "")
    await Bun.write(
      join(bin, "ops"),
      [
        "#!/usr/bin/env bash",
        `printf '%s\\n' "$*" >> ${JSON.stringify(opsCapture)}`,
        'if [ "$1" = "seat" ] && [ "$2" = "stop" ]; then',
        ...(classified.stopStderr === undefined
          ? []
          : [`  printf '%s\\n' ${JSON.stringify(classified.stopStderr)} >&2`]),
        ...(classified.stopResolves === undefined
          ? []
          : [`  printf '%s\\t%s\\n' ${JSON.stringify(classified.stopResolves)} "session"`]),
        `  exit ${classified.stopExit ?? 0}`,
        "fi",
        'if [ "$1" = "seat" ] && [ "$2" = "start" ]; then',
        ...(classified.preClaimId === undefined
          ? [":"]
          : classified.preClaimId === null
            ? ['  echo "seat start refused (undeclared-shape)" >&2', "  exit 2"]
            : [
                `  printf '%s\\t%s\\t%s\\n' ${JSON.stringify(
                  classified.preClaimId
                )} "stub-seat" "interactive"`,
                "  exit 0",
              ]),
        "fi",
        'if [ "$1" = "seat" ] && [ "$2" = "whoami" ]; then',
        `  printf 'role=%s\\ndomain=%s\\npersona=%s\\n' ${JSON.stringify(
          classified.role ?? "null"
        )} ${JSON.stringify(classified.domain ?? "null")} ${JSON.stringify(
          classified.persona ?? "null"
        )}`,
        "fi",
        "exit 0",
        "",
      ].join("\n")
    )
    if (classified.liveTmux === true) {
      await Bun.write(
        join(bin, "tmux"),
        [
          "#!/usr/bin/env bash",
          `printf '%s\\n' "$*" >> ${JSON.stringify(tmuxCapture)}`,
          `_gone=${JSON.stringify(join(home, "tmux-gone"))}`,
          'if [ "$1" = "kill-session" ]; then',
          ...(classified.tmuxKillRefuses === true
            ? ["  exit 1"]
            : ['  : > "$_gone"', "  exit 0"]),
          "fi",
          'if [ "$1" = "has-session" ]; then',
          '  [ -e "$_gone" ] && exit 1',
          "  exit 0",
          "fi",
          "exit 0",
          "",
        ].join("\n")
      )
      await chmod(join(bin, "tmux"), 0o755)
      await Bun.write(
        join(bin, "systemd-run"),
        [
          "#!/usr/bin/env bash",
          'while [ "$#" -gt 0 ]; do',
          '  case "$1" in',
          "    --*) shift ;;",
          "    *) break ;;",
          "  esac",
          "done",
          'exec "$@"',
          "",
        ].join("\n")
      )
      await chmod(join(bin, "systemd-run"), 0o755)
    }
    if (classified.seatCommand !== undefined || classified.sorted !== undefined) {
      await mkdir(join(akasha, dirname(SEAT_COMMAND_REL)), { recursive: true })
      await Bun.write(join(akasha, SEAT_COMMAND_REL), "// stub\n")
    }
    const resolveArm =
      classified.sorted === undefined
        ? []
        : classified.sorted === "refusing"
          ? [
              'case "$_payload" in *\'"resolve":true\'*)',
              "  _t=$(printf '%s' \"$_payload\" | sed -n 's/.*\"token\":\\[\\(.*\\)\\].*/\\1/p'" +
                " | tr -d '\"')",
              '  echo "refused: $_t names neither a role nor a domain" >&2',
              "  exit 1 ;;",
              "esac",
            ]
          : [
              'case "$_payload" in *\'"resolve":true\'*)',
              ...(classified.sorted.role === undefined
                ? []
                : [`  printf 'role=%s\\n' ${JSON.stringify(classified.sorted.role)}`]),
              ...(classified.sorted.domain === undefined
                ? []
                : [`  printf 'domain=%s\\n' ${JSON.stringify(classified.sorted.domain)}`]),
              "  exit 0 ;;",
              "esac",
            ]
    await Bun.write(
      join(bin, "bun"),
      [
        "#!/usr/bin/env bash",
        '_payload=""',
        `case "$*" in *${basename(SEAT_COMMAND_REL)}*) _payload=$(cat) ;; esac`,
        `printf '%s\\n' "$*\${_payload:+ $_payload}" >> ${JSON.stringify(capture)}`,
        ...resolveArm,
        ...(classified.seatCommand === "refusing"
          ? [`case "$*" in *${basename(SEAT_COMMAND_REL)}*) exit 1 ;; esac`]
          : []),
        'case "$_payload" in *\'"name":true\'*)',
        '  _p=$(printf \'%s\' "$_payload" | sed -n \'s/.*"persona":"\\([^"]*\\)".*/\\1/p\')',
        '  _r=$(printf \'%s\' "$_payload" | sed -n \'s/.*"role":"\\([^"]*\\)".*/\\1/p\')',
        '  if [ -n "$_r" ]; then printf \'%s-%s\\n\' "$_p" "$_r"; else printf \'%s\\n\' "$_p"; fi',
        "  exit 0 ;;",
        "esac",
        "",
      ].join("\n")
    )
    await chmod(join(bin, "ops"), 0o755)
    await chmod(join(bin, "bun"), 0o755)

    const invocation = [
      "sn",
      ...args.map((a) => JSON.stringify(a)),
      ...(classified.liveTmux === true ? [] : ["--no-tmux"]),
    ].join(" ")
    const result = await bash(
      `export HOME=${JSON.stringify(home)}
       export PATH=${JSON.stringify(bin)}:"$PATH"
       unset AKASHA_ROOT
       source ${JSON.stringify(initScript)}
       ${invocation}`
    )
    const read = async (path: string): Promise<string> => {
      const raw = await Bun.file(path).text()
      return captureText(raw)
    }
    return {
      launched: await read(capture),
      opsCalls: await read(opsCapture),
      tmuxCalls: await read(tmuxCapture),
      stderr: result.stderr,
      exitCode: result.exitCode,
    }
  } finally {
    await rm(home, { recursive: true, force: true })
  }
}

export function supervisorLine(launched: string): string {
  return launched.split("\n").find((line) => line.includes("supervisor.ts")) ?? ""
}
