<script>
import { ref } from "vue";
import $ from "jquery";
export default {
  props: {
    experiences: [{
      start: "",
      end: "",
      context: "",
      title: "",
      company: "",
      technical_env: "",
      tasks: [],
    }],
    maxILength: {
      type: Number,
      required: true,
    },
  },

  methods: {
    addRowXpPro(len) {
      var newNode = document.getElementById("ghost_xp_pro").cloneNode(true);
      newNode.querySelector(".dc-tasklist").id =
        "xp_tasklist_" + xpAddedCounter.value;
      newNode.querySelector(".dc-taskinputlist").id =
        "xp_taskinputlist_" + xpAddedCounter.value;
      newNode.querySelector(".dc-taskbutton").id =
        "xp_taskbutton_" + xpAddedCounter.value;
      console.log("Add XP with id" + newNode.querySelector(".dc-tasklist").id);
      newNode.id = "";
      newNode.style = "";
      newNode.classList = "xp dc-tmp";
      document.getElementById("xps").appendChild(newNode);
      var button = document.getElementById("xp_taskbutton_" + xpAddedCounter.value);
      var id = "xp_taskinputlist_" + xpAddedCounter.value;
      button.addEventListener("click",
        function () {
          var newdiv = document.createElement("div");
          newdiv.classList = "input-group align-items-center";
          var newdivcol11 = document.createElement("div");
          newdivcol11.classList = "col col-11";
          var newInput = document.createElement("input");
          newInput.classList = "form-control dc-vlist dc-tmp";
          newInput.maxLength = len;
          //button to do and append
          var newdivcol = document.createElement("div");
          newdivcol.classList = "col";
          var newbutton = document.createElement("button");
          newbutton.classList = "btn";
          newbutton.id = "DeleteRowTask";
          var newI = document.createElement("i");
          newI.setAttribute("style", "color: red");
          newI.classList = "bi bi-dash-circle";
          newI.setAttribute("data-toggle", "tooltip");
          newI.setAttribute("title", "Supprimer ce task");
          newbutton.appendChild(newI);
          newdivcol.appendChild(newbutton);
          newdivcol11.appendChild(newInput);
          newdiv.appendChild(newdivcol11);
          newdiv.appendChild(newdivcol);

          var newdivRow = document.createElement("div");
          newdivRow.setAttribute("id", "row");
          newdivRow.appendChild(newdiv);
          document.getElementById(id).appendChild(newdivRow);
        }
      );
      xpAddedCounter.value++;
    },
    addRowTaskXp(index, len) {
      var newdiv = document.createElement("div");
      newdiv.classList = "input-group align-items-center";
      var newdivcol11 = document.createElement("div");
      newdivcol11.classList = "col col-11";
      var newInput = document.createElement("input");
      newInput.classList = "form-control dc-vlist dc-tmp";
      newInput.maxLength = len;
      var newdivcol = document.createElement("div");
      newdivcol.classList = "col";
      var newbutton = document.createElement("button");
      newbutton.classList = "btn";
      newbutton.id = "DeleteRowTask";
      var newI = document.createElement("i");
      newI.setAttribute("style", "color: red");
      newI.classList = "bi bi-dash-circle";
      newI.setAttribute("data-toggle", "tooltip");
      newI.setAttribute("title", "Supprimer ce task");
      newbutton.appendChild(newI);
      newdivcol.appendChild(newbutton);
      newdivcol11.appendChild(newInput);
      newdiv.appendChild(newdivcol11);
      newdiv.appendChild(newdivcol);

      var newdivRow = document.createElement("div");
      newdivRow.setAttribute("id", "row");
      newdivRow.appendChild(newdiv);
      var id = "taskxp" + index;
      document.getElementById(id).appendChild(newdivRow);
    },
  },
};
const xpAddedCounter = ref(0);
$("body").on("click", "#DeleteRow", function () {
  $(this).parents(".xp").remove();
});
$("body").on("click", "#DeleteRowTask", function () {
  $(this).parents("#row").remove();
});
</script>

