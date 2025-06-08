<template>
    <!-- user chung -->
    <div id="user_general">
        <!-- user sẽ có 2 phần : left(mục để chọn) và right(nội dung mục được chọn) -->
        <!-- đặt left và right vào user_section -->
        <div id="user_section"> 
            <div class="user_sub_section" id="user_left">
                <ul id="nav">
                    <!-- <li><p>UserAccount</p></li> -->
                    <li><router-link to="/user/personinfo">Personal Info</router-link></li>
                    <li><router-link to="/user/orderuser">Orders</router-link></li>
                    <li><router-link to="/user/favoritegames">Favorite Games</router-link></li>
                    <li><button id="logout" @click="DangXuat">Log Out</button></li>
                </ul>
            </div>
            <div class="user_sub_section" id="user_right">
                <!-- hiển thị component được chọn từ router-link -->
                <router-view></router-view>
            </div>

        </div>

    </div>

</template>

<script   setup>
import { useRouter } from 'vue-router';
import { supabase } from '../../public/supabase';
import {useUsersStore} from '../pinia/userStore.js'
const router=useRouter();
// tạo biến lưu tempusersstore 
const logout=useUsersStore();

const DangXuat = async ()=>{
    // xóa thông tin đăng nhập nếu có lưu ở  localStorage
    // chuyển hướng về trang chủ
    
    logout.logout();
    let { error } = await supabase.auth.signOut()
    router.push('/');
}
</script>

<style scoped lang="scss">
$color_letter:#00023F;
#logout{ //css cho logout riêng
    border: none;
    background-color: white;
    &:hover{
        cursor: pointer;
    }   
}
a.router-link-active,a:hover,#logout:hover{
    background-color: $color_letter;
    color: white;
}
#nav>li,a,#logout{
    display: block;
    width: 100%;
    line-height: 100px;
    text-align: center;
}
a,#nav p,#logout{ 
    color: $color_letter;
    font-size: 1.5em;
}
a{ //css chung cho thẻ a
    text-decoration: none;
}
#user_left,#user_right{ // css chung 2 th
    border: 1px solid #ccc;
    box-shadow: 0 0 2px #ccc;
}
#user_right{ //css thằng right 
    width: 75%;
}
#user_left{ //css thằng left 
    width: 20%;
}
#user_section{ // hiển thị left và right theo flex
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
}
#user_general{ // css cho phần nội dung chung của user
    padding: 50px 0;
    width: 100%;
   
}
</style>