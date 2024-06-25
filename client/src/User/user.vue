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
          <table id="usertable" class="table table-striped display nowrap" style="width:100%">
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
    <table id="example" class="display nowrap" style="width:100%">
        <thead>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Tiger Nixon</td>
                <td>System Architect</td>
                <td>Edinburgh</td>
                <td>61</td>
                <td>2011-04-25</td>
                <td>$320,800</td>
            </tr>
            <tr>
                <td>Garrett Winters</td>
                <td>Accountant</td>
                <td>Tokyo</td>
                <td>63</td>
                <td>2011-07-25</td>
                <td>$170,750</td>
            </tr>
            <tr>
                <td>Ashton Cox</td>
                <td>Junior Technical Author</td>
                <td>San Francisco</td>
                <td>66</td>
                <td>2009-01-12</td>
                <td>$86,000</td>
            </tr>
            <tr>
                <td>Cedric Kelly</td>
                <td>Senior Javascript Developer</td>
                <td>Edinburgh</td>
                <td>22</td>
                <td>2012-03-29</td>
                <td>$433,060</td>
            </tr>
            <tr>
                <td>Airi Satou</td>
                <td>Accountant</td>
                <td>Tokyo</td>
                <td>33</td>
                <td>2008-11-28</td>
                <td>$162,700</td>
            </tr>
            <tr>
                <td>Brielle Williamson</td>
                <td>Integration Specialist</td>
                <td>New York</td>
                <td>61</td>
                <td>2012-12-02</td>
                <td>$372,000</td>
            </tr>
            <tr>
                <td>Herrod Chandler</td>
                <td>Sales Assistant</td>
                <td>San Francisco</td>
                <td>59</td>
                <td>2012-08-06</td>
                <td>$137,500</td>
            </tr>
            <tr>
                <td>Rhona Davidson</td>
                <td>Integration Specialist</td>
                <td>Tokyo</td>
                <td>55</td>
                <td>2010-10-14</td>
                <td>$327,900</td>
            </tr>
            <tr>
                <td>Colleen Hurst</td>
                <td>Javascript Developer</td>
                <td>San Francisco</td>
                <td>39</td>
                <td>2009-09-15</td>
                <td>$205,500</td>
            </tr>
            <tr>
                <td>Sonya Frost</td>
                <td>Software Engineer</td>
                <td>Edinburgh</td>
                <td>23</td>
                <td>2008-12-13</td>
                <td>$103,600</td>
            </tr>
            <tr>
                <td>Jena Gaines</td>
                <td>Office Manager</td>
                <td>London</td>
                <td>30</td>
                <td>2008-12-19</td>
                <td>$90,560</td>
            </tr>
            <tr>
                <td>Quinn Flynn</td>
                <td>Support Lead</td>
                <td>Edinburgh</td>
                <td>22</td>
                <td>2013-03-03</td>
                <td>$342,000</td>
            </tr>
            <tr>
                <td>Charde Marshall</td>
                <td>Regional Director</td>
                <td>San Francisco</td>
                <td>36</td>
                <td>2008-10-16</td>
                <td>$470,600</td>
            </tr>
            <tr>
                <td>Haley Kennedy</td>
                <td>Senior Marketing Designer</td>
                <td>London</td>
                <td>43</td>
                <td>2012-12-18</td>
                <td>$313,500</td>
            </tr>
            <tr>
                <td>Tatyana Fitzpatrick</td>
                <td>Regional Director</td>
                <td>London</td>
                <td>19</td>
                <td>2010-03-17</td>
                <td>$385,750</td>
            </tr>
            <tr>
                <td>Michael Silva</td>
                <td>Marketing Designer</td>
                <td>London</td>
                <td>66</td>
                <td>2012-11-27</td>
                <td>$198,500</td>
            </tr>
            <tr>
                <td>Paul Byrd</td>
                <td>Chief Financial Officer (CFO)</td>
                <td>New York</td>
                <td>64</td>
                <td>2010-06-09</td>
                <td>$725,000</td>
            </tr>
            <tr>
                <td>Gloria Little</td>
                <td>Systems Administrator</td>
                <td>New York</td>
                <td>59</td>
                <td>2009-04-10</td>
                <td>$237,500</td>
            </tr>
            <tr>
                <td>Bradley Greer</td>
                <td>Software Engineer</td>
                <td>London</td>
                <td>41</td>
                <td>2012-10-13</td>
                <td>$132,000</td>
            </tr>
            <tr>
                <td>Dai Rios</td>
                <td>Personnel Lead</td>
                <td>Edinburgh</td>
                <td>35</td>
                <td>2012-09-26</td>
                <td>$217,500</td>
            </tr>
            <tr>
                <td>Jenette Caldwell</td>
                <td>Development Lead</td>
                <td>New York</td>
                <td>30</td>
                <td>2011-09-03</td>
                <td>$345,000</td>
            </tr>
            <tr>
                <td>Yuri Berry</td>
                <td>Chief Marketing Officer (CMO)</td>
                <td>New York</td>
                <td>40</td>
                <td>2009-06-25</td>
                <td>$675,000</td>
            </tr>
            <tr>
                <td>Caesar Vance</td>
                <td>Pre-Sales Support</td>
                <td>New York</td>
                <td>21</td>
                <td>2011-12-12</td>
                <td>$106,450</td>
            </tr>
            <tr>
                <td>Doris Wilder</td>
                <td>Sales Assistant</td>
                <td>Sydney</td>
                <td>23</td>
                <td>2010-09-20</td>
                <td>$85,600</td>
            </tr>
            <tr>
                <td>Angelica Ramos</td>
                <td>Chief Executive Officer (CEO)</td>
                <td>London</td>
                <td>47</td>
                <td>2009-10-09</td>
                <td>$1,200,000</td>
            </tr>
            <tr>
                <td>Gavin Joyce</td>
                <td>Developer</td>
                <td>Edinburgh</td>
                <td>42</td>
                <td>2010-12-22</td>
                <td>$92,575</td>
            </tr>
            <tr>
                <td>Jennifer Chang</td>
                <td>Regional Director</td>
                <td>Singapore</td>
                <td>28</td>
                <td>2010-11-14</td>
                <td>$357,650</td>
            </tr>
            <tr>
                <td>Brenden Wagner</td>
                <td>Software Engineer</td>
                <td>San Francisco</td>
                <td>28</td>
                <td>2011-06-07</td>
                <td>$206,850</td>
            </tr>
            <tr>
                <td>Fiona Green</td>
                <td>Chief Operating Officer (COO)</td>
                <td>San Francisco</td>
                <td>48</td>
                <td>2010-03-11</td>
                <td>$850,000</td>
            </tr>
            <tr>
                <td>Shou Itou</td>
                <td>Regional Marketing</td>
                <td>Tokyo</td>
                <td>20</td>
                <td>2011-08-14</td>
                <td>$163,000</td>
            </tr>
            <tr>
                <td>Michelle House</td>
                <td>Integration Specialist</td>
                <td>Sydney</td>
                <td>37</td>
                <td>2011-06-02</td>
                <td>$95,400</td>
            </tr>
            <tr>
                <td>Suki Burks</td>
                <td>Developer</td>
                <td>London</td>
                <td>53</td>
                <td>2009-10-22</td>
                <td>$114,500</td>
            </tr>
            <tr>
                <td>Prescott Bartlett</td>
                <td>Technical Author</td>
                <td>London</td>
                <td>27</td>
                <td>2011-05-07</td>
                <td>$145,000</td>
            </tr>
            <tr>
                <td>Gavin Cortez</td>
                <td>Team Leader</td>
                <td>San Francisco</td>
                <td>22</td>
                <td>2008-10-26</td>
                <td>$235,500</td>
            </tr>
            <tr>
                <td>Martena Mccray</td>
                <td>Post-Sales support</td>
                <td>Edinburgh</td>
                <td>46</td>
                <td>2011-03-09</td>
                <td>$324,050</td>
            </tr>
            <tr>
                <td>Unity Butler</td>
                <td>Marketing Designer</td>
                <td>San Francisco</td>
                <td>47</td>
                <td>2009-12-09</td>
                <td>$85,675</td>
            </tr>
            <tr>
                <td>Howard Hatfield</td>
                <td>Office Manager</td>
                <td>San Francisco</td>
                <td>51</td>
                <td>2008-12-16</td>
                <td>$164,500</td>
            </tr>
            <tr>
                <td>Hope Fuentes</td>
                <td>Secretary</td>
                <td>San Francisco</td>
                <td>41</td>
                <td>2010-02-12</td>
                <td>$109,850</td>
            </tr>
            <tr>
                <td>Vivian Harrell</td>
                <td>Financial Controller</td>
                <td>San Francisco</td>
                <td>62</td>
                <td>2009-02-14</td>
                <td>$452,500</td>
            </tr>
            <tr>
                <td>Timothy Mooney</td>
                <td>Office Manager</td>
                <td>London</td>
                <td>37</td>
                <td>2008-12-11</td>
                <td>$136,200</td>
            </tr>
            <tr>
                <td>Jackson Bradshaw</td>
                <td>Director</td>
                <td>New York</td>
                <td>65</td>
                <td>2008-09-26</td>
                <td>$645,750</td>
            </tr>
            <tr>
                <td>Olivia Liang</td>
                <td>Support Engineer</td>
                <td>Singapore</td>
                <td>64</td>
                <td>2011-02-03</td>
                <td>$234,500</td>
            </tr>
            <tr>
                <td>Bruno Nash</td>
                <td>Software Engineer</td>
                <td>London</td>
                <td>38</td>
                <td>2011-05-03</td>
                <td>$163,500</td>
            </tr>
            <tr>
                <td>Sakura Yamamoto</td>
                <td>Support Engineer</td>
                <td>Tokyo</td>
                <td>37</td>
                <td>2009-08-19</td>
                <td>$139,575</td>
            </tr>
            <tr>
                <td>Thor Walton</td>
                <td>Developer</td>
                <td>New York</td>
                <td>61</td>
                <td>2013-08-11</td>
                <td>$98,540</td>
            </tr>
            <tr>
                <td>Finn Camacho</td>
                <td>Support Engineer</td>
                <td>San Francisco</td>
                <td>47</td>
                <td>2009-07-07</td>
                <td>$87,500</td>
            </tr>
            <tr>
                <td>Serge Baldwin</td>
                <td>Data Coordinator</td>
                <td>Singapore</td>
                <td>64</td>
                <td>2012-04-09</td>
                <td>$138,575</td>
            </tr>
            <tr>
                <td>Zenaida Frank</td>
                <td>Software Engineer</td>
                <td>New York</td>
                <td>63</td>
                <td>2010-01-04</td>
                <td>$125,250</td>
            </tr>
            <tr>
                <td>Zorita Serrano</td>
                <td>Software Engineer</td>
                <td>San Francisco</td>
                <td>56</td>
                <td>2012-06-01</td>
                <td>$115,000</td>
            </tr>
            <tr>
                <td>Jennifer Acosta</td>
                <td>Junior Javascript Developer</td>
                <td>Edinburgh</td>
                <td>43</td>
                <td>2013-02-01</td>
                <td>$75,650</td>
            </tr>
            <tr>
                <td>Cara Stevens</td>
                <td>Sales Assistant</td>
                <td>New York</td>
                <td>46</td>
                <td>2011-12-06</td>
                <td>$145,600</td>
            </tr>
            <tr>
                <td>Hermione Butler</td>
                <td>Regional Director</td>
                <td>London</td>
                <td>47</td>
                <td>2011-03-21</td>
                <td>$356,250</td>
            </tr>
            <tr>
                <td>Lael Greer</td>
                <td>Systems Administrator</td>
                <td>London</td>
                <td>21</td>
                <td>2009-02-27</td>
                <td>$103,500</td>
            </tr>
            <tr>
                <td>Jonas Alexander</td>
                <td>Developer</td>
                <td>San Francisco</td>
                <td>30</td>
                <td>2010-07-14</td>
                <td>$86,500</td>
            </tr>
            <tr>
                <td>Shad Decker</td>
                <td>Regional Director</td>
                <td>Edinburgh</td>
                <td>51</td>
                <td>2008-11-13</td>
                <td>$183,000</td>
            </tr>
            <tr>
                <td>Michael Bruce</td>
                <td>Javascript Developer</td>
                <td>Singapore</td>
                <td>29</td>
                <td>2011-06-27</td>
                <td>$183,000</td>
            </tr>
            <tr>
                <td>Donna Snider</td>
                <td>Customer Support</td>
                <td>New York</td>
                <td>27</td>
                <td>2011-01-25</td>
                <td>$112,000</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
            </tr>
        </tfoot>
    </table>
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
      "lengthMenu": "_MENU_ lignes par page",
      "zeroRecords": "Aucun candidats",
      "info": "Page _PAGE_ sur _PAGES_",
      "infoEmpty": "Aucun candidats disponibles.",
      "infoFiltered": "",//"(filteré de la _MAX_ totale candidats)",
      "paginate": {
        "next": "Suivant",
        "previous": "Précedent"
      },},
      layout: {
        topStart: {
          buttons: [
                {
                    extend: 'pdfHtml5',
                    messageTop: 'PDF created by PDFMake with Buttons for DataTables.'
                }
            ]
        }
    },
                });
              });
              $(document).ready(function () { $('#example').DataTable({
    layout: {
        topStart: {
            buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
        }
    }
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