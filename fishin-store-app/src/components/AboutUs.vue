<template>
  <div class="about-container">
    <h1>Про нас</h1>
    <p class="about-text">Це інформація про компанію. Ми тут, щоб допомогти вам!</p>
  </div>

  <div class="content">
    <img :src="require('@/assets/images/fotoillya.jpg')" alt="Фото" class="about-image" />
    <div class="discription">
      <h1>Арсенюк Ілля</h1>
      <p>Студент КПФК НУ "Львівська політехніка" групи П - 32. Займає посаду vue-розробника сайту. Відповідає за Frontend розробку.</p>
    </div>
  </div>

  <div class="content">
    <img :src="require('@/assets/images/fotoZahar.jpg')" alt="Фото" class="about-image" />
    <div class="discription">
      <h1>Бігун Захар</h1>
      <p>Студент КПФК НУ "Львівська політехніка" групи П - 32. Займає посаду vue-розробника. Розробляє код для Frotend та для DataBase.</p>
    </div>
  </div>

  <div class="content">
    <img :src="require('@/assets/images/fotoHazar.jpg')" alt="Фото" class="about-image" />
    <div class="discription">
      <h1>Стефанишин Назарій</h1>
      <p>Студент КПФК НУ "Львівська політехніка" групи П - 32. Займає посаду Database розробника. Відповідає за розробку бази даних.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
};
</script>

<style scoped>
.about-container {
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

/* Контейнер для фото та тексту */
.content {
  padding-bottom: 30px;
  display: flex;
  padding-left: 30px;
  align-items: first center;
  justify-content: first baseline;
  gap: 20px; /* Відступ між фото і текстом */
  flex-wrap: wrap; /* Щоб коректно відображалося на мобільних */
}

/* Фото */
.about-image {
  width: 250px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
}

/* Текст справа */
.discription {
  max-width: 500px;
  font-size: 1.2rem;
}
</style>
