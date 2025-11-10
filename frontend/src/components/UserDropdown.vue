<template>
  <Dropdown :options="dropdownItems" v-bind="$attrs">
    <template v-slot="{ open }">
      <button
        class="profile card flex h-12 items-center rounded-xl duration-300 ease-in-out shadow-sm"
        :class="isCollapsed
          ? 'w-auto px-0'
          : open
            ? 'w-56 bg-[hsl(0_0%_100%/.55)] px-3'
            : 'w-56 px-3 hover:bg-[hsl(0_0%_100%/.45)]'
        "
      >
        <!-- Icon -->
        <Scale class="h-8 w-8 flex-shrink-0 text-primary" />

        <!-- Text -->
        <div
          class="flex flex-1 flex-col text-right duration-300 ease-in-out truncate"
          :class="isCollapsed
            ? 'mr-0 w-0 overflow-hidden opacity-0'
            : 'mr-2 w-auto opacity-100'
          "
        >
          <div class="text-base font-medium leading-none text-ink-gray-9 truncate">
            شركة إياد البكري وأثير
          </div>

          <div class="mt-1 text-sm leading-none text-ink-gray-7 truncate">
            {{ user.full_name }}
          </div>
        </div>

       
      </button>

      <!-- Dropdown Menu -->
      <div
        v-if="open"
        class="mt-2 w-56 rounded-xl p-2 glass-dropdown shadow-[0_10px_30px_rgba(0,0,0,.15)]
               border border-[hsl(0_0%_100%/.35)] bg-[hsl(0_0%_100%/.65)] backdrop-blur-xl"
        :class="isRTL ? 'text-right' : 'text-left'"
      >
        <div
          v-for="item in dropdownItems"
          :key="item.label"
          @click="item.action()"
          class="px-3 py-2 rounded-lg cursor-pointer font-medium text-[hsl(0_0%_20%)]
                 hover:bg-[hsl(0_0%_100%/.4)] hover:shadow-md duration-200"
        >
          {{ item.label }}
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<script setup>
import { FeatherIcon, Scale } from "lucide-vue-next"
import { Dropdown, useTheme } from "frappe-ui"
import { ref, computed, h, markRaw } from "vue"
import Apps from '@/components/Apps.vue'
import { sessionStore } from '@/stores/session'
import { usersStore } from '@/stores/users'
import { getSettings } from '@/stores/settings'
import { showSettings, isMobileView } from '@/composables/settings'
import { showAboutModal } from '@/composables/modals'
import { confirmLoginToFrappeCloud } from '@/composables/frappecloud'

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

const { settings, brand } = getSettings()
const { logout } = sessionStore()
const { getUser } = usersStore()
const { currentTheme, toggleTheme } = useTheme()

const user = computed(() => getUser() || {})

const isRTL = computed(() => {
  const txt = document.dir || document.documentElement.dir
  return txt === "rtl"
})

const dropdownItems = computed(() => {
  if (!settings.value?.dropdown_items) return []

  let items = settings.value.dropdown_items
  let _dropdownItems = [{ group: 'Dropdown Items', hideLabel: true, items: [] }]

  items.forEach((item) => {
    if (item.hidden) return
    if (item.type !== 'Separator') {
      _dropdownItems[_dropdownItems.length - 1].items.push(dropdownItemObj(item))
    } else {
      _dropdownItems.push({ group: '', hideLabel: true, items: [] })
    }
  })

  return _dropdownItems
})

function dropdownItemObj(item) {
  let _item = JSON.parse(JSON.stringify(item))
  let icon = _item.icon || 'external-link'
  if (typeof icon === 'string' && icon.startsWith('<svg')) {
    icon = markRaw(h('div', { innerHTML: icon }))
  }
  _item.icon = icon

  if (_item.is_standard) {
    return getStandardItem(_item)
  }

  return {
    icon: _item.icon,
    label: __(_item.label),
    onClick: () => window.open(_item.route, _item.open_in_new_window ? '_blank' : '')
  }
}

