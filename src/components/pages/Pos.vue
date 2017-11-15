<template>
  <div class="pos">
    <!-- 左侧导航栏 -->
    <leftNav></leftNav>
    <div class="main">
      <el-row>
        <el-col :span='10' class="title-list left-box" id="order-list">
          <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
            <el-tab-pane label="点餐" name="first">
  
              <!-- 表格 -->
              <el-table :data="tableData" border show-summary style="width: 100%">
                <el-table-column prop="goodsName" label="商品" align="center"></el-table-column>
                <el-table-column prop="count" label="量" sortable align="center"></el-table-column>
                <el-table-column prop="price" label="金额" sortable align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="delSingleGoods(scope.row)">清除</el-button>
                    <el-button type="success" size="mini" @click="addOrderList(scope.row)">+1</el-button>
                  </template>
                </el-table-column>
              </el-table>

            <div class="operation-btn">
              <el-button type="danger" @click="delAllGoods">清空</el-button>
              <el-button type="success" @click="checkout">结账</el-button>
            </div>

            </el-tab-pane>
            <el-tab-pane label="挂单" name="second">挂单</el-tab-pane>
            <el-tab-pane label="外卖" name="third">外卖</el-tab-pane>
          </el-tabs>
        </el-col>
        <!--商品展示-->
        <el-col :span="14" class="title-list">
          <div class="often-goods">
            <div class="title">常用商品</div>
            <div class="often-goods-list">
              <ul class="clearfix">
                <li v-for="(food,index) in oftenGoods" :key="index" @click="addOrderList(food)">
                  <span>{{food.goodsName}}</span>
                  <span class="o-price">￥{{food.price}}元</span>
                </li>
              </ul>
            </div>

            <el-tabs v-model="classification" type="card" @tab-click="handleClick">
              <el-tab-pane label="套餐" name="first">
                <ul class='cookList'>
                    <li v-for="(goods,index) in typeGoods" :key="index" @click="addOrderList(goods)">
                        <span class="foodImg">
                          <img :src="goods.goodsImg" width="100%">
                        </span>
                        <p class="type-info-right">
                          <span class="foodName">{{goods.goodsName}}</span>
                          <span class="foodPrice">￥{{goods.price}}元</span>
                        </p>
                    </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="汉堡" name="second">
                <ul class='cookList'>
                    <li v-for="(goods,index) in typeGoods2" :key="index">
                        <span class="foodImg">
                          <img :src="goods.goodsImg" width="100%">
                        </span>
                        <p class="type-info-right">
                          <span class="foodName">{{goods.goodsName}}</span>
                          <span class="foodPrice">￥{{goods.price}}元</span>
                        </p>
                    </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="小食" name="third">
                <ul class='cookList'>
                    <li v-for="(goods,index) in typeGoods3" :key="index">
                        <span class="foodImg">
                          <img :src="goods.goodsImg" width="100%">
                        </span>
                        <p class="type-info-right">
                          <span class="foodName">{{goods.goodsName}}</span>
                          <span class="foodPrice">￥{{goods.price}}元</span>
                        </p>
                    </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="饮料" name="fourth">
                <ul class='cookList'>
                    <li v-for="(goods,index) in typeGoods4" :key="index">
                        <span class="foodImg">
                          <img :src="goods.goodsImg" width="100%">
                        </span>
                        <p class="type-info-right">
                          <span class="foodName">{{goods.goodsName}}</span>
                          <span class="foodPrice">￥{{goods.price}}元</span>
                        </p>
                    </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import leftNav from '@/components/commons/leftNav'
  // 调整高度
  function resize () {
    let orderHeight = document.body.clientHeight
    document.getElementById('order-list').style.height = orderHeight + 'px'
  }

  export default {
    name: 'Pos',
    components: {
      leftNav
    },
    data () {
      return {
        activeName: 'first',
        classification: 'first',
        currentDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        totalMoney: 0,
        totalCount: 0,
        tableData: [],
        oftenGoods: [],
        typeGoods: [],
        typeGoods2: [],
        typeGoods3: [],
        typeGoods4: []
      }
    },
    created () {
      // 常用商品接口
      axios.get('https://www.easy-mock.com/mock/5a09a4297b68855a07f77288/example/oftenGoods')
        .then(response => {
          this.oftenGoods = response.data
        })
        .catch(error => {
          console.log(error)
          this.$message.error('找不到常用商品数据！')
        })
      // 分类商品接口
      axios.get('https://www.easy-mock.com/mock/5a09a4297b68855a07f77288/example/typeGoods')
        .then(response => {
          this.typeGoods = response.data[0]
          this.typeGoods2 = response.data[1]
          this.typeGoods3 = response.data[2]
          this.typeGoods4 = response.data[3]
        })
        .catch(error => {
          console.log(error)
          this.$message.error('找不到分类商品数据！')
        })
    },
    mounted: function () {
      resize()
      window.onresize = function () {
        resize()
      }
    },
    methods: {
      handleClick () {},
      errorBtn () {
        this.$message.error('找不到数据！')
      },
      // 添加订单列表的方法
      addOrderList (goods) {
        console.log(goods)
        this.totalCount = 0
        this.totalMoney = 0
        let isHave = false
        // 判断是否这个商品已经存在于订单列表
        for (let i = 0; i < this.tableData.length; i++) {
          console.log(this.tableData[i].goodsId)
          if (this.tableData[i].goodsId === goods.goodsId) {
            isHave = true
          }
        }
        // 根据isHave的值判断订单列表中是否已经有此商品
        if (isHave) {
          // 存在就进行数量添加
          let arr = this.tableData.filter(o => o.goodsId === goods.goodsId)
          arr[0].count++
          arr[0].price += goods.price
          console.log(arr)
        } else {
          // 不存在就推入数组
          let newGoods = {
            goodsId: goods.goodsId,
            goodsName: goods.goodsName,
            price: goods.price,
            count: 1
          }
          this.tableData.push(newGoods)
        }
  
        this.getAllMoney()
      },
      // 删除单个商品
      delSingleGoods (goods) {
        console.log(goods)
        this.tableData = this.tableData.filter(o => o.goodsId !== goods.goodsId)
        this.getAllMoney()
      },
      // 汇总数量和金额
      getAllMoney () {
        this.totalCount = 0
        this.totalMoney = 0
        if (this.tableData) {
          this.tableData.forEach((element) => {
            this.totalCount += element.count
            this.totalMoney = this.totalMoney + (element.price * element.count)
          })
        }
      },
      // 删除所有商品
      delAllGoods () {
        this.tableData = []
        this.totalCount = 0
        this.totalMoney = 0
        this.$message.error({
          message: '已经清空',
          center: true
        })
      },
      checkout () {
        if (this.totalCount !== 0) {
          this.tableData = []
          this.totalCount = 0
          this.totalMoney = 0
          this.$message({
            message: '结账成功，感谢你又为店里出了一份力!',
            type: 'success'
          })
        } else {
          this.$message.error('不能空结。老板了解你急切的心情！')
        }
      }
    }
  }
