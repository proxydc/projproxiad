<template>
    <h1>Bonjour, Bienvenue sur Proxy DC</h1>
    <nav>
      <router-link to="/login">Login</router-link>
    </nav>
    <div class="multi_select_box">
      <select id="slManager" class="multi_select w-100" multiple data-selected-text-format=" count > 2">
        <option v-for="(rhdc,index) in DcManagerList" :value="rhdc.Id" :key="index">
          {{ rhdc.display_name }}
        </option>
      </select>
    </div>
    <div>
    <a href="#demo" data-toggle="collapse">Recherches Avances</a>
    <div id="demo" class="collapse hide">
      <div class="row">
              <div class="col col-2">
                <label for="">De</label>
                <input type="date" :value="stcreationdate" id="" class="form-control" aria-label="Date de début" />
              </div>
              <div class="col col-2">
                <label for="">A</label>
                <input type="date" :value="encreationdate" id="" class="form-control" aria-label="Date de fin" />
              </div>
              </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import urldc from "../_helpers/urllist.js";
import "../assets/select/css/bootstrap-select.min.css";
import "../assets/select/js/bootstrap-select.min.js";
import "../assets/select/js/jquery-3.5.0.min.js";
import $ from "jquery";
import "../assets/select/js/bootstrap.bundle";
import "../assets/select/css/bootstrap.css"


export default {
  name: "Home",

  data() {
    return {   
      DcManagerList: [],
      selectedManager: [],  
      stcreationdate:{type: Date},
      encreationdate:{type: Date},  
    };
  },

  mounted() {
      localStorage.setItem('token', '');
      localStorage.setItem('useraccount', '');
      localStorage.setItem('jour', '');
      localStorage.setItem('heure', '');
      localStorage.setItem('minute', '');
      this.getLogins();
      this.stcreationdate = '2000-01-01';
      this.encreationdate = new Date().toJSON().slice(0,10);
    /* $(function () {
    $('select').selectpicker();
    $('#slManager').val([this.DcManagerList[0].display_name, this.DcManagerList[1].display_name, 'Nono']);
});*/
$('#slManager').change(function () {
  this.selectedManager = $('#slManager').val();
        //alert("test"+this.selectedManager );
    });
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
              //alert("her: "+this.DcManagerList[0].display_name);
              let v1='Alex';
              let v2='Nono';
              let tesd = "Alex,Nono";
              //alert ("tt: "+ tesd);
             $(function () {
   // $('select').selectpicker();
   var options = []; //options.push(v1); options.push(v2); 
   var selectedOptions = tesd.split(",");
   for(var i in selectedOptions) {
    //alert("val: "+ selectedOptions[i]);
    options.push(selectedOptions[i]);   
}
   
    //$('.selectpicker').selectpicker('val', options);
    //$('#slManager').val([v1, v2]);
    //$('#slManager').val([v1]);
    //$('#slManager').val([options]);
    $('select').selectpicker('val', options);
});


/*$(function () {
$('select').selectpicker();

var selectedOptions = tesd.split(",");
for(var i in selectedOptions) {
    var optionVal = selectedOptions[i];
    alert("rr: "+ i);
    $('select').find('option[value='+optionVal+']').prop('selected', true);
}
$('select').selectpicker('reload');
});*/
             // $('#slManager').val(['Alex', 'Nono']);
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
  }
 
};
</script>
<style scoped>
.multi_select_box{
  width: 400px;
  margin: 80px auto;

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