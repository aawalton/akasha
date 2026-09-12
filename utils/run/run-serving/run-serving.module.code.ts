import type {
  Answer,
  Frame,
  Request,
} from "akasha/utils/run/run-relaying/run-relaying.module.code.ts"
import {
  askedOf,
  framed,
  unframed,
  written,
} from "akasha/utils/run/run-relaying/run-relaying.module.code.ts"
import { spawnedHere } from "akasha/utils/run/running/running.module.code.ts"

const ASKED_ON = 0

const SAID_ON = 1

const NO_CODE = -1

function framedFor(frame: Frame): Uint8Array {
  const head = frame.head as Request
  try {
    const done = spawnedHere(head.argv, askedOf(head, frame.first))
    const said: Answer = {
      threw: null,
      code: done.code,
      signal: done.signal,
      cpuSeconds: done.cpuSeconds,
      peakBytes: done.peakBytes,
      peakMeasured: done.peakMeasured,
    }
    return framed(said, done.out, new TextEncoder().encode(done.err))
  } catch (raised) {
    const threw = raised instanceof Error ? raised.message : String(raised)
    const said: Answer = {
      threw,
      code: NO_CODE,
      signal: null,
      cpuSeconds: 0,
      peakBytes: 0,
      peakMeasured: false,
    }
    return framed(said, new Uint8Array(), new Uint8Array())
  }
}

export function serving(): undefined {
  for (;;) {
    let frame: Frame
    try {
      frame = unframed(ASKED_ON)
    } catch {
      return
    }
    written(SAID_ON, framedFor(frame))
  }
}
