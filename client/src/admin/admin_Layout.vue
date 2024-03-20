<template>
  <div class="admin">
    <div v-if="getUser() == 'admin' || getUser() == 'user'">
      <AdminHeader />
      <AdminNav />
    </div>
    <router-view />
  </div>
</template>

<script>
import AdminHeader from "../components/AdminHeader.vue";
import AdminNav from "../components/AdminNav.vue";
export default {
  name: "AdminLayout",
  components: {
    AdminHeader,
    AdminNav,
  },
  methods: {
    getUser() {
      return localStorage.getItem("useraccount"); 
    },
  },
};
</script>