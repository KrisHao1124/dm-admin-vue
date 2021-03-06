<template>
  <div>
    <div class="register-wrap">
      <divide-animation></divide-animation>
      <single-transition  @OutEnd="closeRegisterForm">
        <div class="register-form-container">
          <el-form  :status-icon="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="register-form">
            <div class="title">注       册</div>
            <el-form-item label="用户名" prop="username">
              <el-input  prefix-icon="el-icon-edit-outline" placeholder="输入账户的用户名" v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" prefix-icon="el-icon-view" placeholder="输入账户的密码" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkedPassword">
              <el-input  type="password" placeholder="再次确认密码" v-model="ruleForm.checkedPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="学号/工号" prop="studentId">
              <el-input placeholder="根据身份输入您的学号/工号" v-model="ruleForm.studentId"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="studentName">
              <el-input placeholder="输入你的姓名" v-model="ruleForm.studentName"></el-input>
            </el-form-item>
            <el-form-item label="年级" prop="grade">
              <el-select v-model="ruleForm.grade" placeholder="请选择年级">
                <el-option v-for="(grade,index) in gradeOptions"
                           :label="grade"
                           :value="grade"
                           :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级" prop="className">
              <el-select v-model="ruleForm.className" placeholder="请选择班级">
                <el-option v-for="(className,index) in classNameOptions"
                           :label="className" :value="className"
                           :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专业" prop="profession">
              <el-select v-model="ruleForm.profession" placeholder="请选择专业">
                <el-option v-for="(profession,index) in professionOptions"
                           :label="profession"
                           :value="profession" :key="index">
                </el-option>
              </el-select>
            </el-form-item>
            <el-button :loading="loading" type="primary" size="medium" style="margin-left:58px;width: 300px" @click="submitForm('ruleForm')">确认注册</el-button>
            <el-button size="medium" style="margin-left:58px;width: 145px" @click="resetForm('ruleForm')">重置</el-button>
            <el-button type="danger" size="medium" style="margin-top:10px;margin-left:5px;width: 145px" @click="handleReturn">返回</el-button>
          </el-form>
        </div>
      </single-transition>
    </div>
  </div>
</template>

