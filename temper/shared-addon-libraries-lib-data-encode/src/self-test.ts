import { asLuaTable } from "./casts"
import { charset, charsetLength } from "./constants"
import { decode } from "./decoder"
import { encode } from "./encoder"
import { logLevels, Print, runtime } from "./runtime"
import type { LdeValue, LuaTable, TestResult } from "./types"

function CompareTables(this: void, t1: unknown, t2: unknown): boolean {
  if (type(t1) !== type(t2)) {
    return false
  }
  if (type(t1) !== "table") {
    return t1 === t2
  }
  const tbl1 = asLuaTable(t1)
  const tbl2 = asLuaTable(t2)
  for (const [k, v] of pairs(tbl1)) {
    if (type(v) === "table" && type(tbl2[k]) === "table") {
      CompareTables(v, tbl2[k])
    } else if (v !== tbl2[k]) {
      if (type(v) === "number" && tostring(v) !== tostring(tbl2[k])) {
        Print(
          logLevels.debug,
          "Index %s should be %s but is %s.",
          tostring(k),
          tostring(v),
          tostring(tbl2[k])
        )
        return false
      }
    }
  }
  for (const [k, v] of pairs(tbl2)) {
    if (type(v) === "table" && type(tbl1[k]) === "table") {
      CompareTables(v, tbl1[k])
    } else if (v !== tbl1[k]) {
      if (type(v) === "number" && tostring(v) !== tostring(tbl1[k])) {
        Print(
          logLevels.debug,
          "Index %s should be %s but is %s.",
          tostring(k),
          tostring(tbl1[k]),
          tostring(v)
        )
        return false
      }
    }
  }
  return true
}

export function PerformTest(
  this: void,
  testname: string,
  testData: unknown,
  testDictLocal?: LdeValue[] | true,
  testDictGlobal?: LdeValue[]
): TestResult {
  const testresult: TestResult = {}
  if (runtime.debug) {
    runtime.testresult = testresult
  }
  testresult.testDictGlobal = testDictGlobal
  const encoded = encode(testData, testDictLocal, testDictGlobal)
  testresult.encoded = encoded
  if (testDictGlobal !== undefined) {
    testDictGlobal[testDictGlobal.length - 1] = "testDictGlobal"
  }
  const [decoded, dict] = decode(encoded, testDictGlobal)
  testresult.decoded = decoded
  testresult.dict = dict
  const result = CompareTables(testData, decoded)
  testresult.result = result
  Print(logLevels.info, "Test '%s': %s", testname, result ? "passed" : "failed")
  return testresult
}

const subTable: LuaTable = {}
subTable.A = 1
subTable["{1,2,3}"] = "A"
subTable[0.5] = "asdada"
subTable[1.5] = "bsdada"
subTable[1.25] = "ПРИВЕТ"
subTable[2.5] = "|H1:item:87874:364:50:26587:370:50:26:0:0:0:0:0:0:0:2049:24:0:1:0:423:0|h|h"
subTable[-3] = ",!?#&§$%[{+="
subTable[999] = "もうねるぜ"

const testTable: LuaTable = {}
testTable.tarb = subTable
testTable.tarb2 = subTable
testTable.tarb3 = subTable
testTable[0.5] = "asdada"
testTable[0] = 0.5
testTable[1] = ["A", "B", "C"]
testTable[2] = 0.5
testTable[3] = 0
testTable[4] = 0.5
testTable[5] = 1234567890
testTable[6] = tonumber("12345678901234567890")
testTable[7] = {}
testTable[8] = charsetLength - 1
testTable[9] = charsetLength
testTable[10] = charsetLength + 1
testTable[11] = ""
testTable[12] = charset
testTable[13] = charset + "x"
testTable[14] = string.sub(charset, 1, -2)
testTable[15] = "もうねるぜ"
testTable["もうねるぜ"] = 15

const testDict: LdeValue[] = [0.5, 1.5, 2.5, "asdada", "bsdada", "csdada"]

export function performSelfTest(this: void): undefined {
  PerformTest("No Dictionary, One string only", "testString")
  PerformTest("No Dictionary", testTable)
  PerformTest("With Dictionary", testTable, testDict)
  PerformTest("Auto Dictionary", testTable, true)
  PerformTest("Auto Dictionary, One string only", "testString", true)
  PerformTest("Auto Dictionary + Global", testTable, true, testDict)
}
