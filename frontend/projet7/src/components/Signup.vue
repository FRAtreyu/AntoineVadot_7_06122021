<template>
  <form class="signup__form">
    <v-text-field
        v-model="lastname"
        :error-messages="lastnameErrors"
        label="lastname"
        required
        @input="$v.lastname.$touch()"
        @blur="$v.lastname.$touch()"
    ></v-text-field>
    <v-text-field
        v-model="firstname"
        :error-messages="firstnameErrors"
        label="firstname"
        required
        @input="$v.firstname.$touch()"
        @blur="$v.firstname.$touch()"
    ></v-text-field>
    <v-text-field
        v-model="pseudo"
        :error-messages="pseudoErrors"
        :counter="10"
        label="pseudo"
        required
        @input="$v.pseudo.$touch()"
        @blur="$v.pseudo.$touch()"
    ></v-text-field>
    <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        label="password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
    ></v-text-field>

    <v-btn
        class="mr-4"
        @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>

</template>

<script>
import {validationMixin} from 'vuelidate'
import {alpha, alphaNum, email, helpers, maxLength, required} from 'vuelidate/lib/validators'
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import useVuelidate from "@vuelidate/core";

const passwordRegex = helpers.regex('passwordRegex',/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/);

Vue.use(VueCompositionAPI)

export default {
  name: 'Signup',

  setup() {

    return {
      v$: useVuelidate()
    }
  },

  data: () => ({
    lastname: '',
    firstname: '',
    pseudo: '',
    email: '',
    password: ''
  }),

  mixins: [validationMixin],

  validations: {
    lastname: {required, alpha},
    firstname: {required, alpha},
    pseudo: {required, maxLength: maxLength(10), alphaNum},
    email: {required, email},
    password: {required, passwordRegex}
  },


  computed: {
    lastnameErrors() {
      const errors = []
      if (!this.$v.lastname.$dirty) return errors
      !this.$v.lastname.required && errors.push('lastname is required.')
      return errors
    },
    firstnameErrors() {
      const errors = []
      if (!this.$v.firstname.$dirty) return errors
      !this.$v.firstname.required && errors.push('firstname is required.')
      return errors
    },
    pseudoErrors() {
      const errors = []
      if (!this.$v.pseudo.$dirty) return errors
      !this.$v.pseudo.maxLength && errors.push('pseudo must be at most 10 characters long')
      !this.$v.pseudo.required && errors.push('pseudo is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.passwordRegex && errors.push('Password must be between 4 and 8 characters and must include at least one upper case letter, one lower case letter, and one numeric digit')
      !this.$v.password.required && errors.push('password is required.')
      return errors
    },
  },

  methods: {
    submit() {
      this.$v.$touch()
    },
    clear() {
      this.$v.$reset()
      this.lastname = ''
      this.firstname = ''
      this.pseudo = ''
      this.password = ''
      this.email = ''
    },
  },
}
</script>

<style scoped>

.signup__form {
  width: 80%;
  margin-left: 10%;
  padding-top: 5%;
}
</style>