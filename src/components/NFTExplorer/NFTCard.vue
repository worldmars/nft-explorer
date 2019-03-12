<template>
<div class="card shadow">
    <div class="card shadow">
            <div class="card-body">
                <div class="token-id mb-2">Token ID: {{token_id}} </div>
                <img width="100%" height="250px;" padding-top="100%" class="rounded" style="object-fit: cover;" v-bind:src=uri>
                <div class="info-title">Owner</div>
                <div class="info-subtitle">{{ owner }}</div>
                <div class="info-title">Contract</div>
                <div class="info-subtitle">{{ contract }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NFTCard',
  props: ['token_id', 'owner', 'uri', 'contract']
}
</script>

<style>
.token-id {
	color: #000000;
	font-size: 14px;
	font-weight: bold;
}

.info-title {
	color: #000000;
    font-size: 12px;
    font-weight: bold;
}

.info-subtitle {
	color: #218FFF;
	font-size: 12px;
}
</style>



