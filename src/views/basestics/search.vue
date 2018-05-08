<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" :placeholder="$t('table.search_text')" v-model="listQuery.search_text">
      </el-input>
      
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.own_id" :placeholder="$t('table.own_name')">
        <el-option v-for="item in  ownNameOptions" :key="item.key" :label="item.display_name" :value="item.key">
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

    <el-table height="650" :default-sort = "{ prop: listQuery.sort, order: listQuery.sort_dir }"  @sort-change="sortChange" stripe :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%"  @selection-change="changeFun" class="editonfb">
      <!--
      <el-table-column align="left" :label="$t('table.id')" width="145">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      -->
      <el-table-column sortable="custom" prop="search_text" fixed show-overflow-tooltip  width="110px" align="left" :label="$t('table.search_text')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.search_text}}</span>
        </template>
      </el-table-column>
       <el-table-column sortable="custom" prop="search_qty" show-overflow-tooltip  width="140px" align="left" :label="$t('table.search_qty')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.search_qty}}</span>
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

      <el-table-column sortable="custom" prop="search_login_email" show-overflow-tooltip min-width="150px" align="left" :label="$t('table.search_login_email')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.search_login_email}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="search_sku_click" show-overflow-tooltip min-width="160px" align="left" :label="$t('table.search_sku_click')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.search_sku_click}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="search_sku_cart" show-overflow-tooltip min-width="180px" align="left" :label="$t('table.search_sku_cart')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.search_sku_cart}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="search_sku_order" show-overflow-tooltip min-width="160px" align="left" :label="$t('table.search_sku_order')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.search_sku_order}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="search_sku_order_success" show-overflow-tooltip min-width="180px" align="left" :label="$t('table.search_sku_order_success')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.search_sku_order_success}}</span>
        </template>
      </el-table-column>
      
      <el-table-column sortable="custom" prop="search_sku_click_rate" show-overflow-tooltip min-width="160px" align="right" :label="$t('table.search_sku_click_rate')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.search_sku_click_rate | rateFloat2()}}</span>  
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="search_sale_rate" show-overflow-tooltip min-width="160px" align="right" :label="$t('table.search_sale_rate')">
        <template slot-scope="scope">
          <span class="link-type">{{scope.row.search_sale_rate | rateFloat2()}}</span>  
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" :label="$t('table.actions')" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate2(scope.row)">{{$t('table.trend')}}</el-button>
          <el-button  type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.editinfo')}}</el-button>
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
            <el-form-item :label="$t('table.search_text')" >
              <el-input v-model="temp.search_text"></el-input>
            </el-form-item>
            
            <el-form-item :label="$t('table.search_qty')" >
              <el-input v-model="temp.search_qty"></el-input>
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

            <el-form-item :label="$t('table.is_return')" >
              <el-input v-model="temp.is_return"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.is_return_rate')" >
              <el-input :value="temp.is_return_rate | rateFloat2"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.first_page')" >
              <el-input v-model="temp.first_page"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.search_login_email')" >
              <el-input v-model="temp.search_login_email"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.search_sku_click')" >
              <el-input v-model="temp.search_sku_click"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.search_sku_cart')" >
              <el-input v-model="temp.search_sku_cart"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.search_sku_order')" >
              <el-input v-model="temp.search_sku_order"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.search_sku_order_success')" >
              <el-input v-model="temp.search_sku_order_success"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.search_sku_click_rate')" >
              <el-input :value="temp.search_sku_click_rate  | rateFloat2"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.search_sale_rate')" >
              <el-input :value="temp.search_sale_rate  | rateFloat2"></el-input>
            </el-form-item>

          </el-form>
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
        <el-tab-pane :label="$t('table.couontry_code')" name="chart_14">
          <div class='chart-container'>
            <piechart className="chart_14" id="chart_14" :width="chartWidth" :height="chartHeight"
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
        <el-tab-pane :label="$t('table.fec_app')" name="chart_15">
          <div class='chart-container'>
            <piechart className="chart_15" id="chart_15" :width="chartWidth" :height="chartHeight"
              :legenddata="chart_fec_app.legenddata"
              :seriesdata="chart_fec_app.seriesdata"
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

        <el-tab-pane :label="$t('table.search_qty')" name="chart_32">
          <div class='chart-container'>
            <linechart className="chart_32" id="chart_32" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('search_qty')) ? {'search_qty': temp.trend.search_qty} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.search_login_email')" name="chart_33">
          <div class='chart-container'>
            <linechart className="chart_33" id="chart_33" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('search_login_email')) ? {'search_login_email': temp.trend.search_login_email} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.search_sku_click')" name="chart_34">
          <div class='chart-container'>
            <linechart className="chart_34" id="chart_34" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('search_sku_click')) ? {'search_sku_click': temp.trend.search_sku_click} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.search_sku_cart')" name="chart_35">
          <div class='chart-container'>
            <linechart className="chart_35" id="chart_35" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('search_sku_cart')) ? {'search_sku_cart': temp.trend.search_sku_cart} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.search_sku_order')" name="chart_36">
          <div class='chart-container'>
            <linechart className="chart_36" id="chart_36" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('search_sku_order')) ? {'search_sku_order': temp.trend.search_sku_order} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.search_sku_order_success')" name="chart_37">
          <div class='chart-container'>
            <linechart className="chart_37" id="chart_37" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('search_sku_order_success')) ? {'search_sku_order_success': temp.trend.search_sku_order_success} : null"
            ></linechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.search_sku_click_rate')" name="chart_38">
          <div class='chart-container'>
            <lineratechart className="chart_38" id="chart_38" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('search_sku_click_rate')) ? {'search_sku_click_rate': temp.trend.search_sku_click_rate} : null"
            ></lineratechart>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.search_sale_rate')" name="chart_39">
          <div class='chart-container'>
            <lineratechart className="chart_39" id="chart_39" :width="chartWidth" :height="chartHeight"
              :lineData="( temp.trend && temp.trend.hasOwnProperty('search_sale_rate')) ? {'search_sale_rate': temp.trend.search_sale_rate} : null"
            ></lineratechart>
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
import { fetchList, fetchTrendInfo } from '@/api/basestics/search'
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
      chartWidth: '1000px',
      chartHeight: '450px',
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

      tableKey: 0,
      list: null,
      imgApiUrl: {},
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
        search_text: undefined, // 按照username搜索
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
        trend: '',
        trendLang: '',
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
        this.listLoading = false
        this.imgApiUrl = response.data.siteImgUrls
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
      var queryData = {
        'search_text': row.search_text,
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
</style>