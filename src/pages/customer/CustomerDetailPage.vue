<template>
  <q-page class="q-pa-xl">
    <q-tabs v-model="activeTab">
      <q-tab name="customer" label="고객 요약"></q-tab>
      <q-tab name="reservation">예약</q-tab>
      <q-tab name="consultation">상담</q-tab>
      <q-tab name="payment">결제</q-tab>
      <q-tab name="voucher">바우처</q-tab>
      <q-tab name="reward">리워드</q-tab>
    </q-tabs>

    <q-separator class="q-my-md"/>

    <!-- 로딩 표시 -->
    <q-spinner v-if="loading"/>

    <!-- 고객 상세 정보 -->
    <div v-else>
      <div v-if="activeTab === 'customer'">
        <CustomerList/>
      </div>
      <!-- 예약 정보 -->
      <div v-else-if="activeTab === 'reservation'">
        <CustomerReservationList />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router";
import CustomerList from "pages/customer/CustomerList.vue";
import CustomerReservationList from "pages/customer/CustomerReservationList.vue";

const route = useRoute();

const loading = ref(true);
const activeTab = ref('customer'); // 초기 탭 설정


// const fetchReservations = async () => {
//   try {
//     loading.value = true; // 로딩 상태 설정
//     const response = await axios.get(`http://localhost:8080/api/v1/customers/${customerId}/hotel/reservations`);
//     reservations.value = response.data; // 가져온 예약 정보를 저장
//   } catch (error) {
//     console.error("예약 정보를 가져오는 데 실패했습니다:", error);
//   } finally {
//     loading.value = false; // 로딩 상태 해제
//   }
// };
//       onMounted(fetchReservations)   ;
</script>

<style scoped>
.q-page {
  max-width: 1000px;
  margin: auto;
}
</style>
