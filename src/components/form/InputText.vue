<template>
  <span :class="{ 'hasError': v.$error }">
    <label>{{name}}  
      <span class="hasError" v-show="!v.required&&v.$dirty">is required.</span>
      <input type="text" class="input" v-model="genericModel" placeholder="" @input="v.$touch()">
    </label>
  </span>
</template>

<script>
import formImputMixin from '../../mixins/formInputMixin'
export default {
  name:'InputText',
  mixins: [formImputMixin]
};
</script>

<style scoped>
label { display: inline-block; width: 260px; margin-top: 3px;}

input[type=text] {
  width: 220px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  margin-top: 3px;
 .hasError & {
    border-color: red;
  }
} 

.hasError label {
  color: red;
}

@media screen and (max-width: 600px) {
  label { display: inline-block; width: 92%; margin-top: 3px;}
  
  input[type=text] {
    width: 100%;
    margin-top: 1px;
  }
}
</style>