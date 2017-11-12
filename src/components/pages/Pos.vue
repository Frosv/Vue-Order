<template>
  <div class="pos">
    <div>
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
                            <el-button type="primary" size="mini">查看</el-button>
                            <el-button type="success" size="mini">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>

            <div class="operation-btn">
              <el-button type="warning" @click="open">挂单</el-button>
              <el-button type="danger" @click="open">删除</el-button>
              <el-button type="success" @click="open">结账</el-button>
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
                <li v-for="(food,index) in oftenGoods" :key="index">
                  <span>{{food.goodsName}}</span>
                  <span class="o-price">￥{{food.price}}元</span>
                </li>
              </ul>
            </div>

            <el-tabs v-model="classification" type="card" @tab-click="handleClick">
              <el-tab-pane label="套餐" name="first">
                <el-row>
                  <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
                    <el-card :body-style="{ padding: '0px' }">
                      <img src="../../assets/logo.png" class="image">
                      <div style="padding: 14px;">
                        <span>好吃的汉堡</span>
                        <div class="bottom clearfix">
                          <time class="time">{{ currentDate }}</time>
                          <el-button type="text" class="button">操作按钮</el-button>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="汉堡" name="second">汉堡</el-tab-pane>
              <el-tab-pane label="小食" name="third">小食</el-tab-pane>
              <el-tab-pane label="饮料" name="fourth">饮料</el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  // 调整高度
  function resize () {
    let orderHeight = document.body.clientHeight
    document.getElementById('order-list').style.height = orderHeight + 'px'
  }
  export default {
    name: 'Pos',
    data () {
      return {
        activeName: 'first',
        classification: 'first',
        currentDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
        tableData: [{
  
          goodsName: '可口可乐',
          price: 8,
          count: 2
        }, {
  
          goodsName: '香辣鸡腿堡',
          price: 15,
          count: 1
        }, {
  
          goodsName: '爱心薯条',
          price: 8,
          count: 3
        }, {
  
          goodsName: '甜筒',
          price: 8,
          count: 7
        }],
        oftenGoods: [{
          goodsId: 1,
          goodsName: '香辣鸡腿堡',
          price: 18
        }, {
          goodsId: 2,
          goodsName: '田园鸡腿堡',
          price: 15
        }, {
          goodsId: 3,
          goodsName: '和风汉堡',
          price: 15
        }, {
          goodsId: 4,
          goodsName: '快乐全家桶',
          price: 80
        }, {
          goodsId: 5,
          goodsName: '脆皮炸鸡腿',
          price: 10
        }, {
          goodsId: 6,
          goodsName: '魔法鸡块',
          price: 20
        }, {
          goodsId: 7,
          goodsName: '可乐大杯',
          price: 10
        }, {
          goodsId: 8,
          goodsName: '雪顶咖啡',
          price: 18
        }, {
          goodsId: 9,
          goodsName: '大块鸡米花',
          price: 15
        }, {
          goodsId: 20,
          goodsName: '香脆鸡柳',
          price: 17
        }]
      }
    },
    mounted: function () {
      resize()
      window.onresize = function () {
        resize()
      }
    },
    methods: {
      handleClick (tab, event) {
        // console.log(tab, event)
      },
      open () {
        this.$message({
          message: '居中',
          center: true
        })
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

  .often-goods-list{
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
</style>