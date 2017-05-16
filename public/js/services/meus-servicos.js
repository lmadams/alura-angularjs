angular.module('meusServicos', ['ngResource'])
    .factory('recursoFoto', function ($resource) {

        return $resource('v1/fotos/:fotoId', null, {
            update: {
                method: 'PUT'
            }
        });

    })
    .factory('cadastroDeFotos', function (recursoFoto, $q, $rootScope) {

        var servico = {};
        var evento = 'fotoCadastrada';
        servico.cadastrar = function (foto) {
            return $q(function (resolve, reject) {
                if (foto._id) {

                    recursoFoto.update({fotoId: foto._id}, foto, function () {
                        $rootScope.$broadcast(evento);
                        resolve({
                            mensagem: 'Foto ' + foto.titulo + ' autlizada com sucesso!',
                            inclusao: false
                        });
                    }, function (erro) {
                        console.error(erro);
                        reject({
                            mensagem: 'Não foi possivel alterar a foto ' + foto.titulo });
                    });
                } else {
                    recursoFoto.save(foto, function () {
                        $rootScope.$broadcast(evento);
                        resolve({
                            mensagem: 'Foto ' + foto.titulo + ' incluída com sucesso!',
                            inclusao: true
                        });
                    }, function (erro) {
                        console.error(erro);
                        reject({
                            mensagem:'Não foi possivel cadastrar a foto ' + foto.titulo});
                    });
                }
            })
        };

        return servico;
    });