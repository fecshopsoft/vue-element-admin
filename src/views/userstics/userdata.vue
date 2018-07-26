<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      
      <el-select clearable class="filter-item" style="width: 150px" v-model="listQuery.website_id" :placeholder="$t('table.website_id')">
        <el-option v-for="item in  siteIdOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <el-input clearable @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" :placeholder="$t('table.customer_id')" v-model="listQuery.customer_id">
      </el-input>

      <el-input clearable @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" :placeholder="$t('table.customer_email')" v-model="listQuery.customer_email">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" :placeholder="$t('table.fid')" v-model="listQuery.fid">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" :placeholder="$t('table.fec_source')" v-model="listQuery.fec_source">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 152px;" class="filter-item" :placeholder="$t('table.fec_campaign')" v-model="listQuery.fec_campaign">
      </el-input>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.fec_content" :placeholder="$t('table.fec_content')">
        <el-option v-for="item in  contentSelectOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <el-select clearable class="filter-item" style="width: 150px" v-model="listQuery.fec_design" :placeholder="$t('table.fec_design')">
        <el-option v-for="item in  designSelectOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>
      
      <el-date-picker clearable @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" v-model="listQuery.service_date_str_begin" type="date" format="yyyy-MM-dd" :placeholder="$t('table.service_date_str_begin')">
      </el-date-picker>
      <el-date-picker clearable @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" v-model="listQuery.service_date_str_end" type="date" format="yyyy-MM-dd" :placeholder="$t('table.service_date_str_end')">
      </el-date-picker>

      <el-input clearable @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" v-model="listQuery.pv_begin" :placeholder="$t('table.pv_begin')">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" v-model="listQuery.pv_end"  :placeholder="$t('table.pv_end')">
      </el-input>

      <el-input clearable @keyup.enter.native="handleFilter" style="width: 124px;" class="filter-item" v-model="listQuery.visit_page_sku_begin" :placeholder="$t('table.visit_page_sku_begin')">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 124px;" class="filter-item" v-model="listQuery.visit_page_sku_end"  :placeholder="$t('table.visit_page_sku_end')">
      </el-input>

      <el-input clearable @keyup.enter.native="handleFilter" style="width: 140px;" class="filter-item" v-model="listQuery.visit_page_cart_begin" :placeholder="$t('table.visit_page_cart_begin')">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 140px;" class="filter-item" v-model="listQuery.visit_page_cart_end"  :placeholder="$t('table.visit_page_cart_end')">
      </el-input>

      <el-input clearable @keyup.enter.native="handleFilter" style="width: 140px;" class="filter-item" v-model="listQuery.visit_page_order_begin" :placeholder="$t('table.visit_page_order_begin')">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 140px;" class="filter-item" v-model="listQuery.visit_page_order_end"  :placeholder="$t('table.visit_page_order_end')">
      </el-input>

      <el-input clearable @keyup.enter.native="handleFilter" style="width: 140px;" class="filter-item" v-model="listQuery.visit_page_order_processing_begin" :placeholder="$t('table.visit_page_order_processing_begin')">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 140px;" class="filter-item" v-model="listQuery.visit_page_order_processing_end"  :placeholder="$t('table.visit_page_order_processing_end')">
      </el-input>
      
      <el-select clearable class="filter-item" style="width: 100px" v-model="listQuery.is_return" :placeholder="$t('table.is_return_if')">
        <el-option v-for="item in  isReturnOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>
      <!--
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      -->
      <br>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table height="650" :default-sort = "{ prop: listQuery.sort, order: listQuery.sort_dir }"  @sort-change="sortChange" stripe :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%"  @selection-change="changeFun" class="editonfb">
      <!--
      <el-table-column align="left" :label="$t('table.id')" width="145">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      -->
      <el-table-column sortable="custom" prop="customer_id" fixed show-overflow-tooltip  width="180px" align="left" :label="$t('table.customer_id')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.customer_id}}</span>
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="service_date_str" show-overflow-tooltip min-width="100px" align="left" :label="$t('table.service_date_str')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.service_date_str}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="is_return" show-overflow-tooltip min-width="100px" align="left" :label="$t('table.is_return_if')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.is_return | isReturnName}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="pv" show-overflow-tooltip min-width="80px" align="left" :label="$t('table.pv')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.pv}}</span>
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="stay_seconds" show-overflow-tooltip min-width="140px" align="left" :label="$t('table.stay_seconds')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.stay_seconds | fixFloat2}}</span>  
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="visit_page_order_pending_amount" show-overflow-tooltip min-width="160px" align="left" :label="$t('table.visit_page_order_pending_amount')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.visit_page_order_pending_amount | fixFloat2}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="visit_page_order_processing_amount" show-overflow-tooltip min-width="140px" align="left" :label="$t('table.visit_page_order_processing_amount')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.visit_page_order_processing_amount | fixFloat2}}</span>
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="visit_page_sku" show-overflow-tooltip min-width="110px" align="left" :label="$t('table.visit_page_sku')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.visit_page_sku}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="visit_page_category" show-overflow-tooltip min-width="110px" align="left" :label="$t('table.visit_page_category')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.visit_page_category}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="visit_page_search" show-overflow-tooltip min-width="110px" align="left" :label="$t('table.visit_page_search')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.visit_page_search}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="visit_page_cart" show-overflow-tooltip min-width="150px" align="left" :label="$t('table.visit_page_cart')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.visit_page_cart}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="visit_page_order" show-overflow-tooltip min-width="110px" align="left" :label="$t('table.visit_page_order')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.visit_page_order}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="visit_page_order_pending" show-overflow-tooltip min-width="140px" align="left" :label="$t('table.visit_page_order_pending')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.visit_page_order_pending}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="visit_page_order_processing" show-overflow-tooltip min-width="140px" align="left" :label="$t('table.visit_page_order_processing')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.visit_page_order_processing}}</span>
        </template>
      </el-table-column>
      
      <el-table-column sortable="custom" prop="fid_main"  show-overflow-tooltip  width="110px" align="left" :label="$t('table.fid_main')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.fid_main}}</span>
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="ip_main"  show-overflow-tooltip  width="110px" align="left" :label="$t('table.ip_main')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.ip_main}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="browser_name_main"  show-overflow-tooltip  width="110px" align="left" :label="$t('table.browser_name_main')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.browser_name_main}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="devide_main"  show-overflow-tooltip  width="110px" align="left" :label="$t('table.devide_main')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.devide_main}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="country_code_main"  show-overflow-tooltip  width="110px" align="left" :label="$t('table.country_code_main')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.country_code_main}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="operate_main"  show-overflow-tooltip  width="110px" align="left" :label="$t('table.operate_main')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.operate_main}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="fec_app_main"  show-overflow-tooltip  width="140px" align="left" :label="$t('table.fec_app_main')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.fec_app_main}}</span>
        </template>
      </el-table-column>
    
      
      <el-table-column fixed="right" align="center" :label="$t('table.actions')" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate2(scope.row)">{{$t('table.trend')}}</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.editinfo')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog top="1vh" :title="$t('table.view_info')" :visible.sync="dialogFormVisible">
      <el-tabs v-model="activeTabName" @tab-click="handleClick">
        <el-tab-pane :label="$t('table.base_info')" name="first">
          
          <el-form  ref="dataForm1" :model="temp" label-position="left" label-width="150px" style='width: 800px; margin-left:50px; margin-top:10px'>
            <el-form-item :label="$t('table.customer_id')" >
              <el-input v-model="temp.customer_id"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.stay_seconds')" >
              <el-input :value="temp.stay_seconds | fixFloat2"></el-input>
            </el-form-item>
            
            <el-form-item :label="$t('table.is_return_if')" >
              <el-input v-model="temp.is_return"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.customer_email')" >
              <el-input v-model="tempFormat.customer_emails"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.ip_main')" >
              <el-input v-model="temp.ip_main"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.browser_name_main')" >
              <el-input v-model="temp.browser_name_main"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.devide_main')" >
              <el-input v-model="temp.devide_main"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.country_code_main')" >
              <el-input v-model="temp.country_code_main"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.operate_main')" >
              <el-input v-model="temp.operate_main"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.fec_app_main')" >
              <el-input v-model="temp.fec_app_main"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.resolution_main')" >
              <el-input v-model="temp.resolution_main"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.color_depth_main')" >
              <el-input v-model="temp.color_depth_main"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.language_main')" >
              <el-input v-model="temp.browser_name_main"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.language_main')" >
              <el-input v-model="temp.browser_name_main"></el-input>
            </el-form-item>
            
            <el-form-item :label="$t('table.fid_main')" >
              <el-input v-model="temp.fid_main"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.fec_content_main')" >
              <el-input :value="temp.fec_content_main  | parseContentName(contentOptions)"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.fec_market_group_main')" >
              <el-input :value="temp.fec_market_group_main | parseMarketGroupName(marketGroupOptions)"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.fec_campaign_main')" >
              <el-input v-model="temp.fec_campaign_main"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.fec_source_main')" >
              <el-input v-model="temp.fec_source_main"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.fec_medium_main')" >
              <el-input v-model="temp.fec_medium_main"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.fec_design_main')" >
              <el-input :value="temp.fec_design_main | parseDesignName(designOptions)"></el-input>
            </el-form-item>
            
            <el-form-item :label="$t('table.pv')" >
              <el-input v-model="temp.pv"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.visit_page_sku')" >
              <el-input v-model="temp.visit_page_sku"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.visit_page_category')" >
              <el-input v-model="temp.visit_page_category"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.visit_page_search')" >
              <el-input v-model="temp.visit_page_search"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.visit_page_cart')" >
              <el-input v-model="temp.visit_page_cart"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.visit_page_order')" >
              <el-input v-model="temp.visit_page_order"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.visit_page_order_pending')" >
              <el-input v-model="temp.visit_page_order_pending"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.visit_page_order_processing')" >
              <el-input v-model="temp.visit_page_order_processing"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.visit_page_order_amount')" >
              <el-input :value="temp.visit_page_order_amount | fixFloat2 "></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.visit_page_order_processing_amount')" >
              <el-input :value="temp.visit_page_order_processing_amount | fixFloat2 "></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.visit_page_order_pending_amount')" >
              <el-input :value="temp.visit_page_order_pending_amount | fixFloat2 "></el-input>
            </el-form-item>
          </el-form>

        </el-tab-pane>

        <el-tab-pane :label="$t('table.order')" name="chart_11_1">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="temp.order"
              style="width: 100%"
              :default-sort = "{prop: 'invoice', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="invoice"
                :label="$t('table.order_invoice')"
                sortable
                width="110">
              </el-table-column>
              <el-table-column
                prop="amount"
                :label="$t('table.order_amount')"
                sortable
                width="130">
              </el-table-column>

              <el-table-column
                prop="payment_type"
                :label="$t('table.order_payment_type')"
                sortable
                width="110">
              </el-table-column>
              <el-table-column
                prop="payment_status"
                :label="$t('table.order_payment_status')"
                sortable
                width="110">
              </el-table-column>
              
              <el-table-column
                prop="created_at"
                :label="$t('table.created_at')"
                sortable
                :formatter="formatterCreatedAt"
                width="110">
              </el-table-column>
              
              <el-table-column
                prop="email"
                :label="$t('table.email')"
                sortable
                width="110">
              </el-table-column>
              <el-table-column
                prop="first_name"
                :label="$t('table.first_name')"
                sortable
                width="110">
              </el-table-column>
              <el-table-column
                prop="last_name"
                :label="$t('table.last_name')"
                sortable
                width="110">
              </el-table-column>
              
              <el-table-column
                prop="country_name"
                :label="$t('table.country_name')"
                sortable
                width="110">
              </el-table-column>
              <el-table-column
                prop="state_name"
                :label="$t('table.state_name')"
                sortable
                width="110">
              </el-table-column>
              <el-table-column
                prop="city"
                :label="$t('table.city')"
                sortable
                width="110">
              </el-table-column>

              <el-table-column
                prop="address1"
                :label="$t('table.address1')"
                sortable
                width="110">
              </el-table-column>

              <el-table-column
                prop="address2"
                :label="$t('table.address2')"
                sortable
                width="110">
              </el-table-column>
              <el-table-column
                prop="zip"
                :label="$t('table.zip')"
                sortable
                width="110">
              </el-table-column>
              <el-table-column
                prop="shipping"
                :label="$t('table.order_shipping')"
                sortable
                width="110">
              </el-table-column>
              <el-table-column
                prop="discount_amount"
                :label="$t('table.order_discount_amount')"
                sortable
                width="110">
              </el-table-column>
              <el-table-column
                prop="coupon"
                :label="$t('table.coupon')"
                sortable
                width="110">
              </el-table-column>
              
              <el-table-column
                 width="350"
                prop="products"
                :label="$t('table.products')"
                :formatter="formatterOrderProduct">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        
        <el-tab-pane :label="$t('table.visit_data')" name="chart_11_3">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="temp.data"
              style="width: 100%"
              :default-sort = "{prop: 'service_datetime', order: 'ascending'}"
              height="450"
              >
              <el-table-column
                prop="service_datetime"
                :label="$t('table.service_datetime')"
                sortable
                width="150">
              </el-table-column>

              <el-table-column
                prop="title"
                :label="$t('table.title')"
                min-width="150"
              >
              </el-table-column>

              <el-table-column
                prop="stay_seconds"
                :label="$t('table.stay_seconds')"
                min-width="80"
              >
              </el-table-column>

              <el-table-column
                prop="url"
                :label="$t('table.url')"
                min-width="220"
                >
              </el-table-column>

              <el-table-column
                prop="refer_url"
                :label="$t('table.refer_url')"
                min-width="220"
                >
              </el-table-column>
              
              </el-table>
          </div>
        </el-tab-pane>

        
        <el-tab-pane :label="$t('table.language')" name="chart_11_5_999">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="tempFormat.language"
              style="width: 100%"
              :default-sort = "{prop: 'count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="namet"
                :label="$t('table.namet')"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="count"
                :label="$t('table.count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>


        <el-tab-pane :label="$t('table.devide')" name="chart_11_5_991">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="tempFormat.devide"
              style="width: 100%"
              :default-sort = "{prop: 'count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="namet"
                :label="$t('table.namet')"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="count"
                :label="$t('table.count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>
        

        <el-tab-pane :label="$t('table.fec_app')" name="chart_11_5_990">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="tempFormat.fec_app"
              style="width: 100%"
              :default-sort = "{prop: 'count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="namet"
                :label="$t('table.namet')"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="count"
                :label="$t('table.count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>
        
        <el-tab-pane :label="$t('table.search')" name="chart_11_5_989">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="tempFormat.search"
              style="width: 100%"
              :default-sort = "{prop: 'count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="namet"
                :label="$t('table.namet')"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="count"
                :label="$t('table.count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.category')" name="chart_11_5_988">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="tempFormat.category"
              style="width: 100%"
              :default-sort = "{prop: 'count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="namet"
                :label="$t('table.namet')"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="count"
                :label="$t('table.count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>


        <el-tab-pane :label="$t('table.sku')" name="chart_11_5_987">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="tempFormat.sku"
              style="width: 100%"
              :default-sort = "{prop: 'sku_count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="namet"
                :label="$t('table.namet')"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="image"
                :formatter="formatterProductImage"
                :label="$t('table.image')"
                >
              </el-table-column>
              <el-table-column
                prop="sku_count"
                :label="$t('table.sku_count')"
                sortable
                min-width="150"
                >
              </el-table-column>
              <el-table-column
                prop="cart_count"
                :label="$t('table.cart_count')"
                sortable
                min-width="150"
                >
              </el-table-column>
              <el-table-column
                prop="order_count"
                :label="$t('table.order_count')"
                sortable
                min-width="150"
                >
              </el-table-column>
              <el-table-column
                prop="order_success_count"
                :label="$t('table.order_sku_success_count')"
                sortable
                min-width="150"
                >
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.operate')" name="chart_11_5_986">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="tempFormat.operate"
              style="width: 100%"
              :default-sort = "{prop: 'count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="namet"
                :label="$t('table.namet')"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="count"
                :label="$t('table.count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.country_code')" name="chart_11_5_985">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="tempFormat.country_code"
              style="width: 100%"
              :default-sort = "{prop: 'count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="namet"
                :label="$t('table.namet')"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="count"
                :label="$t('table.count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.browser_name')" name="chart_11_5_984">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="tempFormat.browser_name"
              style="width: 100%"
              :default-sort = "{prop: 'count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="namet"
                :label="$t('table.namet')"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="count"
                :label="$t('table.count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.resolution')" name="chart_11_5_983">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="tempFormat.resolution"
              style="width: 100%"
              :default-sort = "{prop: 'count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="namet"
                :label="$t('table.namet')"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="count"
                :label="$t('table.count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>
        
        <el-tab-pane :label="$t('table.color_depth')" name="chart_11_5_982">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="tempFormat.color_depth"
              style="width: 100%"
              :default-sort = "{prop: 'count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="namet"
                :label="$t('table.namet')"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="count"
                :label="$t('table.count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>

      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog top="1vh" :title="$t('table.trend_info')" :visible.sync="dialogFormVisible2">
      <el-tabs v-model="activeTabName2" @tab-click="handleClick2">
        <el-tab-pane :label="$t('table.all_trend')" name="first2">
          <div class='chart-container'>
            <linechart className="chart_21" id="chart_21" :width="chartWidth" :height="chartHeight"
              :lineData="temp.trendLang"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.pv')" name="chart_22">
          <div class='chart-container'>
            <linechart className="chart_22" id="chart_22" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('pv')) ? {'pv': temp.trend.pv} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.stay_seconds')" name="chart_23">
          <div class='chart-container'>
            <linechart className="chart_23" id="chart_23" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('stay_seconds')) ? {'stay_seconds': temp.trend.stay_seconds} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        
        <el-tab-pane :label="$t('table.visit_page_sku')" name="chart_23_1">
          <div class='chart-container'>
            <linechart className="chart_23_1" id="chart_23_1" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('visit_page_sku')) ? {'visit_page_sku': temp.trend.visit_page_sku} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.visit_page_category')" name="chart_23_2">
          <div class='chart-container'>
            <linechart className="chart_23_2" id="chart_23_2" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('visit_page_category')) ? {'visit_page_category': temp.trend.visit_page_category} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.visit_page_search')" name="chart_24">
          <div class='chart-container'>
            <linechart className="chart_24" id="chart_24" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('visit_page_search')) ? {'visit_page_search': temp.trend.visit_page_search} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.visit_page_cart')" name="chart_25">
          <div class='chart-container'>
            <linechart className="chart_25" id="chart_25" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('visit_page_cart')) ? {'visit_page_cart': temp.trend.visit_page_cart} : null"
            ></linechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.visit_page_order_pending')" name="chart_26_1">
          <div class='chart-container'>
            <linechart className="chart_26_1" id="chart_26_1" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('visit_page_order_pending')) ? {'visit_page_order_pending': temp.trend.visit_page_order_pending} : null"
            ></linechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.visit_page_order_pending_amount')" name="chart_26">
          <div class='chart-container'>
            <lineratechart className="chart_26" id="chart_26" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('visit_page_order_pending_amount')) ? {'visit_page_order_pending_amount': temp.trend.visit_page_order_pending_amount} : null"
            ></lineratechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.visit_page_order_processing')" name="chart_28">
          <div class='chart-container'>
            <linechart className="chart_28" id="chart_28" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('visit_page_order_processing')) ? {'visit_page_order_processing': temp.trend.visit_page_order_processing} : null"
            ></linechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.visit_page_order_processing_amount')" name="chart_29">
          <div class='chart-container'>
            <linechart className="chart_29" id="chart_29" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('visit_page_order_processing_amount')) ? {'visit_page_order_processing_amount': temp.trend.visit_page_order_processing_amount} : null"
            ></linechart>
          </div>
        </el-tab-pane>

      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 从api包中导入用于ajax的函数
