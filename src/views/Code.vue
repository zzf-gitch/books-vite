<template>
  <div class="table-container">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <el-input v-model="searchKeyword" placeholder="请输入搜索关键词" style="width: 200px" clearable />
      <el-button type="primary" @click="handleSearch" style="margin-left: 10px">
        搜索
      </el-button>
      <el-button type="primary" @click="handleReset" style="margin-left: 10px">
        重置
      </el-button>
      <el-button type="success" @click="handleAdd" style="margin-left: 10px">
        新增
      </el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="id" label="UUID" />
      <el-table-column prop="title" label="书籍名称" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="price" label="价格" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination v-model:current-page="currentPage" size="small" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 50]"
        :total="total" layout="total, sizes, prev, pager, next" background @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>

    <!-- 新增/编辑对话框 -->
    <el-dialog v-model="dialogVisible" :title="dialogType === 'add' ? '新增数据' : '编辑数据'" width="500px">
      <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
        <el-form-item label="书籍名称" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" type="number" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBookslist, getBooksAdd, getBooksUpd, getBooksDel } from '@/api/translate'

// 表格数据
const tableData = ref([])
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 表单数据
const dialogVisible = ref(false)
const dialogType = ref('add')
const UUID = ref('')
const form = ref({
  title: '',
  author: '',
  price: '',
})

/** 表单实例 */
const formRef = ref(null);

// 表单验证
const rules = reactive({
  title: [
    { required: true, message: '书籍名称不能为空', trigger: 'blur' },
  ],
  author: [
    {
      required: true,
      message: '作者不能为空',
      trigger: 'blur',
    },
  ],
  price: [
    { required: true, message: '价格不能为空', trigger: 'blur' },
  ],
})

// 初始化数据
onMounted(() => {
  fetchData()
})

// 获取数据
const fetchData = async () => {
  // 这里替换为实际的API调用
  const res = await getBookslist({ page: currentPage.value, limit: pageSize.value, keywords: searchKeyword.value })
  tableData.value = res.books.data
  total.value = res.books.total
  if (res.code === 200) {
    if (res.message !== '') return ElMessage.success(res.message)
  } else {
    ElMessage.error(res.message)
  }
}

// 搜索
const handleSearch = async () => {
  // 实现搜索逻辑
  currentPage.value = 1
  pageSize.value = 10
  fetchData()
}

// 重置
const handleReset = () => {
  searchKeyword.value = ''
  fetchData()
}

// 新增
const handleAdd = async () => {
  dialogType.value = 'add'
  form.value = {
    title: '',
    author: '',
    price: '',
  }
  dialogVisible.value = true
}

// 编辑
const handleEdit = (row) => {
  dialogType.value = 'edit'
  form.value = { ...row }
  UUID.value = row.id
  dialogVisible.value = true
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm('确认删除该条数据吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    // 这里替换为实际的删除API调用
    const res = await getBooksDel({ id: row.id })
    if (res.code === 200) {
      ElMessage.success(res.message)
      nextTick(() => {
        fetchData()
      })
    }
  })
}

// 提交表单
const handleSubmit = () => {
  formRef.value?.validate?.( async (valid) => {
    if (!valid) {
      return;
    }
    if (dialogType.value === 'add') {
      // 这里替换为实际的新增API调用
      const res = await getBooksAdd(form.value)
      if (res.code === 200) {
        ElMessage.success(res.message)
        nextTick(() => {
          fetchData()
        })
      }
    } else {
      // 这里替换为实际的编辑API调用
      const res = await getBooksUpd({ ...form.value, id: UUID.value })
      if (res.code === 200) {
        ElMessage.success(res.message)
        nextTick(() => {
          fetchData()
        })
      }
    }
    dialogVisible.value = false
  });
}

// 分页处理
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchData()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchData()
}
</script>

<style scoped>
.table-container {
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>