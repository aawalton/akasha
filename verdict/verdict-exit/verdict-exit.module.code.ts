import type { AnyVerdict } from "../verdict-shape/verdict-shape.module.code.ts"

const EXIT_CODE: Record<AnyVerdict["kind"], 0 | 1> = {
  pass: 0,
  fail: 1,
}

const EXIT_CODE_BY_ANY_KIND: Readonly<Record<string, 0 | 1 | undefined>> = EXIT_CODE

export function verdictExitCode(verdict: AnyVerdict): 0 | 1 | 2 {
  return EXIT_CODE_BY_ANY_KIND[verdict.kind] ?? 2
}
