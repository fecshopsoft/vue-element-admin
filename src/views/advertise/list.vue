<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.fid')" v-model="listQuery.advertise_id">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.channel')" v-model="listQuery.fec_source">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.channel_child_name')" v-model="listQuery.fec_medium">
      </el-input>
      <el-date-picker clearable @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" v-model="listQuery.created_begin" type="date" format="yyyy-MM-dd" :placeholder="$t('table.created_begin')">
      </el-date-picker>
      <el-date-picker clearable @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" v-model="listQuery.created_end" type="date" format="yyyy-MM-dd" :placeholder="$t('table.created_end')">
      </el-date-picker>

      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <br>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%"  @selection-change="changeFun" >
      <el-table-column fixed min-width="200px" align="left" :label="$t('table.fid')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.advertise_id}}</span>
        </template>
      </el-table-column>
      
      <el-table-column min-width="100px" align="left" :label="$t('table.channel')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.fec_source}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="left" :label="$t('table.channel_child_name')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.fec_medium}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="left" :label="$t('table.campaign')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.fec_campaign }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="left" :label="$t('table.fec_content')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.fec_content | parseContentName(contentOptions)}}</span>
        </template>
      </el-table-column>
      <el-table-column width="140px" align="left" :label="$t('table.design_person')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.fec_design | parseDesignName(designOptions)}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="left" :label="$t('table.market_group')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.market_group  | parseMarketGroupName(marketGroupOptions)}}</span>
        </template>
      </el-table-column>
      
      <el-table-column width="100px" align="left" :label="$t('table.advertise_cost')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.advertise_cost}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="left" :label="$t('table.advertise_remark')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.remark}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="left" :label="$t('table.created_at')">
        <template slot-scope="scope">
          <span>{{scope.row.created_at  | parseTime('{y}-{m}-{d}') | dateFilter() }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" :label="$t('table.actions')" width="90" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.detial_info')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog  :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="140px" style='width: 800px; margin-left:50px; margin-top:10px'>
        <el-form-item :label="$t('table.fid')" prop="fid">
          <el-input v-model="temp.advertise_id"></el-input>
        </el-form-item>

        <el-form-item :label="$t('table.origin_url')" prop="origin_url">
          <el-input v-model="temp.url"></el-input>
        </el-form-item>
         <el-form-item :label="$t('table.advertise_url')" prop="advertise_url">
          <el-input v-model="temp.advertise_url"></el-input>
        </el-form-item>
        
        <el-form-item :label="$t('table.channel')" prop="channel">
          <el-input v-model="temp.fec_source"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.channel_child_name')" prop="channel_child_name">
          <el-input v-model="temp.fec_medium"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.campaign')" prop="campaign">
          <el-input v-model="temp.fec_campaign"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.fec_content')" prop="fec_content">
          <el-input :value="temp.fec_content | parseContentName(contentOptions)"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.design_person')" prop="design_person">
          <el-input :value="temp.fec_design | parseDesignName(designOptions)"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.market_group')" prop="market_group">
          <el-input :value="temp.market_group  | parseMarketGroupName(marketGroupOptions)"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.advertise_cost')" prop="advertise_cost">
          <el-input v-model="temp.advertise_cost"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.advertise_remark')" prop="advertise_remark">
          <el-input v-model="temp.remark"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 从api包中导入用于ajax的函数
import { fetchList } from '@/api/advertise/list'
import waves from '@/directive/waves' // 水波纹指令
// import { parseTime } from '@/utils' // 时间格式处理
// import Tinymce from '@/components/Tinymce' // 富文本编辑框
/*
const sexOptions = [ // 性别数组，用于生成sex select，在搜索部分和弹框的dialog部分使用到
  { key: 1, display_name: 'Man' },
  { key: 2, display_name: 'Women' }
]
const statusOptions = [ // 性别数组，用于生成sex select，在搜索部分和弹框的dialog部分使用到
  { key: 1, display_name: 'Enable' },
  { key: 2, display_name: 'Disable' }
]
*/
export default {
  name: 'channelComplexTable',
  // components: { Tinymce }, // 引入的组件
  directives: { // 自定义组件directives , 详细参看：http://blog.csdn.net/hant1991/article/details/74626002
    waves // 点击按钮出现水波纹
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      multipleSelection: [],
      total: null,
      listLoading: true,
      // filter-container 部分的搜索，以及分页部分
      listQuery: { // 当前的查询参数值
        page: 1, // 页数
        limit: 20, // 每页的默认显示数据行数
        // id: undefined
        advertise_id: undefined, // 按照 advertise_id 搜索
        own_id: undefined,
        fec_source: undefined,
        fec_medium: undefined,
        // type: undefined,
        created_begin: undefined, // 搜索开始时间
        created_end: undefined, // 搜索结束时间
        created_begin_timestamps: undefined, // 搜索开始时间戳
        created_end_timestamps: undefined, // 搜索结束时间戳
        sort: '-id' // 排序的字段，默认为id升序排序
      },
      ownNameOptions: {},
      contentOptions: {},
      designOptions: {},
      marketGroupOptions: {},

      sortOptions: [ // 排序部分定义
        { label: 'FID Ascending', key: '+advertise_id' },
        { label: 'FID Descending', key: '-advertise_id' },
        { label: '渠道 Ascending', key: '+fec_source' },
        { label: '渠道 Descending', key: '-fec_source' },
        { label: '子渠道 Ascending', key: '+fec_medium' },
        { label: '子渠道 Descending', key: '-fec_medium' }
      ],
      temp: { // update , create 数据的时候，会把数据放到该变量中。
        id: undefined,
        name: '',
        own_id: '',
        created_customer_id: ''
      },
      dialogFormVisible: false, // 编辑数据的弹框，false代表关闭
      dialogStatus: '', // 用来记录当前的弹出的编辑框是create，还是update，进而显示不同的按钮，按钮触发不同的方法。
      textMap: { // dialog， el-dialog 用于显示title
        update: 'Edit',
        create: 'Create'
      },
      rules: { // dialog弹框create update数据的时候，填写的数据进行规则验证，采用下面的rules，不知道为什么number不好用，擦！
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // email: [{ type: 'email', required: true, message: 'Please input the correct email address', trigger: 'blur,change' }],
        // birth_date: [{ type: 'date', message: 'birth_date is required', trigger: 'change' }],
        // username: [{ required: true, message: 'title is required', trigger: 'blur' }]
        // password: [{ type: 'password', message: 'birth_date is required', trigger: 'change' }],
        // age: [{ type: 'number', message: 'Please enter number', trigger: 'blur' }]
      }
      // downloadLoading: false // 下载部分
    }
  },
  // 过滤器，譬如下面的dateFilter，在上面代码可以看到应用：
  // {{scope.row.created_at  | parseTime('{y}-{m}-{d}') | dateFilter() }}
  // 上面中的 | 类似linux的管道，将上面的结果作为下面函数的输入的第一个参数
  // 因此 scope.row.created_at 的值将作为过滤器 parseTime(value,'{y}-{m}-{d}') 函数的value参数传入
  // 得到的结果，将作为 dateFilter(value) 函数的第一个参数value，传入
  filters: {
    /* 废弃
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return sexValue[type]
    },
    */
    parseOwnName(value, ownNameOptions) {
      for (var x in ownNameOptions) {
        if (ownNameOptions[x]['key'] === value) {
          return ownNameOptions[x]['display_name']
        }
      }
      return value
    },
    parseContentName(value, contentOptions) {
      var v = parseInt(value)
      for (var x in contentOptions) {
        if (contentOptions[x]['key'] === v) {
          return contentOptions[x]['display_name']
        }
      }
      return value
    },
    parseDesignName(value, designOptions) {
      var v = parseInt(value)
      for (var x in designOptions) {
        if (designOptions[x]['key'] === v) {
          return designOptions[x]['display_name']
        }
      }
      return value
    },
    parseMarketGroupName(value, marketGroupOptions) {
      for (var x in marketGroupOptions) {
        if (marketGroupOptions[x]['key'] === value) {
          return marketGroupOptions[x]['display_name']
        }
      }
      return value
    },
    dateFilter(value) {
      if (value === '1970-01-01') {
        return ''
      } else {
        return value
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    changeFun(val) { // table列表部分，点击左侧的checkbox的时候，就会把勾选的行的数据赋值给 this.multipleSelection
      this.multipleSelection = val
      // console.log(val)
    },
    // 是否是数字，通过正则
    isNumber(val) {
      var regPos = /^\d+(\.\d+)?$/ // 非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ // 负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true
      } else {
        return false
      }
    },
    // 得到数据的函数，当操作分页，搜索，排序，切换每页产品数等操作，都会执行该函数
    // 该函数前面将数据进行了一部分处理，后面通过ajax进行服务器请求，
    // 通过这个代码，import { fetchList, createOne, updateOne } from '@/api/customer' 可以知道 fetchList 是 @/api/customer.vue文件，我们打开这个文件
    // 可以在 @/api/customer.vue 中找到函数 fetchList() , 该函数进行的ajax请求，获取数据。
    getList() {
      this.listLoading = true
      if (this.listQuery.created_begin) {
        this.listQuery.created_begin_timestamps = Date.parse(this.listQuery.created_begin) / 1000
      } else {
        this.listQuery.created_begin_timestamps = null
      }
      if (this.listQuery.created_end) {
        this.listQuery.created_end_timestamps = Date.parse(this.listQuery.created_end) / 1000
      } else {
        this.listQuery.created_end_timestamps = null
      }
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.ownNameOptions = response.data.ownNameOps
        this.createdCustomerOptions = response.data.createdCustomerOps

        this.contentOptions = response.data.contentGroupOps
        this.designOptions = response.data.designGroupOps
        this.marketGroupOptions = response.data.marketGroupOps

        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
        this.$message({
          message: '获取列表失败',
          type: 'error'
        })
      })
    },
    // 点击搜索，排序部分功能 执行的函数
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // toolbar - 切换每页页数，执行的函数
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    // toolbar - 点击分页页数，执行的函数
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    // 在 handleCreate 函数中被调动，用来清空或初始化相应的项
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        url_key: '',
        request_method: '',
        group_id: ''
      }
    },
    // 此函数为：点击edit 弹出更新form窗口的时候，可以对传递的数据，在此函数中进行处理
    // 譬如下面的birth_date,从数据库里面取出来的是秒时间戳，而element ui中使用的是毫秒时间戳，因此转换成了毫秒时间戳
    // 下面的sex ，在go语言中，如果从数据库取出来为null，那么在go里面会被初始化成0，但是在element中，需要改成undefined 来对应数据库的null
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      // if (!this.temp.request_method) {
      // this.temp.request_method = undefined
      // }
      // if (!this.temp.group_id) {
      // this.temp.group_id = undefined
      // }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>
