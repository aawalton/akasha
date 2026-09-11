import { BR } from "akasha/temper/crafting-addon/craft-lang-br/craft-lang-br.module.code.ts"
import { DE } from "akasha/temper/crafting-addon/craft-lang-de/craft-lang-de.module.code.ts"
import { EN } from "akasha/temper/crafting-addon/craft-lang-en/craft-lang-en.module.code.ts"
import { ES } from "akasha/temper/crafting-addon/craft-lang-es/craft-lang-es.module.code.ts"
import { FR } from "akasha/temper/crafting-addon/craft-lang-fr/craft-lang-fr.module.code.ts"
import { IT } from "akasha/temper/crafting-addon/craft-lang-it/craft-lang-it.module.code.ts"
import type { LangTable } from "akasha/temper/crafting-addon/craft-lang-lang-table/craft-lang-lang-table.module.code.ts"
import { RU } from "akasha/temper/crafting-addon/craft-lang-ru/craft-lang-ru.module.code.ts"
import { ZH } from "akasha/temper/crafting-addon/craft-lang-zh/craft-lang-zh.module.code.ts"

export const LANG = {
  de: DE,
  en: EN,
  fr: FR,
  br: BR,
  ru: RU,
  it: IT,
  es: ES,
  zh: ZH,
} satisfies Record<string, LangTable>
