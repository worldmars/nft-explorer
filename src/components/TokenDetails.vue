<template>
    <div>
        <div class="col-sm-6 col-lg-4 mb-lg-4 mx-auto mt-5">
            <NFTCard  :token_id="token_id" :owner="owner" :uri="uri" :contract="contract_hash"></NFTCard>
        </div>
        <div class=row>
            <div class="col col-md-6 mx-auto">
                <h2 class="text-center">Why is this cool?</h2>
                <p class="text-center">
                    The awesome thing about NFTs is that each token is uniquely numbered and can only be owned
                    by one person at a time. 
                </p>
                <p class="text-center">
                    Currently this NFT is owned by this address:<br> {{ owner }}.
                </p>
                <p class="text-center">
                    If that's you, you have the ability to transfer it to anyone you like.
                </p>
            </div>
        </div>
        <div class="row mt-3 mb-4">
            <div class="col col-md-6 mx-auto">
                <div class="input-group mb-1">
                    <input v-model="transfer_address" placeholder="Enter a NEO address" aria-label="NEO address" aria-describedby="basic-addon2" class="form-control">
                    <div class="input-group-append">
                        <button type="button" v-on:click="performTransfer" class="btn btn-primary btn-o3-primary">
                            Transfer
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class=row>
            <div class="col col-md-6 mx-auto">
                <h2 class="text-center">What's the point?</h2>
                <p class="text-center">
                    Well, currently, this is only a proof of concept, but the ability to buy, sell and trade rare tokens has great potential for many applications, such as gaming, art, music, legal affairs and much more!  
                </p>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
	import NFTCard from './NFTExplorer/NFTCard.vue'
	
	export default {
        name: "TokenDetails",
		components: {
			NFTCard
        }, 
        data: function() {
            return {
                "token_id": 100,
                "uri": "https://media.giphy.com/media/z0tbFpl7UBF0A/giphy.gif",
                "owner": "AKzUziiiv9vHj8hX3bYQFVUktk36u6C5w3",
                "contract_hash":"asbbbb"
            }
        }, 
        methods: {
            performTransfer() {

            }
        }
    }
</script>