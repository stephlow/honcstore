// import devServer from '@hono/vite-dev-server'
// import cloudflareAdapter from '@hono/vite-dev-server/cloudflare'
// import { defineConfig } from 'vite'
// import build from '@hono/vite-cloudflare-pages'
//
// // biome-ignore lint/style/noDefaultExport: Vite convention
// export default defineConfig(({ mode }) => {
//   if (mode === 'client') {
//     return {
//       build: {
//         rollupOptions: {
//           input: './src/client/index.tsx',
//           output: {
//             // dir: './',
//             entryFileNames: 'static/client.js',
//             chunkFileNames: 'static/assets/[name]-[hash].js',
//             assetFileNames: 'static/assets/[name].[ext]',
//           },
//         },
//         emptyOutDir: false,
//         copyPublicDir: false,
//       },
//     }
//   }
//
//   return {
//     server: {
//       port: 8787,
//     },
//     build: {
//       minify: true,
//       rollupOptions: {
//         input: './src/index.ts',
//         output: {
//           entryFileNames: '_worker.js',
//         },
//       },
//     },
//     plugins: [
//       devServer({
//         adapter: cloudflareAdapter,
//         entry: './src/index.ts',
//       }),
//       build()
//     ],
//   }
// })
import pages from "@hono/vite-cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import cloudflareAdapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      esbuild: {
        jsxImportSource: "hono/jsx/dom",
      },
      build: {
        rollupOptions: {
          input: "./src/client/index.tsx",
          output: {
            entryFileNames: "static/client.js",
          },
        },
        emptyOutDir: false,
        copyPublicDir: false,
      },
    };
  }

  return {
    server: {
      port: 8787,
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "_worker.js",
        },
      },
    },
    plugins: [
      devServer({
        adapter: cloudflareAdapter,
        entry: "./src/index.ts",
      }),
      pages({ entry: "./src/index.ts" }),
    ],
  };
});
