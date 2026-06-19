<style scoped>
:deep(td.text-muted) {
  color: #000000 !important;
}
</style>

<script setup lang="ts">
import {ref, computed, watch} from 'vue'

const search = ref('')
const page = ref(1)
const pageSize = ref(10)

const sortKey = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc'>('asc')

const pageSizeOptions = [10, 25, 50, 100]

const props = defineProps({
  tablesData: {
    type: Object,
    required: true,
    default: () => ({data: [], total: 0})
  }
})

function handleSort(key: string) {
  if (key === 'actions') return

  if (sortKey.value === key) {
    if (sortOrder.value === 'asc') {
      sortOrder.value = 'desc'
    } else {
      sortKey.value = null
    }
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  page.value = 1
}

const columns = computed(() => {
  if (!props.tablesData?.data?.length) return []
  const firstRow = props.tablesData.data[0]

  const cols = Object.keys(firstRow).map(key => ({
    id: key,
    key: key,
    accessorKey: key,
    header: key.charAt(0).toUpperCase() + key.slice(1),
    class: 'cursor-pointer select-none'
  }))

  cols.push({
    id: 'actions',
    key: 'actions',
    accessorKey: 'actions',
    header: 'Actions',
    class: ''
  })

  return cols
})

const filteredData = computed(() => {
  if (!props.tablesData?.data) return []
  let items = props.tablesData.data

  if (!search.value) return items
  const searchQ = search.value.toLowerCase()
  return items.filter((item: any) =>
      Object.values(item).some(val =>
          String(val).toLowerCase().includes(searchQ)
      )
  )
})

const sortedData = computed(() => {
  const items = [...filteredData.value]

  if (!sortKey.value) return items

  const key = sortKey.value
  const order = sortOrder.value

  return items.sort((a: any, b: any) => {
    let valA = a[key]
    let valB = b[key]

    if (typeof valA === 'string') valA = valA.toLowerCase()
    if (typeof valB === 'string') valB = valB.toLowerCase()

    if (valA < valB) return order === 'asc' ? -1 : 1
    if (valA > valB) return order === 'asc' ? 1 : -1
    return 0
  })
})

const totalPages = computed(() => {
  const total = Math.ceil(sortedData.value.length / pageSize.value)
  return total > 0 ? total : 1
})

const paginatedData = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return sortedData.value.slice(start, start + pageSize.value)
})

watch(search, () => {
  page.value = 1
})

watch(pageSize, () => {
  page.value = 1
})

function prevPage() {
  if (page.value > 1) page.value--
}

function nextPage() {
  if (page.value < totalPages.value) page.value++
}
</script>

<template>
  <UCard>
    <div class="flex justify-end">
      <UInput v-model="search" placeholder="Search..." class="mb-4"/>
    </div>

    <UTable
        :data="paginatedData"
        :columns="columns"
        class="flex-1"
    >
      <template v-for="col in columns" #[`${col.key}-header`]="{ column }">
        <div
            :class="col.key !== 'actions' ? 'cursor-pointer hover:text-primary-600 flex items-center justify-between gap-1 select-none w-full h-full' : ''"
            @click="handleSort(col.key)"
        >
          <span>{{ col.header }}</span>

          <div v-if="col.key !== 'actions'" class="flex flex-col text-[10px] leading-[6px]">
            <span
                :class="sortKey === col.key && sortOrder === 'asc' ? 'text-primary-600 dark:text-primary-400 font-bold' : 'text-gray-400 dark:text-gray-600'">▲</span>
            <span
                :class="sortKey === col.key && sortOrder === 'desc' ? 'text-primary-600 dark:text-primary-400 font-bold' : 'text-gray-400 dark:text-gray-600'">▼</span>
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
        >
          <option v-for="option in pageSizeOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <UButton icon="i-lucide-chevron-left" variant="ghost" :disabled="page === 1" @click="prevPage"/>
        <span class="text-sm text-muted">Page {{ page }} of {{ totalPages }}</span>
        <UButton icon="i-lucide-chevron-right" variant="ghost" :disabled="page === totalPages" @click="nextPage"/>
      </div>
    </div>
  </UCard>
</template>
