<template>

    <div id="userlist_general">
        <div class="table_container">
            <table style="width: 100%;">
            <tr class="header">
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Created At</th>        
                <th>Actions</th>        
            </tr>
            <!-- dùng v-for lặp hết -->
            <!-- ví dụ tạo nhiều dòng -->
            <tr v-for="(item,index) in userlist" :key="item.id" @click="selectedRow=index" :class="{KichHoat : selectedRow===index}">
                <td>{{ item.email }}</td>
                <td>{{ item.phone}}  </td>
                <td>{{ item.address }}</td>
                <td> {{  item.created_at }}</td>
                <td> <button @click="deleteUser(item.id)" id="btn_deleteuser" v-if="item.role!='admin'">Delete</button></td>     
            </tr>
        </table>
        </div>
        
    </div>
    
</template>
<script setup>
import { ref,onMounted } from 'vue';
import { supabase } from '../../public/supabase';


const selectedRow=ref();
//1. tạo mảng lưu user list từ supabase để hiện trên template
const userlist = ref([]) // ← Mảng để lưu dữ liệu từ bảng user
onMounted(async()=>{
    //1.1 kéo từ supabase về
    const { data: users, error } = await supabase
    .from('users').select('*');
    if (error) {
        console.error('Lỗi khi lấy danh sách users:', error.message);
        return;
    }
    //1.2 gán cho mảng đã tạo ở trên
    userlist.value = users;
})

async function deleteUser(id){
    // do có 3 bảng liên quan nên phải xóa cả 3 bảng từ khóa ngoại trước
    // bảng fav_games
    const { error:fav_err } = await supabase
    .from('fav_games')
    .delete().eq('id_user', id)
    if (fav_err) {
        console.error("Lỗi khi xoá :", error.message);
        alert("Xoá thất bại!");
        return;
    }
    //bảng orders
    const { error:order_err } = await supabase
    .from('orders')
    .delete().eq('id_user', id)
    if (order_err) {
        console.error("Lỗi khi xoá :", error.message);
        alert("Xoá thất bại!");
        return;
    }
    //bảng user
    const { error: user_err } = await supabase
    .from('users')
    .delete()
    .eq('id', id)
    if (user_err) {
        console.error("Lỗi khi xoá :", error.message);
        alert("Xoá thất bại!");
        return;
    }

    // Cập nhật lại giao diện bằng cách lọc bỏ dòng vừa xoá khỏi danh sách
    userlist.value = userlist.value.filter(item => item.id !== id);
    alert("Xoá thành công!");
}
</script>

<style scoped lang="scss">
#btn_deleteuser:hover{
    cursor: pointer;
}
#btn_addcode{
    width: 120x;
    padding: 5px;
    margin: 0px 0px 20px 0px;
    font-weight: bold;
    font-size: 1.2em;
    &:hover{
        cursor: pointer;
    }
}

.KichHoat{
    background-color: #00023F;
    color: white;
}
tr:hover{
    cursor: pointer;
}
.header{ // css th giữ vị trí
    position: sticky;
    top:0; left: 0;
    width: 100%;
}
th{
    background-color: #00023F;
    color: white;
    min-width: 150px; 
        
}
td{
    text-align: center;
}
tr,th{
    border: none;
    white-space: nowrap; /* ngăn xuống dòng */
    font-size: 1.2em;

}
    
table {
    border-collapse: collapse;
    position: relative;
}

.table_container { // container cho table
    max-height: 500px;
    width: 100%;
    overflow: auto; // để tự động scroll nếu vượt quá
}
</style>