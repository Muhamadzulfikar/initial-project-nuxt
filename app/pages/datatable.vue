<script setup lang="ts">
import { ref, computed } from 'vue'

const page = ref(1)
const pageSize = ref(10)
const search = ref('')
const sortBy = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc'>('asc')

const queryParams = computed(() => ({
  page: page.value,
  pageSize: pageSize.value,
  search: search.value,
  sortBy: sortBy.value,
  sortOrder: sortOrder.value
}))

const { data: tables, pending, refresh } = await useFetch('/api/datatables', {
  query: queryParams,
  watch: [queryParams]
})

function handleUpdatePage(val: number) {
  page.value = val
}

function handleUpdatePageSize(val: number) {
  pageSize.value = val
}

function handleUpdateSearch(val: string) {
  search.value = val
}

function handleUpdateSortBy(val: string | null) {
  sortBy.value = val
}

function handleUpdateSortOrder(val: 'asc' | 'desc') {
  sortOrder.value = val
}
</script>

<template>
  <div>
    <UButton size="md" icon="i-lucide-plus" class="mb-4">Add Data</UButton>
    <UDataTable
      :tables-data="tables"
      :loading="pending"
      server-mode
      :page-model="page"
      :page-size-model="pageSize"
      :search-model="search"
      :sort-by-model="sortBy"
      :sort-order-model="sortOrder"
      @update:page-model="handleUpdatePage"
      @update:page-size-model="handleUpdatePageSize"
      @update:search-model="handleUpdateSearch"
      @update:sort-by-model="handleUpdateSortBy"
      @update:sort-order-model="handleUpdateSortOrder"
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
