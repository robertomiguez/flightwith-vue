<template>
<div id="main">
    <div class="content">
        <h1>Error 404 - Page not found</h1>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        <router-link :to="{ name: 'landing' }">Back to the home page</router-link>
    </div>
</div>
</template> 

<script>
export default {
    name: 'NotFound'
}
</script>

<style scoped>


#main{
    display: table;
    width: 100%;
    height: 100vh;
    text-align: center;
}

.content{
	display: table-cell;
    vertical-align: middle;
}

.content h1{
	font-size: 40px;
	display: inline-block;
	padding-right: 12px;
	animation: type .5s alternate infinite;
}

.content p{
	padding: 20px;
    font-size: 20px;
	padding-right: 12px;
	animation: type .5s alternate infinite;
}

.content a {
  margin-right: 1.9em;
  color: Blue;
  text-decoration: none;
  letter-spacing: .070em;
  font-size: 14px;
}
</style>