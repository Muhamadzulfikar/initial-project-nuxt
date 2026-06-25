<script setup lang="ts">
import type {SelectItem, BreadCrumbItem} from '@nuxt/ui'

const loading = ref(false)
const dataTableRef = ref()
const statusFilter = ref()

const statusOptions = <SelectItem[]>([
  {value: null, label: 'All Status'},
  {value: 'paid', label: 'Paid'},
  {value: 'failed', label: 'Failed'},
  {value: 'refunded', label: 'Refunded'}
]);

const breadcrumbs = <BreadCrumbItem[]>([
  {label: 'Datatable', icon: 'i-lucide-table',  to: '/datatable'}
])

onMounted(() => {
  dataTableRef.value?.fetchData()
})
</script>

<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="font-bold text-2xl">Data Table</h1>
     <UBreadcrumb class="text-x" :items="breadcrumbs" />
  </div>
  <UButton size="md" icon="i-lucide-plus" class="mb-4">Add Data</UButton>

  <UCard class="mb-4 flex">
    <USelect
        v-model="statusFilter"
        :items="statusOptions"
        placeholder="Filter by status"
        class="mr-4"
    />
  </UCard>

  <UDataTable
      ref="dataTableRef"
      server-mode
      api-url="/api/datatables"
      :loading=true
      :filters="{ status: statusFilter }"
      @update:loading="loading = $event"
  >
    <template #status-cell="{ row }">
      <UBadge color="primary">
        {{ row.original.status }}
      </UBadge>
    </template>

    <template #actions-cell="{ row }">
      <UButton size="xs" color="red" variant="soft">Delete {{ row.original.id }}</UButton>
    </template>
  </UDataTable>
</template>
