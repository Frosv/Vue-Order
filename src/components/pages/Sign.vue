<template>
  <div class="sign">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="50px" class="demo-ruleForm">
      <el-form-item label="账号" prop="age">
        <el-input v-model.number="ruleForm2.age"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <router-link to="/Pos">
          <el-button type="primary">登录</el-button>
        </router-link>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      var userName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          userName: ''
        },
        rules2: {
          pass: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          userName: [{
            validator: userName,
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style>
.sign{
  width: 380px;
  margin: auto;
  height: 190px;
  padding: 20px;
  border: 1px solid #000;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}
</style>

