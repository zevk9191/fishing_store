<template>
  <v-footer class="footer bg-grey-lighten-1">
    <v-container>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link.text"
          class="mx-2 footer-btn"
          color="white"
          variant="text"
          :href="link.url"
        >
          {{ link.text }}
        </v-btn>
      </v-row>
      <v-row justify="center" no-gutters>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>PUBALKA</strong>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
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
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 10px 0;
}

.footer-btn {
  font-weight: bold;
  font-size: 14px;
}
</style>
