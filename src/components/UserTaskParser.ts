import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek.js'
import type { EgtTask, EgtTaskRow } from '../types'

dayjs.extend(isoWeek)

export default class UserTaskParser {
  sdate: string
  items0: EgtTask[]
  total: number
  dates: string[]
  items: EgtTaskRow[]

  constructor (items: EgtTask[], sdate: string) {
    this.sdate = sdate
    this.items0 = items
    this.total = items.length
    this.dates = this._getDates()
    this._parse()
    this.items = this._groupTasks()
  }

  _parse () {
    // work on shallow copies so the caller's task objects are never mutated
    const items = this.items0.map(task => ({ ...task }))
    items.forEach((obj) => {
      const sdate1 = dayjs(obj.sdate)
      const d = sdate1.isoWeekday()
      // fix duration
      const duration = Math.min((7 - d + 1), obj.duration)
      // caculate the next date of end date
      // NOTE: dayjs is immutable, .add() returns a new instance
      obj.edate = sdate1.add(duration, 'days').format('YYYY-MM-DD')
      obj.duration = duration
      obj.weekday = d
      obj.space = 7 - d - obj.duration + 1
      obj.canHasFollowingTasks = this.dates.includes(obj.edate)
    })
    this.items0 = items.sort((a, b) => (a.weekday ?? 0) - (b.weekday ?? 0))
  }

  _getDates (): string[] {
    const now = dayjs(this.sdate)
    let i = 1
    const ret = []
    while (i < 8) {
      ret.push(now.isoWeekday(i).format('YYYY-MM-DD'))
      i++
    }
    return ret
  }

  _getNextDateOf (date: string): string | null {
    const idx = this.dates.findIndex(obj => obj === date)
    if (idx === (this.dates.length - 1)) return null
    return this.dates[idx + 1]
  }

  _getFollowingTask (items: EgtTask[], date: string | null, space: number, matchedItems: EgtTask[]): EgtTask[] {
    if (space === 0 || date === null) {
      return matchedItems
    }
    const tasks = items.filter((item) => {
      return (item.sdate === date && item.duration <= space)
    })
    tasks.sort((a, b) => (b.duration - a.duration))
    if (tasks.length > 0) {
      const task = tasks[0]
      const rawIdx = items.findIndex((item) => {
        return item._id === task._id
      })
      // remove the selected task
      items.splice(rawIdx, 1)
      matchedItems.push(task)
      if (!task.canHasFollowingTasks) return matchedItems
      return this._getFollowingTask(items, task.edate ?? null, task.space ?? 0, matchedItems)
    }
    return this._getFollowingTask(items, this._getNextDateOf(date), space - 1, matchedItems)
  }

  _groupTasks (): EgtTaskRow[] {
    const items = this.items0.slice()
    const rows: EgtTaskRow[] = []

    while (items.length) {
      const obj = items.shift() as EgtTask
      const row: EgtTaskRow = {
        sdate: obj.sdate
      }
      row[obj.sdate] = obj
      if (!obj.canHasFollowingTasks) {
        rows.push(row)
        continue
      }
      const followingTasks: EgtTask[] = []
      this._getFollowingTask(items, obj.edate ?? null, obj.space ?? 0, followingTasks)
      followingTasks.forEach((obj1) => {
        row[obj1.sdate] = obj1
      })
      rows.push(row)
    }

    return rows
  }
}
