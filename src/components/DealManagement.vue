<template>
  <div>
    <el-button @click="initData" size="small" icon="el-icon-refresh" plain>重置</el-button>
    <el-input id="keyWord" placeholder="请输入关键字" v-model="keyWord" style="width: 400px;left: 780px" size="medium"
              clearable>
      <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 110px">
        <el-option label="订单编号" value="id"></el-option>
        <el-option label="用户编号" value="user_id"></el-option>
      </el-select>
      <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <div id="table">
      <el-table v-loading="loading" empty-text="这里空空如也..." stripe height="502px" :data="dealData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <div id="eachOrderInfo" v-for="dealDetail in props.row.dealDetails">
                <el-form-item label="" style="line-height: 20px">
                  <div id="description" style="margin-left: 30px">
                    <div style="float: left">
                      <el-popover placement="right" title="" trigger="hover">
                        <img :src="dealDetail.bookImg" alt="" style="width: 150px;height: 170px">
                        <img slot="reference" :src="dealDetail.bookImg"
                             style="width: 55px;height: 60px;margin-left: 15px">
                      </el-popover>
                    </div>
                    <div style="float: left;margin-left: 30px;margin-top:5px;width: 350px;">
                      图书编号 : {{dealDetail.bookId }}
                    </div>
                    <div style="float: left;margin-left: 20px;margin-top:5px;width: 150px;">
                      书名 : {{dealDetail.bookName }}
                    </div>
                    <div style="float: left;margin-left: 20px;margin-top:5px;width: 100px;">
                      数量 : {{dealDetail.bookQuantity}} (本)
                    </div>
                    <div style="float: left;margin-left: 20px;margin-top:5px;width: 120px;">
                      单价 : {{dealDetail.bookPrice}} (元)
                    </div>
                  </div>
                </el-form-item>
              </div>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            label="订单号"
            sortable
            width="300"
            prop="deal.id">
        </el-table-column>
        <el-table-column
            label="状态"
            width="120"
            :filters="[{ text: '交易完成', value: 1 },
              { text: '尚未发货', value: 2 },
              { text: '已发货', value: 3 },
              { text: '已签收', value: 4 },
              { text: '已评论', value: 5 },
              { text: '待支付', value: 6 }]"
            :filter-method="filterState"
            prop="deal.state">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.deal.state === 1" type="success">交易完成</el-tag>
            <el-tag v-else-if="scope.row.deal.state === 2" type="info">尚未发货</el-tag>
            <el-tag v-else-if="scope.row.deal.state === 3" type="primary">已发货</el-tag>
            <el-tag v-else-if="scope.row.deal.state === 4" type="primary">已签收</el-tag>
            <el-tag v-else-if="scope.row.deal.state === 5" type="primary">已评论</el-tag>
            <el-tag v-else type="warning">待支付</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            label="时间"
            sortable
            width="180"
            prop="deal.createTime">
        </el-table-column>
        <el-table-column
            label="总额"
            sortable
            width="100"
            prop="deal.total">
        </el-table-column>
        <el-table-column
            label="支付方式"
            :filters="[{ text: '支付宝', value: '支付宝' },{ text: '微信', value: '微信' },{ text: '银行卡', value: '银行卡' },{ text: '货到付款', value: '货到付款' }]"
            :filter-method="filterPayWay"
            width="100"
            prop="deal.payWay">
        </el-table-column>
        <el-table-column
            label="收货地址"
            width="200"
            prop="deal.shippingAddress">
        </el-table-column>
        <el-table-column
            label="操作"
            fixed="right"
            prop="deal.state"
            width="200px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.deal.state===1" size="small" disabled style="pointer-events: none">
              无操作
            </el-button>
            <el-button @click="ship(scope.row.deal.id)" v-else-if="scope.row.deal.state===2" size="small">立即发货</el-button>
            <el-button v-else-if="scope.row.deal.state===3" size="small" disabled
                       style="pointer-events: none">等待收货
            </el-button>
            <el-button v-else-if="scope.row.deal.state===4" size="small" disabled
                       style="pointer-events: none">等待评论</el-button>
            <el-button @click="finishDeal(scope.row.deal.id)" v-else-if="scope.row.deal.state===5" size="small">完成订单</el-button>
            <el-button v-else size="small" disabled style="pointer-events: none">等待支付
            </el-button>
            <el-popconfirm
                confirm-button-text='删除'
                cancel-button-text='取消'
                confirm-button-type="danger"
                icon="el-icon-info"
                title="确认删除该条记录？"
                @confirm="deleteRow(dealData, scope.row.deal.id)">
              <el-button slot="reference" style="right: 20px;position: absolute" type="danger" icon="el-icon-delete"
                         size="small">删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="page">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="10"
          :total="total"
          @current-change="page"
          :hide-on-single-page="true"
          v-if="total!=null">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "DealManagement",
  data() {
    return {
      keyWord: '',
      select: 'id',
      loading: true,
      dealData: null,
      total: null,
    }
  },
  methods: {
    // 翻页功能
    page(currentPage) {
      this.loading = true;
      axios.get("http://localhost:8081/deal/selectAllDeal/" + currentPage + "/10")
          .then((resp) => {
            this.dealData = resp.data.deals;
            this.total = resp.data.total;
            this.loading = false;
          });
    },
    // 模糊搜索
    search() {
      if (this.keyWord.trim() === '') {
        this.$message.error('关键字不能为空!');
      } else {
        this.loading = true;
        this.total = null;
        axios.get("http://localhost:8081/deal/searchDeal/" + this.keyWord + "/" + this.select)
            .then((resp) => {
              this.dealData = resp.data;
              this.loading = false;
            })
      }
    },
    // 删除
    deleteRow(rows, id) {
      this.loading = true;
      axios.delete("http://localhost:8081/deal/deleteDealById/" + id)
          .then((resp) => {
            this.loading = false;
            if (resp.data === 1) {
              this.myDelete(rows,id);
              this.$message({
                showClose: true, type: 'success',
                message: '删除成功！'
              });
            } else {
              this.$message({
                showClose: true, type: 'error',
                message: '删除失败，请重试'
              });
            }
          });
    },
    // 自定义的删除数组的方法
    myDelete(rows,id){
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].deal.id === id) {
          rows.splice(i,1);
          break;
        }
      }
    },
    // 订单状态筛选功能-状态筛选
    filterState(value, row) {
      return row.deal.state === value;
    },
    // 订单状态筛选功能-支付方式筛选
    filterPayWay(value, row) {
      return row.deal.payWay === value;
    },
    // 发货操作
    ship(id){
      this.loading = true;
      axios.post("http://localhost:8081/deal/updateDealState/"+id+"/3")
          .then(resp => {
            this.loading = false;
            if (resp.data === 1) {
              for (let i = 0; i < this.dealData.length; i++) {
                if (this.dealData[i].deal.id === id){
                  this.dealData[i].deal.state = 3;
                  break;
                }
              }
              this.$message({
                message: '成功发货',
                type: 'success'
              });
            } else {
              this.$message({
                message: '操作失败，请重试',
                type: 'error'
              });
            }
          });
    },
    // 完成订单
    finishDeal(id){
      this.loading = true;
      axios.post("http://localhost:8081/deal/updateDealState/"+id+"/1")
          .then(resp => {
            this.loading = false;
            if (resp.data === 1) {
              for (let i = 0; i < this.dealData.length; i++) {
                if (this.dealData[i].deal.id === id){
                  this.dealData[i].deal.state = 1;
                  break;
                }
              }
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            } else {
              this.$message({
                message: '操作失败，请重试',
                type: 'error'
              });
            }
          });
    },
    initData(){
      this.loading = true;
      axios.get("http://localhost:8081/deal/selectAllDeal/1/10")
          .then((resp) => {
            this.dealData = resp.data.deals;
            this.total = resp.data.total;
            this.loading = false;
          });
    }
  },
  created() {
    this.initData();
  }
}
</script>

<style scoped>
#table {
  margin-top: 10px;
  border: 1px solid #eee;
  height: 500px;
}

#eachOrderInfo {
  margin-left: 30px;
  margin-top: 10px;
  height: 70px;
}

#page {
  margin: 10px auto 0;
  display: table;
}
</style>