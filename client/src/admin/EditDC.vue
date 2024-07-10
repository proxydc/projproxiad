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
          <div class="multi_select_box">
          <label for="lbrhs">RH</label>
        <!--  <input type="text" id="lbrhs" v-model="model.candidat.manager_id" placeholder="Entrer nb exps" class="form-control" />-->
            <select id="slManager" class="multi_select w-100" multiple data-selected-text-format=" count > 2">
              <option v-for="(rhdc,index) in DcManagerList" :value="rhdc.Id" :key="index">
                {{ rhdc.display_name }}
              </option>
            </select>
          </div>
          <label for="lbtags">Tags</label>
          <input type="text" id="lbtags" v-model="model.candidat.tags" placeholder="Entrer tags" class="form-control" />
         
          <div class="multi_select_box">
            <label for="lbstatus">Status:</label>
            <select name="name" v-model="model.candidat.dc_status">
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
          tags: { type: String },
        },
      },
    };
  },
  mounted() {
    /* const chBoxes = 
            document.querySelectorAll('.dropdown-menu input[type="checkbox"]'); 
        const dpBtn =  
            document.getElementById('multiSelectDropdown'); 
        let mySelectedListItems = []; 
  
        function handleCB() { 
            mySelectedListItems = []; 
            let mySelectedListItemsText = ''; 
  
            chBoxes.forEach((checkbox) => { 
                if (checkbox.checked) { 
                    mySelectedListItems.push(checkbox.value); 
                    mySelectedListItemsText += checkbox.value + ', '; 
                } 
            }); 
  
            dpBtn.innerText = 
                mySelectedListItems.length > 0 
                    ? mySelectedListItemsText.slice(0, -2) : 'Select'; 
        } 
  
        chBoxes.forEach((checkbox) => { 
            checkbox.addEventListener('change', handleCB); 
        });*/   

    this.getLogins();
    $('#slManager').change(function () {
  this.selectedManager = $('#slManager').val();
        //alert("test"+this.selectedManager );
    });  
    document.getElementById("lbfamilyname").focus();
    this.getCandidatData(this.$route.params.id);   
  },

  methods: {
    getLogins() {
      try {
        const url = urldc.getLoginUrl();
        axios.get(url).then((res) => {
          console.log(res.data);
          switch (res.status) {
            case 200:
              this.DcManagerList = res.data; 
              alert("her: "+this.DcManagerList[0].display_name);
              let v1='Alex';
              let v2='Nono';
              let tesd = "Alex,Nono";
              tesd = this.getSelectedManager();
              alert ("tt: "+ tesd);
             $(function () {
   // $('select').selectpicker();
   var options = []; //options.push(v1); options.push(v2); 
   var selectedOptions = tesd.split(",");
   for(var i in selectedOptions) {
    alert("val: "+ selectedOptions[i]);
    options.push(selectedOptions[i]);   
}
   
    //$('.selectpicker').selectpicker('val', options);
    //$('#slManager').val([v1, v2]);
    //$('#slManager').val([v1]);
    //$('#slManager').val([options]);
    $('#slManager').selectpicker('val', options);
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
    getSelectedManager() {
      let res = this.model.candidat.manager_id;
        return "";
    },
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
<style scoped>
/*.bootstrap-select .bs-ok-default::after {
    width: 0.3em;
    height: 0.6em;
    border-width: 0 0.1em 0.1em 0;
    transform: rotate(45deg) translateY(0.5rem);
}

.btn.dropdown-toggle:focus {
    outline: none !important;
}

.checkbox-menu li label {
    display: block;
    clear: both;
    font-weight: bold;
    line-height: 0.05;/*1.42857143;*/
   /* color: #333;
    white-space: nowrap;
    margin:0;
    transition: background-color .4s ease;
}
.checkbox-menu li input {
    margin: 0px 0px;
    top: 0px;
    position: relative;
}

.checkbox-menu li.active label {
    background-color: #cbcbff;
    font-weight:bold;
}

.checkbox-menu li label:hover,
.checkbox-menu li label:focus {
    background-color: #f5f5f5;
}

.checkbox-menu li.active label:hover,
.checkbox-menu li.active label:focus {
    background-color: #b8b8ff;
}*/
.multi_select_box{
  width: 300px;
  margin: 20px auto;

}
.multi_select_box select{
  width: 100%
}
.multi_select_box button{
  background-color:darkblue !important ;
  color: #fff !important;
  padding: 15px 25px;
}
</style>