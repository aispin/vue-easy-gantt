export interface EgtTask {
  title: string
  sdate: string
  duration: number
  edate?: string
  weekday?: number
  space?: number
  canHasFollowingTasks?: boolean
  /** custom bar color, e.g. '#f43f5e' */
  color?: string
  /** 0 - 100 */
  progress?: number
  _id?: string
  [key: string]: unknown
}

export interface EgtUserTask {
  name: string
  avatar?: string
  tasks: EgtTask[]
  _id?: string
  [key: string]: unknown
}

/** one gantt row: task objects keyed by date, plus the row's own start date */
export interface EgtTaskRow {
  sdate: string
  [date: string]: EgtTask | string
}

export interface DayCell {
  date: string
  weekday: string
  label: string
  isToday: boolean
  isWeekend: boolean
}

export interface TaskClickPayload {
  task: EgtTask
  user: EgtUserTask
}
