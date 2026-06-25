<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui'
const loading = ref(false)
const dataTableRef = ref()
const statusFilter = ref('')

const statusOptions = <SelectItem[]> ([
  {value: '', label: 'All Status'},
  {value: 'paid', label: 'Paid'},
  {value: 'failed', label: 'Failed'},
  {value: 'refunded', label: 'Refunded'}
]);

onMounted(() => {
  dataTableRef.value?.fetchData()
})
</script>

<template>
  <div>
    <UButton size="md" icon="i-lucide-plus" class="mb-4">Add Data</UButton>

    <div class="mb-4">
      <USelect
          v-model="statusFilter"
          :items="statusOptions"
          placeholder="Filter by status"
      />
    </div>

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
  </div>
</template>
