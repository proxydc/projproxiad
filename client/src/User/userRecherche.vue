<template>
  <div>
    <div
      v-if="error != ''"
      class="alert alert-danger alert-dismissible fade show"
    >
      <strong>{{ error }}</strong>
    </div>
    <div
      v-if="warning != ''"
      class="alert alert-warning alert-dismissible fade show"
    >
      <strong>{{ warning }}</strong>
    </div>
    <div
      v-if="success != ''"
      class="alert alert-success alert-dismissible fade show"
    >
      <strong>{{ success }}</strong>
    </div>
    <div class="d-flex gap-2 py-3">
    </div>

    <div class="container w-50 p-1 bg-light border border-success">
      <label>Recherches Avances</label>
      <div id="demo">
        <div class="row">
          <div class="col col-5">
            <label for="">Début</label>
            <input
              type="date"
              v-model="stcreationdate"
              id=""
              class="form-control"
              aria-label="Date de début"
            />
          </div>
          <div class="col col-5">
            <label for="">Fin</label>
            <input
              type="date"
              v-model="encreationdate"
              id=""
              class="form-control"
              aria-label="Date de fin"
            />
          </div>
          <div class="col col-2">
            <br />
            <button
              v-if="btnOK == true"
              type="button"
              class="btn btn-outline-primary"
              @click="getDcsParDate()"
            >
              OK
            </button>
            <button
              v-else
              type="button"
              class="btn btn-outline-primary"
              @click="Clear()"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container p-3 my-2 bg-light border border-primary">
      <table id="usertable" class="table table-striped" style="width: 100%">
        <thead>
          <tr class="filters">
            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">Créator</th>
                <th scope="col">Status</th>
                <th scope="col">Tags</th>
                <th scope="col">RH</th>
                <th scope="col">Date de création</th>
                <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="(acRow, index) in this.AcRows" :key="index">
            <td class="text-start">{{ acRow.familyname }}</td>
            <td class="text-start">{{ acRow.firstname }}</td>
            <td class="text-start">{{ acRow.manager_name }}</td>
            <td class="text-start">{{ acRow.status_name }}</td>
            <td class="text-start">{{ acRow.tags }}</td>
            <td class="text-start">{{ acRow.ref_managers }}</td>
            <td class="text-start">{{ new Date(acRow.creation_date).toLocaleDateString() }}</td>
                <!--       <td class="text-start">{{ acRow.creation_date }}</td>
            <td class="text-start">{{ new Date(new Date(acRow.creation_date).setDate(new Date(acRow.creation_date).getDate())).toLocaleDateString()}}</td>
            <td class="text-start">{{ new Date(acRow.creation_date).toLocaleDateString()}}</td>
          <td class="text-start">{{ acRow.creation_date }}</td>-->
            <td>
              <a class="bi bi-pencil-square btn btn-outline-success btn-sm" :href="'/#/editDC/' + acRow.id"
                    v-b-tooltip.hover title="Editer le candidat!" />

                  <b-button v-if="getUser() == 'admin'" type="button" class="bi bi-trash3 btn btn-outline-danger btn-sm mx-1"
                    @click="deleteDC(acRow.id)" v-b-tooltip.hover title="Supprimer le candidat!" />

                  <a class="bi bi-eye-fill btn btn-outline-success btn-sm mx-1"
                    :href="'/#/formCandidatSaisie/' + acRow.id" target="_blank" v-b-tooltip.hover
                    title="Voir le candidat!" />
                  <button class="bi bi-copy btn btn-outline-success btn-sm mx-1" @click="CopyUrl(acRow.id)"
                    v-b-tooltip.hover title="Copie l'URL" />
                  <a class="bi bi-download btn btn-outline-primary btn-sm mx-1" :href="'/#/dcDownload/' + acRow.id"
                    target="_blank" v-b-tooltip.hover title="Télécharger le document!" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div></div>
  </div>
</template>
<script defer>
import Admin_Layout from "../admin/admin_Layout.vue";
import axios from "axios";
import urldc from "../_helpers/urllist.js";
import $ from "jquery";

