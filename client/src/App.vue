<template>
  <div>
    <Header/>
    <Home/>
  </div>
</template>

<script>
import Home from './pages/Home.component';
import Header from './components/Header.component';

export default {
  name: 'App',
  components: {
    Home,
    Header
  }
}
</script>

<style>
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    font-size: 62.5%;
  }

  body{
    height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.4rem;
    color: #fff;
    line-height: 1.4;
  }
</style>
