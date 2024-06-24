<template>
  <div>
    <div v-if="error != ''" class="alert alert-danger alert-dismissible fade show">
      <strong>{{ error }}</strong>
    </div>
    <div v-if="warning != ''" class="alert alert-warning alert-dismissible fade show">
      <strong>{{ warning }}</strong>
    </div>
    <div v-if="success != ''" class="alert alert-success alert-dismissible fade show">
      <strong>{{ success }}</strong>
    </div>
    <div class="d-flex gap-2 py-3">
      <button type="button" class="btn btn-outline-primary" @click="openAddDC()">
        Nouveau candidat
      </button>
    </div>
    <div class="container p-3 my-2 bg-light border border-primary">
      <!--<div class="row">
        <div class="panel panel-primary filterable">
          <div class="panel-heading">
            <h3 class="panel-title">Candidats</h3>
            <div class="pull-right">
              <button class="btn btn-default btn-xs btn-filter"><span class="glyphicon glyphicon-filter"></span>
                Filter</button>
            </div>
          </div>-->
          <table id="usertable" class="table table-striped" style="width:100%">
            <thead>
              <tr  class="filters">
              <!--  <th><input type="text" class="form-control" placeholder="Nom" disabled></th>
                <th><input type="text" class="form-control" placeholder="Prénom" disabled></th>
                <th><input type="text" class="form-control" placeholder="RH" disabled></th>
                <th><input type="text" class="form-control" placeholder="Status" disabled></th>
                <th><input type="text" class="form-control" placeholder="Tags" disabled></th>-->
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">RH</th>
                <th scope="col">Status</th>
                <th scope="col">Tags</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
         <!--   <tfoot style="display: table-header-group;">
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>RH</th>
                <th>Status</th>
                <th>Tags</th>
                <th>Salary</th>
              </tr>
            </tfoot>-->
            <tbody class="table-group-divider">
              <tr v-for="(acRow, index) in this.AcRows" :key="index">
                <td class="text-start">{{ acRow.familyname }}</td>
                <td class="text-start">{{ acRow.firstname }}</td>
                <td class="text-start">{{ acRow.manager_name }}</td>
                <td class="text-start">{{ acRow.status_name }}</td>
                <td class="text-start">{{ acRow.tags }}</td>
                <td>
                  <!--  <a class="btn btn-success mx-2" :href="'/#/editDC/' + acRow.id" v-b-tooltip.hover title="Modifier le candidat!">
                Modifier
              </a>
              <b-button type="button" class="btn btn-danger mx-2" @click="deleteDC(acRow.id)" v-b-tooltip.hover title="Supprimer le candidat!">
                Supprimer
              </b-button>
              <a class=" btn btn-outline-success btn-sm" :href="'/#/formCandidatSaisie/' + acRow.id" target="_blank" v-b-tooltip.hover title="Voir le dossier de candidat!">
                Voir le dossier
              </a>
              <img type="button" class="btn btn-outline-warning btn-sm" src="../assets/copyimage.png"
                @click="CopyUrl(acRow.id)" />
              <a class=" btn btn-outline-primary btn-sm mx-2" :href="'/#/dcDownload/' + acRow.id" target="_blank" v-b-tooltip.hover title="Télécharger le document!">
                Télécharger
              </a>-->
                  <a class="bi bi-pencil-square btn btn-outline-success btn-sm" :href="'/#/editDC/' + acRow.id"
                    v-b-tooltip.hover title="Editer le candidat!" />
                  <b-button type="button" class="bi bi-trash3 btn btn-outline-danger btn-sm mx-1"
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
       <!-- </div>
      </div>-->
    </div>
    <div>
    </div>
  </div>
</template>
<script>
import Admin_Layout from "../admin/admin_Layout.vue";
import axios from "axios";
import urldc from "../_helpers/urllist.js";
import $ from "jquery";
export default {
  name: "user",
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
      this.getDCs();
      console.log("data: " + this.AcRows);
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    getDCs() {
      try {
        const url = urldc.getDcsUrl();
        //alert("url: "+url);
        axios.get(url).then((res) => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              this.AcRows = res.data;
              $(document).ready(function () {
               /* $('.filterable .btn-filter').click(function(){
        var $panel = $(this).parents('.filterable'),
        $filters = $panel.find('.filters input'),
        $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') == true) {
            $filters.prop('disabled', false);
            $filters.first().focus();
        } else {
            $filters.val('').prop('disabled', true);
            $tbody.find('.no-result').remove();
            $tbody.find('tr').show();
        }
    });
    $('.filterable .filters input').keyup(function(e){
        /* Ignore tab key */
        /*var code = e.keyCode || e.which;
        if (code == '9') return;
        /* Useful DOM data and selectors */
       /* var $input = $(this),
        inputContent = $input.val().toLowerCase(),
        $panel = $input.parents('.filterable'),
        column = $panel.find('.filters th').index($input.parents('th')),
        $table = $panel.find('.table'),
        $rows = $table.find('tbody tr');
        /* Dirtiest filter function ever ;) */
        /*var $filteredRows = $rows.filter(function(){
            var value = $(this).find('td').eq(column).text().toLowerCase();
            return value.indexOf(inputContent) === -1;
        });
        /* Clean previous no-result if exist */
       /* $table.find('tbody .no-result').remove();
        /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
       /* $rows.show();
        $filteredRows.hide();
        /* Prepend no-result row if all rows are filtered */
       /* if ($filteredRows.length === $rows.length) {
            $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="'+ $table.find('.filters th').length +'">No result found</td></tr>'));
        }
    });*/




                $('#usertable').DataTable({
                  "order": [],
                  "columnDefs": [{
                    "targets": 5,
                    "orderable": false,
                  }],
                  pageLength: 5,
                  lengthMenu: [[5, 10, 20, 25, 50, 100, -1], [5, 10, 20, 25, 50, 100, 'Tout']],
                 /* buttons:['copy', 'csv', 'excel', 'pdf', 'print'],*/
                 "language": {
      "search": "Rechercher:",
      "lengthMenu": "Montrer _MENU_ candidats per page",
      "zeroRecords": "Aucun candidats",
      "info": "Montrer page _PAGE_ sur _PAGES_",
      "infoEmpty": "Aucun candidats disponibles.",
      "infoFiltered": "(filteré de la _MAX_ totale candidats)",
      "paginate": {
        "next": "Suivant",
        "previous": "Précedent"
      },}
                });
              });
              break;
            default:
              this.error = "Database error! Status: " + result.status + " Error: " + result.data;
              break;
          }
        });
      }
      catch (err) {
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
        if (confirm("Are you sure, you want to delete this dc. DC Id: " + dcId)) {
          const url = urldc.getDelDcUrl(dcId);
          axios.delete(url).then(res => {
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
                this.error = "Database error! Status: " + result.status + " Error: " + result.data;
                break;
            }
          }).catch(function (err) {
            if (err.response) {
              this.error = err.response.data.errors;
            }
          });
        }
      }
      catch (err) {
        this.error = err;
      }
    },
    goToDC(dcId) {
      try {
        let self = this;
        self.$router.push(`/formCandidatSaisie/${dcId}`);
      }
      catch (err) {
        this.error = err;
      }
    },
    CopyUrl(id) {
      try {
        const siteurl = process.env.NODE_ENV == 'production' ? process.env.VUE_APP_SITEURLPROD : process.env.VUE_APP_SITEURLDEV;
        console.log("siteurl: " + siteurl + process.env.NODE_ENV)
        var content = siteurl + "/#/formCandidatSaisie/" + id;
        navigator.clipboard.writeText(content);
      }
      catch (err) {
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