<template>
  <div>
    <nav class="navbar navbar-dark bg-info navbar-expand-lg">
      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav me-auto">
         <!-- <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>-->
          <li class="nav-item">
            <button class="nav-link active" aria-current="page" v-on:click="pageCandidats">Candidats</button>
          </li>
          <li class="nav-item" v-if="getUser() == 'admin'">
            <button class="nav-link active" aria-current="page" v-on:click="pageAdmin">Users</button>
          </li>
        </ul>
        <div class="nav justify-content-end">
          <a class="nav-link" aria-current="page" href="/">Se déconnecter</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AdminNav',
  methods:
  {
    getUser() {
      return localStorage.getItem('useraccount')
    },
    pageCandidats()
    {
      this.$router.push({ name: "user" });
    },
    pageAdmin()
    {
      this.$router.push({ name: "admin" });
    },
  }
}
</script>