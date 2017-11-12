<template>
  <div class="pos">
    <div>
      <el-row>
        <el-col :span='7' class="title-list" id="order-list">
          <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
            <el-tab-pane label="点餐" name="first">
  
              <!-- 表格 -->
              <el-table :data="tableData" border show-summary style="width: 100%">
                <el-table-column prop="goodsName" label="商品"></el-table-column>
                <el-table-column prop="count" label="量" width="50"></el-table-column>
                <el-table-column prop="price" label="金额" width="70"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                      <el-button type="text" size="small">查看</el-button>
                      <el-button type="text" size="small">编辑</el-button>
</template>
                </el-table-column>
              </el-table>
  
            </el-tab-pane>
            <el-tab-pane label="挂单" name="second">挂单</el-tab-pane>
            <el-tab-pane label="外卖" name="third">外卖</el-tab-pane>
          </el-tabs>
        </el-col>
        <!--商品展示-->
        <el-col :span="17" class="title-list">
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
        tableData: [{
  
          goodsName: '可口可乐',
          price: 8,
          count: 1
        }, {
  
          goodsName: '香辣鸡腿堡',
          price: 15,
          count: 1
        }, {
  
          goodsName: '爱心薯条',
          price: 8,
          count: 1
        }, {
  
          goodsName: '甜筒',
          price: 8,
          count: 1
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
</style>