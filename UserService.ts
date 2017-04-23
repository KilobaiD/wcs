/**
 * Created by andrei on 4/12/17.
 */
module rasdaman{
    export class UserService{
        static $inject = ["$timeout", "$filter", "$q", "rasdaman.LocalStorageService"];
        public constructor(private $timeout:angular.ITimeoutService,
                           private $filter:angular.IFilterService,
                           private $q:angular.IQService,
                           private localStorage: rasdaman.LocalStorageService) { }

        // var service = <any>{};
        //
        // service.GetAll = GetAll;
        // service.GetById = GetById;
        // service.GetByUsername = GetByUsername;
        // service.Create = Create;
        // service.Update = Update;
        // service.Delete = Delete;
        //
        // return service;

        public GetAll() {
            var deferred = this.$q.defer();
            deferred.resolve(this.getUsers());
            return deferred.promise;
        }

        public GetById(id) {
            var deferred = this.$q.defer();
            var filtered = this.$filter('filter')(this.getUsers(), { id: id });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        public GetByUsername(username) {
            var deferred = this.$q.defer();
            var filtered = this.$filter('filter')(this.getUsers(), { username: username });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        public Create(user) {
            var deferred = this.$q.defer();

            // simulate api call with $timeout
            this.$timeout(() => {
                this.GetByUsername(user.username)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
                        } else {
                            var users = this.getUsers();

                            // assign id
                            var lastUser = users[users.length - 1] || { id: 0 };
                            user.id = lastUser.id + 1;

                            // save to local storage
                            users.push(user);
                            this.setUsers(users);

                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);

            return deferred.promise;
        }

        public Update(user) {
            var deferred = this.$q.defer();

            var users = this.getUsers();
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === user.id) {
                    users[i] = user;
                    break;
                }
            }
            this.setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        public Delete(id) {
            var deferred = this.$q.defer();

            var users = this.getUsers();
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.id === id) {
                    users.splice(i, 1);
                    break;
                }
            }
            this.setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        // private functions

        public getUsers() {
            var users : string;
            if(!this.localStorage.length()){
                users = JSON.stringify([]);
            }
            else {
                for (let i = 0; i < this.localStorage.length(); ++i) {
                    let key = this.localStorage.get(i)
                    users += key;
                }
            }

            return JSON.parse(users);
        }

        public setUsers(users) {
            for(let i = 0; i < users.length; i++)
                this.localStorage.set(i, JSON.stringify(users[i]));
        }
    }

}
