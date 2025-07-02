import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'library') {
    // Library build configuration
    return {
      plugins: [react()],
      css: {
        modules: {
          localsConvention: 'camelCase',
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      },
      build: {
        lib: {
          entry: './src/index.ts',
          name: 'Tristan',
          formats: ['es', 'umd'],
          fileName: (format) => format === 'es' ? 'index.esm.js' : 'index.js',
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
            assetFileNames: (assetInfo) => {
              const extType = assetInfo.name?.split('.').at(1);
              if (/woff2?|ttf|eot/.test(extType ?? '')) {
                return `fonts/[name].[ext]`;
              }
              // CSS 文件输出到根目录
              if (/css/.test(extType ?? '')) {
                return `tristan-ui.[ext]`;
              }
              return `assets/[name].[ext]`;
            },
          },
        },
        sourcemap: true,
        minify: 'esbuild',
        cssCodeSplit: false,
        outDir: 'dist',
        emptyOutDir: true,
        assetsInclude: ['**/*.woff2', '**/*.woff', '**/*.ttf', '**/*.eot']
      }
    }
  }
  
  // Development configuration
  return {
    plugins: [react()]
  }
})
