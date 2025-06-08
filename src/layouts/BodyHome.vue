<template>
    <div id="body_general">
        <!-- phần thumbnail -->
        <div class="body1"> 
            <img src="../assets/thumbnail/istockphoto-1376339349-612x612.jpg" alt="thumbnail" id="body_thumbnail">
        </div>
        <!-- phần chức năng: tìm kiếm, filter,.. -->
        <div class="body1" id="body_chucnang"> 
            <div class="body_chucnang1">
                <input type="text" name="search" id="search" placeholder="Search for platform,genre" v-model="search">
                <button @click="searchGame" id="btn_search">Search</button>            
            </div>
           
        </div>
        <!-- phần danh sách game -->
        <div class="body1" id="body_danhsach">    
            <!-- item game -->
            <div class="game_item" v-for="(item) in sub_games" :key="item.id">
                <img :src="item.thumbnail" alt="" width="100%" class="thumbnail_game">
                <div class="game_item_sub" style="padding: 5%;">
                    <div class="game_content">
                        <h3>{{ item.title }}</h3>
                        <p style="text-align: justify;">{{ truncateText(item.short_description,150 )}}</p>
                        <p>{{ item.release_date }} | {{ item.publisher }} </p>
                    </div>   
                    <div class="button_gameitem" >
                        <button class="detail " @click="OpenModal(item.id)">Detail</button>
                        <button class="save " @click="Save(item.id)">Save</button>
                        <button class="buy " @click="Buy(item.id)">Buy</button>
                    </div>
                </div>
            </div>        
        </div>
        <!-- nút more -->
        <div style="color: red" id="more" @click="count_game+=9"><button>More</button></div>
    </div>
    <!-- ẩn/hiện component detail_game.vue khi giá trị isShow thay đổi -->
    <div v-show="isShow"> 
        <!-- lấy emit từ con  và truyền giá trị props vào con -->
        <DetailGame :id_game="id_game" @CloseModal="GetCloseModal"/> 
    </div> 
    <div v-show="isBuy"> 
        <!-- lấy emit từ con  và truyền giá trị props vào con -->
        <CheckOutForm :id_game_buy="id_game_buy" @CloseModalBuy="GetCloseModalBuy"/> 
    </div>
</template>

<script setup>
import { ref,onMounted,computed } from 'vue'; 
import {fetchAllGame,fetchGameByPlatform,fetchGameByCategoryTag} from "../service/gameService.js";
import DetailGame from '../components/DetailGame.vue';
import { supabase } from '../../public/supabase';
import { useUsersStore } from '../pinia/userStore.js';
import CheckOutForm from '../components/CheckOutForm.vue';
const UsersStore = useUsersStore();
// 1. Hiện danh sách các game
const games=ref([]); // tạo mảng lưu mảng các đối tượng lấy từ api( json)
const count_game = ref(9) // tạo biến để hạn chế hiện số lượng game 
const sub_games =  computed(() => games.value.slice(0, count_game.value)); // mảng hiện game từ count_game
onMounted( async ()=>{ // khi bắt đầu gắn component vào
    games.value=await fetchAllGame();
} )
// 2. Hiện game theo tìm kiếm
const search=ref("");
async function searchGame() {
    const query = search.value.trim().toLowerCase();
    // Nếu để trống -> lấy tất cả game
    if (query === "") {
        games.value=await fetchAllGame();
    }
    // Nếu là platform
    else if (query === "pc" || query === "browser") {
        games.value = await fetchGameByPlatform(query);
    }
    // Nếu là tag/category
    else {
        games.value = await fetchGameByCategoryTag(query);
    }
}
// 3. Hiện chi tiết game
const isShow=ref(false); // 3.1 tạo biến boolean cho việc đóng mở model
const id_game=ref(0);// 3.2 tạo biến lưu giá trị id của item được chọn, truyền 
                     // vào hàm OpenModal để tạo props cho component con
