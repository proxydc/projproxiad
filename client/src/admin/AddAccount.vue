<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
    <h1>Ajouter Compte</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="addAccount">
        <div class="register">
          <label for="lblogin">Nom d'utilisateur</label>
          <input type="text" v-model="model.account.login_name" placeholder="Entrer Nom d'utilisateur" id="lblogin" required
            class="form-control" />
          <label for="lbdisplay">Nom</label>
          <input type="text" v-model="model.account.display_name" placeholder="Entrer Nom" id="lbdisplay" required
            class="form-control" />
          <label for="lbpassword">Mot de passe</label>
          <input type="password" v-model="model.account.pass_word" placeholder="Entrer Mot de passe" id="lbpassword" required
            class="form-control" />
          <div class="example ex1">
            <h5>Select Role</h5>
            <label class="radio red">
              <input type="radio" v-model="model.account.role_id" value="1" name="group1" />
              <span>Admin</span>
            </label>
            <label class="radio blue">
              <input type="radio" v-model="model.account.role_id" value="2" name="group1" checked />
              <span>User</span>
            </label>
          </div>
          <button type="submit" class="js-new">Ajouter Compte</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urlacc from "../_helpers/urllist.js";
import $ from "jquery";
export default {
  name: "AddAccount",
  data() {
    return {
      error: "",
      warning: "",

      model: {
        account: {
          login_name: "",
          display_name: "",
          pass_word: "",
          role_id: 2,
        }
      }

    };
  },
  mounted() {
    document.getElementById("lblogin").focus();   
  },
  methods: {
    async addAccount() {
      try {
        this.error = "";
        this.warning = "";
        const url = urlacc.getAddAccUrl();
        let result = await axios.post(url, {
          login_name: this.model.account.login_name,
          display_name: this.model.account.display_name,
          pass_word: this.model.account.pass_word,
          role_id: this.model.account.role_id,
        });
        console.warn(result);
        switch (result.status) {
          case 201:
            localStorage.setItem("user-info", JSON.stringify(result.data))
            this.$router.push({ name: 'admin' });
            break;
          case 202:
            this.warning = result.data;
            break;
          default:
            this.error = "Database error! Status: " + result.status + " Error: " + result.data;
            break;
        }
      }
      catch (err) {
        this.error = err
      }
    },
  },
};
</script>