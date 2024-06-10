<template>
  <div>
    <!-- 고객 정보 -->
    <q-card class="q-mb-md">
      <!-- 고객 정보 표시 -->
      <q-card-section>
        <div class="text-h6">고객 정보</div>
        <q-separator />
        <q-list>
          <q-item>
            <q-item-section>ID: {{ customerDetail.id }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>이름: {{ customerDetail.name }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>전화: {{ customerDetail.phone }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>이메일: {{ customerDetail.email }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>주소: {{ customerDetail.address }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>생일: {{ customerDetail.birth }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>성별: {{ customerDetail.gender }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>

</template>

<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";

const route = useRoute();

const customerDetail = ref(null);
const loading = ref(true);
const fetchCustomerDetail = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/customers/${customerId}`
    );
    customerDetail.value = response.data; // 올바른 데이터 설정 필요
  } catch (error) {
    console.error("고객 상세 정보를 가져오는 데 실패했습니다:", error);
  } finally {
    loading.value = false;
  }
};
onMounted(fetchCustomerDetail);
</script>

<style lang="scss" scoped>

</style>
