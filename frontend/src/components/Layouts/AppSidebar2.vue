<template>
  <div
    dir="ltr"
    class="sidebar card transition-all duration-300 ease-in-out left-sidebar"
  >
    <nav class="nav">
      <div
        v-for="link in links"
        :key="link.label"
        class="nav-item"
        @click="$router.push(link.to)"
      >
        <div class="icon-wrap">
          <component :is="link.icon" class="nav-icon" />
        </div>
        <span class="nav-text">{{ link.label }}</span>
      </div>
    </nav>
  </div>
</template>

<script setup>
import LucideLayoutDashboard from '~icons/lucide/layout-dashboard'
import { Scale } from "lucide-vue-next"
import ContactsIcon from '@/components/Icons/ContactsIcon.vue'
import NoteIcon from '@/components/Icons/NoteIcon.vue'
import TaskIcon from '@/components/Icons/TaskIcon.vue'

const links = [
  { label: "Dashboard", icon: LucideLayoutDashboard, to: "Dashboard" },
  { label: "Suits", icon: Scale, to: "Suits" },
  { label: "Contacts", icon: ContactsIcon, to: "Contacts" },
  { label: "Files", icon: NoteIcon, to: "Notes" },
  { label: "Tasks", icon: TaskIcon, to: "Tasks" },
]
</script>

<style scoped>
.left-sidebar {
  width: 200px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
  height: 100vh;
  padding: 16px;
}

.nav {
  display: grid;
  gap: 12px;
}

.nav-item {
  cursor: pointer;
  text-align: center;
  padding: 12px;
  border-radius: 10px;
  transition: 0.2s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.15);
}

.icon-wrap {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
  margin: 0 auto 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon {
  width: 24px;
  height: 24px;
}
</style>
