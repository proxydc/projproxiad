<template>
  <div>
    <div
      v-if="error != ''"
      class="alert alert-danger alert-dismissible fade show"
    >
      <strong>{{ error }}</strong>
    </div>
    <h1>Editer Candidat</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="updateCandidat">
        <div class="register">
          <label for="lbfamilyname">Nom</label>
          <input
            type="text"
            v-model="model.candidat.familyname"
            class="form-control"
            id="lbfamilyname"
            required
          />
          <label for="lbfirstname">Prénom</label>
          <input
            type="text"
            id="lbfirstname"
            v-model="model.candidat.firstname"
            placeholder="Entrer Prénom"
            required
            class="form-control"
          />
          <label for="lbemail">Email</label>
          <input
            type="email"
            v-model="model.candidat.email"
            placeholder="Entrer Email"
            id="lbemail"
            required
            class="form-control"
          />
          <label for="lbposte">Poste</label>
          <input
            type="text"
            id="lbposte"
            v-model="model.candidat.poste"
            placeholder="Entrer poste"
            class="form-control"
          />
          <label for="lbexps">Nb.Exps</label>
          <input
            type="text"
            id="lbexps"
            v-model="model.candidat.nbexps"
            placeholder="Entrer nb exps"
            class="form-control"
          />
          <div class="multi_select_box">
            <!-- v-if="getUser() == 'admin'" >-->
            <label for="lbrhs">RH</label>
            <select
              id="slManager"
              class="multi_select w-100"
              multiple
              data-selected-text-format=" count > 2"
            >
              <option
                v-for="(rhdc, index) in DcManagerList"
                :value="rhdc.Id"
                :key="index"
              >
                {{ rhdc.display_name }}
              </option>
            </select>
          </div>
          <!--  <div v-else>
            <label for="lbrhs">RH</label>
         <input type="text" id="lbrhs" v-model="model.candidat.ref_managers" placeholder="Entrer nb exps" class="form-control" disabled />    
          </div>-->
          <label for="lbtags">Tags</label>
          <input
            type="text"
            id="lbtags"
            v-model="model.candidat.tags"
            placeholder="Entrer tags"
            class="form-control"
          />

          <div class="multi_select_box">
            <label for="lbstatus">Status:</label>
            <select name="name" v-model="model.candidat.dc_status">
              <option
                v-for="(stadc, index) in DcStatusList"
                :value="stadc.value"
                :key="index"
              >
                {{ stadc.text }}
              </option>
            </select>
          </div>
          <br />
          <div style="overflow: hidden">
            <button type="submit" id="submit" class="js-new">
              MAJ Candidat
            </button>
            <br /><br />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urldc from "../_helpers/urllist.js";
import $ from "jquery";
import DcStatusEnum from "../_helpers/enum-dcStatus";

import "../assets/select/css/bootstrap-select.min.css";
import "../assets/select/js/bootstrap-select.min.js";
//import "../assets/select/js/jquery-3.5.0.min.js";
//import "../assets/select/js/bootstrap.bundle";
//import "../assets/select/css/bootstrap.css"

export default {
  name: "EditCandidat",
  data() {
    return {
      error: "",
      DcStatusEnum,
      DcStatusList: [
        { value: 1, text: "Initialisé" },
        { value: 2, text: "Saisie_Encours" },
        { value: 3, text: "Finalisé" },
        { value: 4, text: "Terminé" },
      ],
      DcManagerList: [],
      model: {
        candidat: {
          id: { type: String, required: true },
          firstname: { type: String, required: true },
          familyname: { type: String, required: true },
          email: { type: String, required: true },
          poste: { type: String, required: true },
          nbexps: { type: Number, required: true },
          dc_status: { type: Number },
          status_name: { type: String },
          ref_managers: { type: String },
          tags: { type: String },
          manager_name: { type: String },
        },
      },
    };
  },
  mounted() {
    document.getElementById("lbfamilyname").focus();
    this.getCandidatData(this.$route.params.id);
  },

  methods: {
    getUser() {
      return localStorage.getItem("useraccount");
    },
    getLogins(mg, mn) {
      try {
        const url = urldc.getLoginUrl();
        axios.get(url).then((res) => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              this.DcManagerList = res.data;
              let tesd = mg;
              if (tesd == null) tesd = mn;
              $(function () {
                var options = [];
                //if (tesd == null)
                var selectedOptions = tesd.split(",");

                for (var i in selectedOptions) {
                 // alert("count: "+ selectedOptions.length)
                  if (selectedOptions.length == 1) {
                    options.push(selectedOptions[i]);
                  } else {
                    if (mn != selectedOptions[i]) {
                      options.push(selectedOptions[i]);
                    }
                  }
                }
                $("#slManager").selectpicker("val", options);
              });
              break;
            default:
              this.error =
                "Database error! Status: " +
                result.status +
                " Error: " +
                result.data;
              break;
          }
        });
      } catch (err) {
        this.error = err;
      }
    },
    getSelectedManager(mn) {
      var selectedvalues = "";
      for (var option of document.getElementById("slManager").options) {
        if (option.selected) {
          // alert("opt: "+ option.value + "mn: "+ mn)
          if (option.value != mn) {
            selectedvalues += option.value + ",";
          }
        }
      }
      selectedvalues += mn;
      return selectedvalues;
    },
    getCandidatData(dcId) {
      const url = urldc.getDcUrl(dcId);
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            this.model.candidat = res.data[0];
            this.getLogins(
              this.model.candidat.ref_managers,
              this.model.candidat.manager_name
            );
          }
          if (res.status == 203) {
            this.error = res.data;
          }
        })
        .catch(function (err) {
          if (err.response) {
            this.error = err.response.data.errors;
          }
        });
    },

    async updateCandidat() {
      try {
        const url = urldc.getDcAdminUrl(this.model.candidat.id);
        this.model.candidat.ref_managers = this.getSelectedManager(
          this.model.candidat.manager_name
        );
        alert("M" + this.model.candidat.ref_managers);
        let result = await axios.put(url, {
          familyname: this.model.candidat.familyname,
          firstname: this.model.candidat.firstname,
          email: this.model.candidat.email,
          dc_status: this.model.candidat.dc_status,
          tags: this.model.candidat.tags,
          poste: this.model.candidat.poste,
          nbexps: this.model.candidat.nbexps,
          ref_managers: this.model.candidat.ref_managers,
        });
        console.log(result);
        switch (result.status) {
          case 201:
            this.$router.push({ name: "user" });
            break;
          case 202:
          case 203:
          default:
            this.error = result.data;
            break;
        }
      } catch (err) {
        this.error = err.errors;
      }
    },
  },
};
</script>
<style scoped>
.multi_select_box {
  width: 300px;
  margin: 20px auto;
}
.multi_select_box select {
  width: 100%;
}
.multi_select_box button {
  background-color: darkblue !important ;
  color: #fff !important;
  padding: 15px 25px;
}
</style>
