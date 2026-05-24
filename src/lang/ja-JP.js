export default {
  common: {
    search: '検索',
    fullscreen: '全画面',
    layoutSize: 'レイアウトサイズ',
    docs: '公式ドキュメント',
    github: 'GitHub',
    profile: 'プロフィール',
    logout: 'ログアウト',
    confirm: '確認',
    cancel: 'キャンセル',
    stay: 'このページに残る',
    relogin: '再ログイン',
    operationSuccess: '操作が完了しました',
    formInvalid: 'フォームの検証に失敗しました',
    unknownError: '不明なエラー',
    yes: 'はい',
    no: 'いいえ'
  },
  route: {
    dashboard: 'ホーム',
    profile: 'プロフィール',
    changePass: 'パスワードを忘れた場合',
    userList: 'グループメンバー',
    UserManage: '人員管理',
    User: 'ユーザー管理',
    Group: 'グループ管理',
    FieldRelation: 'フィールド関連管理',
    System: 'システム管理',
    Role: 'ロール管理',
    Menu: 'メニュー管理',
    Api: 'API管理',
    Log: 'ログ管理',
    OperationLog: '操作ログ'
  },
  tagsView: {
    refresh: '更新',
    close: '現在を閉じる',
    closeOthers: '他を閉じる',
    closeAll: 'すべて閉じる'
  },
  date: {
    justNow: 'たった今',
    minutesAgo: '{count}分前',
    hoursAgo: '{count}時間前',
    oneDayAgo: '1日前',
    month: '月',
    day: '日',
    hour: '時',
    minute: '分',
    weekday: {
      sun: '日',
      mon: '月',
      tue: '火',
      wed: '水',
      thu: '木',
      fri: '金',
      sat: '土'
    }
  },
  login: {
    username: 'ユーザー名',
    password: 'パスワード',
    submit: 'ログイン',
    forgotPassword: 'パスワードを忘れた場合',
    capsLock: 'Caps Lock がオンです',
    invalid: 'ログインに失敗しました。ユーザー名またはパスワードが正しくありません。再ログインしますか、それとも現在のページに残りますか？',
    expired: 'ログインセッションの有効期限が切れました'
  },
  changePassword: {
    email: 'メール',
    emailPlaceholder: '個人メールを入力してください',
    code: '確認コード',
    codePlaceholder: '確認コードを入力してください',
    sendCode: '確認コードを送信',
    reset: 'パスワードをリセット'
  },
  account: {
    title: 'アカウントパスワード変更',
    oldPassword: '現在のパスワード',
    newPassword: '新しいパスワード',
    confirmPassword: 'パスワード確認',
    oldPasswordPlaceholder: '現在のパスワードを入力してください',
    newPasswordPlaceholder: '新しいパスワードを入力してください',
    confirmPasswordPlaceholder: '新しいパスワードを確認してください',
    passwordMismatch: '2回入力したパスワードが一致しません',
    confirmPasswordRequired: '新しいパスワードをもう一度入力してください',
    changeSuccess: 'パスワードを変更しました。再ログインしてください'
  },
  userPage: {
    fields: {
      username: 'ユーザー名',
      nickname: '表示名',
      givenName: '別名',
      status: '状態',
      syncState: '同期状態',
      mail: 'メール',
      mobile: '携帯番号',
      jobNumber: '社員番号',
      departments: '部署',
      departmentId: '所属部署',
      position: '役職',
      creator: '作成者',
      introduction: '説明',
      createdAt: '作成日時',
      updatedAt: '更新日時',
      actions: '操作',
      roles: 'ロール',
      postalAddress: '住所'
    },
    status: {
      active: '有効',
      disabled: '無効'
    },
    sync: {
      synced: '同期済み',
      unsynced: '未同期'
    },
    actions: {
      create: '新規',
      edit: '編集',
      delete: '削除',
      sync: '同期',
      batchDelete: '一括削除',
      batchSync: '一括同期',
      syncOpenLdap: '旧LDAPユーザーを同期',
      syncDingTalk: 'DingTalkユーザーを同期',
      syncFeiShu: 'Feishuユーザーを同期',
      syncWeCom: 'WeComユーザーを同期',
      resetPassword: 'パスワードリセット',
      copy: 'コピー'
    },
    placeholders: {
      username: 'ユーザー名（ピンイン）',
      roles: 'ロールを選択',
      status: '状態を選択',
      department: '部署を選択',
      departmentInfo: '部署情報を選択'
    },
    empty: {
      noMoreOptions: 'これ以上の選択肢はありません',
      noMatchedOptions: '一致する選択肢はありません'
    },
    dialog: {
      createTitle: 'ユーザー追加',
      updateTitle: 'ユーザー編集'
    },
    confirm: {
      title: '確認',
      resetPassword: 'このユーザーのパスワードをリセットしますか？',
      deleteOne: '削除しますか？',
      syncOne: '同期しますか？',
      batchDelete: '選択したユーザーを完全に削除します。続行しますか？',
      batchSync: 'データベースのユーザーをLDAPへ一括同期します。続行しますか？'
    },
    validation: {
      mobileRequired: '携帯番号は必須です',
      mobileInvalid: '正しい携帯番号を入力してください',
      selectStatus: '状態を選択してください',
      selectDepartment: '部署を選択してください',
      validDepartment: '有効な部署を選択してください',
      selectRoles: 'ロール一覧を選択してください'
    },
    messages: {
      deleteCanceled: '削除をキャンセルしました',
      syncCanceled: '同期をキャンセルしました',
      statusUpdateSuccess: 'ユーザー状態を更新しました',
      statusUpdateFailed: 'ユーザー状態の更新に失敗しました',
      passwordResetSuccess: 'パスワードをリセットしました',
      passwordResetFailed: 'パスワードのリセットに失敗しました',
      copySuccess: 'パスワードをクリップボードにコピーしました',
      copyFailed: 'コピーに失敗しました。手動でコピーしてください'
    },
    resetPassword: {
      title: 'パスワードをリセットしました',
      savePassword: '新しいパスワードを保存してください',
      user: 'ユーザー：',
      newPassword: '新しいパスワード：',
      saveNow: '今すぐパスワードを保存してください。閉じると再表示できません。',
      saved: '保存しました'
    }
  },
  groupPage: {
    fields: {
      name: '名称',
      type: 'タイプ',
      remark: '説明',
      parent: '親グループ'
    },
    actions: {
      create: '新規',
      addUser: '追加',
      syncOpenLdap: '旧LDAP部署を同期',
      syncDingTalk: 'DingTalk部署を同期',
      syncFeiShu: 'Feishu部署を同期',
      syncWeCom: 'WeCom部署を同期'
    },
    type: {
      cn: 'cn［グループ］',
      ou: 'ou［組織］'
    },
    placeholders: {
      name: '名称（ピンイン）',
      type: '不明な場合はcnを使用してください。ouは第1階層のみ推奨です',
      parent: '親グループを選択',
      root: 'トップレベル'
    },
    dialog: {
      createTitle: 'グループ追加',
      updateTitle: 'グループ編集'
    },
    confirm: {
      batchDelete: '選択したグループを完全に削除します。続行しますか？',
      batchSync: 'データをLDAPへ一括同期します。続行しますか？'
    },
    validation: {
      typeRange: 'ou、cn、またはその他',
      selectParent: '親グループを選択してください',
      validParent: '有効な部署を選択してください'
    }
  },
  apiPage: {
    fields: {
      path: 'アクセスパス',
      category: 'カテゴリ',
      method: 'リクエスト方式'
    },
    methods: {
      get: 'GET［リソース取得］',
      post: 'POST［リソース追加］',
      put: 'PUT［全体更新］',
      patch: 'PATCH［部分更新］',
      delete: 'DELETE［リソース削除］'
    },
    actions: {
      create: '新規'
    },
    placeholders: {
      method: 'リクエスト方式を選択'
    },
    dialog: {
      createTitle: 'API追加',
      updateTitle: 'API編集'
    },
    confirm: {
      batchDelete: '選択したAPIを完全に削除します。続行しますか？'
    },
    validation: {
      selectMethod: 'リクエスト方式を選択してください'
    }
  },
  menuPage: {
    fields: {
      title: 'メニュータイトル',
      name: '名称',
      icon: 'アイコン',
      path: 'ルートパス',
      component: 'コンポーネントパス',
      redirect: 'リダイレクト',
      sort: '並び順',
      disabled: '無効',
      hidden: '非表示',
      cache: 'キャッシュ',
      parent: '親ディレクトリ'
    },
    actions: {
      create: '新規'
    },
    placeholders: {
      title: 'メニュータイトル',
      name: '名称',
      icon: 'クリックしてアイコンを選択',
      path: 'ルートパス',
      component: 'コンポーネントパス',
      redirect: 'リダイレクト'
    },
    dialog: {
      createTitle: 'メニュー追加',
      updateTitle: 'メニュー編集'
    },
    confirm: {
      batchDelete: '選択したメニューを完全に削除します。続行しますか？'
    },
    validation: {
      selectParent: '親ディレクトリを選択してください'
    },
    messages: {
      parentCannotBeSelf: '自分自身を親ディレクトリとして選択できません'
    }
  },
  rolePage: {
    fields: {
      name: 'ロール名',
      keyword: 'キーワード',
      status: 'ロール状態',
      sort: 'レベル',
      sortWithHint: 'レベル（1が最高）',
      permission: '権限'
    },
    dialog: {
      createTitle: 'ロール追加',
      updateTitle: 'ロール編集',
      permissionTitle: '権限編集'
    },
    tabs: {
      menu: 'ロールメニュー',
      api: 'ロールAPI'
    },
    confirm: {
      batchDelete: '選択したロールを完全に削除します。続行しますか？'
    },
    validation: {
      selectStatus: 'ロール状態を選択してください'
    }
  },
  operationLogPage: {
    fields: {
      username: 'リクエストユーザー',
      ip: 'IPアドレス',
      path: 'リクエストパス',
      method: 'リクエスト方式',
      status: 'リクエスト状態',
      startTime: '開始時間',
      timeCost: '所要時間（ms）'
    },
    actions: {
      clean: 'ログをクリア'
    },
    confirm: {
      clean: 'すべてのログを完全にクリアします。続行しますか？',
      batchDelete: '選択したログを完全に削除します。続行しますか？'
    }
  },
  groupUserPage: {
    tabs: {
      inGroup: 'グループ内メンバー',
      outGroup: 'グループ外メンバー'
    },
    groupName: 'グループ名：',
    groupRemark: 'グループ説明：',
    actions: {
      remove: '削除'
    }
  },
  dashboard: {
    radar: {
      indicators: {
        sales: '売上',
        administration: '管理',
        informationTechnology: '情報技術',
        customerSupport: 'カスタマーサポート',
        development: '開発',
        marketing: 'マーケティング'
      },
      legend: {
        allocatedBudget: '割当予算',
        expectedSpending: '予想支出',
        actualSpending: '実支出'
      }
    },
    pie: {
      seriesName: '週間記事',
      categories: {
        industries: '産業',
        technology: 'テクノロジー',
        forex: '為替',
        gold: '金',
        forecasts: '予測'
      }
    }
  },
  fieldRelationPage: {
    fields: {
      id: '番号',
      flag: 'フィールド識別子',
      attributes: 'フィールド属性',
      type: 'タイプ',
      typeFlag: 'タイプ識別子',
      avatar: 'アバター',
      sourceUserId: '元ユーザーID',
      sourceUnionId: '元ユーザー一意ID',
      sourceDeptParentId: '親部署ID',
      sourceDeptId: '部署ID'
    },
    types: {
      user: 'ユーザーフィールド動的関連',
      group: 'グループフィールド動的関連'
    },
    providers: {
      feishu: 'Feishu',
      dingtalk: 'DingTalk',
      wecom: 'WeCom'
    },
    placeholders: {
      select: '選択してください'
    },
    docs: {
      prefix: '動的関連管理ドキュメント:',
      link: '動的フィールド関連管理'
    },
    dialog: {
      createTitle: '新規',
      updateTitle: '編集'
    },
    confirm: {
      batchDelete: '選択したフィールド関連を完全に削除します。続行しますか？'
    },
    validation: {
      selectTypeFlag: 'タイプ識別子を選択してください'
    },
    messages: {
      deleteSuccess: '削除しました'
    }
  },
  profile: {
    aboutMe: '自己紹介'
  },
  components: {
    iconSelect: {
      placeholder: 'アイコン名を入力してください'
    },
    upload: {
      drag: 'ドラッグまたは',
      dragHere: 'ここにファイルをドラッグ、または',
      click: 'クリックしてアップロード'
    }
  },
  validation: {
    required: '{field}を入力してください',
    lengthRange: '長さは {min} から {max} 文字の間で入力してください'
  },
  errorPage: {
    back: '戻る',
    backHome: 'ホームへ戻る',
    noPermission: 'このページにアクセスする権限がありません',
    contactLeader: 'アクセスが必要な場合は管理者に連絡してください',
    orGo: 'またはこちらへ:',
    lookAround: '別のページを見る',
    showImage: '画像を見る',
    dialogTitle: 'プレビュー',
    notFound: 'ページが見つかりません'
  },
  locale: {
    label: '言語',
    zhCN: '简体中文',
    enUS: 'English',
    jaJP: '日本語',
    esES: 'Español',
    koKR: '한국어'
  }
}