import { fetchList, fetchOne, fetchTrendInfo } from '@/api/userstics/userdata'
import waves from '@/directive/waves' // 水波纹指令
import Linechart from '@/components/Charts/line'
import Lineratechart from '@/components/Charts/lineRate'
import Piechart from '@/components/Charts/pie'
import { parseTime } from '@/utils' // 时间格式处理
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
      chartWidth: '1000px',
      chartHeight: '450px',
      imgApiUrl: '',
      chart_devide: {
        legenddata: [],
        seriesdata: []
      },
      chart_operate: {
        legenddata: [],
        seriesdata: []
      },
      chart_fec_app: {
        legenddata: [],
        seriesdata: []
      },
      chart_couontry_code: {
        legenddata: [],
        seriesdata: []
      },
      chart_browser_name: {
        legenddata: [],
        seriesdata: []
      },
      chart_resolution: {
        legenddata: [],
        seriesdata: []
      },
      chart_color_depth: {
        legenddata: [],
        seriesdata: []
      },
      chart_language: {
        legenddata: [],
        seriesdata: []
      },
      isReturnOptions: [
        { key: 1, display_name: 'Yes' },
        { key: 2, display_name: 'No' }
      ],
      contentOptions: {},
      designOptions: {},
      marketGroupOptions: {},
      contentSelectOptions: {},
      designSelectOptions: {},
      tableKey: 0,
      list: null,
      multipleSelection: [],
      total: null,
      activeTabName: 'first',
      activeTabName2: 'chart_22',
      listLoading: true,
      // filter-container 部分的搜索，以及分页部分
      listQuery: { // 当前的查询参数值
        page: 1, // 页数
        limit: 20, // 每页的默认显示数据行数
        // id: undefined
        fid: undefined, // 按照username搜索
        fec_content: undefined, // 按照username搜索
        fec_design: undefined,
        fec_source: undefined,
        fec_campaign: undefined,
        customer_email: undefined,
        is_return: undefined,
        pv_begin: undefined,
        pv_end: undefined,

        visit_page_sku_begin: undefined,
        visit_page_sku_end: undefined,
        visit_page_cart_begin: undefined,
        visit_page_cart_end: undefined,
        visit_page_order_begin: undefined,
        visit_page_order_end: undefined,
        visit_page_order_processing_begin: undefined,
        visit_page_order_processing_end: undefined,

        website_id: undefined,
        // type: undefined,
        service_date_str_begin: undefined, // 搜索开始时间
        service_date_str_end: undefined, // 搜索结束时间
        sort: 'service_date_str', // 排序的字段，默认为id升序排序
        sort_dir: 'descending' // 'ascending'
      },
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
        trend: {},
        trendLang: {},
        fec_medium_format: [],
        category_format: [],
        sku_format: [],
        sku_cart_format: [],
        sku_order_format: [],
        language_format: [],
        fec_app_format: [],
        search_format: [],
        category_visit_info_format: [],
        sku_info_format: [],
        created_customer_id: ''
      },
      tempFormat: {},
      dialogFormVisible: false, // 编辑数据的弹框，false代表关闭
      dialogFormVisible2: false,
      dialogStatus: '', // 用来记录当前的弹出的编辑框是create，还是update，进而显示不同的按钮，按钮触发不同的方法。
      textMap: { // dialog， el-dialog 用于显示title
        update: 'Edit',
        create: 'Create'
      },
      initComplete: false,
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
    fixFloat2(value) {
      return parseFloat(value).toFixed(2)
    },
    isReturnName(value) {
      if (value === 1) {
        return 'Yes'
      } else {
        return 'No'
      }
    },

    rateFloat2(value) {
      return ((100 * value).toFixed(2)) + '%'
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
      var v = parseInt(value)
      for (var x in marketGroupOptions) {
        if (marketGroupOptions[x]['key'] === v) {
          return marketGroupOptions[x]['display_name']
        }
      }
      return value
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleClick2(tab, event) {
      console.log(tab, event)
    },
    sortChange(columns, prop, sortDir) {
      if (this.initComplete === true) {
        this.listQuery.sort = columns.prop
        this.listQuery.sort_dir = columns.order
        this.getList()
      }
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
        this.list = response.data.items
        this.total = response.data.total
        this.siteIdOptions = response.data.siteIdOptions
        this.listQuery.website_id = response.data.chosen_website_id
        this.initComplete = true
        this.imgApiUrl = response.data.siteImgUrls
        this.contentOptions = response.data.contentGroupOps
        this.designOptions = response.data.designGroupOps
        this.marketGroupOptions = response.data.marketGroupOps
        this.contentSelectOptions = response.data.contentSelectOps
        this.designSelectOptions = response.data.designSelectOps
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
      this.listLoading = true
      fetchOne({ website_id: row.website_id, id: row.id }).then(response => {
        this.temp = Object.assign({}, response.data.item)
        this.tempFormat = Object.assign({}, response.data.format)
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
        this.$message({
          message: '获取失败',
          type: 'error'
        })
      })

      // this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleUpdate2(row) {
      this.temp = Object.assign({}, row) // copy obj
      var self = this
      var responseTrend = {}
      var responseTrendLang = {}
      this.temp.trend = {}
      this.temp.trendLang = {}
      var queryData = {
        'customer_id': row.customer_id,
        'service_date_str': row.service_date_str,
        'website_id': row.website_id
      }
      fetchTrendInfo(queryData).then(response => {
        for (var x in response.data.trend) {
          var y = self.$t('table.' + x)
          responseTrendLang[y] = response.data.trend[x]
        }
        responseTrend = response.data.trend
        this.dialogStatus = 'update'
        this.dialogFormVisible2 = true
        this.temp.trend = responseTrend
        this.temp.trendLang = responseTrendLang
      }).catch(() => {
        this.listLoading = false
        this.$message({
          message: '获取追踪信息失败',
          type: 'error'
        })
      })
    },
    peiFormat(data) {
      var legenddata = []
      var seriesdata = []
      for (var name in data) {
        var val = data[name]
        legenddata.push(name)
        seriesdata.push({ name: name, value: val })
      }
      return [legenddata, seriesdata]
    },
    formatterOrderProduct(row, column) {
      var products = row.products
      // t = document.createElement('table');
      var y = []
      y.push(
        this.$createElement('tr', [
          this.$createElement('td', 'img'),
          this.$createElement('td', 'sku'),
          this.$createElement('td', 'qty'),
          this.$createElement('td', 'price')
        ])
      )
      for (var x in products) {
        var product = products[x]
        var imgSrc = this.getSkuImg(this.imgApiUrl, this.listQuery.website_id, product.sku)
        y.push(this.$createElement('tr', [
          this.$createElement('img', { attrs: { style: 'width:50px', src: imgSrc }}),
          this.$createElement('td', product.sku),
          this.$createElement('td', product.qty),
          this.$createElement('td', product.price)
        ]))
      }
      return this.$createElement('table', y)
    },
    formatterCreatedAt(row, column) {
      var created_at = row.created_at
      return parseTime(created_at, '{y}-{m}-{d} {h}:{i}:{s}')
    },
    formatterProductImage(row, column) {
      var rowImg = this.getSkuImg(this.imgApiUrl, this.listQuery.website_id, row.namet)
      return this.$createElement('img', { attrs: { style: 'width:50px', src: rowImg }})
    },
    getSkuImg(imgApiUrl, website_id, sku) {
      if (imgApiUrl && website_id && sku) {
        if (imgApiUrl.hasOwnProperty(website_id)) {
          var img_api_url = imgApiUrl[website_id]
          return '//' + img_api_url + '?sku=' + sku
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.editonfb thead tr th , .editonfb tbody tr td span{
  font-size:11px;
}
.chart-container{
  position: relative;
  padding: 20px;
  width: 100%;
  height:85vh;
}

.el-table__body table tr td {
  color:#666;
  padding:5px 8px;
  font-size:10px;

}
.el-table__body tr td {
  font-size:10px;
}
</style>