angular
    .module('alurapic')
    .controller('FotosController', function ($scope, recursoFoto) {

        $scope.fotos = [];
        $scope.filtro = '';
        $scope.mensagem = '';

        recursoFoto.query(function (fotos) {
            $scope.fotos = fotos;
        }, function (erro) {
            console.log(erro);
        });

        $scope.remover = function (foto) {
            recursoFoto.delete({fotoId : foto._id}, function () {
                    var indexFoto = $scope.fotos.indexOf(foto);
                    $scope.fotos.splice(indexFoto, 1);
                    $scope.mensagem = 'Foto removida com sucesso';
            }, function (erro) {
                    $scope.mensagem = 'Não foi possível remover a foto ';
                    console.error(erro);
            });
        }
    });
