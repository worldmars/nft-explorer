<template>
<div id="explorer">
	<div class="row mt-5">
		<div class="col-6 mx-auto text-center">
			Welcome to O3’s Non fungible token (NFT) explorer and minter.
			To get started, please make sure you have O3 desktop wallet installed and <a href="https://www.o3.network">set to TestNet</a>.
		</div>
	</div>
    <div class="row mt-3 mb-4">
		<div class="col col-md-6 mx-auto">
			<div class="input-group mb-1">
				<input v-model="search_value" placeholder="Contract or User Address" aria-label="NEO address" aria-describedby="basic-addon2" class="form-control">
				<div class="input-group-append">
					<button type="button" v-on:click="searchForValue" class="btn btn-primary btn-o3-primary">
						Search
					</button>
				</div>
			</div>
		</div>
	</div>

	<section class="container">
		<div class="text-center success-message mb-4"> 
				Contract Loaded {{ totalSupply }} NFT's Found
		</div>

		<div class="row row-grid d-lg-flex">
			<div class="col-sm-6 col-lg-4 mb-lg-4" v-for="nft in tokens" :key="nft.token_id">
				<NFTCard :token_id="nft.token_id" :owner="nft.owner" :uri="nft.uri" :contract="nft.contract"></NFTCard>
			</div>
		</div>

		<div class="d-flex justify-content-center">
			<nav aria-label="Token Paging">
				<ul class="pagination">
					<li class="page-item"><a class="page-link" href="#">Previous</a></li>
					<li class="page-item"><a class="page-link" href="#">1</a></li>
					<li class="page-item"><a class="page-link" href="#">2</a></li>
					<li class="page-item"><a class="page-link" href="#">3</a></li>
					<li class="page-item"><a class="page-link" href="#">Next</a></li>
				</ul>
			</nav>
		</div>
    </section>

		
		
		<section class="container"> 
				<img class="mx-auto d-block" src="<%= BASE_URL %>../../ConfusedLuna.png" />
				<div class="col-6 mx-auto text-center">
					<div class="landing-info mb-1">Don't know any NFT addresses or contracts? Check these out!</div>
					<div class="landing-info mb-1">O3 Meme Vault (abc123)</div>
					<div class="landing-info mb-1">O3 Foundry (abc123)</div>
					<div class="landing-info mb-1">Or mint your own tokens in the O3 Foundry</div>
				</div>
	</section>
</div>
</template>

