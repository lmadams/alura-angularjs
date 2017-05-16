angular.module('alurapic')
    .controller('FotoController', function ($scope, $routeParams, recursoFoto, cadastroDeFotos) {

        $scope.foto = {};
        $scope.mensagem = '';

        if ($routeParams.fotoId) {
            recursoFoto.get({fotoId: $routeParams.fotoId}, function (resp) {
                    $scope.foto = resp;
                }, function (erro) {
                    console.error(erro);
                });
        }

        $scope.submeter = function () {
            if ($scope.formulario.$valid) {
                cadastroDeFotos.cadastrar($scope.foto)
                    .then(function (dados) {
                        $scope.mensagem = dados.mensagem;
                        if (dados.inclusao) {
                            $scope.foto = {};
                        }
                    })
                    .catch(function (erro) {
                        $scope.mensagem = erro.mensagem;
                    });
            }
        }
    });