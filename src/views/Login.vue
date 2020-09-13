<template>
  <div class="login">
      <el-form 
      ref='form' 
      :model="user" 
      label-width="80px"
      class="form"
      :rules='rules'
      >
      <el-form-item label="账号" prop="username">
       <el-input
        v-model="user.username"
        placeholder="请输入用户名"
        clearable
        ></el-input>
    </el-form-item>
     <el-form-item label="密码" prop='password'>
     <el-input 
     v-model="user.password"
     type="password"
     placeholder="请输入密码"
     show-password
     @keyup.enter.native="login"
     ></el-input>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login">登陆</el-button>
    <el-button @click="reset">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
data(){
   return{
        user:{
            username:'',
            password:''
    },
        rules:{
            username:[
                {required:true,message:'用户名不能为空',trigger:'change'},
                {
                    pattern:/^[a-z0-9A-Z]{5,11}$/,
                    message:'用户名长度为5-11位',
                    trigger:'change'       
                }
            ],
            password:[
                {required:true,message:'密码不能为空',trigger:'change'},
                {
                    pattern:/^[a-z0-9A-Z]{3,12}$/,
                    message:'密码长度为3-12位',
                    trigger:'change'
                }
            ]
        }
   }
},
methods:{
    async login() {
      // 表单校验
      try {
        await this.$refs.form.validate()
      } catch {
        // 失败
        return console.log('校验失败')
      }
      // 发送请求
      const res = await this.$axios.post('/login', this.user)
      const { statusCode, message, data } = res
      if (statusCode === 200) {
        // alert(message)
        this.$message.success(message)
        // 存token
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        // 跳转到首页
        this.$router.push('/')
      } else {
        this.$message.error(message)
      }
    },
    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss">
.login{
    height: 100%;
    display: flex;
    align-items:center;
    justify-content: center;
    .form{
        width: 400px;
        height: 200px;
        border: 1px solid #000;
        padding: 20px;
    }
}
</style>