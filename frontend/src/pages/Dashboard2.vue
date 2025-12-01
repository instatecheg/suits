<template>
  <div class="dashboard-wrapper p-6 min-h-screen">

    <!-- Top Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

      <!-- 📝 Tasks -->
      <div class="card overflow-hidden">
        <div class="header-row">
          <h2>مهماتي لهذا اليوم</h2>
          <span class="badge">0</span>
        </div>

        <div class="card-body">
          <img :src="TasksImg" class="w-24 mb-4" />
          <h6 class="empty-text">لم يتم تعيين مهام لهذا اليوم</h6>

          <button class="btn" @click="addNewTask">
            + إنشاء مهمة
          </button>
        </div>

        <div class="footer-row">
          <i class="fa-solid fa-circle-arrow-left"></i>
          <a href="https://site.app4legal.com/6717/tasks/my_tasks">انتقل إلى المهام</a>
        </div>
      </div>

      <!-- 👥 Meetings -->
      <div class="card overflow-hidden">
        <div class="header-row">
          <h2>اجتماعاتي لهذا اليوم</h2>
          <span class="badge">0</span>
        </div>

        <div class="card-body">
          <img :src="MeetingsImg" class="w-24 mb-4" />
          <h6 class="empty-text">لا توجد اجتماعات مقررة لهذا اليوم</h6>
          <button class="btn" @click="meetingForm">+ جدولة اجتماع</button>
        </div>

        <div class="footer-row">
          <i class="fa-solid fa-circle-arrow-left"></i>
          <a href="https://site.app4legal.com/6717/calendars/my_calendar?active_module=calendar">انتقل إلى التقويم</a>
        </div>
      </div>

      <!-- ⏰ Reminders -->
      <div class="card overflow-hidden">
        <div class="header-row">
          <h2>تذكيراتي لهذا اليوم</h2>
          <span class="badge">0</span>
        </div>

        <div class="card-body">
          <img :src="RemindersImg" class="w-24 mb-4" />
          <h6 class="empty-text">لم يتم تعيين تذكيرات لهذا اليوم</h6>
          <button class="btn" @click="reminderForm">+ أضف تذكير</button>
        </div>

        <div class="footer-row">
          <i class="fa-solid fa-circle-arrow-left"></i>
          <a href="https://site.app4legal.com/6717/reminders/show_my_reminders">انتقل إلى التذكيرات</a>
        </div>
      </div>

    </div>

    <!-- Bottom Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="item in dashboardStats"
        :key="item.label"
        class="card flex flex-col items-center justify-center p-8 hover:shadow-lg transition"
      >
        <div class="icon-bubble">
          <component :is="item.icon" class="w-8 h-8" />
        </div>

        <h3 class="stat-title">{{ item.label }}</h3>
        <p class="stat-subtitle">{{ item.subtitle }}</p>
        <span class="stat-count">{{ item.count }}</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { Briefcase, Users, FileText } from 'lucide-vue-next';
import { onMounted, watch } from 'vue';
import { useUISettings } from '@/stores/useUISettings';

// Import user images
import TasksImg from '/home/frappe/frappe-bench/apps/crm/frontend/src/assets/notes_13008973.png'
import MeetingsImg from '/home/frappe/frappe-bench/apps/crm/frontend/src/assets/board-directors_11934104.png'
import RemindersImg from '/home/frappe/frappe-bench/apps/crm/frontend/src/assets/notes_15747285.png'

// Dashboard stats
const dashboardStats = [
  { label: 'قضاياي', subtitle: 'إجمالي القضايا النشطة', count: 0, icon: Briefcase },
  { label: 'عملائي', subtitle: 'عدد العملاء المسجلين', count: 0, icon: Users },
  { label: 'مستنداتي', subtitle: 'عدد المستندات المرفوعة', count: 0, icon: FileText },
]

// UI Settings store
const ui = useUISettings()

// Apply theme & direction on mounted
const applyUI = () => {
  const root = document.documentElement
  root.classList.toggle('dark', ui.darkMode)
  root.style.setProperty('--h', ui.hue)

  const html = document.documentElement
  html.setAttribute('dir', ui.rtl ? 'rtl' : 'ltr')
  html.setAttribute('lang', ui.rtl ? 'ar' : 'en')
}

// Watch for live changes
watch([() => ui.darkMode, () => ui.hue], applyUI)
watch(() => ui.rtl, applyUI)

onMounted(() => {
  applyUI()
})

// Dummy functions
function addNewTask() { console.log('Add new task clicked') }
function meetingForm() { console.log('Meeting form clicked') }
function reminderForm() { console.log('Reminder form clicked') }
</script>

<style scoped>

@import url(https://fonts.googleapis.com/earlyaccess/droidarabickufi.css);
html,body,#case-app { 
  height: 100%; 
  background: var(--glass);
  font-family: 'Droid Arabic Kufi', sans-serif !important;
}

.bg-surface-white {
  background-color: #f8fafc;
}
.dashboard-wrapper {
font-family: 'Droid Arabic Kufi', sans-serif !important;
  color: var(--txt);

  /* dreamy gradient */
  background:
    radial-gradient(800px 600px at 10% 10%, hsl(calc(var(--h) + 30) 90% 22%/.35), transparent 60%),
    radial-gradient(900px 700px at 90% 10%, hsl(calc(var(--h) - 20) 90% 30%/.25), transparent 60%),
    radial-gradient(900px 900px at 90% 90%, hsl(calc(var(--h) + 60) 90% 25%/.28), transparent 55%),
    var(--bg-1);
}

/* Glass cards */
.card {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  box-shadow: var(--shadow-1);
  backdrop-filter: blur(10px);
}

/* Header inside card */
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: hsl(0 0% 100%/.25);
  padding: 16px;
  border-bottom: 1px solid var(--glass-border);
}
.header-row h2 {
  margin: 0;
  font-weight: 900;
  font-size: 1.2rem;
}

/* Badge */
.badge {
  background: hsl(var(--h) var(--s) var(--l));
  color: white;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: .8rem;
  font-weight: bold;
}

.card-body {
  padding: 30px;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
} 

.empty-text {
  color: var(--txt);
  opacity: .85;
  margin-bottom: 12px;
  font-weight: 700;
}

/* Footer */
.footer-row {
  border-top: 1px solid var(--glass-border);
  padding: 14px;
  text-align: center;
  color: hsl(var(--h) 60% 55%);
  display: flex;
  gap: 6px;
  justify-content: center;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  font-weight: 800;
  border: 0;
  border-radius: 12px;
  color: white;
  background: linear-gradient(
    135deg,
    hsl(var(--h) var(--s) calc(var(--l) + 2%)),
    hsl(var(--h) var(--s) calc(var(--l) - 10%))
  );
  box-shadow: 0 12px 26px hsl(var(--h) var(--s) 40%/.35);
  cursor: pointer;
}

/* Stats */
.icon-bubble {
  background: hsl(0 0% 100%/.28);
  border: 1px solid var(--glass-border);
  border-radius: 50%;
  padding: 18px;
  margin-bottom: 12px;
}
.stat-title {
  font-weight: 900;
  font-size: 1.4rem;
  margin-bottom: 4px;
}
.stat-subtitle {
  opacity: .75;
  margin-bottom: 12px;
}
.stat-count {
  font-size: 2.8rem;
  font-weight: 900;
  color: hsl(var(--h) var(--s) var(--l));
}
</style>


