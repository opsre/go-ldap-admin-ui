<template>
  <div>
    <el-card class="container-card" shadow="always">
      <el-form size="mini" :inline="true" :model="params" class="demo-form-inline">
        <el-form-item :label="$t('userPage.fields.username')">
          <el-input v-model.trim="params.username" style="width: 100px;" clearable :placeholder="$t('userPage.fields.username')" @keyup.enter.native="search" @clear="search" />
        </el-form-item>
        <el-form-item :label="$t('userPage.fields.nickname')">
          <el-input v-model.trim="params.nickname" style="width: 100px;" clearable :placeholder="$t('userPage.fields.nickname')" @keyup.enter.native="search" @clear="search" />
        </el-form-item>
        <el-form-item :label="$t('userPage.fields.status')">
          <el-select v-model.trim="params.status" style="width: 100px;" clearable :placeholder="$t('userPage.fields.status')" @change="search" @clear="search">
            <el-option :label="$t('userPage.status.active')" value="1" />
            <el-option :label="$t('userPage.status.disabled')" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('userPage.fields.syncState')">
          <el-select v-model.trim="params.syncState" style="width: 100px;" clearable :placeholder="$t('userPage.fields.syncState')" @change="search" @clear="search">
            <el-option :label="$t('userPage.sync.synced')" value="1" />
            <el-option :label="$t('userPage.sync.unsynced')" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" icon="el-icon-search" type="primary" @click="search">{{ $t('common.search') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" icon="el-icon-plus" type="warning" @click="create">{{ $t('userPage.actions.create') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="multipleSelection.length === 0" :loading="loading" icon="el-icon-delete" type="danger" @click="batchDelete">{{ $t('userPage.actions.batchDelete') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="multipleSelection.length === 0" :loading="loading" icon="el-icon-upload2" type="success" @click="batchSync">{{ $t('userPage.actions.batchSync') }}</el-button>
        </el-form-item>
        <br>
        <el-form-item v-if="syncConfig.ldapEnableSync">
          <el-button :loading="loading" icon="el-icon-download" type="warning" @click="syncOpenLdapUsers">{{ $t('userPage.actions.syncOpenLdap') }}</el-button>
        </el-form-item>
        <el-form-item v-if="syncConfig.dingTalkEnableSync">
          <el-button :loading="loading" icon="el-icon-download" type="warning" @click="syncDingTalkUsers">{{ $t('userPage.actions.syncDingTalk') }}</el-button>
        </el-form-item>
        <el-form-item v-if="syncConfig.feiShuEnableSync">
          <el-button :loading="loading" icon="el-icon-download" type="warning" @click="syncFeiShuUsers">{{ $t('userPage.actions.syncFeiShu') }}</el-button>
        </el-form-item>
        <el-form-item v-if="syncConfig.weComEnableSync">
          <el-button :loading="loading" icon="el-icon-download" type="warning" @click="syncWeComUsers">{{ $t('userPage.actions.syncWeCom') }}</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column show-overflow-tooltip sortable prop="username" :label="$t('userPage.fields.username')" />
        <el-table-column show-overflow-tooltip sortable prop="nickname" :label="$t('userPage.fields.nickname')" />
        <el-table-column show-overflow-tooltip sortable prop="givenName" :label="$t('userPage.fields.givenName')" />
        <!-- 使用按钮方式展示，以后改成布尔参数比较合适 -->
        <el-table-column :label="$t('userPage.fields.status')" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" @change="userStateChanged(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable prop="mail" :label="$t('userPage.fields.mail')" />
        <el-table-column show-overflow-tooltip sortable prop="mobile" :label="$t('userPage.fields.mobile')" />
        <el-table-column show-overflow-tooltip sortable prop="jobNumber" :label="$t('userPage.fields.jobNumber')" />
        <el-table-column show-overflow-tooltip sortable prop="departments" :label="$t('userPage.fields.departments')" />
        <el-table-column show-overflow-tooltip sortable prop="position" :label="$t('userPage.fields.position')" />
        <el-table-column show-overflow-tooltip sortable prop="creator" :label="$t('userPage.fields.creator')" />
        <el-table-column show-overflow-tooltip sortable prop="introduction" :label="$t('userPage.fields.introduction')" />
        <el-table-column show-overflow-tooltip sortable prop="userDn" label="DN" />
        <el-table-column show-overflow-tooltip sortable prop="CreatedAt" :label="$t('userPage.fields.createdAt')" />
        <el-table-column show-overflow-tooltip sortable prop="UpdatedAt" :label="$t('userPage.fields.updatedAt')" />
        <el-table-column fixed="right" :label="$t('userPage.fields.actions')" align="center" width="190">
          <template slot-scope="scope">
            <el-tooltip :content="$t('userPage.actions.edit')" effect="dark" placement="top">
              <el-button size="mini" icon="el-icon-edit" circle type="primary" @click="update(scope.row)" />
            </el-tooltip>
            <el-tooltip class="delete-popover" :content="$t('userPage.actions.resetPassword')" effect="dark" placement="top">
              <el-popconfirm :title="$t('userPage.confirm.resetPassword')" @onConfirm="resetUserPassword(scope.row.username)">
                <el-button slot="reference" size="mini" icon="el-icon-key" circle type="warning" />
              </el-popconfirm>
            </el-tooltip>
            <el-tooltip class="delete-popover" :content="$t('userPage.actions.delete')" effect="dark" placement="top">
              <el-popconfirm :title="$t('userPage.confirm.deleteOne')" @onConfirm="singleDelete(scope.row.ID)">
                <el-button slot="reference" size="mini" icon="el-icon-delete" circle type="danger" />
              </el-popconfirm>
            </el-tooltip>
            <el-tooltip v-if="scope.row.syncState == 2" class="delete-popover" :content="$t('userPage.actions.sync')" effect="dark" placement="top">
              <el-popconfirm :title="$t('userPage.confirm.syncOne')" @onConfirm="singleSync(scope.row.ID)">
                <el-button slot="reference" size="mini" icon="el-icon-upload2" circle type="success" />
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page="params.pageNum"
        :page-size="params.pageSize"
        :total="total"
        :page-sizes="[1, 5, 10, 30]"
        layout="total, prev, pager, next, sizes"
        background
        style="margin-top: 10px;float:right;margin-bottom: 10px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" width="50%">
        <el-form ref="dialogForm" size="small" :model="dialogFormData" :rules="dialogFormRules" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('userPage.fields.username')" prop="username">
                <el-input ref="password" v-model.trim="dialogFormData.username" :disabled="dialogUsernameDisabled" :placeholder="$t('userPage.placeholders.username')" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('userPage.fields.nickname')" prop="nickname">
                <el-input v-model.trim="dialogFormData.nickname" :placeholder="$t('userPage.fields.nickname')" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('userPage.fields.givenName')" prop="givenName">
                <el-input v-model.trim="dialogFormData.givenName" :placeholder="$t('userPage.fields.givenName')" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('userPage.fields.mail')" prop="mail">
                <el-input v-model.trim="dialogFormData.mail" :placeholder="$t('userPage.fields.mail')" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- 修改用户时，不显示密码字段 -->
              <el-form-item v-if="dialogType === 'create'" :label="$t('account.newPassword')" prop="password">
                <el-input v-model.trim="dialogFormData.password" autocomplete="off" :type="passwordType" :placeholder="$t('account.newPassword')" />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('userPage.fields.roles')" prop="roleIds">
                <el-select v-model.trim="dialogFormData.roleIds" multiple :placeholder="$t('userPage.placeholders.roles')" style="width:100%">
                  <el-option
                    v-for="item in roles"
                    :key="item.ID"
                    :label="item.name"
                    :value="item.ID"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('userPage.fields.status')" prop="status">
                <el-select v-model.trim="dialogFormData.status" :placeholder="$t('userPage.placeholders.status')" style="width:100%">
                  <el-option :label="$t('userPage.status.active')" :value="1" />
                  <el-option :label="$t('userPage.status.disabled')" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('userPage.fields.mobile')" prop="mobile">
                <el-input v-model.trim="dialogFormData.mobile" :placeholder="$t('userPage.fields.mobile')" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('userPage.fields.jobNumber')" prop="jobNumber">
                <el-input v-model.trim="dialogFormData.jobNumber" :placeholder="$t('userPage.fields.jobNumber')" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('userPage.fields.position')" prop="position">
                <el-input v-model.trim="dialogFormData.position" :placeholder="$t('userPage.fields.position')" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('userPage.fields.departmentId')" prop="departmentId">
                <treeselect
                  v-model="dialogFormData.departmentId"
                  :options="departmentsOptions"
                  :placeholder="$t('userPage.placeholders.department')"
                  :normalizer="normalizer"
                  value-consists-of="ALL"
                  :multiple="true"
                  :flat="true"
                  :no-children-text="$t('userPage.empty.noMoreOptions')"
                  :no-results-text="$t('userPage.empty.noMatchedOptions')"
                  @input="treeselectInput"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('userPage.fields.postalAddress')" prop="postalAddress">
                <el-input v-model.trim="dialogFormData.postalAddress" type="textarea" :placeholder="$t('userPage.fields.postalAddress')" :autosize="{minRows: 3, maxRows: 6}" show-word-limit maxlength="100" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('userPage.fields.introduction')" prop="introduction">
                <el-input v-model.trim="dialogFormData.introduction" type="textarea" :placeholder="$t('userPage.fields.introduction')" :autosize="{minRows: 3, maxRows: 6}" show-word-limit maxlength="100" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="cancelForm()">{{ $t('common.cancel') }}</el-button>
          <el-button size="mini" :loading="submitLoading" type="primary" @click="submitForm()">{{ $t('common.confirm') }}</el-button>
        </div>
      </el-dialog>

      <!-- 重置密码结果对话框 -->
      <el-dialog
        :title="$t('userPage.resetPassword.title')"
        :visible.sync="resetPasswordDialogVisible"
        width="400px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeResetPasswordDialog"
      >
        <div style="text-align: center;">
          <el-alert
            :title="$t('userPage.resetPassword.savePassword')"
            type="warning"
            :closable="false"
            show-icon
            style="margin-bottom: 20px;"
          />
          <p style="margin-bottom: 10px; font-weight: bold;">{{ $t('userPage.resetPassword.user') }}{{ resetUsername }}</p>
          <p style="margin-bottom: 20px; color: #606266;">{{ $t('userPage.resetPassword.newPassword') }}</p>
          <el-input
            v-model="newPassword"
            readonly
            style="margin-bottom: 20px;"
          >
            <el-button
              slot="append"
              icon="el-icon-document-copy"
              @click="copyPassword"
            >
              {{ $t('userPage.actions.copy') }}
            </el-button>
          </el-input>
          <el-alert
            :title="$t('userPage.resetPassword.saveNow')"
            type="info"
            :closable="false"
            show-icon
          />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeResetPasswordDialog">{{ $t('userPage.resetPassword.saved') }}</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import JSEncrypt from 'jsencrypt'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getUsers, createUser, updateUserById, batchDeleteUserByIds, changeUserStatus, syncDingTalkUsersApi, syncWeComUsersApi, syncFeiShuUsersApi, syncOpenLdapUsersApi, syncSqlUsers } from '@/api/personnel/user'
import { resetPassword } from '@/api/system/user'
import { getRoles } from '@/api/system/role'
import { getGroupTree } from '@/api/personnel/group'
import { getConfig } from '@/api/system/base'
import { Message } from 'element-ui'

const getDefaultDialogFormData = () => ({
  username: '',
  password: '',
  nickname: '',
  status: 1,
  mobile: '',
  avatar: '',
  introduction: '',
  roleIds: [],
  ID: '',
  mail: '',
  givenName: '',
  jobNumber: '',
  postalAddress: '',
  departments: '',
  position: '',
  departmentId: undefined
})

export default {
  name: 'User',
  components: {
    Treeselect
  },
  props: {
    disabled: { // username 默认不可编辑，若需要至为可编辑，请（在新增和编辑处）去掉这个值的控制，且配合后端的ldap-user-name-modify配置使用
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('userPage.validation.mobileRequired')))
      } else {
        const reg = /1\d{10}/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error(this.$t('userPage.validation.mobileInvalid')))
        }
      }
    }
    return {
      // 查询参数
      params: {
        username: '',
        nickname: '',
        status: '',
        syncState: '',
        mobile: '',
        pageNum: 1,
        pageSize: 10
      },
      // 表格数据
      tableData: [],
      total: 0,
      loading: false,
      isUpdate: false,
      // 部门信息数据
      treeselectValue: 0,
      // 角色
      roles: [],
      // 部门信息
      departmentsOptions: [],

      passwordType: 'password',

      publicKey: process.env.VUE_APP_PUBLIC_KEY,

      // dialog对话框
      submitLoading: false,
      dialogFormTitle: '',
      dialogType: '',
      dialogFormVisible: false,
      dialogUsernameDisabled: this.disabled,
      dialogFormData: getDefaultDialogFormData(),
      phoneValidator: checkPhone,

      // 删除按钮弹出框
      popoverVisible: false,
      // 表格多选
      multipleSelection: [],
      changeUserStatusFormData: {
        id: '',
        status: ''
      },

      // 重置密码结果对话框
      resetPasswordDialogVisible: false,
      newPassword: '',
      resetUsername: '',

      // 同步配置
      syncConfig: {
        ldapEnableSync: false,
        dingTalkEnableSync: false,
        feiShuEnableSync: false,
        weComEnableSync: false
      }
    }
  },
  computed: {
    dialogFormRules() {
      return {
        username: [
          { required: true, message: this.$t('validation.required', { field: this.$t('userPage.fields.username') }), trigger: 'blur' },
          { min: 2, max: 20, message: this.$t('validation.lengthRange', { min: 2, max: 20 }), trigger: 'blur' }
        ],
        password: [
          { required: false, message: this.$t('validation.required', { field: this.$t('login.password') }), trigger: 'blur' },
          { min: 6, max: 30, message: this.$t('validation.lengthRange', { min: 6, max: 30 }), trigger: 'blur' }
        ],
        mail: [
          { required: true, message: this.$t('validation.required', { field: this.$t('userPage.fields.mail') }), trigger: 'blur' }
        ],
        jobNumber: [
          { required: true, message: this.$t('validation.required', { field: this.$t('userPage.fields.jobNumber') }), trigger: 'blur' },
          { min: 0, max: 20, message: this.$t('validation.lengthRange', { min: 0, max: 20 }), trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: this.$t('validation.required', { field: this.$t('userPage.fields.nickname') }), trigger: 'blur' },
          { min: 2, max: 20, message: this.$t('validation.lengthRange', { min: 2, max: 20 }), trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: this.phoneValidator, trigger: 'blur' }
        ],
        status: [
          { required: true, message: this.$t('userPage.validation.selectStatus'), trigger: 'change' }
        ],
        departmentId: [
          { required: true, message: this.$t('userPage.validation.selectDepartment'), trigger: 'change' },
          { validator: (rule, value, callBack) => {
            if (value < 1) {
              callBack(this.$t('userPage.validation.validDepartment'))
            } else {
              callBack()
            }
          }
          }
        ],
        introduction: [
          { required: false, message: this.$t('userPage.fields.introduction'), trigger: 'blur' },
          { min: 0, max: 100, message: this.$t('validation.lengthRange', { min: 0, max: 100 }), trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getTableData()
    this.getRoles()
    this.getSyncConfig()
  },
  methods: {
    // 获取同步配置
    async getSyncConfig() {
      try {
        const { data } = await getConfig()
        this.syncConfig = data
      } catch (error) {
        console.error('failed to get sync config:', error)
      }
    },
    // 查询
    search() {
      this.params.pageNum = 1
      this.getTableData()
    },

    // 获取表格数据
    async getTableData() {
      this.loading = true
      try {
        const { data } = await getUsers(this.params)
        data.users.forEach(item => {
          const dataStrArr = item.departmentId.split(',')
          const dataIntArr = []
          dataStrArr.forEach(item => {
            dataIntArr.push(+item)
          })
          item.departmentId = dataIntArr
        })
        this.tableData = data.users
        this.total = data.total
      } finally {
        this.loading = false
      }
    },
    // 获取所有的分组信息，用于弹框选取上级分组
    async getAllGroups() {
      this.loading = true
      try {
        const checkParams = {
          pageNum: 1,
          pageSize: 1000 // 平常百姓人家应该不会有这么多数据吧
        }
        const { data } = await getGroupTree(checkParams)
        this.departmentsOptions = [{ ID: 0, groupName: this.$t('userPage.placeholders.departmentInfo'), groupType: 'T', children: data }]
      } finally {
        this.loading = false
      }
    },
    // 获取角色数据
    async getRoles() {
      const res = await getRoles(null)

      this.roles = res.data.roles
    },

    // 新增
    create() {
      this.dialogFormTitle = this.$t('userPage.dialog.createTitle')
      this.dialogType = 'create'
      this.dialogUsernameDisabled = false
      this.dialogFormData = getDefaultDialogFormData()
      this.$nextTick(() => {
        this.$refs['dialogForm'] && this.$refs['dialogForm'].clearValidate()
      })
      this.getAllGroups()
      this.dialogFormVisible = true
    },

    // 修改
    update(row) {
      this.dialogUsernameDisabled = true
      this.getAllGroups()
      this.dialogFormData = {
        ...getDefaultDialogFormData(),
        ID: row.ID,
        username: row.username,
        nickname: row.nickname,
        status: row.status,
        mobile: row.mobile,
        introduction: row.introduction,
        // 遍历角色数组，获取角色ID
        roleIds: row.roles.map(item => item.ID),
        mail: row.mail,
        givenName: row.givenName,
        jobNumber: row.jobNumber,
        postalAddress: row.postalAddress,
        departments: row.departments,
        departmentId: row.departmentId,
        position: row.position
      }

      this.dialogFormTitle = this.$t('userPage.dialog.updateTitle')
      this.dialogType = 'update'
      this.passwordType = 'password'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dialogForm'] && this.$refs['dialogForm'].clearValidate()
      })
    },

    // 将 部门id 转换为 部门name
    setDepartmentNameByDepartmentId() {
      const ids = this.dialogFormData.departmentId
      if (!ids || !ids.length) return
      const departments = []
      // 深度优先遍函数
      const dfs = (node, cb) => {
        if (!node) return
        cb(node)
        if (node.children && node.children.length) {
          node.children.forEach(item => {
            dfs(item, cb)
          })
        }
      }
      dfs(this.departmentsOptions[0], node => {
        if (ids.includes(node.ID)) {
          departments.push(node.groupName)
        }
      })
      this.dialogFormData.departments = departments.join(',')
    },

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

    // 提交表单
    submitForm() {
      if (this.dialogFormData.nickname === '') {
        Message({
          showClose: true,
          message: this.$t('validation.required', { field: this.$t('userPage.fields.nickname') }),
          type: 'error'
        })
        return false
      }
      if (this.dialogFormData.username === '') {
        Message({
          showClose: true,
          message: this.$t('validation.required', { field: this.$t('userPage.fields.username') }),
          type: 'error'
        })
        return false
      }
      if (this.dialogFormData.mail === '') {
        Message({
          showClose: true,
          message: this.$t('validation.required', { field: this.$t('userPage.fields.mail') }),
          type: 'error'
        })
        return false
      }
      if (this.dialogFormData.jobNumber === '') {
        Message({
          showClose: true,
          message: this.$t('validation.required', { field: this.$t('userPage.fields.jobNumber') }),
          type: 'error'
        })
        return false
      }
      if (this.dialogFormData.mobile === '') {
        Message({
          showClose: true,
          message: this.$t('validation.required', { field: this.$t('userPage.fields.mobile') }),
          type: 'error'
        })
        return false
      }
      if (this.dialogFormData.status === '') {
        Message({
          showClose: true,
          message: this.$t('validation.required', { field: this.$t('userPage.fields.status') }),
          type: 'error'
        })
        return false
      }
      if (!this.dialogFormData.roleIds || this.dialogFormData.roleIds.length === 0) {
        Message({
          showClose: true,
          message: this.$t('userPage.validation.selectRoles'),
          type: 'error'
        })
        return false
      }
      this.$refs['dialogForm'].validate(async valid => {
        if (valid) {
          this.submitLoading = true
          // 在这里自动填充下部门字段
          this.setDepartmentNameByDepartmentId()
          this.dialogFormDataCopy = { ...this.dialogFormData }
          if (this.dialogFormData.password !== '') {
          // 密码RSA加密处理
            const encryptor = new JSEncrypt()
            // 设置公钥
            encryptor.setPublicKey(this.publicKey)
            // 加密密码
            const encPassword = encryptor.encrypt(this.dialogFormData.password)
            this.dialogFormDataCopy.password = encPassword
          }
          try {
            if (this.dialogType === 'create') {
              await createUser(this.dialogFormDataCopy).then(res => {
                this.judgeResult(res)
              })
            } else {
              await updateUserById(this.dialogFormDataCopy).then(res => {
                this.judgeResult(res)
              })
            }
          } finally {
            this.submitLoading = false
          }
          this.resetForm()
          this.getTableData()
        } else {
          Message({
            showClose: true,
            message: this.$t('common.formInvalid'),
            type: 'warn'
          })
          return false
        }
      })
    },

    // 提交表单
    cancelForm() {
      this.resetForm()
    },

    resetForm() {
      this.dialogFormVisible = false
      this.$refs['dialogForm'].resetFields()
      this.dialogFormData = getDefaultDialogFormData()
      this.dialogUsernameDisabled = this.disabled
      this.passwordType = 'password'
    },

    // 批量删除
    batchDelete() {
      this.$confirm(this.$t('userPage.confirm.batchDelete'), this.$t('userPage.confirm.title'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(async res => {
        this.loading = true
        const userIds = []
        this.multipleSelection.forEach(x => {
          userIds.push(x.ID)
        })
        try {
          await batchDeleteUserByIds({ userIds: userIds }).then(res => {
            this.judgeResult(res)
          })
        } finally {
          this.loading = false
        }
        this.getTableData()
      }).catch(() => {
        Message({
          showClose: true,
          type: 'info',
          message: this.$t('userPage.messages.deleteCanceled')
        })
      })
    },
    // 批量同步
    batchSync() {
      this.$confirm(this.$t('userPage.confirm.batchSync'), this.$t('userPage.confirm.title'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(async res => {
        this.loading = true
        const userIds = []
        this.multipleSelection.forEach(x => {
          userIds.push(x.ID)
        })
        try {
          await syncSqlUsers({ userIds: userIds }).then(res => {
            this.judgeResult(res)
          })
        } finally {
          this.loading = false
        }
        this.getTableData()
      }).catch(() => {
        Message({
          showClose: true,
          type: 'info',
          message: this.$t('userPage.messages.syncCanceled')
        })
      })
    },

    // 监听 switch 开关 状态改变
    async userStateChanged(userInfo) {
      this.changeUserStatusFormData.id = userInfo.ID
      this.changeUserStatusFormData.status = userInfo.status
      const { code } = await changeUserStatus(this.changeUserStatusFormData)
      if (code !== 0) {
        return Message.error(this.$t('userPage.messages.statusUpdateFailed'))
      }
      Message.success(this.$t('userPage.messages.statusUpdateSuccess'))
    },

    // 表格多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // 单个删除
    async singleDelete(Id) {
      this.loading = true
      try {
        await batchDeleteUserByIds({ userIds: [Id] }).then(res => {
          this.judgeResult(res)
        })
      } finally {
        this.loading = false
      }
      this.getTableData()
    },
    // 单个同步
    async singleSync(Id) {
      this.loading = true
      try {
        await syncSqlUsers({ userIds: [Id] }).then(res => {
          this.judgeResult(res)
        })
      } finally {
        this.loading = false
      }
      this.getTableData()
    },

    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },

    // 分页
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.params.pageNum = val
      this.getTableData()
    },
    // treeselect
    normalizer(node) {
      return {
        id: node.ID,
        label: node.groupType + '=' + (node.groupNameDisplay || node.groupName),
        isDisabled: node.groupType === 'ou' || node.groupName === 'root',
        children: node.children
      }
    },
    treeselectInput(value) {
      this.treeselectValue = value
    },
    syncDingTalkUsers() {
      this.loading = true
      syncDingTalkUsersApi().then(res => {
        this.judgeResult(res)
        this.loading = false
        this.getTableData()
      })
    },
    syncWeComUsers() {
      this.loading = true
      syncWeComUsersApi().then(res => {
        this.judgeResult(res)
        this.loading = false
        this.getTableData()
      })
    },
    syncFeiShuUsers() {
      this.loading = true
      syncFeiShuUsersApi().then(res => {
        this.judgeResult(res)
        this.loading = false
        this.getTableData()
      })
    },
    syncOpenLdapUsers() {
      this.loading = true
      syncOpenLdapUsersApi().then(res => {
        this.judgeResult(res)
        this.loading = false
        this.getTableData()
      })
    },

    // 重置用户密码
    async resetUserPassword(username) {
      this.loading = true
      try {
        const res = await resetPassword({ username: username })
        if (res.code === 0) {
          this.newPassword = res.data.newPassword
          this.resetUsername = username
          this.resetPasswordDialogVisible = true
          Message({
            showClose: true,
            message: this.$t('userPage.messages.passwordResetSuccess'),
            type: 'success'
          })
        } else {
          Message({
            showClose: true,
            message: res.msg || this.$t('userPage.messages.passwordResetFailed'),
            type: 'error'
          })
        }
      } finally {
        this.loading = false
      }
      this.getTableData()
    },

    // 复制密码到剪贴板
    copyPassword() {
      const textArea = document.createElement('textarea')
      textArea.value = this.newPassword
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        Message({
          showClose: true,
          message: this.$t('userPage.messages.copySuccess'),
          type: 'success'
        })
      } catch (err) {
        Message({
          showClose: true,
          message: this.$t('userPage.messages.copyFailed'),
          type: 'error'
        })
      }
      document.body.removeChild(textArea)
    },

    // 关闭重置密码对话框
    closeResetPasswordDialog() {
      this.resetPasswordDialogVisible = false
      this.newPassword = ''
      this.resetUsername = ''
    }
  }
}
</script>

<style scoped>
  .container-card{
    margin: 10px;
    margin-bottom: 100px;
  }

  .delete-popover{
    margin-left: 10px;
  }

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
