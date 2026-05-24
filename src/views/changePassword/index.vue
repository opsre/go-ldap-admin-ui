<template>
  <div class="reset-pass">
    <el-form ref="form" :model="form" size="medium" class="form-container">
      <el-form-item :label="$t('changePassword.email')">
        <div class="input-container">
          <el-input v-model="form.mail" :placeholder="$t('changePassword.emailPlaceholder')" />
          <el-button type="primary" @click="sendEmailCode">{{ $t('changePassword.sendCode') }}</el-button>
        </div>
      </el-form-item>
      <el-form-item :label="$t('changePassword.code')" class="code-item">
        <el-input v-model="form.code" :placeholder="$t('changePassword.codePlaceholder')" />
      </el-form-item>
      <el-form-item class="reset-item">
        <el-button type="primary" @click="resetPass">{{ $t('changePassword.reset') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { emailPass, sendCode } from '@/api/system/user'
import { Message } from 'element-ui'

export default {
  name: 'ChangePass',
  data() {
    return {
      // 查询参数
      form: {
        mail: '',
        code: ''
      }
    }
  },
  methods: {
    // 判断结果
    judgeResult(res) {
      if (res.code === 0) {
        Message({
          showClose: true,
          message: this.$t('common.operationSuccess'),
          type: 'success'
        })
      }
    },

    // 发送邮箱验证码
    async sendEmailCode() {
      await sendCode({ mail: this.form.mail }).then(res => {
        this.judgeResult(res)
      })
    },
    // 重置密码
    async resetPass() {
      await emailPass(this.form).then(res => {
        this.judgeResult(res)
      })
      // 重新登录
      setTimeout(() => {
        this.$router.replace({ path: '/login' })
      }, 1500)
    }
  }
}
</script>

<style scoped lang="scss">
.reset-pass {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-container {
  width: 400px;
}

.input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.input-container .el-input {
  flex: 1;
  margin-right: 10px;
}

.code-item .el-form-item__label {
  width: 80px;
}
.code-item .el-input {
  width: 345px;
}

.reset-item {
  text-align: right;
}
</style>
