<template>
  <section class="suit-page" :dir="rtl ? 'rtl' : 'ltr'">
    <h1>{{ rtl ? 'تعديل الدعوى' : 'Edit Suit' }}</h1>

    <form @submit.prevent="updateSuit" class="form-grid">
      <!-- Tab navigation -->
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: activeTab === tab }"
          type="button"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Tab content -->
      <div v-if="activeTab === 'معلومات عامة'" class="grid">
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

      <!-- Other tabs: replicate as needed -->
      <div v-if="activeTab === 'خصم'" class="grid">
        <div class="field">
          <label>إسم الخصم</label>
          <input v-model="suitData.opponent" type="text" />
        </div>
        <!-- Add more fields here for this tab -->
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
      </div>
    </form>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "SuitPage",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const rtl = ref(true);
    const tabs = ref(["معلومات عامة", "خصم"]);
    const activeTab = ref("معلومات عامة");

    const suitData = ref({});
    const isUpdating = ref(false);

    // Load suit using field "name1"
    const fetchSuit = async () => {
      const suitId = route.params.id;

      const res = await frappe.call({
        method: "crm.api2.get_suit",
        args: { name1: suitId }     // ✔ Correct field name
      });

      suitData.value = res.message || {};
    };

    // Update suit
    const updateSuit = async () => {
      isUpdating.value = true;
      try {
        await frappe.call({
          method: "crm.api2.update_suit",
          args: suitData.value      // ✔ Sends full data back to backend
        });

        alert(rtl.value ? "تم تحديث الدعوى!" : "Suit updated!");
      } catch (err) {
        console.error(err);
        alert(rtl.value ? "حدث خطأ أثناء الحفظ" : "Error saving suit");
      } finally {
        isUpdating.value = false;
      }
    };

    const goBack = () => {
      router.back();
    };

    onMounted(fetchSuit);

    return {
      rtl,
      tabs,
      activeTab,
      suitData,
      isUpdating,
      updateSuit,
      goBack
    };
  }
};
</script>


<style scoped>
.suit-page {
  padding: 1rem;
}
.form-grid {
  display: grid;
  gap: 1rem;
}
.field {
  display: flex;
  flex-direction: column;
  color:black;
}
.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.tabs button.active {
  font-weight: bold;
  border-bottom: 2px solid #007bff;
}
.form-actions {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}
</style>
