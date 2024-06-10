<template>
  <q-page class="q-pa-xl">
    <q-tabs v-model="activeTab" @update:model-value="handleTabChange">
      <q-tab name="customer">고객 요약</q-tab>
      <q-tab name="reservation">예약</q-tab>
      <q-tab name="consultation">상담</q-tab>
      <q-tab name="payment">결제</q-tab>
      <q-tab name="voucher">바우처</q-tab>
      <q-tab name="reward">리워드</q-tab>
    </q-tabs>

    <q-separator class="q-my-md" />

    <!-- 로딩 표시 -->
    <q-spinner v-if="loading" />

    <!-- 고객 상세 정보 -->
    <div v-else>
      <div v-if="activeTab === 'customer'">
        <!-- 고객 정보 -->
        <q-card class="q-mb-md">
          <!-- 고객 정보 표시 -->
          <q-card-section>
            <div class="text-h6">고객 정보</div>
            <q-separator />
            <q-list>
              <!-- 고객 정보 내용 -->
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <!-- 예약 정보 -->
      <div v-else-if="activeTab === 'reservation'">
        <!-- 예약 정보 표시 -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">예약 정보</div>
            <q-separator />
            <q-list>
              <!-- 예약 정보 내용 -->
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <!-- 다른 탭에 대한 내용 추가 -->
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const customerId = $route.query.page;
console.log(customerId);

const customerDetail = ref(null);
const loading = ref(true);
const activeTab = ref('customer'); // 초기 탭 설정

const fetchCustomerDetail = async (customerId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/customers/${customerId}`);
    customerDetail.value = response.data;
  } catch (error) {
    console.error("고객 상세 정보를 가져오는 데 실패했습니다:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCustomerDetail);

const handleTabChange = (tab) => {
  activeTab.value = tab;
};
</script>

<style scoped>
.q-page {
  max-width: 1000px;
  margin: auto;
}
</style>
