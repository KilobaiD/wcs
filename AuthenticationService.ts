/**
 * Created by andrei on 4/10/17.
 */
/*
 * This file is part of rasdaman community.
 *
 * Rasdaman community is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Rasdaman community is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with rasdaman community.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Copyright 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015 Peter Baumann /
 rasdaman GmbH.
 *
 * For more information please see <http://www.rasdaman.org>
 * or contact Peter Baumann via <baumann@rasdaman.com>.
 */
/// <reference path="../../../assets/typings/tsd.d.ts"/>
///<reference path="../../common/_common.ts"/>

module rasdaman {
    export class AuthenticationService {
        public static $inject = [
            "$http",
            "$cookies",
            "$rootScope",
            "$timeout",
            "rasdaman.UserService"
        ];

        // private UserService : UserService;
        public constructor (
            private $http:angular.IHttpService,
                            private $cookies:angular.cookies.ICookiesService,
                            private $rootScope:angular.IRootScopeService,
                            private $timeout:angular.ITimeoutService,
                            private UserService:rasdaman.UserService
        ) { }

        //     this.UserService = UserService;
        // var service = <any>{};
        // service.Login = Login;
        // service.SetCredentials = SetCredentials;
        // service.ClearCredentials = ClearCredentials;
        //
        // return service;

        // public login() : string {
        //     return "plm";
        //
        // }


        public Login(username, password, callback) {


            var response = { success: true };
            callback(response);
            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            // this.$timeout(() => {
            //     var response;
            //     this.UserService.GetByUsername(username)
            //         .then(function (user) {
            //             if (user !== null && user.password === password) {
            //                 response = { success: true };
            //             } else {
            //                 response = { success: false, message: 'Username or password is incorrect' };
            //             }
            //             callback(response);
            //         });
            // }, 1000);

            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });

        }

        public SetCredentials(username, password) {
            var authdata = btoa(username + ':' + password);
            (<any>(this.$rootScope)).globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            // set default auth header for http requests
            this.$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            cookieExp.setDate(cookieExp.getDate() + 7);
            this.$cookies.putObject('globals', (<any>(this.$rootScope)).globals, { expires: cookieExp });
        }

        public ClearCredentials() {
            (<any>(this.$rootScope)).globals = {};
            this.$cookies.remove('globals');
            this.$http.defaults.headers.common['Authorization'] = 'Basic';
        }



    }

}


