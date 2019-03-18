<template>
    <div>
        <div class="col-sm-6 col-lg-4 mb-lg-4 mx-auto mt-5">
            <NFTCard  :token_id="$route.params.id" :owner="owner" :uri="uri" :contract="$route.params.contract_hash"></NFTCard>
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
                    If that’s you, you have the ability to transfer it to anyone you like. 
                    If not, why not try to mint your own at the <router-link to="/foundry">Token Foundry</router-link>.
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
import { match } from 'minimatch';
	
	export default {
        name: "TokenDetails",
		components: {
			NFTCard
        }, 
        data: function() {
            return {
                "uri": "",
                "owner": "",
                "transfer_address":"AKzUziiiv9vHj8hX3bYQFVUktk36u6C5w3"
            }
        }, 
        methods: {
            convertHexToString(hex) {
    			var str = '';
    			for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
                return str;
            },
            buildURIRequest() {
				return {
						"scriptHash": this.$route.params.contract_hash,
  						"operation": "uri",
  						"args": [
    						{
      							"type": 'Integer',
      							"value": parseInt(this.$route.params.id, 10)
      						}
  						],
  						"network": "TestNet"
					}
				return uriRequest
            },
            buildOwnerOfRequest() {
                return {
						"scriptHash": this.$route.params.contract_hash,
						"operation": "ownerOf",
						"args": [
							{
								"type": 'Integer',
								"value": parseInt(this.$route.params.id, 10)
							}
						],
						"network": "TestNet"
					}
            },
            buildTransferRequest() {
                return {
                    "scriptHash": this.$route.params.contract_hash,
						"operation": "transfer",
						"args": [
							{
								"type": 'ByteArray',
								"value": Neon.u.reverseHex(Neon.wallet.getScriptHashFromAddress(this.transfer_address))
                            }, {
                                "type": 'Integer',
								"value": parseInt(this.$route.params.id, 10)
                            }
                            
                        ],
                        "fee": "0", 
						"network": "TestNet"
                }
            },  
            loadTokenCard() {
                console.log("loading token card")
                var uriRequest = this.buildURIRequest()
                var ownerRequest = this.buildOwnerOfRequest()
                var self = this
                var smartEcoRouter = new smartEco.SmartEcoRouter()
                smartEcoRouter.start()
                console.log(uriRequest)
                
                Promise.all([smartEcoRouter.invokeRead(uriRequest), smartEcoRouter.invokeRead(ownerRequest)])
                .then(function(values) {
                    self.uri = self.convertHexToString(values[0]["stack"][0]["value"])
                    self.owner = Neon.wallet.getAddressFromScriptHash(Neon.u.reverseHex(values[1]["stack"][0]["value"]))

                    console.log(self.uri)  
                })  
                .catch(function(e) {
                    console.log(e)
                })
            },
            performTransfer() {
                var transferRequest = this.buildTransferRequest()
                console.log(transferRequest)
                var self = this
                var smartEcoRouter = new smartEco.SmartEcoRouter()
                smartEcoRouter.start()
                
                smartEcoRouter.invoke(transferRequest)
                .then(function(r) {
                    console.log(r)
                }) 
                .catch(function(e){
                    console.log(e)
                })
            }
        },
        mounted: function () {
            this.loadTokenCard()
        }
    }
</script>