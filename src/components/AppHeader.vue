<template>
<div id= "app">
<nav class="navbar navbar-expand-lg navbar-light">
		<a class="navbar-brand" href="#"><img src="<%= BASE_URL %>../../o3-logo-light.png" height="30" /></a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_example_1" aria-controls="navbar_example_1" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbar_example_1">
			<ul class="navbar-nav ml-auto">
				<li class="nav-item active">
					<router-link to="/explorer" class="nav-link">NFT Explorer</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/foundry" class="nav-link">Token Foundry</router-link>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="https://o3.network" target="_blank">Download O3</a>
				</li>
			</ul>
		</div>
</nav>
<router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style>
	.navbar {
		border-bottom: 1px solid #DDDDDD;
	}

	.navbar-light .navbar-nav .nav-link {
 		color:	#218FFF;
		opacity: 0.5;
	}

	/* change the brand and text color */
.navbar-light .navbar-brand,
.navbar-light .navbar-text {
    color: rgba(255,255,255,.8);
}

/* change the color of active or hovered links */
.navbar-light .nav-item.active .nav-link,
.navbar-light .nav-item:focus .nav-link,
.navbar-light .nav-item:hover .nav-link {
    color:	#218FFF;
		opacity: 1.0;
}

	
</style>

