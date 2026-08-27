export const PRODUCER_TAG_RE = /^\[fanout-ws:([^\]\s]+)\] ?/

export const RUNNER_MARKER_RE = /^\[run-(?:typed|workspace)-tests\]/

export const ANNOUNCE_RE = /^\[run-typed-tests\]\s+\S+:\s+(\d+)\s+test-bearing workspace\(s\)/

export const SECTION_RE = /^\[run-workspace-tests\]\s+(.+?):\s+running\b/

export const SKIP_RE = /^\[run-workspace-tests\]\s+.+?\bskipping\b/

export const REFUSAL_RE = /^\[run-(?:typed|workspace)-tests\]\s+.*\brefusing\b/

export const FILE_HEADER_RE = /^(\S+\.test\.tsx?):$/

export const FAIL_TEST_RE = /^\(fail\)/

export const FAIL_TALLY_RE = /^\s*(\d+)\s+fail\b/

// biome-ignore lint/suspicious/noControlCharactersInRegex: matching ANSI CSI escapes requires the ESC control char
const ANSI_RE = /\x1b\[[0-9;]*m/g

export function stripAnsi(line: string): string {
  return line.replace(ANSI_RE, "")
}
