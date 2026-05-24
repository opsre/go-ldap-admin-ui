<template>
  <div>
    <el-card class="container-card" shadow="always">
      <el-form size="mini" :inline="true" :model="params" class="demo-form-inline">
        <el-form-item :label="$t('operationLogPage.fields.username')">
          <el-input
            v-model.trim="params.username"
            clearable
            :placeholder="$t('operationLogPage.fields.username')"
            @keyup.enter.native="search"
            @clear="search"
          />
        </el-form-item>
        <el-form-item :label="$t('operationLogPage.fields.ip')">
          <el-input v-model.trim="params.ip" clearable :placeholder="$t('operationLogPage.fields.ip')" @keyup.enter.native="search" @clear="search" />
        </el-form-item>
        <el-form-item :label="$t('operationLogPage.fields.path')">
          <el-input
            v-model.trim="params.path"
            clearable
            :placeholder="$t('operationLogPage.fields.path')"
            @keyup.enter.native="search"
            @clear="search"
          />
        </el-form-item>
        <el-form-item prop="method" :label="$t('operationLogPage.fields.method')">
          <el-select v-model="params.method" :placeholder="$t('apiPage.placeholders.method')" clearable @change="search" @clear="search">
            <el-option v-for="item in RequestList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('operationLogPage.fields.status')">
          <el-input
            v-model.trim="params.status"
            clearable
            :placeholder="$t('operationLogPage.fields.status')"
            @keyup.enter.native="search"
            @clear="search"
          />
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" icon="el-icon-search" type="primary" @click="search">{{ $t('common.search') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="multipleSelection.length === 0"
            :loading="loading"
            icon="el-icon-delete"
            type="danger"
            @click="batchDelete"
          >{{ $t('userPage.actions.batchDelete') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="handleClean">{{ $t('operationLogPage.actions.clean') }}</el-button>
        </el-form-item>
      </el-form>

      <el-table
        v-loading="loading"
        :data="tableData"
        border
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column show-overflow-tooltip sortable prop="username" :label="$t('operationLogPage.fields.username')" />
        <el-table-column show-overflow-tooltip sortable prop="ip" :label="$t('operationLogPage.fields.ip')" />
        <el-table-column show-overflow-tooltip sortable prop="path" :label="$t('operationLogPage.fields.path')" />
        <el-table-column show-overflow-tooltip sortable prop="method" :label="$t('operationLogPage.fields.method')" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.method === 'GET'" type="success">GET</el-tag>
            <el-tag v-else-if="scope.row.method === 'POST'" type="warning">POST</el-tag>
            <el-tag v-else-if="scope.row.method === 'PUT'" type="primary">PUT</el-tag>
            <el-tag v-else-if="scope.row.method === 'DELETE'" type="danger">DELETE</el-tag>
            <el-tag v-else type="info">{{ scope.row.method }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable prop="status" :label="$t('operationLogPage.fields.status')" align="center">
          <template slot-scope="scope">
            <el-tag size="small" :type="scope.row.status | statusTagFilter" disable-transitions>{{ scope.row.status
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable prop="startTime" :label="$t('operationLogPage.fields.startTime')">
          <!-- <template slot-scope="scope">
            {{ parseGoTime(scope.row.startTime) }}
          </template> -->
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable prop="timeCost" :label="$t('operationLogPage.fields.timeCost')" align="center">
          <template slot-scope="scope">
            <el-tag size="small" :type="scope.row.timeCost | timeCostTagFilter" disable-transitions>{{ scope.row.timeCost
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip sortable prop="desc" :label="$t('userPage.fields.introduction')" />
        <el-table-column fixed="right" :label="$t('userPage.fields.actions')" align="center" width="80">
          <template slot-scope="scope">
            <el-tooltip :content="$t('userPage.actions.delete')" effect="dark" placement="top">
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
    </el-card>
  </div>
</template>

<script>
import { getOperationLogs, batchDeleteOperationLogByIds, CleanOperationLog } from '@/api/log/operationLog'
import { parseGoTime } from '@/utils/index'
import { Message } from 'element-ui'

export default {
  name: 'OperationLog',
  filters: {
    statusTagFilter(val) {
      if (val === 200) {
        return 'success'
      } else if (val === 400) {
        return 'warning'
      } else if (val === 401) {
        return 'danger'
      } else if (val === 403) {
        return 'danger'
      } else if (val === 500) {
        return 'danger'
      } else {
        return 'info'
      }
    },
    timeCostTagFilter(val) {
      if (val <= 200) {
        return 'success'
      } else if (val > 200 && val <= 1000) {
        return ''
      } else if (val > 1000 && val <= 2000) {
        return 'warning'
      } else {
        return 'danger'
      }
    }
  },
  data() {
    return {
      // 查询参数
      params: {
        username: '',
        ip: '',
        path: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      },
      // 表格数据
      tableData: [],
      total: 0,
      loading: false,

      // 删除按钮弹出框
      popoverVisible: false,
      // 表格多选
      multipleSelection: [],
      RequestList: [{
        value: 'GET',
        label: 'GET'
      }, {
        value: 'POST',
        label: 'POST'
      }, {
        value: 'DELETE',
        label: 'DELETE'
      }, {
        value: 'PUT',
        label: 'PUT'
      }]
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    parseGoTime,
    // 查询
    search() {
      this.params.pageNum = 1
      this.getTableData()
    },

    // 获取表格数据
    async getTableData() {
      this.loading = true
      try {
        const { data } = await getOperationLogs(this.params)
        this.tableData = data.logs
        this.total = data.total
      } finally {
        this.loading = false
      }
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
    // 清空日志
    handleClean() {
      this.$confirm(this.$t('operationLogPage.confirm.clean'), this.$t('userPage.confirm.title'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(async res => {
        this.loading = true
        try {
          await CleanOperationLog().then(res => {
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

    // 批量删除
    batchDelete() {
      this.$confirm(this.$t('operationLogPage.confirm.batchDelete'), this.$t('userPage.confirm.title'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(async res => {
        this.loading = true
        const operationLogIds = []
        this.multipleSelection.forEach(x => {
          operationLogIds.push(x.ID)
        })
        try {
          await batchDeleteOperationLogByIds({ operationLogIds: operationLogIds }).then(res => {
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
        await batchDeleteOperationLogByIds({ operationLogIds: [Id] }).then(res => {
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
.container-card {
  margin: 10px;
  margin-bottom: 100px;
}

.delete-popover {
  margin-left: 10px;
}
</style>
