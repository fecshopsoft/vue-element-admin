<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" :placeholder="$t('table.browser_name')" v-model="listQuery.browser_name">
      </el-input>
      
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.own_id" :placeholder="$t('table.own_name')">
        <el-option v-for="item in  ownNameOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>

      <el-select clearable class="filter-item" style="width: 180px" v-model="listQuery.website_id" :placeholder="$t('table.website_id')">
        <el-option v-for="item in  siteIdOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>
      

      <el-date-picker clearable @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" v-model="listQuery.service_date_str_begin" type="date" format="yyyy-MM-dd" :placeholder="$t('table.service_date_str_begin')">
      </el-date-picker>
      <el-date-picker clearable @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" v-model="listQuery.service_date_str_end" type="date" format="yyyy-MM-dd" :placeholder="$t('table.service_date_str_end')">
      </el-date-picker>

      <el-input clearable @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" v-model="listQuery.uv_begin" :placeholder="$t('table.uv_begin')">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" v-model="listQuery.uv_end"  :placeholder="$t('table.uv_end')">
      </el-input>
      <!--
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      -->
      <br>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table :default-sort = "defaultSort"  @sort-change="sortChange" stripe :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%"  @selection-change="changeFun" class="editonfb">
      <!--
      <el-table-column align="left" :label="$t('table.id')" width="145">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      -->
      <el-table-column sortable="custom" prop="browser_name" fixed show-overflow-tooltip  width="90px" align="left" :label="$t('table.browser_name')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.browser_name}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="service_date_str" show-overflow-tooltip min-width="100px" align="left" :label="$t('table.service_date_str')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.service_date_str}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="pv" show-overflow-tooltip min-width="80px" align="left" :label="$t('table.pv')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.pv}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="uv" show-overflow-tooltip min-width="80px" align="left" :label="$t('table.uv')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.uv}}</span>
        </template>
      </el-table-column>
      
      <el-table-column sortable="custom" prop="stay_seconds_rate" show-overflow-tooltip min-width="110px" align="left" :label="$t('table.stay_seconds_rate')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.stay_seconds_rate | fixFloat2()}}</span>  
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="is_return_rate" show-overflow-tooltip min-width="90px" align="right" :label="$t('table.is_return_rate')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.is_return_rate | rateFloat2()}}</span>  
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="jump_out_rate" show-overflow-tooltip min-width="90px" align="right" :label="$t('table.jump_out_rate')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.jump_out_rate | rateFloat2()}}</span>  
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="drop_out_rate" show-overflow-tooltip min-width="90px" align="right" :label="$t('table.drop_out_rate')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.drop_out_rate | rateFloat2()}}</span>  
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="cart_count" show-overflow-tooltip min-width="110px" align="left" :label="$t('table.cart_count')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.cart_count}}</span>
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="order_count" show-overflow-tooltip min-width="110px" align="left" :label="$t('table.order_count')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.order_count}}</span>
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="success_order_count" show-overflow-tooltip min-width="130px" align="left" :label="$t('table.success_order_count')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.success_order_count}}</span>
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="success_order_no_count" show-overflow-tooltip min-width="90px" align="left" :label="$t('table.success_order_no_count')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.success_order_no_count}}</span>
        </template>
      </el-table-column>
      
      <el-table-column sortable="custom" prop="sku_sale_rate" show-overflow-tooltip min-width="90px" align="left" :label="$t('table.sku_sale_rate')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.sku_sale_rate | rateFloat2()}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" :label="$t('table.actions')" width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.editinfo')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog  :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="140px" style='width: 800px; margin-left:50px; margin-top:10px'>
        <el-form-item :label="$t('table.market_group_name')" prop="name">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>

        <el-form-item :label="$t('table.own_name')" prop="request_method">
          <el-select clearable class="filter-item" v-model="temp.own_id" placeholder="Please select">
            <el-option v-for="item in  ownNameOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
            </el-option>
          </el-select>
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
import { fetchList } from '@/api/basestics/browser'
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
  name: 'marketGroupComplexTable',
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
        browser_name: undefined, // 按照username搜索
        own_id: undefined,
        website_id: undefined,
        // type: undefined,
        service_date_str_begin: undefined, // 搜索开始时间
        service_date_str_end: undefined, // 搜索结束时间
        sort: 'id', // 排序的字段，默认为id升序排序
        sort_dir: 'descending' // 'ascending'
      },
      defaultSort: { prop: 'service_date_str', order: 'descending' },
      ownNameOptions: {},
      siteIdOptions: {},
      createdCustomerOptions: {},
      sortOptions: [ // 排序部分定义
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' },
        { label: 'CreatedAt Ascending', key: '+created_at' },
        { label: 'CreatedAt Descending', key: '-created_at' }
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
    fixFloat2(value) {
      return value.toFixed(2)
    },
    rateFloat2(value) {
      return ((100 * value).toFixed(2)) + '%'
    },
    parseCreatedCustomer(value, createdCustomerOptions) {
      for (var x in createdCustomerOptions) {
        if (createdCustomerOptions[x]['key'] === value) {
          return createdCustomerOptions[x]['display_name']
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
    sortChange(columns, prop, sortDir) {
      this.listQuery.sort = columns.prop
      this.listQuery.sort_dir = columns.order
      this.getList()
    },
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
      console.log(this.listQuery)
      fetchList(this.listQuery).then(response => {
        // :default-sort = "{prop: 'date', order: 'descending'}"
        // this.listQuery.sort
        // this.listQuery.sort_dir  // descending

        // this.defaultSort = { prop: this.listQuery.sort, order: this.listQuery.sort_dir }
        this.list = response.data.items
        this.total = response.data.total
        this.ownNameOptions = response.data.ownNameOptions
        this.siteIdOptions = response.data.siteIdOptions
        this.listQuery.website_id = response.data.chosen_website_id
        this.listQuery.own_id = response.data.chosen_own_id
        // this.createdCustomerOptions = response.data.createdCustomerOps
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


<style rel="stylesheet/scss" lang="scss">

.editonfb thead tr th , .editonfb tbody tr td span{
  font-size:11px;
}


</style>