function getStandardItem(item) {
  switch (item.name1) {
    case 'app_selector': return { component: markRaw(Apps) }
    case 'toggle_theme': return { icon: currentTheme.value === 'dark' ? 'sun' : item.icon, label: __(item.label), onClick: toggleTheme }
    case 'settings': return { icon: item.icon, label: __(item.label), onClick: () => (showSettings.value = true), condition: () => !isMobileView.value }
    case 'login_to_fc': return { icon: h(FrappeCloudIcon), label: __(item.label), onClick: () => confirmLoginToFrappeCloud(), condition: () => !isMobileView.value && window.is_fc_site }
    case 'about': return { icon: item.icon, label: __(item.label), onClick: () => (showAboutModal.value = true) }
    case 'logout': return { icon: item.icon, label: __(item.label), onClick: () => logout.submit() }
  }
}
</script>




<style>
/* ===== THEME TOKENS ===== */
:root {
  --h: 266;
  --s: 92%;
  --l: 56%;
  --txt: hsl(0 0% 12%);
  --bg-1: hsl(252 50% 98%);
  --glass: hsl(0 0% 100%/.6);
  --glass-border: hsl(0 0% 100%/.35);
}
:root.dark {
  --txt: hsl(0 0% 98%);
  --bg-1: hsl(230 35% 7%);
  --glass: hsl(230 28% 12%/.45);
  --glass-border: hsl(0 0% 100%/.12);
}

/* ===== BODY ===== */
html, body, #app { height: 100%; margin: 0;  background: var(--glass); }
body {
  font-family: Inter, "Cairo", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, sans-serif;
  color: var(--txt);
  background:
    radial-gradient(800px 600px at 10% 10%, hsl(calc(var(--h) + 30) 90% 22%/.35), transparent 60%),
    radial-gradient(900px 700px at 90% 10%, hsl(calc(var(--h) - 20) 90% 30%/.25), transparent 60%),
    radial-gradient(900px 900px at 90% 90%, hsl(calc(var(--h) + 60) 90% 25%/.28), transparent 55%),
    var(--bg-1);
}

/* ===== LAYOUT ===== */
.app {
  min-height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  padding: 18px;
  background: var(--glass);
}
.card {
   background: linear-gradient(
    135deg,
    hsl(var(--h) 70% 60% / 0.25),
    hsl(var(--h) 70% 45% / 0.25)
  );
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* ===== HEADER ===== */
.header {
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.logo {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    hsl(var(--h) var(--s) calc(var(--l) + 6%)),
    hsl(calc(var(--h) - 25) 85% 58%)
  );

}

/* ===== PROFILE BUTTON ===== */
.profile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  padding: 4px 8px;
  border-radius: 18px;
  border: 1px solid var(--glass-border);
   background: linear-gradient(
    135deg,
    hsl(var(--h) 70% 60% / 0.25),
    hsl(var(--h) 70% 45% / 0.25)
  );
  color: var(--txt);

  cursor: pointer;
  transition: 0.3s ease;
}
.profile:hover { transform: translateY(-1px); }
.bg-glass-active {
  background: hsl(0 0% 100% / 0.6);
  backdrop-filter: blur(10px);
}
.hover\:bg-glass-hover:hover {
  background: hsl(0 0% 100% / 0.45);
}

/* ===== PROFILE CONTENT ===== */
.profile-info {
  display: flex;
  flex-direction: column;
  text-align: right;
  overflow: hidden;
  transition: 0.3s ease;
}
.profile-company {
  font-size: 1rem;
  font-weight: 900;
  line-height: 1.1;
}
.profile-user {
  font-size: 0.9rem;
  opacity: 0.75;
  line-height: 1.1;
}
.chevron {
  width: 18px;
  height: 18px;
  opacity: 0.6;
  flex-shrink: 0;
}

/* ===== COLLAPSED ===== */
.collapsed .profile-info,
.collapsed .chevron {
  width: 0;
  opacity: 0;
  margin: 0;
  overflow: hidden;
}
.collapsed {
  justify-content: center;
  padding: 14px;
}

.profile:hover { transform: translateY(-1px); }
.bg-glass-active {
  background: hsl(0 0% 100% / 0.6);
  backdrop-filter: blur(10px);
}
.hover\:bg-glass-hover:hover {
  background: hsl(0 0% 100% / 0.45);
}
</style>
