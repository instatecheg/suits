<script setup>
import { useUISettings } from "@/stores/useUISettings";

const ui = useUISettings();
</script>

<template>
  <div 
    class="settings-container"
    :class="[{ dark: ui.darkMode }, ui.rtl ? 'rtl' : '']"
    :style="{ '--hue': ui.hue }"
  >

    <div class="settings-card">

      <!-- Title -->
      <h1 class="title">
        {{ ui.rtl ? "الإعدادات" : "Settings" }}
      </h1>

      <!-- Dark mode -->
      <label class="setting-item">
        <span>{{ ui.rtl ? "الوضع الداكن" : "Dark Mode" }}</span>
        <input type="checkbox" v-model="ui.darkMode">
      </label>

      <!-- Hue -->
      <label class="setting-item">
        <span>{{ ui.rtl ? "درجة اللون" : "Color Hue" }}</span>
        <input type="range" min="0" max="360" v-model="ui.hue">
      </label>

      <!-- RTL -->
      <label class="setting-item">
        <span>{{ ui.rtl ? "اتجاه يمين إلى يسار (RTL)" : "RTL Layout" }}</span>
        <input type="checkbox" v-model="ui.rtl">
      </label>

    </div>
  </div>
</template>

<style>
/* No scoped */
:root {
  --bg: #f5f5f5;
  --card-bg: #ffffff;
  --hue: 260;
}

.dark {
  --bg: #1e1e1e;
  --card-bg: #2c2c2c;
  color: white;
}

.rtl {
  direction: rtl;
}

.settings-container {
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
}

.settings-card {
  padding: 40px 50px;
  border-radius: 16px;
  background: var(--card-bg);
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 400px;
}

.title {
  text-align: center;
  margin-bottom: 15px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
}
</style>
