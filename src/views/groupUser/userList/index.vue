<template>
  <div>
    <el-card class="container-card" shadow="always">

      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="$t('groupUserPage.tabs.inGroup')" name="first">
            <div v-if="infoRoles" class="role-header">
              <div class="header-name">
                <span class="name-des">{{ $t('groupUserPage.groupName') }}</span>
                <span>{{ infoRoles.groupName }}</span>
              </div>
              <div class="header-name">
                <span class="name-des">{{ $t('groupUserPage.groupRemark') }}</span>
                <span>{{ infoRoles.groupRemark }}</span>
              </div>
              <div class="header-name header-search">
                <el-input v-model.trim="transParams.nickname" clearable :placeholder="$t('userPage.fields.username')" @input="onInput($event)" />
                <el-button class="search-btn" :loading="loading" icon="el-icon-search" type="primary" @click="search">{{ $t('common.search') }}</el-button>
                <el-button class="search-btn" :disabled="multipleSelection.length === 0" :loading="loading" icon="el-icon-delete" type="danger" @click="batchDelete">{{ $t('groupUserPage.actions.remove') }}</el-button>
              </div>
            </div>
            <el-table v-loading="loading" :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column align="center" prop="nickName" :label="$t('userPage.fields.username')" />
              <el-table-column align="center" prop="jobNumber" :label="$t('userPage.fields.jobNumber')" />
              <el-table-column align="center" prop="mobile" :label="$t('userPage.fields.mobile')" />
              <el-table-column align="center" prop="mail" :label="$t('userPage.fields.mail')" />
              <el-table-column align="center" prop="introduction" :label="$t('userPage.fields.introduction')" />

            </el-table>
          </el-tab-pane>
          <el-tab-pane :label="$t('groupUserPage.tabs.outGroup')" name="second">
            <div v-if="infoRoles" class="role-header">
              <div class="header-name">
                <span class="name-des">{{ $t('groupUserPage.groupName') }}</span>
                <span>{{ infoRoles.groupName }}</span>
              </div>
              <div class="header-name">
                <span class="name-des">{{ $t('groupUserPage.groupRemark') }}</span>
                <span>{{ infoRoles.groupRemark }}</span>
              </div>
              <div class="header-name header-search">
                <el-input v-model.trim="transParams.nickname" clearable :placeholder="$t('userPage.fields.username')" @input="onInput($event)" />
                <el-button class="search-btn" :loading="loading" icon="el-icon-search" type="primary" @click="search">{{ $t('common.search') }}</el-button>
                <el-button class="search-btn" :disabled="multipleSelection.length === 0" :loading="loading" icon="el-icon-edit" type="primary" @click="batchAdd">{{ $t('groupPage.actions.addUser') }}</el-button>
              </div>
            </div>
            <el-table v-loading="loading" :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column align="center" prop="nickName" :label="$t('userPage.fields.username')" />
              <el-table-column align="center" prop="jobNumber" :label="$t('userPage.fields.jobNumber')" />
              <el-table-column align="center" prop="mobile" :label="$t('userPage.fields.mobile')" />
              <el-table-column align="center" prop="mail" :label="$t('userPage.fields.mail')" />
              <el-table-column align="center" prop="introduction" :label="$t('userPage.fields.introduction')" />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </template>

    </el-card>
  </div>
</template>

<script>
import { useGroupList, useGroupRole, groupInfo, delGroup } from '@/api/personnel/group'
import { Message } from 'element-ui'

export default {
  name: 'Group',
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
      size: '',
      infoRoles: null,
      activeName: 'first', // 默认展示
      tableData: [], // 表格数据
      loading: false,
      transParams: {
        groupId: '',
        nickname: ''
      }, // 获取角色的参数
      tabIndex: '',
      multipleSelection: [] // 表格多选
    }
  },

  created() {
    const route = this.$route
    const { query } = route
    this.transParams.groupId = query.ID
    this.getTableData()
  },
  methods: {
    handleClick(tab, event) {
      if (tab.index === '0') {
        this.transParams.nickname = ''
        this.tabIndex = tab.index
        this.getTableData()
      } else {
        this.transParams.nickname = ''
        this.tabIndex = tab.index
        this.getNoMenu()
      }
    },
    // 搜索框查询
    onInput(e) {
      if (this.tabIndex === '0') {
        this.transParams.nickname = e
        this.getTableData()
      } else {
        this.transParams.nickname = e
        this.getNoMenu()
      }
    },
    // 搜索框查询
    search() {
      if (this.tabIndex === '0') {
        this.getTableData()
      } else {
        this.getNoMenu()
      }
    },

    // 在分组内的用户
    async getTableData() {
      this.loading = true
      try {
        const { data } = await useGroupList(this.transParams)
        this.infoRoles = data
        this.tableData = data.userList
      } finally {
        this.loading = false
      }
    },
    // 不再分组内的用户
    async getNoMenu() {
      try {
        const { data } = await useGroupRole(this.transParams)
        this.infoRoles = data
        this.tableData = data.userList
      } finally {
        this.loading = false
      }
    },
    // 表格多选
    handleSelectionChange(val) {
      this.multipleSelection = val
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
    // 移除操作
    async batchDelete() {
      const userRoles = []
      this.multipleSelection.forEach(x => {
        userRoles.push(x.userId)
      })
      this.loading = true
      try {
        await delGroup({ groupId: Number(this.transParams.groupId), userIds: userRoles }).then(res => {
          this.judgeResult(res)
        })
      } finally {
        this.loading = false
      }
      setTimeout(function() {
        window.location.reload()
      }, 500)
    },
    // batchAdd 添加操作
    async batchAdd() {
      const userRoles = []
      this.multipleSelection.forEach(x => {
        userRoles.push(x.userId)
      })
      this.loading = true
      try {
        await groupInfo({ groupId: Number(this.transParams.groupId), userIds: userRoles }).then(res => {
          this.judgeResult(res)
        })
      } finally {
        this.loading = false
      }
      setTimeout(function() {
        window.location.reload()
      }, 500)
    }
  }
}
</script>

<style scoped>
  .role-header {
    width: 100%;
    height: 68px;
    margin-bottom:10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 16px;
    color: #909399;
    font-family: PingFangSC-Regular, PingFang SC;
    line-height: 68px;
  }
  .header-name{
    display: inline-block;

  }
  .header-search{
    display: flex;
    justify-content: center;
  }
  .search-btn{
    /* flex:50%; */
    /* margin-top:20px; */
    width: 80px;
    height: 40px;
    margin: 15px;
  }
  .name-des{
    font-size: 18px;
    color: #1E1E1E;
  }
  .header-btn{
    margin-top:15px;
    width: 98px;
    height: 45px;
    background: #3877F8;
    /* box-shadow: 0px 4px 10px 0px rgba(56, 119, 248, 0.5); */
    border-radius: 45px;
    color: #fff;
    line-height: 45px;
    text-align: center;
  }
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
