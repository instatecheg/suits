<template>
  <div
    id="case-app"
    class="app-root"
    :class="{ dark: ui.darkMode }"
    :dir="ui.rtl ? 'rtl' : 'ltr'"
    :style="{ '--theme-hue': ui.hue }"
  >
    <!-- Top bar -->
    <header class="card header compact">
  <div class="brand">
    <div>
      <div class="brand-sub">{{ ui.rtl ? 'الدعاوى' : 'Suits' }}</div>
    </div>
  </div>

  <div class="toolbar">
    <div class="search-box">
      <input
        type="text"
        v-model="searchQuery"
        :placeholder="ui.rtl ? 'بحث...' : 'Search...'"
      />
    </div>

    <button class="btn" @click="showCreateForm = !showCreateForm">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 5v14M5 12h14" stroke-width="2" stroke-linecap="round" />
      </svg>
      <span class="btn-label">
        {{ ui.rtl
          ? (showCreateForm ? 'إخفاء النموذج' : 'إضافة دعوى')
          : (showCreateForm ? 'Hide Form' : 'Add Case')
        }}
      </span>
    </button>
  </div>
</header>



    <!-- Main content (form + table) -->
    <main class="content">
      <!-- Form card -->
      <section v-if="showCreateForm" class="card panel form-panel">
        

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
              <label>نوع العميل</label>
              <select v-model="newSuits.client_type" required>
                <option value="">اختر نوع العميل</option>
                <option value="شركة">شركة</option>
                <option value="شخص">شخص</option>
              </select>
            </div>

            <div class="field">
              <label>إسم العميل</label>
              <input v-model="newSuits.client" type="text" required />
            </div>

            <div class="field">
              <label>صفة العميل</label>
              <select v-model="newSuits.client_role" required>
                <option value="">اختر صفة العميل</option>
                <option value="إدارة التسوية الودية">إدارة التسوية الودية</option>
                <option value="اخر">اخر</option>
                <option value="طالب التقرير">طالب التقرير</option>
                <option value="طالب التنفيذ">طالب التنفيذ</option>
                <option value="مدعي">مدعي</option>
                <option value="مدعي عليه">مدعي عليه</option>
                <option value="مستأنف">مستأنف</option>
                <option value="مستأنف ضده">مستأنف ضده</option>
                <option value="مصفي الشركة">مصفي الشركة</option>
                <option value="مصفي تركة">مصفي تركة</option>
                <option value="مطلوب إدخله">مطلوب إدخله</option>
                <option value="ملتمس">ملتمس</option>
                <option value="ملتمس ضده">ملتمس ضده</option>
                <option value="منفذ ضده">منفذ ضده</option>
              </select>
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

          <!-- Tab: Custom Fields -->
          <div v-else-if="activeTab === 'الحقول المخصصة'" class="grid">
            <div class="field">
              <label>سياسة الدعوى</label>
              <input type="text" />
            </div>
          </div>

          <!-- Tab: Hourly Rate -->
          <div v-else-if="activeTab === 'التعرفة لكل ساعة'" class="grid">
            <div class="field">
              <label>إسم الهيئة</label>
              <select required>
                <option value="">إختر إسم الهيئة</option>
                <option value="شركة إياد البكري وأثير قربان للمحاماة والاستشارات القانونية">شركة إياد البكري وأثير قربان للمحاماة والاستشارات القانونية</option>
              </select>
            </div>
            <div class="field">
              <label>التعرفة</label>
              <input type="text" />
            </div>
          </div>

          <!-- Tab: More Details -->
          <div v-else-if="activeTab === 'المزيد من التفاصيل'" class="grid">
            <div class="field">
              <label>مرحلة الدعوى</label>
              <select required>
                <option value="">حدد اختيار</option>
                <option value="الابتدائية">الابتدائية</option>
                <option value="الاستئناف">الاستئناف</option>
                <option value="العليا">العليا</option>
              </select>
            </div>
          </div>

          <!-- Tab: Dates and Time -->
          <div v-else-if="activeTab === 'التواريخ والوقت'" class="grid">
            <div class="field">
              <label>تاريخ التأسيس</label>
              <input type="date" />
            </div>
            <div class="field">
              <label>تاريخ الإستحقاق</label>
              <input type="date" />
            </div>
            <div class="field">
              <label>المدة المُقدّرة</label>
              <input type="date" />
            </div>
          </div>

          <!-- Tab: Involved Persons -->
          <div v-else-if="activeTab === 'الأشخاص المعنيين'" class="grid">
            <div class="field">
              <label>أحيلت عبر</label>
              <input type="text" />
            </div>
            <div class="field">
              <label>طُلبت من قبل</label>
              <input type="text" />
            </div>
            <div class="field">
              <label>الفريق المكلف</label>
              <select required>
                <option value="أعضاء المكتب">أعضاء المكتب</option>
              </select>
            </div>
            <div class="field">
              <label>المكلف</label>
              <input type="text" />
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
                <th>{{ rtl ? 'الإجراءات' : 'Actions' }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="suit in filteredSuits" :key="suit.name">
                <td>{{ suit.name1 }}</td>
                <td>{{ getSuitsTypeArabic(suit.scope_of_work) }}</td>
                <td>{{ suit.client }}</td>
                <td>{{ suit.opponent }}</td>
                <td>
                  <div class="flex flex-wrap gap-2 justify-end">
                    <button class="btn" @click="viewSuit(suit.name)">
                      <i class="fas fa-eye"></i> {{ rtl ? 'عرض' : 'View' }}
                    </button>

                    <button class="btn" @click="editSuit(suit.name)">
                      <i class="fas fa-edit"></i> {{ rtl ? 'تعديل' : 'Edit' }}
                    </button>

                    <button class="btn" :disabled="isDeleting" @click="deleteSuit(suit.name)">
                        <i class="fas fa-trash"></i> {{ rtl ? 'حذف' : 'Delete' }}
                    </button>

                  </div>
                </td>
              </tr>
              <tr v-if="filteredSuits.length === 0 && !isLoading">
                <td colspan="5" class="empty-state">لا يوجد دعوى لعرضهم</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <!-- Toast -->
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
import { useRouter } from "vue-router"

// ⭐ Global UI settings store
import { useUISettings } from "@/stores/useUISettings";
const ui = useUISettings();

// Router
const router = useRouter();

// ========== APP STATE ==========
const showCreateForm = ref(false)
const isLoading = ref(false)
const isCreating = ref(false)
const isDeleting = ref(false)
const searchQuery = ref('')
const Suits = ref([])
const toast = ref({ show: false, text: '' })

// Create form model
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

// Tabs
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

// Suit type labels
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

// ========== FETCH SUITS ==========
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

// ========== CREATE SUIT ==========
const createSuits = () => {
  isCreating.value = true

  const resource = createResource({
    url: 'crm.api2.create_Suits',
    params: { ...newSuits },
    onSuccess(data) {
      resetSuitsForm()
      fetchSuits()
      showCreateForm.value = false
      showToast(data.message || 'تمت الإضافة بنجاح')
    },
    onError(err) {
      showToast(err.message || 'حدث خطأ')
    },
  })

  resource.fetch().finally(() => {
    isCreating.value = false
  })
}

const resetSuitsForm = () => {
  Object.keys(newSuits).forEach((k) => (newSuits[k] = ''))
}

// ========== FILTER ==========
const filteredSuits = computed(() => {
  const q = searchQuery.value?.trim().toLowerCase()
  if (!q) return Suits.value
  return Suits.value.filter((s) => s.name1?.toLowerCase().includes(q))
})

const getSuitsTypeArabic = (type) => suitsTypeOptions[type] || type || '--'

// ========== VIEW / EDIT ==========
const viewSuit = (id) => {
  console.log('View suit:', id)
}

const editSuit = (id) => {
  const suit = Suits.value.find(s => s.name === id)
  if (!suit) {
    showToast(ui.rtl ? 'تعذر العثور على الدعوى' : 'Suit not found')
    return
  }

  router.push({
    name: 'SuitDetail',
    params: { id: suit.name }
  })
}

// ========== DELETE ==========
const deleteSuit = async (name) => {
  if (!confirm(ui.rtl ? 'هل أنت متأكد من الحذف؟' : 'Are you sure?')) return;

  try {
    const resource = createResource({
      url: 'crm.api2.delete_suit',
      params: { name },
      onSuccess: (res) => {
        if (res.error) {
          toast.error(res.error)
          return
        }

        toast.success(res.message)
        router.back()

        setTimeout(() => {
          router.go(0)
        }, 300)
      },
      onError: (err) => {
        console.error(err)
        toast.error(ui.rtl ? 'حدث خطأ أثناء الحذف' : 'Error deleting suit')
      }
    })

    await resource.fetch()

  } catch (err) {
    console.error(err)
    toast.error(ui.rtl ? 'حدث خطأ أثناء الحذف' : 'Error deleting suit')
  }
}

// ========== THEME APPLIED GLOBALLY ==========
watch(
  () => ui.darkMode,
  () => {
    document.documentElement.classList.toggle('dark', ui.darkMode)
  },
  { immediate: true }
)

watch(
  () => ui.hue,
  () => {
    document.documentElement.style.setProperty('--h', String(ui.hue))
  },
  { immediate: true }
)

watch(
  () => ui.rtl,
  () => {
    const html = document.documentElement
    html.setAttribute('dir', ui.rtl ? 'rtl' : 'ltr')
    html.setAttribute('lang', ui.rtl ? 'ar' : 'en')
  },
  { immediate: true }
)

// Toast helper
function showToast(t) {
  toast.value.text = t
  toast.value.show = true
  clearTimeout(showToast._t)
  showToast._t = setTimeout(() => (toast.value.show = false), 2200)
}

// ========== MOUNT ==========
onMounted(() => {
  fetchSuits()
})
</script>


<style scoped>
@import url(https://fonts.googleapis.com/earlyaccess/droidarabickufi.css);

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

/* GLOBAL BACKGROUND — same as first style */
html,
body,
#case-app {
  height: 100%;
  font-family: 'Droid Arabic Kufi', sans-serif !important;
  color: var(--txt);
  background:
    radial-gradient(800px 600px at 10% 10%, hsl(calc(var(--h) + 30) 90% 22%/.35), transparent 60%),
    radial-gradient(900px 700px at 90% 10%, hsl(calc(var(--h) - 20) 90% 30%/.25), transparent 60%),
    radial-gradient(900px 900px at 90% 90%, hsl(calc(var(--h) + 60) 90% 25%/.28), transparent 55%),
    var(--bg-1);
}

body { margin: 0 }

/* Optional wrapper (use if your root has it) */
.dashboard-wrapper {
  font-family: 'Droid Arabic Kufi', sans-serif !important;
  color: var(--txt);
  background:
    radial-gradient(800px 600px at 10% 10%, hsl(calc(var(--h) + 30) 90% 22%/.35), transparent 60%),
    radial-gradient(900px 700px at 90% 10%, hsl(calc(var(--h) - 20) 90% 30%/.25), transparent 60%),
    radial-gradient(900px 900px at 90% 90%, hsl(calc(var(--h) + 60) 90% 25%/.28), transparent 55%),
    var(--bg-1);
}

/* SURFACE */
.bg-surface-white {
  background: var(--glass) !important;
}

/* CARD — glass style from first block */
.card {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  box-shadow: var(--shadow-1);
  backdrop-filter: blur(10px);
}

/* ====== EVERYTHING BELOW UNCHANGED ====== */

.app-root { min-height: 100vh; padding: 20px; grid-template-columns: 1fr; gap: 18px; }

.header { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:14px; border-radius:16px; }

.brand { display:flex; align-items:center; gap:12px; }
.logo {
  width:48px; height:48px; border-radius:12px;
  background: linear-gradient(
    135deg,
    hsl(var(--h) var(--s) calc(var(--l) + 6%)),
    hsl(calc(var(--h) - 25) 85% 58%)
  );
}
.brand-title { font-weight:900; font-size:1rem }
.brand-sub { opacity:.75; font-size:1.5rem }

.toolbar { display:flex; align-items:center; gap:12px; }

.search {
  height:40px;
  display:flex;
  align-items:center;
  gap:10px;
  padding:10px 12px;
  border-radius:999px;
  border:1px solid var(--glass-border);
  background:hsl(0 0% 100% /.6);
  min-width:260px;
}

.search input {
  border:0;
  background:transparent;
  outline:none;
  color:var(--txt);
}

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
