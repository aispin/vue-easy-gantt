<template>
  <div class="demo-shell reveal">
    <div class="demo-toolbar">
      <button class="tool-btn" :class="{ 'is-active': theme === 'dark' }" @click="theme = 'dark'">
        Dark theme
      </button>
      <button class="tool-btn" :class="{ 'is-active': theme === 'light' }" @click="theme = 'light'">
        Light theme
      </button>
      <span class="spacer" />
      <button class="tool-btn" @click="reload">Reload (loading)</button>
      <button class="tool-btn" @click="shuffle">Shuffle colors</button>
      <button class="tool-btn" @click="reset">Reset</button>
    </div>
    <div class="demo-body">
      <easy-gantt
        :sdate="sdate"
        :utasks="utasks"
        :theme="theme"
        :loading="loading"
        @task-click="onTaskClick"
      />
      <div class="demo-log">
        <span class="log-prompt">$</span>
        <span v-if="lastClicked">
          task-click → <span class="log-task">"{{ lastClicked.task.title }}"</span>
          by {{ lastClicked.user.name }} · {{ lastClicked.task.duration }}d
        </span>
        <span v-else>click any task bar to see the event payload…</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek.js'
import EasyGantt from '@/components/EasyGantt.vue'
import type { EgtTask, EgtUserTask, TaskClickPayload } from '@/types'
import rawData from '../assets/data.json'

dayjs.extend(isoWeek)

const SHUFFLE_PALETTE = ['#22d3ee', '#a78bfa', '#f472b6', '#fbbf24', '#34d399', '#fb7185', '#818cf8', '#2dd4bf']

const BASE_WEEK = rawData.sdate // '2017-04-03', a Monday
const thisMonday = dayjs().isoWeekday(1).format('YYYY-MM-DD')
const offsetDays = dayjs(thisMonday).diff(dayjs(BASE_WEEK), 'day')

const shiftDate = (date: string): string =>
  dayjs(date).add(offsetDays, 'day').format('YYYY-MM-DD')

const buildTasks = (colorize = false): EgtUserTask[] =>
  rawData.items.map((item: Record<string, unknown>, ui: number) => {
    const tasks = (item.tasks as Record<string, unknown>[]).map((t, ti) => ({
      ...t,
      sdate: shiftDate(t.sdate as string),
      ...(colorize
        ? { color: SHUFFLE_PALETTE[(ui * 3 + ti) % SHUFFLE_PALETTE.length] }
        : {})
    })) as EgtTask[]
    return { ...item, tasks } as EgtUserTask
  })

const sdate = thisMonday
const theme = ref<'dark' | 'light'>('dark')
const loading = ref(false)
const utasks = ref<EgtUserTask[]>(buildTasks())
const lastClicked = ref<TaskClickPayload | null>(null)

const onTaskClick = (payload: TaskClickPayload) => {
  lastClicked.value = payload
}

const reload = () => {
  loading.value = true
  lastClicked.value = null
  window.setTimeout(() => {
    loading.value = false
  }, 1200)
}

const shuffle = () => {
  utasks.value = buildTasks(true)
}

const reset = () => {
  utasks.value = buildTasks()
}
</script>
