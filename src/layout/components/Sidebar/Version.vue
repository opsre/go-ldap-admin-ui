<template>
  <div v-if="versionInfo" class="version-info">
    <a :href="releaseUrl" target="_blank" rel="noopener noreferrer" class="version-item version-link">
      <span class="icon">📦</span>
      <span class="value">{{ versionInfo.version }}</span>
    </a>
    <div class="version-item">
      <span class="icon">⏰</span>
      <span class="value">{{ formattedBuildTime }}</span>
    </div>
  </div>
</template>

<script>
import { getVersion } from '@/api/system/base'

export default {
  name: 'Version',
  data() {
    return {
      versionInfo: null,
      repoUrl: 'https://github.com/opsre/go-ldap-admin'
    }
  },
  computed: {
    releaseUrl() {
      if (!this.versionInfo || !this.versionInfo.version) return '#'
      return `${this.repoUrl}/releases/tag/${this.versionInfo.version}`
    },
    formattedBuildTime() {
      if (!this.versionInfo || !this.versionInfo.buildTime) return ''
      // 格式化时间，只显示到分钟：2026-02-09 11:01
      const timeStr = this.versionInfo.buildTime
      if (timeStr.length >= 16) {
        return timeStr.substring(0, 16)
      }
      return timeStr
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
  padding: 12px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  .version-item {
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .icon {
      flex-shrink: 0;
      margin-right: 8px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
    }

    .value {
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    }
  }

  .version-link {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: rgba(64, 158, 255, 1);

      .icon {
        color: rgba(64, 158, 255, 1);
      }

      .value {
        text-decoration: underline;
      }
    }
  }
}
</style>
