<template>
    <div id="lishsugiaodich_general">
        <div class="table_container">
            <table>
            <tr class="header">
                <th>Thumbnal</th>
                <th>ID Game</th>
                <th>Name</th>
                <th>Genre</th>
                <th>Platform</th>
                <th>Actions</th>          
            </tr>
            <!-- dùng v-for lặp hết -->
            <!-- ví dụ tạo nhiều dòng -->
            <tr v-for="(game,index) in favgame_list" :key="game.id" @click="selectedRow=index" :class="{KichHoat : selectedRow===index}">
                <td>
                    <img :src="game.thumbnail" alt="" width="100px" height="70px">            
                </td>
                <td>{{ game.id }}</td>
                <td>{{ game.title }}</td>
                <td> {{ game.genre }}</td>
                <td>{{ game.platform }}</td>
                <td >
                    <button @click="openDetail(game.id)" class="btn_action" >Detail</button>
                    <button @click="deleteGame(game.id)" class="btn_action">Delete</button>
                </td>
              </tr>
        </table>
        </div>
        <div v-show="isShow"> 
        <!-- lấy emit từ con  và truyền giá trị props vào con -->
        <DetailGame :id_game="id_game" @CloseModal="GetCloseModal"/> 
         </div>    
    </div>

</template>
<script setup>
import { ref,onMounted } from 'vue';
import { supabase } from '../../public/supabase';
import { useUsersStore } from '../pinia/userStore'
import {fetchGameById} from '../service/gameService'
import DetailGame from '../components/DetailGame.vue'
const UsersStore = useUsersStore()
// đổi màu khi chọn hàng
const selectedRow = ref(null);
//hiện component con
const isShow=ref(false);
const id_game=ref(0);
function openDetail(id){
    id_game.value=id;
    isShow.value=true;
}
// đóng component con
function GetCloseModal(giatri){ 
    isShow.value=giatri; 
    id_game.value=0; 
} 
// xóa game
async function deleteGame(id){
    const { error } = await supabase
    .from('fav_games')
    .delete()
    .eq('id_game', id)
    .eq('id_user',id_user)
    if (error) {
    console.error("Xoá không thành công:", error.message);
    return;
    }
    // Xoá khỏi danh sách hiện tại trong favgame_list, lọc các game không bằng id thành 1 mảng
    // gán lại mảng đó
    favgame_list.value = favgame_list.value.filter(game => game.id !== id);
}
// lấy id người dùng đã đăng nhập để lọc game từ bảng fav_games
const id_user = UsersStore.local_id_user  
//1. tạo mảng để lưu game
const favgame_list=ref([]);
onMounted(async () => {
  // 1. Lấy danh sách từ bảng fav_games
  const { data: fav_games, error } = await supabase
    .from('fav_games')
    .select('*')
    .eq('id_user', id_user);

  if (error) {
    console.error('Lỗi khi lấy fav_games:', error.message);
    return;
  }

  // 2. Lặp từng id_game, gọi fetchGameById để lấy chi tiết game
  for (const row of fav_games) {
    const game = await fetchGameById(row.id_game);
    if (game) { // nếu game có tồn tại
      favgame_list.value.push(game);
    }
  }
});



</script>

<style scoped lang="scss">
.btn_action{
    width: 70px; height: 30px;margin:0 10px 0 10px;
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
}
th{
    background-color: #00023F;
    color: white;
    min-width: 200px;    
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