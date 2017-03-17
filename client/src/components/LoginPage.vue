<template>
<div class="background">
  <div class="login text-vertical-center">
    <fb-signin-button :params="fbSignInParams" @success="onSignInSuccess" @error="onSignInError">Sign in with Facebook</fb-signin-button>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      fbSignInParams: {
        scope: 'email,public_profile',
        return_scopes: true
      }
    }
  },
  methods: {
    onSignInSuccess(response) {
      FB.api('/me', {
        fields: 'name, gender, email'
      }, dude => {
        axios.post('http://localhost:3000/api/user/login', {
            name: dude.name,
            email: dude.email,
            id: dude.id
          })
          .then(function(response) {
            console.log(response.data);
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('email', response.data.user)
            window.location.href = 'http://localhost:8080/'
          })
          .catch(function(error) {
            console.log(error);
          });
      })
    },
    onSignInError(error) {
      console.log('OH NOES', error)

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-vertical-center {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.text-vertical-center h1 {
  margin: 0;
  padding: 0;
  font-size: 4.5em;
  font-weight: 700;
}

.background {
  display: table;
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/code.jpg) no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;
}

.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}
</style>
