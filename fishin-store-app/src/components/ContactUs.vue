<template>
  <h1>Тут можна з нами зв'язатися</h1>
  
  <div class="contact-container">
    

    <div class="contact-info">
      <p class="info-title">📞 Номер телефона нашого менеджера:</p>
      <p class="manager-name">Арсенюк Ілля Вікторович</p>
      <p class="telefon">+38 095 223 4230</p>
    </div>

    <!-- Блок з адресою -->
    <div class="address-container">
      <p class="info-title">📍 Адреса нашого офісу:</p>
      <div class="map-container">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4193.874154278879!2d25.03471544944366!3d48.533710474278074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4736d29057abf5b3%3A0xbe99f0c2dee6921f!2z0JrQvtC70L7QvNC40LnRgdGM0LrQuNC5INC_0L7Qu9GW0YLQtdGF0L3RltGH0L3QuNC5INGE0LDRhdC-0LLQuNC5INC60L7Qu9C10LTQtiDQndCw0YbRltC-0L3QsNC70YzQvdC-0LPQviDRg9C90ZbQstC10YDRgdC40YLQtdGC0YMgwqvQm9GM0LLRltCy0YHRjNC60LAg0L_QvtC70ZbRgtC10YXQvdGW0LrQsMK7!5e0!3m2!1suk!2sua!4v1739816984110!5m2!1suk!2sua" 
        width="100%" 
        height="600" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactUs',
};
</script>

<style scoped>
/* Контейнер */
.contact-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  max-width: 800px;
}

/* Заголовок */
h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  padding-top: 20px;
}

/* Контейнер для контактної інформації */
.contact-info, .address-container {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-bottom: 20px;
}

/* Заголовки */
.info-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

/* Ім'я менеджера */
.manager-name {
  font-size: 1.2rem;
  font-weight: 500;
  color: #555;
  margin-bottom: 8px;
}

/* Номер телефону */
.telefon {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
  background: #e6f2ff;
  padding: 8px 15px;
  border-radius: 8px;
}

/* Карта */
.map-container {
  width: 100%;
  height: 600px;
  border-radius: 10px;
  overflow: hidden;
}
</style>
