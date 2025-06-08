<template>
    <header class="header-info">
      <!-- Left block -->
      <div class="info-block">
        <strong>ỦY BAN NHÂN DÂN – SỞ GD&amp;ĐT</strong>
        <span>TRƯỜNG CĐ KINH TẾ TP. HCM</span>
        <span>ĐỒ ÁN THIẾT KẾ WEB NÂNG CAO</span>
      </div>
  
      <!-- Right block -->
      <div class="info-block text-right" style="text-align: center;">
        <strong>GIÁO VIÊN HƯỚNG DẪN</strong>
        <span>Phạm Đằng Phương</span>
        <strong>THÀNH VIÊN NHÓM</strong>
        <span>
          Nguyễn Thị Thanh Như · Nguyễn Tấn Sang · Trần Chí Khang ·
          Phạm Thị Huỳnh Như · Chiêm Tấn Hưng
        </span>
      </div>
    </header>
  </template>
  
  <script setup>
  // Pure presentational component → không cần logic JS
  </script>
  
  <style scoped>
  .header-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1rem;
    background-color: #00023f;
    color: #fff;
    padding: 1rem 2rem;
    font-size: 0.95rem;
  }
  
  /* block chung */
  .info-block {
    flex: 1 1 300px; /* co giãn tùy độ rộng, min 300px */
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    white-space: normal; /* cho phép xuống dòng */
  }
  
  /* căn phải cho khối phải */
  .text-right {
    text-align: right;
  }
  
  /* reset khoảng cách p mặc định */
  strong,
  span {
    margin: 0;
  }
  
  /* làm chữ đậm nổi bật */
  strong {
    font-size: 1rem;
    font-weight: 600;
  }
  </style>
  