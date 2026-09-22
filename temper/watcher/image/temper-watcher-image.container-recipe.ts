import type { ContainerRecipe } from "akasha/code/container-recipe/container-recipe.page-type.types.ts"

export const temperWatcherImage = {
  id: "01a0685d-ab5d-72a9-b18a-46c3a7cd02ff",
  type: "page-type/container-recipe",
  slug: "temper-watcher-image",
  definition: "the image cross-compiling the Windows watcher tray and worker and giving them back",
  recipe: "dockerfile",
} as const satisfies ContainerRecipe