<script>
  import {createStuAccount,createStuUsername} from "../../api/token";
  import { isWscnEmail } from '@/utils/validate';
  import DivideAnimation from '@/components/animate_svg/DivideAnimation';
  import Loading from '@/components/animate_svg/Loading';
  import AnimateTransition from '@/components/transition/AnimateTransition';
  import SingleTransition from '@/components/transition/SingleTransition.vue';
  import FadeTransition from '@/components/transition/FadeTransition';
  import * as validator from '../../utils/validate';
  export default {
    name: 'register-form',
    data() {
      const validateUsername = (rule, value, callback) => {
        let trim = value.trim();
        if (!validator.validateUsername(trim)) {
          callback(new Error("用户名4-16位字母、数字、下划线、减号组成"));
        }
        else{
          createStuUsername(trim).then((res) =>{
            if(res){
              callback();
            }
            else{
              callback(new Error('用户名已注册'));
            }
          }).catch(err=>{
            callback(new Error("未知错误"));
          })
        }
      };
      const validatePass = (rule, value, callback) => {
        if (!validator.validatePass(value)) {
          callback(new Error('密码必须由6-20个字母、数字、下划线组成'));
        } else {
          if (this.ruleForm.checkedPassword !== '') {
            this.$refs.ruleForm.validateField('checkedPassword');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (!validator.validatePass(value)) {
          callback(new Error('密码必须由6-20个字母、数字、下划线组成'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validateStuId = (rule, value, callback) => {
        if (!validator.validateStuId(value)) {
          callback(new Error('学号必须由字母、数字组成'));
        } else {
          callback();
        }
      };
      const validateChName = (rule, value, callback) => {
        if (!validator.validateZh(value)) {
          callback(new Error('姓名只含中文'));
        } else {
          callback();
        }
      };
      return {
        closeRegisterForm:false,
        loading:false,
        ruleForm: {
          username: '',
          studentId: '',
          password: '',
          checkedPassword:'',
          studentName: '',
          className: '',
          profession: '',
          grade:''
        },
        classNameOptions:[
          '软工一班',
          '软工二班',
          '计科一班',
          '计科二班',
          '智能一班',
          '智能二班',
          '网工一班',
          '网工二班'
        ],
        gradeOptions:[
          '2018级',
          '2017级',
          '2016级',
          '2015级',
          '2013级'
        ],
        professionOptions:[
          '计算机科学与技术',
          '软件工程',
          '网络工程',
          '人工智能'
        ],
        rules: {
          password: [
            { required:true, validator: validatePass, trigger: 'blur' }
          ],
          checkedPassword: [
            { required:true, validator: validatePass2, trigger: 'blur' }
          ],
          username: [
            {required:true,validator:validateUsername, trigger: 'blur'},
          ],
          studentId:[{required:true,validator:validateStuId,trigger: 'blur'}],
          profession:[{required:true,message:'专业不能为空',trigger: 'blur'}],
          studentName:[{required:true,validator:validateChName,trigger: 'blur'}],
          className:[{required: true,message:'班级不能为空',trigger: 'blur'}],
          grade:[{required: true,message:'年级不能为空',trigger: 'blur'}]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            //对账号密码进行修剪,去空格
            this.ruleForm.password = this.ruleForm.password.trim();
            this.ruleForm.username = this.ruleForm.username.trim();
            createStuAccount(this.ruleForm).then(res => {
              this.loading = false;
              this.$message.success("注册成功。" + res.studentName + '，欢迎你');
              this.$router.push({path: '/login'});
            }).catch(error => {
              this.loading = false;
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleReturn() {
        this.$router.push({path: '/login'});
      }
    },
    components: {
      DivideAnimation,
      Loading,
      FadeTransition,
      SingleTransition
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  div{
    background-color:transparent;
    margin:0px auto;
    font-size:16px;
  }
  .register-form-container {
    //      @include relative;
    /*position: absolute;*/
    /*float: left;*/
    position: relative;;
    left: 50%;
    top: 8%;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
  }
  .title {
    margin-left: 145px;
    margin-top: 20px;
    margin-bottom: 40px;
    font: bold 46px 微软雅黑;
    color: black;
  }
  .updown{
    margin-top: 20px;
    margin-bottom: 20px;
    font-size:16px;
  }
  .register-form {
    position: absolute;
    width: 400px;
    margin-left: -200px;
    margin-top: 20px;
    padding: 35px 35px 15px 5px;
    border-radius: 15px;
    border: 1px solid rgba(0, 0, 0, .12);
    background: rgba(0, 0, 0, .04);
  }
  .register-wrap{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #ffbdbd;
    /*text-align: center;*/
  }
  .title-font-style{
    font-weight:bold;
  }
  /*.data-set-file-container {*/
  /*margin-top: 40px;*/
  /*}*/
  .file-download-a{
    background: 0 0;
    font-style: italic;
    text-decoration: none;
    cursor: pointer;
    transition: color .2s ease;
  }

  .page-style{
    margin-top: 50px;
  }

  .file-alert{
    margin-top: 3px;
    border: 1px solid #d5e8fc;
    background-color: #eaf4fe;
  }
  .file-download-size{
    color: #ffac2d;
    position: absolute;
    right:10%;
  }
  .btn-download-sets{
    margin-left: 10px;
  }
  .checkbox-container{
    position: absolute;
    right: 0;
  }

  .data-set-file-spin-container{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
    background-color: hsla(0,0%,100%,.9);
  }
  .dataSetCard{
    background-color: transparent;
    font-size:16px;
  }

  .list-complete-item {
    transition: all 1s;
    display: inline-block;
  }
  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
</style>
