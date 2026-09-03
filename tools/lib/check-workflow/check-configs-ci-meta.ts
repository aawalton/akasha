import type { CheckConfig } from "./check-configs-types"
import { astGrepCheck } from "./check-configs-ast-grep.ts"

export const ciMetaChecks = (codeRoot: string): CheckConfig[] => [astGrepCheck(codeRoot)]
