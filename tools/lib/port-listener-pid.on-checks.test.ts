import { describe, expect, it } from "bun:test"

import { parseListeningInodes } from "./port-listener-pid.ts"

const TABLE = [
  "  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode",
  "   0: 00000000:A431 00000000:0000 0A 00000000:00000000 00:00000000 00000000  1000        0 5378241 1 0000000000000000 100 0 0 10 0",
  "   1: 0100007F:A431 0100007F:C1B4 01 00000000:00000000 00:00000000 00000000  1000        0 5390112 1 0000000000000000 20 4 30 10 -1",
  "   2: 00000000:98C7 00000000:0000 0A 00000000:00000000 00:00000000 00000000  1000        0 5390999 1 0000000000000000 100 0 0 10 0",
  "   3: 00000000:A431 00000000:0000 0A 00000000:00000000 00:00000000 00000000  1000        0 0 1 0000000000000000 100 0 0 10 0",
  "",
].join("\n")

describe("parseListeningInodes", () => {
  it("finds the socket listening on the port asked for", () => {
    expect(parseListeningInodes(TABLE, 42033)).toEqual(["5378241"])
  })

  it("holds a port open only while listening, so an established connection on it does not count", () => {
    expect(parseListeningInodes(TABLE, 42033)).not.toContain("5390112")
  })

  it("belongs to a process, so a row with inode zero does not count", () => {
    expect(parseListeningInodes(TABLE, 42033)).not.toContain("0")
  })

  it("reads each port apart from the others in one table", () => {
    expect(parseListeningInodes(TABLE, 39111)).toEqual(["5390999"])
  })

  it("finds nothing for a port nothing is listening on", () => {
    expect(parseListeningInodes(TABLE, 1234)).toEqual([])
  })

  it("finds nothing where the table could not be read", () => {
    expect(parseListeningInodes("", 42033)).toEqual([])
  })
})
