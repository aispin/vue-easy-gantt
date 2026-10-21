<template>
  <tr class="at-eg-row">
    <td class="at-eg-cell-a">
      <div class="at-eg-user">
        <img
          v-if="user.avatar && !avatarError"
          :src="user.avatar"
          :alt="user.name"
          class="at-eg-avatar"
          @error="avatarError = true"
        >
        <span
          v-else
          class="at-eg-avatar at-eg-avatar--fb"
        >{{ initial }}</span>
        <div class="at-eg-user-meta">
          <p class="at-eg-name">
            {{ user.name }}
          </p>
          <p class="at-eg-sub">
            {{ tasks.length }} tasks this week
          </p>
        </div>
      </div>
    </td>
    <td
      v-for="(d, i) in dates"
      :key="d.date"
      class="at-eg-cell-b"
      :class="{ 'at-eg-today': d.isToday, 'at-eg-weekend': d.isWeekend }"
      :style="{ '--eg-col': i } as CSSProperties"
    >
      <div
        class="at-eg-tgroup"
        :style="{ '--eg-tall': tasks.length } as CSSProperties"
      >
        <task-item
          v-for="(task, idx) in cellTasks(d.date)"
          :key="task._id || idx"
          :task="task"
          :floor-index="idx"
          @task-click="onTaskClick"
        />
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { computed, ref, type CSSProperties, type PropType } from 'vue'
import TaskItem from './TaskItem.vue'
import type { DayCell, EgtTask, EgtTaskRow, EgtUserTask, TaskClickPayload } from '../types'

const props = defineProps({
  user: {
    type: Object as PropType<EgtUserTask>,
    required: true
  },
  dates: {
    type: Array as PropType<DayCell[]>,
    required: true
  },
  tasks: {
    type: Array as PropType<EgtTaskRow[]>,
    required: true
  }
})

const emit = defineEmits<{
  'task-click': [payload: TaskClickPayload]
}>()

const avatarError = ref(false)

const initial = computed(() => (props.user.name || '?').trim().charAt(0).toUpperCase())

const cellTasks = (date: string): EgtTask[] =>
  props.tasks
    .map(row => row[date])
    .filter((t): t is EgtTask => typeof t === 'object' && t !== null)

const onTaskClick = (task: EgtTask) => emit('task-click', { task, user: props.user })
</script>
