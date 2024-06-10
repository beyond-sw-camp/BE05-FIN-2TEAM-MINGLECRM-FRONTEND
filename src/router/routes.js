import CustomerDetailPage from "pages/customer/CustomerDetailPage.vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "review", component: () => import("pages/ReviewPage.vue") },
      {
        path: "voucher",
        component: () => import("src/pages/voucher/VoucherPage.vue"),
      },
      { path: "inquiry", component: () => import("pages/InquiryPage.vue") },
      {
        path: "inquiry/:inquiryId",
        name: "InquiryDetailPage",
        component: () => import("pages/InquiryDetailPage.vue"),
        props: true,
      },
      { path: "customers/:customerId/hotel/reservations", component: () => import("pages/reservation/ReservationPage.vue") },
      { path: "customers/:customerId/hotel/reservations/:reservationId", component: () => import("pages/reservation/ReservationPage.vue") },
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "customer", component: () => import("pages/customer/CustomerPage.vue") },
      {
        path: '/customers/:customerId',
        name: 'CustomerDetailPage',
        component: CustomerDetailPage,
        props: true,
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
