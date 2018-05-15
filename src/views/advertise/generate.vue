<template>
  <div class="app-container calendar-list-container">
    <div class="top_form">
      <el-select @change='handleChannel'  clearable class="filter-item" style="width: 240px" v-model="listQuery.channel" :placeholder="$t('table.channel')">
        <el-option v-for="item in  listQuery.channelOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <el-select clearable class="filter-item" style="width: 240px" v-model="listQuery.channel_child" :placeholder="$t('table.channel_child')">
        <el-option v-for="item in  listQuery.channelChildOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <el-input clearable  style="width: 200px;" class="filter-item" :placeholder="$t('table.campaign_info')" v-model="listQuery.campaign">
      </el-input>

      <el-select clearable class="filter-item" style="width: 240px" v-model="listQuery.design" :placeholder="$t('table.design_person')">
        <el-option v-for="item in  listQuery.designOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>
      <br><br>

      <el-input clearable  style="width: 900px;" class="filter-item" :placeholder="$t('table.advertise_url_info')" v-model="listQuery.advertise_url">
      </el-input>

      <br><br>

      <el-input clearable  style="width: 300px;" class="filter-item" :placeholder="$t('table.advertise_cost_info')" v-model="listQuery.advertise_cost">
      </el-input>
      <el-input clearable  style="width: 500px;" class="filter-item" :placeholder="$t('table.advertise_remark')" v-model="listQuery.remark">
      </el-input>

      <br><br>
      
      <el-button v-waves type="primary" @click="generateAdvertieseUrl"  >{{$t('table.generate_advertise_url')}}</el-button>

      <br><br>
      <br><br>
      <div class="message">
        <div>
          <fieldset id="fieldset_table_qbe">
            <legend style="color:#f60">{{$t('table.advertise_warning') }}</legend>
            <div class="tishi_info" style="color:#f60">
              {{advertise_warning}}     
            </div>
          </fieldset>
        </div>
        <br>
        <div>
        
          <fieldset id="fieldset_table_qbexx">
            <legend style="color:#cc0000">{{$t('table.advertise_error')}}</legend>
            <div class="tishi_info" style="color:#cc0000">
              {{advertise_error}} 			
            </div>
          </fieldset>
        </div>
        <br>
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
import { fetchInit, generateAdvertieseUrl } from '@/api/advertise/generate'
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
      listQuery: { // 当前的查询参数值
        campaign: '', // 活动
        design: '', // 美工
        designOptions: {},
        advertise_url: '',
        advertise_cost: '',
        remark: '',
        channel: '',
        channelOptions: {},
        channel_child: '', // 子渠道
        channelChildOptions: {},
        is_create: '2'
      },
      advertise_success: {},
      advertise_error: '',
      copyBtn: null,
      isSuccess: false,
      advertise_url: '',
      advertise_warning: ''
    }
  },
  mounted() {
    this.copyBtn = new this.Clipboard(this.$refs.copy)
  },
  created() {
    this.getList('1')
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
    getList(isCreate) {
      this.listLoading = true
      console.log(this.listQuery)
      this.listQuery.is_create = isCreate
      fetchInit(this.listQuery).then(response => {
        this.listQuery.channel = response.data.channel
        this.listQuery.channelOptions = response.data.channelOptions
        this.listQuery.channel_child = '' // response.data.channel_child
        this.listQuery.channelChildOptions = response.data.channelChildOptions
        if (isCreate === '1') {
          this.listQuery.designOptions = response.data.designOptions
        }
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
        this.$message({
          message: '获取 Channel child 失败',
          type: 'error'
        })
      })
    },
    handleChannel() {
      this.getList('2')
    },
    generateAdvertieseUrl() {
      var self = this
      this.listLoading = true
      console.log(this.listQuery)
      generateAdvertieseUrl(this.listQuery).then(response => {
        self.advertise_success = response.data.success_info
        self.advertise_warning = response.data.warning
        self.advertise_error = response.data.error
        self.isSuccess = true
        if (self.advertise_success && self.advertise_success.advertise_url) {
          self.advertise_url = self.advertise_success.advertise_url
        }
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
        this.$message({
          message: '生成广告链接失败',
          type: 'error'
        })
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