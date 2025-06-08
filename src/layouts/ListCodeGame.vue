<template>

<div id="listcode_general">
    <button @click="AddAllCode()" id="btn_addcode">Add Code</button>
    <div class="table_container">
        <table style="width: 100%;">
        <tr class="header">
            <th>ID Game</th>
            <th>Code</th>
            <th>Price</th>
            <th>Created At</th>        
            <th>Actions</th>        
        </tr>
        <!-- dùng v-for lặp hết -->
        <!-- ví dụ tạo nhiều dòng -->
        <tr v-for="(item,index) in codeList" :key="item.id" @click="selectedRow=index" :class="{KichHoat : selectedRow===index}">
            <td>{{ item.id_game }}</td>
            <td>{{ item.code}}  </td>
            <td>{{ item.price }}</td>
            <td> {{  item.created_at }}</td>
            <td> <button @click="deleteCode(item.id)" id="btn_deletecode">Delete</button></td>     
        </tr>
    </table>
    </div>
    
</div>

</template>
<script setup>
import { ref,onMounted } from 'vue';
import { supabase } from '../../public/supabase';
import {fetchAllGame} from '../service/gameService'

const selectedRow=ref();
//1. tạo mảng lưu code list từ supabase để hiện trên template
const codeList = ref([]) // ← Mảng để lưu dữ liệu từ bảng game_codes
onMounted(async()=>{
    //1.1 kéo từ supabase về
    let { data: game_codes, error } = await supabase
    .from('game_codes')
    .select('*')
    if (error) {
    console.error('Lỗi khi lấy code:', error.message)
    return
    }
    //1.2 gán cho mảng đã tạo ở trên
    codeList.value = game_codes;
})
//2. thêm code vào supabas
async function AddAllCode() {
  // 2.1. Lấy tất cả game từ API
  const temp = await fetchAllGame();

  // 2.2. Lấy danh sách id_game đã có trong Supabase
  const { data: existingCodes, error: fetchError } = await supabase
    .from('game_codes')
    .select('id_game');
    //.map() là một hàm của mảng trong JavaScript dùng để duyệt qua từng phần tử trong mảng và trả về 
    //một mảng mới, trong đó mỗi phần tử là kết quả của hàm xử lý bạn truyền vào.
   // existingCodes là kiểu [{id_game:12},..], nên map qua existingIds sẽ là [12,231,123,..]
   const existingIds = existingCodes.map(item => item.id_game);
  // 2.3. Tạo records mới, chỉ lấy những game chưa có id_game trong bảng
    //.includes() là một hàm của mảng hoặc chuỗi trong JavaScript dùng để kiểm tra 
  //xem có chứa một giá trị cụ thể hay không.
  const recordsToInsert = temp
    .filter(game => !existingIds.includes(game.id)) 
    .map(game => ({
      id_game: game.id,
      code: game.id + 'T62025',
      price: 100000
    }));

  // 2.4. Nếu không có bản ghi mới → không cần insert
  if (recordsToInsert.length === 0) {
    alert("Không có game mới để thêm!");
    return;
  }
  else{
    alert("thêm "+recordsToInsert.length+" thành công!")
  }

  // 2.5. Insert các bản ghi chưa tồn tại
  const { data, error } = await supabase
    .from('game_codes')
    .insert(recordsToInsert);

  if (error) {
    console.error('Lỗi khi thêm game_codes:', error.message);
    return;
  }

  // 2.6. Cập nhật lại danh sách codeList
  const { data: game_codes } = await supabase
    .from('game_codes')
    .select('*');
  
  codeList.value = game_codes;
}
async function deleteCode(id){
    const { error } = await supabase
    .from('game_codes')
    .delete().eq('id', id);

    if (error) {
        console.error("Lỗi khi xoá code:", error.message);
        alert("Xoá thất bại!");
        return;
    }

    // Cập nhật lại giao diện bằng cách lọc bỏ dòng vừa xoá khỏi danh sách
    codeList.value = codeList.value.filter(item => item.id !== id);
    alert("Xoá thành công!");
}
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