<script type="text/javascript">
	import NFTCard from './NFTCard.vue'
	
	export default {
		components: {
			NFTCard
		},
		data: function () {
			return {
				search_value:"ef26427f9eaeed31c57884dbbc2bda5de7b5dab8",
				contract_hash: "",
				address: "",
				token_id: 0,
				image_url:"",
				totalSupply: 0,
				//Known Contracts should probably be parsed out into a server side method
				known_contracts: ["ef26427f9eaeed31c57884dbbc2bda5de7b5dab8"],
				tokens:[]
			}
		}, 
		methods:{
			buildURIRequest(id, contract) {
				var uriRequest = {
						"scriptHash": contract,
  						"operation": "uri",
  						"args": [
    						{
      							"type": 'Integer',
      							"value": parseInt(id, 10)
      						}
  						],
  						"network": "TestNet"
					}
				return uriRequest
			},

			buildOwnerOfRequest(id, contract) {
				var ownerRequest = {
						"scriptHash": contract,
						"operation": "ownerOf",
						"args": [
							{
								"type": 'Integer',
								"value": parseInt(id, 10)
							}
						],
						"network": "TestNet"
					}
				return ownerRequest
			},

			buildTotalSupplyRequest() {
				var totalSupplyRequest = {
						"scriptHash": this.contract_hash,
						"operation": "totalSupply",
						"args": [],
						"network": "TestNet"
					}
				return totalSupplyRequest
			},
			
			buildGetTokensOfOwnerRequest(scriptHash) {
				var tokensOfOwnerRequest = {
					"scriptHash": scriptHash,
						"operation": "tokensOfOwner",
						"args": [
							{
								"type": 'ByteArray',
								"value": Neon.u.reverseHex(Neon.wallet.getScriptHashFromAddress(this.address))
							}, {
								"type": "Integer",
								"value": 1
							}
						],
					"network": "TestNet"
				}
				return tokensOfOwnerRequest
			},

			convertHexToString(hex) {
    			var str = '';
    			for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    			return str;
			},
			
			loadAllTokensForAddress() {
				var self = this
				var smartEcoRouter = new smartEco.SmartEcoRouter()
				smartEcoRouter.start()

				this.tokens = []
				for (var i = 0; i < this.known_contracts.length; i++) {
					var req = self.buildGetTokensOfOwnerRequest(self.known_contracts[i])
					Promise.all([smartEcoRouter.invokeRead(req), Promise.resolve(self.known_contracts[i])])
						.then(function(values) {
							var r = values[0]
							var contract = values[1]
							var deserialized = Neon.sc.StackItem.deserialize(r["stack"][0]["value"])
							for (i=0; i< deserialized["value"].length; i++) {
								var id = parseInt(deserialized["value"][i]["value"]["value"], 16)
								var uriRequest = self.buildURIRequest(id, contract)
								var ownerRequest = self.buildOwnerOfRequest(id, contract)	
								Promise.all([smartEcoRouter.invokeRead(uriRequest), smartEcoRouter.invokeRead(ownerRequest),Promise.resolve(id), Promise.resolve(contract)])
									.then(function(values) {
										var uri = self.convertHexToString(values[0]["stack"][0]["value"])
										var owner = self.convertHexToString(values[1]["stack"][0]["value"])
										self.tokens.push ({
											"token_id": values[2],
											"uri": uri,
											"owner": Neon.wallet.getAddressFromScriptHash(Neon.u.reverseHex(values[1]["stack"][0]["value"])),
											"contract": contract
										})
									})
									.catch(function() {
										//handle error
									})
							}
						})
						.catch(function() {
							//handle error
						})

				}
			},

			loadAllTokensForContract() {
				var self = this
				var smartEcoRouter = new smartEco.SmartEcoRouter()
				smartEcoRouter.start()
				this.tokens = []
				self.totalSupply = 0
				smartEcoRouter.invokeRead(self.buildTotalSupplyRequest())
					.then(function(r) {
						self.totalSupply = parseInt(r["stack"][0]["value"], 16)
						for (var i=1; i< self.totalSupply + 1; i++) {
							var uriRequest = self.buildURIRequest(i, self.contract_hash)
							var ownerRequest = self.buildOwnerOfRequest(i, self.contract_hash)	

							Promise.all([smartEcoRouter.invokeRead(uriRequest), smartEcoRouter.invokeRead(ownerRequest), Promise.resolve(i)])
								.then(function(values) {
									var uri = self.convertHexToString(values[0]["stack"][0]["value"])
									var owner = self.convertHexToString(values[1]["stack"][0]["value"])
									self.tokens.push ({
										"token_id": values[2],
										"uri": uri,
										"owner": Neon.wallet.getAddressFromScriptHash(Neon.u.reverseHex(values[1]["stack"][0]["value"])),
										"contract": self.contract_hash
									})
									console.log(self.tokens)
								})
								.catch(function() {
									//handle error
								})
						}
					})
					.catch(function() {
						//handle error
					})
				},
			searchForValue() {
				if (Neon.wallet.isAddress(this.search_value)) {
					this.address = this.search_value
					this.loadAllTokensForAddress()
				} else {
					this.contract_hash = this.search_value
					this.loadAllTokensForContract()
				}
			},
		}, 
	};
</script>

<style>
 .landing-info {
	color: #000000;
	font-size: 12px;
	text-align: center;
}

.success-message {
	color: #7ED321;
	font-size: 18px;
	font-weight: bold;
}

</style>
