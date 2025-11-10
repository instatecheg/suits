<template>
  <div class="p-6 bg-surface-white min-h-screen">
    <!-- Top Row: Tasks / Meetings / Reminders -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <!-- 📝 Tasks Card -->
      <div class="bg-white border-2 border-blue-500 rounded-2xl shadow-sm overflow-hidden">
        <div class="flex justify-between items-center bg-blue-50 p-4 border-b border-blue-200">
          <h2 class="font-bold text-lg text-blue-700">مهماتي لهذا اليوم</h2>
          <span class="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">0</span>
        </div>
        <div class="p-6 flex flex-col items-center justify-center text-center h-72">
          <img :src="getImage('task-list-image.svg')" alt="tasks" class="w-24 mb-4" />
          <h6 class="font-semibold text-gray-700 mb-4">
            لم يتم تعيين مهام لهذا اليوم
          </h6>
          <button
            class="bg-blue-600 text-white font-medium px-5 py-2 rounded-md hover:bg-blue-700 transition"
            @click="addNewTask"
          >
            + إنشاء مهمة
          </button>
        </div>
        <div
          class="p-4 border-t border-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center gap-2 cursor-pointer hover:text-blue-800 transition"
        >
          <i class="fa-solid fa-circle-arrow-left"></i>
          <a href="https://site.app4legal.com/6717/tasks/my_tasks">انتقل إلى المهام</a>
        </div>
      </div>

      <!-- 👥 Meetings Card -->
      <div class="bg-white border-2 border-blue-500 rounded-2xl shadow-sm overflow-hidden">
        <div class="flex justify-between items-center bg-blue-50 p-4 border-b border-blue-200">
          <h2 class="font-bold text-lg text-blue-700">اجتماعاتي لهذا اليوم</h2>
          <span class="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">0</span>
        </div>
        <div class="p-6 flex flex-col items-center justify-center text-center h-72">
          <img :src="getImage('meeting-list-image.svg')" alt="meetings" class="w-24 mb-4" />
          <h6 class="font-semibold text-gray-700 mb-4">
            لا توجد اجتماعات مقررة لهذا اليوم
          </h6>
          <button
            class="bg-blue-600 text-white font-medium px-5 py-2 rounded-md hover:bg-blue-700 transition"
            @click="meetingForm"
          >
            + جدولة اجتماع
          </button>
        </div>
        <div
          class="p-4 border-t border-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center gap-2 cursor-pointer hover:text-blue-800 transition"
        >
          <i class="fa-solid fa-circle-arrow-left"></i>
          <a href="https://site.app4legal.com/6717/calendars/my_calendar?active_module=calendar">
            انتقل إلى التقويم
          </a>
        </div>
      </div>

      <!-- ⏰ Reminders Card -->
      <div class="bg-white border-2 border-blue-500 rounded-2xl shadow-sm overflow-hidden">
        <div class="flex justify-between items-center bg-blue-50 p-4 border-b border-blue-200">
          <h2 class="font-bold text-lg text-blue-700">تذكيراتي لهذا اليوم</h2>
          <span class="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">0</span>
        </div>
        <div class="p-6 flex flex-col items-center justify-center text-center h-72">
          <img :src="getImage('reminder-list-image.svg')" alt="reminders" class="w-24 mb-4" />
          <h6 class="font-semibold text-gray-700 mb-4">
            لم يتم تعيين تذكيرات لهذا اليوم
          </h6>
          <button
            class="bg-blue-600 text-white font-medium px-5 py-2 rounded-md hover:bg-blue-700 transition"
            @click="reminderForm"
          >
            + أضف تذكير
          </button>
        </div>
        <div
          class="p-4 border-t border-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center gap-2 cursor-pointer hover:text-blue-800 transition"
        >
          <i class="fa-solid fa-circle-arrow-left"></i>
          <a href="https://site.app4legal.com/6717/reminders/show_my_reminders">
            انتقل إلى التذكيرات
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom Row: My Cases / My Clients / My Documents -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="item in dashboardStats"
        :key="item.label"
        class="bg-white border-2 border-blue-500 rounded-2xl shadow-sm overflow-hidden flex flex-col items-center justify-center p-8 hover:shadow-md transition"
      >
        <div class="bg-blue-100 text-blue-700 p-4 rounded-full mb-4">
          <component :is="item.icon" class="w-8 h-8" />
        </div>
        <h3 class="text-blue-700 font-bold text-lg mb-1">{{ item.label }}</h3>
        <p class="text-gray-600 text-sm mb-3">{{ item.subtitle }}</p>
        <span class="text-3xl font-extrabold text-blue-600">{{ item.count }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Briefcase, Users, FileText } from 'lucide-vue-next'
import { ref, reactive, computed, onMounted } from 'vue';
import { createResource } from 'frappe-ui';
const dashboardStats = [
  { label: 'قضاياي', subtitle: 'إجمالي القضايا النشطة', count: 0, icon: Briefcase },
  { label: 'عملائي', subtitle: 'عدد العملاء المسجلين', count: 0, icon: Users },
  { label: 'مستنداتي', subtitle: 'عدد المستندات المرفوعة', count: 0, icon: FileText },
]

function getImage(name) {
  try {
    return new URL(`/src/assets/images/getting_started/${name}`, import.meta.url).href
  } catch {
    // Fallback to placeholder if image missing
    return 'https://via.placeholder.com/100x100?text=No+Image'
  }
}

function addNewTask() {
  console.log('Add new task clicked')
}
function meetingForm() {
  console.log('Meeting form clicked')
}
function reminderForm() {
  console.log('Reminder form clicked')
}
</script>

<style scoped>
.bg-surface-white {
  background-color: #f8fafc;
}
</style>
