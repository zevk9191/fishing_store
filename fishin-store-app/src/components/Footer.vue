<template>
  <!-- <v-footer class="footer bg-grey-lighten-1" height="8%"> -->
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
  <!-- </v-footer> -->
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
.footer {
  width: 100%;
  margin: 0;
  /* bottom: 0; */
  padding: 10px;
  height: auto;
  box-sizing: none;
  background-color: gray;
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
</style>
