// # Quản lý trạng thái (nếu dùng Pinia hoặc Vuex)
import { defineStore } from "pinia";
import {ref} from 'vue';

export const useUsersStore = defineStore('User',()=>{
    //1. lưu thông tin về user tránh bị mất khi reload trang
    let local_id_user=ref(localStorage.getItem("id_user"));
    let local_email_user=ref(localStorage.getItem("email_user"));
    let local_role_user=ref(localStorage.getItem("role_user"));
    //2. tạo hàm đăng nhập để input dữ liệu
    function login( uid,  mail,  r ) {
        local_id_user.value    = uid
        local_email_user.value = mail
        local_role_user.value  = r
        // ghi lại localStorage
        localStorage.setItem('id_user',  uid)
        localStorage.setItem('email_user', mail)
        localStorage.setItem('role_user',  r)
    }
    //3. hàm đăng xuất
    function logout () {
        local_id_user.value = local_email_user.value = local_role_user.value = '';
        localStorage.removeItem('id_user')
        localStorage.removeItem('email_user')
        localStorage.removeItem('role_user')
    }
    
    return{local_id_user,local_email_user,local_role_user,login,logout}
    
});
