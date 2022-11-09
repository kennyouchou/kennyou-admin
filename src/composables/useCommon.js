import { ref, reactive, computed } from 'vue'
import { toast } from '@/composables/utils'
// 列表 分页 搜索功能 删除 修改状态
export function useInitTable(opt = {}) {
  // 搜索框
  // const searchForm = reactive({
  //   keyword: '',
  // })

  // const resetSearchForm = () => {
  //   searchForm.value = ''
  //   getData()
  // }

  let searchForm = null
  let resetSearchForm = null
  if (opt.searchForm) {
    searchForm = reactive({ ...opt.searchForm })
    resetSearchForm = () => {
      for (const key in opt.searchForm) {
        searchForm[key] = opt.searchForm[key]
      }
      getData()
    }
  }

  // 加载动画
  const loading = ref(false)

  // 分页
  const currentPage = ref(1) //当前页
  const total = ref(0) //总条数
  const limit = ref(10) // 每页限制10条
  // 列表
  const tableData = ref([])
  // 角色状态列表

  function getData(p = null) {
    if (typeof p == 'number') {
      currentPage.value = p
    }
    loading.value = true
    opt
      .getList(currentPage.value, searchForm)
      .then((res) => {
        if (opt.onGetListSuccess && typeof opt.onGetListSuccess == 'function') {
          opt.onGetListSuccess(res)
        } else {
          tableData.value = res.list
          total.value = res.totalCount
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

  getData()

  // 删除管理员
  const handleDelete = (id) => {
    loading.value = true
    opt
      .delete(id)
      .then((res) => {
        toast('删除成功')
        getData()
      })
      .finally(() => {
        loading.value = false
      })
  }

  // 修改管理员状态
  const handleStatusChange = (status, row) => {
    row.statusLoading = true
    opt
      .updateStatus(row.id, status)
      .then((res) => {
        toast('修改状态成功')
        row.status = status
      })
      .finally(() => {
        row.statusLoading = false
      })
  }

  // 多选选中记录的ID数组
  const multiSelectIds = ref([])
  const handleSelectionChange = (e) => {
    multiSelectIds.value = e.map((o) => o.id)
  }

  // 批量删除方法
  const multipleTableRef = ref(null)
  const handleMultiDelete = () => {
    loading.value = true
    opt
      .delete(multiSelectIds.value)
      .then((res) => {
        toast('删除成功')
        // 清空选中
        if (multipleTableRef.value) {
          multipleTableRef.value.clearSelection()
        }
        getData()
      })
      .finally(() => {
        loading.value = false
      })
  }

  // 批量修改状态
  const handleMultiStatusChange = (status) => {
    loading.value = true
    opt
      .updateStatus(multiSelectIds.value, status)
      .then((res) => {
        toast('修改状态成功')
        // 清空选中
        if (multipleTableRef.value) {
          multipleTableRef.value.clearSelection()
        }
        getData()
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelete,
    handleStatusChange,
    handleSelectionChange,
    multipleTableRef,
    handleMultiDelete,
    handleMultiStatusChange,
    multiSelectIds
  }
}

// 新增和修改功能
export function useInitForm(opt = {}) {
  // 新增公告抽屉表单
  const formDrawerRef = ref(null)
  const formRef = ref(null)
  const form = reactive({})

  // 0为新增 有值则为当前值修改功能
  const defaultForm = opt.form
  const rules = opt.rules || {}
  const editId = ref(0)
  const drawerTitle = computed(() => (editId.value ? '修改' : '新增'))
  // 提交表单
  const handleSubmit = () => {
    formRef.value.validate((valid) => {
      if (!valid) return
      formDrawerRef.value.showLoading()

      // 让对象的每个值解构成新的对象传回去 最后返回对象给body 转为时间戳
      let body = {}
      if (opt.beforeSubmit && typeof opt.beforeSubmit == 'function') {
        body = opt.beforeSubmit({ ...form })
      } else {
        body = form
      }

      const fun = editId.value
        ? opt.update(editId.value, body)
        : opt.create(body)
      fun
        .then((res) => {
          toast(drawerTitle.value + '成功')
          // 修改就刷新当前页 新增刷新到第一页
          opt.getData(editId.value ? false : 1)
          formDrawerRef.value.close()
        })
        .finally(() => {
          formDrawerRef.value.hideLoading()
        })
    })
  }
  // 重置表单
  function resetForm(row = false) {
    if (formRef.value) {
      formRef.value.clearValidate()
    }
    for (const key in defaultForm) {
      form[key] = row[key]
    }
  }

  // 打开抽屉
  const handleCreate = () => {
    editId.value = 0
    resetForm(defaultForm)
    formDrawerRef.value.open()
  }
  // 编辑
  // row 当前对象
  const handleEdit = (row) => {
    editId.value = row.id
    resetForm(row)
    formDrawerRef.value.open()
  }

  return {
    formDrawerRef,
    formRef,
    form,
    rules,
    editId,
    drawerTitle,
    handleCreate,
    handleSubmit,
    resetForm,
    handleEdit,
  }
}
