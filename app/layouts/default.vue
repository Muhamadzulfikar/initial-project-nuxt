<script setup lang="ts">
import type {DropdownMenuItem, NavigationMenuItem} from '@nuxt/ui'

const open = ref(true)

const colorMode = useColorMode()

const route = useRoute()

const pageNames: Record<string, string> = {
  '/': 'Dashboard',
  '/analytics': 'Analytics',
  '/projects': 'Projects',
  '/settings': 'Settings',
  '/datatable': 'Data Table'
}

const currentPageName = computed(() => pageNames[route.path] || 'Dashboard')

const notificationCount = ref(3)

const notificationItems = computed<DropdownMenuItem[][]>(() => [
  [
    { label: 'You have 3 new messages', icon: 'i-lucide-message' },
    { label: 'Task assigned to you', icon: 'i-lucide-check-square' },
    { label: 'Meeting in 15 minutes', icon: 'i-lucide-calendar' }
  ],
  [
    { label: 'Mark all as read', icon: 'i-lucide-check-check' }
  ]
])

const teams = ref([
  {
    label: 'Nuxt',
    avatar: {
      src: 'https://github.com/nuxt.png',
      alt: 'Nuxt'
    }
  },
  {
    label: 'Vue',
    avatar: {
      src: 'https://github.com/vuejs.png',
      alt: 'Vue'
    }
  },
  {
    label: 'UnJS',
    avatar: {
      src: 'https://github.com/unjs.png',
      alt: 'UnJS'
    }
  }
])
const selectedTeam = ref(teams.value[0])

const teamsItems = computed<DropdownMenuItem[][]>(() => {
  return [
    teams.value.map((team, index) => ({
      ...team,
      kbds: ['meta', String(index + 1)],
      onSelect() {
        selectedTeam.value = team
      }
    })),
    [
      {
        label: 'Create team',
        icon: 'i-lucide-circle-plus'
      }
    ]
  ]
})

const { data: navItems } = await useFetch('/api/side-menu')

function getItems(state: 'collapsed' | 'expanded'): NavigationMenuItem[] {
  if (!navItems.value) return []

  return navItems.value.map((item) => ({
    label: item.label,
    icon: item.icon,
    to: item.to,
    children: item.children?.map(child => ({
      label: child.label,
      icon: child.icon,
      to: child.to
    }))
  })) satisfies NavigationMenuItem[]
}

const user = ref({
  name: 'Benjamin Canac',
  avatar: {
    src: 'https://github.com/benjamincanac.png',
    alt: 'Benjamin Canac'
  }
})

const userItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user'
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card'
    },
    {
      label: 'Settings',
      icon: 'i-lucide-settings',
      to: '/settings'
    }
  ],
  [
    {
      label: 'Appearance',
      icon: 'i-lucide-sun-moon',
      children: [
        {
          label: 'Light',
          icon: 'i-lucide-sun',
          type: 'checkbox',
          checked: colorMode.value === 'light',
          onUpdateChecked(checked: boolean) {
            if (checked) {
              colorMode.preference = 'light'
            }
          },
          onSelect(e: Event) {
            e.preventDefault()
          }
        },
        {
          label: 'Dark',
          icon: 'i-lucide-moon',
          type: 'checkbox',
          checked: colorMode.value === 'dark',
          onUpdateChecked(checked: boolean) {
            if (checked) {
              colorMode.preference = 'dark'
            }
          },
          onSelect(e: Event) {
            e.preventDefault()
          }
        }
      ]
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    },
    {
      label: 'Log out',
      icon: 'i-lucide-log-out'
    }
  ]
])

defineShortcuts(extractShortcuts(teamsItems.value))
</script>

<template>
  <div class="flex flex-1 h-screen overflow-hidden">
    <USidebar
        v-model:open="open"
        collapsible="icon"
        rail
        :ui="{
        container: 'h-full',
        inner: 'bg-elevated/25 divide-transparent',
        body: 'py-0'
      }"
    >
      <template #header>
        <UDropdownMenu
            :items="teamsItems"
            :content="{ align: 'start', collisionPadding: 12 }"
            :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-48' }"
        >
          <UButton
              v-bind="selectedTeam"
              trailing-icon="i-lucide-chevrons-up-down"
              color="neutral"
              variant="ghost"
              square
              class="w-full data-[state=open]:bg-elevated overflow-hidden"
              :ui="{
              trailingIcon: 'text-dimmed ms-auto'
            }"
          />
        </UDropdownMenu>
      </template>

      <template #default="{ state }">
        <UNavigationMenu
            :key="state"
            :items="getItems(state)"
            orientation="vertical"
            :ui="{ link: 'p-1.5 overflow-hidden' }"
        />
      </template>

      <template #footer>
        <UDropdownMenu
            :items="userItems"
            :content="{ align: 'center', collisionPadding: 12 }"
            :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-48' }"
        >
          <UButton
              v-bind="user"
              :label="user?.name"
              trailing-icon="i-lucide-chevrons-up-down"
              color="neutral"
              variant="ghost"
              square
              class="w-full data-[state=open]:bg-elevated overflow-hidden"
              :ui="{
              trailingIcon: 'text-dimmed ms-auto'
            }"
          />
        </UDropdownMenu>
      </template>
    </USidebar>

    <div class="flex-1 flex flex-col overflow-hidden">
      <div class="h-(--ui-header-height) shrink-0 flex items-center justify-between px-4 border-b border-default">
        <div class="flex items-center gap-3">
          <UButton
              icon="i-lucide-panel-left"
              color="neutral"
              variant="ghost"
              aria-label="Toggle sidebar"
              @click="open = !open"
          />
          <h1 class="text-lg font-semibold">{{ currentPageName }}</h1>
        </div>

        <div class="flex items-center gap-2">
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
              <UIcon name="i-lucide-bell" class="w-5 h-5" />
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
      </div>

      <main class="flex-1 p-6 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
