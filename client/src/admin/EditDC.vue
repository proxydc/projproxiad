<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <h1>Editer Candidat</h1>
    <div class="container w-50 p-3 my-1 bg-light border border-info">
      <form class="was-validated" @submit.prevent="updateCandidat">
        <div class="register">
          <label for="lbfamilyname">Nom</label>
          <input type="text" v-model="model.candidat.familyname" class="form-control" id="lbfamilyname" required />
          <label for="lbfirstname">Prénom</label>
          <input type="text" id="lbfirstname" v-model="model.candidat.firstname" placeholder="Entrer Prénom" required
            class="form-control" />
          <label for="lbemail">Email</label>
          <input type="email" v-model="model.candidat.email" placeholder="Entrer Email" id="lbemail" required
            class="form-control" />
          <label for="lbposte">Poste</label>
          <input type="text" id="lbposte" v-model="model.candidat.poste" placeholder="Entrer poste" class="form-control" />
          <label for="lbexps">Nb.Exps</label>
          <input type="text" id="lbexps" v-model="model.candidat.nbexps" placeholder="Entrer nb exps" class="form-control" />
          <label for="lbtags">Tags</label>
          <input type="text" id="lbtags" v-model="model.candidat.tags" placeholder="Entrer tags" class="form-control" />
          <label for="lbstatus">Status:</label>
          <div style="overflow:hidden;">
            <select name="name" class="selectpicker show-tick" v-model="model.candidat.dc_status">
              <option v-for="(stadc,index) in DcStatusList" :value="stadc.value" :key="index">{{ stadc.text }}</option>
            </select>
          </div>
          <br />
          <div style="overflow:hidden;">
            <button type="submit" class="js-new">MAJ Candidat</button>
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
          tags: { type: String },
        },
      },
    };
  },
  mounted() {
    document.getElementById("lbfamilyname").focus();
    this.getCandidatData(this.$route.params.id);   
  },

  methods: {
    getCandidatData(dcId) {
      const url = urldc.getDcUrl(dcId);
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          if (res.status == 200)
            this.model.candidat = res.data[0];
          if (res.status == 203) {
            this.error = res.data;
          }
        }).catch(function (err) {
          if (err.response) {
            this.error = err.response.data.errors;
          }
        });
    },

    async updateCandidat() {
      try {
        const url = urldc.getDcAdminUrl(this.model.candidat.id);
        let result = await axios.put(url, {
          familyname: this.model.candidat.familyname,
          firstname: this.model.candidat.firstname,
          email: this.model.candidat.email,
          dc_status: this.model.candidat.dc_status,
          tags: this.model.candidat.tags,
          poste: this.model.candidat.poste,
          nbexps: this.model.candidat.nbexps,
        });
        console.log(result);
        switch (result.status) {
          case 201:
            this.$router.push({ name: 'user' })
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