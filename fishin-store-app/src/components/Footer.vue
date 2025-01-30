<template>
  <div>
    <!-- Футер -->
    <div class="footer">
      <div class="row1">
        <v-btn
          v-for="link in links"
          :key="link.text"
          class="mx-2 footer-btn"
          color="gray"
          variant="text"
          :href="link.url"
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
        { text: "HOME", url: "http://localhost:8080/" },
        { text: "ABOUT US", url: "#" },
        { text: "TEAM", url: "#" },
        { text: "SERVICES", url: "#" },
        { text: "BLOG", url: "#" },
        { text: "CONTACT US", url: "#" }
      ],
    };
  },
};
</script>

<style scoped>
/* Загальні стилі для футера */
.footer {
  width: 100%;
  padding: 10px;
  background-color: gray;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  /* Фіксуємо футер на дні */
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

/* Стилі для кнопок в футері */
.footer-btn {
  font-weight: bold;
  font-size: 14px;
}
</style>
