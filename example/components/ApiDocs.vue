<template>
  <div class="api-grid">
    <div class="api-card reveal">
      <div class="api-card-header">
        Props <span class="api-kind">&lt;easy-gantt&gt;</span>
      </div>
      <table class="api-table">
        <thead>
          <tr><th>Name</th><th>Type / Default</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>utasks</td>
            <td><span class="type">EgtUserTask[]</span> <span class="default">[]</span></td>
            <td>Users with their weekly tasks.</td>
          </tr>
          <tr>
            <td>sdate</td>
            <td><span class="type">string</span> <span class="default">''</span></td>
            <td>Week start date (Monday), <code>YYYY-MM-DD</code>.</td>
          </tr>
          <tr>
            <td>theme</td>
            <td><span class="type">'dark' | 'light'</span> <span class="default">'dark'</span></td>
            <td>Built-in theme. Override any token via CSS variables.</td>
          </tr>
          <tr>
            <td>loading</td>
            <td><span class="type">boolean</span> <span class="default">false</span></td>
            <td>Shows the spinner mask overlay.</td>
          </tr>
          <tr>
            <td>spinner</td>
            <td><span class="type">'ring' | 'dots'</span> <span class="default">'ring'</span></td>
            <td>Built-in spinner style (or use the slot).</td>
          </tr>
          <tr>
            <td>showWeekday</td>
            <td><span class="type">boolean</span> <span class="default">true</span></td>
            <td>Show weekday names in the header.</td>
          </tr>
          <tr>
            <td>highlightWeekend</td>
            <td><span class="type">boolean</span> <span class="default">true</span></td>
            <td>Dim Sat / Sun columns.</td>
          </tr>
          <tr>
            <td>highlightToday</td>
            <td><span class="type">boolean</span> <span class="default">true</span></td>
            <td>Glow today's column with a TODAY chip.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="api-card reveal reveal-delay-1">
      <div class="api-card-header">
        Events &amp; Slots <span class="api-kind">v-on / v-slot</span>
      </div>
      <table class="api-table">
        <thead>
          <tr><th>Name</th><th>Payload</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>@task-click</td>
            <td><span class="type">{ task, user }</span></td>
            <td>Fired when a task bar is clicked or activated via keyboard.</td>
          </tr>
          <tr>
            <td>#spinner</td>
            <td>—</td>
            <td>Replace the built-in loading spinner.</td>
          </tr>
        </tbody>
      </table>
      <div class="api-card-header" style="border-top: 1px solid var(--border)">
        Task fields <span class="api-kind">EgtTask</span>
      </div>
      <table class="api-table">
        <thead>
          <tr><th>Name</th><th>Type</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>title</td>
            <td><span class="type">string</span></td>
            <td>Task label shown on the bar.</td>
          </tr>
          <tr>
            <td>sdate</td>
            <td><span class="type">string</span></td>
            <td>Start date, <code>YYYY-MM-DD</code>.</td>
          </tr>
          <tr>
            <td>duration</td>
            <td><span class="type">number</span></td>
            <td>Length in days (auto-clamped to the week).</td>
          </tr>
          <tr>
            <td>color</td>
            <td><span class="type">string?</span></td>
            <td>Custom bar color, e.g. <code>#f43f5e</code>.</td>
          </tr>
          <tr>
            <td>progress</td>
            <td><span class="type">number?</span></td>
            <td>0–100, renders a progress strip.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
// static API reference — no logic needed
</script>
