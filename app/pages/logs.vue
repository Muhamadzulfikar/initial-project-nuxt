<script setup lang="ts">
import type {BreadCrumbItem} from '@nuxt/ui'

const breadcrumbs = <BreadCrumbItem[]>([
  {label: 'Logging', icon: 'i-lucide-clock', to: '/logs'}
])

function getLogDetailLink(filename: string, level: string) {
  return `/logs-detail?filename=${filename}&level=${level}`
}
</script>

<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="font-bold text-2xl">Logging</h1>
    <UBreadcrumb class="text-x" :items="breadcrumbs"/>
  </div>

  <UDataTable
      api-url="/api/logs"
      :columns="[
        { key: 'filename', label: 'File Name' },
        { key: 'total_info', label: 'Info' },
        { key: 'total_warning', label: 'Warning' },
        { key: 'total_error', label: 'Error' }
      ]"
      :is-hide-actions="true">
    <template #total_info-cell="{ row }">
      <UButton
          icon="i-lucide-eye"
          variant="soft"
          color="info"
          size="sm"
          :to="getLogDetailLink(row.original.filename, 'info')">
        <span class="font-semibold">{{ row.original.total_info }}</span>
      </UButton>
    </template>
    <template #total_warning-cell="{ row }">
      <UButton
          icon="i-lucide-eye"
          variant="soft"
          color="warning"
          size="sm"
          :to="getLogDetailLink(row.original.filename, 'warning')">
        <span class="font-semibold">{{ row.original.total_warning }}</span>
      </UButton>
    </template>
    <template #total_error-cell="{ row }">
      <UButton
          icon="i-lucide-eye"
          variant="soft"
          color="error"
          size="sm"
          :to="getLogDetailLink(row.original.filename, 'error')">
        <span class="font-semibold">{{ row.original.total_error }}</span>
      </UButton>
    </template>
  </UDataTable>
</template>
