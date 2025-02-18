<template>
  <v-container
    class="d-flex flex-column align-center justify-center fill-height"
  >
    <v-card class="pa-6 text-center w-100">
      <v-card-title class="text-h4 font-weight-bold"
        >Зв'яжіться з нами</v-card-title
      >

      <v-divider class="my-4"></v-divider>

      <v-card class="pa-4 mb-4" elevation="3">
        <v-card-subtitle class="text-h6 font-weight-bold"
          >📞 Номер телефона менеджера:</v-card-subtitle
        >
        <v-card-text>
          <p class="text-h6 font-weight-medium">Арсенюк Ілля Вікторович</p>
          <v-chip color="primary" class="text-h6">+38 095 223 4230</v-chip>
        </v-card-text>
      </v-card>

      <v-card class="pa-4" elevation="3">
        <v-card-subtitle class="text-h6 font-weight-bold"
          >📍 Адреса нашого офісу:</v-card-subtitle
        >
        <v-card-text>
          <v-responsive aspect-ratio="16/9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4193.874154278879!2d25.03471544944366!3d48.533710474278074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4736d29057abf5b3%3A0xbe99f0c2dee6921f!2z0JrQvtC70L7QvNC40LnRgdGM0LrQuNC5INC_0L7Qu9GW0YLQtdGF0L3RltGH0L3QuNC5INGE0LDRhdC-0LLQuNC5INC60L7Qu9C10LTQtiDQndCw0YbRltC-0L3QsNC70YzQvdC-0LPQviDRg9C90ZbQstC10YDRgdC40YLQtdGC0YMgwqvQm9GM0LLRltCy0YHRjNC60LAg0L_QvtC70ZbRgtC10YXQvdGW0LrQsMK7!5e0!3m2!1suk!2sua!4v1739816984110!5m2!1suk!2sua"
              width="100%"
              height="400"
              style="border: 0; border-radius: 10px"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </v-responsive>
        </v-card-text>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ContactUs",
};
</script>

<style scoped>
.v-card {
  border-radius: 16px;
}
.w-100 {
  width: 100%;
}
.fill-height {
  min-height: 100vh;
}
</style>
