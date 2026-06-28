<script setup lang="ts">
const {locales, setLocale} = useI18n()
const currentLocale = ref('en')
const open = ref(true)

const localeOptions = computed(() => locales.value.map(locale => ({
  value: locale.code,
  label: locale.code === 'en' ? '🇺🇸 English' : '🇮🇩 Indonesia'
})))

watch(currentLocale, (newLocale) => {
  setLocale(newLocale)
})

const route = useRoute()

const {data: notifications} = await useFetch('/api/notifications')

const notificationCount = computed(() => notifications.value?.count ?? 0)

const notificationItems = computed<DropdownMenuItem[][]>(() => {
  if (!notifications.value?.data) return [[]]

  return [
    notifications.value.data.map(item => ({
      label: item.label,
      icon: 'i-lucide-dot',
      to: item.to
    })),
    [
      {label: 'Mark all as read', icon: 'i-lucide-check-check'}
    ]
  ]
})

const {data: navItems} = await useFetch('/api/nav-items')

function getItems(): NavigationMenuItem[] {
  if (!navItems.value) return []

  const currentPath = route.path

  return navItems.value.map((item) => {
    const hasActiveChild = item.children?.some(child => child.to === currentPath)

    return {
      label: item.label,
      icon: item.icon,
      to: item.to,
      defaultOpen: hasActiveChild ? true : undefined,
      children: item.children?.map(child => ({
        label: child.label,
        icon: child.icon,
        to: child.to
      }))
    }
  }) satisfies NavigationMenuItem[]
}

</script>

<template>
  <div class="flex flex-1 h-screen overflow-hidden">
    <USidebar
        v-model:open="open"
        collapsible="icon"
    >
      <template #header>
        <div class="flex flex-col gap-2">
          <UHeader title="Initial Project"/>
          <USelect
              v-model="currentLocale"
              :items="localeOptions"
              placeholder="Language"
              class="w-50"
          />
        </div>
      </template>

      <template #default="{ state }">
        <UNavigationMenu
            :key="state"
            :items="getItems()"
            orientation="vertical"
            :ui="{ link: 'mb-2 overflow-hidden' }"
        />
      </template>

      <template #footer>
      </template>
    </USidebar>

    <div class="flex-1 flex flex-col overflow-hidden">
      <div class="h-(--ui-header-height) shrink-0 flex items-center justify-between px-4 border-b border-default">
        <div class="flex items-center gap-3">
          <UButton
              icon="i-lucide-menu"
              color="neutral"
              variant="ghost"
              aria-label="Toggle sidebar"
              @click="open = !open"
          />
        </div>

        <UDropdownMenu
            :items="notificationItems"
            :content="{ align: 'end', collisionPadding: 12 }"
        >
          <UButton
              color="neutral"
              variant="ghost"
              aria-label="Notifications"
              class="relative"
          >
            <UIcon name="i-lucide-bell" class="w-5 h-5"/>
            <UBadge
                v-if="notificationCount > 0"
                :label="notificationCount > 9 ? '9+' : String(notificationCount)"
                color="error"
                variant="solid"
                class="absolute -top-1 -right-1 min-w-5 h-5 justify-center"
            />
          </UButton>
        </UDropdownMenu>
      </div>

      <main class="flex-1 p-6 overflow-auto">
        <slot/>
      </main>
    </div>
  </div>
</template>
