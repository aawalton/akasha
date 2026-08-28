import { describe, expect, it } from "bun:test"
import type { Held } from "../lib/page-file-values"
import { evaluate } from "../lib/page-expression.ts"
import { ExpressionRefused } from "../lib/page-expression-value.ts"

const reading =
  (values: Readonly<Record<string, Held>>) =>
  (key: string): Held =>
    values[key] ?? null

const refusal = (expression: string, values: Readonly<Record<string, Held>> = {}): string => {
  try {
    evaluate(expression, reading(values))
  } catch (why) {
    if (why instanceof ExpressionRefused) return why.message
    throw why
  }
  throw new Error(`\`${expression}\` was evaluated where a refusal was due`)
}

describe("the arithmetic it reads", () => {
  it("reads each operator, coercing both sides through a number", () => {
    expect(evaluate("prop(a) + 1", reading({ a: "2" }))).toBe("3")
    expect(evaluate("prop(a) - 1", reading({ a: "2" }))).toBe("1")
    expect(evaluate("prop(a) * 2", reading({ a: "3" }))).toBe("6")
    expect(evaluate("prop(a) / 2", reading({ a: "7" }))).toBe("3.5")
    expect(evaluate("prop(a) % 2", reading({ a: "7" }))).toBe("1")
  })

  it("binds `*` above `+`, and unary `-` above both", () => {
    expect(evaluate("1 + 2 * 3", reading({}))).toBe("7")
    expect(evaluate("-prop(a) * 3", reading({ a: "2" }))).toBe("-6")
    expect(evaluate("8 / 4 / 2", reading({}))).toBe("1")
  })

  it("concatenates with `+` where either side is already text, and reads nothing as the empty string", () => {
    expect(evaluate("prop(a) + prop(b)", reading({ a: "x", b: "2" }))).toBe("x2")
    expect(evaluate("prop(a) + prop(b)", reading({ b: "x" }))).toBe("x")
  })

  it("takes nothing as zero where no side is text", () => {
    expect(evaluate("prop(a) + 1", reading({}))).toBe("1")
  })

  it("refuses arithmetic on what reads as no number, and a division by zero", () => {
    expect(refusal("prop(a) * 2", { a: "soon" })).toBe(
      "`*` reads a number on both sides, and the left side is the text `soon`"
    )
    expect(refusal("-prop(a)", { a: "soon" })).toBe("`-` reads a number to negate, and it stands before the text `soon`")
    expect(refusal("prop(a) / 0", { a: "1" })).toBe(
      "the right side of `/` is zero, and this evaluator has no answer for that"
    )
    expect(refusal("prop(a) % 0", { a: "1" })).toBe(
      "the right side of `%` is zero, and this evaluator has no answer for that"
    )
  })
})

describe("the literals it reads", () => {
  it("reads a text literal under either quote, copying to the matching one and reading no escape", () => {
    expect(evaluate('prop(a) == "held"', reading({ a: "held" }))).toBe("true")
    expect(evaluate("prop(a) == 'held'", reading({ a: "held" }))).toBe("true")
    expect(evaluate('prop(a) == "a\\b"', reading({ a: "a\\b" }))).toBe("true")
  })

  it("reads `true`, `false` and `null` as the values they name", () => {
    expect(evaluate("true", reading({}))).toBe("true")
    expect(evaluate("false", reading({}))).toBe("false")
    expect(evaluate("null", reading({}))).toBeNull()
    expect(evaluate("prop(a) == true", reading({ a: "1" }))).toBe("false")
  })

  it("keeps a text literal text, so it never matches the number a numeric-looking value is read as", () => {
    expect(evaluate('"12" == prop(a)', reading({ a: "12" }))).toBe("false")
  })

  it("reads a number that ends at its dot, and refuses one carrying a second", () => {
    expect(evaluate("1.", reading({}))).toBe("1")
    expect(evaluate("1.5", reading({}))).toBe("1.5")
    expect(refusal("1.2.3")).toBe("`1.2.3` is not a number this evaluator reads")
  })
})

