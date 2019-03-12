<template>
<div id="foundry">
    <div class="row mt-5">
        <div class="col col-md-6 mx-auto">
            <h6>Select An NFT Contract</h6>
            <div class="input-group mb-3">
                <input v-model="contract_hash" placeholder="URI for image" aria-label="NEO address" aria-describedby="basic-addon2" class="form-control">
                <div class="input-group-append">
                    <button type="button" v-on:click="validateContract" class="btn btn-primary btn-o3-primary">
                        Validate
                    </button>
                </div>
            </div>
            <div class="alert alert-danger" v-if="contract_is_nft == false">This is an invalid NFT contract</div>
            <div class="alert alert-success" v-if="contract_is_nft">This a a valid NFT contract</div>
        </div>
    </div>

    <div class="row mt-5">
        <div class="col col-md-6 mx-auto">
            <h6>Upload Resource</h6>
            <div class="input-group mb-3">
                <input v-model="to_search_uri" placeholder="URI for image" aria-label="NEO address" aria-describedby="basic-addon2" class="form-control">
                <div class="input-group-append">
                    <button type="button" v-on:click="displayURI" class="btn btn-primary btn-o3-primary">
                        Upload
                    </button>
                </div>
            </div>
            <img v-bind:src="loaded_uri" height="100px"/>
        </div>
    </div>
    <div class="row mt-5">
        <div class="col col-md-6 mx-auto">
            <h6>Select The Recipient Address</h6>
            <div class="input-group mb-3">
                <input v-model="recipient" placeholder="Recipient Address" aria-label="NEO address" aria-describedby="basic-addon2" class="form-control">
            </div>
        </div>
    </div>
    <div class="row mt-5">
        <button type="button" v-on:click="mintToken" class="btn btn-primary btn-o3-primary">
            Mint Token
        </button>
    </div>        
</div>
</template>

<script>
export default {
    data: function () {
        return {
            "to_search_uri": "https://media.giphy.com/media/Wyt6sLEjKjaFjzybth/giphy.gif",
            "loaded_uri": "",
            "contract_hash": "5b9c51062ccd3c99346febb4fda31dbe506e92d9",
            "contract_is_nft": false,
            "recipient": "AafQxV6wQhtGYGYFboEyBjw3eMYNtBFW8J"
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
            var mintTokensRequest = { "scriptHash": this.contract_hash,
                "operation": "mintToken",
                "args": [
                    {"type": "ByteArray", "value": Neon.u.reverseHex(Neon.wallet.getScriptHashFromAddress(this.recipient))},
                    {"type": "ByteArray", "value": "00"},
                    {"type": "ByteArray", "value": Neon.u.str2hexstring(this.loaded_uri)}
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
                    console.log(e)
                    self.contract_is_nft = false
                })                        
            }
        },
        mintToken() {
            var self = this
            var smartEcoRouter = new smartEco.SmartEcoRouter()
            smartEcoRouter.start()
            var r = self.buildMintTokensRequest()
            console.log(r)
            smartEcoRouter.invoke(r)
            .then(function(r) {
                console.log(r)
            })
            .catch(function(e) {
                console.log(e)
            })
        }
    }
}
</script>
