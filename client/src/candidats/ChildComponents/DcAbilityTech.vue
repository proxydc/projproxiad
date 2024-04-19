<template>
  <div>
    <h5>{{ title }}</h5>
    <div class="form-group" id="techn" v-for="(ability, index) in functionalAbilities" :key="index">
      <div class="row">
        <div class="input-group align-items-center ">
          <div class="col col-11">
            <input :value="ability" :maxlength="maxILength" class="form-control dc-vlist" type="text" />
          </div>
          <div class="col">
            <i class="bi bi-plus-circle" style="color: green" @click="add(index)"
              v-show="index == functionalAbilities.length - 1" />
            <i class="bi bi-dash-circle m-1" style="color: red" @click="remove(index)"
              v-show="index || (!index && functionalAbilities.length > 1)" />
          </div>
        </div>
      </div>
    </div>
    <i class="bi bi-plus-circle" style="color: green" @click="add(0)" v-show="functionalAbilities.length==0" />
  </div>
</template>

<script>
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
    functionalAbilities: [],
    maxILength: {
      type: Number,
      required: true,
    },
  },
  methods: {
    addRow(len) {
      var container = document.getElementById("techn");
      var newInput = document.createElement("input");
      newInput.classList = "form-control dc-vlist dc-tmp";
      newInput.maxLength = len;
      container.appendChild(newInput);
    },
    remove(index) {
      this.functionalAbilities.splice(index, 1);
    },
    add(index) {
      this.functionalAbilities.push("");
    }
  },
};
</script>

<style scoped></style>
