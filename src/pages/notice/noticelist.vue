<template>
  <el-card shadow="never" class="border-0">
    <!-- 头部的 新增 刷新 -->
    <div class="flex items-center justify-between mb-4">
      <el-button type="primary" size="small" @click="handleCreate">
        新增
      </el-button>
      <!-- 刷新数据 -->
      <el-tooltip effect="dark" content="刷新数据" placement="top">
        <el-button @click="getData">
          <el-icon :size="20">
            <Refresh />
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="公告标题" />
      <el-table-column prop="create_time" label="发布时间" width="180" />
      <!-- 自定义表格 -->
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
          <el-popconfirm title="是否要删除该公告" confirm-button-text="确认"
            cancel-button-text="取消" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button text type="primary" size="small">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex items-center justify-center mt-5">
      <el-pagination background layout="prev, pager,next" :total="total" :current-page="currentPage" :page-size="limit"
        @current-change="getData" />
    </div>

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
          <el-form-item label="公告标题" props="title">
            <el-input v-model="form.title" placeholder="公告标题"></el-input>
          </el-form-item>
          <el-form-item label="公告内容" props="content">
            <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
          </el-form-item>
        </el-form>
        
    </FormDrawer>
  </el-card>
</template>

<script setup>
import { ref,reactive,computed } from "vue";
import { getNoticeList,createNotice,updateNotice,deleteNotice } from "@/api/notice"
import FormDrawer from "@/components/FormDrawer.vue";
import { toast } from "@/composables/utils";
// 加载动画
const loading = ref(false)

// 分页
const currentPage = ref(1) //当前页
const total = ref(0)  //总条数
const limit = ref(10)  // 每页限制10条
// 列表
const tableData = ref([])
function getData (p = null) {
  if (typeof p == "number") {
    currentPage.value = p
  }
  loading.value = true
  getNoticeList(currentPage.value).then(res => {
    total.value = res.totalCount
    tableData.value = res.list
  }).finally(() => {
    loading.value = false
  })
}

getData()

// 删除公告
const handleDelete = (id)=>{
    loading.value = true
    deleteNotice(id).then(res=>{
      toast("删除成功")
      getData()
    })
    .finally(()=>{
      loading.value = false
    })
}
// 新增公告抽屉表单
const formDrawerRef = ref(null)
const formRef = ref(null)
const form = reactive({
  title:"",
  content:""
})

const rules = {
  title: [{
    required: true,
    message: '警告，公告标题不能为空',
    trigger: 'blur', //失去焦点时
  }],
  content: [{
    required: true,
    message: '警告，公告内容不能为空',
    trigger: 'blur', //失去焦点时
  }]
}
// 0为新增 有值则为当前值修改功能
const editId =ref(0)
const drawerTitle = computed(() => editId.value ? "修改" : "新增")
// 提交表单
const handleSubmit =()=>{
  formRef.value.validate((valid)=>{
    if(!valid) return
    formDrawerRef.value.showLoading()
    const fun = editId.value ? updateNotice(editId.value,form) :createNotice(form)
    fun.then(res=>{
      toast(drawerTitle.value + "公告成功")
      // 修改就刷新当前页 新增刷新到第一页
      getData(editId.value ? false : 1)
      formDrawerRef.value.close()
    })
    .finally(()=>{
      formDrawerRef.value.hideLoading()
    })
  })
}
// 重置表单
function resetForm(row =false){
  if(formRef.value){
    formRef.value.clearValidate()
  }
  if(row){
    for(const key in form){
      form[key] = row[key]
    }
  }
}

// 打开抽屉
const handleCreate = ()=>{
  editId.value = 0
  resetForm({
    title:"",
    content:""
  })
  formDrawerRef.value.open()
}


// 编辑
// row 当前对象
const handleEdit = (row) =>{
    editId.value = row.id
    resetForm(row)
    formDrawerRef.value.open()
}
</script>

<style scoped>

</style>