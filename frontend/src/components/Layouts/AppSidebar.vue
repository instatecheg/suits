<template>
  <div
    dir="rtl"
    class="sidebar card transition-all duration-300 ease-in-out"
    :class="isSidebarCollapsed ? 'collapsed' : 'expanded'"
  >
    <!-- User Profile -->
    <div class="profile">
      <UserDropdown :isCollapsed="isSidebarCollapsed" />
    </div>

    <!-- Navigation -->
    <nav v-if="!isSidebarCollapsed" class="nav">
      <div
        v-for="view in allViews"
        :key="view.label"
        class="nav-section"
      >
        <div
          v-if="!view.hideLabel"
          class="section-label"
        >
          {{ rtl ? view.name_ar || view.name : view.name }}
        </div>

        <div
  v-for="link in view.views"
  :key="link.label"
  class="nav-item"
  @click="$router.push(link.to)"
>
  <div class="icon-wrap">
    <component :is="link.icon" class="nav-icon" />
  </div>
  <span class="nav-text">
    {{ rtl ? link.label_ar || link.label_ar : link.label_ar }}
  </span>
</div>

      </div>
    </nav>

    <!-- Collapsed Mode -->
    <nav v-else class="nav-collapsed">
      <div
        v-for="view in allViews"
        :key="view.label"
        class="nav-collapsed-group"
      >
        <div
          v-for="link in view.views"
          :key="link.label"
          class="nav-icon-only"
          @click="$router.push(link.to)"
        >
          <div class="icon-wrap">
            <component :is="link.icon" class="nav-icon" />
          </div>
        </div>
      </div>
    </nav>

    <!-- Collapse Button -->
    <div class="sidebar-footer">
      <button
        class="toggle-btn"
        @click="isSidebarCollapsed = !isSidebarCollapsed"
      >
        <CollapseSidebar
          class="toggle-icon"
          :class="{ rotated: isSidebarCollapsed }"
        />
        <span v-if="!isSidebarCollapsed">
          {{ isSidebarCollapsed ? __('Expand') : __('Collapse') }}
        </span>
      </button>
    </div>
  </div>
</template>



<style scoped>

/* Import Amiri font from Google */
@import url('https://fonts.googleapis.com/earlyaccess/amiri.css');

/* Force Amiri font globally */
html, body, #case-app, icon-wrap, profile{
  font-family: 'Amiri', serif !important;
}
/* ===== GLASS SIDEBAR ===== */
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background: linear-gradient(
    135deg,
    hsl(var(--h) 70% 60% / 0.25),
    hsl(var(--h) 70% 45% / 0.25)
  );
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  font-family: 'Amiri', serif !important;
}
:root.dark .sidebar {
  background:hsl(230 28% 12%/.45);
}
.sidebar.expanded { width: 200px; }
.sidebar.collapsed { width: 80px; }
.sidebar,
.profile {
  background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1)) !important;
}
/* ===== PROFILE ===== */
.profile {
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(
    135deg,
    hsl(var(--h) 70% 60% / 0.25),
    hsl(var(--h) 70% 45% / 0.25)
  );
  border-bottom: 1px solid var(--glass-border);
  gap: 1px;
  font-family: 'Amiri', serif !important;
}

/* ===== NAVIGATION ===== */
.nav { display: grid; gap: 12px; padding: 16px; overflow-y: auto; }
.nav-section + .nav-section { margin-top: 1rem; }
.section-label {font-family: 'Amiri', serif !important;  font-size: 0.8rem; font-weight: 900; color: hsl(var(--h) 80% 75%); text-transform: uppercase; margin-bottom: 6px; }
.nav-item { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px; padding: 16px 12px; width: 100%; cursor: pointer; background: none !important; transition: transform 0.15s ease, background 0.2s ease; margin-bottom: 10px; }
:root.dark .nav-item { background: hsl(0 0% 100% / 0.06); }
.nav-item:hover { transform: translateY(-1px); background: linear-gradient(135deg, hsl(var(--h) 70% 60% / 0.25), hsl(var(--h) 70% 45% / 0.25)); }

.icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--glass-border);
  background: linear-gradient(145deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05)); /* Glass effect */
  box-shadow: inset -4px -4px 8px rgba(255,255,255,0.2), inset 4px 4px 8px rgba(0,0,0,0.1); /* 2D glass sphere */
  margin-bottom: 6px;
}

.nav-icon { width: 32px; height: 32px; color: hsl(var(--h) 80% 70%); }
.nav-text { font-size: 0.95rem; font-weight: 800; color: var(--txt); margin-top: 4px; }

