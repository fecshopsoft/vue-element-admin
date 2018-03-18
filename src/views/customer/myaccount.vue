<template>
  <div class="app-container calendar-list-container">
    <el-form  ref="dataForm" :model="temp" label-position="left" label-width="140px" style='width: 800px; margin-left:50px; margin-top:10px'>
      <el-form-item :label="$t('table.username')" prop="username">
        <el-input v-model="temp.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item :label="$t('table.password')" >
        <el-input type="password" v-model="temp.password"></el-input>
      </el-form-item>
      <el-form-item :label="$t('table.new_password')" >
        <el-input type="password" v-model="temp.new_password"></el-input>
      </el-form-item>
      <el-form-item :label="$t('table.confirm_password')" >
        <el-input type="password" v-model="temp.confirm_password"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button style="margin-left:50px;" type="primary" @click="updatePassword">{{$t('table.confirm')}}</el-button>
    </div>
  </div>
</template>

<script>
// 从api包中导入用于ajax的函数
import { updatePassword } from '@/api/customer'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'complexTable',
  directives: { // 自定义组件directives , 详细参看：http://blog.csdn.net/hant1991/article/details/74626002
    waves // 点击按钮出现水波纹
  },
  data() {
    return {
      temp: {
        username: this.$store.getters.name,
        password: '',
        new_password: '',
        confirm_password: ''
      }
    }
  },
  // 过滤器，譬如下面的dateFilter，在上面代码可以看到应用：
  // {{scope.row.created_at  | parseTime('{y}-{m}-{d}') | dateFilter() }}
  // 上面中的 | 类似linux的管道，将上面的结果作为下面函数的输入的第一个参数
  // 因此 scope.row.created_at 的值将作为过滤器 parseTime(value,'{y}-{m}-{d}') 函数的value参数传入
  // 得到的结果，将作为 dateFilter(value) 函数的第一个参数value，传入
  methods: {
    // 更新提交的函数
    updatePassword() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updatePassword(tempData).then(response => {
            var code = response.code
            var data = response.data
            console.log(data)
            if (code === 20000) {
              var affected = data.affected
              if (affected < 1) {
                this.$notify({
                  title: '失败',
                  message: '更新密码失败，您的当前密码填写错误',
                  type: 'error',
                  duration: 2000
                })
              } else {
                this.$notify({
                  title: '成功',
                  message: '更新密码成功',
                  type: 'success',
                  duration: 2000
                })
              }
            } else {
              this.$notify({
                title: '失败',
                message: '更新失败',
                type: 'error',
                duration: 2000
              })
            }
          })
          this.reset()
        }
      })
    },
    reset() {
      this.password = ''
      this.new_password = ''
      this.confirm_password = ''
    }
  }
}
</script>
