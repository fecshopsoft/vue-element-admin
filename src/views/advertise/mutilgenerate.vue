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
      <el-collapse >
        <el-collapse-item title="备注说明" name="1">
          <table class="el-table advertise_table2">
            <tbody>
                
              <tr class="">
                <td>url:</td>
                <td>推广的url（<span style="color:#cc0000">必填</span>）</td>
              </tr>
              <tr class="trbg">
                <td>utm_source:</td>
                <td>渠道名称（<span style="color:#cc0000">必填</span>）</td>
              </tr>
              <tr class="">
                <td>utm_medium:</td>
                <td>子渠道名称（选填）| 红人（当渠道是KOL-开头时，这里填写的是红人姓名，必填。）</td>
              </tr>
              <tr class="trbg">
                <td>utm_campaign:</td>
                <td>活动（<span style="color:#cc0000">必填</span>）</td>
              </tr>
              <tr class="">
                <td>utm_design:</td>
                <td>广告设计人员（选填）</td>
              </tr>
              <tr class="trbg">
                <td>utm_content:</td>
                <td>推广员工erp账户（选填，<span style="color:#cc0000">如果不填写，系统默认当前用户的erp</span>）</td>
              </tr>			
            </tbody>
          </table>
        </el-collapse-item>
      </el-collapse>
      <br/><br/><br/>
      <div class="message">
        <div>
          <fieldset id="fieldset_table_qbe">
            <legend style="color:green">{{$t('table.advertise_success') }}</legend>
            <div  class="tishi_info" style="color:green">
              <table class="el-table advertise_table">
                <tbody>
                  <tr><td>{{$t('table.success_info')}}</td><td><span v-if="isSuccess">您已经成功生成了广告链接，点击下面的按钮复制，就可以了。</span></td></tr>
                  <tr><td>{{$t('table.advertise_url')}}</td><td>{{advertise_success.advertise_url}}</td></tr>
                  <tr><td>{{$t('table.click_to_copy')}}</td><td>
                    <input  type="text" id="success_form_input" readonly="readonly" v-model="advertise_url"/>
                    <button ref="copy" data-clipboard-action="copy" data-clipboard-target="#success_form_input" @click="copyLink">复制</button>  
                  </td></tr>
                  <tr><td>{{$t('table.created_at')}}</td><td>{{advertise_success.created_at | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</td></tr>
                  <tr><td>{{$t('table.origin_url')}}</td><td>{{advertise_success.origin_url}}</td></tr>
                  <tr><td>{{$t('table.fid')}}</td><td>{{advertise_success.fid}}</td></tr>
                  <tr><td>{{$t('table.channel')}}</td><td>{{advertise_success.channel}}</td></tr>
                  <tr><td>{{$t('table.channel_child')}}</td><td>{{advertise_success.channel_child}}</td></tr>
                  <tr><td>{{$t('table.campaign')}}</td><td>{{advertise_success.campaign}}</td></tr>
                  <tr><td>{{$t('table.design_person')}}</td><td>{{advertise_success.design_person}}</td></tr>
                  <tr><td>{{$t('table.advertise_person')}}</td><td>{{advertise_success.advertise_person}}</td></tr>
                  <tr><td>{{$t('table.advertise_market_group')}}</td><td>{{advertise_success.advertise_market_group}}</td></tr>
                  
                  <tr><td>{{$t('table.advertise_cost')}}</td><td>{{advertise_success.advertise_cost}}</td></tr>
                  <tr><td>{{$t('table.advertise_remark')}}</td><td>{{advertise_success.advertise_remark}}</td></tr>
                </tbody>
              </table>
            </div>
          </fieldset>
        </div>
      </div>
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
      copyBtn: null,
      isSuccess: false,
      advertise_url: '',
      downloadXlsxUrl: '',
      advertise_warning: ''
    }
  },
  mounted() {
    this.copyBtn = new this.Clipboard(this.$refs.copy)
  },
  created() {
    var baseUrl = this.env_base_api
    this.downloadXlsxUrl = baseUrl + '/v1/whole/advertise/download/mutilxlsx'
  },
  methods: {
    copyLink() {
      var _this = this
      var clipboard = _this.copyBtn
      clipboard.on('success', function() {
        _this.$message({
          message: '复制成功！',
          type: 'success'
        })
      })
      clipboard.on('error', function() {
        _this.$message({
          message: '复制失败，请手动选择复制！',
          type: 'error'
        })
      })
    },

    generateMutilAdvertise() {
      var self = this
      self.listLoading = true
      var excelFile = new FormData()
      excelFile.append('file', this.$refs.avatarInput.files[0])
      var baseUrl = this.env_base_api
      var dXlsxUrl = baseUrl + '/v1/whole/advertise/generatemutiladvertise'
      self.$ajax({
        method: 'post',
        url: dXlsxUrl,
        data: excelFile,
        headers: {
          'X-Token': getToken()
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