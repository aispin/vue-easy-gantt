import type { App } from 'vue'
import EasyGantt from './components/EasyGantt.vue'

// attach install() so the component doubles as a Vue plugin:
// app.use(EasyGantt) or app.component('easy-gantt', EasyGantt)
const plugin = EasyGantt as typeof EasyGantt & { install: (app: App) => void }
plugin.install = (app: App): void => {
  // eslint-disable-next-line vue/component-definition-name-casing -- kebab-case is the public tag name
  app.component('easy-gantt', EasyGantt)
}
export default plugin

export type {
  EgtTask,
  EgtUserTask,
  EgtTaskRow,
  DayCell,
  TaskClickPayload
} from './types'
