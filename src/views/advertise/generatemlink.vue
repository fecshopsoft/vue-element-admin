<template>
  <div class="app-container calendar-list-container">
    <div class="top_form">
      <table class="el-table advertise_table2">
        <tbody>
            <tr>
            <td>下载样例:</td>
            <td>
              <div class="col-md-4">
                <a style="color:blue;" :href="downloadXlsxUrl">Excel 样例 </a> 
							  <span style="margin-left:50px;color:#777;size:8px;">按照样例的规则填写excel表格，然后点击选择文件上传，然后点击按钮<b>{{$t('table.mutil_generate_advertise')}}</b>下载生成后的excel文件。</span>
              </div>
            </td>
          </tr>	
          <tr>
					  <td>Excel上传: </td>
            <td>
              <div class="col-md-4">
                <input type="file" id="uploadform-file" name="file" ref="avatarInput"> 						 
              </div>
            </td>
				  </tr>	
          <tr>
					  <td>提交</td>
            <td>
                <el-button v-waves type="primary" @click="generateMutilAdvertise"  >{{$t('table.mutil_generate_advertise')}}</el-button>
            </td>
				  </tr>	
				</tbody>
      </table>
      <br/><br/><br/>
        <div style="color:#666">
            注意：此处广告生成，针对的是一个广告有多个链接的情况，譬如邮件， 里面有多个产品，一封邮件是一个广告，里面的所有产品的fid都是一样的。 
对于广告里面的产品，在这里应该一次性生成，不能分多次，如果分多次会生成不同的fid。
        </div>
        <br/>   
      <el-collapse >
        <el-collapse-item title="Excel填写说明" name="1">
            
          <table class="el-table advertise_table2">
            <tbody>
              <tr class="">
                <td>url:</td>
                <td>推广的url（<span style="color:#cc0000">必填</span>）</td>
              </tr>
              <tr class="trbg">
                <td>fec_source（渠道）:</td>
                <td>渠道名称（<span style="color:#cc0000">必填</span>）</td>
              </tr>
              <tr class="">
                <td>fec_medium（子渠道）:</td>
                <td>子渠道名称（选填）| 红人（当渠道是KOL-开头时，这里填写的是红人姓名，必填。）</td>
              </tr>
              <tr class="trbg">
                <td>fec_campaign（活动）:</td>
                <td>活动（<span style="color:#cc0000">必填</span>）</td>
              </tr>
              <tr class="">
                <td>fec_design（美工）:</td>
                <td>广告设计人员（选填）</td>
              </tr>
              <tr class="trbg">
                <td>advertise_cost（广告费）:</td>
                <td>广告费，请使用store基础货币，因为trace接收的订单等金额都是基础货币</td>
              </tr>	
              <tr class="trbg">
                <td>remark（广告备注）:</td>
                <td>广告备注信息，您可以备注一下您的广告信息。</td>
              </tr>			
            </tbody>
          </table>
          <div>
            <br>
            生成的广告，广告员工就是当前的用户，广告小组就是广告员工所在的小组。
            <br>
          </div>
        </el-collapse-item>
      </el-collapse>
      <br>
    </div>
  </div>
</template>

<script>
// 从api包中导入用于ajax的函数
// import { generateMutilAdvertise } from '@/api/advertise/generate'
import { getToken } from '@/utils/auth'
import waves from '@/directive/waves' // 水波纹指令
import Linechart from '@/components/Charts/line'
import Lineratechart from '@/components/Charts/lineRate'
import Piechart from '@/components/Charts/pie'
// import { parseTime } from '@/utils' // 时间格式处理
// import Tinymce from '@/components/Tinymce' // 富文本编辑框
export default {
  name: 'marketGroupComplexTable',
  components: { Linechart, Lineratechart, Piechart },
  // components: { Tinymce }, // 引入的组件
  directives: { // 自定义组件directives , 详细参看：http://blog.csdn.net/hant1991/article/details/74626002
    waves // 点击按钮出现水波纹
  },
  data() {
    return {
      listLoading: false,
      advertise_success: {},
      advertise_error: '',
      isSuccess: false,
      advertise_url: '',
      downloadXlsxUrl: '',
      advertise_warning: ''
    }
  },
  created() {
    var baseUrl = this.env_base_api
    this.downloadXlsxUrl = baseUrl + '/v1/whole/advertise/download/mutilxlsx'
  },
  methods: {
    generateMutilAdvertise() {
      var self = this
      self.listLoading = true
      var excelFile = new FormData()
      excelFile.append('file', this.$refs.avatarInput.files[0])
      var baseUrl = this.env_base_api
      var dXlsxUrl = baseUrl + '/v1/whole/advertise/generatemutillinkadvertise'
      self.$ajax({
        method: 'post',
        url: dXlsxUrl,
        data: excelFile,
        headers: {
          'X-Token': getToken(),
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob' // important
      }).then((response) => { // 处理返回的文件流
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'file.xlsx')
        document.body.appendChild(link)
        link.click()
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.message fieldset{
  border:1px solid #ccc
}
.advertise_table tr td{
  color:green
}
</style>