/* ===== COLLAPSED ===== */
.nav-collapsed { display: flex; flex-direction: column; align-items: center; padding: 16px 0; gap: 18px; }
.nav-icon-only { cursor: pointer; transition: transform 0.2s ease; }
.nav-icon-only:hover { transform: scale(1.1); }

/* ===== FOOTER TOGGLE ===== */
.sidebar-footer { font-family: 'Amiri', serif !important; padding: 14px; display: flex; justify-content: center; border-top: 1px solid var(--glass-border); }
.toggle-btn { display: inline-flex; align-items: center; gap: 8px; border: 0; background: transparent; color: hsl(var(--h) 80% 70%); font-weight: 800; cursor: pointer; transition: color 0.2s ease; }
.toggle-btn:hover { color: hsl(var(--h) 85% 75%); }
.toggle-icon { width: 20px; height: 20px; transition: transform 0.3s ease; }
.toggle-icon.rotated { transform: rotateY(180deg); }
</style>
<script setup>
import {  Scale } from "lucide-vue-next"
import LucideLayoutDashboard from '~icons/lucide/layout-dashboard'
import CRMLogo from '@/components/Icons/CRMLogo.vue'
import InviteIcon from '@/components/Icons/InviteIcon.vue'
import ConvertIcon from '@/components/Icons/ConvertIcon.vue'
import CommentIcon from '@/components/Icons/CommentIcon.vue'
import EmailIcon from '@/components/Icons/EmailIcon.vue'
import StepsIcon from '@/components/Icons/StepsIcon.vue'
import Section from '@/components/Section.vue'
import PinIcon from '@/components/Icons/PinIcon.vue'
import UserDropdown from '@/components/UserDropdown.vue'
import SquareAsterisk from '@/components/Icons/SquareAsterisk.vue'
import LeadsIcon from '@/components/Icons/LeadsIcon.vue'
import DealsIcon from '@/components/Icons/DealsIcon.vue'
import ContactsIcon from '@/components/Icons/ContactsIcon.vue'
import OrganizationsIcon from '@/components/Icons/OrganizationsIcon.vue'
import NoteIcon from '@/components/Icons/NoteIcon.vue'
import TaskIcon from '@/components/Icons/TaskIcon.vue'
import CalendarIcon from '@/components/Icons/CalendarIcon.vue'
import PhoneIcon from '@/components/Icons/PhoneIcon.vue'
import CollapseSidebar from '@/components/Icons/CollapseSidebar.vue'
import NotificationsIcon from '@/components/Icons/NotificationsIcon.vue'
import HelpIcon from '@/components/Icons/HelpIcon.vue'
import SidebarLink from '@/components/SidebarLink.vue'
import Notifications from '@/components/Notifications.vue'
import Settings from '@/components/Settings/Settings.vue'
import { viewsStore } from '@/stores/views'
import {
  unreadNotificationsCount,
  notificationsStore,
} from '@/stores/notifications'
import { usersStore } from '@/stores/users'
import { sessionStore } from '@/stores/session'
import { showSettings, activeSettingsPage } from '@/composables/settings'
import { showChangePasswordModal } from '@/composables/modals'
import { FeatherIcon, call } from 'frappe-ui'
import {
  SignupBanner,
  TrialBanner,
  HelpModal,
  GettingStartedBanner,
  useOnboarding,
  showHelpModal,
  minimize,
  IntermediateStepModal,
} from 'frappe-ui/frappe'
import { capture } from '@/telemetry'
import router from '@/router'
import { useStorage } from '@vueuse/core'
import { ref, reactive, computed, h, markRaw, onMounted } from 'vue'

const { getPinnedViews, getPublicViews } = viewsStore()
const { toggle: toggleNotificationPanel } = notificationsStore()

const isSidebarCollapsed = useStorage('isSidebarCollapsed', false)

const isFCSite = ref(window.is_fc_site)
const isDemoSite = ref(window.is_demo_site)
const rtl = ref(document.dir === 'rtl' || document.documentElement.dir === 'rtl')


const links = [
  {
    label: 'Dashboard',label_ar: 'لوحة التحكم',
    icon: LucideLayoutDashboard,
    to: 'Dashboard',
  },
  {
    label: ' Suits', label_ar: 'الدعاوى',
    icon: Scale,
    to: 'Suits',
  },
  {
    label: 'Issues', label_ar: 'المسائل',
    icon: DealsIcon,
    to: 'Deals',
  },
  {
    label: 'Contacts',label_ar: 'جهات الاتصال',
    icon: ContactsIcon,
    to: 'Contacts',
  },
  {
    label: 'Files', label_ar: 'الملفات',
    icon: NoteIcon,
    to: 'Notes',
  },
  {
    label: 'Tasks', label_ar: 'المهام',
    icon: TaskIcon,
    to: 'Tasks',
  },

]

