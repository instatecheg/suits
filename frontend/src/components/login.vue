<template>
  <div class="page-wrapper">

    <!-- 30% Image Panel -->
    <div class="image-side">
      <img src="@/assets/close-up-businessman-holding-briefcase.jpg" alt="Side Image" />
    </div>

    <!-- 70% Login Section -->
    <div class="login-section">
      <div class="login-card card">

        <!-- Logo + Title -->
        <div class="brand" style="justify-content:center; margin-bottom: 26px;">
          <div class="logo icon-box">
            <Scale class="icon" />
          </div>
          <div>
            <div class="brand-title" style="font-size: 1.4rem; text-align:center;">
              تسجيل الدخول
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="form-grid">
          <div class="grid">
            <div class="field">
              <label>اسم المستخدم</label>
              <input 
                v-model="username" 
                type="text" 
                placeholder="ادخل اسم المستخدم"
              />
            </div>

            <div class="field">
              <label>كلمة المرور</label>
              <input 
                v-model="password" 
                type="password"
                placeholder="••••••••" 
              />
            </div>
          </div>
        </div>

        <!-- Submit -->
        <div class="form-actions" style="margin-top: 20px;">
          <button class="btn" @click="login" :disabled="loading">
            <span v-if="!loading">تسجيل الدخول</span>
            <span v-else>جاري تسجيل الدخول...</span>
          </button>
        </div>

        <!-- Error -->
        <div v-if="error" class="error-msg">
          {{ error }}
        </div>

        <!-- Dark Mode Toggle -->
        <div class="toggle-wrapper">
          <label class="toggle-label">الوضع الليلي</label>
          <input type="checkbox" class="toggle" v-model="darkMode" @change="toggleDark">
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { Scale } from "lucide-vue-next";

export default {
  name: "LoginPage",
  components: { Scale },

  data() {
    return {
      username: "",
      password: "",
      error: "",
      loading: false,
      darkMode: false
    };
  },

  mounted() {
    const saved = localStorage.getItem("theme-dark");
    if (saved === "1") {
      document.documentElement.classList.add("dark");
      this.darkMode = true;
    }
  },

  methods: {
    toggleDark() {
      if (this.darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme-dark", "1");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme-dark", "0");
      }
    },

    async login() {
      this.error = "";

      if (!this.username || !this.password) {
        this.error = "الرجاء إدخال اسم المستخدم وكلمة المرور";
        return;
      }

      this.loading = true;

      try {
        const response = await fetch("/api/method/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usr: this.username,
            pwd: this.password
          })
        });

        const result = await response.json();

        if (result.message === "Logged In") {
          window.location.href = "/crm/Dashboard";
        } else {
          this.error = "بيانات الدخول غير صحيحة";
        }
      } catch (e) {
        this.error = "خطأ في الاتصال بالخادم";
      }

      this.loading = false;
    }
  }
};
</script>

<style scoped>
/* Whole page split 70/30 */
.page-wrapper {
  display: flex;
  height: 100vh;
  width: 100%;
  direction: rtl;
}

/* 30% image panel */
.image-side {
  width: 30%;
  height: 100%;
  overflow: hidden;
}

.image-side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 70% login panel */
.login-section {
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

/* Login Card */
.login-card {
  width: 100%;
  max-width: 430px;
  padding: 28px;
  border-radius: 16px;
  box-shadow: var(--shadow-1);
  background: linear-gradient(
    135deg,
    hsl(var(--h) 70% 60% / 0.25),
    hsl(var(--h) 70% 45% / 0.25)
  );
  border: 1px solid var(--glass-border);
}

/* Logo */
.logo {
  width: 58px;
  height: 58px;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    hsl(var(--h) var(--s) calc(var(--l) + 6%)),
    hsl(calc(var(--h) - 25) 85% 58%)
  );
}

.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 28px;
  height: 28px;
  stroke: white;
}

/* Input fields */
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-weight: 700;
  text-align: right;
}

.field input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.08);
  background: white;
  transition: 0.2s ease;
}

/* Error message */
.error-msg {
  margin-top: 14px;
  text-align: center;
  color: #ff4d4f;
  font-weight: 800;
}

/* Toggle */
.toggle-wrapper {
  margin-top: 20px;
  text-align: center;
}

.toggle-label {
  margin-left: 8px;
  font-weight: 800;
}

.toggle {
  transform: scale(1.4);
  accent-color: hsl(var(--h) var(--s) var(--l));
}
</style>
