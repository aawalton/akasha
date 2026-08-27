import { describe, expect, it } from "bun:test"
import { buildSpeechRequestBody, copPriorityHeaders } from "./voice-clone"

describe("copPriorityHeaders", () => {
  it("emits the x-cop-priority header only for the high lane", () => {
    expect(copPriorityHeaders("high")).toEqual({ "x-cop-priority": "high" })
  })

  it("omits the header for the normal lane (the cop's default)", () => {
    expect(copPriorityHeaders("normal")).toEqual({})
  })
})

describe("buildSpeechRequestBody", () => {
  it("omits `mode` when unset — byte-identical to the pre-continuation five-field body", () => {
    const body = buildSpeechRequestBody({
      model: "OpenMOSS-Team/MOSS-TTS-v1.5",
      text: "Welcome home.",
      refAudioRemote: "/Users/walton/inference/moss-tts/ref-audio.wav",
      refText: "The quick brown fox jumps over the lazy dog.",
    })
    expect(body).toEqual({
      model: "OpenMOSS-Team/MOSS-TTS-v1.5",
      input: "Welcome home.",
      ref_audio: "/Users/walton/inference/moss-tts/ref-audio.wav",
      ref_text: "The quick brown fox jumps over the lazy dog.",
      response_format: "wav",
    })
    expect("mode" in body).toBe(false)
  })

  it("includes `mode` when a continuation hop opts in", () => {
    const body = buildSpeechRequestBody({
      model: "OpenMOSS-Team/MOSS-TTS-v1.5",
      text: "the next chunk",
      refAudioRemote: "/tmp/inference-voice-clone-ref-1.wav",
      refText: "the previous tail",
      mode: "continuation",
    })
    expect(body.mode).toBe("continuation")
    expect(body.input).toBe("the next chunk")
  })
})
