<template>
    <transition name="slide">
        <div class="dapi-response">   
            <div>
                <div class="loader loader-default is-active"></div>
                <div class="dapi-text"> Waiting for O3</div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'dAPIProgress'
}
</script>

<style>
.dapi-response {
    position: fixed;
    background-image: url("<%= BASE_URL %>../../dapi_response.svg");
     background-size: contain;
    background-repeat: no-repeat;
    width: 258px;
    height: 34px;
    margin-top: -1px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: 1000000;
}

.dapi-text {
    color: #fff;
    text-align: center;
    position: absolute;
    top: 50%;
    width: 100%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}

.loader {
	color: #fff;
	box-sizing: border-box;
	left: 0;
	top: 0;
	width: 20px;
	height: 20px;
	overflow: hidden;
	z-index: 999999
}

.loader:after,
.loader:before {
	box-sizing: border-box;
	display: none
}

.loader.is-active {
	width: 20px;
	height: 20px;
	left: 0;
	top: 0
}

.loader.is-active:after,
.loader.is-active:before {
	display: block
}

@keyframes rotation {
	0% {
		transform: rotate(0)
	}
	to {
		transform: rotate(359deg)
	}
}

@keyframes blink {
	0% {
		opacity: .5
	}
	to {
		opacity: 1
	}
}

.loader-default:after {
	content: "";
	position: fixed;
	width: 20px;
	height: 20px;
	border: 2px solid #fff;
	border-left-color: transparent;
	border-radius: 50%;
	top: calc(50% - 10px);
	left: calc(22% - 10px);
	animation: rotation 1s linear infinite
}

.loader-default[data-half]:after {
	border-right-color: transparent
}

.loader-default[data-inverse]:after {
	animation-direction: reverse
}

.slide-enter-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   margin-top: -1px;
}

.slide-enter, .slide-leave-to {
   margin-top: -35px;
}
</style>