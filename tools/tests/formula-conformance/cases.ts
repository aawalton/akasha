import type { Case } from "../../lib/formula-conformance.ts"
import { ARITHMETIC_CASES } from "./arithmetic.ts"
import { COMPARISON_CASES } from "./comparison.ts"
import { EQUALITY_CASES } from "./equality.ts"
import { ERROR_CASES } from "./errors.ts"
import { DATE_FUNCTION_CASES } from "./functions-date.ts"
import { FUNCTION_CASES } from "./functions.ts"
import { KEBAB_CASES } from "./kebab.ts"
import { LITERAL_CASES } from "./literals.ts"
import { LOGIC_CASES } from "./logic.ts"
import { MALFORMED_CASES } from "./malformed.ts"
import { NOT_CASES } from "./not.ts"
import { PATH_CASES } from "./paths.ts"
import { REF_CASES } from "./refs.ts"
import { SUBSTRATE_CASES } from "./substrate.ts"

export const CONFORMANCE_CASES: readonly Case[] = [
  ...LITERAL_CASES,
  ...REF_CASES,
  ...EQUALITY_CASES,
  ...COMPARISON_CASES,
  ...LOGIC_CASES,
  ...MALFORMED_CASES,
  ...ERROR_CASES,
  ...ARITHMETIC_CASES,
  ...NOT_CASES,
  ...PATH_CASES,
  ...FUNCTION_CASES,
  ...DATE_FUNCTION_CASES,
  ...KEBAB_CASES,
  ...SUBSTRATE_CASES,
]
