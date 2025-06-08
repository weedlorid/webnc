<template>
    <div id="detail_game_general">
        <div id="detail_game"> 
            <div id="icon_close" @click="CloseModal"><i class="fa-solid fa-square-xmark"></i></div>
            <!-- phần detail-game sẽ có 3 phần: tên game( cấu hình máy) , nội dung (dài hơn) , thông tin( chi tiết hơn) -->
            <h1>{{ game_detail.title }}</h1>
            <div class="sub_detail_game" id="title_general">
                
                <div class="sub_detail_game2">
                    <img :src="game_detail.thumbnail" alt="">
                </div>
                <div class="sub_detail_game2">
                    <h4>Yêu cầu tối thiểu</h4>
                    <p v-if="game_detail.minimum_system_requirements">
                        Hệ điều hành: {{ game_detail.minimum_system_requirements.os }} </p>
                    <p v-if="game_detail.minimum_system_requirements">
                        Chip {{ game_detail.minimum_system_requirements.processor }}</p>
                    <p v-if="game_detail.minimum_system_requirements">
                        Bộ nhớ {{ game_detail.minimum_system_requirements.memory }} </p>
                    <p v-if="game_detail.minimum_system_requirements">
                        Card {{ game_detail.minimum_system_requirements.graphics }} </p>
                    <p v-if="game_detail.minimum_system_requirements">
                        Dung lượng {{ game_detail.minimum_system_requirements.storage }} </p>
                        
                </div>
            </div>
            <h1>Nội Dung</h1>
            <div class="sub_detail_game" id="content_general">
                <div class="sub_detail_game2">
                    <p>{{ game_detail.description }}</p>
                </div>
                <div class="sub_detail_game2">
                    <img v-if="game_detail.screenshots && game_detail.screenshots.length > 0" 
                        :src="game_detail.screenshots[0].image" 
                        alt="game-image" 
                        width="98%" 
                        height="98%">
                </div>
              
            </div>
            <h1>Thông Tin</h1>
            <div class="sub_detail_game" id="info_general">
                
                <div class="sub_detail_game2">
                    <p>Thể Loại</p>
                    <p>Nền Tảng</p>
                    <p>Nhà Phát Hành</p>
                    <p>Nhà Phát Triển</p>
                    <p>Ngày Phát Hành</p>
                    <p>Truy Cập Game</p>
                </div>
                <div class="sub_detail_game2">
                    <p>{{ game_detail.genre }}</p>
                    <p>{{ game_detail.platform }}</p>
                    <p>{{ game_detail.publisher }}</p>
                    <p>{{ game_detail.developer }}</p>
                    <p>{{ game_detail.release_date }}</p>
                    <a :href="game_detail.game_url">{{ game_detail.game_url }}</a>
                </div>
            </div>
            <div class="sub_detail_game" id="info_general">
                <div id="close_btn" @click="CloseModal"><button >Đóng </button></div>
            </div>
          
        </div>
        
    </div>
</template>

<script setup>
import { ref,watchEffect, defineEmits ,defineProps} from 'vue'; 

// 4.1 định nghĩa 1 prop,   nhận đối tượng nên viết theo kiểu vậy
const props=defineProps({  
        id_game: Number
    } 
);
// 4.2 tạo các biến để: 
const game_detail=ref({}); // lưu nội dung api về game
const game_images=ref([]); // lưu mảng các hình ảnh của game trong thuộc tính screenshots trong api
// 4.3 theo dõi biến prop id_game để thực hiện kéo api
watchEffect(  // theo dõi sự thay đổi của biến prop khi game ở component cha(bodyapp.vue) được click  
    async () => {
    if(props.id_game==0) return;
    // const id_from_parent = ; 
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${props.id_game}`; // dùng prop để thay đổi id
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9baa2ab8d4mshb5a5b57bc6bbae6p1274dejsna95b7ac989c5',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        game_detail.value=result;
        game_images.value=game_detail.value.screenshots;

    } catch (error) {
        console.error(error);
    }
}
);
// 5.  dùng emit chuyển thông tin để ẩn modal ra ngoài
const emit = defineEmits();// 5.1 tạo 1 đối tượng emit 
function CloseModal(){ // 5.2 hàm này( ở icon X và nút close) truyền 1 emit gồm 
    const change=false; // 5.2.1 giá trị false để thay đổi v-show ở component cha
    emit( 'CloseModal',change);
}
</script>

<style scoped lang="scss">
//css cho icon close đầu trang
#icon_close{
    position: absolute;
    right: 0; top: 0;
    margin: 2px;
    color: red;
    font-size: 30px;
    :hover{
        cursor: pointer;
        opacity: 0.7;
    }
}
//css cho nút close
#close_btn>button{
    padding: 10px;
    &:hover{
        cursor: pointer;
    }
}
#close_btn{
    width: 100%;
    text-align: center;
}
//css cho nội dung bên trong modal
#detail_game .sub_detail_game .sub_detail_game2{ //trong mỗi vùng nội dung sẽ có 2 phần mỗi phần 45% width
    width: 45%;
    height: 250px;
    overflow:auto;
}
#detail_game .sub_detail_game{ // mỗi vùng nội dung title, nội dung, thông tin sẽ hiển thị flex
    display: flex;
    flex-wrap: wrap;

    justify-content: space-between;
    margin:  30px 0;
}
#detail_game>h1{ // css cho h1 
    text-align: center;
    
}
// css cho detail_game, nền hiện vùng nội dung
#detail_game{
    position: relative;
    width: 60%;
    max-height: 100vh;
    margin: auto;
    background-color: white;
    overflow-y: auto; /* cuộn theo chiều dọc */
    /* Optional: cho mượt hơn */
    scroll-behavior: smooth;
    margin: auto;
    padding: 20px;
    left: -50px;  
    animation: modal_move 0.5s ease forwards;
}
@keyframes modal_move {
    0%{left: -50px;}
    100%{left: 0;}
}
// css nền detail chung
#detail_game_general{
    position: fixed;
    top: 0; left: 0;right: 0;
    height: 100vh;
    background-color: rgba(204,204,204,0.5);
    z-index: 21; // header là 20
}
</style>

