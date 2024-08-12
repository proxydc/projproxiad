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
      <button
        type="button"
        class="btn btn-outline-primary"
        @click="openAddAccount()"
      >
        Nouveau compte
      </button>
    </div>
    <div class="container p-3 my-2 bg-light border border-primary">
      <div class="row">
        <div class="col">
          <table
            id="admintable"
            class="table table-striped"
            style="width: 100%"
          >
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Login</th>
                <th scope="col">Nom</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(acRow, index) in this.AcRows" :key="index">
                <th scope="row">{{ acRow.id }}</th>
                <td class="text-start">{{ acRow.login_name }}</td>
                <td class="text-start">{{ acRow.display_name }}</td>
                <td class="text-start">{{ acRow.role_name }}</td>
                <td class="text-start">
                  <!--  <button class="btn btn-success mx-2" @click="editAccount(acRow.id)" v-b-tooltip.hover title="Edit the user!">Edit
                  </button>
                  <button type="button" class="btn btn-danger mx-2" @click="deleteAccount(acRow.id)" v-b-tooltip.hover title="Delete the user!">
                  Delete</button>-->
                  <a
                    class="bi bi-pencil-square btn btn-outline-success mx-1"
                    @click="editAccount(acRow.id)"
                    v-b-tooltip.hover
                    title="Modifier ce user!"
                  />
                  <b-button
                    type="button"
                    class="bi bi-trash3 btn btn-outline-danger mx-1"
                    @click="deleteAccount(acRow.id)"
                    v-b-tooltip.hover
                    title="Supprimer ce user!"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import Admin_Layout from "../admin/admin_Layout.vue";
import urlacc from "../_helpers/urllist.js";
import $ from "jquery";

/*import pdfFonts from '../assets/vfs_fonts.js';
import JSZip from 'jszip';
import pdfMake from 'pdfmake';
//import 'datatables.net-buttons-bs5';
//import 'datatables.net-buttons/js/buttons.html5.mjs';
//import 'datatables.net-buttons/js/buttons.print.mjs';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = JSZip;*/


export default {
  name: "admin",
  components: { Admin_Layout },
  data() {
    return {
      AcRows: [],
      error: "",
      warning: "",
      success: "",
    };
  },
  mounted() {
    try {
      this.getLogins();
      console.log("data: " + this.AcRows);
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    getLogins() {
      try {
        const url = urlacc.getLoginUrl();
        axios.get(url).then((res) => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              this.AcRows = res.data;
              $(document).ready(function () {    
                $('#admintable').DataTable({
                  "order": [],
                  "columnDefs": [{
                    "targets": 4,
                    "orderable": false,
                  }],
                  pageLength: 25,
                  lengthMenu: [[5, 10, 20, 25, 50, 100, -1], [5, 10, 20, 25, 50, 100, 'Tout']],
                   "language": {
      "search": "Rechercher:",
      "lengthMenu": "Lignes par page _MENU_",
      "zeroRecords": "Aucun comptes",
      "info": "Page _PAGE_ sur _PAGES_",
      "infoEmpty": "Aucun comptes disponibles.",
      "infoFiltered": "",//"(filteré de la _MAX_ totale comptes)",
      "paginate": {
        "next": "Suivant",
        "previous": "Précedent"
      },},

      layout: {
        top: {
                // buttons:['excel','spacer', 'pdf','spacer', 'print'],
                buttons: 
              [
                {
                  extend: 'excel', 
                  title: 'Liste des Utilisateurs', 
                }, 
                'spacer', 
                {
                  extend: 'pdf', 
                  title: 'Liste des Utilisateurs', 
                },
                'spacer', 
                {
                  extend: 'print', 
                  title: 'Liste des Utilisateurs', 
                 },
              ],  
        }
    }
                });
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
    openAddAccount() {
      this.$router.push({ name: "AddAccount" });
    },
    deleteAccount(accountId) {
      try {
        this.success = "";
        this.warning = "";
        this.error = "";
        if (
          confirm(
            "Are you sure, you want to delete this account. Account Id: " +
              accountId
          )
        ) {
          const url = urlacc.getEditDelAccUrl(accountId);
          axios
            .delete(url)
            .then((res) => {
              console.log(res.data);
              switch (res.status) {
                case 200:
                  this.getLogins();
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
                this.error = err.response;
              }
            });
        }
      } catch (err) {
        this.error = err;
      }
    },
    editAccount(accountId) {
      this.$router.push({ path: "/editAccount/" + accountId });
    },
  },
};
</script>
  