<template>
    <!-- phần div Dang Ky đặt trong Header,Footer -->
    <div id="khoiphuctk_general"> 
        <!-- form -->
        <div id="form_KhoiPhucTK">
            <!-- v-if="changeFormState" -->
            <form action="" @submit.prevent="updatePassword" >
                <h1> Reset Password</h1><br>
                <!-- các item gồm label-input trong form -->
                
                <div class="form_item">
                    <label for="newPassword1">New Password:</label>
                    <input type="password" name="newPassword1" id="newPassword1" required v-model="newPassword1">
                </div>
                <div class="form_item">
                    <label for="newPassword2">Again Password:</label>
                    <input type="password" name="newPassword2" id="newPassword2" required v-model="newPassword2">
                </div>
                <div class="btn">
                    <button type="submit">Submit</button>
                </div>
            </form>
           
        </div>
    </div>

</template>

<script setup>


import { ref } from 'vue'
import { supabase } from '../../public/supabase'
import { useRouter } from 'vue-router';
const router = useRouter();

const newPassword1 = ref('');
const newPassword2 = ref('');

const updatePassword = async () => {
    if(newPassword1.value!=newPassword2.value){
    alert('Password are not same!');
    return;
    }
    // lệnh này cập nhật lại mật khẩu
  const { error } = await supabase.auth.updateUser({
    password: newPassword1.value
  })
  if (error) {
    alert('Cập nhật mật khẩu thất bại: ' + error.message)
  } else {
    alert('Mật khẩu đã được cập nhật thành công.')
    router.push('/');
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
        height: 40%;
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