describe("the unary `!` it reads", () => {
  it("answers a real boolean, inverting what the language calls truthy", () => {
    expect(evaluate("!prop(a)", reading({ a: "0" }))).toBe("true")
    expect(evaluate("!prop(a)", reading({ a: "" }))).toBe("true")
    expect(evaluate("!prop(a)", reading({}))).toBe("true")
    expect(evaluate("!prop(a)", reading({ a: "x" }))).toBe("false")
    expect(evaluate("!prop(a)", reading({ a: "2" }))).toBe("false")
  })

  it("binds to its operand alone and stacks with unary minus", () => {
    expect(evaluate("!!prop(a)", reading({ a: "0" }))).toBe("false")
    expect(evaluate("!prop(a) && 5", reading({ a: "0" }))).toBe("5")
    expect(evaluate("-!prop(a)", reading({ a: "0" }))).toBe("-1")
    expect(evaluate("-1", reading({}))).toBe("-1")
  })
})

describe("the functions it reads", () => {
  it("picks the branch its first argument names, which is the plainest of the rules `if` carries", () => {
    expect(evaluate("if(prop(a), 1, 2)", reading({ a: "1" }))).toBe("1")
    expect(evaluate("if(prop(a), 1, 2)", reading({ a: "0" }))).toBe("2")
    expect(evaluate("if(prop(a), 1, 2)", reading({}))).toBe("2")
    expect(evaluate("if(1, prop(a), 2)", reading({}))).toBeNull()
  })

  it("dispatches only after every argument is evaluated, so `if` is not lazy", () => {
    expect(refusal("if(prop(a) != 0, 1 / prop(a), 0)", { a: "0" })).toBe(
      "the right side of `/` is zero, and this evaluator has no answer for that"
    )
  })

  it("reads a null argument to `min` and `max` as zero rather than carrying it through", () => {
    expect(evaluate("max(prop(a), prop(b))", reading({ b: "-5" }))).toBe("0")
    expect(evaluate("min(prop(a), prop(b))", reading({ b: "5" }))).toBe("0")
    expect(evaluate("max(min(prop(a), prop(b)), 0)", reading({ a: "1", b: "2" }))).toBe("1")
  })

  it("folds case in `containsText`, and carries a null side through", () => {
    expect(evaluate("containsText(prop(a), prop(b))", reading({ a: "Hello", b: "ELL" }))).toBe("true")
    expect(evaluate("containsText(prop(a), prop(b))", reading({ b: "x" }))).toBeNull()
  })

  it("counts a list, finds a member of one, and joins a path out of one", () => {
    expect(evaluate("count(prop(a))", reading({ a: ["p", "q"] }))).toBe("2")
    expect(evaluate("count(prop(a))", reading({}))).toBe("0")
    expect(evaluate("contains(prop(a), 'q')", reading({ a: ["p", "q"] }))).toBe("true")
    expect(evaluate("contains(prop(a), 'z')", reading({ a: ["p", "q"] }))).toBe("false")
    expect(evaluate("contains(prop(a), 'p')", reading({}))).toBeNull()
    expect(evaluate("joinPath(prop(a), prop(b))", reading({ a: "card", b: ["x", "y"] }))).toBe("card/x/y")
    expect(evaluate("joinPath(prop(a), prop(b))", reading({ a: "card" }))).toBe("card")
  })
})

describe("the lists it reads", () => {
  it("answers a list as a list rather than as one joined-up text", () => {
    expect(evaluate("prop(a)", reading({ a: ["p", "q"] }))).toEqual(["p", "q"])
  })

  it("reads every list as truthy, the empty one included, where the empty text is falsy", () => {
    expect(evaluate("prop(a) || 5", reading({ a: ["p"] }))).toEqual(["p"])
    expect(evaluate("prop(a) || 5", reading({ a: [] }))).toEqual([])
    expect(evaluate("prop(a) || 5", reading({ a: "" }))).toBe("5")
    expect(evaluate("!prop(a)", reading({ a: [] }))).toBe("false")
  })

  it("coerces a list through a number in arithmetic, so a one-item list adds as that item and an empty one as zero", () => {
    expect(evaluate("prop(a) + 1", reading({ a: ["2"] }))).toBe("3")
    expect(evaluate("prop(a) + 1", reading({ a: [] }))).toBe("1")
  })

  it("reads each item as it reads any other held value, so a list of digits is a list of numbers", () => {
    expect(evaluate("contains(prop(a), 1)", reading({ a: ["1", "2"] }))).toBe("true")
    expect(evaluate("contains(prop(a), '1')", reading({ a: ["1", "2"] }))).toBe("false")
  })
})

