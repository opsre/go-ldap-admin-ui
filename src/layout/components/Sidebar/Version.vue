<template>
  <div v-if="versionInfo" class="version-info">
    <div class="version-item">版本: {{ versionInfo.version }}</div>
    <div class="version-item">提交: {{ versionInfo.gitCommit }}</div>
    <div class="version-item">构建: {{ versionInfo.buildTime }}</div>
    <div class="version-item">Go: {{ versionInfo.goVersion }}</div>
    <div class="version-item">平台: {{ versionInfo.platform }}</div>
  </div>
</template>

<script>
import { getVersion } from '@/api/system/base'

export default {
  name: 'Version',
  data() {
    return {
      versionInfo: null
    }
  },
  mounted() {
    this.fetchVersion()
  },
  methods: {
    fetchVersion() {
      getVersion().then(res => {
        if (res && res.data) {
          this.versionInfo = res.data
        }
      }).catch(() => {
        // 静默失败，不显示任何内容
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.version-info {
  padding: 10px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 10px;

  .version-item {
    font-size: 12px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
