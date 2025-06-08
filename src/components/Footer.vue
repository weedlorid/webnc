<template>
    <div id="footer_general">
        <div class="sub_footer">
            <span>CodeInGame</span> <br>
            <span>Mã code đỉnh</span> <br>
            <span>Vật phẩm xịn</span> <br>
            <span>Chơi game chất</span><br>
        </div>
        <div class="sub_footer">
            <span>Liên hệ :</span><br>
            <a href="https://github.com/">Github <i class="fa-brands fa-github"></i></a><br>
            <a href="https://www.facebook.com/">Facebook <i class="fa-brands fa-facebook"></i></a>
        </div>
        <div class="sub_footer">
            <p>@2024 - CodeInGame - Hosting được tài trợ bởi NhanHoa.com.</p>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss"scoped>
//

#footer_general .sub_footer{ //cho 3 phần sub_footer
    margin: 20px auto 10px;
    color: white;
    text-align: center;
    width: 30%;
}
#footer_general{ //header chung
    
    width: 100%;
    height: 100px;
    background-color:  #00023F;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
</style>