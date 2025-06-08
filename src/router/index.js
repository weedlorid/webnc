// import các component
// nội dung trang chủ
import Home from '../layouts/Home.vue' //trang chủ
import BodyHome from '../layouts/BodyHome.vue' // nội dung trang chủ
import SignIn from '../layouts/SignIn.vue'; // trang đăng nhập
import SignUp from '../layouts/SignUp.vue'; // trang đăng nhập
import User from '../layouts/User.vue'; // trang user
import Admin from '../layouts/Admin.vue'; // trang admin
import PersonInfo from '../layouts/PersonInfo.vue';//trang thông tin cá nhân
import ForgetPassWord from '../layouts/ForgetPassWord.vue';// trang gửi link đến email để khôi phục
import ResetPassword from '../layouts/ResetPassword.vue';// trang sau khi nhấn link để nhập lại mật khẩu
import FavoriteGames from '../layouts/FavoriteGame.vue'// trang game yêu thích user
import ListCodeGame from '../layouts/ListCodeGame.vue'// trang quản lý code admin
import UserList from '../layouts/UserList.vue'// trang hiển thị user
import OrderList from '../layouts/OrderList.vue' //trang danh sách đã order
import OrderHistory from '../layouts/OrderHistory.vue'// trang danh sách order của user
// cấu hình route
import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '../../public/supabase.js'
// tạo router
const router = createRouter({
    history: createWebHistory(),
    routes: [ {// các đường dẫn
        path: '/', component:Home,
        children:[ 
            { path:'', component: BodyHome  },
            { path:'signin', component: SignIn },
            { path:'signup', component: SignUp },
            { path:'forgetpassword', component: ForgetPassWord },
            { path:'resetpassword', component: ResetPassword },
            { path:'user', component: User, meta: { requiresAuth: true },children:[
                { path:'personinfo', component: PersonInfo },
                { path:'favoritegames', component: FavoriteGames },
                { path:'orderuser', component: OrderHistory },
            ] },
            { path:'admin', component: Admin, meta: { requiresAuth: true },children:[
                { path:'personinfo', component: PersonInfo },
                { path:'listcodegame', component: ListCodeGame },
                { path:'userlist', component: UserList },
                { path:'orderlist', component: OrderList },
            ] },
            // { path:'Admin', component: Admin,
            //     children:[
            //         {path:'ThongTinCaNhan', component: ThongTinCaNhan},
            //         {path:'DanhSachSanPham', component: DanhSachSanPham},
            //         {path:'DanhSachKhachHang', component: DanhSachKhachHang},
            //         {path:'DanhSachDonHang', component: DanhSachDonHang},
            //         {path:'ThongKe', component: ThongKe},
            //     ]           
            // },
            // { path:'User', component: User,
            //     children:[
            //         {path:'ThongTinCaNhan', component: ThongTinCaNhan},
            //         {path:'LichSuGiaoDich', component: LichSuGiaoDich},
            //         {path:'GameYeuThich', component: GameYeuThich},
            //     ]        
            // },
        ],
    }]
});
async function getUser(next) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        alert("Bạn phải đăng nhập đã!");
        next("/signin"); // hoặc "/signin"
    } else {
        next(); // tiếp tục vào route
    }
}

router.beforeEach(async(to, from, next) => {
    if (to.meta.requiresAuth) {
    await getUser(next); // kiểm tra đăng nhập
    } else {
    next(); // không yêu cầu auth, cho đi
    }
});
export default router; // xuất file router để dùng 