import { temperFile } from "./code-tree.ts"

export const OUTPUT_DIR = temperFile("player-completion-addon/src/generated")
export const COMPANIONS_OUTPUT_DIR = temperFile("game-companions-addon/src/generated")

export const COMPANION_CODEC_MINOR_VERSION = 8
export const CHARACTER_CODEC_MINOR_VERSION = 7
export const ROLE_BITS = 8
export const TARGET_ARMOR_BITS = 1
export const TARGET_HEALTH_BITS = 1
