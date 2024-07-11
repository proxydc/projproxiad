<template>
  <div>
    <h1>Login</h1>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
    <div class="container w-50 p-3 my-1 bg-light border border-success">
      <form class="was-validated" @submit.prevent="login">
        <div class="login">
          <label for="lblogin">Login</label>
          <input type="text" id="lblogin" v-model="login_name" placeholder="Entrer le login" class="form-control" required />
          <label for="lbpw">Mot de passe</label>
          <input type="password" id="lbpw" v-model="pass_word" placeholder="Entrer le mot de passe" class="form-control"
            required />
          <button type="submit" class="js-new">Login!</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import urlacc from "../_helpers/urllist.js";
import axios from "axios";
import $ from "jquery";
export default {
  name: "LoginAccount",
  data() {
    return {
      msg: "",
      error: "",
      warning: "",
    };
  },
  mounted() {
    document.getElementById("lblogin").focus();   
  },
  methods: {
    async login() {
      try {
        this.error = "";
        this.warning = "";
        let result = await axios.post(urlacc.getLoginUrl(), {
          login_name: this.login_name,
          pass_word: this.pass_word,
        },
        );
        console.log("result: " + result.status + "nnn" + result.message);
        switch (result.status) {
          case 200:
            const resp = result.data;
            localStorage.setItem(
              "token",
              "hdsfhqishiofhiqsdhfhdksqhfklmqjdmsfjildjsfioj7467d687dfsgnjklfhnglk46396fdgnlkjndflkg646346drg,fkldjg"
            );
            localStorage.setItem("manager_id", resp.id);
            localStorage.setItem("manager_ref", resp.display_name);
            if (resp.role_id == 1) {
              localStorage.setItem("useraccount", "admin");             
            } else {
              localStorage.setItem("useraccount", "user");
              localStorage.getItem("useraccount");//to save in cookies
            };
            this.$router.push({ name: "user" });
            break;
          case 202:
            this.warning = result.data;
            break;
          default:
            this.error = "Database error! Status: " + result.status + " Error: " + result.data;
            break;
        }
      } catch (err) {
        console.log("err" + err);
        this.error = err;
      }
    },
  },
};
</script>