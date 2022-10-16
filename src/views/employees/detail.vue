<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane lazy label="登录账户设置" name="first">
            <el-form ref="form" :model="accountInfo" :rules="accountInfoRules" label-width="80px">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="accountInfo.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="accountInfo.password" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployees">更新</el-button>
              </el-form-item>
              <el-form />
            </el-form>
          </el-tab-pane>
          <el-tab-pane lazy label="个人详情" name="second">
            <iobinfo />
          </el-tab-pane>
          <el-tab-pane lazy label="岗位信息" name="third">
            <userinfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetaiById, saveUserDetailById } from '@/api/user'
import iobinfo from './components/job-info.vue'
import userinfo from './components/user-info.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    iobinfo,
    userinfo
  },
  data() {
    return {
      accountInfo: {},
      activeName: Cookies.get('activeName') || 'first',
      accountInfoRules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码长度最小6位数', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadEmployeesInfo()
  },
  methods: {
    async loadEmployeesInfo() {
      const res = await getUserDetaiById(this.$route.params.id)
      this.accountInfo = res
    },
    async updateEmployees() {
      try {
        await this.$refs.form.validate()
        await saveUserDetailById(this.accountInfo)
        this.$message.success('更新成功')
      } catch (e) {
        console.log(e)
      }
    },
    tabClick() {
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style>

</style>
