<template>
  <div>
    <UploadExcel :on-success="handleSuccess" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employess'
export default {
  name: 'HrsassIndex',
  methods: {
    async handleSuccess({ header, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        const userinfo = {}
        Object.keys(item).forEach(key => {
          userinfo[userRelations[key]] = item[key]
        })
        arr.push(userinfo)
      })
      await importEmployee(arr)
      this.$message.success('批量导入成功')
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