<template>
  <div>
    <div class="dc-section">
      <div class="col">
        <h5>Expériences professionnelles</h5>
      </div>
      <div id="xps">
        <div class="xp" v-for="(experience, index) in experiences" :key="index">
          <div id="xpitem">
            <div class="row">
              <div class="col col-2">
                <label for="">De</label>
                <input type="date" :value="experience.start" id="" class="form-control" aria-label="Date de début" />
              </div>
              <div class="col col-2">
                <label for="">A</label>
                <input type="date" :value="experience.end" id="" class="form-control" aria-label="Date de fin" />
              </div>
              <div class="col">
                <label for="">Poste</label>
                <input type="text" :value="experience.title" id="" class="form-control" aria-label="Libellé du poste" />
              </div>
              <div class="col">
                <label for="">Entreprise</label>
                <input type="text" :value="experience.company" id="" class="form-control" aria-label="Entreprise" />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="context">Contexte</label>
                <textarea type="text" class="form-control" placeholder="..." id="context" :value="experience.context" />
              </div>
            </div>
            <div class="row">
              <div class="col  dc-tasklist">
                <label for="">Compétences/ Tâches</label>
                <div v-bind:id="`taskxp${index}`" class="dc-taskinputlist">
                  <div class="form-group" v-for="(task, tindex) in experience.tasks" :key="tindex">
                    <div class="row" id="row">
                      <div class="input-group align-items-center ">
                        <div class="col col-11">
                          <input :value="task" :key="tindex" class="form-control dc-vlist dc-tmp"
                            :maxlength="maxILength" type="text" />
                        </div>
                        <div class="col">
                          <button class="btn" id="DeleteRowTask" type="button"><i class="bi bi-dash-circle"
                              data-toggle="tooltip" data-placement="top" title="Supprimer ce task"
                              style="color: red"></i> </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <i class="bi bi-plus-circle dc-taskbutton" @click="addRowTaskXp(`${index}`, maxILength)"
                  style="color: green" data-toggle="tooltip" data-placement="top" title="Ajouter une ligne" />
              </div>
              <div class="col">
                <label for="envt">Environnement technique</label>
                <textarea class="form-control dc-ta-envt" placeholder="..." :value="experience.technical_env" />
              </div>
            </div>
           <!-- <div class="row">
              <button class="btn" id="DeleteRow" type="button"><i class="bi bi-dash-circle-fill" style="color: red"
                  data-toggle="tooltip" data-placement="top" title="Supprimer ce expérience"></i>
              </button>
            </div>-->
            <div class="rowtext-center">
              <div class="col">
                <button class="btn btn-outline-danger btn-sm" id="DeleteRow" type="button">
                  Supprimer cette expérience professionnelle
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="xp" id="ghost_xp_pro" style="display: none; /* Template for new XP */">
          <div id="xpitem">
            <div class="row">
              <div class="col col-2">
                <label for="">De</label>
                <input type="date" name="" id="" class="form-control" aria-label="Date de début" />
              </div>
              <div class="col col-2">
                <label for="">A</label>
                <input type="date" name="" id="" class="form-control" aria-label="Date de fin" />
              </div>
              <div class="col">
                <label for="">Poste</label>
                <input type="text" name="" id="" class="form-control" aria-label="Libellé du poste" />
              </div>
              <div class="col">
                <label for="">Entreprise</label>
                <input type="text" name="" id="" class="form-control" aria-label="Entreprise" />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="context">Contexte</label>
                <textarea class="form-control" placeholder="..." id="context"></textarea>
              </div>
            </div>
            <div class="row">
              <div class="col dc-tasklist">
                <label for="">Compétences/ Tâches</label>
                <div class="dc-taskinputlist">
                </div>
                <i class="bi bi-plus-circle dc-taskbutton" style="color: green" data-toggle="tooltip"
                  data-placement="top" title="Ajouter une ligne" />
              </div>
              <div class="col">
                <label for="envt">Environnement technique</label>
                <textarea class="form-control dc-ta-envt" placeholder="..."></textarea>
              </div>
            </div>
           <!-- <div class="row">
              <button class="btn" id="DeleteRow" type="button"><i class="bi bi-dash-circle-fill" style="color: red"
                  data-toggle="tooltip" data-placement="top" title="Supprimer ce expérience"></i>
              </button>
            </div>-->
            <div class="rowtext-center">
              <div class="col">
                <button class="btn btn-outline-danger btn-sm" id="DeleteRow" type="button">
                  Supprimer cette expérience professionnelle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
     <!-- <button class="btn" type="button">
      <i class="bi bi-plus-circle" style="color: green" @click="addRowXpPro(maxILength)" data-toggle="tooltip"
        data-placement="top" title="Nouvelle experience professionnelle" />
      </button>-->
      <div class="row text-center">
        <div class="col">
          <button type="button" class="btn btn-outline-info btn-sm" @click="addRowXpPro(maxILength)">
            Nouvelle expérience professionnelle
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dc-ta-envt {
  height: 9rem;
  margin: 0.5rem 0rem;
}

.xp,
.project {
  margin-bottom: 1em;
}
</style>