<template>
  <div id="case-app" class="app-root" :dir="rtl ? 'rtl' : 'ltr'">
    <!-- Top bar (minimal, no sidebar) -->
<header class="card header compact">
<div class="brand">
<div>
<div class="brand-sub">{{ rtl ? 'الدعاوى' : 'Suits' }}</div>
</div>
</div>


<div class="toolbar">
<div class="search card">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
<circle cx="11" cy="11" r="7" stroke-width="2" />
<path d="M20 20l-3.5-3.5" stroke-width="2" />
</svg>
<input v-model="searchQuery" :placeholder="rtl? 'ابحث في الدعوى...' : 'Search cases…'">
</div>


<div class="controls-inline">
<label class="chip">
<input type="range" min="0" max="360" v-model.number="h" @input="applyTheme" />
<span class="chip-label">Hue</span>
</label>


<label class="chip">
<input type="checkbox" v-model="dark" @change="applyTheme" />
<span>{{ rtl ? 'الوضع الداكن' : 'Dark' }}</span>
</label>


<label class="chip">
<input type="checkbox" v-model="rtl" @change="applyDir" />
<span>RTL</span>
</label>


<button class="btn" @click="showCreateForm = !showCreateForm">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
<path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" />
</svg>
<span class="btn-label">{{ rtl ? (showCreateForm ? 'إخفاء النموذج' : 'إضافة دعوى') : (showCreateForm ? 'Hide Form' : 'Add Case') }}</span>
</button>
</div>
</div>
</header>

    <!-- Main content (form + table) -->
    <main class="content">
      <!-- Form card -->
      <section v-if="showCreateForm" class="card panel form-panel">
        <h3 class="form-title">
          <i class="fas fa-file-circle-plus"></i>
          {{ rtl ? 'إضافة دعوى' : 'Add Case' }}
        </h3>

        <!-- Tabs -->
        <div class="tabs-row">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="['tab-button', { active: activeTab === tab }]"
          >
            {{ tab }}
          </button>
        </div>

        <form @submit.prevent="createSuits" class="form-grid">
          <!-- Tab: General Info -->
          <div v-if="activeTab === 'معلومات عامة'" class="grid">
            <div class="field">
              <label>اسم الدعوى</label>
              <input v-model="newSuits.name1" type="text" required />
            </div>

            <div class="field">
              <label>نطاق العمل</label>
              <select v-model="newSuits.scope_of_work" required>
                <option value="">إختر نطاق العمل</option>
                <option value="آخر">آخر</option>
                <option value="إدارية">إدارية</option>
                <option value="إرث و حقوق ورثة">إرث و حقوق ورثة</option>
                <option value="اتعاب محاماة">اتعاب محاماة</option>
                <option value="اثبات شراكة">اثبات شراكة</option>
                <option value="احتكار و منافسة">احتكار و منافسة</option>
                <option value="احوال شخصية">احوال شخصية</option>
                <option value="اخلاء عقار">اخلاء عقار</option>
                <option value="افلاس">افلاس</option>
                <option value="تجاري">تجاري</option>
                <option value="تحصيل">تحصيل</option>
                <option value="تحكيم">تحكيم</option>
                <option value="مدني">مدني</option>
                <option value="جزائي">جزائي</option>
                <option value="عقارات">عقارات</option>
                <option value="عمالي">عمالي</option>
              </select>
            </div>

            <div class="field">
              <label>تاريخ الإدخال</label>
              <input v-model="newSuits.entry_date" type="date" />
            </div>

            <div class="field">
              <label>إسم العميل</label>
              <input v-model="newSuits.client" type="text" />
            </div>

            <div class="field">
              <label>صفة العميل</label>
              <input v-model="newSuits.client_role" type="text" />
            </div>

            <div class="field">
              <label>رقم المرجع الداخلي</label>
              <input v-model="newSuits.internal_reference_number" type="text" />
            </div>

            <div class="field">
              <label>الأولوية</label>
              <select v-model="newSuits.priority" required>
              <option value="">إختر الأولوية</option>
              <option value="عالية">عالية</option>
              <option value="متوسطة">متوسطة</option>
              <option value="منخفضة">منخفضة</option>
            </select>
            </div>
          </div>

          <!-- Tab: Opponents -->
          <div v-else-if="activeTab === 'الخصوم'" class="grid">
            <div class="field">
              <label>إسم الخصم</label>
              <input v-model="newSuits.opponent" type="text" />
            </div>
            <div class="field">
              <label>صفة الخصم</label>
              <input v-model="newSuits.opponent_role" type="text" />
            </div>
          </div>

          <!-- Form actions -->
          <div class="form-actions">
            <button type="button" @click="resetSuitsForm" class="btn-ghost">
              <i class="fas fa-undo"></i>
              {{ rtl ? 'إعادة تعيين' : 'Reset' }}
            </button>

            <button type="submit" :disabled="isCreating" class="btn">
              <i v-if="isCreating" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-plus"></i>
              {{ isCreating ? (rtl ? 'جاري الإضافة...' : 'Creating...') : (rtl ? 'إضافة الدعوى' : 'Add Case') }}
            </button>
          </div>
        </form>
      </section>

      <!-- Table card -->
      <section class="card panel table-panel">
        <div class="table-wrap">
          <table class="cases-table">
            <thead>
              <tr>
                <th>اسم الدعوى</th>
                <th>نطاق العمل</th>
                <th>إسم العميل</th>
                <th>إسم الخصم</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="suit in filteredSuits" :key="suit.name">
                <td>{{ suit.name1 }}</td>
                <td>{{ getSuitsTypeArabic(suit.scope_of_work) }}</td>
                <td>{{ suit.client }}</td>
                <td>{{ suit.opponent }}</td>
              </tr>
              <tr v-if="filteredSuits.length === 0 && !isLoading">
                <td colspan="4" class="empty-state">لا يوجد دعوى لعرضهم</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <!-- Toast (uses frappe.show_alert too, but kept for local messages) -->
    <div class="toast" :class="{ show: toast.show }">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white">
        <path d="M20 6L9 17l-5-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
      <span>{{ toast.text }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { createResource } from 'frappe-ui'

// Visual / theme state
const dark = ref(true)
const rtl = ref(true)
const h = ref(266)

// App state
const showCreateForm = ref(false)
const isLoading = ref(false)
const isCreating = ref(false)
const searchQuery = ref('')
const Suits = ref([])
const toast = ref({ show: false, text: '' })

const newSuits = reactive({
  name1: '',
  scope_of_work: '',
  entry_date: '',
  client: '',
  client_role: '',
  internal_reference_number: '',
  priority: '',
  opponent: '',
  opponent_role: '',
})

const tabs = [
  'معلومات عامة',
  'الخصوم',
  'الحقول المخصصة',
  'التعرفة لكل ساعة',
  'المزيد من التفاصيل',
  'التواريخ والوقت',
  'الأشخاص المعنيين',
]
const activeTab = ref('معلومات عامة')

const suitsTypeOptions = {
  administrative: 'إدارية',
  inheritance_rights: 'إرث وحقوق ورثة',
  legal_fees: 'أتعاب محاماة',
  partnership_proof: 'إثبات شراكة',
  personal_status: 'أحوال شخصية',
  real_estate: 'عقارات',
  civil: 'مدني',
  criminal: 'جزائي',
}

// Fetch
const fetchSuits = () => {
  isLoading.value = true
  const resource = createResource({
    url: 'frappe.client.get_list',
    params: {
      doctype: 'Suits',
      fields: ['name', 'name1', 'scope_of_work', 'client', 'opponent'],
      limit_page_length: 0,
    },
    onSuccess(data) {
      Suits.value = data || []
    },
    onError(err) {
      console.error(err)
    },
  })
  resource.fetch().finally(() => (isLoading.value = false))
}

onMounted(() => {
  applyTheme()
  applyDir()
  fetchSuits()
})

// Create
const createSuits = () => {
  isCreating.value = true
  const resource = createResource({
    url: 'crm.api2.create_Suits',
    params: { ...newSuits },
    onSuccess(data) {
      resetSuitsForm()
      fetchSuits()
      showCreateForm.value = false
      // prefer frappe alert when available
      if (window.frappe && frappe.show_alert) {
        frappe.show_alert({ message: data.message || 'تمت الإضافة بنجاح', indicator: 'green' })
      } else {
        showToast(data.message || 'تمت الإضافة بنجاح')
      }
    },
    onError(err) {
      if (window.frappe && frappe.show_alert) {
        frappe.show_alert({ message: err.message || 'حدث خطأ أثناء الإضافة', indicator: 'red' })
      } else {
        showToast(err.message || 'حدث خطأ')
      }
    },
  })
  resource.fetch().finally(() => {
    isCreating.value = false
  })
}

const resetSuitsForm = () => {
  Object.keys(newSuits).forEach((k) => (newSuits[k] = ''))
}

const filteredSuits = computed(() => {
  const q = searchQuery.value?.trim().toLowerCase()
  if (!q) return Suits.value
  return Suits.value.filter((s) => s.name1?.toLowerCase().includes(q))
})

const getSuitsTypeArabic = (type) => suitsTypeOptions[type] || type || '--'

// Theme helpers
function applyTheme() {
  const root = document.documentElement
  root.classList.toggle('dark', dark.value)
  root.style.setProperty('--h', String(h.value))
}

function applyDir() {
  const html = document.documentElement
  html.setAttribute('dir', rtl.value ? 'rtl' : 'ltr')
  html.setAttribute('lang', rtl.value ? 'ar' : 'en')
}

watch(rtl, applyDir)

function showToast(t) {
  toast.value.text = t
  toast.value.show = true
  clearTimeout(showToast._t)
  showToast._t = setTimeout(() => (toast.value.show = false), 2200)
}
</script>

<style scoped>
.bg-surface-white {
  background-color: none !important;
}
/* Import Amiri font from Google */
@import url('https://fonts.googleapis.com/earlyaccess/amiri.css');
/* THEME TOKENS */
:root {
  --h: 266;
  --s: 92%;
  --l: 56%;
  --txt: hsl(0 0% 12%);
  --bg-1: hsl(252 50% 98%);
  --glass: hsl(0 0% 100%/.6);
  --glass-border: hsl(0 0% 100%/.35);
  --shadow-1: 0 10px 30px rgba(255, 255, 255, 0.12);
}
:root.dark {
  --txt: hsl(0 0% 98%);
  --bg-1: hsl(230 35% 7%);
  --glass: hsl(230 28% 12%/.45);
  --glass-border: hsl(0 0% 100%/.12);
  --shadow-1: 0 rgba(255, 255, 255, 1);
}

html,body,#case-app { height: 100%; background: var(--glass); font-family: 'Amiri', serif !important;}
body { margin: 0; font-family: 'Amiri', serif !important; color: var(--txt); background: var(--glass) !important;}
.bg-surface-white {
  background: var(--glass);
}
/* app layout */
.app-root { min-height: 100vh; padding: 20px; grid-template-columns: 1fr; gap: 18px; }
.header { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:14px; border-radius:16px; }
.card { box-shadow: none !important; background: linear-gradient(
    135deg,
    hsl(var(--h) 70% 60% / 0.25),
    hsl(var(--h) 70% 45% / 0.25)
  ); border:1px solid var(--glass-border); border-radius:12px;  backdrop-filter: blur(8px); }
.brand { display:flex; align-items:center; gap:12px; }
.logo { width:48px; height:48px; border-radius:12px; background: linear-gradient(135deg, hsl(var(--h) var(--s) calc(var(--l) + 6%)), hsl(calc(var(--h) - 25) 85% 58%)); }
.brand-title { font-weight:900; font-size:1rem }
.brand-sub { opacity:.75; font-size:1.5rem }

.toolbar { display:flex; align-items:center; gap:12px; }
.search { height: 40px; display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:999px; border:1px solid var(--glass-border); background: hsl(0 0% 100% /.6); min-width:260px; }
.search input { border:0; background:transparent; outline: none; color:var(--txt); }

.controls-inline { display:flex; align-items:center; gap:10px }
.chip { display:flex; align-items:center; gap:8px; padding:8px 10px; border-radius:999px; border:1px solid var(--glass-border); background: hsl(0 0% 100% /.55); }
:root.dark .chip { background: hsl(0 0% 100% /.06); }
.chip input[type="range"]{ width:120px }
.chip input[type="checkbox"]{ accent-color: hsl(var(--h) var(--s) var(--l)) }
.chip-label { font-weight:800; font-size:0.85rem }

.btn { display:inline-flex; align-items:center; gap:8px; padding:10px 14px; border-radius:10px; border:0; cursor:pointer; color:white; font-weight:800; background: linear-gradient(135deg, hsl(var(--h) var(--s) calc(var(--l) + 2%)), hsl(var(--h) var(--s) calc(var(--l) - 10%)));   }
.btn-ghost { background: transparent; border:1px solid rgba(0,0,0,0.06); padding:8px 12px; border-radius:8px; }

.content { display:grid; gap:18px; }
.panel { padding:18px }
.form-panel { padding:18px; }
.form-title { font-weight:900; margin:0 0 12px }
.tabs-row { display:flex; gap:8px; margin-bottom:12px; }
.tab-button { padding:8px 10px; border-radius:8px; border:1px solid transparent; background:transparent; font-weight:800; }
.tab-button.active { background: linear-gradient(135deg, hsl(var(--h) 70% 55% /.12), transparent); color: hsl(var(--h) 70% 75%); }

.form-grid .grid { display:grid; grid-template-columns: repeat(2,1fr); gap:12px }
.field { display:flex; flex-direction:column; gap:6px }
.field label { font-weight:700; text-align: right }
.field input, .field select { padding:8px; border:1px solid rgba(0,0,0,0.08); border-radius:8px; background: white  }
:root.dark .field input, .field select { color : black; }
.form-actions { display:flex; justify-content:flex-end; gap:10px; margin-top:14px }

.table-panel { padding:0 }
.table-wrap { overflow:auto }
.cases-table { width:100%; border-collapse: collapse; min-width:640px }
.cases-table thead {  background: hsl(var(--h) 80% 50% / .95); color:white }
.cases-table th, .cases-table td { padding:12px 14px; text-align: right; border-bottom:1px solid var(--glass-border) }
.empty-state { text-align:center; padding:16px; color: #6b7280 }

/* toast */
.toast { position: fixed; top:18px; left:18px; z-index:50; padding:12px 14px; border-radius:12px; display:flex; align-items:center; gap:8px; background: linear-gradient(135deg, hsl(150 70% 38%), hsl(150 70% 30%)); color:white; transform: translateY(-10px); opacity:0; pointer-events:none; transition:.25s ease }
.toast.show { opacity:1; transform: translateY(0); pointer-events:auto }

/* responsive */
@media (max-width: 980px) {
  .form-grid .grid { grid-template-columns: 1fr }
  .search { min-width: 120px }
}

.header.compact {
  height: 70px;
  padding: 0.25rem 0.75rem;
  min-height: 3rem; /* gives structure without cutting contents */
}


.btn[data-v-ebdf063f] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.3px;

  /* Force black text and icon */
  color: #000 !important;

  /* Simple light background */
  background: #ffffff;

  /* Gentle shadow */
 

  /* Smooth hover animation */
  transition: all 0.25s ease-in-out;
}

.btn[data-v-ebdf063f]:hover {
  background: #f3f4f6; /* light gray on hover */
  
}

.btn[data-v-ebdf063f] svg {
  width: 16px;
  height: 16px;
  stroke: #000; /* make the plus icon black */
}

.btn[data-v-ebdf063f]:hover {
  transform: translateY(-1px);
  
}

.btn[data-v-ebdf063f]:active {
  transform: translateY(1px);
  
}

.btn svg {
  width: 16px;
  height: 16px;
  stroke-width: 2; /* keep consistent line thickness */
}

</style>
