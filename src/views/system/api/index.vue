<template>
  <div>
    <el-card class="container-card" shadow="always">
      <el-form size="mini" :inline="true" :model="params" class="demo-form-inline">
        <el-form-item :label="$t('apiPage.fields.path')">
          <el-input v-model.trim="params.path" clearable :placeholder="$t('apiPage.fields.path')" @keyup.enter.native="search" @clear="search" />
        </el-form-item>
        <el-form-item :label="$t('apiPage.fields.category')">
          <el-input v-model.trim="params.category" clearable :placeholder="$t('apiPage.fields.category')" @keyup.enter.native="search" @clear="search" />
        </el-form-item>
        <el-form-item :label="$t('apiPage.fields.method')">
          <el-select v-model.trim="params.method" clearable :placeholder="$t('apiPage.placeholders.method')" @change="search" @clear="search">
            <el-option :label="$t('apiPage.methods.get')" value="GET" />
            <el-option :label="$t('apiPage.methods.post')" value="POST" />
            <el-option :label="$t('apiPage.methods.put')" value="PUT" />
            <el-option :label="$t('apiPage.methods.patch')" value="PATCH" />
            <el-option :label="$t('apiPage.methods.delete')" value="DELETE" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('userPage.fields.creator')">
          <el-input v-model.trim="params.creator" clearable :placeholder="$t('userPage.fields.creator')" @keyup.enter.native="search" @clear="search" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" icon="el-icon-search" type="primary" @click="search">{{ $t('common.search') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" icon="el-icon-plus" type="warning" @click="create">{{ $t('apiPage.actions.create') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="multipleSelection.length === 0" :loading="loading" icon="el-icon-delete" type="danger" @click="batchDelete">{{ $t('userPage.actions.batchDelete') }}</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column show-overflow-tooltip sortable prop="path" :label="$t('apiPage.fields.path')" />
        <el-table-column show-overflow-tooltip sortable prop="categoryDisplay" :label="$t('apiPage.fields.category')" />
        <el-table-column show-overflow-tooltip sortable prop="method" :label="$t('apiPage.fields.method')" align="center">
          <template slot-scope="scope">
            <el-tag size="small" :type="scope.row.method | methodTagFilter" disable-transitions>{{ scope.row.method }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable prop="creatorDisplay" :label="$t('userPage.fields.creator')" />
        <el-table-column show-overflow-tooltip sortable prop="remarkDisplay" :label="$t('userPage.fields.introduction')" />
        <el-table-column fixed="right" :label="$t('userPage.fields.actions')" align="center" width="120">
          <template slot-scope="scope">
            <el-tooltip :content="$t('userPage.actions.edit')" effect="dark" placement="top">
              <el-button size="mini" icon="el-icon-edit" circle type="primary" @click="update(scope.row)" />
            </el-tooltip>
            <el-tooltip class="delete-popover" :content="$t('userPage.actions.delete')" effect="dark" placement="top">
              <el-popconfirm :title="$t('userPage.confirm.deleteOne')" @onConfirm="singleDelete(scope.row.ID)">
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

      <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
        <el-form ref="dialogForm" size="small" :model="dialogFormData" :rules="dialogFormRules" label-width="120px">
          <el-form-item :label="$t('apiPage.fields.path')" prop="path">
            <el-input v-model.trim="dialogFormData.path" :placeholder="$t('apiPage.fields.path')" />
          </el-form-item>
          <el-form-item :label="$t('apiPage.fields.category')" prop="category">
            <el-input v-model.trim="dialogFormData.category" :placeholder="$t('apiPage.fields.category')" />
          </el-form-item>
          <el-form-item :label="$t('apiPage.fields.method')" prop="method">
            <el-select v-model.trim="dialogFormData.method" :placeholder="$t('apiPage.placeholders.method')">
              <el-option :label="$t('apiPage.methods.get')" value="GET" />
              <el-option :label="$t('apiPage.methods.post')" value="POST" />
              <el-option :label="$t('apiPage.methods.put')" value="PUT" />
              <el-option :label="$t('apiPage.methods.patch')" value="PATCH" />
              <el-option :label="$t('apiPage.methods.delete')" value="DELETE" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('userPage.fields.introduction')" prop="remark">
            <el-input v-model.trim="dialogFormData.remark" type="textarea" :placeholder="$t('userPage.fields.introduction')" show-word-limit maxlength="100" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="cancelForm()">{{ $t('common.cancel') }}</el-button>
          <el-button size="mini" :loading="submitLoading" type="primary" @click="submitForm()">{{ $t('common.confirm') }}</el-button>
        </div>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import { getApis, createApi, updateApiById, batchDeleteApiByIds } from '@/api/system/api'
import { Message } from 'element-ui'

export default {
  name: 'Api',
  filters: {
    methodTagFilter(val) {
      if (val === 'GET') {
        return ''
      } else if (val === 'POST') {
        return 'success'
      } else if (val === 'PUT') {
        return 'info'
      } else if (val === 'PATCH') {
        return 'warning'
      } else if (val === 'DELETE') {
        return 'danger'
      } else {
        return 'info'
      }
    }
  },
  data() {
    return {
      // 查询参数
      params: {
        path: '',
        method: '',
        category: '',
        creator: '',
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
        path: '',
        category: '',
        method: '',
        remark: ''
      },
      // 删除按钮弹出框
      popoverVisible: false,
      // 表格多选
      multipleSelection: []
    }
  },
  computed: {
    dialogFormRules() {
      return {
        path: [
          { required: true, message: this.$t('validation.required', { field: this.$t('apiPage.fields.path') }), trigger: 'blur' },
          { min: 1, max: 100, message: this.$t('validation.lengthRange', { min: 1, max: 100 }), trigger: 'blur' }
        ],
        category: [
          { required: true, message: this.$t('validation.required', { field: this.$t('apiPage.fields.category') }), trigger: 'blur' },
          { min: 1, max: 50, message: this.$t('validation.lengthRange', { min: 1, max: 50 }), trigger: 'blur' }
        ],
        method: [
          { required: true, message: this.$t('apiPage.validation.selectMethod'), trigger: 'change' }
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
        const { data } = await getApis(this.params)
        this.tableData = data.apis
        this.total = data.total
      } finally {
        this.loading = false
      }
    },

    // 新增
    create() {
      this.dialogFormTitle = this.$t('apiPage.dialog.createTitle')
      this.dialogType = 'create'
      this.dialogFormVisible = true
    },

    // 修改
    update(row) {
      this.dialogFormData.ID = row.ID
      this.dialogFormData.path = row.path
      this.dialogFormData.category = row.category
      this.dialogFormData.method = row.method
      this.dialogFormData.remark = row.remark

      this.dialogFormTitle = this.$t('apiPage.dialog.updateTitle')
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
              await createApi(this.dialogFormData).then(res => {
                this.judgeResult(res)
              })
            } else {
              await updateApiById(this.dialogFormData).then(res => {
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
      this.dialogFormData = {
        ID: '',
        path: '',
        category: '',
        method: '',
        remark: ''
      }
    },

    // 批量删除
    batchDelete() {
      this.$confirm(this.$t('apiPage.confirm.batchDelete'), this.$t('userPage.confirm.title'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(async res => {
        this.loading = true
        const apiIds = []
        this.multipleSelection.forEach(x => {
          apiIds.push(x.ID)
        })
        try {
          await batchDeleteApiByIds({ apiIds: apiIds }).then(res => {
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
    async singleDelete(Id) {
      this.loading = true
      try {
        await batchDeleteApiByIds({ apiIds: [Id] }).then(res => {
          this.judgeResult(res)
        })
      } finally {
        this.loading = false
      }
      this.getTableData()
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

<style scoped>
  .container-card{
    margin: 10px;
    margin-bottom: 100px;
  }

  .delete-popover{
    margin-left: 10px;
  }
</style>
