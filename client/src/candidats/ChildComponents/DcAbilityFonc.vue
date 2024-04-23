<template>
  <div>
    <h5>{{ title }}</h5>
    <div id="fonct">
    <div class="form-group" id="fonct" v-for="(ability, index) in functionalAbilities" :key="index">
      <div class="row" id="row">
        <div class="input-group align-items-center ">
          <div class="col col-11">
            <input :value="ability" :maxlength="maxILength" class="form-control dc-vlist" type="text" />
          </div>
          <div class="col">            
            <button class="btn" id="DeleteRow" type="button"><i class="bi bi-dash-circle" style="color: red" data-toggle="tooltip" data-placement="top" title="Supprimer ce compétence"></i> </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="btnElement" class="row">
      <div class="col text-center">
        <i class="bi bi-plus-circle" style="color: green" @click="addRow(maxILength)" data-toggle="tooltip" data-placement="top" title="Ajouter une compétence"/>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    /* functionalAbilities: [{
       name:'',
     }],*/
    functionalAbilities: {
      type: Array,
    },
    maxILength: {
      type: Number,
      required: true,
    },
  },
  methods: {
    addRow(len) {
      var newdiv = document.createElement("div");
      newdiv.classList = "input-group align-items-center";
      var newdivcol11 = document.createElement("div");
      newdivcol11.classList = "col col-11";
      var newInput = document.createElement("input");
      newInput.classList = "form-control dc-vlist";
      newInput.maxLength = len; 
      //button to do and append
      var newdivcol = document.createElement("div");
      newdivcol.classList = "col";
      var newbutton = document.createElement("button");
      newbutton.classList = "btn";
      newbutton.id = "DeleteRow";
      var newI = document.createElement("i");
      newI.setAttribute("style", "color: red");
      //data-toggle="tooltip" data-placement="top" title="Supprimer ce compétence"
      newI.setAttribute("data-toggle", "tooltip");
     // newI.setAttribute("data-placement", "top");
      newI.setAttribute("title", "Supprimer ce compétence");
      newI.classList = "bi bi-dash-circle";
      newbutton.appendChild(newI);
      newdivcol.appendChild(newbutton);
      newdivcol11.appendChild(newInput);
      newdiv.appendChild(newdivcol11);
      newdiv.appendChild(newdivcol);

      var newdivRow = document.createElement("div");
      newdivRow.setAttribute("id", "row");
      newdivRow.classList = "row";
      newdivRow.appendChild(newdiv);
 
      document.getElementById("fonct").appendChild(newdivRow);
     /* var container = document.getElementById("fonct");
      var newInput = document.createElement("input");
      newInput.classList = "form-control dc-vlist dc-tmp";
      newInput.maxLength = len;
      container.appendChild(newInput);*/
    },
   /* remove(index) {
      this.functionalAbilities.splice(index, 1);
    },
    add(index) {
      alert(this.functionalAbilities.length);
      this.functionalAbilities.forEach(element => {

      });
      this.functionalAbilities.push("");
    }*/
  },
};

$("body").on("click", "#DeleteRow", function () {
  $(this).parents("#row").remove();
});
</script>

<style scoped></style>
