import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUISettings = defineStore('uiSettings', () => {
  // Load saved values from localStorage or fallback to defaults
  const darkMode = ref(JSON.parse(localStorage.getItem('ui_darkMode')) ?? true)
  const rtl = ref(JSON.parse(localStorage.getItem('ui_rtl')) ?? true)
  const hue = ref(JSON.parse(localStorage.getItem('ui_hue')) ?? 266)

  // Persist changes automatically
  watch(darkMode, (v) => localStorage.setItem('ui_darkMode', JSON.stringify(v)))
  watch(rtl, (v) => localStorage.setItem('ui_rtl', JSON.stringify(v)))
  watch(hue, (v) => localStorage.setItem('ui_hue', JSON.stringify(v)))

  return { darkMode, rtl, hue }
})
