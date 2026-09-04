import type { LuaVm } from "@akasha/temper-lua-runner/lua-vm"
import { agreedIn, dumpJsWalk, partedIn } from "../leaf-dump/leaf-dump.module.code.ts"
import type { Ruling } from "../upstream-libraries/upstream-libraries.module.code.ts"

function dumped(expression: string): string {
  return `local out = {} dump_walk(${expression}, "", out) table.sort(out) return table.concat(out, "\\n")`
}

export function leavesOf(value: unknown): readonly string[] {
  const out: string[] = []
  dumpJsWalk(value, "", out)
  out.sort()
  return out
}

export async function upstreamLeavesIn(vm: LuaVm, expression: string): Promise<readonly string[]> {
  const raw = await vm.run(dumped(expression))
  if (typeof raw !== "string") {
    throw new Error(`walking ${expression} answered ${typeof raw} rather than a string of leaves`)
  }
  return raw === "" ? [] : raw.split("\n")
}

export function ruledBetween(
  label: string,
  upstreamLines: readonly string[],
  portedLines: readonly string[]
): Ruling {
  if (upstreamLines.length === 0 && portedLines.length === 0) {
    return {
      report: [],
      parted: [
        `${label} walked no leaf on either side, so agreement here would be agreement over nothing`,
      ],
    }
  }
  const parted = partedIn(label, upstreamLines, portedLines)
  if (parted.length > 0) return { report: [], parted }
  return { report: [agreedIn(label, portedLines)], parted: [] }
}

export function ruledOverValues(label: string, upstream: unknown, ported: unknown): Ruling {
  return ruledBetween(label, leavesOf(upstream), leavesOf(ported))
}

export function gathered(every: readonly Ruling[]): Ruling {
  return {
    report: every.flatMap((one) => one.report),
    parted: every.flatMap((one) => one.parted),
  }
}
