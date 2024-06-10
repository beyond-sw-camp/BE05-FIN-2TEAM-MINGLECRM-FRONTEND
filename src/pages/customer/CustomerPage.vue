<template>
  <q-page class="q-pa-xl">
    <section>
      <div class="text-h4">고객 상세 정보</div>
      <q-separator class="q-my-md" />
      <q-input filled v-model="filter" label="Search" class="q-mb-md" />

      <q-table
        :rows="filteredCustomers"
        :columns="columns"
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        @request="fetchCustomers"
        @row-click="onRowClick"
      />

      <q-pagination
        :page="pagination.page"
        :rows-per-page="pagination.rowsPerPage"
        :rows-number="pagination.rowsNumber"
        @page-change="fetchCustomers"
        class="q-mt-md"
        color="primary"
        boundary-links
        :max-pages="5"
        layout="pages"
      />
    </section>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const customers = ref([]); // 데이터를 저장하는 반응형 변수
const loading = ref(false); // 데이터 로딩 상태를 나타냄
const filter = ref(""); // 검색 입력 값을 저장
const pagination = ref({ page: 1, rowsPerPage: 10, rowsNumber: 0 }); // 페이징 정보를 저장하는 반응형 변수 초기값 설정

// 컬럼 정의
const columns = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: "id",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "name",
    align: "left",
    label: "Name",
    field: "name",
    sortable: true,
  },
  {
    name: "phone",
    align: "left",
    label: "Phone",
    field: "phone",
    sortable: true,
  },
  {
    name: "email",
    align: "left",
    label: "Email",
    field: "email",
    sortable: true,
  },
  { name: "address", align: "left", label: "Address", field: "address", sortable: true },
  { name: "birth", align: "left", label: "Birth Date", field: "birth", sortable: true },
  { name: "gender", align: "left", label: "Gender", field: "gender", sortable: true },
];

const router = useRouter();

// 데이터 요청 함수
const fetchCustomers = async () => {
  loading.value = true; // 데이터 요청할 때 로딩 상태 true로 설정
  try {
    const response = await axios.get("http://localhost:8080/api/v1/customers", {
      params: {
        page: pagination.value.page - 1, // 백엔드 페이지 번호가 0부터 시작
        size: pagination.value.rowsPerPage,
      },
    });
    console.log(response.data); // 응답 데이터를 콘솔에 출력하여 확인합니다.
    if (response.data) {
      customers.value = response.data.map((item) => ({
        id: item.id,
        name: item.name,
        phone: item.phone,
        email: item.email,
        address: item.address,
        birth: item.birth,
        gender: item.gender,
      })); // 응답 데이터에서 목록 추출
      pagination.value.rowsNumber = response.data.totalElements; // 전체 데이터의 개수를 pagination 객체에 저장
    } else {
      console.error("응답 데이터 형식이 예상과 다릅니다.");
    }
  } catch (error) {
    console.error("고객 정보를 가져오지 못했습니다. :", error);
  } finally {

    loading.value = false;
  }
};


const onRowClick = (event, row) => {
  console.log("선택한 고객 상세 정보:", row); // 디버깅용 로그
  if (row && row.id) {
    router.push({ name: "CustomerDetailPage", params: { customerId: row.id } });
  } else {
    console.error("유효하지 않은 고객입니다. :", row);
  }
};

onMounted(fetchCustomers); // 컴포넌트가 마운트될 때 fetchCustomers 함수 호출

watch(
  // pagination.value.page 와 pagination.value.rowsPerPage가 변경될 때마다 fetchCustomers 함수 호출
  [() => pagination.value.page, () => pagination.value.rowsPerPage],
  fetchCustomers,
  { immediate: true } // 컴포넌트가 마운트될 때 바로 데이터 로드
);

// computed 속성 : filteredCustomers - 필터링된 목록을 반환하는 계산된 속성
const filteredCustomers = computed(() => {
  if (!filter.value) {
    return customers.value; // 필터가 비어 있으면 전체 customers 반환
  }
  const lowerCaseFilter = filter.value.toLowerCase();
  return customers.value.filter(
    (
      customer // 각 customer 항목의 속성을 필터링
    ) =>
      customer.name.toLowerCase().includes(lowerCaseFilter) ||
      customer.phone.toLowerCase().includes(lowerCaseFilter) ||
      customer.email.toLowerCase().includes(lowerCaseFilter) ||
      customer.address.toLowerCase().includes(lowerCaseFilter)
    // 이름, 전화번호, 이메일, 주소 값을 소문자로 변환 후, 검색어(filter.value)가 포함되어 있는지 확인
    // .toLowerCase() 사용하여 대소문자 구분하지 않음.
  );
});
</script>

<style lang="scss" scoped>
/* 직접 변수 값을 설정 */
$primary-color: #007bff;
$secondary-color: #6c757d;

.q-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .q-pagination__list {
    display: flex;
    justify-content: center;
  }

  .q-pagination__item {
    margin: 0 5px;
    &.q-pagination__item--active {
      background-color: $primary-color; // 활성 페이지 버튼 색상
      color: white;
      border-radius: 50%;
    }
  }

  .q-pagination__item:hover {
    background-color: $secondary-color; // 호버 효과 색상
  }
}
</style>
