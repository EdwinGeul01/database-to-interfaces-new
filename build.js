require('esbuild')
	.build({
		entryPoints: ['./index.ts'], // cambia si tu archivo de entrada es otro
		bundle: true,
		platform: 'node',
		target: 'node22',
		outfile: 'dist/index.js',
		format: 'cjs' // <- CommonJS
	})
	.catch(() => process.exit(1))
