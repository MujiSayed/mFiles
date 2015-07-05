/**
 * Copyright (C) 2014 reep.io 
 * KodeKraftwerk (https://github.com/KodeKraftwerk/)
 *
 * reep.io source - In-browser peer-to-peer file transfer and streaming 
 * made easy
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License along
 *  with this program; if not, write to the Free Software Foundation, Inc.,
 *  51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */
(function () {
	'use strict';

	var use = [
		'config',
		'ngAnimate',
		'ngRoute',
		'upload',
        'static',
		'download',
		'common',
		'angulartics',
		'angulartics.piwik'
	];

	angular.module('mfile', use, ['$compileProvider', function ($compileProvider) {
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|filesystem|blob):/);
		$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|filesystem|blob):|data:image\//);
	}])
		.constant('appEnv', (typeof window['app_env'] !== 'undefined' ? window['app_env'] : 'prod'))
		.config(['$routeProvider', '$locationProvider', '$analyticsProvider', 'appEnv', function ($routeProvider, $locationProvider, $analyticsProvider, appEnv) {
			$routeProvider
				.otherwise({
					templateUrl: 'modules/static/page-404.html',
					controller: 'StaticCtrl'
				});

			$locationProvider.html5Mode(appEnv !== 'dev');
			$analyticsProvider.virtualPageviews(false);
		}])
		.value('clipboardSwf', '/assets/bower_components/reepio-paste-to-clipboard/bin/CopyToClipboard.swf')
		.value('clipboardExpressInstallSwf', '/assets/bower_components/reepio-paste-to-clipboard/bin/expressInstall.swf')
		.run(['$rootScope', '$location', '$route', '$document', 'appEnv',
		function ($rootScope, $location, $route, $document, appEnv) {
			$rootScope.appEnv = appEnv;

			angular.element('#navbar-collapse-1').collapse({
				toggle: false
			});
			$rootScope.view_Load = function() {
				angular.element('#navbar-collapse-1').collapse('hide');
			};

			$rootScope.getIsPageActive = function (page) {
				if(page === '/d')
					return $location.path() === (page + '/' + $rootScope.downloadId);

				return $location.path() === page;
			};

			$rootScope.running = true;
	}]);	
})();