export default {
  name: "userRecherche",
  components: { Admin_Layout },
  data() {
    return {
      AcRows: [],
      error: "",
      warning: "",
      success: "",
      stcreationdate: { type: Date },
      encreationdate: { type: Date },
      btnOK: true,
    };
  },
  mounted() {
    try {
      this.getDCs();
      console.log("data: " + this.AcRows);
      this.stcreationdate = "2024-01-01";
      this.encreationdate = new Date().toJSON().slice(0, 10);
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    getUser(){
            return localStorage.getItem('useraccount')
        },
    Clear() {
      window.location.reload();
    },
    async getDcsParDate() {
      try {
        const url = urldc.getDcsUrlParDate();
        //alert("cr: "+ this.stcreationdate+" fin: "+ this.encreationdate)
        let result = await axios.post(url, {
          stcreationdate: this.stcreationdate,
          encreationdate: this.encreationdate,
        });
        console.log(result.data);
        switch (result.status) {
          case 200:
            //this.AcRows.destroy();
            this.AcRows = result.data;
            this.error = "";
            this.btnOK = false;
           // if($("#usertable").DataTable.isDataTable())
           // { 
            // alert("iam here");
            $("#usertable").DataTable().destroy();
          //}
            this.createDataTable();
            break;
          default:
            this.error =
              "Database error! Status: " +
              result.status +
              " Error: " +
              result.data;
            break;
        }
      } catch (err) {
        this.error = err;
      }
    },
    createDataTable()
    {
      $(document).ready(function () {
                $("#usertable").DataTable({
                  order: [],
                  columnDefs: [
                    {
                      targets: 5,
                      orderable: false,
                    },
                  ],
                  title: "",
                  pageLength: 5,
                  lengthMenu: [
                    [5, 10, 20, 25, 50, 100, -1],
                    [5, 10, 20, 25, 50, 100, "Tout"],
                  ],
                  language: {
                    search: "Rechercher:",
                    lengthMenu: "Lignes par page _MENU_",
                    zeroRecords: "Aucun candidats",
                    info: "Page _PAGE_ sur _PAGES_ de _TOTAL_ candidats",
                    infoEmpty: "Aucun candidats disponibles.",
                    infoFiltered: "",
                    paginate: {
                      next: "Suivant",
                      previous: "Précedent",
                      title: "Candidats",
                    },
                  },
                  layout: {
                    top: {
                      buttons: [
                        {
                          extend: "excel",
                          title: "Liste des Candidats",
                        },
                        "spacer",
                        {
                          extend: "pdf",
                          title: "Liste des Candidats",
                        },
                        "spacer",
                        {
                          extend: "print",
                          title: "Liste des Candidats",
                        },
                      ],
                    },
                  },
                });
              });
    },
    getDCs() {
      try {
        const url = urldc.getDcsUrl();
        axios.get(url).then((res) => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              this.AcRows = res.data;
              /*if($("#usertable").DataTable.isDataTable())
                {$("#usertable").DataTable().destroy();}*/
                this.createDataTable();
             /* $(document).ready(function () {
                $("#usertable").DataTable({
                  order: [],
                  columnDefs: [
                    {
                      targets: 5,
                      orderable: false,
                    },
                  ],
                  title: "",
                  pageLength: 5,
                  lengthMenu: [
                    [5, 10, 20, 25, 50, 100, -1],
                    [5, 10, 20, 25, 50, 100, "Tout"],
                  ],
                  language: {
                    search: "Rechercher:",
                    lengthMenu: "Lignes par page _MENU_",
                    zeroRecords: "Aucun candidats",
                    info: "Page _PAGE_ sur _PAGES_ de _TOTAL_ candidats",
                    infoEmpty: "Aucun candidats disponibles.",
                    infoFiltered: "",
                    paginate: {
                      next: "Suivant",
                      previous: "Précedent",
                      title: "Candidats",
                    },
                  },
                  layout: {
                    top: {
                      buttons: [
                        {
                          extend: "excel",
                          title: "Liste des Candidats",
                        },
                        "spacer",
                        {
                          extend: "pdf",
                          title: "Liste des Candidats",
                        },
                        "spacer",
                        {
                          extend: "print",
                          title: "Liste des Candidats",
                        },
                      ],
                    },
                  },
                });
              });*/
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
    openAddDC() {
      this.$router.push({ name: "AddDC" });
    },
    deleteDC(dcId) {
      try {
        this.success = "";
        this.warning = "";
        this.error = "";
        if (
          confirm("Are you sure, you want to delete this dc. DC Id: " + dcId)
        ) {
          const url = urldc.getDelDcUrl(dcId);
          axios
            .delete(url)
            .then((res) => {
              console.log(res.data);
              switch (res.status) {
                case 200:
                  this.getDCs();
                  this.success = res.data;
                  break;
                case 202:
                  this.warning = res.data;
                  break;
                default:
                  this.error =
                    "Database error! Status: " +
                    result.status +
                    " Error: " +
                    result.data;
                  break;
              }
            })
            .catch(function (err) {
              if (err.response) {
                this.error = err.response.data.errors;
              }
            });
        }
      } catch (err) {
        this.error = err;
      }
    },
    goToDC(dcId) {
      try {
        let self = this;
        self.$router.push(`/formCandidatSaisie/${dcId}`);
      } catch (err) {
        this.error = err;
      }
    },
    CopyUrl(id) {
      try {
        const siteurl =
          process.env.NODE_ENV == "production"
            ? process.env.VUE_APP_SITEURLPROD
            : process.env.VUE_APP_SITEURLDEV;
        console.log("siteurl: " + siteurl + process.env.NODE_ENV);
        var content = siteurl + "/#/formCandidatSaisie/" + id;
        navigator.clipboard.writeText(content);
      } catch (err) {
        this.error = err;
      }
    },
  }, 
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a.btn-sm {
  margin-right: 5px;
}

img {
  border: 1px solid #ddd;
  border-radius: 1px;
  padding: 2px;
  width: 15px;
}

tfoot input {
  width: 100%;
  padding: 3px;
  box-sizing: border-box;
}
.filterable {
  margin-top: 15px;
}
.filterable .panel-heading .pull-right {
  margin-top: -20px;
}
.filterable .filters input[disabled] {
  background-color: transparent;
  border: none;
  cursor: auto;
  box-shadow: none;
  padding: 0;
  height: auto;
}
.filterable .filters input[disabled]::-webkit-input-placeholder {
  color: #333;
}
.filterable .filters input[disabled]::-moz-placeholder {
  color: #333;
}
.filterable .filters input[disabled]:-ms-input-placeholder {
  color: #333;
}
</style>
