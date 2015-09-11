'use strict';
angular.module('uai-news.module.core')
  .controller('MainController',
  function($scope, $http, $modal, Noticia, Categoria, Video) {

    $scope.categorias = [];

    Categoria.find(function(data) {
      $scope.categorias = data;
      console.log(66, data)
    }, function(err){
      console.log(err);
    });

  });
