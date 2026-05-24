export default {
  common: {
    search: 'Search',
    fullscreen: 'Fullscreen',
    layoutSize: 'Layout size',
    docs: 'Documentation',
    github: 'GitHub',
    profile: 'Profile',
    logout: 'Log out',
    confirm: 'Confirm',
    cancel: 'Cancel',
    stay: 'Stay',
    relogin: 'Log in again',
    operationSuccess: 'Operation successful',
    formInvalid: 'Form validation failed',
    unknownError: 'Unknown error',
    yes: 'Yes',
    no: 'No'
  },
  route: {
    dashboard: 'Dashboard',
    profile: 'Profile',
    changePass: 'Forgot password',
    userList: 'Group members',
    UserManage: 'Personnel',
    User: 'Users',
    Group: 'Groups',
    FieldRelation: 'Field Relations',
    System: 'System',
    Role: 'Roles',
    Menu: 'Menus',
    Api: 'APIs',
    Log: 'Logs',
    OperationLog: 'Operation Logs'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close current',
    closeOthers: 'Close others',
    closeAll: 'Close all'
  },
  date: {
    justNow: 'just now',
    minutesAgo: '{count} minutes ago',
    hoursAgo: '{count} hours ago',
    oneDayAgo: '1 day ago',
    month: '/',
    day: ' ',
    hour: ':',
    minute: '',
    weekday: {
      sun: 'Sun',
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat'
    }
  },
  login: {
    username: 'Username',
    password: 'Password',
    submit: 'Log in',
    forgotPassword: 'Forgot password',
    capsLock: 'Caps lock is on',
    invalid: 'Login failed. The username or password is incorrect. Log in again or stay on this page?',
    expired: 'Login session has expired'
  },
  changePassword: {
    email: 'Email',
    emailPlaceholder: 'Enter your email',
    code: 'Verification code',
    codePlaceholder: 'Enter verification code',
    sendCode: 'Send code',
    reset: 'Reset password'
  },
  account: {
    title: 'Change account password',
    oldPassword: 'Old password',
    newPassword: 'New password',
    confirmPassword: 'Confirm password',
    oldPasswordPlaceholder: 'Enter old password',
    newPasswordPlaceholder: 'Enter new password',
    confirmPasswordPlaceholder: 'Confirm new password',
    passwordMismatch: 'The two passwords do not match',
    confirmPasswordRequired: 'Please enter the new password again',
    changeSuccess: 'Password changed successfully. Please log in again'
  },
  userPage: {
    fields: {
      username: 'Username',
      nickname: 'Display name',
      givenName: 'Alias',
      status: 'Status',
      syncState: 'Sync status',
      mail: 'Email',
      mobile: 'Mobile',
      jobNumber: 'Job number',
      departments: 'Departments',
      departmentId: 'Department',
      position: 'Position',
      creator: 'Creator',
      introduction: 'Description',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
      actions: 'Actions',
      roles: 'Roles',
      postalAddress: 'Address'
    },
    status: {
      active: 'Active',
      disabled: 'Disabled'
    },
    sync: {
      synced: 'Synced',
      unsynced: 'Unsynced'
    },
    actions: {
      create: 'Create',
      edit: 'Edit',
      delete: 'Delete',
      sync: 'Sync',
      batchDelete: 'Batch delete',
      batchSync: 'Batch sync',
      syncOpenLdap: 'Sync legacy LDAP users',
      syncDingTalk: 'Sync DingTalk users',
      syncFeiShu: 'Sync Feishu users',
      syncWeCom: 'Sync WeCom users',
      resetPassword: 'Reset password',
      copy: 'Copy'
    },
    placeholders: {
      username: 'Username (pinyin)',
      roles: 'Select roles',
      status: 'Select status',
      department: 'Select department',
      departmentInfo: 'Select department information'
    },
    empty: {
      noMoreOptions: 'No more options',
      noMatchedOptions: 'No matching options'
    },
    dialog: {
      createTitle: 'Create user',
      updateTitle: 'Edit user'
    },
    confirm: {
      title: 'Confirm',
      resetPassword: 'Reset this user password?',
      deleteOne: 'Delete this record?',
      syncOne: 'Sync this user?',
      batchDelete: 'This operation will permanently delete selected users. Continue?',
      batchSync: 'This operation will batch sync database users to LDAP. Continue?'
    },
    validation: {
      mobileRequired: 'Mobile number is required',
      mobileInvalid: 'Enter a valid mobile number',
      selectStatus: 'Select status',
      selectDepartment: 'Select department',
      validDepartment: 'Select a valid department',
      selectRoles: 'Select role list'
    },
    messages: {
      deleteCanceled: 'Delete canceled',
      syncCanceled: 'Sync canceled',
      statusUpdateSuccess: 'User status updated',
      statusUpdateFailed: 'Failed to update user status',
      passwordResetSuccess: 'Password reset successfully',
      passwordResetFailed: 'Failed to reset password',
      copySuccess: 'Password copied to clipboard',
      copyFailed: 'Copy failed, copy it manually'
    },
    resetPassword: {
      title: 'Password reset successfully',
      savePassword: 'Save the new password',
      user: 'User: ',
      newPassword: 'New password:',
      saveNow: 'Save the password now. It cannot be viewed again after closing this dialog.',
      saved: 'Saved'
    }
  },
  groupPage: {
    fields: {
      name: 'Name',
      type: 'Type',
      remark: 'Description',
      parent: 'Parent group'
    },
    actions: {
      create: 'Create',
      addUser: 'Add',
      syncOpenLdap: 'Sync legacy LDAP departments',
      syncDingTalk: 'Sync DingTalk departments',
      syncFeiShu: 'Sync Feishu departments',
      syncWeCom: 'Sync WeCom departments'
    },
    type: {
      cn: 'cn [group]',
      ou: 'ou [organization]'
    },
    placeholders: {
      name: 'Name (pinyin)',
      type: 'Use ou only for the first level if possible; use cn when unsure',
      parent: 'Select parent group',
      root: 'Top level'
    },
    dialog: {
      createTitle: 'Create group',
      updateTitle: 'Edit group'
    },
    confirm: {
      batchDelete: 'This operation will permanently delete selected groups. Continue?',
      batchSync: 'This operation will batch sync data to LDAP. Continue?'
    },
    validation: {
      typeRange: 'ou, cn, or another type',
      selectParent: 'Select parent group',
      validParent: 'Select a valid department'
    }
  },
  apiPage: {
    fields: {
      path: 'Path',
      category: 'Category',
      method: 'Method'
    },
    methods: {
      get: 'GET [fetch resource]',
      post: 'POST [create resource]',
      put: 'PUT [full update]',
      patch: 'PATCH [partial update]',
      delete: 'DELETE [delete resource]'
    },
    actions: {
      create: 'Create'
    },
    placeholders: {
      method: 'Select request method'
    },
    dialog: {
      createTitle: 'Create API',
      updateTitle: 'Edit API'
    },
    confirm: {
      batchDelete: 'This operation will permanently delete selected APIs. Continue?'
    },
    validation: {
      selectMethod: 'Select request method'
    }
  },
  menuPage: {
    fields: {
      title: 'Menu title',
      name: 'Name',
      icon: 'Icon',
      path: 'Route path',
      component: 'Component path',
      redirect: 'Redirect',
      sort: 'Sort',
      disabled: 'Disabled',
      hidden: 'Hidden',
      cache: 'Cache',
      parent: 'Parent directory'
    },
    actions: {
      create: 'Create'
    },
    placeholders: {
      title: 'Menu title',
      name: 'Name',
      icon: 'Click to select icon',
      path: 'Route path',
      component: 'Component path',
      redirect: 'Redirect'
    },
    dialog: {
      createTitle: 'Create menu',
      updateTitle: 'Edit menu'
    },
    confirm: {
      batchDelete: 'This operation will permanently delete selected menus. Continue?'
    },
    validation: {
      selectParent: 'Select parent directory'
    },
    messages: {
      parentCannotBeSelf: 'Cannot select itself as its parent directory'
    }
  },
  rolePage: {
    fields: {
      name: 'Role name',
      keyword: 'Keyword',
      status: 'Role status',
      sort: 'Level',
      sortWithHint: 'Level (1 highest)',
      permission: 'Permissions'
    },
    dialog: {
      createTitle: 'Create role',
      updateTitle: 'Edit role',
      permissionTitle: 'Edit permissions'
    },
    tabs: {
      menu: 'Role menus',
      api: 'Role APIs'
    },
    confirm: {
      batchDelete: 'This operation will permanently delete selected roles. Continue?'
    },
    validation: {
      selectStatus: 'Select role status'
    }
  },
  operationLogPage: {
    fields: {
      username: 'Requester',
      ip: 'IP address',
      path: 'Request path',
      method: 'Request method',
      status: 'Request status',
      startTime: 'Start time',
      timeCost: 'Time cost (ms)'
    },
    actions: {
      clean: 'Clear logs'
    },
    confirm: {
      clean: 'This operation will permanently clear all logs. Continue?',
      batchDelete: 'This operation will permanently delete selected logs. Continue?'
    }
  },
  groupUserPage: {
    tabs: {
      inGroup: 'Members in group',
      outGroup: 'Members outside group'
    },
    groupName: 'Group name: ',
    groupRemark: 'Group description: ',
    actions: {
      remove: 'Remove'
    }
  },
  fieldRelationPage: {
    fields: {
      id: 'ID',
      flag: 'Field flag',
      attributes: 'Field attributes',
      type: 'Type',
      typeFlag: 'Type flag',
      avatar: 'Avatar',
      sourceUserId: 'Source user ID',
      sourceUnionId: 'Source union ID',
      sourceDeptParentId: 'Parent department ID',
      sourceDeptId: 'Department ID'
    },
    types: {
      user: 'User field relation',
      group: 'Group field relation'
    },
    providers: {
      feishu: 'Feishu',
      dingtalk: 'DingTalk',
      wecom: 'WeCom'
    },
    placeholders: {
      select: 'Select'
    },
    docs: {
      prefix: 'Dynamic relation management documentation:',
      link: 'Dynamic field relations'
    },
    dialog: {
      createTitle: 'Create',
      updateTitle: 'Edit'
    },
    confirm: {
      batchDelete: 'This operation will permanently delete selected field relations. Continue?'
    },
    validation: {
      selectTypeFlag: 'Select type flag'
    },
    messages: {
      deleteSuccess: 'Deleted successfully'
    }
  },
  profile: {
    aboutMe: 'About me'
  },
  components: {
    iconSelect: {
      placeholder: 'Enter icon name'
    },
    upload: {
      drag: 'Drag or ',
      dragHere: 'Drag file here, or ',
      click: 'click to upload'
    }
  },
  validation: {
    required: 'Please enter {field}',
    lengthRange: 'Length must be between {min} and {max} characters'
  },
  errorPage: {
    back: 'Back',
    backHome: 'Back home',
    noPermission: 'You do not have permission to access this page',
    contactLeader: 'Please contact your administrator if you need access',
    orGo: 'Or you can go to:',
    lookAround: 'Look around',
    showImage: 'View image',
    dialogTitle: 'Preview',
    notFound: 'Page not found'
  },
  locale: {
    label: 'Language',
    zhCN: '简体中文',
    enUS: 'English',
    jaJP: '日本語',
    esES: 'Español',
    koKR: '한국어'
  }
}
