<template>
  <div>
    <el-upload
      v-loading="loading"
      class="custom-upload"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :http-request="onHttpRequest"
      :limit="1"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <img style="width:100%" :src="preaviewImgUrl">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDxoaVFoMk09B3i9OUhvBVq6psSu9LRUOB',
  SecretKey: 'Qj1BMRSHzlcVSGDA4tZFxcNVadcdXJyb'

})
export default {
  name: 'Uploadimg',
  props: {
    defaulturl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      preaviewImgUrl: '',
      fileList: []
    }
  },
  watch: {
    defaulturl() {
      this.fileList.push({
        name: 'default', url: this.defaulturl
      })
    }
  },
  methods: {
    // 点击浏览
    onPreview(file) {
      this.preaviewImgUrl = file.url
      this.dialogVisible = true
    },
    // 点击删除
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    beforeUpload(file) {
      const allowTypes = ['image/jpeg', 'image/gif']
      const ishas = allowTypes.includes(file.type)
      if (!ishas) {
        this.$message.error('只能上传' + allowTypes.join(',') + '类型文件')
        return false
      }
      const maxSize = 1 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传的图片不能超过1mp')
        return false
      }
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onHttpRequest({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'pyy-1314348475', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        if (err) return this.$message.error('上传图片失败')
        this.loading = false
        this.$emit('on-success', {
          imgUrl: 'https://' + data.Location
        })
      })
    }

  }

}
</script>

<style scoped >
.custom-upload{
    width: 148px;
    height: 148px;
    overflow: hidden;
}
</style>

