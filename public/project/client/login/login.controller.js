(function () {
      angular
            .module("TripPlannerApp")
            .controller("loginController", loginController);

      function loginController(UserService, $location, $rootScope) {
            var model = this;

            model.login = login;
            
            model.message = $rootScope.errorMessage;

            function login(user) {
                  UserService
                        .login(user)
                        .then(function (response) {
                              if (response != null) {
                                    $rootScope.currentUser = response;
                                    $location.url("/profile");
                              } else {
                                    model.message = "Invalid username or pasword";
                              }
                        });
            }
      }

})();
