'use strict';
angular.module('uai-news.module.core')
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'js/modules/core/views/base.html'
      })
      .state('app.home', {
        url: '/home',
        templateUrl: 'js/modules/core/views/home.html',
        controller: 'HomeController'
      })
      .state('app.noticias', {
        url: '/noticias/:categoriaId',
        templateUrl: 'js/modules/news/views/noticias.html',
        controller: "NoticiasController"
      })
      .state('app.noticia', {
        url: '/articulo/:articuloId',
        templateUrl: 'js/modules/news/views/noticia.html',
        controller: 'NoticiasController'
      })
      .state('app.admin', {
        url: '/admin',
        templateUrl: 'js/modules/core/views/admin.html',
        controller: 'NoticiasController'
      });

    $urlRouterProvider.otherwise('/app/home');

  });

