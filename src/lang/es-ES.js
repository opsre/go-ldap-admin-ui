export default {
  common: {
    search: 'Buscar',
    fullscreen: 'Pantalla completa',
    layoutSize: 'Tamaño de diseño',
    docs: 'Documentación',
    github: 'GitHub',
    profile: 'Perfil',
    logout: 'Cerrar sesión',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    stay: 'Permanecer',
    relogin: 'Iniciar sesión de nuevo',
    operationSuccess: 'Operación correcta',
    formInvalid: 'La validación del formulario falló',
    unknownError: 'Error desconocido',
    yes: 'Sí',
    no: 'No'
  },
  route: {
    dashboard: 'Inicio',
    profile: 'Perfil',
    changePass: 'Olvidé mi contraseña',
    userList: 'Miembros del grupo',
    UserManage: 'Personal',
    User: 'Usuarios',
    Group: 'Grupos',
    FieldRelation: 'Relaciones de campos',
    System: 'Sistema',
    Role: 'Roles',
    Menu: 'Menús',
    Api: 'APIs',
    Log: 'Registros',
    OperationLog: 'Registros de operación'
  },
  tagsView: {
    refresh: 'Actualizar',
    close: 'Cerrar actual',
    closeOthers: 'Cerrar otros',
    closeAll: 'Cerrar todo'
  },
  date: {
    justNow: 'ahora mismo',
    minutesAgo: 'hace {count} minutos',
    hoursAgo: 'hace {count} horas',
    oneDayAgo: 'hace 1 día',
    month: '/',
    day: ' ',
    hour: ':',
    minute: '',
    weekday: {
      sun: 'Dom',
      mon: 'Lun',
      tue: 'Mar',
      wed: 'Mié',
      thu: 'Jue',
      fri: 'Vie',
      sat: 'Sáb'
    }
  },
  login: {
    username: 'Usuario',
    password: 'Contraseña',
    submit: 'Iniciar sesión',
    forgotPassword: 'Olvidé mi contraseña',
    capsLock: 'Bloq Mayús está activado',
    invalid: 'Error de inicio de sesión. El usuario o la contraseña son incorrectos. ¿Iniciar sesión de nuevo o permanecer en esta página?',
    expired: 'La sesión ha caducado'
  },
  changePassword: {
    email: 'Correo',
    emailPlaceholder: 'Introduce tu correo',
    code: 'Código de verificación',
    codePlaceholder: 'Introduce el código de verificación',
    sendCode: 'Enviar código',
    reset: 'Restablecer contraseña'
  },
  account: {
    title: 'Cambiar contraseña de la cuenta',
    oldPassword: 'Contraseña actual',
    newPassword: 'Nueva contraseña',
    confirmPassword: 'Confirmar contraseña',
    oldPasswordPlaceholder: 'Introduce la contraseña actual',
    newPasswordPlaceholder: 'Introduce la nueva contraseña',
    confirmPasswordPlaceholder: 'Confirma la nueva contraseña',
    passwordMismatch: 'Las dos contraseñas no coinciden',
    confirmPasswordRequired: 'Introduce la nueva contraseña otra vez',
    changeSuccess: 'Contraseña cambiada correctamente. Inicia sesión de nuevo'
  },
  userPage: {
    fields: {
      username: 'Usuario',
      nickname: 'Nombre visible',
      givenName: 'Alias',
      status: 'Estado',
      syncState: 'Estado de sincronización',
      mail: 'Correo',
      mobile: 'Móvil',
      jobNumber: 'Número de empleado',
      departments: 'Departamentos',
      departmentId: 'Departamento',
      position: 'Puesto',
      creator: 'Creador',
      introduction: 'Descripción',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
      actions: 'Acciones',
      roles: 'Roles',
      postalAddress: 'Dirección'
    },
    status: {
      active: 'Activo',
      disabled: 'Deshabilitado'
    },
    sync: {
      synced: 'Sincronizado',
      unsynced: 'No sincronizado'
    },
    actions: {
      create: 'Crear',
      edit: 'Editar',
      delete: 'Eliminar',
      sync: 'Sincronizar',
      batchDelete: 'Eliminar en lote',
      batchSync: 'Sincronizar en lote',
      syncOpenLdap: 'Sincronizar usuarios LDAP heredados',
      syncDingTalk: 'Sincronizar usuarios DingTalk',
      syncFeiShu: 'Sincronizar usuarios Feishu',
      syncWeCom: 'Sincronizar usuarios WeCom',
      resetPassword: 'Restablecer contraseña',
      copy: 'Copiar'
    },
    placeholders: {
      username: 'Usuario (pinyin)',
      roles: 'Selecciona roles',
      status: 'Selecciona estado',
      department: 'Selecciona departamento',
      departmentInfo: 'Selecciona información de departamento'
    },
    empty: {
      noMoreOptions: 'No hay más opciones',
      noMatchedOptions: 'No hay opciones coincidentes'
    },
    dialog: {
      createTitle: 'Crear usuario',
      updateTitle: 'Editar usuario'
    },
    confirm: {
      title: 'Confirmar',
      resetPassword: '¿Restablecer la contraseña de este usuario?',
      deleteOne: '¿Eliminar este registro?',
      syncOne: '¿Sincronizar este usuario?',
      batchDelete: 'Esta operación eliminará permanentemente los usuarios seleccionados. ¿Continuar?',
      batchSync: 'Esta operación sincronizará en lote los usuarios de la base de datos a LDAP. ¿Continuar?'
    },
    validation: {
      mobileRequired: 'El móvil es obligatorio',
      mobileInvalid: 'Introduce un móvil válido',
      selectStatus: 'Selecciona estado',
      selectDepartment: 'Selecciona departamento',
      validDepartment: 'Selecciona un departamento válido',
      selectRoles: 'Selecciona la lista de roles'
    },
    messages: {
      deleteCanceled: 'Eliminación cancelada',
      syncCanceled: 'Sincronización cancelada',
      statusUpdateSuccess: 'Estado del usuario actualizado',
      statusUpdateFailed: 'No se pudo actualizar el estado del usuario',
      passwordResetSuccess: 'Contraseña restablecida correctamente',
      passwordResetFailed: 'No se pudo restablecer la contraseña',
      copySuccess: 'Contraseña copiada al portapapeles',
      copyFailed: 'No se pudo copiar, cópiala manualmente'
    },
    resetPassword: {
      title: 'Contraseña restablecida correctamente',
      savePassword: 'Guarda la nueva contraseña',
      user: 'Usuario: ',
      newPassword: 'Nueva contraseña:',
      saveNow: 'Guarda la contraseña ahora. No podrás verla de nuevo al cerrar este diálogo.',
      saved: 'Guardado'
    }
  },
  groupPage: {
    fields: {
      name: 'Nombre',
      type: 'Tipo',
      remark: 'Descripción',
      parent: 'Grupo padre'
    },
    actions: {
      create: 'Crear',
      addUser: 'Agregar',
      syncOpenLdap: 'Sincronizar departamentos LDAP heredados',
      syncDingTalk: 'Sincronizar departamentos DingTalk',
      syncFeiShu: 'Sincronizar departamentos Feishu',
      syncWeCom: 'Sincronizar departamentos WeCom'
    },
    type: {
      cn: 'cn [grupo]',
      ou: 'ou [organización]'
    },
    placeholders: {
      name: 'Nombre (pinyin)',
      type: 'Usa ou solo para el primer nivel si es posible; usa cn si no estás seguro',
      parent: 'Selecciona grupo padre',
      root: 'Nivel superior'
    },
    dialog: {
      createTitle: 'Crear grupo',
      updateTitle: 'Editar grupo'
    },
    confirm: {
      batchDelete: 'Esta operación eliminará permanentemente los grupos seleccionados. ¿Continuar?',
      batchSync: 'Esta operación sincronizará datos en lote a LDAP. ¿Continuar?'
    },
    validation: {
      typeRange: 'ou, cn u otro tipo',
      selectParent: 'Selecciona grupo padre',
      validParent: 'Selecciona un departamento válido'
    }
  },
  apiPage: {
    fields: {
      path: 'Ruta',
      category: 'Categoría',
      method: 'Método'
    },
    methods: {
      get: 'GET [obtener recurso]',
      post: 'POST [crear recurso]',
      put: 'PUT [actualización completa]',
      patch: 'PATCH [actualización parcial]',
      delete: 'DELETE [eliminar recurso]'
    },
    actions: {
      create: 'Crear'
    },
    placeholders: {
      method: 'Selecciona método de solicitud'
    },
    dialog: {
      createTitle: 'Crear API',
      updateTitle: 'Editar API'
    },
    confirm: {
      batchDelete: 'Esta operación eliminará permanentemente las APIs seleccionadas. ¿Continuar?'
    },
    validation: {
      selectMethod: 'Selecciona método de solicitud'
    }
  },
  menuPage: {
    fields: {
      title: 'Título del menú',
      name: 'Nombre',
      icon: 'Icono',
      path: 'Ruta',
      component: 'Ruta del componente',
      redirect: 'Redirección',
      sort: 'Orden',
      disabled: 'Deshabilitado',
      hidden: 'Oculto',
      cache: 'Caché',
      parent: 'Directorio padre'
    },
    actions: {
      create: 'Crear'
    },
    placeholders: {
      title: 'Título del menú',
      name: 'Nombre',
      icon: 'Haz clic para seleccionar icono',
      path: 'Ruta',
      component: 'Ruta del componente',
      redirect: 'Redirección'
    },
    dialog: {
      createTitle: 'Crear menú',
      updateTitle: 'Editar menú'
    },
    confirm: {
      batchDelete: 'Esta operación eliminará permanentemente los menús seleccionados. ¿Continuar?'
    },
    validation: {
      selectParent: 'Selecciona directorio padre'
    },
    messages: {
      parentCannotBeSelf: 'No se puede seleccionar a sí mismo como directorio padre'
    }
  },
  rolePage: {
    fields: {
      name: 'Nombre del rol',
      keyword: 'Clave',
      status: 'Estado del rol',
      sort: 'Nivel',
      sortWithHint: 'Nivel (1 más alto)',
      permission: 'Permisos'
    },
    dialog: {
      createTitle: 'Crear rol',
      updateTitle: 'Editar rol',
      permissionTitle: 'Editar permisos'
    },
    tabs: {
      menu: 'Menús del rol',
      api: 'APIs del rol'
    },
    confirm: {
      batchDelete: 'Esta operación eliminará permanentemente los roles seleccionados. ¿Continuar?'
    },
    validation: {
      selectStatus: 'Selecciona estado del rol'
    }
  },
  operationLogPage: {
    fields: {
      username: 'Solicitante',
      ip: 'Dirección IP',
      path: 'Ruta de solicitud',
      method: 'Método de solicitud',
      status: 'Estado de solicitud',
      startTime: 'Hora de inicio',
      timeCost: 'Tiempo consumido (ms)'
    },
    actions: {
      clean: 'Vaciar registros'
    },
    confirm: {
      clean: 'Esta operación vaciará permanentemente todos los registros. ¿Continuar?',
      batchDelete: 'Esta operación eliminará permanentemente los registros seleccionados. ¿Continuar?'
    }
  },
  groupUserPage: {
    tabs: {
      inGroup: 'Miembros del grupo',
      outGroup: 'Miembros fuera del grupo'
    },
    groupName: 'Nombre del grupo: ',
    groupRemark: 'Descripción del grupo: ',
    actions: {
      remove: 'Quitar'
    }
  },
  fieldRelationPage: {
    fields: {
      id: 'N.º',
      flag: 'Identificador de campo',
      attributes: 'Atributos de campo',
      type: 'Tipo',
      typeFlag: 'Identificador de tipo',
      avatar: 'Avatar',
      sourceUserId: 'ID de usuario origen',
      sourceUnionId: 'ID único de usuario origen',
      sourceDeptParentId: 'ID de departamento padre',
      sourceDeptId: 'ID de departamento'
    },
    types: {
      user: 'Relación dinámica de campos de usuario',
      group: 'Relación dinámica de campos de grupo'
    },
    providers: {
      feishu: 'Feishu',
      dingtalk: 'DingTalk',
      wecom: 'WeCom'
    },
    placeholders: {
      select: 'Selecciona'
    },
    docs: {
      prefix: 'Documentación de gestión de relaciones dinámicas:',
      link: 'Relaciones dinámicas de campos'
    },
    dialog: {
      createTitle: 'Crear',
      updateTitle: 'Editar'
    },
    confirm: {
      batchDelete: 'Esta operación eliminará permanentemente las relaciones de campo seleccionadas. ¿Continuar?'
    },
    validation: {
      selectTypeFlag: 'Selecciona identificador de tipo'
    },
    messages: {
      deleteSuccess: 'Eliminado correctamente'
    }
  },
  profile: {
    aboutMe: 'Sobre mí'
  },
  components: {
    iconSelect: {
      placeholder: 'Introduce nombre del icono'
    },
    upload: {
      drag: 'Arrastra o ',
      dragHere: 'Arrastra el archivo aquí, o ',
      click: 'haz clic para subir'
    }
  },
  validation: {
    required: 'Introduce {field}',
    lengthRange: 'La longitud debe estar entre {min} y {max} caracteres'
  },
  errorPage: {
    back: 'Volver',
    backHome: 'Volver al inicio',
    noPermission: 'No tienes permiso para acceder a esta página',
    contactLeader: 'Contacta con tu administrador si necesitas acceso',
    orGo: 'O puedes ir a:',
    lookAround: 'Explorar',
    showImage: 'Ver imagen',
    dialogTitle: 'Vista previa',
    notFound: 'Página no encontrada'
  },
  locale: {
    label: 'Idioma',
    zhCN: '简体中文',
    enUS: 'English',
    jaJP: '日本語',
    esES: 'Español',
    koKR: '한국어'
  }
}
