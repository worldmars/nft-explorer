<template>
<div id="foundry">
    <div class="row mt-5 mb-3">
		<div class="col-6 mx-auto landing-info">
			Welcome to O3 Token Foundry! Here you can mint yourself a unique NFT on the O3 NFT contract.
            The goal of the Token Foundary is to give a simple way to get started with NFTs and start building concepts based around unique collectible tokens.
		</div>
	</div>

    <div class="row">
        <div class="col col-md-6 mx-auto">
            <h6>Select An NFT Contract</h6>
            <div class="input-group mb-3">
                <input class="form-control" v-bind:class= "{'is-valid': contract_is_nft, 'is-invalid': contract_is_nft == false}" v-model="contract_hash" placeholder="URI for image" aria-label="NEO address" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button type="button" v-on:click="validateContract" class="btn btn-primary btn-o3-primary">
                        Validate
                    </button>
                </div>
                <div class="invalid-feedback">
                    Please provide a valid contract
                </div>
                <div class="valid-feedback">
                    This is a valid contract
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col col-md-6 mx-auto">
            <h6>Upload a gif from <a target="_blank" href="https://giphy.com/" >Giphy</a></h6>
            <div class="input-group mb-3">
                <input v-model="to_search_uri" v-bind:class= "{'is-invalid': uri_is_valid === false}" placeholder="URI for image" aria-label="NEO address" aria-describedby="basic-addon2" class="form-control">
                <div class="input-group-append">
                    <button type="button" v-on:click="displayURI" class="btn btn-primary btn-o3-primary">
                        Upload
                    </button>
                </div>
                <div class="invalid-feedback">
                    Please provide a valid url from Giphy (starts with https://media.giphy.com)
                </div>
            </div>
        </div>
    </div>
    
    <div class="row mb-3">
        <div class="col col-md-6 mx-auto">
            <h6>Select The Recipient Address</h6>
            <div class="input-group mb-3">
                <input v-model="recipient" v-bind:class= "{'is-invalid': address_is_valid === false}" placeholder="Recipient Address" aria-label="NEO address" aria-describedby="basic-addon2" class="form-control">
                <div class="invalid-feedback">
                    Please provide a address
                </div>
            </div>
        </div>
    </div>

    <div class="col-sm-6 col-lg-4 mb-lg-4 mx-auto">
        <NFTCard  :token_id="100" :owner="recipient" :uri="loaded_uri" :contract="contract_hash"></NFTCard>
    </div>

    <div class="row justify-content-center mb-3">
        <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="customCheck1">
            <label class="custom-control-label" for="customCheck1">I agree to the <a href="https://www.o3.network">terms and conditions</a></label>
        </div>
    </div>

    <div class="row justify-content-center mb-3">
        <button type="button" v-on:click="mintToken" class="btn btn-primary btn-o3-primary">
            Mint Token
        </button>
    </div>        
    <modal ref="modal" :title="modalTitle" :description="modalDescription" :modalAction="modalAction"></modal>
    <connectModal ref="connectmodal"></connectModal>
</div>
</template>

<script>
import NFTCard from './NFTExplorer/NFTCard.vue'
import modal from "./modal.vue"
import connectModal from "./connectModal.vue"

export default {
    components: {
        NFTCard,
        modal,
        connectModal
    },
    data: function () {
        return {
            "to_search_uri": "https://media.giphy.com/media/Wyt6sLEjKjaFjzybth/giphy.gif",
            "loaded_uri": "https://media.giphy.com/media/Wyt6sLEjKjaFjzybth/giphy.gif",
            "contract_hash": "d3fcdaa4f7f14e9044120f3372388570b2f40235",
            "contract_is_nft": true,
            "recipient": "", 
            "show-modal": false,
            "minted": false,

            "address_is_valid": undefined,
            "uri_is_valid": undefined,

            //modal after
            "modalTitle": "",
            "modalDescription": "",
            "modalAction": function() {}
        }
    }, 
    methods:{
        convertHexToString(hex) {
    			var str = '';
    			for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
                return str;
                },
        displayURI() {
            this.loaded_uri = this.to_search_uri
        }, 
        buildSupportedStandardsRequest() {
            var supportedStandardsRequest = { "scriptHash": this.contract_hash,
                "operation": "supportedStandards",
                "args": []  ,
                "network": "TestNet"
            }
            console.log(supportedStandardsRequest)
            return supportedStandardsRequest
        },
        buildMintTokensRequest() {
            var time = new Date()
            var rwProps = {"created_at": time.getTime()}
            var mintTokensRequest = { "scriptHash": this.contract_hash,
                "operation": "mintToken",
                "args": [
                    {"type": "ByteArray", "value": Neon.u.reverseHex(Neon.wallet.getScriptHashFromAddress(this.recipient))},
                    {"type": "ByteArray", "value": "4f3320526f636b73"},
                    {"type": "ByteArray", "value": Neon.u.str2hexstring(this.loaded_uri)},
                    {"type": "ByteArray", "value": Neon.u.str2hexstring(JSON.stringify(rwProps))},
                ],
                "network": "TestNet",
                "fee": "0"
            } 
            return mintTokensRequest
        },
        validateContract() {
            console.log("attempting contract validation")
            var self = this
            if (this.contract_hash.length != 40) {
                self.contract_is_nft = false
            } else {
                var smartEcoRouter = new smartEco.SmartEcoRouter()
                smartEcoRouter.start()
                smartEcoRouter.invokeRead(self.buildSupportedStandardsRequest())
                .then(function(r) {
                    var deserialized = Neon.sc.StackItem.deserialize(r["stack"][0]["value"])
                    var supportedStandards = []
                    for (var i = 0; i < deserialized["value"].length; i++) {
                        supportedStandards.push(self.convertHexToString(deserialized["value"][i]["value"]))
                    }
                    if (supportedStandards.includes("NEP-10")) {
                        self.contract_is_nft = true
                    }
                })
                .catch(function(e) {
                    if(erro)
                    console.log(e) 
                    self.contract_is_nft = false
                })                        
            }
        }, validateFields() {
            this.uri_is_valid = true
            this.address_is_valid = true
            if (this.loaded_uri.match(/\.(jpeg|jpg|gif|png)$/) == null || this.loaded_uri.startsWith("https://media.giphy.com") == false) {
                this.uri_is_valid = false
                return false
            } else if (Neon.wallet.isAddress(this.recipient) == false) {
                this.address_is_valid = false
                return false
            } 
            return true
        },

        mintToken() {
            if (!this.validateFields()) {
                return
            }
            var self = this
            self.$emit('isWaitingForDapi')
            var smartEcoRouter = new smartEco.SmartEcoRouter()
            smartEcoRouter.start()
            var r = self.buildMintTokensRequest()
            console.log(r)
            smartEcoRouter.invoke(r)
            .then(function(r) {
                console.log(r)
                self.$emit('isNotWaitingForDapi')
                self.minted = true
                self.modalTitle = "Mint Succeeded"
                self.modalDescription = "You're token has succeeded in minting, it should show up in the explorer in a couple of minutes"
                self.modalAction = function() {
                    console.log("replacing route")
                    self.$router.replace({ name: 'explorer'})
                }
                let element = self.$refs.modal.$el
                $(element).modal('show')
            })
            .catch(function(e) {
                self.$emit('isNotWaitingForDapi')
                console.log(e)
                console.log(e.type)
                if (e.type == "NO_PROVIDER") {
                    let element = self.$refs.connectmodal.$el
                    console.log(element)
                    console.log(self.$refs.connectmodal)
                    $(element).modal('show')
                    return    
                } else if(e.type == "INVALID_NETWORK") {
                    let element = self.$refs.modal.$el
                    self.modalTitle = "Connect to the test network"
                    self.modalDescription = "Looks like your O3 wallet is set to the mainnet. Currently only test net is available for this app. Please change to testnet in the settings menu"
                    self.modalAction = function() {}
                    $(element).modal('show')
                    return    
                }


                let element = self.$refs.modal.$el
                self.modalTitle = "Mint Failed"
                self.modalDescription = "Something went wrong, double check your information and try again in a a couple of minutes"
                self.modalAction = function() {}

                $(element).modal('show')
            })
        }
    }
}
</script>

<style>
 .landing-info {
	color: #000000;
	font-size: 13px;
	text-align: center;
}
