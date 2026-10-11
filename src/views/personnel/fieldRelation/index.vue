<template>
  <div>
    <el-card class="container-card" shadow="always">
      <el-form
        size="mini"
        :inline="true"
        :model="params"
        class="demo-form-inline"
      >
        <el-form-item :label="$t('fieldRelationPage.fields.flag')">
          <el-input
            v-model.trim="params.flag"
            clearable
            :placeholder="$t('fieldRelationPage.fields.flag')"
            @keyup.enter.native="search"
            @clear="search"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            icon="el-icon-search"
            type="primary"
            @click="search"
          >{{ $t('common.search') }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            icon="el-icon-plus"
            type="warning"
            @click="create"
          >{{ $t('userPage.actions.create') }}</el-button>
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
        <br>
      </el-form>

      <el-table
        v-loading="loading"
        :default-expand-all="true"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        row-key="ID"
        :data="infoTableData"
        border
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          show-overflow-tooltip
          width="52"
          sortable
          prop="ID"
          :label="$t('fieldRelationPage.fields.id')"
        />
        <el-table-column
          show-overflow-tooltip
          sortable
          prop="CreatedAt"
          :label="$t('userPage.fields.createdAt')"
        />
        <el-table-column
          show-overflow-tooltip
          sortable
          prop="Flag"
          :label="$t('fieldRelationPage.fields.flag')"
        />
        <el-table-column show-overflow-tooltip sortable :label="$t('fieldRelationPage.fields.attributes')">
          <template slot-scope="props">
            <el-form>
              <el-form-item>
                <span>{{ props.row.Attributes }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('userPage.fields.actions')" align="center" width="120">
          <template #default="scope">
            <el-tooltip :content="$t('userPage.actions.edit')" effect="dark" placement="top">
              <el-button
                size="mini"
                icon="el-icon-edit"
                circle
                type="primary"
                @click="update(scope.row)"
              />
            </el-tooltip>
            <el-tooltip
              class="delete-popover"
              :content="$t('userPage.actions.delete')"
              effect="dark"
              placement="top"
            >
              <el-popconfirm
                :title="$t('userPage.confirm.deleteOne')"
                @onConfirm="singleDelete(scope.row.ID)"
              >
                <el-button
                  slot="reference"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                  type="danger"
                />
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="dialogFormTitle" :visible.sync="updateLoading">
        <div class="components-container">
          <aside>{{ $t('fieldRelationPage.docs.prefix') }} <a href="http://ldapdoc.eryajf.net/pages/84953d/" target="_blank">{{ $t('fieldRelationPage.docs.link') }}</a></aside>
        </div>
        <el-form
          ref="dialogForm"
          size="small"
          :model="dialogFormData"
          :rules="dialogFormRules"
          label-width="120px"
        >
          <el-form-item :label="$t('fieldRelationPage.fields.type')">
            <el-checkbox-group v-model="checked">
              <el-checkbox-button
                v-for="type in relationTypes"
                :key="type.value"
                :label="type.value"
                @change="checkbox(type.value)"
              >
                {{ type.label }}
              </el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>

          <template v-if="checked[0] === 'user'">
            <el-form-item :label="$t('fieldRelationPage.fields.typeFlag')">
              <el-select
                v-model="userVal"
                :placeholder="$t('fieldRelationPage.placeholders.select')"
                @change="changeUser(userVal)"
              >
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.username')" prop="username">
              <el-input
                v-model.trim="dialogFormData.username"
                :placeholder="$t('userPage.placeholders.username')"
              />
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.nickname')" prop="nickname">
              <el-input
                v-model.trim="dialogFormData.nickname"
                :placeholder="$t('userPage.fields.nickname')"
              />
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.givenName')" prop="givenName">
              <el-input
                v-model.trim="dialogFormData.givenName"
                :placeholder="$t('userPage.fields.givenName')"
              />
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.mail')" prop="mail">
              <el-input v-model.trim="dialogFormData.mail" :placeholder="$t('userPage.fields.mail')" />
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.jobNumber')" prop="jobNumber">
              <el-input
                v-model.trim="dialogFormData.jobNumber"
                :placeholder="$t('userPage.fields.jobNumber')"
              />
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.mobile')" prop="mobile">
              <el-input
                v-model.trim="dialogFormData.mobile"
                :placeholder="$t('userPage.fields.mobile')"
              />
            </el-form-item>
            <el-form-item :label="$t('fieldRelationPage.fields.avatar')" prop="avatar">
              <el-input
                v-model.trim="dialogFormData.avatar"
                :placeholder="$t('fieldRelationPage.fields.avatar')"
              />
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.postalAddress')" prop="postalAddress">
              <el-input
                v-model.trim="dialogFormData.postalAddress"
                :placeholder="$t('userPage.fields.postalAddress')"
              />
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.position')" prop="position">
              <el-input
                v-model.trim="dialogFormData.position"
                :placeholder="$t('userPage.fields.position')"
              />
            </el-form-item>
            <el-form-item :label="$t('fieldRelationPage.fields.sourceUserId')" prop="sourceUserId">
              <el-input
                v-model.trim="dialogFormData.sourceUserId"
                :placeholder="$t('fieldRelationPage.fields.sourceUserId')"
              />
            </el-form-item>
            <el-form-item :label="$t('fieldRelationPage.fields.sourceUnionId')" prop="sourceUnionId">
              <el-input
                v-model.trim="dialogFormData.sourceUnionId"
                :placeholder="$t('fieldRelationPage.fields.sourceUnionId')"
              />
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.introduction')" prop="introduction">
              <el-input
                v-model.trim="dialogFormData.introduction"
                :placeholder="$t('userPage.fields.introduction')"
              />
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item :label="$t('fieldRelationPage.fields.typeFlag')">
              <el-select
                v-model="groupVal"
                :placeholder="$t('fieldRelationPage.placeholders.select')"
                @change="changeGroup(groupVal)"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('groupPage.fields.name')" prop="groupName">
              <el-input
                v-model.trim="dialogFormData.groupName"
                :placeholder="$t('groupPage.fields.name')"
              />
            </el-form-item>
            <el-form-item :label="$t('fieldRelationPage.fields.sourceDeptParentId')" prop="sourceDeptParentId">
              <el-input
                v-model.trim="dialogFormData.sourceDeptParentId"
                :placeholder="$t('fieldRelationPage.fields.sourceDeptParentId')"
              />
            </el-form-item>
            <el-form-item :label="$t('fieldRelationPage.fields.sourceDeptId')" prop="sourceDeptId">
              <el-input
                v-model.trim="dialogFormData.sourceDeptId"
                :placeholder="$t('fieldRelationPage.fields.sourceDeptId')"
              />
            </el-form-item>
            <el-form-item :label="$t('groupPage.fields.remark')" prop="remark">
              <el-input
                v-model.trim="dialogFormData.remark"
                :placeholder="$t('groupPage.fields.remark')"
              />
            </el-form-item>
          </template>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="cancelForm()">{{ $t('common.cancel') }}</el-button>
          <el-button
            size="mini"
            :loading="submitLoading"
            type="primary"
            @click="submitForm('A')"
          >{{ $t('common.confirm') }}</el-button>
        </div>
      </el-dialog>

      <el-dialog :title="dialogFormTitle" :visible.sync="dialogFormVisible">
        <div class="components-container">
          <aside>{{ $t('fieldRelationPage.docs.prefix') }} <a href="http://ldapdoc.eryajf.net/pages/84953d/" target="_blank">{{ $t('fieldRelationPage.docs.link') }}</a></aside>
        </div>
        <el-form
          ref="dialogForm"
          size="small"
          :model="dialogFormData"
          :rules="dialogFormRules"
          label-width="120px"
        >
          <template v-if="checked[0] === 'user'">
            <el-form-item :label="$t('fieldRelationPage.fields.type')">
              <el-button type="primary">{{ $t('fieldRelationPage.types.user') }}</el-button>
            </el-form-item>

            <el-form-item :label="$t('fieldRelationPage.fields.typeFlag')">
              <el-select
                v-model="userVal"
                :placeholder="$t('fieldRelationPage.placeholders.select')"
                @change="changeUser(userVal)"
              >
                <el-option
                  v-for="item in userOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.username')" prop="username">
              <el-input
                v-model.trim="dialogFormData.username"
                :placeholder="$t('userPage.fields.username')"
              />
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.nickname')" prop="nickname">
              <el-input
                v-model.trim="dialogFormData.nickname"
                :placeholder="$t('userPage.fields.nickname')"
              />
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.givenName')" prop="givenName">
              <el-input
                v-model.trim="dialogFormData.givenName"
                :placeholder="$t('userPage.fields.givenName')"
              />
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.mail')" prop="mail">
              <el-input v-model.trim="dialogFormData.mail" :placeholder="$t('userPage.fields.mail')" />
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.jobNumber')" prop="jobNumber">
              <el-input
                v-model.trim="dialogFormData.jobNumber"
                :placeholder="$t('userPage.fields.jobNumber')"
              />
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.mobile')" prop="mobile">
              <el-input
                v-model.trim="dialogFormData.mobile"
                :placeholder="$t('userPage.fields.mobile')"
              />
            </el-form-item>
            <el-form-item :label="$t('fieldRelationPage.fields.avatar')" prop="avatar">
              <el-input
                v-model.trim="dialogFormData.avatar"
                :placeholder="$t('fieldRelationPage.fields.avatar')"
              />
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.postalAddress')" prop="postalAddress">
              <el-input
                v-model.trim="dialogFormData.postalAddress"
                :placeholder="$t('userPage.fields.postalAddress')"
              />
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.position')" prop="position">
              <el-input
                v-model.trim="dialogFormData.position"
                :placeholder="$t('userPage.fields.position')"
              />
            </el-form-item>
            <el-form-item :label="$t('fieldRelationPage.fields.sourceUserId')" prop="sourceUserId">
              <el-input
                v-model.trim="dialogFormData.sourceUserId"
                :placeholder="$t('fieldRelationPage.fields.sourceUserId')"
              />
            </el-form-item>
            <el-form-item :label="$t('fieldRelationPage.fields.sourceUnionId')" prop="sourceUnionId">
              <el-input
                v-model.trim="dialogFormData.sourceUnionId"
                :placeholder="$t('fieldRelationPage.fields.sourceUnionId')"
              />
            </el-form-item>
            <el-form-item :label="$t('userPage.fields.introduction')" prop="introduction">
              <el-input
                v-model.trim="dialogFormData.introduction"
                :placeholder="$t('userPage.fields.introduction')"
              />
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item :label="$t('fieldRelationPage.fields.type')">
              <el-button type="primary">{{ $t('fieldRelationPage.types.group') }}</el-button>
            </el-form-item>
            <el-form-item :label="$t('fieldRelationPage.fields.typeFlag')">
              <el-select
                v-model="groupVal"
                :placeholder="$t('fieldRelationPage.placeholders.select')"
                @change="changeGroup(groupVal)"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('groupPage.fields.name')" prop="groupName">
              <el-input
                v-model.trim="dialogFormData.groupName"
                :placeholder="$t('groupPage.fields.name')"
              />
            </el-form-item>
            <el-form-item :label="$t('fieldRelationPage.fields.sourceDeptParentId')" prop="sourceDeptParentId">
              <el-input
                v-model.trim="dialogFormData.sourceDeptParentId"
                :placeholder="$t('fieldRelationPage.fields.sourceDeptParentId')"
              />
            </el-form-item>
            <el-form-item :label="$t('fieldRelationPage.fields.sourceDeptId')" prop="sourceDeptId">
              <el-input
                v-model.trim="dialogFormData.sourceDeptId"
                :placeholder="$t('fieldRelationPage.fields.sourceDeptId')"
              />
            </el-form-item>
            <el-form-item :label="$t('groupPage.fields.remark')" prop="remark">
              <el-input
                v-model.trim="dialogFormData.remark"
                :placeholder="$t('groupPage.fields.remark')"
              />
            </el-form-item>
          </template>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="cancelForm()">{{ $t('common.cancel') }}</el-button>
          <el-button
            size="mini"
            :loading="submitLoading"
            type="primary"
            @click="submitForm('B')"
          >{{ $t('common.confirm') }}</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// import Treeselect from '@riophae/vue-treeselect'
// import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {
  relationList,
  relationAdd,
  relationUp,
  relationDel
} from '@/api/personnel/fieldRelation'
import { Message } from 'element-ui'

export default {
  name: 'FieldRelation',
  components: {
    // Treeselect
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
      userVal: '',
      groupVal: '',
      updateId: '',
      checked: ['user'], // Select new data by default
      // Query parameters
      params: {
        flag: '',
        pageNum: 1,
        pageSize: 1000 // Most users should not have this many records; the backend limits each request to 1000 records.
      },
      // Table data
      tableData: [],
      infoTableData: [],
      total: 0,
      loading: false,
      // Parent directory data
      // treeselectData: [],
      // treeselectValue: 0,
      updateLoading: false, // Create
      // Dialog box
      submitLoading: false,
      dialogFormTitle: '',
      dialogType: '',
      dialogFormVisible: false,
      dialogFormData: {
        username: '', // Username (usually the pinyin of the username), name_pinyin
        nickname: '', // Chinese name, name
        givenName: '', // Display name, name
        mail: '', // Email, email
        jobNumber: '', // Employee number, job_number
        mobile: '', // Mobile number, mobile
        avatar: '', // Avatar, avatar
        postalAddress: '', // Address, work_place
        position: '', // Position, title
        introduction: '', // Description, remark
        sourceUserId: '', // Source user ID, userid
        sourceUnionId: '', // Source user unique ID, unionid
        groupName: '', // Group name (usually the pinyin of the group name)
        remark: '', // Group description
        sourceDeptId: '', // Department ID
        sourceDeptParentId: '' // Parent department ID
      },
      // Table selection
      multipleSelection: []
      // typeFlag:
    }
  },
  computed: {
    relationTypes() {
      return [
        { label: this.$t('fieldRelationPage.types.user'), value: 'user' },
        { label: this.$t('fieldRelationPage.types.group'), value: 'group' }
      ]
    },
    dialogFormRules() {
      return {
        sourceDeptParentId: this.requiredTextRules(this.$t('fieldRelationPage.fields.sourceDeptParentId'), 1, 50),
        sourceDeptId: this.requiredTextRules(this.$t('fieldRelationPage.fields.sourceDeptId'), 1, 50),
        username: this.requiredTextRules(this.$t('userPage.fields.username'), 1, 50),
        givenName: this.requiredTextRules(this.$t('userPage.fields.givenName'), 1, 50),
        avatar: this.requiredTextRules(this.$t('fieldRelationPage.fields.avatar'), 1, 50),
        postalAddress: this.requiredTextRules(this.$t('userPage.fields.postalAddress'), 1, 50),
        position: this.requiredTextRules(this.$t('userPage.fields.position'), 1, 50),
        sourceUserId: this.requiredTextRules(this.$t('fieldRelationPage.fields.sourceUserId'), 1, 50, ['blur', 'change']),
        sourceUnionId: this.requiredTextRules(this.$t('fieldRelationPage.fields.sourceUnionId'), 1, 50, ['blur', 'change']),
        groupName: this.requiredTextRules(this.$t('groupPage.fields.name'), 1, 50),
        remark: this.requiredTextRules(this.$t('groupPage.fields.remark'), 1, 50),
        mail: this.requiredTextRules(this.$t('userPage.fields.mail'), 1, 50),
        jobNumber: this.requiredTextRules(this.$t('userPage.fields.jobNumber'), 0, 20),
        nickname: this.requiredTextRules(this.$t('userPage.fields.nickname'), 2, 20),
        mobile: [{ required: true, validator: this.checkPhone, trigger: 'blur' }],
        introduction: this.requiredTextRules(this.$t('userPage.fields.introduction'), 0, 100)
      }
    },
    options() {
      return [
        { label: this.$t('fieldRelationPage.providers.feishu'), value: 'feishu_group' },
        { label: this.$t('fieldRelationPage.providers.dingtalk'), value: 'dingtalk_group' },
        { label: this.$t('fieldRelationPage.providers.wecom'), value: 'wecom_group' }
      ]
    },
    userOptions() {
      return [
        { label: this.$t('fieldRelationPage.providers.feishu'), value: 'feishu_user' },
        { label: this.$t('fieldRelationPage.providers.dingtalk'), value: 'dingtalk_user' },
        { label: this.$t('fieldRelationPage.providers.wecom'), value: 'wecom_user' }
      ]
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    checkPhone(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('userPage.validation.mobileRequired')))
      }
      const reg = /1\d{10}/
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error(this.$t('userPage.validation.mobileInvalid')))
      }
    },
    requiredTextRules(field, min, max, trigger = 'blur') {
      return [
        { required: true, message: this.$t('validation.required', { field }), trigger: 'blur' },
        { min, max, message: this.$t('validation.lengthRange', { min, max }), trigger }
      ]
    },
    checkbox(city) {
      this.checked = this.checked.includes(city) ? [city] : []
      this.value = this.city
    },
    changeUser(e) {
      this.userVal = e
    },
    changeGroup(e) {
      this.groupVal = e
    },
    // Query
    search() {
      // Initialize table data
      this.infoTableData = JSON.parse(JSON.stringify(this.tableData))
      this.infoTableData = this.deal(this.infoTableData, (node) =>
        node.Flag.includes(this.params.flag)
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
        const { data } = await relationList(this.params)
        this.tableData = data

        this.infoTableData = JSON.parse(JSON.stringify(data))
      } finally {
        this.loading = false
      }
    },

    // Create
    create() {
      this.checked = ['user']
      this.userVal = ''
      this.groupVal = ''
      this.dialogFormData = {}
      this.dialogFromGroup = {}
      this.dialogFormTitle = this.$t('fieldRelationPage.dialog.createTitle')
      this.updateLoading = true // Create loading indicator
      this.dialogType = 'create'
    },
    // Edit
    update(row) {
      const typeDialog = row.Flag.split('_')[1]

      const {
        avatar,
        givenName,
        introduction,
        jobNumber,
        mail,
        mobile,
        nickname,
        position,
        postalAddress,
        sourceUnionId,
        sourceUserId,
        username,
        groupName,
        remark,
        sourceDeptId,
        sourceDeptParentId
      } = row.Attributes

      if (typeDialog === 'user') {
        this.updateId = row.ID
        this.checked = ['user']

        this.userVal = row.Flag
        this.dialogFormData.username = username // Username (usually the pinyin of the username), name_pinyin
        this.dialogFormData.nickname = nickname // Chinese name, name
        this.dialogFormData.givenName = givenName // Display name, name
        this.dialogFormData.mail = mail // Email, email
        this.dialogFormData.jobNumber = jobNumber // Employee number, job_number
        this.dialogFormData.mobile = mobile // Mobile number, mobile
        this.dialogFormData.avatar = avatar // Avatar, avatar
        this.dialogFormData.postalAddress = postalAddress // Address, work_place
        this.dialogFormData.position = position // Position, title
        this.dialogFormData.introduction = introduction // Description, remark
        this.dialogFormData.sourceUserId = sourceUserId // Source user ID, userid
        this.dialogFormData.sourceUnionId = sourceUnionId // Source user unique ID, unionid
      } else {
        this.updateId = row.ID
        this.checked = ['group']
        this.groupVal = row.Flag
        this.dialogFormData.groupName = groupName // Group name (usually the pinyin of the group name)
        this.dialogFormData.remark = remark // Group description
        this.dialogFormData.sourceDeptId = sourceDeptId // Department ID
        this.dialogFormData.sourceDeptParentId = sourceDeptParentId // Parent department ID
      }

      this.dialogFormTitle = this.$t('fieldRelationPage.dialog.updateTitle')
      this.dialogType = 'update'
      this.dialogFormVisible = true
    },

    // Submit form
    submitForm(e) {
      let flag, attributes
      if (this.checked[0] === 'user') {
        if (this.userVal === '') {
          Message({
            message: this.$t('fieldRelationPage.validation.selectTypeFlag'),
            type: 'warning'
          })
          return false
        }
        flag = this.userVal
        attributes = this.dialogFormData
      } else {
        if (this.groupVal === '') {
          Message({
            message: this.$t('fieldRelationPage.validation.selectTypeFlag'),
            type: 'warning'
          })
          return false
        }
        flag = this.groupVal
        attributes = this.dialogFormData
      }
      this.$refs['dialogForm'].validate(async(valid) => {
        if (valid) {
          this.submitLoading = true
          try {
            if (this.dialogType === 'create') {
              await relationAdd({
                flag: flag,
                attributes: attributes
              })
            } else {
              await relationUp({
                id: this.updateId,
                flag: flag,
                attributes: attributes
              })
            }
          } finally {
            this.submitLoading = false
          }
          this.resetForm()
          this.getTableData()
          Message({
            showClose: true,
            message: this.$t('common.operationSuccess'),
            type: 'success'
          })
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
      this.$confirm(this.$t('fieldRelationPage.confirm.batchDelete'), this.$t('userPage.confirm.title'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      })
        .then(async(res) => {
          this.loading = true
          const groupIds = []
          this.multipleSelection.forEach((x) => {
            groupIds.push(x.ID)
          })
          try {
            await relationDel({ fieldRelationIds: groupIds })
          } finally {
            this.loading = false
          }
          this.getTableData()
          Message({
            showClose: true,
            message: this.$t('fieldRelationPage.messages.deleteSuccess'),
            type: 'success'
          })
        })
        .catch(() => {
          Message({
            showClose: true,
            type: 'info',
            message: this.$t('userPage.messages.deleteCanceled')
          })
        })
    },
    // Delete one item
    async singleDelete(Id) {
      this.loading = true
      try {
        await relationDel({ fieldRelationIds: [Id] })
      } finally {
        this.loading = false
      }
      this.getTableData()
    },

    // Table selection
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // Pagination
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
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
  text-align: left !important;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.link-title {
  margin-left: 30px;
  margin-bottom: 10px;
}

/* .el-form-item /deep/ label{
    label{

    }

} */
</style>
