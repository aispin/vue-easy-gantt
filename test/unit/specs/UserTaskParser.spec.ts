import { describe, it, expect, beforeEach } from 'vitest'
import UserTaskParser from '@/components/UserTaskParser'
import data from '../data'

describe('UserTaskParser.ts', () => {
  let obj: UserTaskParser
  let rawTasks: typeof data.items[number]['tasks']
  let sdate: string

  beforeEach(() => {
    rawTasks = data.items[data.items.length - 1].tasks
    sdate = data.sdate
    obj = new UserTaskParser(rawTasks, sdate)
  })

  it('should set the correct properties', () => {
    expect(obj.sdate).toBe(sdate)
    expect(obj.total).toBe(rawTasks.length)
  })

  it('should get correct "dates"', () => {
    const dates = obj.dates
    expect(dates.length).toBe(7)
    expect(dates.includes(sdate)).toBe(true)
  })

  it('should parse extra properties for task object', () => {
    const task = obj.items0[0]
    expect(task).toHaveProperty('edate')
    expect(task).toHaveProperty('weekday')
    expect(task).toHaveProperty('space')
    expect(task).toHaveProperty('canHasFollowingTasks')
  })

  it('should not mutate the input tasks', () => {
    expect(rawTasks[0]).not.toHaveProperty('edate')
    expect(obj.items0[0]).toHaveProperty('edate')
  })

  it('should group tasks correctly', () => {
    const items = obj.items
    let count = 0
    expect(items.length).toBe(3)
    items.forEach((item) => {
      count += (Object.keys(item).length - 1) // subtract the 'sdate' property
    })
    expect(count).toBe(rawTasks.length)
  })
})
