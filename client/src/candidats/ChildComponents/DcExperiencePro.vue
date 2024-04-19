<script>
import { ref } from "vue";
export default {
  props: {
    experiences: [{
      start:"",
      end:"",
      context:"",
      title:"",
      company:"",
      technical_env:"",
      tasks:[],
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
      button.addEventListener("click", function () {
        var container = document.getElementById(id);
        var newInput = document.createElement("input");
        newInput.classList = "form-control dc-vlist dc-tmp";
        newInput.maxLength = len;
        container.appendChild(newInput);

      })
      xpAddedCounter.value++;
    },
    addRowTaskXp(index, len) {
      var container = document.getElementById("taskxp" + index);
      var newInput = document.createElement("input");
      newInput.classList = "form-control dc-vlist dc-tmp";
      newInput.maxLength = len;
      container.appendChild(newInput);
    },
    remove(index) {
      this.experiences.splice(index, 1);
    },
    add(index) {
      this.experiences.push({
      start:"",
      end:"",
      context:"",
      title:"",
      company:"",
      technical_env:"",
      tasks:[],
    });
    },
    tremove(index, tindex) {
      this.experiences[index].tasks.splice(tindex, 1);
    },
    tadd(index) {    
      this.experiences[index].tasks.push('');     
    }
  },
};
const xpAddedCounter = ref(0);

</script>

<template>
  <div>
    <div class="dc-section">
      <div class="col">
        <h5>Expériences professionnelles</h5>
      </div>

      <div id="xps">
        <div class="xp" v-for="(experience, index) in experiences" :key="index">
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
            <div class="col">
              <div class="row">
                <label for="">Compétences/ Tâches</label>
              </div>
              <div v-bind:id="`taskxp${index}`" class="form-group" v-for="(task, tindex) in experience.tasks"
                :key="tindex">
                <div class="row">
                  <div class="input-group align-items-center ">
                    <div class="col col-11">
                      <input :value="task" :key="tindex" class="form-control dc-vlist" :maxlength="maxILength"
                        type="text" />
                    </div>
                    <div class="col">
                      <i class="bi bi-plus-circle" style="color: green" @click="tadd(index, tindex+1)"
                        v-show="tindex == experience.tasks.length - 1" />
                      <i class="bi bi-dash-circle m-1" style="color: red" @click="tremove(index, tindex)"
                        v-show="tindex || (!tindex && experience.tasks.length > 1)" />
                    </div>
                  </div>
                </div>
              </div>
             <i class="bi bi-plus-circle" style="color: green" @click="tadd(index, 0)"
                v-show="experience.tasks.length==0" />
             <!--   <button class="btn btn-outline-primary btn-sm" @click="addRowTaskXp(`${index}`, maxILength)">
                Ajouter une ligne
              </button>-->
            </div>
            <div class="col">
              <label for="envt">Environnement technique</label>
              <textarea class="form-control dc-ta-envt" placeholder="..." :value="experience.technical_env" />
            </div>
          </div>
          <div class="row input-group">
            <div class="col col-11"></div>
            <div class="col"><i class="bi bi-plus-circle" style="color: green" @click="add(index)"
                v-show="index == experiences.length - 1" />
              <i class="bi bi-dash-circle m-1" style="color: red" @click="remove(index)"
                v-show="index || (!index && experiences.length > 1)" />
            </div>
          </div>
        </div>
        <i class="bi bi-plus-circle" style="color: green" @click="add(0)" v-show="experiences == null" />
        <div class="xp" id="ghost_xp_pro" style="display: none; /* Template for new XP */">
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
                <input class="form-control dc-vlist" type="text" placeholder="" aria-label="" :maxlength="maxILength" />
                <input class="form-control dc-vlist" type="text" placeholder="" aria-label="" :maxlength="maxILength" />
                <input class="form-control dc-vlist" type="text" placeholder="" aria-label="" :maxlength="maxILength" />
                <input class="form-control dc-vlist" type="text" placeholder="" aria-label="" :maxlength="maxILength" />
              </div>
              <button class="btn btn-outline-primary btn-sm dc-taskbutton">
                Ajouter une ligne
              </button>
            </div>
            <div class="col">
              <label for="envt">Environnement technique</label>
              <textarea class="form-control dc-ta-envt" placeholder="..."></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="row text-center">
        <div class="col">
          <button type="button" class="btn btn-outline-info btn-sm" @click="addRowXpPro(maxILength)">
            Nouvelle experience professionnelle
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
  margin-bottom: 4em;
}
</style>