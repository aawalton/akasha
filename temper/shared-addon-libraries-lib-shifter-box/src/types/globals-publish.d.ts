declare global {
  var LibShifterBox: import("../types").LibShifterBoxGlobal
  var LSB_Debug: Record<string, import("../types").DebugBoxEntry> | undefined
}

export {}
