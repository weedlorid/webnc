<template>
    <!-- phần div Dang Ky đặt trong Header,Footer -->
    <div id="dangnhap_general"> 
        <!-- form -->
        <div id="form_DangNhap">
            <form action="" @submit.prevent="submit_form" >
                <h1> Sign Up</h1><br>
                <!-- các item gồm label-input trong form -->
                <div class="form_item">
                    <label for="taikhoan">Email:</label>
                    <input type="email" name="email_form" id="email" required v-model="email_form" tabindex="1">
                </div>
                <div class="form_item">
                    <label for="matkhau">Password:</label>
                    <input type="password" name="matkhau1" id="matkhau1" required v-model="matkhau1" tabindex="2">
                </div>
                <div class="form_item">
                    <label for="matkhau">Again Password:</label>
                    <input type="password" name="matkhau2" id="matkhau2" required v-model="matkhau2" tabindex="2">
                </div>
                <div class="btn">
                    <button type="submit" tabindex="3">Submit</button>
                </div>
            </form>
            <router-link to="/signin" id="forget_pass">Have Account?</router-link>
        </div>
    </div>

</template>
<script setup>
import { useRouter } from 'vue-router';
import { supabase } from '../../public/supabase';
import {ref  } from 'vue'
import {useUsersStore} from '../pinia/userStore.js';
const router=useRouter();
//1. tạo biến từ form
const email_form=ref("");
const matkhau1=ref("");
const matkhau2=ref("");
//2. chạy hàm khi submit
async function submit_form(){
    if(matkhau1.value!=matkhau2.value){
        alert("Passwords are not same!"); 
        return;
    }
    //2.1 cú pháp sign up từ supabase
    let { data, error } = await supabase.auth.signUp({
    email: email_form.value,
    password: matkhau2.value
    })
    if (error) {
        console.error("Đăng ký thất bại:", error.message);
        alert("Sign up failed: " + error.message);
        return;
    }
    else{
        alert("Sent Confirmation To Your Email " );
        router.push("/");
    }
   
}

</script>

<style scoped lang="scss">
    #forget_pass{
        text-align: center;
        display: block;
        color: white;
        text-decoration: none;
        &:hover{
            color: #ccc;
            cursor: pointer;

        }
    }
    form .btn{
        width: 100%;
    }
    form .btn button{ // css cho button
        width: 20%;
        padding: 10px;
        border-radius: 10px;
        &:hover{
            opacity: 0.9;
            cursor: pointer;
        }
       
    }
    form .form_item label,form .form_item input{ // css cụ thể label,input
        width: 45%;
    }
    form .form_item{ // css các item form chứa label và input
        margin: 5% auto;
        font-size: 1.2em;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        width: 80%;
    }
    form h1,form .btn{ // căn giữa cho h1, và button
        text-align: center;
    }
    form{ 
        padding: 2%;
        color: white;
    }
    #form_DangNhap{ // nền form
        width: 40%;
        height: 50%;
        background-color: rgba(0, 0, 0, 0.6);
        margin: auto;
        transform: translateY(50%);
        border-radius: 10px;
        box-shadow: 0 0 5px 2px   #ccc;
       
    }
    #dangnhap_general{  // background chung
        background: url('../assets/thumbnail/anhDangKyDangNhap.jpeg') no-repeat  ;
        background-size: 100% 100%;
        width: 100%;
        height: 100vh;
    }

</style>