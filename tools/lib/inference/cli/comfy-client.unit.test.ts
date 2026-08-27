import { describe, expect, test } from "bun:test"
import {
  type ComfyGraph,
  decidePollStep,
  type HistoryEntry,
  selectCachedOutput,
} from "./comfy-client"

const GRAPH: ComfyGraph = {
  "9": { class_type: "SaveImage", inputs: { images: ["65", 0], filename_prefix: "zimage" } },
  "69": { class_type: "KSampler", inputs: { seed: 42, steps: 8, cfg: 4, denoise: 1 } },
}

const OUTPUT_ENTRY: HistoryEntry = {
  outputs: { "9": { images: [{ filename: "zimage_00482_.png", subfolder: "", type: "output" }] } },
  status: { status_str: "success", completed: true },
}

describe("decidePollStep", () => {
  test("pending when the entry is not yet recorded", () => {
    expect(decidePollStep(undefined)).toEqual({ kind: "pending" })
  })

  test("error surfaces the server status", () => {
    const d = decidePollStep({ outputs: {}, status: { status_str: "error" } })
    expect(d.kind).toBe("error")
    if (d.kind === "error") expect(d.message).toContain("ComfyUI run failed")
  })

  test("image is returned when an output is present", () => {
    expect(decidePollStep(OUTPUT_ENTRY)).toEqual({
      kind: "image",
      image: { filename: "zimage_00482_.png", subfolder: "", type: "output" },
    })
  })

  test("prefers a type:output image over a temp preview", () => {
    const entry: HistoryEntry = {
      outputs: {
        "8": { images: [{ filename: "preview.png", subfolder: "", type: "temp" }] },
        "9": { images: [{ filename: "final.png", subfolder: "", type: "output" }] },
      },
      status: { status_str: "success", completed: true },
    }
    const d = decidePollStep(entry)
    expect(d).toEqual({
      kind: "image",
      image: { filename: "final.png", subfolder: "", type: "output" },
    })
  })

  test("RECOVER on a terminal cached resubmit: success/completed with empty outputs", () => {
    const cachedEntry: HistoryEntry = {
      outputs: {},
      status: { status_str: "success", completed: true },
    }
    expect(decidePollStep(cachedEntry)).toEqual({ kind: "recover" })
  })

  test("recover when completed:true even if status_str is absent", () => {
    expect(decidePollStep({ outputs: {}, status: { completed: true } })).toEqual({
      kind: "recover",
    })
  })

  test("pending (not recover) while the run is still executing with no outputs", () => {
    expect(decidePollStep({ outputs: {}, status: {} })).toEqual({ kind: "pending" })
    expect(decidePollStep({ outputs: {} })).toEqual({ kind: "pending" })
  })
})

describe("selectCachedOutput", () => {
  test("recovers the prior identical render's output by graph match", () => {
    const history: Record<string, HistoryEntry> = {
      p1: { prompt: [0, "p1", GRAPH, {}, []], ...OUTPUT_ENTRY },
      p2: { prompt: [1, "p2", GRAPH, {}, []], outputs: {}, status: { status_str: "success" } },
    }
    expect(selectCachedOutput(history, GRAPH)).toEqual({
      filename: "zimage_00482_.png",
      subfolder: "",
      type: "output",
    })
  })

  test("matches regardless of key order in the stored graph", () => {
    const reordered: ComfyGraph = {
      "69": { class_type: "KSampler", inputs: { denoise: 1, cfg: 4, steps: 8, seed: 42 } },
      "9": { class_type: "SaveImage", inputs: { filename_prefix: "zimage", images: ["65", 0] } },
    }
    const history: Record<string, HistoryEntry> = {
      p1: { prompt: [0, "p1", reordered, {}, []], ...OUTPUT_ENTRY },
    }
    expect(selectCachedOutput(history, GRAPH)).toEqual({
      filename: "zimage_00482_.png",
      subfolder: "",
      type: "output",
    })
  })

  test("picks the most recent matching render by queue number", () => {
    const history: Record<string, HistoryEntry> = {
      old: {
        prompt: [0, "old", GRAPH, {}, []],
        outputs: { "9": { images: [{ filename: "old.png", subfolder: "", type: "output" }] } },
      },
      new: {
        prompt: [5, "new", GRAPH, {}, []],
        outputs: { "9": { images: [{ filename: "new.png", subfolder: "", type: "output" }] } },
      },
    }
    expect(selectCachedOutput(history, GRAPH)?.filename).toBe("new.png")
  })

  test("undefined when no matching render exists (caller fails fast)", () => {
    const other: ComfyGraph = {
      "69": { class_type: "KSampler", inputs: { seed: 999, steps: 8, cfg: 4, denoise: 1 } },
    }
    const history: Record<string, HistoryEntry> = {
      p1: { prompt: [0, "p1", other, {}, []], ...OUTPUT_ENTRY },
    }
    expect(selectCachedOutput(history, GRAPH)).toBeUndefined()
  })

  test("ignores matching graphs that carry no output image", () => {
    const history: Record<string, HistoryEntry> = {
      p1: { prompt: [0, "p1", GRAPH, {}, []], outputs: {}, status: { status_str: "success" } },
    }
    expect(selectCachedOutput(history, GRAPH)).toBeUndefined()
  })
})
