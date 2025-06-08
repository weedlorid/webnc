<template>
    <div id="thongtin_general">
        <!-- mỗi sub_thongtin là 1 thông tin( vd tên ng dùng, tài khoản,..) -->
        <div class="sub_thongtin" v-for="item in thongtin" :key="item.name">
            <label for="">{{ item.text }}</label>
            <div>
                <span v-if="item.change">{{ item.thongtin }}</span>
                <input type="text"  v-else :placeholder="item.thongtin" v-model="item.thongtin">
                <button @click="item.change=!item.change" v-if="item.name!='email'" class="btn_change" > <i class="fa-solid fa-square-pen"></i></button>
            </div> 
        </div>
        <button id="ok" @click="SaveChanges">Save Change</button>
    </div>

</template>

<script setup>
import {ref,onMounted} from 'vue';
import { supabase } from '../../public/supabase';
import { useUsersStore } from '../pinia/userStore';

const UsersStore = useUsersStore();
const user_id = UsersStore.local_id_user; // lưu id người dùng từ pinia
//1. tạo biến mảng lưu thông tin người dùng từ supabase, biến này sẽ duyệt trên templae
const thongtin=ref([
    { name: 'email', text: 'Email', thongtin: '', change: true },
  { name: 'phone', text: 'Phone', thongtin: '', change: true },
  { name: 'address', text: 'Address', thongtin: '', change: true },
]);
//2. Lấy dữ liệu người dùng
onMounted(async () => {
    //2.1 lấy theo id
  const { data, error } = await supabase
    .from('users')
    .select('email, phone, address')
    .eq('id', user_id) //user_id được tạo ở trên
  if (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error.message);
    alert('Không thể tải thông tin người dùng!');
    return;
  }
  //2.2 duyệt để gán vào thongtin, do data lúc này là 1 mảng(kể cả 0 dòng [], 1 dòng [0],..)
  //nên ta lấy dòng đầu tiên do mảng chi có 1 dòng
  thongtin.value.forEach(item => {
    item.thongtin = data[0][item.name] || '';
  });
});
//3. cập nhật thông tin
// Cập nhật thông tin
async function SaveChanges() {
  //3.1 tạo mảng updateDate gồm các đối tượng có key là email,sdt,name,.. và giá trị được lấy từ thongtin
  const updateData = {};
  thongtin.value.forEach(item => {
    updateData[item.name] = item.thongtin;
  });
  //3.2 dùng câu lệnh trên supabase
  const { error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', user_id);

  if (error) {
    console.error('Lỗi khi cập nhật:', error.message);
    alert('Không thể cập nhật thông tin!');
    return;
  }

  thongtin.value.forEach(item => item.change = true);
  alert('Đã lưu thay đổi!');
}
</script>

<style scoped lang="scss">
// css cho ok button
#ok{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px;
    &:hover{
        cursor: pointer;
        opacity: 0.8;
    }
}
#thongtin_general .sub_thongtin { //chỉnh label, div cho từng thông tin
    margin: 20px 0;
    label,div{
        display: inline-block;
    }
    div button{
        margin: 0 10px;
    }
    div{
        margin-left: 20%;
    }
    label{
        width: 30%;
    }

}
#thongtin_general .sub_thongtin,i,input{ // chỉnh chugn cho từng thông tin
    font-size: 20px;
    text-align: left;
    i:hover{
        cursor: pointer;
    }
}
#thongtin_general{
    padding: 5% 10% 10%;
    height: auto;
    position: relative;
}
</style>