<template>
<div class="home">
  <div class="row">
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Fox Code</a>
        </div>
        <ul class="nav navbar-nav">
          <li class="active"><a href="#">Home</a></li>
          <li><a href="#" v-on:click="logout()">Log out</a></li>
        </ul>
      </div>
    </nav>
  </div>
  <div class="row">
    <div class="col-md-2">
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <aside id="sidebar">
            <ul id="sidemenu" class="sidebar-nav">
              <li>
                <a href="#">
                  <span class="sidebar-icon"><i class="fa fa-dashboard"></i></span>
                  <span class="sidebar-title">Online User</span>
                </a>
              </li>
            </ul>
          </aside>
        </div>
        <main id="page-content-wrapper" role="main">
        </main>
      </div>
    </div>
    <div class="col-md-5">
      <h1>Answer</h1>
      <div class="form-group">
        <label for="editor">Code Here</label>
        <textarea class="form-control" rows="25" id="editor"></textarea>
        </br>
        <button type="button" name="button" class="btn btn-success">I'm Sure</button>
      </div>
    </div>
    <div class="col-md-5">
      <h1>Question</h1>
      <div class="question col-md-12">
        <h3>Summary</h3>
        <p></p>
        <h4>Input</h4>
        <p></p>
        <h4>Output</h4>
        <p></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {

    }
  },
  mounted() {
    if (!localStorage.getItem('token')) {
      window.location.href = 'http://localhost:8080/#/login'
    } else {
      console.log('welcome back');
    }

    axios.get('http://localhost:3000/api/user/checkonline').then(function() {

    })
  },
  methods: {
    logout() {
      var localEmail = localStorage.getItem('email')
      console.log(localEmail);
      axios.post('http://localhost:3000/api/user/logout', {
          email: localEmail
        })
        .then(function(response) {
          console.log(response);
          localStorage.removeItem('token')
          localStorage.removeItem('email')
          window.location.href = 'http://localhost:8080/#/login'
        })
        .catch(function(error) {
          console.log(error);
        });

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  background: lightgray;
}

.navbar-fixed-top {
  top: 0;
  border-width: 0 0 1px;
}

.navbar-default .navbar-nav #user-profile {
  height: 50px;
  padding-top: 15px;
  padding-left: 58px;
}

.navbar-default .navbar-nav #user-profile img {
  height: 45px;
  width: 45px;
  position: absolute;
  top: 2px;
  left: 8px;
  padding: 1px;
}

#wrapper {
  padding-left: 0;
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  -o-transition: all .5s ease;
  transition: all .5s ease;
}

@media (min-width: 992px) {
  #wrapper {
    padding-left: 225px;
  }
}

@media (min-width: 992px) {
  #wrapper #sidebar-wrapper {
    width: 225px;
  }
}

#sidebar-wrapper {
  border-right: 1px solid #e7e7e7;
}

#sidebar-wrapper {
  z-index: 1000;
  position: fixed;
  left: 225px;
  width: 0;
  height: 100%;
  margin-left: -225px;
  overflow-y: auto;
  background: #f8f8f8;
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  -o-transition: all .5s ease;
  transition: all .5s ease;
}

#sidebar-wrapper .sidebar-nav {
  position: absolute;
  top: 0;
  width: 225px;
  font-size: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

#sidebar-wrapper .sidebar-nav li {
  text-indent: 0;
  line-height: 45px;
}

#sidebar-wrapper .sidebar-nav li a {
  display: block;
  text-decoration: none;
  color: #428bca;
}

.sidebar-nav li:first-child a {
  background: #92bce0 !important;
  color: #fff !important;
}

#sidebar-wrapper .sidebar-nav li a .sidebar-icon {
  width: 45px;
  height: 45px;
  font-size: 14px;
  padding: 0 2px;
  display: inline-block;
  text-indent: 7px;
  margin-right: 10px;
  color: #fff;
  float: left;
}

#sidebar-wrapper .sidebar-nav li a .caret {
  position: absolute;
  right: 23px;
  top: auto;
  margin-top: 20px;
}

#sidebar-wrapper .sidebar-nav li ul.panel-collapse {
  list-style: none;
  -moz-padding-start: 0;
  -webkit-padding-start: 0;
  -khtml-padding-start: 0;
  -o-padding-start: 0;
  padding-start: 0;
  padding: 0;
}

#sidebar-wrapper .sidebar-nav li ul.panel-collapse li i {
  margin-right: 10px;
}

#sidebar-wrapper .sidebar-nav li ul.panel-collapse li {
  text-indent: 15px;
}

@media (max-width: 992px) {
  #wrapper #sidebar-wrapper {
    width: 45px;
  }
  #wrapper #sidebar-wrapper #sidebar #sidemenu li ul {
    position: fixed;
    left: 45px;
    margin-top: -45px;
    z-index: 1000;
    width: 200px;
    height: 0;
  }
}

.sidebar-nav li:first-child a {
  background: #92bce0 !important;
  color: #fff !important;
}

.sidebar-nav li:nth-child(2) a {
  background: #6aa3d5 !important;
  color: #fff !important;
}

.sidebar-nav li:nth-child(3) a {
  background: #428bca !important;
  color: #fff !important;
}

.sidebar-nav li:nth-child(4) a {
  background: #3071a9 !important;
  color: #fff !important;
}

.sidebar-nav li:nth-child(5) a {
  background: #245682 !important;
  color: #fff !important;
}

.question {
  width: 700px;
  /*color: white;*/
  background: rgba(0, 0, 0, 0.26);
  border radius: 5px;
  padding: 3%;
  height: 90vh;
  margin: 5px;
}
</style>