function OpenModal(id_from_item){ // 3.3 hàm thực hiện : 
    isShow.value=true;            // - hiện thẻ div chứa component con
    id_game.value=id_from_item;   // - gán id item đc chọn cho id_game, :id_game="id_game" có dấu : là prop
                                  // nằm trong dấu " " là giá trị tức là id_game.value bên trái này
}
// 4. vào component DetailGame.vue
// 5. nhận emit từ component con @CloseModal="GetCloseModal" 
// CloseModal là emit từ con, GetCloseModal là hàm xử lý emit đó từ cha
function GetCloseModal(giatri){ // hàm xử lý giá trị từ component con là detailgame
    isShow.value=giatri; // 5.1 component con detail game truyền giá trị false, gán cho biến isShow
    id_game.value=0; // 5.2 thay đổi giá trị prop id_game là 0 
} 
//6. chức năng ngoài
function truncateText(text, maxLength) { // cắt chuỗi thông tin game cho ngắn
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
async function Save(id_game){ //nút Save Game, lưu vào supabase luôn
    //1. lấy id người dùng
    const id_user = UsersStore.local_id_user; 
    //2. kiểm tra có đăng nhập chưa, nếu chưa kết thúc
    if( !id_user){
        alert("bạn hãy đăng nhập đã!");
        return;
    }
  // 3. lấy fav game từ supabase và kiểm tra
  const { data, error } = await supabase
    .from('fav_games')
    .select('*')
    .eq('id_user', id_user)
    .eq('id_game', id_game)
   
  if (error ) { 
    console.error('Lỗi khi kiểm tra fav_game:', error.message);
    alert('Có lỗi xảy ra. Vui lòng thử lại.');
    return;
  }
   //3.1 gán data cho games do nếu bảng trống thì kéo về cũng là 1 mảng chiều dài 0
   const { games } = data;
  if (games && games.length>0) {
    // Nếu đã có dữ liệu
    console.log(data);
    alert('Game này đã được lưu vào mục yêu thích.');
    return;
  }
  // 3.2. nếu chưa có, thực hiện insert
  else{   
     const { data:insert_fav_game,error: insertError } = await supabase
    .from('fav_games')
    .insert([
      { id_user: id_user, id_game: id_game }
    ]);

    if (insertError) {
        console.error('Lỗi khi lưu game:', insertError.message);
        alert('Không thể lưu game. Vui lòng thử lại.');
        return;
    }
    alert('Đã lưu game thành công!');
    }
  
} 
//tạo biến hiển thị component thanh toán
const isBuy = ref(false);
const id_game_buy=ref(0);
async function Buy(id_game){ //nút Buy Game
    if(UsersStore.local_id_user && UsersStore.local_role_user==='user'){
        isBuy.value=true;
        id_game_buy.value=id_game;
    }
    else{
        alert('Bạn phải đăng nhập đã!');
        return;
    }
    
} 
// đóng modal buy
function GetCloseModalBuy(giatri){ // hàm xử lý giá trị từ component con là detailgame
    isBuy.value=giatri; // component con detail game truyền giá trị false, gán cho biến isShow
    id_game_buy.value=0; // thay đổi giá trị prop id_game là 0 
} 
</script>

<style lang="scss" scoped>
    // danh sách game
    #more button{// css cho nút more hiển thị danh sách dài hơn
        height: 3em;
        width: 5em;
        &:hover{
            opacity: 0.6;
            cursor: pointer;
        }
    }
    #more{ //css cho thẻ div#more chứa nút button more
        justify-content: center;
        display: flex;
        align-items: center;
        border-top: 1px solid #ccc;
        height: 100px;
        width: 80%;
        margin: auto;
    }
    .game_item_sub{ // css cho phần nội dung itemvà các nút ngang nhau giữa các item
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 220px;
    }
    #body_danhsach .game_item .button_gameitem>button{ //css  cho từng nút detail,save, buy
        width: 30%;
        font-size: 20px;
        &:hover{
            cursor: pointer;
            opacity: 0.6;
        }
    }
    #body_danhsach .game_item .button_gameitem{ // css chung cho 3 nút detail,save, buy
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
    #body_danhsach .game_item p{ // css cho từng thẻ p trong item
        margin: 5px 0;
    }
    #body_danhsach .game_item .thumbnail_game:hover{ // css cho ảnh từng item game
        opacity: 0.8;
        cursor: pointer;
        transform : scale(1.1);
        transition: transform 1s;
    }
    #body_danhsach .game_item{ // css chung cho từng item
        border: 1px solid #ccc;
        width: 28%;
        margin: 5px ;
        justify-content: space-between;
        overflow: hidden;
    }
 
    #body_danhsach{ //css cho phần danh sách game chung để hiển thị game_item
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 5%;
        width: 100%;
        margin-top: 20px;
    }
    // body chức năng
    #search{//style của search
        padding: 5px;
        border: 1px solid #ccc;
    }
    #search,#btn_search{ // chung style
        font-size: 25px;
        line-height: 42px; 
        height: 42px;
        margin: 0 20px 20px;
        border-radius: 5px;
        &:hover:not(#search){
            cursor: pointer;
            opacity: 0.6;
        }
    }
    #btn_search{
        border: 0.5 solid #ccc;
        font-size: 1rem;
        padding-left:10px ; padding-right: 10px;
    }
    .body_chucnang1{
        display: block;
        float: right;
    }
   
    //thumbnail chính bự bự
    #body_thumbnail{ 
        width: 100%;
        height: 600px;
       
    }
    #body_general .body1:not(.body1:nth-child(1)){ // các phần trong body chia ra 1->2->3..., và trừ body1 chứa thumnail
        width: 80%;
        margin: 20px auto 20px;
    } 
    
    #body_general{ // body chung
        width: 100%;
        background-color: white;
        margin: auto;
    }
</style>