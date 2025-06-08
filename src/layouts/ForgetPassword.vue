<template>
    <!-- phần div Dang Ky đặt trong Header,Footer -->
    <div id="khoiphuctk_general"> 
        <!-- form -->
        <div id="form_KhoiPhucTK">
            <!-- v-if="changeFormState" -->
            <form action="" @submit.prevent="sendRecoveryEmail" >
                <h1> Recovery Password</h1><br>
                <!-- các item gồm label-input trong form -->
                
                <div class="form_item">
                    <label for="email">Email:</label>
                    <input type="email" name="email" id="email" required v-model="email">
                </div>
                
                <div class="btn">
                    <button type="submit">Submit</button>
                </div>
            </form>
           
        </div>
    </div>

</template>

<script setup>
import { supabase } from '../../public/supabase';
import {ref  } from 'vue'
import {useUsersStore} from '../pinia/userStore.js';
import { useRouter } from 'vue-router';

//1. biến email lưu email được nhập từ input
const email = ref('')
//2. khi submit thì gửi link đăng nhập qua email, lấy direct link 
// chạy trên local thì vào env đổi VITE_REDIRECT_URL là localhost:5173/ + với trang trả về
const url = import.meta.env.VITE_REDIRECT_URL;
const sendRecoveryEmail = async () => {
  const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: url // URL tới File 2
  })
  if (error) {
    alert('Gửi email thất bại: ' + error.message)
  } else {
    alert('Kiểm tra email để đặt lại mật khẩu.')
  }
}
</script>

<style scoped lang="scss">
    form .btn {
        width: 100%;
    }
    form .btn button{ // css cho button
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
    #form_KhoiPhucTK{ // nền form
        width: 40%;
        height: 30%;
        background-color:rgba(0, 0, 0, 0.6);
        margin: auto;
        transform: translateY(50%);
        border-radius: 10px;
        box-shadow: 0 0 5px 2px   #ccc;
       
    }
    #khoiphuctk_general{  // background chung
        background: url('../assets/thumbnail/anhDangKyDangNhap.jpeg') no-repeat  ;
        background-size: 100% 100%;
        width: 100%;
        height: 100vh;
    }

</style>