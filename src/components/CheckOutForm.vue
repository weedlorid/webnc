<template>
    <div id="detail_form_general">
        <div id="form_wrap">
            <div id="icon_close" @click="CloseModalBuy" style="float: right;"><i class="fa-solid fa-square-xmark"></i></div>
            <div id="checkout" class="checkout-container">
            <!-- Left: form -->
            <form class="checkout-form" @submit.prevent="BuyDone">
                <h2>Checkout</h2>
                <div class="form-row">
                <label>Email</label>
                <input type="email" v-model="email" disabled />
                </div>
                <div class="form-row">
                <label>Game</label>
                <input type="text" v-model="game" disabled />
                </div>
                <div class="form-row two-col">
                <div>
                    <label>Unit price</label>
                    <input type="text" v-model="price" disabled />
                </div>
                <div>
                    <label>Quantity</label>
                    <input type="number" v-model.number="qty" min="1" />
                </div>
                </div>
                <div class="form-row total">
                <label>Total</label>
                <span>{{ total.toLocaleString() }}</span>
                </div>
                <button type="submit" class="confirm-btn" >Confirm</button>
            </form>
        
            <!-- Right: QR -->
            <div class="qr-wrapper">
                <img src="../assets/qrcode.jpg" alt="QR code" width="220" height="220" />
                <p>Scan QR with syntax: {{ email }} <br> - {{ props.id_game_buy }}</p>
                <p>Your Total Is {{ total }} VND</p>
            </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, computed,defineEmits ,defineProps,watchEffect } from 'vue'
import {useUsersStore} from '../pinia/userStore.js'
import { supabase } from '../../public/supabase'

// các biến,hàm chung
const UsersStore=useUsersStore();
const props=defineProps({  // tạo biến prop 
    id_game_buy: Number
} 
);
const emit = defineEmits();// đóng modal bằng emit ,tạo 1 đối tượng emit 
function CloseModalBuy(){ //  hàm này( ở icon X và nút close) truyền 1 emit gồm 
const change=false; //  giá trị false để thay đổi v-show ở component cha
emit( 'CloseModalBuy',change);
}

// dummy props / demo values
const game  = ref('')
const price = ref(100000)
const qty   = ref(1)
const total = computed(() => price.value * qty.value)
watchEffect(  // theo dõi sự thay đổi của biến prop khi game ở component cha(bodyapp.vue) được click  
    async () => {
    if(props.id_game_buy==0) return;
    // const id_from_parent = ; 
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${props.id_game_buy}`; // dùng prop để thay đổi id
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
        game.value=result.title;
    } catch (error) {
        console.error(error);
    }
}
);
const email = UsersStore.local_email_user;
// mua hàng 
async function BuyDone(){
// đọc bảng code_games
let { data: game_codes, error: game_codes_err } = await supabase
  .from('game_codes')
  .select('id').eq('id_game',props.id_game_buy)
// lưu mảng giá trị từ cột vào biến
const id_of_code=game_codes;
// insert vào orders
const { data, error:order_err } = await supabase
  .from('orders')
  .insert([
    { 
        'id_user': UsersStore.local_id_user , 
        'total_price': total.value,
        'id_code':id_of_code[0].id, 
        'quantity': qty.value
    },
  ])
alert('Thanh Toán Thành Công!');

}

</script>

<style scoped lang="scss">
#form_wrap{
position: relative;
width: 60%;
height: 100vh;
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

#detail_form_general{
position: fixed;
top: 0; left: 0;right: 0;
height: 100vh;
background-color: rgba(204,204,204,0.5);
z-index: 21; // header là 20
}
.checkout-container{
display:flex;
flex-wrap:wrap;
gap:2rem;
justify-content:center;
padding-top: 150px;
}
.checkout-form{
flex:1 1 320px; //ách viết rút gọn của ba thuộc tính con trong Flexbox: grow,shrink,basis
max-width:500px;
border:1px solid #ccc;
padding:1.5rem 2rem;
border-radius:8px;
box-shadow:0 2px 6px rgba(0,0,0,.1);
}
.checkout-form h2{margin-bottom:1rem;text-align:center;}
.form-row{margin-bottom:1rem;display:flex;flex-direction:column;gap:.4rem;}
.two-col{flex-direction:row;gap:1rem;}
.two-col>div{flex:1;display:flex;flex-direction:column;}
input{padding:.5rem .8rem;border:1px solid #ccc;border-radius:4px;}
.total{font-weight:bold;font-size:1.1rem;align-items:flex-start;}
.confirm-btn{width:100%;padding:.6rem 0;background:#00023F;color:#fff;border:none;border-radius:4px;font-size:1rem;cursor:pointer;}
.confirm-btn:hover{opacity:.9;}
.qr-wrapper{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.8rem;}
.qr-wrapper img{border:1px solid #ccc;border-radius:4px;}
#icon_close{
color: red;
&:hover{
    cursor: pointer;
    opacity: 0.7;
}
}
</style>