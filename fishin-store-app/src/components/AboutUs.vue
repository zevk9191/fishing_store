<template>
  <v-container
    class="fill-height d-flex flex-column align-center justify-center pb-12"
  >
    <v-card class="pa-6 text-center w-80">
      <v-card-title class="text-h4 font-weight-bold">Про нас</v-card-title>
      <v-card-text class="text-h6"
        >Це сторінка про розробників сайту та їхній внесок у
        проєкт.</v-card-text
      >
    </v-card>

    <v-row class="mt-6" justify="center">
      <v-col cols="12" md="10" lg="8" v-for="person in team" :key="person.name">
        <v-card
          class="pa-4 d-flex flex-column flex-md-row align-center"
          elevation="3"
        >
          <v-avatar size="180" class="mr-md-6 mb-4 mb-md-0">
            <v-img
              :src="require(`@/assets/images/${person.image}`)"
              alt="Фото"
              contain
            ></v-img>
          </v-avatar>
          <div class="text-left">
            <v-card-title class="text-h5 font-weight-bold">{{
              person.name
            }}</v-card-title>
            <v-card-subtitle class="text-body-1">{{
              person.role
            }}</v-card-subtitle>
            <v-card-text class="text-body-1">{{
              person.description
            }}</v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AboutUs",
  data() {
    return {
      team: [
        {
          name: "Арсенюк Ілля",
          image: "fotoillya.jpg",
          role: "Vue-розробник (Frontend)",
          description:
            'Студент КПФК НУ "Львівська політехніка" групи П - 32. Відповідає за розробку користувацького інтерфейсу, створення динамічних компонентів та інтеграцію з бекендом.',
        },
        {
          name: "Бігун Захар",
          image: "fotoZahar.jpg",
          role: "Fullstack-розробник",
          description:
            'Студент КПФК НУ "Львівська політехніка" групи П - 32. Розробляє код для Frontend та займається роботою з базою даних, забезпечуючи взаємодію між клієнтською та серверною частинами.',
        },
        {
          name: "Стефанишин Назарій",
          image: "fotoHazar.jpg",
          role: "Розробник бази даних (Backend)",
          description:
            'Студент КПФК НУ "Львівська політехніка" групи П - 32. Відповідає за проєктування, оптимізацію та впровадження бази даних, створення запитів та забезпечення збереження інформації.',
        },
      ],
    };
  },
};
</script>

<style scoped>
.w-100 {
  width: 100%;
}
.fill-height {
  min-height: 100vh;
}
.v-card {
  border-radius: 16px;
}
.v-avatar img {
  border-radius: 10px;
}
.v-card-text {
  white-space: normal;
  word-wrap: break-word;
}
.pb-12 {
  padding-bottom: 96px;
}
</style>
