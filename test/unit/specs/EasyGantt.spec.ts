import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek.js'
import EasyGantt from '@/components/EasyGantt.vue'
import data from '../data'
import type { EgtUserTask } from '@/types'

dayjs.extend(isoWeek)

describe('EasyGantt.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(EasyGantt, {
      props: {
        sdate: data.sdate,
        utasks: data.items.slice()
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render one row per user', () => {
    expect(wrapper.findAll('.at-eg-row')).toHaveLength(data.items.length)
  })

  it('should render 7 day columns plus the first cell', () => {
    expect(wrapper.findAll('thead th')).toHaveLength(8)
  })

  it('should render task bars', () => {
    expect(wrapper.findAll('.at-eg-task').length).toBeGreaterThan(0)
  })

  it('should update rows after the utasks prop changes', async () => {
    await wrapper.setProps({ utasks: data.items.slice(0, 1) as EgtUserTask[] })
    expect(wrapper.findAll('.at-eg-row')).toHaveLength(1)
  })

  it('should toggle the loading mask', async () => {
    await wrapper.setProps({ loading: true })
    expect(wrapper.find('.at-eg-mask').exists()).toBe(true)
    await wrapper.setProps({ loading: false })
    expect(wrapper.find('.at-eg-mask').exists()).toBe(false)
  })

  it('should emit task-click with task and user', async () => {
    await wrapper.find('.at-eg-task').trigger('click')
    const events = wrapper.emitted('task-click')
    expect(events).toBeTruthy()
    expect(events?.[0]?.[0]).toHaveProperty('task')
    expect(events?.[0]?.[0]).toHaveProperty('user')
  })

  it('should highlight today column', () => {
    const thisMonday = dayjs().isoWeekday(1).format('YYYY-MM-DD')
    const w = mount(EasyGantt, { props: { sdate: thisMonday, utasks: [] } })
    expect(w.find('.at-eg-chip').exists()).toBe(true)
    expect(w.find('.at-eg-chip').text()).toBe('TODAY')
    w.unmount()
  })
})
