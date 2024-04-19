<script>
import { ref } from "vue";
import $ from "jquery";
export default {
  props: {
    certifications: [],
    maxILength: {
      type: Number,
      required: true,
    },
  },
  methods: {
    addRow(len) {

      var newdiv = document.createElement("div");
      newdiv.classList = "input-group align-items-center";

      var newdivcol2 = document.createElement("div");
      newdivcol2.classList = "col col-2";
      var newInput = document.createElement("input");
      newInput.setAttribute("id", "");
      newInput.setAttribute("type", "number");
      newInput.setAttribute("min", "1970");
      newInput.setAttribute("max", "2030");
      newInput.classList = "form-control dc-vlist";
      newdivcol2.appendChild(newInput);

      var newdivcol9 = document.createElement("div");
      newdivcol9.classList = "col col-9";
      var newInput2 = document.createElement("input");
      newInput2.setAttribute("id", "");
      newInput2.classList = "form-control dc-vlist";
      newInput2.maxLength = len; 
      newdivcol9.appendChild(newInput2);
      //button to do and append
      var newdivcol = document.createElement("div");
      newdivcol.classList = "col";
      var newbutton = document.createElement("button");
      newbutton.classList = "btn";
      newbutton.id = "DeleteRow";
      var newI = document.createElement("i");
      newI.setAttribute("style", "color: red");
      newI.classList = "bi bi-dash-circle";
      newbutton.appendChild(newI);
      newdivcol.appendChild(newbutton);
      
      newdiv.appendChild(newdivcol2);
      newdiv.appendChild(newdivcol9);
      newdiv.appendChild(newdivcol);

      var newdivRow = document.createElement("div");
      newdivRow.id = "row";
      newdivRow.classList = "row";
      newdivRow.appendChild(newdiv);
 
      document.getElementById("certs").appendChild(newdivRow);
     /* var newNode = document.getElementById("ghost_cert").cloneNode(true);
      newNode.id = "";
      newNode.style = "";
      newNode.classList = "cert dc-tmp";
      document.getElementById("certs").appendChild(newNode);
      certAddedCounter.value++;*/
    },
    remove(index) {
      this.certifications.splice(index, 1);
    },
    add(index) {
      this.certifications.push("");
    }
  },
};
$("body").on("click", "#DeleteRow", function () {
  $(this).parents("#row").remove();
});
const certAddedCounter = ref(0);
</script>

<template>
  <div>
    <h5>Diplômes / Certifications</h5>
    <div id="certs">
    <div class="cert form-group" v-for="(cert, index) in certifications" :key="index">
      <div class="row" id = "row">
        <div class="input-group align-items-center">
          <div class="col col-2">
            <input class="form-control dc-vlist" type="number" min="1970" max="2030" placeholder="Année"
              :value="cert.year" :key="index" id="" />
          </div>
          <div class="col col-9">
            <input class="form-control dc-vlist" type="text" placeholder="Libellé" :value="cert.title" :key="index"
              :maxlength="maxILength" />
          </div>
          <div class="col">
            <button class="btn" id="DeleteRow" type="button"><i class="bi bi-dash-circle" style="color: red"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div id="btnElement" class="row">
      <div class="col text-center">
        <button type="button" class="btn btn-outline-info btn-sm" @click="addRow(maxILength)">
          Ajouter un diplôme / une certification
        </button>
      </div>
    </div>
  </div>
</template>
