<template>
    <div class="leading">
        <p class="leading-bigtext">FlightWith</p><br>
        <span class="leading-text">{{ leadingText }}</span>
    </div>
</template>

<script>
export default {
    name: 'HeaderPage',
    data: function () {
        return {
        leadingText: `An informational website that alerts its users about cheap airline tickets. no signup. completely free. `
        }
    }
}
</script>

<style scoped>
.leading {
  height: 150px;
  margin-bottom: 1px;
  padding: 30px;
  color: white;
  background: url('../assets/plane.jpg') center #333 no-repeat;
  background-size: cover;
  color: white;
  text-shadow: 0px 0px 5px #000;
}

@media (min-width: 800px) {
 .leading {
    margin-bottom: 30px;
    height: 230px;
    display: flex;
    align-items: center;
  }
}

.leading-bigtext {
  margin-right: 60px;
  font-weight: normal;
  font-size: 10vw;
  margin-top: 30px;
}

@media (min-width: 800px) {
  .leading-bigtext {
    font-weight: bold;
    font-size: 80px;
    margin-top: 0px;
  }
}

.leading-text {
  max-width: 250px;
  font-size: 1em;
  line-height: 1.4em;
}

@media (min-width: 800px) {
  .leading-text {
    max-width: 650px;
    font-size: 2em;
  }

}

</style>