</script>

<style scoped>
  .icon-list {
    margin-top: 10px;
  }
  
  .title-list {
    text-align: center;
    background-color: #fff;
  }
  
  .left-box {
    border-right: 1px solid #ededed;
  }
  
  .operation-btn {
    margin-top: 10px;
  }
  
  .title {
    height: 20px;
    border-bottom: 1px solid #D3DCE6;
    background-color: #F9FAFC;
    padding: 10px;
    text-align: left;
  }
  
  .often-goods-list ul li {
    list-style: none;
    float: left;
    border: 1px solid #E5E9F2;
    padding: 10px;
    margin: 5px;
    background-color: #fff;
    cursor: pointer;
  }
  
  .often-goods-list ul li:hover {
    border-color: #409eff;
  }
  
  .often-goods-list {
    border-bottom: 1px solid #ededed;
  }
  
  .o-price {
    color: #58B7FF;
  }
  
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  
  .button {
    padding: 0;
    float: right;
  }
  
  .image {
    width: 100px;
    margin: 0 auto;
    display: block;
  }
  
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  
  .clearfix:after {
    clear: both
  }
  
  .cookList li {
    list-style: none;
    width: 23%;
    border: 1px solid #E5E9F2;
    height: auot;
    overflow: hidden;
    background-color: #fff;
    padding: 2px;
    float: left;
    margin: 2px;
    cursor: pointer;
  }
  
  .foodImg {
    width: 40%;
    display: block;
    float: left;
  }
  
  .foodName {
    font-size: 18px;
    color: brown;
    display: block;
    text-align: center;
  }
  
  .foodPrice {
    font-size: 16px;
    padding-top: 10px;
    text-align: center;
  }
  
  .cookList li:hover {
    border-color: #409eff;
  }
  
  .type-info-right {
    float: left;
    width: 60%;
  }
  
  .main {
    float: left;
    width: 95%;
    background-color: #EFF2F7;
    height: 100%;
    overflow: auto;
  }
  
  .pos {
    height: 100%;
  }
</style>