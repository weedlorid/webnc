<template>

    <div id="listcode_general">
        <div class="table_container">
            <table style="width: 100%;">
            <tr class="header">
                <th>Email</th>
                <th>ID Game</th>
                <th>Quantity of Code</th>        
                <th>Price</th> 
                <th>Total</th>  
                <th>Created At</th>        
            </tr>
            <!-- dùng v-for lặp hết -->
            <!-- ví dụ tạo nhiều dòng -->
            <tr v-for="(item,index) in orderList" :key="item.id" @click="selectedRow=index" :class="{KichHoat : selectedRow===index}">
                <td>{{ item.users.email }}</td>
                <td>{{ item.game_codes.id_game}}  </td>
                <td>{{ item.quantity }}</td>
                <td> {{  item.game_codes.price }}</td>
                <td> {{ item.total_price }}</td>
                <td> {{ item.created_at }}</td>     
            </tr>
        </table>
        </div>
        
    </div>
    
</template>
<script setup>
import { ref,onMounted } from 'vue';
import { supabase } from '../../public/supabase';
import { useUsersStore } from '../pinia/userStore';
const UserStore=useUsersStore();
const selectedRow=ref();
//1. tạo mảng lưu code list từ supabase để hiện trên template
const orderList = ref([]) // ← Mảng để lưu dữ liệu từ bảng game_codes
onMounted(async()=>{
   //1.1 kéo từ supabase về theo cú pháp nhiều bảng
   let { data, error } = await supabase
  .from('orders')
  .select(`
    id,
    quantity,
    total_price,
    created_at,
    users ( email ),
    game_codes ( id_game,code,price )
  `).eq('id_user',UserStore.local_id_user)
  if (error) {
    console.error("Lỗi khi lấy orders:", error.message)
    return
  }
  orderList.value = data
})

</script>

<style scoped lang="scss">
#btn_deletecode:hover{
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