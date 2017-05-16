angular.module('alurapic')
    .controller('GruposController', function ($scope, $http) {
        $scope.grupos = [];

        $http.get('v1/grupos')
            .then(function (resp) {
                $scope.grupos = resp.data;
            }, function (erro) {
                console.error(erro);
            })
    });