import { fileURLToPath } from "node:url"
import { reactRouter } from "@react-router/dev/vite"
import { buildShaDefine } from "@shared/pages-ui/vite"
import { supabaseClientEnvDefine } from "@shared/supabase-rr/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

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
        replacement: fileURLToPath(
          new URL("./app/bridge/lib/next-seam-adapters.tsx", import.meta.url)
        ),
      },
      {
        find: /^@\/lib\/(.*)$/,
        replacement: fileURLToPath(new URL("./app/lib/$1", import.meta.url)),
      },
      {
        find: /^@\/app\/characters\/import-actions$/,
        replacement: fileURLToPath(
          new URL("./app/bridge/app/characters/import-actions.ts", import.meta.url)
        ),
      },
      {
        find: /^@\/app\/companions\/import-actions$/,
        replacement: fileURLToPath(
          new URL("./app/bridge/app/companions/import-actions.ts", import.meta.url)
        ),
      },
      {
        find: /^@\/app\/(.*)$/,
        replacement: fileURLToPath(new URL("./app/bridge/app/$1", import.meta.url)),
      },
      {
        find: /^@\/components\/(.*)$/,
        replacement: fileURLToPath(new URL("./app/components/$1", import.meta.url)),
      },
      {
        find: /^@\/hooks\/(.*)$/,
        replacement: fileURLToPath(new URL("./app/hooks/$1", import.meta.url)),
      },
    ],
  },
})
