<script setup lang="ts">
const loading = ref(false)
const dataTableRef = ref()

onMounted(() => {
  dataTableRef.value?.fetchData()
})
</script>

<template>
  <div>
    <UButton size="md" icon="i-lucide-plus" class="mb-4">Add Data</UButton>
    <UDataTable
      ref="dataTableRef"
      server-mode
      api-url="/api/datatables"
      :loading="loading"
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
