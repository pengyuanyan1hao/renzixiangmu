<template>
  <div v-loading="loading" class="departments-container">
    <el-card>
      <tree-tools :tree-node="company" :is-root="false" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps">
      <tree-tools slot-scope="{data}" :tree-node="data" @editDept="editDept" @addDepts="handle" @refreshList="getDepartments" />
    </el-tree>
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="currentNode" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept' // 引入新增部门组件
export default {
  components: {
    TreeTools,
    AddDept
  },

  data() {
    return {
      company: { },
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name'
      },
      showDialog: false,
      currentNode: {},
      loading: false
    }
  },
  created() {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: result.companyManage, id: '' }
      // 需要将其转化成树形结构
      this.departs = tranListToTreeData(result.depts, '')
    },
    handle(node) {
      this.showDialog = true
      this.currentNode = node
    },
    editDept(node) {
      this.showDialog = true
      this.currentNode = { ...node }
      this.$refs.addDept.formData = { ...node }
    }
  }
}
</script>

<style lang="scss">
  .departments-container {
    width: 900px;
    margin: 20px auto;
    .el-tree {
      .el-tree-node__content {
        padding-right: 20px;
      }
    }
  }
</style>
