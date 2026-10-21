<template>
  <div
    class="at-eg-task"
    :class="'at-eg-floor-' + floorIndex"
    :style="styleVars"
    role="button"
    tabindex="0"
    :aria-label="task.title"
    @click="onClick"
    @keydown.enter.prevent="onClick"
    @keydown.space.prevent="onClick"
  >
    <div class="at-eg-task-bar">
      <span class="at-eg-task-title">{{ task.title }}</span>
      <span
        v-if="hasProgress"
        class="at-eg-task-progress"
      >
        <i :style="{ width: progress + '%' }" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, type PropType } from 'vue'
import type { EgtTask } from '../types'

const props = defineProps({
  task: {
    type: Object as PropType<EgtTask>,
    required: true
  },
  floorIndex: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits<{
  'task-click': [task: EgtTask]
}>()

const styleVars = computed(() => ({
  '--eg-len': props.task.duration,
  '--eg-floor': props.floorIndex,
  // undefined -> falls back to the default gradient
  '--eg-color': props.task.color
}) as CSSProperties)

const hasProgress = computed(() => typeof props.task.progress === 'number')

const progress = computed(() => Math.min(100, Math.max(0, props.task.progress ?? 0)))

const onClick = () => emit('task-click', props.task)
</script>
