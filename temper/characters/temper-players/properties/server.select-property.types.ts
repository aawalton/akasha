import type { server } from "./server.select-property.ts"

export type Server = (typeof server.values)[number]
