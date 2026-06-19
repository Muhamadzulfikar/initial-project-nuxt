<script setup lang="ts">
const { data: tables } = await useFetch('/api/datatables')
</script>

<template>
  <UButton size="md" icon="i-lucide-plus" class="mb-4">Add Data</UButton>
  <UDataTable :tables-data="tables">

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
