<template>
  <div
    class="at-eg"
    :class="'at-eg--' + theme"
  >
    <div class="at-eg-scroll">
      <table class="at-eg-tb">
        <thead>
          <tr>
            <th class="at-eg-cell-first">
              #
            </th>
            <th
              v-for="d in dates"
              :key="d.date"
              :class="{ 'at-eg-today': d.isToday, 'at-eg-weekend': d.isWeekend }"
            >
              <span
                v-if="showWeekday"
                class="at-eg-wd"
              >{{ d.weekday }}</span>
              <span class="at-eg-dt">{{ d.label }}</span>
              <span
                v-if="d.isToday"
                class="at-eg-chip"
              >TODAY</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <user-tasks
            v-for="(obj, idx) in egtasks"
            :key="obj.user._id || idx"
            :user="obj.user"
            :dates="dates"
            :tasks="obj.tasks"
            @task-click="onTaskClick"
          />
        </tbody>
      </table>
    </div>
    <div
      v-if="loading"
      class="at-eg-mask"
    >
      <slot name="spinner">
        <span
          class="at-eg-spinner"
          :class="'at-eg-spinner--' + spinner"
        />
      </slot>
    </div>
    <div
      v-else-if="!egtasks.length"
      class="at-eg-empty"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="16"
          rx="2"
        />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </svg>
      <p>No tasks this week</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek.js'
import UserTasks from './UserTasks.vue'
import UserTaskParser from './UserTaskParser'
import type { DayCell, EgtUserTask, TaskClickPayload } from '../types'

dayjs.extend(isoWeek)

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

const props = defineProps({
  utasks: {
    type: Array as PropType<EgtUserTask[]>,
    default: () => []
  },
  sdate: {
    type: String,
    default: ''
  },
  /** 'ring' | 'dots' */
  spinner: {
    type: String,
    default: 'ring'
  },
  loading: {
    type: Boolean,
    default: false
  },
  /** 'dark' | 'light' */
  theme: {
    type: String,
    default: 'dark'
  },
  showWeekday: {
    type: Boolean,
    default: true
  },
  highlightWeekend: {
    type: Boolean,
    default: true
  },
  highlightToday: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits<{
  'task-click': [payload: TaskClickPayload]
}>()

const dates = computed<DayCell[]>(() => {
  if (!props.sdate) return []
  const start = dayjs(props.sdate)
  if (!start.isValid()) return []
  const today = dayjs().format('YYYY-MM-DD')
  return WEEKDAYS.map((wd, i) => {
    const d = start.isoWeekday(i + 1)
    const date = d.format('YYYY-MM-DD')
    return {
      date,
      weekday: wd,
      label: d.format('MM-DD'),
      isToday: props.highlightToday && date === today,
      isWeekend: props.highlightWeekend && i >= 5
    }
  })
})

const egtasks = computed(() => {
  if (!props.sdate) return []
  return props.utasks.map(item => ({
    user: item,
    tasks: new UserTaskParser(item.tasks || [], props.sdate).items
  }))
})

const onTaskClick = (payload: TaskClickPayload) => emit('task-click', payload)
</script>

<style src="../styles/style.css"></style>
