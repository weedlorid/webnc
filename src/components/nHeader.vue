<template>
    <div v-if="!email_pinia"><HeaderInfo></HeaderInfo></div>

<div id="header_general">
    <div id="nav">
        <div class="nav_item">
            <img src="../assets/logo/logo_page.webp" alt="Logo" width="40%" height="100%">
            <router-link to="/">Home</router-link>
        </div> 
        <div class="nav_item">
            <!-- kiểm tra đã đăng nhập chưa tức là đã có tài khoản được lưu trong localStorage chưa, do đăng nhập thì lưu vào, đăng xuất thì xóa đi -->
            <div class="sub_nav_item" v-if="email_pinia">
                <div>
                    <router-link to="/user/personinfo" v-if="role_pinia=='user'">{{ email_pinia }}</router-link>
                    <router-link to="/admin/personinfo" v-else >{{ email_pinia }}</router-link>
                      
                </div>
            </div>
            <div class="sub_nav_item"  v-else>
                <div><router-link to="/signup">Sign Up</router-link></div>
                <div><router-link to="/signin">Sign In</router-link></div>
            </div> 
            
        </div>
    </div>
</div>
</template>

<script setup>
import {useUsersStore} from '../pinia/userStore.js'
import {ref,computed} from 'vue'
import HeaderInfo from './HeaderInfo.vue'
//1. lấy thông tin từ pinia
const UsersStore=useUsersStore();
const email_pinia = computed(() => UsersStore.local_email_user);
const role_pinia = computed(() => UsersStore.local_role_user);

console.log(email_pinia.value +" header");
console.log(localStorage.getItem('email_user')+" header");

// const account = computed(()=>useUsersStore.local_account);
// const role = computed(()=>useUsersStore.local_role);

</script>

<style lang="scss" scoped>
$bg-color1:#000229;
$bg-color2:#00010f;
a{
    color: white;
    line-height: 100px;
    text-decoration: none;
    margin-left: 20px ;
    &:hover{
        cursor: pointer;
        color: #ccc;
    }
}
#nav .nav_item:nth-child(2) { // đẩy đăng ký/đăng nhập qua phải
    justify-content: right !important;
}
#nav,#nav .nav_item,#nav .nav_item:nth-child(2) .sub_nav_item{ // thẻ nav , .nav_item và nav nhỏ sub_nav_item của nav_item thứ 2
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
}

#nav .nav_item{ //css nav item, chia nav chung thành 2 nav nhỏ (nav item)
    width: 50%;
    height: 100%;
}
#nav{ // nav chung
    width: 80%;
    height: 100%;
    margin: auto;
    
}
#header_general{ //header chung
    width: 100%;
    height: 100px;
    background-color:  #00023F;
    position:sticky;
    z-index: 20;
    top: 0;
    left: 0;
}

</style>