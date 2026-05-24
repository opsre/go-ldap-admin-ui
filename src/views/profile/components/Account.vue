<template>
  <div>
    <el-card style="margin-bottom:20px;max-width: 580px;">
      <div slot="header" class="clearfix">
        <span>{{ $t('account.title') }}</span>
      </div>

      <el-form ref="dialogForm" size="small" :model="dialogFormData" :rules="dialogFormRules" label-width="100px">

        <el-form-item :label="$t('account.oldPassword')" prop="oldPassword">
          <el-input v-model.trim="dialogFormData.oldPassword" autocomplete="on" :type="passwordTypeOld" :placeholder="$t('account.oldPasswordPlaceholder')" />
          <span class="show-pwd" @click="showPwdOld">
            <svg-icon :icon-class="passwordTypeOld === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item :label="$t('account.newPassword')" prop="newPassword">
          <el-input v-model.trim="dialogFormData.newPassword" autocomplete="on" :type="passwordTypeNew" :placeholder="$t('account.newPasswordPlaceholder')" />
          <span class="show-pwd" @click="showPwdNew">
            <svg-icon :icon-class="passwordTypeNew === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item :label="$t('account.confirmPassword')" prop="confirmPassword">
          <el-input v-model.trim="dialogFormData.confirmPassword" autocomplete="on" :type="passwordTypeConfirm" :placeholder="$t('account.confirmPasswordPlaceholder')" />
          <span class="show-pwd" @click="showPwdConfirm">
            <svg-icon :icon-class="passwordTypeConfirm === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-form-item>
          <el-button :loading="submitLoading" type="primary" @click="submitForm">{{ $t('common.confirm') }}</el-button>
          <el-button @click="cancelForm">{{ $t('common.cancel') }}</el-button>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
import { changePwd } from '@/api/system/user'
import store from '@/store'
import JSEncrypt from 'jsencrypt'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      submitLoading: false,
      dialogFormData: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      publicKey: process.env.VUE_APP_PUBLIC_KEY,
      passwordTypeOld: 'password',
      passwordTypeNew: 'password',
      passwordTypeConfirm: 'password'
    }
  },
  computed: {
    dialogFormRules() {
      const confirmPass = (rule, value, callback) => {
        if (value) {
          if (this.dialogFormData.newPassword !== value) {
            callback(new Error(this.$t('account.passwordMismatch')))
          } else {
            callback()
          }
        } else {
          callback(new Error(this.$t('account.confirmPasswordRequired')))
        }
      }
      return {
        oldPassword: [
          { required: true, message: this.$t('validation.required', { field: this.$t('account.oldPassword') }), trigger: 'blur' },
          { min: 6, max: 30, message: this.$t('validation.lengthRange', { min: 6, max: 30 }), trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: this.$t('validation.required', { field: this.$t('account.newPassword') }), trigger: 'blur' },
          { min: 6, max: 30, message: this.$t('validation.lengthRange', { min: 6, max: 30 }), trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: confirmPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['dialogForm'].validate(async valid => {
        if (valid) {
          this.dialogFormDataCopy = { ...this.dialogFormData }

          // 密码RSA加密处理
          const encryptor = new JSEncrypt()
          // 设置公钥
          encryptor.setPublicKey(this.publicKey)
          // 加密密码
          const oldPasswd = encryptor.encrypt(this.dialogFormData.oldPassword)
          const newPasswd = encryptor.encrypt(this.dialogFormData.newPassword)
          const confirmPasswd = encryptor.encrypt(this.dialogFormData.confirmPassword)
          this.dialogFormDataCopy.oldPassword = oldPasswd
          this.dialogFormDataCopy.newPassword = newPasswd
          this.dialogFormDataCopy.confirmPassword = confirmPasswd

          this.submitLoading = true
          const { code, msg } = await changePwd(this.dialogFormDataCopy)

          this.submitLoading = false
          if (code !== 0) {
            return Message({
              showClose: true,
              message: msg,
              type: 'error'
            })
          }
          this.resetForm()
          Message({
            showClose: true,
            message: this.$t('account.changeSuccess'),
            type: 'success'
          })
          // 重新登录
          setTimeout(() => {
            store.dispatch('user/logout').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          }, 1500)
        } else {
          this.$message({
            showClose: true,
            message: this.$t('common.formInvalid'),
            type: 'warn'
          })
          return false
        }
      })
    },
    cancelForm() {
      this.resetForm()
    },
    resetForm() {
      this.$refs['dialogForm'].resetFields()
      this.dialogFormData = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    },
    showPwdOld() {
      if (this.passwordTypeOld === 'password') {
        this.passwordTypeOld = ''
      } else {
        this.passwordTypeOld = 'password'
      }
    },
    showPwdNew() {
      if (this.passwordTypeNew === 'password') {
        this.passwordTypeNew = ''
      } else {
        this.passwordTypeNew = 'password'
      }
    },
    showPwdConfirm() {
      if (this.passwordTypeConfirm === 'password') {
        this.passwordTypeConfirm = ''
      } else {
        this.passwordTypeConfirm = 'password'
      }
    }
  }
}
</script>

<style scoped>
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 3px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }

</style>
