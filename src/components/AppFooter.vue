<template>
<div>
    <section class="slice slice-lg">
        <div class="container">
        <div class="row">
            <div class="col-lg-12">
            <div class="card bg-gradient-dark shadow hover-shadow-lg border-0 position-relative zindex-100">
                <div class="card-body py-5">
                <div class="d-flex align-items-start mb-3">
                    <div class="icon">
                    <img src="<%= BASE_URL %>../../ic_robot.svg" />
                    </div>
                    <div class="icon-text">
                        <h3 class="text-white h4">Building something awesome? Integrate with O3!</h3>
                        <p class="text-white mb-0">With O3's dAPI, it's so simple to hook your app up to the blockchain. 
                        O3 will handle all the wallet and chain interaction heavy lifting, so you can focus on making your app awesome
                        </p>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <a href="mailto:hello@o3.network" target="_blank" class="btn btn-primary btn-o3-primary">Get in touch with us today</a>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>

    <footer id="footer-main">
        <div class="footer footer-dark bg-gradient-primary footer-rotate">
            <div class="container">
                    <div class="row pt-md">
                    <div class="col-lg-4 mb-5 mb-lg-0">
                        <a href="/">
                            <img src="https://cdn.o3.network/logo/logo-dark.png" srcset="https://cdn.o3.network/logo/logo-dark@2x.png 2x" alt="Footer logo" style="height: 40px;">
                        </a>
                        <p class="text-sm mt-2">Your gateway to the Smart Economy</p>
                    </div>
                    <div class="col-lg-2 col-6 col-sm-4 ml-lg-auto mb-5 mb-lg-0">
                        <h6 class="heading mb-3">O3</h6>
                        <ul class="list-unstyled">
                            <li><a href="https://itunes.apple.com/app/id1336781023">iOS</a>
                            </li>
                            <li><a href="https://play.google.com/store/apps/details?id=network.o3.o3wallet">Android</a>
                            </li>
                            <li><a href="https://itunes.apple.com/us/app/o3/id1421086700">macOS</a>
                            </li>
                            <li><a href="https://www.microsoft.com/store/apps/9P6FJT4FB4DJ">Windows</a>
                            </li>
                        </ul>
                    </div>
                
                    <div class="col-lg-2 col-sm-4 mb-5 mb-lg-0">
                        <h6 class="heading mb-3">Company</h6>
                        <ul class="list-unstyled">
                            <li><a href="https://o3.network">Home</a>
                            </li>
                            <li><a href="https://o3.network/team/">Team</a>
                            </li>
                            <li><a href="https://community.o3.network/">Community</a>
                            </li>
                            <li><a href="mailto:support@o3.network">Support</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row align-items-center justify-content-md-between py-4 mt-4 delimiter-top">
                    <div class="col-md-6">
                        <div class="copyright text-sm font-weight-bold text-center text-md-left">
                            &copy; 2019 <a href="https://o3.network/" class="font-weight-bold" target="_blank">O3 Labs Inc</a>. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>