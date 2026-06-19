<script setup lang="ts">
import {Sidebar} from '@/components/ui/sidebar'
</script>

<template>
  <div class="min-h-screen">
    <Sidebar/>
    <main
        :class="[
          'min-h-screen px-4 pt-16 transition-all duration-200 md:px-6 md:pt-6 md:pl-60',
        ]"
    >
      <div class="space-y-6 ml-4">
        <slot/>
      </div>
    </main>
  </div>
</template>
