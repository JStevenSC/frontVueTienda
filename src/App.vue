<template>
  <div id="app">
    <div class="wrapper d-flex flex-column min-vh-100">
      <nav class="navbar navbar-expand rounded-bottom justify-content-center">
        <div class="container">
          <div class="navbar-brand col-md-1">
            <img alt="logo" src="./assets/logowompi1.png" style="max-width: 80%;">
          </div>
          <div class="collapse navbar-collapse col-md-4 justify-content-end">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/about" class="nav-link">Nosotros</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/" class="nav-link">Productos</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main class="flex-fill">
        <router-view />
      </main>

      <footer class="footer">
        <div class="container">
          <div class="row d-flex flex-row">
            <div class="col-md-4 d-flex text-center flex-column">
            </div>
            <div class="col-md-4 d-flex text-center flex-column">
              <a class="mb-1" href="https://www.linkedin.com/in/juanstevensanchezcastrodesarrolladorweb/" target="_blank">
                <i class="bi bi-linkedin icono-margi"></i>&nbsp;Juan Steven Sanchez Castro
              </a>
              <p class="mb-0">
                <i class="bi bi-telephone icono-margi"></i>&nbsp;+57 312 205 70 69
              </p>
              <p class="mb-0">
                <i class="bi bi-envelope icono-margi"></i>&nbsp;steven.jssc@gmail.com
              </p>
            </div>
            <div class="col-md-4 d-flex text-center flex-column">
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  background-color: #f9f5ff;
}
.navbar {
  background-color: #400D7E;
}
.navbar-nav .nav-link {
  color: #ffffff;
}
.navbar-nav .nav-link.active,
.navbar-nav .nav-link:focus,
.navbar-nav .nav-link:hover {
  color: #ab77ec;
}
.footer {
  padding: 1rem 0;
  color: #ffffff;
  background-color: #400D7E;
  text-align: center;
}
.footer a {
  color: #ffffff;
}
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}
</style>
