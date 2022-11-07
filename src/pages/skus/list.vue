<template>
  <el-card shadow="never" class="border-0">
    <!-- 头部的 新增 刷新 -->
    <ListHeader 
    layout="create,delete,refresh" 
    @create="handleCreate" @refresh="getData"
    @delete="handleMultiDelete"
    ></ListHeader>

    <el-table ref="multipleTableRef" :data="tableData" stripe style="width: 100%" 
    v-loading="loading" @selection-change="handleSelectionChange">
    <!-- 第一列多选框 -->
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="规格名称" />
      <el-table-column prop="default" label="规格值" width="380" />
      <el-table-column prop="order" label="排序" />
      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0"
            @change="handleStatusChange($event, row)" :loading="row.statusLoading" :disabled="row.super == 1">
          </el-switch>
        </template>
      </el-table-column>
      <!-- 自定义表格 修改 删除按钮-->
      <el-table-column label="操作" width="250" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
          <el-popconfirm title="是否要删除该商品规格" confirm-button-text="确认"
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
    <!-- 分页 -->
    <div class="flex items-center justify-center mt-5">
      <el-pagination background layout="prev, pager,next" :total="total" :current-page="currentPage" :page-size="limit"
        @current-change="getData" />
    </div>
    <!-- 新增修改抽屉 -->
    <FormDrawer destroyOnClose="true" ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
          <el-form-item label="规格名称" prop="name">
            <el-input v-model="form.name" placeholder="规格名称"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="order">
            <el-input-number v-model="form.order" :min="0" :max="1000" >
            </el-input-number>  
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-switch v-model="form.status" :active-value="1" :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="规格值" prop="default">
            <TagInput v-model="form.default" />
          </el-form-item>
        </el-form>
    </FormDrawer>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import { getSkusList,createSkus,updateSkus,deleteSkus, updateSkusStatus } from "@/api/skus"
import FormDrawer from "@/components/FormDrawer.vue";
import TagInput from "@/components/TagInput.vue";
import { useInitTable,useInitForm } from "@/composables/useCommon";
import ListHeader from "@/components/ListHeader.vue";
import { toast } from '@/composables/utils';
import { fi } from 'element-plus/es/locale';
const {
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  handleStatusChange
} = useInitTable({
  getList: getSkusList,
  delete: deleteSkus,
  updateStatus: updateSkusStatus
})

const {
    formDrawerRef,
    formRef,
    form,
    rules,
    drawerTitle,
    handleCreate,
    handleSubmit,
    handleEdit
} = useInitForm({
  form:{
    name:"",
    status:1,
    default:"",
    order:50
  },
  rules : {
  name: [{
    required: true,
    message: '警告，规格名称不能为空',
    trigger: 'blur', //失去焦点时
  }],
  default: [{
    required: true,
    message: '警告，规格值不能为空',
    trigger: 'blur', //失去焦点时
  }],
},
  getData,
  update:updateSkus,
  create:createSkus
})

// 多选选中记录的ID数组
const multiSelectIds = ref([])
const handleSelectionChange = (e)=>{
  multiSelectIds.value = e.map(o=>o.id)
}

const multipleTableRef = ref(null)
// 批量删除方法
const handleMultiDelete = ()=>{
  loading.value = true
  deleteSkus(multiSelectIds.value)
  .then(res=>{
    toast("删除成功")
    // 清空选中
    if(multipleTableRef.value){
      multipleTableRef.value.clearSelection()
    }
    getData()
  })
  .finally(()=>{
    loading.value = false
  })
}

</script>
