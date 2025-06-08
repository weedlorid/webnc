<template>
    <!-- phần div Dang Ky đặt trong Header,Footer -->
    <div id="dangnhap_general"> 
        <!-- form -->
        <div id="form_DangNhap">
            <form action="" @submit.prevent="submit_form" >
                <h1>Sign In</h1><br>
                <!-- các item gồm label-input trong form -->
                <div class="form_item">
                    <label for="taikhoan">Email:</label>
                    <input type="email" name="email_form" id="email" required v-model="email_form" tabindex="1">
                </div>
                <div class="form_item">
                    <label for="matkhau">Password:</label>
                    <input type="password" name="matkhau" id="matkhau" required v-model="matkhau" tabindex="2">
                </div>
              
                <div class="btn">
                    <button type="submit" tabindex="3">Submit</button>
                </div>
            </form>
            <router-link to="/forgetpassword" id="forget_pass">Forget Password?</router-link>
        </div>
    </div>

</template>

<script setup>
import { supabase } from '../../public/supabase';
import {ref  } from 'vue'
import {useUsersStore} from '../pinia/userStore.js';
import { useRouter } from 'vue-router';

const router = useRouter();
let UsersStore=useUsersStore();
//1. tạo biến lưu email và đăng nhập trong form
var email_form=ref("");
var matkhau=ref("");
//2. kiểm tra đăng nhập
async function submit_form(){
    //2.1 cú pháp này trên trang supabase https://supabase.com/dashboard/project/iggijiewrzojtklmuonx/api?resource=users
    
    let { data, error:signin_err } = await supabase.auth.signInWithPassword({
    email: email_form.value,
    password: matkhau.value
    })
    console.log('Signin error:', signin_err);
    console.log('Signin data:', data);
     // //2.2 nếu có lỗi sẽ return
    if(signin_err){
        console.error("Đăng nhập thất bại:", signin_err.message);
        alert("Wrong Account or PassWord " );
        return;
    }
   
    //2.3 Nếu đăng nhập thành công, tiếp tục lấy user từ data trên, do data sẽ có các thuộc tính session, user,..
    const { user } = data;

    // 2.4 kiểm tra xem đã có user này chưa? và thông báo lỗi nếu có
    let { data: users, error: selectError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id); // lọc theo id cho đúng
    if (selectError) {
        console.error("Lỗi khi truy vấn bảng users:", selectError.message);
        return;
    }
    else{
        console.log(users);
    }
    // 2.4.1 do lấy về là mảng nên users phải kiểm tra
    if(users  && users.length > 0){     
       //lấy phần tử đầu tiên trong mảng
       const u = users[0];
       UsersStore.login(u.id,u.email,u.role);
       router.push('/');
    }
    else{
     // Nếu chưa có user trong bảng user thì insert
    await supabase.from('users').insert([
      {
        id: user.id,
        email: user.email,
        role: 'user',
        phone: '',
        address: ''
      }
      
    ]);
    UsersStore.login(user.id, user.email, 'user');
    router.push('/');

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