<template>
  <div>
    <el-card class="container-card" shadow="always">
      <el-form size="mini" :inline="true" :model="params" class="demo-form-inline">
        <el-form-item :label="$t('groupPage.fields.name')">
          <el-input v-model.trim="params.groupName" style="width: 100px;" clearable :placeholder="$t('groupPage.fields.name')" @keyup.enter.native="search" @clear="search" />
        </el-form-item>
        <el-form-item :label="$t('groupPage.fields.remark')">
          <el-input v-model.trim="params.remark" style="width: 100px;" clearable :placeholder="$t('groupPage.fields.remark')" @keyup.enter.native="search" @clear="search" />
        </el-form-item>
        <el-form-item :label="$t('userPage.fields.syncState')">
          <el-select v-model.trim="params.syncState" style="width: 110px;" clearable :placeholder="$t('userPage.fields.syncState')" @change="search" @clear="search">
            <el-option :label="$t('userPage.sync.synced')" value="1" />
            <el-option :label="$t('userPage.sync.unsynced')" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" icon="el-icon-search" type="primary" @click="search">{{ $t('common.search') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" icon="el-icon-plus" type="warning" @click="create">{{ $t('groupPage.actions.create') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="multipleSelection.length === 0" :loading="loading" icon="el-icon-delete" type="danger" @click="batchDelete">{{ $t('userPage.actions.batchDelete') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="multipleSelection.length === 0" :loading="loading" icon="el-icon-upload2" type="success" @click="batchSync">{{ $t('userPage.actions.batchSync') }}</el-button>
        </el-form-item>
        <br>
        <el-form-item v-if="syncConfig.ldapEnableSync">
          <el-button :loading="loading" icon="el-icon-download" type="warning" @click="syncOpenLdapDepts">{{ $t('groupPage.actions.syncOpenLdap') }}</el-button>
        </el-form-item>
        <el-form-item v-if="syncConfig.dingTalkEnableSync">
          <el-button :loading="loading" icon="el-icon-download" type="warning" @click="syncDingTalkDepts">{{ $t('groupPage.actions.syncDingTalk') }}</el-button>
        </el-form-item>
        <el-form-item v-if="syncConfig.feiShuEnableSync">
          <el-button :loading="loading" icon="el-icon-download" type="warning" @click="syncFeiShuDepts">{{ $t('groupPage.actions.syncFeiShu') }}</el-button>
        </el-form-item>
        <el-form-item v-if="syncConfig.weComEnableSync">
          <el-button :loading="loading" icon="el-icon-download" type="warning" @click="syncWeComDepts">{{ $t('groupPage.actions.syncWeCom') }}</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :default-expand-all="true" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="ID" :data="infoTableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column show-overflow-tooltip sortable prop="groupNameDisplay" :label="$t('groupPage.fields.name')" />
        <el-table-column show-overflow-tooltip sortable prop="groupType" :label="$t('groupPage.fields.type')" />
        <el-table-column show-overflow-tooltip sortable prop="groupDn" label="DN" />
        <el-table-column show-overflow-tooltip sortable prop="remarkDisplay" :label="$t('groupPage.fields.remark')" />
        <el-table-column show-overflow-tooltip sortable prop="CreatedAt" :label="$t('userPage.fields.createdAt')" />
        <el-table-column show-overflow-tooltip sortable prop="UpdatedAt" :label="$t('userPage.fields.updatedAt')" />
        <el-table-column fixed="right" :label="$t('userPage.fields.actions')" align="center" width="220">
          <template #default="scope">
            <el-tooltip v-if="scope.row.groupType != 'ou' && scope.row.groupName != 'root'" :content="$t('groupPage.actions.addUser')" effect="dark" placement="top">
              <el-button size="mini" icon="el-icon-setting" circle type="info" @click="addUp(scope.row)" />
            </el-tooltip>
            <el-tooltip :content="$t('userPage.actions.edit')" effect="dark" placement="top">
              <el-button size="mini" icon="el-icon-edit" circle type="primary" @click="update(scope.row)" />
            </el-tooltip>
            <el-tooltip class="delete-popover" :content="$t('userPage.actions.delete')" effect="dark" placement="top">
              <el-popconfirm :title="$t('userPage.confirm.deleteOne')" @onConfirm="singleDelete(scope.row.ID)">
                <el-button slot="reference" size="mini" icon="el-icon-delete" circle type="danger" />
              </el-popconfirm>
            </el-tooltip>
            <el-tooltip v-if="scope.row.syncState === 2" class="delete-popover" :content="$t('userPage.actions.sync')" effect="dark" placement="top">
              <el-popconfirm :title="$t('userPage.confirm.syncOne')" @onConfirm="singleSync(scope.row.ID)">
                <el-button slot="reference" size="mini" icon="el-icon-upload2" circle type="success" />
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- Create -->
      <el-dialog :title="dialogFormTitle" :visible.sync="updateLoading">
        <el-form ref="dialogForm" size="small" :model="dialogFormData" :rules="dialogFormRules" label-width="120px">
          <el-form-item :label="$t('groupPage.fields.name')" prop="groupName">
            <el-input v-model.trim="dialogFormData.groupName" :placeholder="$t('groupPage.placeholders.name')" />
          </el-form-item>
          <el-form-item :label="$t('groupPage.fields.type')" prop="groupType">
            <el-select v-model.trim="dialogFormData.groupType" :placeholder="$t('groupPage.placeholders.type')" style="width:100%">
              <el-option :label="$t('groupPage.type.cn')" value="cn" />
              <el-option :label="$t('groupPage.type.ou')" value="ou" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('groupPage.fields.parent')" prop="parentId">
            <treeselect
              v-model="dialogFormData.parentId"
              :options="treeselectData"
              :normalizer="normalizer"
              :placeholder="$t('groupPage.placeholders.parent')"
              @input="treeselectInput"
            />
          </el-form-item>
          <el-form-item :label="$t('groupPage.fields.remark')" prop="remark">
            <el-input v-model.trim="dialogFormData.remark" type="textarea" :placeholder="$t('groupPage.fields.remark')" :autosize="{minRows: 3, maxRows: 6}" show-word-limit maxlength="100" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="cancelForm()">{{ $t('common.cancel') }}</el-button>
          <el-button size="mini" :loading="submitLoading" type="primary" @click="submitForm()">{{ $t('common.confirm') }}</el-button>
        </div>
      </el-dialog>
      <!-- Edit -->
      <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
        <el-form ref="dialogForm" size="small" :model="dialogFormData" :rules="dialogFormRules" label-width="120px">
          <el-form-item :label="$t('groupPage.fields.name')" prop="groupName">
            <el-input v-model.trim="dialogFormData.groupName" :disabled="true" :placeholder="$t('groupPage.fields.name')" />
          </el-form-item>
          <el-form-item :label="$t('groupPage.fields.remark')" prop="remark">
            <el-input v-model.trim="dialogFormData.remark" type="textarea" :placeholder="$t('groupPage.fields.remark')" :autosize="{minRows: 3, maxRows: 6}" show-word-limit maxlength="100" />
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { getGroupTree, groupAdd, groupUpdate, groupDel, syncDingTalkDeptsApi, syncWeComDeptsApi, syncFeiShuDeptsApi, syncOpenLdapDeptsApi, syncSqlGroups } from '@/api/personnel/group'
import { getConfig } from '@/api/system/base'
import { Message } from 'element-ui'

export default {
  name: 'Group',
  components: {
    Treeselect
  },
  filters: {
    methodTagFilter(val) {
      if (val === 'GET') {
        return ''
      } else if (val === 'POST') {
        return 'success'
      } else {
        return 'info'
      }
    }
  },
  data() {
    return {
      // Query parameters
      params: {
        groupName: undefined,
        remark: undefined,
        syncState: undefined,
        pageNum: 1,
        pageSize: 1000// Most users should not have this many records; the backend limits each request to 1000 records.
      },
      // Table data
      tableData: [],
      infoTableData: [],
      total: 0,
      loading: false,
      // Parent directory data
      treeselectData: [],
      treeselectValue: 0,
      updateLoading: false, // Create
      // Dialog box
      submitLoading: false,
      dialogFormTitle: '',
      dialogType: '',
      dialogFormVisible: false,
      dialogFormData: {
        ID: '',
        groupName: '',
        parentId: 0,
        syncState: 1,
        groupType: '',
        remark: ''
      },
      // Delete button confirmation dialog
      popoverVisible: false,
      // Table selection
      multipleSelection: [],
      dialogTransfer: '', // Transfer panel header
      dialogTransferVisible: false,

      transParams: {
        groupId: '',
        nickname: ''
      },
      renderFunc(h, option) {
        return <span>{option.key} - {option.label}</span>
      },
      userArrInfo: [], // Initial user list data
      data: [], // Transformed user list data
      value3: [], // Default user list data on the right
      userId: [], // Send the selected data code array to the backend
      ui: {
        submitLoading: false
      },
      statusTrans: '',

      // Sync configuration
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
        groupName: [
          { required: true, message: this.$t('validation.required', { field: this.$t('groupPage.fields.name') }), trigger: 'blur' },
          { min: 1, max: 50, message: this.$t('validation.lengthRange', { min: 1, max: 50 }), trigger: 'blur' }
        ],
        groupType: [
          { required: true, message: this.$t('validation.required', { field: this.$t('groupPage.fields.type') }), trigger: 'blur' },
          { min: 1, max: 50, message: this.$t('groupPage.validation.typeRange'), trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: this.$t('groupPage.validation.selectParent'), trigger: 'blur' },
          { validator: (rule, value, callBack) => {
            if (value >= 0) {
              callBack()
            } else {
              callBack(this.$t('groupPage.validation.validParent'))
            }
          } }
        ],
        remark: [
          { required: false, message: this.$t('groupPage.fields.remark'), trigger: 'blur' },
          { min: 0, max: 100, message: this.$t('validation.lengthRange', { min: 0, max: 100 }), trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getTableData()
    this.getSyncConfig()
  },
  methods: {
    // Fetch sync configuration
    async getSyncConfig() {
      try {
        const { data } = await getConfig()
        this.syncConfig = data
      } catch (error) {
        console.error('failed to get sync config:', error)
      }
    },
    // // Query
    search() {
      // Initialize table data
      this.infoTableData = JSON.parse(JSON.stringify(this.tableData))
      this.infoTableData = this.deal(this.infoTableData, node =>
        (node.groupNameDisplay || node.groupName).includes(this.params.groupName) ||
        (node.remarkDisplay || node.remark).includes(this.params.remark) ||
        node.syncState.toString().includes(this.params.syncState)
      )
    },
    resetData() {
      this.infoTableData = JSON.parse(JSON.stringify(this.tableData))
    },
    // Filter page data
    deal(nodes, predicate) {
      // If there are no nodes left, stop the recursion
      if (!(nodes && nodes.length)) {
        return []
      }
      const newChildren = []
      for (const node of nodes) {
        if (predicate(node)) {
          // If the node matches, add it directly to the new node set
          newChildren.push(node)
          node.children = this.deal(node.children, predicate)
        } else {
          // If the current node does not match, recursively filter its child nodes,
          // promote matching child nodes and add them to the new node set
          newChildren.push(...this.deal(node.children, predicate))
        }
      }
      return newChildren
    },
    // Fetch table data
    async getTableData() {
      this.loading = true
      try {
        const { data } = await getGroupTree(this.params)
        this.tableData = data
        this.infoTableData = JSON.parse(JSON.stringify(data))
        this.treeselectData = [{ ID: 0, groupName: this.$t('groupPage.placeholders.root'), groupNameDisplay: this.$t('groupPage.placeholders.root'), children: data }]
      } finally {
        this.loading = false
      }
    },

    // Create
    create() {
      this.dialogFormTitle = this.$t('groupPage.dialog.createTitle')
      this.updateLoading = true // Create loading indicator
      this.dialogType = 'create'
    },
    // Edit
    update(row) {
      this.dialogFormData.ID = row.ID
      this.dialogFormData.groupName = row.groupName
      this.dialogFormData.remark = row.remark
      this.dialogFormTitle = this.$t('groupPage.dialog.updateTitle')
      this.dialogType = 'update'
      this.dialogFormVisible = true
    },
    // Transfer panel
    addUp(row) {
      this.dialogTransfer = this.$t('route.User')
      this.dialogTransferVisible = true
      this.transParams.groupId = row.ID
      this.transParams.nickname = row.remark
      this.$router.push({ path: '/userList', query: row })
    },

    // Check the result
    judgeResult(res) {
      if (res.code === 0) {
        Message({
          showClose: true,
          message: this.$t('common.operationSuccess'),
          type: 'success'
        })
      }
    },

    // Submit form
    submitForm() {
      this.$refs['dialogForm'].validate(async valid => {
        if (valid) {
          this.submitLoading = true
          try {
            if (this.dialogType === 'create') {
              await groupAdd(this.dialogFormData).then(res => {
                this.judgeResult(res)
              })
            } else {
              await groupUpdate(this.dialogFormData).then(res => {
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

    // Submit form
    cancelForm() {
      this.resetForm()
    },

    resetForm() {
      this.dialogFormVisible = false
      this.updateLoading = false
      this.$refs['dialogForm'].resetFields()
      this.dialogFormData = {

        groupName: '',
        remark: ''
      }
    },

    // Delete selected items
    batchDelete() {
      this.$confirm(this.$t('groupPage.confirm.batchDelete'), this.$t('userPage.confirm.title'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(async res => {
        this.loading = true
        const groupIds = []
        this.multipleSelection.forEach(x => {
          groupIds.push(x.ID)
        })
        try {
          await groupDel({ groupIds: groupIds }).then(res => {
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
    // Sync selected items
    batchSync() {
      this.$confirm(this.$t('groupPage.confirm.batchSync'), this.$t('userPage.confirm.title'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(async res => {
        this.loading = true
        const groupIds = []
        this.multipleSelection.forEach(x => {
          groupIds.push(x.ID)
        })
        try {
          await syncSqlGroups({ groupIds: groupIds }).then(res => {
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

    // Table selection
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // Delete one item
    async singleDelete(Id) {
      this.loading = true
      try {
        await groupDel({ groupIds: [Id] }).then(res => {
          this.judgeResult(res)
        })
      } finally {
        this.loading = false
      }
      this.getTableData()
    },
    // Sync one item
    async singleSync(Id) {
      this.loading = true
      try {
        await syncSqlGroups({ groupIds: [Id] }).then(res => {
          this.judgeResult(res)
        })
      } finally {
        this.loading = false
      }
      this.getTableData()
    },

    // Pagination
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
        label: node.groupNameDisplay || node.groupName,
        children: node.children
      }
    },
    treeselectInput(value) {
      this.treeselectValue = value
    },
    syncDingTalkDepts() {
      this.loading = true
      syncDingTalkDeptsApi().then(res => {
        this.judgeResult(res)
        this.loading = false
        this.getTableData()
      })
    },
    syncWeComDepts() {
      this.loading = true
      syncWeComDeptsApi().then(res => {
        this.judgeResult(res)
        this.loading = false
        this.getTableData()
      })
    },
    syncFeiShuDepts() {
      this.loading = true
      syncFeiShuDeptsApi().then(res => {
        this.judgeResult(res)
        this.loading = false
        this.getTableData()
      })
    },
    syncOpenLdapDepts() {
      this.loading = true
      syncOpenLdapDeptsApi().then(res => {
        this.judgeResult(res)
        this.loading = false
        this.getTableData()
      })
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
   .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>