const allViews = computed(() => {
  let _views = [
    {
      name: 'All Views',
      name_ar: 'جميع العروض',
      hideLabel: true,
      opened: true,
      views: links.filter((link) => {
        if (link.condition) {
          return link.condition()
        }
        return true
      }),
    },
  ]
  if (getPublicViews().length) {
    _views.push({
      name: 'Public views',
      opened: true,
      views: parseView(getPublicViews()),
    })
  }

  if (getPinnedViews().length) {
    _views.push({
      name: 'Pinned views',
      opened: true,
      views: parseView(getPinnedViews()),
    })
  }
  return _views
})

function parseView(views) {
  return views.map((view) => {
    return {
      label: view.label,
      icon: getIcon(view.route_name, view.icon),
      to: {
        name: view.route_name,
        params: { viewType: view.type || 'list' },
        query: { view: view.name },
      },
    }
  })
}

function getIcon(routeName, icon) {
  if (icon) return h('div', { class: 'size-auto' }, icon)

  switch (routeName) {
    case 'Leads':
      return LeadsIcon
    case 'Deals':
      return DealsIcon
    case 'Contacts':
      return ContactsIcon
    case 'Organizations':
      return OrganizationsIcon
    case 'Notes':
      return NoteIcon
    case 'Call Logs':
      return PhoneIcon
    default:
      return PinIcon
  }
}

// onboarding
const { user } = sessionStore()
const { users, isManager } = usersStore()
const { isOnboardingStepsCompleted, setUp } = useOnboarding('frappecrm')

async function getFirstLead() {
  let firstLead = localStorage.getItem('firstLead' + user)
  if (firstLead) return firstLead
  return await call('crm.api.onboarding.get_first_lead')
}

async function getFirstDeal() {
  let firstDeal = localStorage.getItem('firstDeal' + user)
  if (firstDeal) return firstDeal
  return await call('crm.api.onboarding.get_first_deal')
}

const showIntermediateModal = ref(false)
const currentStep = ref({})

const steps = reactive([
  {
    name: 'setup_your_password',
    title: __('Setup your password'),
    icon: markRaw(SquareAsterisk),
    completed: false,
    onClick: () => {
      minimize.value = true
      showChangePasswordModal.value = true
    },
  },
  {
    name: 'create_first_lead',
    title: __('Create your first lead'),
    icon: markRaw(LeadsIcon),
    completed: false,
    onClick: () => {
      minimize.value = true
      router.push({ name: 'Leads' })
    },
  },
  {
    name: 'invite_your_team',
    title: __('Invite your team'),
    icon: markRaw(InviteIcon),
    completed: false,
    onClick: () => {
      minimize.value = true
      showSettings.value = true
      activeSettingsPage.value = 'Invite User'
    },
    condition: () => isManager(),
  },
  {
    name: 'convert_lead_to_deal',
    title: __('Convert lead to deal'),
    icon: markRaw(ConvertIcon),
    completed: false,
    dependsOn: 'create_first_lead',
    onClick: async () => {
      minimize.value = true

      currentStep.value = {
        title: __('Convert lead to deal'),
        buttonLabel: __('Convert'),
        videoURL: '/assets/crm/videos/convertToDeal.mov',
        onClick: async () => {
          showIntermediateModal.value = false
          currentStep.value = {}

          let lead = await getFirstLead()
          if (lead) {
            router.push({ name: 'Lead', params: { leadId: lead } })
          } else {
            router.push({ name: 'Leads' })
          }
        },
      }
      showIntermediateModal.value = true
    },
  },
  {
    name: 'create_first_task',
    title: __('Create your first task'),
    icon: markRaw(TaskIcon),
    completed: false,
    onClick: async () => {
      minimize.value = true
      let deal = await getFirstDeal()

      if (deal) {
        router.push({
          name: 'Deal',
          params: { dealId: deal },
          hash: '#tasks',
        })
      } else {
        router.push({ name: 'Tasks' })
      }
    },
  },
  {
    name: 'create_first_note',
    title: __('Create your first note'),
    icon: markRaw(NoteIcon),
    completed: false,
    onClick: async () => {
      minimize.value = true
      let deal = await getFirstDeal()

      if (deal) {
        router.push({
          name: 'Deal',
          params: { dealId: deal },
          hash: '#notes',
        })
      } else {
        router.push({ name: 'Notes' })
      }
    },
  },
  {
    name: 'add_first_comment',
    title: __('Add your first comment'),
    icon: markRaw(CommentIcon),
    completed: false,
    dependsOn: 'create_first_lead',
    onClick: async () => {
      minimize.value = true
      let deal = await getFirstDeal()

      if (deal) {
        router.push({
          name: 'Deal',
          params: { dealId: deal },
          hash: '#comments',
        })
      } else {
        router.push({ name: 'Leads' })
      }
    },
  },
  {
    name: 'send_first_email',
    title: __('Send email'),
    icon: markRaw(EmailIcon),
    completed: false,
    dependsOn: 'create_first_lead',
    onClick: async () => {
      minimize.value = true
      let deal = await getFirstDeal()

      if (deal) {
        router.push({
          name: 'Deal',
          params: { dealId: deal },
          hash: '#emails',
        })
      } else {
        router.push({ name: 'Leads' })
      }
    },
  },
  {
    name: 'change_deal_status',
    title: __('Change deal status'),
    icon: markRaw(StepsIcon),
    completed: false,
    dependsOn: 'convert_lead_to_deal',
    onClick: async () => {
      minimize.value = true

      currentStep.value = {
        title: __('Change deal status'),
        buttonLabel: __('Change'),
        videoURL: '/assets/crm/videos/changeDealStatus.mov',
        onClick: async () => {
          showIntermediateModal.value = false
          currentStep.value = {}

          let deal = await getFirstDeal()
          if (deal) {
            router.push({
              name: 'Deal',
              params: { dealId: deal },
              hash: '#activity',
            })
          } else {
            router.push({ name: 'Leads' })
          }
        },
      }
      showIntermediateModal.value = true
    },
  },
])

