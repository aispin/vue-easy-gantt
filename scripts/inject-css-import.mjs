// Post-build step: rolldown-vite extracts CSS in library mode but drops the
// import statement from the ESM output, so bundler consumers (Vite, webpack)
// would receive an unstyled component. Re-attach the import to the ESM bundle.
//
// The UMD build is intentionally left untouched: it is loaded via <script>
// tags where a CSS import cannot be resolved — those users link the stylesheet
// manually (or import 'vue-easy-gantt/style.css').
import { appendFile } from 'node:fs/promises'

const entry = 'dist/vue-easy-gantt.mjs'
const cssFile = 'vue-easy-gantt.css'

const source = await appendFile(entry, `\nimport "./${cssFile}";\n`)
void source
console.log(`injected: import "./${cssFile}" -> ${entry}`)
