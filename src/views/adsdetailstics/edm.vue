<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">

      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.own_id" :placeholder="$t('table.own_name')">
        <el-option v-for="item in  ownNameOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <el-select clearable class="filter-item" style="width: 180px" v-model="listQuery.website_id" :placeholder="$t('table.website_id')">
        <el-option v-for="item in  siteIdOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <el-input clearable @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" :placeholder="$t('table.fec_edm')" v-model="listQuery.fec_edm">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" :placeholder="$t('table.fec_campaign')" v-model="listQuery.fec_campaign">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" :placeholder="$t('table.fid')" v-model="listQuery.fid">
      </el-input>
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" :placeholder="$t('table.fec_medium')" v-model="listQuery.fec_medium">
      </el-input>
      
      <el-select clearable class="filter-item" style="width: 180px" v-model="listQuery.fec_market_group" :placeholder="$t('table.fec_market_group')">
        <el-option v-for="item in  marketGroupSelectOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <el-select clearable class="filter-item" style="width: 180px" v-model="listQuery.fec_content" :placeholder="$t('table.fec_content')">
        <el-option v-for="item in  contentSelectOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <el-select clearable class="filter-item" style="width: 180px" v-model="listQuery.fec_design" :placeholder="$t('table.fec_design')">
        <el-option v-for="item in  designSelectOptions" :key="item.key" :label="item.display_name" :value="item.key">
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

    <el-table height="650" :default-sort = "{ prop: listQuery.sort, order: listQuery.sort_dir }"  @sort-change="sortChange" stripe :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%"  @selection-change="changeFun" class="editonfb">
      <!--
      <el-table-column align="left" :label="$t('table.id')" width="145">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      -->
      
      <el-table-column sortable="custom" fixed prop="fec_edm" show-overflow-tooltip min-width="100px" align="left" :label="$t('table.fec_edm')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.fec_edm}}</span>
        </template>
      </el-table-column>
      
      <el-table-column sortable="custom"  prop="fid" show-overflow-tooltip min-width="100px" align="left" :label="$t('table.fid')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.fid}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom"  prop="fec_campaign" show-overflow-tooltip min-width="100px" align="left" :label="$t('table.fec_campaign')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.fec_campaign}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="service_date_str" show-overflow-tooltip min-width="100px" align="left" :label="$t('table.service_date_str')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.service_date_str}}</span>
        </template>
      </el-table-column>
      
      <el-table-column sortable="custom"  prop="fec_medium" show-overflow-tooltip min-width="100px" align="left" :label="$t('table.fec_medium')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.fec_medium }}</span>
        </template>
      </el-table-column>

      <el-table-column sortable="custom"  prop="fec_content" show-overflow-tooltip min-width="100px" align="left" :label="$t('table.fec_content')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.fec_content | parseContentName(contentOptions)}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom"  prop="fec_market_group" show-overflow-tooltip min-width="100px" align="left" :label="$t('table.fec_market_group')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.fec_market_group  | parseMarketGroupName(marketGroupOptions)}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom"  prop="fec_design" show-overflow-tooltip min-width="100px" align="left" :label="$t('table.fec_design')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.fec_design  | parseDesignName(designOptions)}}</span>
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
      
      <el-table-column sortable="custom" prop="register_count" show-overflow-tooltip min-width="100px" align="left" :label="$t('table.register_count')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.register_count}}</span>
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="login_count" show-overflow-tooltip min-width="100px" align="left" :label="$t('table.login_count')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.login_count}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="category_count" show-overflow-tooltip min-width="100px" align="left" :label="$t('table.category_count')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.category_count}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="sku_count" show-overflow-tooltip min-width="110px" align="left" :label="$t('table.sku_count')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.sku_count}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="search_count" show-overflow-tooltip min-width="100px" align="left" :label="$t('table.search_count')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.search_count}}</span>
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

      <el-table-column sortable="custom" prop="success_order_count" show-overflow-tooltip min-width="150px" align="left" :label="$t('table.success_order_count')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.success_order_count}}</span>
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="order_no_count" show-overflow-tooltip min-width="110px" align="left" :label="$t('table.order_no_count')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.order_no_count}}</span>
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="success_order_no_count" show-overflow-tooltip min-width="150px" align="left" :label="$t('table.success_order_no_count')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.success_order_no_count}}</span>
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="order_payment_rate" show-overflow-tooltip min-width="130px" align="left" :label="$t('table.order_payment_rate')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.order_payment_rate | rateFloat2() }}</span>
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="order_amount" show-overflow-tooltip min-width="130px" align="left" :label="$t('table.order_amount')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.order_amount | fixFloat2() }}</span>
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="success_order_amount" show-overflow-tooltip min-width="130px" align="left" :label="$t('table.success_order_amount')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.success_order_amount | fixFloat2() }}</span>
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="sku_sale_rate" show-overflow-tooltip min-width="90px" align="left" :label="$t('table.sku_sale_rate')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.sku_sale_rate | rateFloat2()}}</span>
        </template>
      </el-table-column>

      <el-table-column sortable="custom" prop="success_order_c_success_uv_rate" show-overflow-tooltip min-width="150px" align="left" :label="$t('table.success_order_c_success_uv_rate')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.success_order_c_success_uv_rate | fixFloat2()}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="success_order_c_all_uv_rate" show-overflow-tooltip min-width="140px" align="left" :label="$t('table.success_order_c_all_uv_rate')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.success_order_c_all_uv_rate | fixFloat2()}}</span>
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
            <el-form-item :label="$t('table.fec_source')" >
              <el-input :value="temp.fec_source"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.fec_edm')" >
              <el-input :value="temp.fec_edm"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.fid')" >
              <el-input :value="temp.fid"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.fec_campaign')" >
              <el-input :value="temp.fec_campaign"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.fec_medium')" >
              <el-input v-model="temp.fec_medium"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.fec_market_group')" >
              <el-input :value="temp.fec_market_group | parseMarketGroupName(marketGroupOptions)"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.fec_content')" >
              <el-input :value="temp.fec_content | parseContentName(contentOptions)"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.fec_design')" >
              <el-input :value="temp.fec_design | parseDesignName(designOptions)"></el-input>
            </el-form-item>
            
            <el-form-item :label="$t('table.register_count')" >
              <el-input v-model="temp.register_count"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.login_count')" >
              <el-input v-model="temp.login_count"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.category_count')" >
              <el-input v-model="temp.category_count"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.sku_count')" >
              <el-input v-model="temp.sku_count"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.search_count')" >
              <el-input v-model="temp.search_count"></el-input>
            </el-form-item>
            
            <el-form-item :label="$t('table.service_date_str')" >
              <el-input v-model="temp.service_date_str"></el-input>
            </el-form-item>
            
            <el-form-item :label="$t('table.stay_seconds')" >
              <el-input v-model="temp.stay_seconds"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.stay_seconds_rate')" >
              <el-input :value="temp.stay_seconds_rate | fixFloat2"></el-input>
            </el-form-item>
            
            <el-form-item :label="$t('table.pv')" >
              <el-input v-model="temp.pv"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.uv')" >
              <el-input v-model="temp.uv"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.pv_rate')" >
              <el-input :value="temp.pv_rate | fixFloat2"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.ip_count')" >
              <el-input v-model="temp.ip_count"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.jump_out_count')" >
              <el-input v-model="temp.jump_out_count"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.drop_out_count')" >
              <el-input v-model="temp.drop_out_count"></el-input>
            </el-form-item>
            
            <el-form-item :label="$t('table.jump_out_rate')" >
              <el-input :value="temp.jump_out_rate | rateFloat2"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.drop_out_rate')" >
              <el-input :value="temp.drop_out_rate | rateFloat2"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.cart_count')" >
              <el-input v-model="temp.cart_count"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.order_count')" >
              <el-input v-model="temp.order_count"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.success_order_count')" >
              <el-input v-model="temp.success_order_count"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.order_no_count')" >
              <el-input v-model="temp.order_no_count"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.success_order_no_count')" >
              <el-input v-model="temp.success_order_no_count"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.order_payment_rate')" >
              <el-input :value="temp.order_payment_rate | rateFloat2"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.order_amount')" >
              <el-input  :value="temp.order_amount | fixFloat2"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.success_order_amount')" >
              <el-input  :value="temp.success_order_amount | fixFloat2"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.is_return')" >
              <el-input v-model="temp.is_return"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.is_return_rate')" >
              <el-input :value="temp.is_return_rate | rateFloat2"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.first_page')" >
              <el-input v-model="temp.first_page"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.sku_sale_rate')" >
              <el-input :value="temp.sku_sale_rate | rateFloat2"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.success_order_c_success_uv_rate')" >
              <el-input  :value="temp.success_order_c_success_uv_rate | fixFloat2"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.success_order_c_all_uv_rate')" >
              <el-input  :value="temp.success_order_c_all_uv_rate | fixFloat2"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.payment_order')" name="chart_11_1">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="temp.success_order_info"
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

        <el-tab-pane :label="$t('table.fail_order')" name="chart_11_2">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="temp.fail_order_info"
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
        
        <el-tab-pane :label="$t('table.fec_medium')" name="chart_11_3_12_11">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="temp.fec_medium_format"
              style="width: 100%"
              :default-sort = "{prop: 'fec_medium_count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="fec_medium_name"
                :label="$t('table.fec_medium')"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="fec_medium_count"
                :label="$t('table.pv_count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.fec_content')" name="chart_11_3_12">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="temp.fec_content_format"
              style="width: 100%"
              :default-sort = "{prop: 'fec_content_count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="fec_content_name"
                :label="$t('table.fec_content')"
                sortable
                :formatter="formatterContent"
                width="200">
              </el-table-column>
              <el-table-column
                prop="fec_content_count"
                :label="$t('table.pv_count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.fec_market_group')" name="chart_11_3_3">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="temp.fec_market_group_format"
              style="width: 100%"
              :default-sort = "{prop: 'fec_market_group_count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="fec_market_group_name"
                :label="$t('table.fec_market_group')"
                sortable
                :formatter="formatterMarketGroup"
                width="200">
              </el-table-column>
              <el-table-column
                prop="fec_market_group_count"
                :label="$t('table.pv_count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.fec_design')" name="chart_11_5">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="temp.fec_design_format"
              style="width: 100%"
              :default-sort = "{prop: 'fec_design_count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="fec_design_name"
                :label="$t('table.fec_design')"
                sortable
                :formatter="formatterDesign"
                width="200">
              </el-table-column>
              <el-table-column
                prop="fec_design_count"
                :label="$t('table.pv_count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.first_referrer_domain')" name="chart_11_4">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="temp.first_referrer_domain_format"
              style="width: 100%"
              :default-sort = "{prop: 'first_referrer_domain_count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="first_referrer_domain_name"
                :label="$t('table.first_referrer_domain')"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="first_referrer_domain_count"
                :label="$t('table.pv_count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>
        
        <el-tab-pane :label="$t('table.search_visit_info')" name="chart_11_6">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="temp.search_visit_info_format"
              style="width: 100%"
              :default-sort = "{prop: 'search_visit_info_count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="search_visit_info_name"
                :label="$t('table.search_visit_info')"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="search_visit_info_count"
                :label="$t('table.pv_count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.category_visit_info')" name="chart_11_7">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="temp.category_visit_info_format"
              style="width: 100%"
              :default-sort = "{prop: 'category_visit_info_count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="category_visit_info_name"
                :label="$t('table.category_visit_info')"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="category_visit_info_count"
                :label="$t('table.pv_count')"
                sortable
                min-width="400"
                >
              </el-table-column>
              </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.sku_info')" name="chart_11_8">
          <div class='chart-container'>
            <el-table class="orderInfoTable editonfb" stripe  border fit highlight-current-row 
              :data="temp.sku_info_format"
              style="width: 100%"
              :default-sort = "{prop: 'sku_visit_count', order: 'descending'}"
              height="550"
              >
              <el-table-column
                prop="sku"
                :label="$t('table.sku')"
                sortable
                width="100">
              </el-table-column>
              
              <el-table-column
                prop="image"
                :formatter="formatterProductImage"
                :label="$t('table.image')"
                >
              </el-table-column>

              <el-table-column
                prop="sku_visit_count" 
                :label="$t('table.sku_visit_count')"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="sku_cart_count" 
                :label="$t('table.sku_cart_count')"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="sku_order_count" 
                :label="$t('table.sku_order_count')"
                sortable
                >
              </el-table-column>
              <el-table-column
                prop="sku_payment_order_count" 
                :label="$t('table.sku_payment_order_count')"
                sortable
                >
              </el-table-column>
              
            </el-table>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.fec_app')" name="chart_15">
          <div class='chart-container'>
            <piechart className="chart_15" id="chart_15" :width="chartWidth" :height="chartHeight"
              :legenddata="chart_fec_app.legenddata"
              :seriesdata="chart_fec_app.seriesdata"
            ></piechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.devide')" name="chart_12">
          <div class='chart-container'>
            <piechart className="chart_12" id="chart_12" :width="chartWidth" :height="chartHeight"
              :legenddata="chart_devide.legenddata"
              :seriesdata="chart_devide.seriesdata"
            ></piechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.operate')" name="chart_13">
          <div class='chart-container'>
            <piechart className="chart_13" id="chart_13" :width="chartWidth" :height="chartHeight"
              :legenddata="chart_operate.legenddata"
              :seriesdata="chart_operate.seriesdata"
            ></piechart>
          </div>
        </el-tab-pane>
        
        
        <el-tab-pane :label="$t('table.couontry_code')" name="chart_14_11">
          <div class='chart-container'>
            <piechart className="chart_14_11" id="chart_14_11" :width="chartWidth" :height="chartHeight"
              :legenddata="chart_couontry_code.legenddata"
              :seriesdata="chart_couontry_code.seriesdata"
            ></piechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.browser_name')" name="chart_14_1">
          <div class='chart-container'>
            <piechart className="chart_14_1" id="chart_14_1" :width="chartWidth" :height="chartHeight"
              :legenddata="chart_browser_name.legenddata"
              :seriesdata="chart_browser_name.seriesdata"
            ></piechart>
          </div>
        </el-tab-pane>
        
        <el-tab-pane :label="$t('table.resolution')" name="chart_16">
          <div class='chart-container'>
            <piechart className="chart_16" id="chart_16" :width="chartWidth" :height="chartHeight"
              :legenddata="chart_resolution.legenddata"
              :seriesdata="chart_resolution.seriesdata"
            ></piechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.color_depth')" name="chart_17">
          <div class='chart-container'>
            <piechart className="chart_17" id="chart_17" :width="chartWidth" :height="chartHeight"
              :legenddata="chart_color_depth.legenddata"
              :seriesdata="chart_color_depth.seriesdata"
            ></piechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.language')" name="chart_18">
          <div class='chart-container'>
            <piechart className="chart_18" id="chart_18" :width="chartWidth" :height="chartHeight"
              :legenddata="chart_language.legenddata"
              :seriesdata="chart_language.seriesdata"
            ></piechart>
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
        <el-tab-pane :label="$t('table.uv')" name="chart_23">
          <div class='chart-container'>
            <linechart className="chart_23" id="chart_23" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('uv')) ? {'uv': temp.trend.uv} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        
        <el-tab-pane :label="$t('table.pv_rate')" name="chart_23_1">
          <div class='chart-container'>
            <linechart className="chart_23_1" id="chart_23_1" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('pv_rate')) ? {'pv_rate': temp.trend.pv_rate} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.ip_count')" name="chart_23_2">
          <div class='chart-container'>
            <linechart className="chart_23_2" id="chart_23_2" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('ip_count')) ? {'ip_count': temp.trend.ip_count} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.stay_seconds')" name="chart_24">
          <div class='chart-container'>
            <linechart className="chart_24" id="chart_24" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('stay_seconds')) ? {'stay_seconds': temp.trend.stay_seconds} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.stay_seconds_rate')" name="chart_25">
          <div class='chart-container'>
            <linechart className="chart_25" id="chart_25" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('stay_seconds_rate')) ? {'stay_seconds_rate': temp.trend.stay_seconds_rate} : null"
            ></linechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.is_return')" name="chart_26_1">
          <div class='chart-container'>
            <linechart className="chart_26_1" id="chart_26_1" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('is_return')) ? {'is_return': temp.trend.is_return} : null"
            ></linechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.is_return_rate')" name="chart_26">
          <div class='chart-container'>
            <lineratechart className="chart_26" id="chart_26" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('is_return_rate')) ? {'is_return_rate': temp.trend.is_return_rate} : null"
            ></lineratechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.jump_out_count')" name="chart_28">
          <div class='chart-container'>
            <linechart className="chart_28" id="chart_28" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('jump_out_count')) ? {'jump_out_count': temp.trend.jump_out_count} : null"
            ></linechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.drop_out_count')" name="chart_29">
          <div class='chart-container'>
            <linechart className="chart_29" id="chart_29" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('drop_out_count')) ? {'drop_out_count': temp.trend.drop_out_count} : null"
            ></linechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.jump_out_rate')" name="chart_210">
          <div class='chart-container'>
            <lineratechart className="chart_210" id="chart_210" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('jump_out_rate')) ? {'jump_out_rate': temp.trend.jump_out_rate} : null"
            ></lineratechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.drop_out_rate')" name="chart_211">
          <div class='chart-container'>
            <lineratechart className="chart_211" id="chart_211" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('drop_out_rate')) ? {'drop_out_rate': temp.trend.drop_out_rate} : null"
            ></lineratechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.register_count')" name="chart_211_1">
          <div class='chart-container'>
            <linechart className="chart_211_1" id="chart_211_1" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('register_count')) ? {'register_count': temp.trend.register_count} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.login_count')" name="chart_211_2">
          <div class='chart-container'>
            <linechart className="chart_211_2" id="chart_211_2" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('login_count')) ? {'login_count': temp.trend.login_count} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.category_count')" name="chart_211_3">
          <div class='chart-container'>
            <linechart className="chart_211_3" id="chart_211_3" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('category_count')) ? {'category_count': temp.trend.category_count} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.sku_count')" name="chart_211_4">
          <div class='chart-container'>
            <linechart className="chart_211_4" id="chart_211_4" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('sku_count')) ? {'sku_count': temp.trend.sku_count} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.search_count')" name="chart_211_5">
          <div class='chart-container'>
            <linechart className="chart_211_5" id="chart_211_5" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('search_count')) ? {'search_count': temp.trend.search_count} : null"
            ></linechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.cart_count')" name="chart_212">
          <div class='chart-container'>
            <linechart className="chart_212" id="chart_212" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('cart_count')) ? {'cart_count': temp.trend.cart_count} : null"
            ></linechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.order_count')" name="chart_213">
          <div class='chart-container'>
            <linechart className="chart_213" id="chart_213" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('order_count')) ? {'order_count': temp.trend.order_count} : null"
            ></linechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.success_order_count')" name="chart_214">
          <div class='chart-container'>
            <linechart className="chart_214" id="chart_214" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('success_order_count')) ? {'success_order_count': temp.trend.success_order_count} : null"
            ></linechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.order_no_count')" name="chart_215_1">
          <div class='chart-container'>
            <linechart className="chart_215_1" id="chart_215_1" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('order_no_count')) ? {'order_no_count': temp.trend.order_no_count} : null"
            ></linechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.success_order_no_count')" name="chart_215">
          <div class='chart-container'>
            <linechart className="chart_215" id="chart_215" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('success_order_no_count')) ? {'success_order_no_count': temp.trend.success_order_no_count} : null"
            ></linechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.order_payment_rate')" name="chart_214_1">
          <div class='chart-container'>
            <lineratechart className="chart_214_1" id="chart_214_1" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('order_payment_rate')) ? {'order_payment_rate': temp.trend.order_payment_rate} : null"
            ></lineratechart>
          </div>
        </el-tab-pane>

         <el-tab-pane :label="$t('table.order_amount')" name="chart_215_2">
          <div class='chart-container'>
            <linechart className="chart_215_2" id="chart_215_2" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('order_amount')) ? {'order_amount': temp.trend.order_amount} : null"
            ></linechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.success_order_amount')" name="chart_215_3">
          <div class='chart-container'>
            <linechart className="chart_215_3" id="chart_215_3" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('success_order_amount')) ? {'success_order_amount': temp.trend.success_order_amount} : null"
            ></linechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.sku_sale_rate')" name="chart_218">
          <div class='chart-container'>
            <lineratechart className="chart_218" id="chart_218" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('sku_sale_rate')) ? {'sku_sale_rate': temp.trend.sku_sale_rate} : null"
            ></lineratechart>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="$t('table.success_order_c_success_uv_rate')" name="chart_219">
          <div class='chart-container'>
            <linechart className="chart_219" id="chart_219" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('success_order_c_success_uv_rate')) ? {'success_order_c_success_uv_rate': temp.trend.success_order_c_success_uv_rate} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.success_order_c_all_uv_rate')" name="chart_220">
          <div class='chart-container'>
            <linechart className="chart_220" id="chart_220" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('success_order_c_all_uv_rate')) ? {'success_order_c_all_uv_rate': temp.trend.success_order_c_all_uv_rate} : null"
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
import { fetchList, fetchTrendInfo } from '@/api/adsdetailstics/edm'
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
      imgApiUrl: {},
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
      contentOptions: {},
      designOptions: {},
      marketGroupOptions: {},
      marketGroupSelectOptions: {},
      contentSelectOptions: {},
      designSelectOptions: {},
      designSelectOps: {},
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
        fec_edm: undefined, // 按照username搜索
        fec_campaign: undefined, // 按照username搜索
        fec_medium: undefined,
        fec_market_group: undefined,
        fec_content: undefined,
        fec_design: undefined,
        fid: undefined, // 按照username搜索
        own_id: undefined,
        website_id: undefined,
        // type: undefined,
        service_date_str_begin: undefined, // 搜索开始时间
        service_date_str_end: undefined, // 搜索结束时间
        sort: 'service_date_str', // 排序的字段，默认为id升序排序
        sort_dir: 'descending' // 'ascending'
      },
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
        trend: {},
        trendLang: {},
        fec_source_format: [],
        fec_content_format: [],
        fec_medium_format: [],
        fec_design_format: [],
        fec_market_group_format: [],
        fid_format: [],
        first_referrer_domain_format: [],
        fec_campaign_format: [],
        search_visit_info_format: [],
        category_visit_info_format: [],
        sku_info_format: [],
        created_customer_id: ''
      },
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
          if (designOptions[x]['display_name']) {
            return designOptions[x]['display_name']
          }
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
        this.ownNameOptions = response.data.ownNameOptions
        this.siteIdOptions = response.data.siteIdOptions
        this.listQuery.website_id = response.data.chosen_website_id
        this.listQuery.own_id = response.data.chosen_own_id
        this.initComplete = true
        this.imgApiUrl = response.data.siteImgUrls
        this.contentOptions = response.data.contentGroupOps
        this.designOptions = response.data.designGroupOps
        this.marketGroupOptions = response.data.marketGroupOps
        this.contentSelectOptions = response.data.contentSelectOps
        this.designSelectOptions = response.data.designSelectOps
        this.marketGroupSelectOptions = response.data.marketGroupSelectOps
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
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      var devideData = this.peiFormat(this.temp.devide)
      var x = ''

      // fec_source_format
      var fec_source_format = []
      var fec_source = this.temp.fec_source
      for (x in fec_source) {
        fec_source_format.push({
          fec_source_name: x,
          fec_source_count: fec_source[x]
        })
      }
      this.temp.fec_source_format = fec_source_format

      // fec_content_format
      var fec_content_format = []
      var fec_content = this.temp.fec_content
      for (x in fec_content) {
        fec_content_format.push({
          fec_content_name: x,
          fec_content_count: fec_content[x]
        })
      }
      this.temp.fec_content_format = fec_content_format

      // fec_medium_format
      var fec_medium_format = []
      var fec_medium = this.temp.fec_medium
      for (x in fec_medium) {
        fec_medium_format.push({
          fec_medium_name: x,
          fec_medium_count: fec_medium[x]
        })
      }
      this.temp.fec_medium_format = fec_medium_format

      var fec_design_format = []
      var fec_design = this.temp.fec_design
      for (x in fec_design) {
        fec_design_format.push({
          fec_design_name: x,
          fec_design_count: fec_design[x]
        })
      }
      this.temp.fec_design_format = fec_design_format

      var fec_market_group_format = []
      var fec_market_group = this.temp.fec_market_group
      for (x in fec_market_group) {
        fec_market_group_format.push({
          fec_market_group_name: x,
          fec_market_group_count: fec_market_group[x]
        })
      }
      this.temp.fec_market_group_format = fec_market_group_format

      var fid_format = []
      var fid = this.temp.fid
      for (x in fid) {
        fid_format.push({
          fid_name: x,
          fid_count: fid[x]
        })
      }
      this.temp.fid_format = fid_format

      // first_referrer_domain_format first_referrer_domain
      var first_referrer_domain_format = []
      var first_referrer_domain = this.temp.first_referrer_domain
      for (x in first_referrer_domain) {
        first_referrer_domain_format.push({
          first_referrer_domain_name: x,
          first_referrer_domain_count: first_referrer_domain[x]
        })
      }
      this.temp.first_referrer_domain_format = first_referrer_domain_format

      // fec_campaign_format
      var fec_campaign_format = []
      var fec_campaign = this.temp.fec_campaign
      for (x in fec_campaign) {
        fec_campaign_format.push({
          fec_campaign_name: x,
          fec_campaign_count: fec_campaign[x]
        })
      }
      this.temp.fec_campaign_format = fec_campaign_format

      // search_visit_info_format
      var search_visit_info_format = []
      var search_visit_info = this.temp.search_visit_info
      for (x in search_visit_info) {
        search_visit_info_format.push({
          search_visit_info_name: x,
          search_visit_info_count: search_visit_info[x]
        })
      }
      this.temp.search_visit_info_format = search_visit_info_format

      // category_visit_info
      var category_visit_info_format = []
      var category_visit_info = this.temp.category_visit_info
      for (x in category_visit_info) {
        category_visit_info_format.push({
          category_visit_info_name: x,
          category_visit_info_count: category_visit_info[x]
        })
      }
      this.temp.category_visit_info_format = category_visit_info_format
      // sku_info_format
      // sku   image sku_visit_count  sku_cart_count sku_order_count  sku_payment_order_count
      var sku_info_format = []
      var sku_visit_info = this.temp.sku_visit_info
      var cart_sku_info = this.temp.cart_sku_info
      var order_sku_info = this.temp.order_sku_info
      var success_order_sku_info = this.temp.success_order_sku_info
      var exist_sku = {}
      var imgSrc = ''
      for (x in sku_visit_info) {
        imgSrc = this.getSkuImg(this.imgApiUrl, this.listQuery.website_id, x)
        exist_sku[x] = x
        sku_info_format.push({
          sku: x,
          image: imgSrc,
          sku_visit_count: sku_visit_info[x],
          sku_cart_count: (cart_sku_info[x] ? cart_sku_info[x] : 0),
          sku_order_count: (order_sku_info[x] ? order_sku_info[x] : 0),
          sku_payment_order_count: (success_order_sku_info[x] ? success_order_sku_info[x] : 0)
        })
      }
      for (x in cart_sku_info) {
        if (!exist_sku[x] && x) {
          imgSrc = this.getSkuImg(this.imgApiUrl, this.listQuery.website_id, x)
          exist_sku[x] = x
          sku_info_format.push({
            sku: x,
            image: imgSrc,
            sku_visit_count: (sku_visit_info[x] ? sku_visit_info[x] : 0),
            sku_cart_count: (cart_sku_info[x] ? cart_sku_info[x] : 0),
            sku_order_count: (order_sku_info[x] ? order_sku_info[x] : 0),
            sku_payment_order_count: (success_order_sku_info[x] ? success_order_sku_info[x] : 0)
          })
        }
      }
      for (x in order_sku_info) {
        if (!exist_sku[x]) {
          imgSrc = this.getSkuImg(this.imgApiUrl, this.listQuery.website_id, x)
          exist_sku[x] = x
          sku_info_format.push({
            sku: x,
            image: imgSrc,
            sku_visit_count: (sku_visit_info[x] ? sku_visit_info[x] : 0),
            sku_cart_count: (cart_sku_info[x] ? cart_sku_info[x] : 0),
            sku_order_count: (order_sku_info[x] ? order_sku_info[x] : 0),
            sku_payment_order_count: (success_order_sku_info[x] ? success_order_sku_info[x] : 0)
          })
        }
      }
      for (x in success_order_sku_info) {
        if (!exist_sku[x]) {
          imgSrc = this.getSkuImg(this.imgApiUrl, this.listQuery.website_id, x)
          exist_sku[x] = x
          sku_info_format.push({
            sku: x,
            image: imgSrc,
            sku_visit_count: (sku_visit_info[x] ? sku_visit_info[x] : 0),
            sku_cart_count: (cart_sku_info[x] ? cart_sku_info[x] : 0),
            sku_order_count: (order_sku_info[x] ? order_sku_info[x] : 0),
            sku_payment_order_count: (success_order_sku_info[x] ? success_order_sku_info[x] : 0)
          })
        }
      }
      this.temp.sku_info_format = sku_info_format

      this.chart_devide.legenddata = devideData[0]
      this.chart_devide.seriesdata = devideData[1]
      var operateData = this.peiFormat(this.temp.operate)
      this.chart_operate.legenddata = operateData[0]
      this.chart_operate.seriesdata = operateData[1]
      var countryCodeData = this.peiFormat(this.temp.country_code)
      this.chart_couontry_code.legenddata = countryCodeData[0]
      this.chart_couontry_code.seriesdata = countryCodeData[1]
      var fecAppData = this.peiFormat(this.temp.fec_app)
      this.chart_fec_app.legenddata = fecAppData[0]
      this.chart_fec_app.seriesdata = fecAppData[1]

      var browserNameData = this.peiFormat(this.temp.browser_name)
      this.chart_browser_name.legenddata = browserNameData[0]
      this.chart_browser_name.seriesdata = browserNameData[1]

      var resolutionData = this.peiFormat(this.temp.resolution)
      this.chart_resolution.legenddata = resolutionData[0]
      this.chart_resolution.seriesdata = resolutionData[1]
      var colorDepthData = this.peiFormat(this.temp.color_depth)
      this.chart_color_depth.legenddata = colorDepthData[0]
      this.chart_color_depth.seriesdata = colorDepthData[1]
      var languageData = this.peiFormat(this.temp.language)
      this.chart_language.legenddata = languageData[0]
      this.chart_language.seriesdata = languageData[1]
      // this.$nextTick(() => {
      // this.$refs['dataForm'].clearValidate()
      // })
    },
    handleUpdate2(row) {
      this.temp = Object.assign({}, row) // copy obj
      var self = this
      var responseTrend = {}
      var responseTrendLang = {}
      this.temp.trend = {}
      this.temp.trendLang = {}
      var queryData = {
        'fec_edm': row.fec_edm,
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
        console.log(imgSrc)
        y.push(this.$createElement('tr', [
          this.$createElement('img', { attrs: { style: 'width:50px', src: imgSrc }}),
          this.$createElement('td', product.sku),
          this.$createElement('td', product.qty),
          this.$createElement('td', product.price)
        ]))
      }
      return this.$createElement('table', y)
    },
    formatterMarketGroup(row, column) {
      var fec_market_group_name = row.fec_market_group_name
      var market_group_name = this.getMarketGroupName(fec_market_group_name)
      console.log('###' + market_group_name + '###')
      return market_group_name !== '' ? market_group_name : fec_market_group_name
    },
    formatterContent(row, column) {
      var fec_content_name = row.fec_content_name
      var content_name = this.getContentName(fec_content_name)
      console.log('###' + content_name + '###')
      return content_name !== '' ? content_name : fec_content_name
    },
    formatterCreatedAt(row, column) {
      var created_at = row.created_at
      return parseTime(created_at, '{y}-{m}-{d} {h}:{i}:{s}')
    },
    formatterProductImage(row, column) {
      return this.$createElement('img', { attrs: { style: 'width:50px', src: row.image }})
    },
    getSkuImg(imgApiUrl, website_id, sku) {
      if (imgApiUrl && website_id && sku) {
        if (imgApiUrl.hasOwnProperty(website_id)) {
          var img_api_url = imgApiUrl[website_id]
          return '//' + img_api_url + '?sku=' + sku
        }
      }
    },
    getMarketGroupName(value) {
      var marketGroupOptions = this.marketGroupOptions
      var v = parseInt(value)
      for (var x in marketGroupOptions) {
        if (marketGroupOptions[x]['key'] === v) {
          return marketGroupOptions[x]['display_name']
        }
      }
      return value
    },
    formatterDesign(row, column) {
      var fec_design_name = row.fec_design_name
      var design_name = this.getDesignName(fec_design_name)
      console.log('###' + design_name + '###')
      return design_name !== '' ? design_name : fec_design_name
    },
    getDesignName(value) {
      var designOptions = this.designOptions
      var v = parseInt(value)
      for (var x in designOptions) {
        if (designOptions[x]['key'] === v) {
          if (designOptions[x]['display_name']) {
            return designOptions[x]['display_name']
          }
        }
      }
      return value
    },
    getContentName(value) {
      var contentOptions = this.contentOptions
      var v = parseInt(value)
      for (var x in contentOptions) {
        if (contentOptions[x]['key'] === v) {
          return contentOptions[x]['display_name']
        }
      }
      return value
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