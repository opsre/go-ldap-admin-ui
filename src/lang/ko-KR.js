export default {
  common: {
    search: '검색',
    fullscreen: '전체 화면',
    layoutSize: '레이아웃 크기',
    docs: '공식 문서',
    github: 'GitHub',
    profile: '프로필',
    logout: '로그아웃',
    confirm: '확인',
    cancel: '취소',
    stay: '현재 페이지 유지',
    relogin: '다시 로그인',
    operationSuccess: '작업이 완료되었습니다',
    formInvalid: '폼 검증에 실패했습니다',
    unknownError: '알 수 없는 오류',
    yes: '예',
    no: '아니요'
  },
  route: {
    dashboard: '홈',
    profile: '프로필',
    changePass: '비밀번호 찾기',
    userList: '그룹 멤버',
    UserManage: '인원 관리',
    User: '사용자 관리',
    Group: '그룹 관리',
    FieldRelation: '필드 관계 관리',
    System: '시스템 관리',
    Role: '역할 관리',
    Menu: '메뉴 관리',
    Api: 'API 관리',
    Log: '로그 관리',
    OperationLog: '작업 로그'
  },
  tagsView: {
    refresh: '새로고침',
    close: '현재 닫기',
    closeOthers: '다른 항목 닫기',
    closeAll: '모두 닫기'
  },
  date: {
    justNow: '방금',
    minutesAgo: '{count}분 전',
    hoursAgo: '{count}시간 전',
    oneDayAgo: '1일 전',
    month: '월',
    day: '일',
    hour: '시',
    minute: '분',
    weekday: {
      sun: '일',
      mon: '월',
      tue: '화',
      wed: '수',
      thu: '목',
      fri: '금',
      sat: '토'
    }
  },
  login: {
    username: '사용자 이름',
    password: '비밀번호',
    submit: '로그인',
    forgotPassword: '비밀번호 찾기',
    capsLock: 'Caps Lock이 켜져 있습니다',
    invalid: '로그인에 실패했습니다. 사용자 이름 또는 비밀번호가 올바르지 않습니다. 다시 로그인하거나 현재 페이지에 머무르시겠습니까?',
    expired: '로그인 세션이 만료되었습니다'
  },
  changePassword: {
    email: '이메일',
    emailPlaceholder: '개인 이메일을 입력하세요',
    code: '인증 코드',
    codePlaceholder: '인증 코드를 입력하세요',
    sendCode: '인증 코드 전송',
    reset: '비밀번호 재설정'
  },
  account: {
    title: '계정 비밀번호 변경',
    oldPassword: '기존 비밀번호',
    newPassword: '새 비밀번호',
    confirmPassword: '비밀번호 확인',
    oldPasswordPlaceholder: '기존 비밀번호를 입력하세요',
    newPasswordPlaceholder: '새 비밀번호를 입력하세요',
    confirmPasswordPlaceholder: '새 비밀번호를 확인하세요',
    passwordMismatch: '두 비밀번호가 일치하지 않습니다',
    confirmPasswordRequired: '새 비밀번호를 다시 입력하세요',
    changeSuccess: '비밀번호가 변경되었습니다. 다시 로그인하세요'
  },
  userPage: {
    fields: {
      username: '사용자 이름',
      nickname: '표시 이름',
      givenName: '별칭',
      status: '상태',
      syncState: '동기화 상태',
      mail: '이메일',
      mobile: '휴대폰',
      jobNumber: '사번',
      departments: '부서',
      departmentId: '소속 부서',
      position: '직위',
      creator: '생성자',
      introduction: '설명',
      createdAt: '생성 시간',
      updatedAt: '업데이트 시간',
      actions: '작업',
      roles: '역할',
      postalAddress: '주소'
    },
    status: {
      active: '정상',
      disabled: '비활성'
    },
    sync: {
      synced: '동기화됨',
      unsynced: '미동기화'
    },
    actions: {
      create: '추가',
      edit: '편집',
      delete: '삭제',
      sync: '동기화',
      batchDelete: '일괄 삭제',
      batchSync: '일괄 동기화',
      syncOpenLdap: '기존 LDAP 사용자 동기화',
      syncDingTalk: 'DingTalk 사용자 동기화',
      syncFeiShu: 'Feishu 사용자 동기화',
      syncWeCom: 'WeCom 사용자 동기화',
      resetPassword: '비밀번호 재설정',
      copy: '복사'
    },
    placeholders: {
      username: '사용자 이름(병음)',
      roles: '역할 선택',
      status: '상태 선택',
      department: '부서 선택',
      departmentInfo: '부서 정보 선택'
    },
    empty: {
      noMoreOptions: '더 이상 옵션이 없습니다',
      noMatchedOptions: '일치하는 옵션이 없습니다'
    },
    dialog: {
      createTitle: '사용자 추가',
      updateTitle: '사용자 수정'
    },
    confirm: {
      title: '확인',
      resetPassword: '이 사용자의 비밀번호를 재설정하시겠습니까?',
      deleteOne: '삭제하시겠습니까?',
      syncOne: '동기화하시겠습니까?',
      batchDelete: '선택한 사용자를 영구 삭제합니다. 계속하시겠습니까?',
      batchSync: '데이터베이스 사용자를 LDAP에 일괄 동기화합니다. 계속하시겠습니까?'
    },
    validation: {
      mobileRequired: '휴대폰 번호는 필수입니다',
      mobileInvalid: '올바른 휴대폰 번호를 입력하세요',
      selectStatus: '상태를 선택하세요',
      selectDepartment: '부서를 선택하세요',
      validDepartment: '유효한 부서를 선택하세요',
      selectRoles: '역할 목록을 선택하세요'
    },
    messages: {
      deleteCanceled: '삭제가 취소되었습니다',
      syncCanceled: '동기화가 취소되었습니다',
      statusUpdateSuccess: '사용자 상태가 업데이트되었습니다',
      statusUpdateFailed: '사용자 상태 업데이트 실패',
      passwordResetSuccess: '비밀번호가 재설정되었습니다',
      passwordResetFailed: '비밀번호 재설정 실패',
      copySuccess: '비밀번호가 클립보드에 복사되었습니다',
      copyFailed: '복사 실패, 수동으로 복사하세요'
    },
    resetPassword: {
      title: '비밀번호가 재설정되었습니다',
      savePassword: '새 비밀번호를 저장하세요',
      user: '사용자: ',
      newPassword: '새 비밀번호:',
      saveNow: '지금 비밀번호를 저장하세요. 대화상자를 닫으면 다시 볼 수 없습니다.',
      saved: '저장했습니다'
    }
  },
  groupPage: {
    fields: {
      name: '이름',
      type: '유형',
      remark: '설명',
      parent: '상위 그룹'
    },
    actions: {
      create: '추가',
      addUser: '추가',
      syncOpenLdap: '기존 LDAP 부서 동기화',
      syncDingTalk: 'DingTalk 부서 동기화',
      syncFeiShu: 'Feishu 부서 동기화',
      syncWeCom: 'WeCom 부서 동기화'
    },
    type: {
      cn: 'cn [그룹]',
      ou: 'ou [조직]'
    },
    placeholders: {
      name: '이름(병음)',
      type: '가능하면 첫 번째 레벨에만 ou를 사용하고, 확실하지 않으면 cn을 사용하세요',
      parent: '상위 그룹 선택',
      root: '최상위'
    },
    dialog: {
      createTitle: '그룹 추가',
      updateTitle: '그룹 수정'
    },
    confirm: {
      batchDelete: '선택한 그룹을 영구 삭제합니다. 계속하시겠습니까?',
      batchSync: '데이터를 LDAP에 일괄 동기화합니다. 계속하시겠습니까?'
    },
    validation: {
      typeRange: 'ou, cn 또는 기타 유형',
      selectParent: '상위 그룹을 선택하세요',
      validParent: '유효한 부서를 선택하세요'
    }
  },
  apiPage: {
    fields: {
      path: '접근 경로',
      category: '카테고리',
      method: '요청 방식'
    },
    methods: {
      get: 'GET [리소스 조회]',
      post: 'POST [리소스 추가]',
      put: 'PUT [전체 업데이트]',
      patch: 'PATCH [부분 업데이트]',
      delete: 'DELETE [리소스 삭제]'
    },
    actions: {
      create: '추가'
    },
    placeholders: {
      method: '요청 방식을 선택하세요'
    },
    dialog: {
      createTitle: 'API 추가',
      updateTitle: 'API 수정'
    },
    confirm: {
      batchDelete: '선택한 API를 영구 삭제합니다. 계속하시겠습니까?'
    },
    validation: {
      selectMethod: '요청 방식을 선택하세요'
    }
  },
  menuPage: {
    fields: {
      title: '메뉴 제목',
      name: '이름',
      icon: '아이콘',
      path: '라우트 주소',
      component: '컴포넌트 경로',
      redirect: '리다이렉트',
      sort: '정렬',
      disabled: '비활성',
      hidden: '숨김',
      cache: '캐시',
      parent: '상위 디렉터리'
    },
    actions: {
      create: '추가'
    },
    placeholders: {
      title: '메뉴 제목',
      name: '이름',
      icon: '클릭하여 아이콘 선택',
      path: '라우트 주소',
      component: '컴포넌트 경로',
      redirect: '리다이렉트'
    },
    dialog: {
      createTitle: '메뉴 추가',
      updateTitle: '메뉴 수정'
    },
    confirm: {
      batchDelete: '선택한 메뉴를 영구 삭제합니다. 계속하시겠습니까?'
    },
    validation: {
      selectParent: '상위 디렉터리를 선택하세요'
    },
    messages: {
      parentCannotBeSelf: '자기 자신을 상위 디렉터리로 선택할 수 없습니다'
    }
  },
  rolePage: {
    fields: {
      name: '역할 이름',
      keyword: '키워드',
      status: '역할 상태',
      sort: '레벨',
      sortWithHint: '레벨(1 최고)',
      permission: '권한'
    },
    dialog: {
      createTitle: '역할 추가',
      updateTitle: '역할 수정',
      permissionTitle: '권한 수정'
    },
    tabs: {
      menu: '역할 메뉴',
      api: '역할 API'
    },
    confirm: {
      batchDelete: '선택한 역할을 영구 삭제합니다. 계속하시겠습니까?'
    },
    validation: {
      selectStatus: '역할 상태를 선택하세요'
    }
  },
  operationLogPage: {
    fields: {
      username: '요청자',
      ip: 'IP 주소',
      path: '요청 경로',
      method: '요청 방식',
      status: '요청 상태',
      startTime: '시작 시간',
      timeCost: '요청 소요 시간(ms)'
    },
    actions: {
      clean: '로그 비우기'
    },
    confirm: {
      clean: '모든 로그를 영구 삭제합니다. 계속하시겠습니까?',
      batchDelete: '선택한 로그를 영구 삭제합니다. 계속하시겠습니까?'
    }
  },
  groupUserPage: {
    tabs: {
      inGroup: '그룹 내 멤버',
      outGroup: '그룹 외 멤버'
    },
    groupName: '그룹명: ',
    groupRemark: '그룹 설명: ',
    actions: {
      remove: '제거'
    }
  },
  dashboard: {
    radar: {
      indicators: {
        sales: '매출',
        administration: '관리',
        informationTechnology: '정보 기술',
        customerSupport: '고객 지원',
        development: '개발',
        marketing: '마케팅'
      },
      legend: {
        allocatedBudget: '배정 예산',
        expectedSpending: '예상 지출',
        actualSpending: '실제 지출'
      }
    },
    pie: {
      seriesName: '주간 글',
      categories: {
        industries: '산업',
        technology: '기술',
        forex: '외환',
        gold: '금',
        forecasts: '예측'
      }
    }
  },
  fieldRelationPage: {
    fields: {
      id: '번호',
      flag: '필드 식별자',
      attributes: '필드 속성',
      type: '유형',
      typeFlag: '유형 식별자',
      avatar: '아바타',
      sourceUserId: '원본 사용자 ID',
      sourceUnionId: '원본 사용자 고유 ID',
      sourceDeptParentId: '상위 부서 ID',
      sourceDeptId: '부서 ID'
    },
    types: {
      user: '사용자 필드 동적 관계',
      group: '그룹 필드 동적 관계'
    },
    providers: {
      feishu: 'Feishu',
      dingtalk: 'DingTalk',
      wecom: 'WeCom'
    },
    placeholders: {
      select: '선택하세요'
    },
    docs: {
      prefix: '동적 관계 관리 문서:',
      link: '동적 필드 관계 관리'
    },
    dialog: {
      createTitle: '추가',
      updateTitle: '수정'
    },
    confirm: {
      batchDelete: '선택한 필드 관계를 영구 삭제합니다. 계속하시겠습니까?'
    },
    validation: {
      selectTypeFlag: '유형 식별자를 선택하세요'
    },
    messages: {
      deleteSuccess: '삭제되었습니다'
    }
  },
  profile: {
    aboutMe: '내 소개'
  },
  components: {
    iconSelect: {
      placeholder: '아이콘 이름을 입력하세요'
    },
    upload: {
      drag: '드래그하거나 ',
      dragHere: '파일을 여기로 드래그하거나 ',
      click: '클릭하여 업로드'
    }
  },
  validation: {
    required: '{field}을(를) 입력하세요',
    lengthRange: '길이는 {min}자에서 {max}자 사이여야 합니다'
  },
  errorPage: {
    back: '뒤로',
    backHome: '홈으로',
    noPermission: '이 페이지에 접근할 권한이 없습니다',
    contactLeader: '접근 권한이 필요하면 관리자에게 문의하세요',
    orGo: '또는 다음으로 이동:',
    lookAround: '둘러보기',
    showImage: '이미지 보기',
    dialogTitle: '미리보기',
    notFound: '페이지를 찾을 수 없습니다'
  },
  locale: {
    label: '언어',
    zhCN: '简体中文',
    enUS: 'English',
    jaJP: '日本語',
    esES: 'Español',
    koKR: '한국어'
  }
}
