<template>
  <div>
    <div class="footer">
      <div class="row1">
        <v-btn
          v-for="link in links"
          :key="link.text"
          class="mx-2 footer-btn"
          color="gray"
          variant="text"
          :to="link.url" 
          :class="{ active: $route.path === link.url }"
        >
          {{ link.text }}
        </v-btn>
      </div>
      <div class="row2">
        {{ new Date().getFullYear() }} — PUBALKA
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterSite',
  data() {
    return {
      links: [
        { text: "HOME", url: "/" },
        { text: "ABOUT US", url: "/about-us" },
        { text: "CONTACT US", url: "/CONTACT-US" }
      ],
    };
  },
};
</script>

<style scoped>
.footer {
  width: 100%;
  padding: 10px;
  background-color: gray;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.row1 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.row2 {
  display: flex;
  justify-content: center;
}

.footer-btn {
  font-weight: bold;
  font-size: 14px;
}

/* Додаємо стиль для активної кнопки */
.footer-btn.active {
  background-color: #000; /* Наприклад, чорний фон для активної */
  color: #fff; /* Білий текст для активної */
}
</style>
