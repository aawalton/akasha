import { CHARSET, CHARSET_LENGTH } from "../data-encode-charset/data-encode-charset.module.code.ts"
import { decode } from "../data-encode-decoder/data-encode-decoder.module.code.ts"
import { encode } from "../data-encode-encoder/data-encode-encoder.module.code.ts"
import {
  LOG_LEVELS,
  printLog,
  RUNTIME,
} from "../data-encode-runtime/data-encode-runtime.module.code.ts"
import type {
  LdeValue,
  LuaTable,
  TestResult,
} from "../data-encode-types/data-encode-types.module.code.ts"

function compareTables(this: void, t1: unknown, t2: unknown): boolean {
  if (type(t1) !== type(t2)) {
    return false
  }
  if (type(t1) !== "table") {
    return t1 === t2
  }
  const tbl1 = t1 as LuaTable
  const tbl2 = t2 as LuaTable
  for (const [k, v] of pairs(tbl1)) {
    if (type(v) === "table" && type(tbl2[k]) === "table") {
      compareTables(v, tbl2[k])
    } else if (v !== tbl2[k]) {
      if (type(v) === "number" && tostring(v) !== tostring(tbl2[k])) {
        printLog(
          LOG_LEVELS.debug,
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
      compareTables(v, tbl1[k])
    } else if (v !== tbl1[k]) {
      if (type(v) === "number" && tostring(v) !== tostring(tbl1[k])) {
        printLog(
          LOG_LEVELS.debug,
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

export function performTest(
  this: void,
  testname: string,
  testData: unknown,
  testDictLocal?: LdeValue[] | true,
  testDictGlobal?: LdeValue[]
): TestResult {
  const testresult: TestResult = {}
  if (RUNTIME.debug) {
    RUNTIME.testresult = testresult
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
  const result = compareTables(testData, decoded)
  testresult.result = result
  printLog(LOG_LEVELS.info, "Test '%s': %s", testname, result ? "passed" : "failed")
  return testresult
}

const SUB_TABLE: LuaTable = {}
SUB_TABLE.A = 1
SUB_TABLE["{1,2,3}"] = "A"
SUB_TABLE[0.5] = "asdada"
SUB_TABLE[1.5] = "bsdada"
SUB_TABLE[1.25] = "ПРИВЕТ"
SUB_TABLE[2.5] = "|H1:item:87874:364:50:26587:370:50:26:0:0:0:0:0:0:0:2049:24:0:1:0:423:0|h|h"
SUB_TABLE[-3] = ",!?#&§$%[{+="
SUB_TABLE[999] = "もうねるぜ"

const TEST_TABLE: LuaTable = {}
TEST_TABLE.tarb = SUB_TABLE
TEST_TABLE.tarb2 = SUB_TABLE
TEST_TABLE.tarb3 = SUB_TABLE
TEST_TABLE[0.5] = "asdada"
TEST_TABLE[0] = 0.5
TEST_TABLE[1] = ["A", "B", "C"]
TEST_TABLE[2] = 0.5
TEST_TABLE[3] = 0
TEST_TABLE[4] = 0.5
TEST_TABLE[5] = 1234567890
TEST_TABLE[6] = tonumber("12345678901234567890")
TEST_TABLE[7] = {}
TEST_TABLE[8] = CHARSET_LENGTH - 1
TEST_TABLE[9] = CHARSET_LENGTH
TEST_TABLE[10] = CHARSET_LENGTH + 1
TEST_TABLE[11] = ""
TEST_TABLE[12] = CHARSET
TEST_TABLE[13] = CHARSET + "x"
TEST_TABLE[14] = string.sub(CHARSET, 1, -2)
TEST_TABLE[15] = "もうねるぜ"
TEST_TABLE["もうねるぜ"] = 15

const TEST_DICT: LdeValue[] = [0.5, 1.5, 2.5, "asdada", "bsdada", "csdada"]

export function performSelfTest(this: void): undefined {
  performTest("No Dictionary, One string only", "testString")
  performTest("No Dictionary", TEST_TABLE)
  performTest("With Dictionary", TEST_TABLE, TEST_DICT)
  performTest("Auto Dictionary", TEST_TABLE, true)
  performTest("Auto Dictionary, One string only", "testString", true)
  performTest("Auto Dictionary + Global", TEST_TABLE, true, TEST_DICT)
}
