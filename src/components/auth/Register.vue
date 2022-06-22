<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
      <form id="register-form" role="form" @submit.prevent="onSubmit">
        <h3 class="text-center">Zarejestruj</h3>
        <div class="form-group">
          <input
            type="text"
            name="firstName"
            id="firstName"
            class="form-control"
            placeholder="Imię"
            value
            v-model="firstName"
            required
          />
          </div>
         <div class="form-group">
          <input
            type="text"
            name="lastName"
            id="lastName"
            class="form-control"
            placeholder="Nazwisko"
            value
            v-model="lastName"
            required
          /></div>
         <div class="form-group">
          <input
            type="text"
            name="telephone"
            id="telephone"
            class="form-control"
            placeholder="Numer telefonu"
            value
            v-model="telephone"
            required
          />
          </div>
        <div class="form-group">
          <input
            type="email"
            name="email"
            id="email"
            class="form-control"
            placeholder="Adres Email"
            value
            v-model="email"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            name="password"
            id="password"
            class="form-control"
            placeholder="Hasło"
            v-model="password"
            required
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-success" style="width: 100%" :disabled="isLoading">
            <i v-if="isLoading" class="fa fa-spinner fa-spin" />
            Zarejestruj
          </button>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-center">
                <router-link to="/login">
                  <a>Zaloguj</a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      telephone: null,
      isLoading: false
    }
  },
  methods: {
    ...mapActions(['addMessage', 'registerByEmail']),
    onSubmit() {
      this.isLoading = true
      let data = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        telephone: this.telephone
      }
      this.registerByEmail(data).then(() => {
        this.$router.push({ name: 'mainpage' });
      })
        .catch((error) => {
          console.log('register error', error);
        }).then(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
