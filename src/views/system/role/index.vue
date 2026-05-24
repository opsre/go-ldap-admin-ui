<template>
  <div>
    <el-card class="container-card" shadow="always">
      <el-form size="mini" :inline="true" :model="params" class="demo-form-inline">
        <el-form-item :label="$t('rolePage.fields.name')">
          <el-input v-model.trim="params.name" clearable :placeholder="$t('rolePage.fields.name')" @keyup.enter.native="search" @clear="search" />
        </el-form-item>
        <el-form-item :label="$t('rolePage.fields.keyword')">
          <el-input v-model.trim="params.keyword" clearable :placeholder="$t('rolePage.fields.keyword')" @keyup.enter.native="search" @clear="search" />
        </el-form-item>
        <el-form-item :label="$t('rolePage.fields.status')">
          <el-select v-model.trim="params.status" clearable :placeholder="$t('rolePage.fields.status')" @change="search" @clear="search">
            <el-option :label="$t('userPage.status.active')" :value="1" />
            <el-option :label="$t('userPage.status.disabled')" :value="2" />
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
      </el-form>

      <el-table v-loading="loading" :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column show-overflow-tooltip sortable prop="nameDisplay" :label="$t('rolePage.fields.name')" />
        <el-table-column show-overflow-tooltip sortable prop="keyword" :label="$t('rolePage.fields.keyword')" />
        <el-table-column show-overflow-tooltip sortable prop="sort" :label="$t('rolePage.fields.sort')" />
        <el-table-column show-overflow-tooltip sortable prop="status" :label="$t('rolePage.fields.status')" align="center">
          <template slot-scope="scope">
            <el-tag size="small" :type="scope.row.status === 1 ? 'success':'danger'" disable-transitions>{{ scope.row.status === 1 ? $t('userPage.status.active') : $t('userPage.status.disabled') }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable prop="creatorDisplay" :label="$t('userPage.fields.creator')" />
        <el-table-column show-overflow-tooltip sortable prop="remarkDisplay" :label="$t('userPage.fields.introduction')" />
        <el-table-column fixed="right" :label="$t('userPage.fields.actions')" align="center" width="140">
          <template slot-scope="scope">
            <el-tooltip :content="$t('userPage.actions.edit')" effect="dark" placement="top">
              <el-button size="mini" icon="el-icon-edit" circle type="primary" @click="update(scope.row)" />
            </el-tooltip>
            <el-tooltip :content="$t('rolePage.fields.permission')" effect="dark" placement="top">
              <el-button size="mini" icon="el-icon-key" circle type="warning" @click="updatePermission(scope.row.ID)" />
            </el-tooltip>
            <el-tooltip :content="$t('userPage.actions.delete')" effect="dark" placement="top">
              <el-popconfirm style="margin-left:10px" :title="$t('userPage.confirm.deleteOne')" @onConfirm="singleDelete(scope.row.ID)">
                <el-button slot="reference" size="mini" icon="el-icon-delete" circle type="danger" />
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

      <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible" width="580px">
        <el-form ref="dialogForm" :inline="true" size="small" :model="dialogFormData" :rules="dialogFormRules" label-width="100px">
          <el-form-item :label="$t('rolePage.fields.name')" prop="name">
            <el-input v-model.trim="dialogFormData.name" :placeholder="$t('rolePage.fields.name')" style="width: 420px" />
          </el-form-item>
          <el-form-item :label="$t('rolePage.fields.keyword')" prop="keyword">
            <el-input v-model.trim="dialogFormData.keyword" :placeholder="$t('rolePage.fields.keyword')" style="width: 420px" />
          </el-form-item>
          <el-form-item :label="$t('rolePage.fields.status')" prop="status">
            <el-select v-model.trim="dialogFormData.status" :placeholder="$t('rolePage.validation.selectStatus')" style="width: 180px">
              <el-option :label="$t('userPage.status.active')" :value="1" />
              <el-option :label="$t('userPage.status.disabled')" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('rolePage.fields.sortWithHint')" prop="sort">
            <el-input-number v-model.number="dialogFormData.sort" controls-position="right" :min="1" :max="999" />
          </el-form-item>
          <el-form-item :label="$t('userPage.fields.introduction')" prop="remark">
            <el-input v-model.trim="dialogFormData.remark" style="width: 420px" type="textarea" :placeholder="$t('userPage.fields.introduction')" show-word-limit maxlength="100" />
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button size="mini" @click="cancelForm()">{{ $t('common.cancel') }}</el-button>
          <el-button size="mini" :loading="submitLoading" type="primary" @click="submitForm()">{{ $t('common.confirm') }}</el-button>
        </div>
      </el-dialog>

      <el-dialog :title="$t('rolePage.dialog.permissionTitle')" :visible.sync="permsDialogVisible" width="580px" custom-class="perms-dialog">
        <el-tabs>
          <el-tab-pane>
            <span slot="label"><svg-icon icon-class="menu1" class-name="role-menu" /> {{ $t('rolePage.tabs.menu') }}</span>
            <el-tree
              ref="roleMenuTree"
              v-loading="menuTreeLoading"
              :props="{children: 'children',label: 'titleDisplay'}"
              :data="menuTree"
              show-checkbox
              node-key="ID"
              check-strictly
              :default-checked-keys="defaultCheckedRoleMenu"
            />

          </el-tab-pane>

          <el-tab-pane>
            <span slot="label"><svg-icon icon-class="api1" class-name="role-menu" /> {{ $t('rolePage.tabs.api') }}</span>
            <el-tree
              ref="roleApiTree"
              v-loading="apiTreeLoading"
              :props="{children: 'children',label: 'remarkDisplay'}"
              :data="apiTree"
              show-checkbox
              node-key="ID"
              :default-checked-keys="defaultCheckedRoleApi"
            />

          </el-tab-pane>
        </el-tabs>
        <div slot="footer">
          <el-button size="mini" :loading="permissionLoading" @click="cancelPermissionForm()">{{ $t('common.cancel') }}</el-button>
          <el-button size="mini" type="primary" @click="submitPermissionForm()">{{ $t('common.confirm') }}</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import { getRoles, createRole, updateRoleById, batchDeleteRoleByIds, getRoleMenusById, getRoleApisById, updateRoleMenusById, updateRoleApisById } from '@/api/system/role'
import { getMenuTree } from '@/api/system/menu'
import { getApiTree } from '@/api/system/api'
import { Message } from 'element-ui'

export default {
  name: 'Role',
  data() {
    return {
      // 查询参数
      params: {
        name: '',
        keyword: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      },
      // 表格数据
      tableData: [],
      total: 0,
      loading: false,

      // dialog对话框
      submitLoading: false,
      dialogFormTitle: '',
      dialogType: '',
      dialogFormVisible: false,
      dialogFormData: {
        ID: '',
        name: '',
        keyword: '',
        status: 1,
        sort: 999,
        remark: ''
      },

      // 删除按钮弹出框
      popoverVisible: false,
      // 表格多选
      multipleSelection: [],

      // 修改权限
      permsDialogVisible: false,
      permissionLoading: false,
      menuTree: [],
      defaultCheckedRoleMenu: [],
      apiTree: [],
      defaultCheckedRoleApi: [],

      // 被修改权限的角色ID
      roleId: 0
    }
  },
  computed: {
    dialogFormRules() {
      return {
        name: [
          { required: true, message: this.$t('validation.required', { field: this.$t('rolePage.fields.name') }), trigger: 'blur' },
          { min: 1, max: 20, message: this.$t('validation.lengthRange', { min: 1, max: 20 }), trigger: 'blur' }
        ],
        keyword: [
          { required: true, message: this.$t('validation.required', { field: this.$t('rolePage.fields.keyword') }), trigger: 'blur' },
          { min: 1, max: 20, message: this.$t('validation.lengthRange', { min: 1, max: 20 }), trigger: 'blur' }
        ],
        status: [
          { required: true, message: this.$t('rolePage.validation.selectStatus'), trigger: 'change' }
        ],
        remark: [
          { required: false, message: this.$t('userPage.fields.introduction'), trigger: 'blur' },
          { min: 0, max: 100, message: this.$t('validation.lengthRange', { min: 0, max: 100 }), trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getTableData()
    this.getMenuTree()
    this.getApiTree()
  },
  methods: {
    // 查询
    search() {
      this.params.pageNum = 1
      this.getTableData()
    },

    // 获取表格数据
    async getTableData() {
      this.loading = true
      try {
        const { data } = await getRoles(this.params)
        this.tableData = data.roles
        this.total = data.total
      } finally {
        this.loading = false
      }
    },

    // 新增
    create() {
      this.dialogFormTitle = this.$t('rolePage.dialog.createTitle')
      this.dialogType = 'create'
      this.dialogFormVisible = true
    },

    // 修改
    update(row) {
      this.dialogFormData.ID = row.ID
      this.dialogFormData.name = row.name
      this.dialogFormData.keyword = row.keyword
      this.dialogFormData.sort = row.sort
      this.dialogFormData.status = row.status
      this.dialogFormData.remark = row.remark

      this.dialogFormTitle = this.$t('rolePage.dialog.updateTitle')
      this.dialogType = 'update'
      this.dialogFormVisible = true
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
      this.$refs['dialogForm'].validate(async valid => {
        if (valid) {
          this.submitLoading = true
          try {
            if (this.dialogType === 'create') {
              await createRole(this.dialogFormData).then(res => {
                this.judgeResult(res)
              })
            } else {
              await updateRoleById(this.dialogFormData).then(res => {
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

    // 取消表单提交
    cancelForm() {
      this.resetForm()
    },

    // 重置表单
    resetForm() {
      this.dialogFormVisible = false
      this.$refs['dialogForm'].resetFields()
      this.dialogFormData = {
        name: '',
        keyword: '',
        status: 1,
        sort: 999,
        remark: ''
      }
    },

    // 批量删除
    batchDelete() {
      this.$confirm(this.$t('rolePage.confirm.batchDelete'), this.$t('userPage.confirm.title'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(async res => {
        this.loading = true
        const roleIds = []
        this.multipleSelection.forEach(x => {
          roleIds.push(x.ID)
        })
        try {
          await batchDeleteRoleByIds({ roleIds: roleIds }).then(res => {
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

    // 表格多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // 单个删除
    async singleDelete(id) {
      this.loading = true
      try {
        await batchDeleteRoleByIds({ roleIds: [id] }).then(res => {
          this.judgeResult(res)
        })
      } finally {
        this.loading = false
      }
    },

    // 修改权限按钮
    async updatePermission(roleId) {
      this.roleId = roleId
      this.permsDialogVisible = true
      this.getMenuTree()
      this.getApiTree()
      this.getRoleMenusById(roleId)
      this.getRoleApisById(roleId)
    },

    // 获取菜单树
    async getMenuTree() {
      this.menuTreeLoading = true
      try {
        const { data } = await getMenuTree()
        this.menuTree = data
      } finally {
        this.menuTreeLoading = false
      }
    },

    // 获取接口树
    async getApiTree() {
      this.apiTreeLoading = true
      try {
        const { data } = await getApiTree()
        this.apiTree = data
      } finally {
        this.apiTreeLoading = false
      }
    },

    // 获取角色的权限菜单
    async getRoleMenusById(roleId) {
      this.permissionLoading = true
      let rseData = []
      const params = {}
      params.roleId = roleId
      try {
        const { data } = await getRoleMenusById(params)
        rseData = data
      } finally {
        this.permissionLoading = false
      }

      const menus = rseData
      const ids = []
      menus.forEach(x => { ids.push(x.ID) })
      this.defaultCheckedRoleMenu = ids
      this.$refs.roleMenuTree.setCheckedKeys(this.defaultCheckedRoleMenu)
    },

    // 获取角色的权限接口
    async getRoleApisById(roleId) {
      this.permissionLoading = true
      let resData = []
      const params = {}
      params.roleId = roleId
      try {
        const { data } = await getRoleApisById(params)
        resData = data
      } finally {
        this.permissionLoading = false
      }

      const apis = resData
      const ids = []
      apis.forEach(x => { ids.push(x.ID) })
      this.defaultCheckedRoleApi = ids
      this.$refs.roleApiTree.setCheckedKeys(this.defaultCheckedRoleApi)
    },

    // 修改角色菜单
    async updateRoleMenusById() {
      this.permissionLoading = true
      let ids = this.$refs.roleMenuTree.getCheckedKeys()
      const idsHalf = this.$refs.roleMenuTree.getHalfCheckedKeys()
      ids = ids.concat(idsHalf)
      ids = [...new Set(ids)]
      try {
        await updateRoleMenusById({ roleId: this.roleId, menuIds: ids }).then(res => {
          this.judgeResult(res)
        })
      } finally {
        this.permissionLoading = false
      }

      this.permsDialogVisible = false
    },

    // 修改角色接口
    async updateRoleApisById() {
      this.permissionLoading = true
      const ids = this.$refs.roleApiTree.getCheckedKeys(true)
      try {
        await updateRoleApisById({ roleId: this.roleId, apiIds: ids }).then(res => {
          this.judgeResult(res)
        })
      } finally {
        this.permissionLoading = false
      }
      this.permsDialogVisible = false
    },

    // 确定修改角色权限
    submitPermissionForm() {
      this.updateRoleMenusById()
      this.updateRoleApisById()
    },

    // 取消修改角色权限
    cancelPermissionForm() {
      this.permsDialogVisible = false
    },

    // 分页
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.params.pageNum = val
      this.getTableData()
    }
  }
}
</script>

<style scoped >
  .container-card{
    margin: 10px;
    margin-bottom: 100px;
  }

  .role-menu{
    font-size: 15px;
  }
</style>

<style lang="scss">
  .perms-dialog > .el-dialog__body{
    padding-top: 0;
    padding-bottom: 15px;
  }
</style>
