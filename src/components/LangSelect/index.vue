<template>
  <el-dropdown class="lang-select" trigger="click" @command="handleSetLanguage">
    <span class="lang-select-trigger" :title="$t('locale.label')">
      <svg-icon class-name="language-icon" icon-class="language" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item in localeOptions"
        :key="item.value"
        :command="item.value"
        :disabled="item.value === locale"
      >
        {{ $t(item.labelKey) }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { localeOptions } from '@/lang'

export default {
  name: 'LangSelect',
  data() {
    return { localeOptions }
  },
  computed: {
    locale() {
      return this.$store.getters.locale
    }
  },
  methods: {
    handleSetLanguage(locale) {
      this.$store.dispatch('settings/setLocale', locale)
      this.$message.success(this.$t('common.operationSuccess'))
    }
  }
}
</script>

<style lang="scss" scoped>
.lang-select {
  cursor: pointer;

  .lang-select-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 20px;
    color: #5a5e66;
    outline: none;
  }
}
</style>
