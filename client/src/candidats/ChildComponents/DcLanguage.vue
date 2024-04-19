<script>
import $ from "jquery";
export default {
  props: {
    languages: [],
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
      newInput.setAttribute("list", "languages");
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
      newI.classList = "bi bi-dash-circle";
      newbutton.appendChild(newI);
      newdivcol.appendChild(newbutton);
      newdivcol11.appendChild(newInput);
      newdiv.appendChild(newdivcol11);
      newdiv.appendChild(newdivcol);

      var newdivRow = document.createElement("div");
      newdivRow.setAttribute("id", "row");
      newdivRow.appendChild(newdiv);
      let befornode = document.getElementById("btnElement");
 
      document.getElementById("langs").appendChild(newdivRow);
    /* var newRowAdd =
        '<div id="row"> <div class="input-group align-items-center">' +       
        '<div class="col col-11"><input type="text" list="languages" class="form-control dc-vlist" :maxlength="maxILength"></div>' +
        '<div class="col">' +
        '<button class="btn" id="DeleteRow" type="button"><i class="bi bi-dash-circle" style="color: red"></i> </button>' +
        '</div> </div> </div>';

      $('#langs').append(newRowAdd);*/
    },
  },
};

$("body").on("click", "#DeleteRow", function () {
  $(this).parents("#row").remove();
});

</script>

<template>
  <div>
      <h5>Langues</h5>
      <div id="langs">
      <div class="form-group" v-for="(language, index) in languages" :key="language">
        <div id="row">
          <div class="input-group align-items-center"> 
            <div class="col col-11">          
              <input class="form-control dc-vlist" list="languages"  type="text" :value="language" :maxlength="maxILength" :key="index" />
              </div> 
              <div class="col">
              <button class="btn" id="DeleteRow" type="button"><i class="bi bi-dash-circle" style="color: red"></i> </button>
            </div> 
          </div>
        </div>
      </div>     
    </div>
    <div id="btnElement" class="row">
      <div class="col text-center">
        <button type="button" class="btn btn-outline-info btn-sm" @click="addRow(maxILength)">
          Ajouter une langue
        </button>
      </div>
    </div>
    </div>
    <datalist id="languages">
      <option value="Français"></option>
      <option value="Anglais"></option>
      <option value="Allemand"></option>
      <option value="Espagnol"></option>
      <option value="Italien"></option>
    </datalist>
   
</template>
