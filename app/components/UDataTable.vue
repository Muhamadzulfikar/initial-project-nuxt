<style scoped>
:deep(td.text-muted) {
  color: white !important;
}
</style>

<script setup lang="ts">
import {ref, computed, watch} from 'vue'

const page = ref(1)
const pageSize = ref(10)
const searchInput = ref('')
const searchQuery = ref('')
const sortKey = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc'>('asc')

const pageSizeOptions = [10, 25, 50, 100]

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  apiUrl: {
    type: String,
    default: ''
  },
  filters: {
    type: Object,
    default: () => ({})
  },
  columns: {
    type: Array as PropType<{key: string, label: string}[]>,
    default: () => []
  },
  isHideActions: {
    type: Boolean,
    default: false
  }
})

const tablesData = ref({
  data: [] as any[],
  total: 0,
  page: 1,
  pageSize: 10
})

const emit = defineEmits(['update:loading'])

async function fetchData() {
  if (!props.apiUrl) return

  emit('update:loading', true)
  try {
    const query = {
      page: page.value,
      pageSize: pageSize.value,
      search: searchQuery.value,
      sortBy: sortKey.value,
      sortOrder: sortOrder.value,
      ...props.filters
    }
    const result = await $fetch(props.apiUrl, {query})
    tablesData.value = result as any
  } finally {
    emit('update:loading', false)
  }
}

watch(
    [page, pageSize, searchQuery, sortKey, sortOrder, () => JSON.stringify(props.filters)],
    () => fetchData(),
    { immediate: true }
)

defineExpose({fetchData})

function handleSort(key: string) {
  if (key === 'actions') return

  if (sortKey.value === key) {
    if (sortOrder.value === 'asc') {
      sortOrder.value = 'desc'
    } else {
      sortKey.value = null
      sortOrder.value = 'asc'
    }
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  page.value = 1
}

function handleSearch() {
  searchQuery.value = searchInput.value
  page.value = 1
  fetchData()
}

const tableColumns = computed(() => {
  const cols = props.columns.map(col => ({
    id: col.key,
    key: col.key,
    accessorKey: col.key,
    header: col.label,
    class: 'cursor-pointer select-none'
  }))

  if (!props.isHideActions) {
    cols.push({
      id: 'actions',
      key: 'actions',
      accessorKey: 'actions',
      header: 'Actions',
      class: ''
    })
  }

  return cols
})

const totalPages = computed(() => {
  const total = tablesData.value?.total || 0
  return Math.ceil(total / pageSize.value) || 1
})

const paginatedData = computed(() => {
  return tablesData.value?.data || []
})

watch(pageSize, () => {
  page.value = 1
})

function prevPage() {
  if (page.value > 1) {
    page.value--
  }
}

function nextPage() {
  if (page.value < totalPages.value) {
    page.value++
  }
}

function firstPage() {
  if (page.value !== 1) {
    page.value = 1
  }
}

function lastPage() {
  if (page.value !== totalPages.value) {
    page.value = totalPages.value
  }
}

function onPageSizeChange() {
  page.value = 1
}
</script>

<template>
  <UCard>
    <div class="flex justify-end gap-2 mb-4">
      <UInput
          v-model="searchInput"
          placeholder="Search..."
          @keyup.enter="handleSearch"
      />
      <UButton icon="i-lucide-search" variant="soft" @click="handleSearch"/>
    </div>

    <UTable
        :data="paginatedData"
        :columns="tableColumns"
        class="flex-1"
        :loading="loading"
    >
      <template v-for="col in tableColumns" #[`${col.key}-header`]="{ column }">
        <div
            :class="col.key !== 'actions' ? 'cursor-pointer hover:text-primary-600 flex items-center justify-between gap-1 select-none w-full h-full' : ''"
            @click="handleSort(col.key)"
        >
          <span>{{ col.header }}</span>

          <div v-if="col.key !== 'actions'" class="flex flex-col text-[10px] leading-[6px]">
            <span
                class="mb-1"
                :class="sortKey === col.key && sortOrder === 'asc' ? 'text-primary-600 dark:text-primary-400 font-bold' : 'text-gray-400 dark:text-gray-600'"
            >▲</span>
            <span
                :class="sortKey === col.key && sortOrder === 'desc' ? 'text-primary-600 dark:text-primary-400 font-bold' : 'text-gray-400 dark:text-gray-600'"
            >▼</span>
          </div>
        </div>
      </template>

      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"/>
      </template>
    </UTable>

    <div class="flex justify-between items-center gap-2 p-4">
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted">Rows per page:</span>
        <select
            v-model.number="pageSize"
            class="block w-20 rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm bg-white dark:bg-gray-900 dark:text-white dark:ring-gray-700"
            @change="onPageSizeChange"
        >
          <option v-for="option in pageSizeOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <UButton icon="i-lucide-chevrons-left" variant="ghost" :disabled="page === 1" @click="firstPage"/>
        <UButton icon="i-lucide-chevron-left" variant="ghost" :disabled="page === 1" @click="prevPage"/>
        <span class="text-sm text-muted">Page {{ page }} of {{ totalPages }}</span>
        <UButton icon="i-lucide-chevron-right" variant="ghost" :disabled="page === totalPages" @click="nextPage"/>
        <UButton icon="i-lucide-chevrons-right" variant="ghost" :disabled="page === totalPages" @click="lastPage"/>
      </div>
    </div>
  </UCard>
</template>
