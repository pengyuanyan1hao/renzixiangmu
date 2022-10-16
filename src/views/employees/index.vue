<template>
  <div class="app-container">
    <PageTools>
      <template #before>
        <span slot="before">共166条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
        <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
        <el-button size="small" type="primary" @click="handleAdd">新增员工</el-button>
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" :data="list" border>
        <el-table-column label="序号" sortable="" width="80" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="头像">
          <template v-slot="{row}">
            <img :src="row.staffPhoto" alt="" style="width:100%;" @click="genQrCode(row)">
          </template>

        </el-table-column>
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatterFn" />
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="{ row }">{{ row.timeOfEntry | formatDate }}</template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState">
          <template slot-scope="{ row }">
            <!-- 根据当前状态来确定 是否打开开关 -->
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{ row }">
            <el-button type="text" size="small" @click="goDetail(row)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="deleteEmployee(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next,sizes,total"
          :current-page.sync="page"
          :page-size.sync="page.size"
          :page-sizes="[5,10,15,20]"
          :total="total"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
      </el-row>
      <el-dialog
        title="预览头像"
        :visible.sync="dialogVisibleQrCode"
        width="50%"
      >
        <canvas ref="canvas" />

      </el-dialog>
    </el-card>
    <addemployyee :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import EnumHireType from '@/api/constant/employees'
import { getEmployeeList, delEmployee } from '@/api/employess'
import addemployyee from './components/add-employee.vue'
import QRCode from 'qrcode'
export default {
  name: 'HrsaasIndex',
  components: {
    addemployyee
  },

  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      hireType: EnumHireType.hireType,
      showDialog: false,
      dialogVisibleQrCode: false
    }
  },
  mounted() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      const { rows, total } = await getEmployeeList(this.page)
      this.list = rows
      this.total = total
    },
    formatterFn(row, column, cellValue) {
      const res = this.hireType.find(ele => ele.id === cellValue)
      return res ? res.value : '非正式'
    },
    handleAdd() {
      this.showDialog = true
    },
    async deleteEmployee(id) {
      try {
        await this.$confirm('确定删除该员工吗？', '提示', {
          type: 'warning'
        })
        await delEmployee(id)
        this.getEmployeeList()
      } catch (e) {
        console.log(e)
      }
    },
    async exportExcel() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel.js')
      const { rows } = await getEmployeeList({ page: 1, size: this.total })

      const exportExcelMappath = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const header = Object.keys(exportExcelMappath)
      const data = rows.map(item => {
        return header.map(it => {
          if (it === '聘用形式') {
            const find = this.hireType.find(hire => {
              return hire.id === item[exportExcelMappath[it]]
            })
            return find ? find.value : '未知'
          }
          return item[exportExcelMappath[it]]
        })
      })
      export_json_to_excel({
        header, // 表头 必填
        // data里面的二维数组，每个数组是一行的数据
        data, // 具体数据 必填
        filename: '黑马员工列表', // 非必填
        autoWidth: true, // 宽度自适应
        bookType: 'xlsx' // 文件类型
      })
    },
    goDetail(row) {
      this.$router.push('/employees/detail/' + row.id)
    },
    genQrCode(row) {
      if (!row.staffPhoto) return this.$message.error('暂无头像')
      this.dialogVisibleQrCode = true
      this.$nextTick(() => {
        QRCode.toCanvas(this.$refs.canvas, row.staffPhoto, function(error) {
          if (error) console.error(error)
          console.log('success')
        })
      })
    }

  }

}
</script>

<style>

</style>
