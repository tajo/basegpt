import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { builtinModules, createRequire } from "node:module";
import nodeLibsBrowser from "node-libs-browser";

const require = createRequire(import.meta.url);

function NodeBuiltinsPolyfillPlugin() {
  const globalShimsPath = require.resolve("./shim.js");
  return {
    name: "vite:node-builtins-polyfill",
    config(config) {
      const aliasEntries = [];

      for (let moduleName of builtinModules) {
        const polyfillPath = nodeLibsBrowser[moduleName];
        if (polyfillPath) {
          aliasEntries.push({
            find: new RegExp(`^${moduleName}\/?$`), // handle "string_decoder/" import
            replacement: polyfillPath,
          });
        }
      }

      return {
        optimizeDeps: {
          esbuildOptions: {
            define: {
              global: "globalThis",
            },
            inject: [globalShimsPath],
            // Vite seems to have disabled esbuild's annotation-based tree-shaking,
            // which makes it so that unused imports are not getting pruned at all.
            // Which is essential for removing unused polyfills that get injected
            // with the help of `./shims/browser-node-globals-shim.js`.
            // @see https://github.com/vitejs/vite/blob/2401253b9aa487c50edb5ec571d5ba7adc949e27/packages/vite/src/node/optimizer/index.ts#L612
            // @TODO: Run some benchmarking tests to see if there is any noticeable
            // slow-down in the `optimizeDeps` phase, and overall build performance.
            ignoreAnnotations: false,
            plugins: [
              {
                name: "vite-plugin-node-polyfills-shims-resolver",
                setup(build) {
                  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
                  const escapedGlobalShimsPath =
                    globalShimsPath.replace(
                      /[.*+?^${}()|[\]\\]/g,
                      "\\$&"
                    );
                  const filter = new RegExp(
                    `^${escapedGlobalShimsPath}$`
                  );

                  // this prevents following esbuild error
                  // ✘ [ERROR] The injected path ".../shims/browser-node-globals-shim.js" cannot be marked as external
                  // introduced in Vite4
                  build.onResolve({ filter }, () => {
                    return {
                      external: false,
                      path: globalShimsPath,
                    };
                  });
                },
              },
            ],
          },
        },
        resolve: {
          alias: aliasEntries,
        },
      };
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), NodeBuiltinsPolyfillPlugin()],
  // define: {
  //   "process.env": {},
  //   Buffer: {},
  // },
});
