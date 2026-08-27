import { fileURLToPath } from "node:url"
import { reactRouter } from "@react-router/dev/vite"
import { buildShaDefine } from "@shared/pages-ui/vite"
import { supabaseClientEnvDefine } from "@shared/supabase-rr/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

const r = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  define: { ...supabaseClientEnvDefine(), ...buildShaDefine() },
  ssr: {
    noExternal: ["rrule", "lucide-react"],
  },
  resolve: {
    tsconfigPaths: true,
    alias: [
      {
        find: /^@\/lib\/next-seam-adapters$/,
        replacement: r("./app/bridge/lib/next-seam-adapters.tsx"),
      },
      {
        find: /^@\/lib\/(.*)$/,
        replacement: r("./app/lib/$1"),
      },
      {
        find: /^@\/app\/characters\/import-actions$/,
        replacement: r("./app/bridge/app/characters/import-actions.ts"),
      },
      {
        find: /^@\/app\/companions\/import-actions$/,
        replacement: r("./app/bridge/app/companions/import-actions.ts"),
      },
      {
        find: /^@\/app\/(.*)$/,
        replacement: r("./app/bridge/app/$1"),
      },
      {
        find: /^@\/components\/(.*)$/,
        replacement: r("./app/components/$1"),
      },
      {
        find: /^@\/hooks\/(.*)$/,
        replacement: r("./app/hooks/$1"),
      },
    ],
  },
})
