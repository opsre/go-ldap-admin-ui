export default {
  common: {
    search: '搜索',
    fullscreen: '全屏',
    layoutSize: '布局大小',
    docs: '官方文档',
    github: 'GitHub地址',
    profile: '个人中心',
    logout: '退出登录',
    confirm: '确定',
    cancel: '取消',
    stay: '继续停留',
    relogin: '重新登录',
    operationSuccess: '操作成功',
    formInvalid: '表单校验失败',
    unknownError: '未知错误',
    yes: '是',
    no: '否'
  },
  route: {
    dashboard: '首页',
    profile: '个人中心',
    changePass: '忘记密码',
    userList: '分组成员',
    UserManage: '人员管理',
    User: '用户管理',
    Group: '分组管理',
    FieldRelation: '字段关系管理',
    System: '系统管理',
    Role: '角色管理',
    Menu: '菜单管理',
    Api: '接口管理',
    Log: '日志管理',
    OperationLog: '操作日志'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭当前',
    closeOthers: '关闭其他',
    closeAll: '关闭所有'
  },
  date: {
    justNow: '刚刚',
    minutesAgo: '{count}分钟前',
    hoursAgo: '{count}小时前',
    oneDayAgo: '1天前',
    month: '月',
    day: '日',
    hour: '时',
    minute: '分',
    weekday: {
      sun: '日',
      mon: '一',
      tue: '二',
      wed: '三',
      thu: '四',
      fri: '五',
      sat: '六'
    }
  },
  login: {
    username: '用户名',
    password: '密码',
    submit: '登录',
    forgotPassword: '忘记密码',
    capsLock: '大写锁定已开启',
    invalid: '登录失败,用户名或密码错误,重新登录或继续停留在当前页？',
    expired: '登录状态已失效'
  },
  changePassword: {
    email: '邮箱',
    emailPlaceholder: '请输入个人邮箱',
    code: '验证码',
    codePlaceholder: '请输入验证码',
    sendCode: '发送验证码',
    reset: '重置密码'
  },
  account: {
    title: '修改账户密码',
    oldPassword: '原密码',
    newPassword: '新密码',
    confirmPassword: '确认密码',
    oldPasswordPlaceholder: '请输入原密码',
    newPasswordPlaceholder: '请输入新密码',
    confirmPasswordPlaceholder: '请确认新密码',
    passwordMismatch: '两次输入的密码不一致',
    confirmPasswordRequired: '请再次输入新密码',
    changeSuccess: '密码修改成功，请重新登录'
  },
  userPage: {
    fields: {
      username: '用户名',
      nickname: '昵称',
      givenName: '花名',
      status: '状态',
      syncState: '同步状态',
      mail: '邮箱',
      mobile: '手机号',
      jobNumber: '工号',
      departments: '部门',
      departmentId: '所属部门',
      position: '职位',
      creator: '创建人',
      introduction: '说明',
      createdAt: '创建时间',
      updatedAt: '更新时间',
      actions: '操作',
      roles: '角色',
      postalAddress: '地址'
    },
    status: {
      active: '正常',
      disabled: '禁用'
    },
    sync: {
      synced: '已同步',
      unsynced: '未同步'
    },
    actions: {
      create: '新增',
      edit: '编辑',
      delete: '删除',
      sync: '同步',
      batchDelete: '批量删除',
      batchSync: '批量同步',
      syncOpenLdap: '同步原ldap用户信息',
      syncDingTalk: '同步钉钉用户信息',
      syncFeiShu: '同步飞书用户信息',
      syncWeCom: '同步企业微信用户信息',
      resetPassword: '重置密码',
      copy: '复制'
    },
    placeholders: {
      username: '用户名（拼音）',
      roles: '请选择角色',
      status: '请选择状态',
      department: '请选择部门',
      departmentInfo: '请选择部门信息'
    },
    empty: {
      noMoreOptions: '没有更多选项',
      noMatchedOptions: '没有匹配的选项'
    },
    dialog: {
      createTitle: '新增用户',
      updateTitle: '修改用户'
    },
    confirm: {
      title: '提示',
      resetPassword: '确定重置该用户密码吗？',
      deleteOne: '确定删除吗？',
      syncOne: '确定同步吗？',
      batchDelete: '此操作将永久删除, 是否继续?',
      batchSync: '此操作批量将数据库的用户同步到Ldap, 是否继续?'
    },
    validation: {
      mobileRequired: '手机号不能为空',
      mobileInvalid: '请输入正确的手机号',
      selectStatus: '请选择状态',
      selectDepartment: '请选择部门',
      validDepartment: '请选择有效的部门',
      selectRoles: '请选择角色列表'
    },
    messages: {
      deleteCanceled: '已取消删除',
      syncCanceled: '已取消同步',
      statusUpdateSuccess: '更新用户状态成功',
      statusUpdateFailed: '更新用户状态失败',
      passwordResetSuccess: '密码重置成功',
      passwordResetFailed: '密码重置失败',
      copySuccess: '密码已复制到剪贴板',
      copyFailed: '复制失败，请手动复制'
    },
    resetPassword: {
      title: '密码重置成功',
      savePassword: '请保存新密码',
      user: '用户：',
      newPassword: '新密码：',
      saveNow: '请立即保存密码，关闭对话框后将无法再次查看',
      saved: '我已保存'
    }
  },
  groupPage: {
    fields: {
      name: '名称',
      type: '类型',
      remark: '描述',
      parent: '上级分组'
    },
    actions: {
      create: '新增',
      addUser: '添加',
      syncOpenLdap: '同步原ldap部门',
      syncDingTalk: '同步钉钉部门',
      syncFeiShu: '同步飞书部门',
      syncWeCom: '同步企业微信部门'
    },
    type: {
      cn: 'cn[分组]',
      ou: 'ou[组织]'
    },
    placeholders: {
      name: '名称(拼音)',
      type: '建议仅第一层为ou，如果不确定，就用cn',
      parent: '请选择上级分组',
      root: '顶级类目'
    },
    dialog: {
      createTitle: '新增分组',
      updateTitle: '修改分组'
    },
    confirm: {
      batchDelete: '此操作将永久删除, 是否继续?',
      batchSync: '此操作批量同步数据到Ldap, 是否继续?'
    },
    validation: {
      typeRange: 'ou、cn或者其他',
      selectParent: '请选择父级',
      validParent: '请选择有效的部门'
    }
  },
  apiPage: {
    fields: {
      path: '访问路径',
      category: '所属类别',
      method: '请求方式'
    },
    methods: {
      get: 'GET[获取资源]',
      post: 'POST[新增资源]',
      put: 'PUT[全部更新]',
      patch: 'PATCH[增量更新]',
      delete: 'DELETE[删除资源]'
    },
    actions: {
      create: '新增'
    },
    placeholders: {
      method: '请选择请求方式'
    },
    dialog: {
      createTitle: '新增接口',
      updateTitle: '修改接口'
    },
    confirm: {
      batchDelete: '此操作将永久删除, 是否继续?'
    },
    validation: {
      selectMethod: '请选择请求方式'
    }
  },
  menuPage: {
    fields: {
      title: '菜单标题',
      name: '名称',
      icon: '图标',
      path: '路由地址',
      component: '组件路径',
      redirect: '重定向',
      sort: '排序',
      disabled: '禁用',
      hidden: '隐藏',
      cache: '缓存',
      parent: '上级目录'
    },
    actions: {
      create: '新增'
    },
    placeholders: {
      title: '菜单标题(title)',
      name: '名称(name)',
      icon: '点击选择图标',
      path: '路由地址(path)',
      component: '组件路径(component)',
      redirect: '重定向(redirect)'
    },
    dialog: {
      createTitle: '新增菜单',
      updateTitle: '修改菜单'
    },
    confirm: {
      batchDelete: '此操作将永久删除, 是否继续?'
    },
    validation: {
      selectParent: '请选择上级目录'
    },
    messages: {
      parentCannotBeSelf: '不能选择自身作为自己的上级目录'
    }
  },
  rolePage: {
    fields: {
      name: '角色名称',
      keyword: '关键字',
      status: '角色状态',
      sort: '等级',
      sortWithHint: '等级(1最高)',
      permission: '权限'
    },
    dialog: {
      createTitle: '新增角色',
      updateTitle: '修改角色',
      permissionTitle: '修改权限'
    },
    tabs: {
      menu: '角色菜单',
      api: '角色接口'
    },
    confirm: {
      batchDelete: '此操作将永久删除, 是否继续?'
    },
    validation: {
      selectStatus: '请选择角色状态'
    }
  },
  operationLogPage: {
    fields: {
      username: '请求人',
      ip: 'IP地址',
      path: '请求路径',
      method: '请求方式',
      status: '请求状态',
      startTime: '发起时间',
      timeCost: '请求耗时(ms)'
    },
    actions: {
      clean: '清空日志'
    },
    confirm: {
      clean: '此操作将永久清空日志, 是否继续?',
      batchDelete: '此操作将永久删除, 是否继续?'
    }
  },
  groupUserPage: {
    tabs: {
      inGroup: '分组内成员',
      outGroup: '分组外成员'
    },
    groupName: '分组名：',
    groupRemark: '分组描述：',
    actions: {
      remove: '移除'
    }
  },
  dashboard: {
    radar: {
      indicators: {
        sales: '销售',
        administration: '管理',
        informationTechnology: '信息技术',
        customerSupport: '客户支持',
        development: '研发',
        marketing: '市场'
      },
      legend: {
        allocatedBudget: '已分配预算',
        expectedSpending: '预期支出',
        actualSpending: '实际支出'
      }
    },
    pie: {
      seriesName: '每周文章',
      categories: {
        industries: '行业',
        technology: '技术',
        forex: '外汇',
        gold: '黄金',
        forecasts: '预测'
      }
    }
  },
  fieldRelationPage: {
    fields: {
      id: '序号',
      flag: '字段标识',
      attributes: '字段属性',
      type: '类型',
      typeFlag: '类型标志',
      avatar: '头像',
      sourceUserId: '源用户ID',
      sourceUnionId: '源用户唯一ID',
      sourceDeptParentId: '父部门ID',
      sourceDeptId: '部门ID'
    },
    types: {
      user: '用户字段动态关联',
      group: '分组字段动态关联'
    },
    providers: {
      feishu: '飞书',
      dingtalk: '钉钉',
      wecom: '企业微信'
    },
    placeholders: {
      select: '请选择'
    },
    docs: {
      prefix: '动态关系管理说明文档参考：',
      link: '动态字段关系管理'
    },
    dialog: {
      createTitle: '新增',
      updateTitle: '修改'
    },
    confirm: {
      batchDelete: '此操作将永久删除, 是否继续?'
    },
    validation: {
      selectTypeFlag: '请选择类型标志'
    },
    messages: {
      deleteSuccess: '删除成功'
    }
  },
  profile: {
    aboutMe: '关于我'
  },
  components: {
    iconSelect: {
      placeholder: '请输入图标名称'
    },
    upload: {
      drag: '拖拽或',
      dragHere: '将文件拖到此处，或',
      click: '点击上传'
    }
  },
  validation: {
    required: '请输入{field}',
    lengthRange: '长度在 {min} 到 {max} 个字符'
  },
  errorPage: {
    back: '返回',
    backHome: '回首页',
    noPermission: '你没有权限去该页面',
    contactLeader: '如需访问请联系管理员',
    orGo: '或者你可以去:',
    lookAround: '随便看看',
    showImage: '点我看图',
    dialogTitle: '随便看',
    notFound: '页面不存在'
  },
  locale: {
    label: '语言',
    zhCN: '简体中文',
    enUS: 'English',
    jaJP: '日本語',
    esES: 'Español',
    koKR: '한국어'
  }
}