onMounted(async () => {
  await users.promise

  const filteredSteps = steps.filter((step) => {
    if (step.condition) {
      return step.condition()
    }
    return true
  })

  setUp(filteredSteps)
})

// help center
const articles = ref([
  {
    title: __('Introduction'),
    opened: false,
    subArticles: [
      { name: 'introduction', title: __('Introduction') },
      { name: 'setting-up', title: __('Setting up') },
    ],
  },
  {
    title: __('Settings'),
    opened: false,
    subArticles: [
      { name: 'profile', title: __('Profile') },
      { name: 'custom-branding', title: __('Custom branding') },
      { name: 'home-actions', title: __('Home actions') },
      { name: 'invite-users', title: __('Invite users') },
    ],
  },
  {
    title: __('Masters'),
    opened: false,
    subArticles: [
      { name: 'lead', title: __('Lead') },
      { name: 'deal', title: __('Deal') },
      { name: 'contact', title: __('Contact') },
      { name: 'organization', title: __('Organization') },
      { name: 'note', title: __('Note') },
      { name: 'task', title: __('Task') },
      { name: 'call-log', title: __('Call log') },
      { name: 'email-template', title: __('Email template') },
    ],
  },
  {
    title: __('Capturing leads'),
    opened: false,
    subArticles: [{ name: 'web-form', title: __('Web form') }],
  },
  {
    title: __('Views'),
    opened: false,
    subArticles: [
      { name: 'view', title: __('Saved view') },
      { name: 'public-view', title: __('Public view') },
      { name: 'pinned-view', title: __('Pinned view') },
    ],
  },
  {
    title: __('Other features'),
    opened: false,
    subArticles: [
      { name: 'email-communication', title: __('Email communication') },
      { name: 'comment', title: __('Comment') },
      { name: 'data', title: __('Data') },
      { name: 'service-level-agreement', title: __('Service level agreement') },
      { name: 'assignment-rule', title: __('Assignment rule') },
      { name: 'notification', title: __('Notification') },
    ],
  },
  {
    title: __('Customization'),
    opened: false,
    subArticles: [
      { name: 'custom-fields', title: __('Custom fields') },
      { name: 'custom-actions', title: __('Custom actions') },
      { name: 'custom-statuses', title: __('Custom statuses') },
      { name: 'custom-list-actions', title: __('Custom list actions') },
      { name: 'quick-entry-layout', title: __('Quick entry layout') },
    ],
  },
  {
    title: __('Integration'),
    opened: false,
    subArticles: [
      { name: 'twilio', title: __('Twilio') },
      { name: 'exotel', title: __('Exotel') },
      { name: 'whatsapp', title: __('WhatsApp') },
      { name: 'erpnext', title: __('ERPNext') },
    ],
  },
  {
    title: __('Frappe CRM mobile'),
    opened: false,
    subArticles: [
      { name: 'mobile-app-installation', title: __('Mobile app installation') },
    ],
  },
])
</script>

