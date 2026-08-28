// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.

import { goneRecord } from "../../../graph-gone.ts"
import type { Producer } from "../../../types.ts"

export const yamlFileEdgeProducer: Producer = goneRecord("yamlFileEdgeProducer")
