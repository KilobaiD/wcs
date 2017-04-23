/**
 * Created by andrei on 4/10/17.
 */
///<reference path="../../../assets/typings/tsd.d.ts"/>
///<reference path="../main/MainController.ts"/>
///<reference path="../login_user/AuthenticationService.ts"/>
module rasdaman {
    export class LoginUserController {

        public static $inject = [
            "$scope",
            // "$http",
            // "$cookies",
            // "$timeout",
            "$location",
            "rasdaman.AuthenticationService"
        ];

        // private AuthenticationService : AuthenticationService;

        // constructor(
        //             private $http:angular.IHttpService,
        //             private $cookies:angular.cookies.ICookiesService,
        //             private $timeout:angular.ITimeoutService,
        //             private $location:angular.ILocationService,
        //             private authenticationService:rasdaman.AuthenticationService
        // ) {}
        public constructor(private $scope:LoginUserControllerScope,
                    private $location:angular.ILocationService,
                    private authenticationService:rasdaman.AuthenticationService) {
            // this.AuthenticationService = authenticationService;
            var vm = <any>this;
            $scope.LoginTab.Heading = "Login";
            // vm.login = login;
            // this.init();

            // (function initController() {
            //     // reset login status
            //     authenticationService.ClearCredentials();
            // })();

            $scope.login = () => {
                vm.dataLoading = true;
                authenticationService.Login(vm.username, vm.password, function (response) {
                    if (response.success) {
                        authenticationService.SetCredentials(vm.username, vm.password);
                        $scope.LoginTab.Heading = "Logout";
                        $location.path('/wcs/myaccount');
                    } else {
                        vm.dataLoading = false;
                    }
                });
            };

        //Run sa fie facut in APP.TS
       // .run(function ($rootScope, $location, Auth, $cookieStore) {
                // Redirect to login if route requires auth and you're not logged in
               // $rootScope.$on('$stateChangeStart', function (event, next) {
                 //   Auth.isLoggedInAsync(function(loggedIn) {
                    //    if (next.authenticate && !loggedIn) {

                            // store the requested url if not logged in
                       //     if ($location.url() != '/login')
                            {
                        //        $cookieStore.put('returnUrl', $location.url());
                            }
                        //    $location.path('/login');
                       // }
                   // });
               // });
            //});

            var administratorRoles = ['admin', 'editor'];
            var usersRoles = ['user'];

//Selected index cand vrei sa faci login-ul
        .config(function($routeProvider){
                $routeProvider.when("/",
                    {
                        templateUrl: "//Calea spre home"
                    }
                )
                    .when("/login",
                        {
                            templateUrl: "//Calea spre login"
                        }
                    )
                    .when("/register",
                        {
                            templateUrl: "//Claea spre register"
                        }
                    );
            })


            //LoginRolesSystem
           // angular.module('wcs').factory('UserService', function () {

             //   var currentUser = null;

             //   var administratorRoles = ['admin', 'editor'];
            //    var usersRoles = ['user'];


            //    return {


              //      validateRoleAdmin: function () {
              //          return _.contains(administratorRoles, currentUser.role);
              //      },

               //     validateRoleOther: function () {
                //        return _.contains(usersRoles, currentUser.role);
                //    }
                //};
          //  });
          //  });

           // angular.module('wcs').run(function ($rootScope, $location, AuthenticationService, UserService) {

                //Daca roles nu au nevoie de autentificare
               // var routesThatDontRequireAtuh = ['/src/components/login_user/LoginUserView.html'];
               // var routesThatForAdmins = ['/admin'];

                //clean donreq
               // var routeClean = function(route) {}
                //Admin Prv
              //  var routeAdmin = function(route) {}

              //  $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
              //      if (!routeClean($location.url()) && !AuthenticationService.isLoggedIn()) {
               //         // face redirect login
               //         $location.path('/src/components/login_user/LoginUserView.html');
             //       }
             //       else if (routeAdmin($location.url() && !UserService.validateRoleAdmin()) {
             //           // face redirect la pagina error
             //           $location.path('/error');
              //      }
            //    });
         //   });


        // function login() {
            //     vm.dataLoading = true;
            //     this.AuthenticationService.Login(vm.username, vm.password, function (response) {
            //         if (response.success) {
            //             this.AuthenticationService.SetCredentials(vm.username, vm.password);
            //             $location.path('/wcs');
            //         } else {
            //             vm.dataLoading = false;
            //         }
            //     });
            // };

        }

        // init() : void{
        //     this.AuthenticationService.ClearCredentials();
        // }
    }



    angular.module('demoLogin', [])
        .controller('mainController', MainController)
        .directive('access', AccessDirective);

    function MainController(){

        var vm =this;
        angular.extend(vm, {
            hello: 'Hello test',
            user: {
                uid: 123,
                role: 'user' //'admin'
            },
            messages: [{
                uid: 123,
                text: 'Hello test 2'
            }, {
                uid: 234,
                text: 'Hello test 3'
            }, {
                uid: 123,
                text: 'Hello test 4'
            }]
        });
    }
    function AccessDirective($compile) {
        //var template = '<div ng-if="accessCtrl.rights || accessCtrl.checkRole()"></div>';
        var availableRoles = ['admin', 'mod', 'user'],
            defaultBindingName = 'auth',
            debugFirebaseRules = false;

        return {
            transclude: true,
            //replace: true,
            scope: {},
            bindToController: {
                rights: '=',
                role: '=',
                availRoles: '@?', //is admin or something
                reqRoles: '@' // if user has this role he can also see the controls - ex admin
            },
            controllerAs: 'accessCtrl',
            controller: function($scope) {
                var vm = this;
                vm.availRoles = angular.extend(availableRoles,
                    $scope.$eval(vm.availRoles));//.split(',');
                vm.bountItemName = vm.boundItemName || defaultBindingName;

                vm.reqRoles = $scope.$eval(vm.reqRoles);


                //console log
                vm.checkRole = function() {
                    return vm.reqRoles.indexOf(vm.role) > -1;
                };

                //vm isadmin
                vm.hasRights = vm.rights;
            },
            link: function(scope, element, attrs, ctrl, transclude) {
                //uppercase first
                function ucfirst (str) {

                    str += '';
                    var f = str.charAt(0).toUpperCase();
                    return f + str.substr(1);
                }
//Ctrl = maincontroller / var controller
                var boundObj = {
                        role: ctrl.role,
                        hasRights: ctrl.hasRights
                    }, // your object
                    dynRoles = {}; // isAdmin, isModerator etc.

                angular.forEach(ctrl.availRoles, function(reqRole) {
                    dynRoles['is' + ucfirst(reqRole)] = (ctrl.role === reqRole);
                });

                angular.extend(boundObj, dynRoles);

                var alias = ctrl.bountItemName;


                var newScope = scope.$new(true);
                newScope[alias] = boundObj;
                transclude(newScope, function(preLinkContent, scope) {
                    if ( ctrl.rights || ctrl.checkRole() || debugFirebaseRules ) {

                        element.append(preLinkContent);
                    }
                });
            }
        }
    }




    interface LoginUserControllerScope extends MainControllerScope {

        login():void;
    }
}

