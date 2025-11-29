<template>
  <section v-if="Object.keys(suitData).length" class="suit-page" :dir="rtl ? 'rtl' : 'ltr'">
    <h1>{{ rtl ? 'تعديل الدعوى' : 'Edit Suit' }}</h1>

    <!-- Breadcrumbs -->
    <nav class="breadcrumbs">
      <span v-for="(crumb, index) in breadcrumbs" :key="index">
        <router-link :to="crumb.route">{{ crumb.label }}</router-link>
        <span v-if="index < breadcrumbs.length - 1"> / </span>
      </span>
    </nav>

    <form @submit.prevent="updateSuit" class="form-grid">
      <!-- Tab navigation -->
      <div class="tabs">
        <button
          v-for="(tab, index) in tabObjects"
          :key="tab.name"
          :class="{ active: tabIndex === index }"
          type="button"
          @click="changeTabTo(index)"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab content: General Info -->
      <div v-if="tabIndex === 0" class="grid">
        <div class="field">
          <label>اسم الدعوى</label>
          <input v-model="suitData.name1" type="text" required />
        </div>

        <div class="field">
          <label>نطاق العمل</label>
          <select v-model="suitData.scope_of_work" required>
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
          <input v-model="suitData.entry_date" type="date" />
        </div>

        <div class="field">
          <label>نوع العميل</label>
          <select v-model="suitData.client_type" required>
            <option value="">اختر نوع العميل</option>
            <option value="شركة">شركة</option>
            <option value="شخص">شخص</option>
          </select>
        </div>

        <div class="field">
          <label>إسم العميل</label>
          <input v-model="suitData.client" type="text" required />
        </div>

        <div class="field">
          <label>صفة العميل</label>
          <select v-model="suitData.client_role" required>
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
          <input v-model="suitData.internal_reference_number" type="text" />
        </div>

        <div class="field">
          <label>الأولوية</label>
          <select v-model="suitData.priority" required>
            <option value="">إختر الأولوية</option>
            <option value="عالية">عالية</option>
            <option value="متوسطة">متوسطة</option>
            <option value="منخفضة">منخفضة</option>
          </select>
        </div>
      </div>

      <!-- Tab content: Opponent -->
      <div v-if="tabIndex === 1" class="grid">
        <div class="field">
          <label>إسم الخصم</label>
          <input v-model="suitData.opponent" type="text" />
        </div>
        <div class="field">
          <label>صفة الخصم</label>
          <input v-model="suitData.opponent_role" type="text" />
        </div>
      </div>

      <!-- Form actions -->
      <div class="form-actions">
        <button type="button" @click="goBack" class="btn-ghost">
          <i class="fas fa-arrow-left"></i>
          {{ rtl ? 'عودة' : 'Back' }}
        </button>

        <button type="submit" :disabled="isUpdating" class="btn">
          <i v-if="isUpdating" class="fas fa-spinner fa-spin"></i>
          <i v-else class="fas fa-save"></i>
          {{ isUpdating ? (rtl ? 'جاري الحفظ...' : 'Saving...') : (rtl ? 'حفظ التغييرات' : 'Save Changes') }}
        </button>

        <button type="button" @click="deleteSuit" class="btn btn-red">
          <i class="fas fa-trash"></i>
          {{ rtl ? 'حذف الدعوى' : 'Delete Suit' }}
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createResource, toast } from 'frappe-ui'

const route = useRoute()
const router = useRouter()
const rtl = ref(true)

const tabObjects = [
  { name: 'general', label: 'معلومات عامة' },
  { name: 'opponent', label: 'خصوم' }
]
const tabIndex = ref(0)
const changeTabTo = (index) => (tabIndex.value = index)

const suitData = reactive({})
const isUpdating = ref(false)

const title = computed(() => suitData.name1 || route.params.id)
const breadcrumbs = computed(() => [
  { label: 'Suits', route: { name: 'SuitsList' } },
  { label: title.value, route: { name: 'SuitDetail', params: { id: route.params.id } } }
])

const fetchSuit = async (id) => {
  const resource = createResource({
    url: 'crm.api2.get_suit',
    params: { name: id },
    onSuccess(data) {
      Object.assign(suitData, data)
    },
    onError(err) {
      console.error(err)
      toast.error(rtl.value ? 'حدث خطأ أثناء جلب الدعوى' : 'Error fetching suit')
    }
  })
  await resource.fetch()
}

const updateSuit = async () => {
  isUpdating.value = true
  try {
    const resource = createResource({
      url: 'crm.api2.update_suit',
      params: { ...suitData },
      onSuccess() {
        toast.success(rtl.value ? 'تم تحديث الدعوى!' : 'Suit updated!')
        nextTick(() => router.back())
      },
      onError(err) {
        console.error(err)
        toast.error(rtl.value ? 'حدث خطأ أثناء الحفظ' : 'Error saving suit')
      }
    })
    await resource.fetch()
  } finally {
    isUpdating.value = false
  }
}

const goBack = () => router.back()

const deleteSuit = async () => {
  if (!confirm(rtl.value ? 'هل أنت متأكد من الحذف؟' : 'Are you sure?')) return;

  try {
    const resource = createResource({
      url: 'crm.api2.delete_suit',
      params: { name: suitData.name },
      onSuccess: (res) => {
        if (res.error) {
          toast.error(res.error);
          return;
        }
        toast.success(res.message);
        router.back();
      },
      onError: (err) => {
        console.error(err);
        toast.error(rtl.value ? 'حدث خطأ أثناء الحذف' : 'Error deleting suit');
      }
    });
    await resource.fetch();
  } catch (err) {
    console.error(err);
    toast.error(rtl.value ? 'حدث خطأ أثناء الحذف' : 'Error deleting suit');
  }
}

onMounted(() => {
  fetchSuit(route.params.id)
})
</script>

<style scoped>
.suit-page { padding: 1rem; }
.form-grid { display: grid; gap: 1rem; }
.field { display: flex; flex-direction: column; color:black; }
.tabs { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.tabs button.active { font-weight: bold; border-bottom: 2px solid #007bff; }
.form-actions { margin-top: 1rem; display: flex; gap: 1rem; }
.btn-red { background-color: #e53e3e; color: white; }
.breadcrumbs { margin-bottom: 1rem; font-size: 0.9rem; }
.breadcrumbs a { color: #007bff; text-decoration: none; }
</style>