describe("the path operator it reads", () => {
  it("answers nothing where the head of the path is a value no file holds", () => {
    expect(evaluate("account.usage", reading({}))).toBeNull()
    expect(evaluate("null.x", reading({}))).toBeNull()
  })

  it("refuses a step into a value a file does hold, since frontmatter carries no object to step into", () => {
    expect(refusal("account.usage", { account: "amy" })).toBe(
      "`usage` reads a step into `account`, and `account` is the text `amy` rather than an object"
    )
    expect(refusal("a.b.c", { a: ["p", "q"] })).toBe(
      "`b.c` reads a step into `a`, and `a` is a list of 2 items rather than an object"
    )
  })

  it("refuses a step that is not a bare name", () => {
    expect(refusal("account.1")).toBe("`1` stands where a path step was due, and a step is a bare name")
    expect(refusal("account.")).toBe("the expression ends where a path step was due")
  })
})

describe("the list literal it reads", () => {
  it("holds whatever its items work out to, and holds nothing where it names nothing", () => {
    expect(evaluate("[]", reading({}))).toEqual([])
    expect(evaluate("[1, 2]", reading({}))).toEqual(["1", "2"])
    expect(evaluate("[prop(a), 'x']", reading({ a: "1" }))).toEqual(["1", "x"])
  })

  it("is a list like any other, so it never compares under `==`", () => {
    expect(refusal("[1] == [1]")).toBe("`==` compares scalars only, and the left side is a list of 1 item")
  })

  it("refuses a list inside a list, which no file could hold", () => {
    expect(refusal("[[1]]")).toBe("a list literal holds scalars, and one item of this one is a list of 1 item")
  })

  it("refuses a bracket nothing closes, and the item a trailing comma promised", () => {
    expect(refusal("[1")).toBe("a `[` is never closed")
    expect(refusal("[1,]")).toBe("`]` stands where a value was due")
  })
})

describe("the bracket access it reads", () => {
  it("answers nothing where either side is nothing", () => {
    expect(evaluate("o['k']", reading({}))).toBeNull()
    expect(evaluate("o[k]", reading({ o: "x" }))).toBeNull()
  })

  it("refuses a left side that is no object, which is every value a file holds", () => {
    expect(refusal("a['k']", { a: "x" })).toBe(
      "a bracket access reads an object on its left, and it stands after the text `x`"
    )
    expect(refusal("a['k']", { a: ["p", "q"] })).toBe(
      "a bracket access reads an object on its left, and it stands after a list of 2 items"
    )
  })
})

describe("what the evaluator refuses by name", () => {
  it("refuses an unknown function, an unimplemented one, and a call of the wrong arity", () => {
    expect(refusal("nope(1)")).toBe("there is no function named `nope`")
    expect(refusal("recurrence(1, 'x')")).toBe("the function call `recurrence(...)` is not implemented")
    expect(refusal("min(1)")).toBe("`min` reads 2 arguments, and 1 stands here")
  })

  it("reads a word before a `(` as a call, so `true` and `null` never reach their literal sense there", () => {
    expect(refusal("true(1)")).toBe("there is no function named `true`")
    expect(refusal("null(1)")).toBe("there is no function named `null`")
  })


  it("refuses a text literal nothing closes", () => {
    expect(refusal('prop(a) == "held')).toBe('a text literal opened with " is never closed')
  })

  it("refuses ordering a value that is no number rather than ordering it as text", () => {
    expect(refusal("prop(a) >= 100", { a: "soon" })).toBe(
      "`>=` reads a number on both sides, and the left side is the text `soon`"
    )
  })

  it("refuses a list where a scalar is due, naming how many items stand in it", () => {
    expect(refusal("prop(a) == 1", { a: ["1"] })).toBe(
      "`==` compares scalars only, and the left side is a list of 1 item"
    )
    expect(refusal("prop(a) >= 1", { a: ["1", "2"] })).toBe(
      "`>=` reads a number on both sides, and the left side is a list of 2 items"
    )
    expect(refusal("count(prop(a))", { a: "xy" })).toBe("`count` reads a list, and it is given the text `xy`")
  })

  it("refuses a list item it cannot read, naming which item it was", () => {
    expect(refusal("count(prop(a))", { a: ["p", "true"] })).toBe(
      "item 2 of the list `a` holds `true`, which is a word to a file and a boolean to the database, " +
        "and this evaluator will not pick"
    )
  })

  it("refuses an expression it cannot read to the end", () => {
    expect(refusal("prop(a) >=")).toBe("the expression ends where a value was due")
    expect(refusal("(prop(a)")).toBe("a `(` is never closed")
    expect(refusal("")).toBe("the expression is blank")
  })
})
