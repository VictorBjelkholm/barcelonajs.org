'use strict';

angular.module('bcnjs')
	.controller('MainCtrl', function ($scope) {
		var i = 0;
		var today = new Date();
		var yesterday = new Date();

		yesterday.setTime(today.getTime() - 24 * 60 * 60 * 1000);

		while(bcnjs_events[i].date <= yesterday) {
			i++;
		}

		$scope.bcnjs = bcnjs_events[i];

		if(!$scope.bcnjs.special) {

			while($scope.bcnjs.talks.length < 3) {
				var empty = {
					title: 'Free slot',
					description: '**This slot could be yours! Submit your talk now.**  You did some crazy stuff with JavaScript? You want to show it to the community?\nDrop us a line on your topic on [Twitter](https://twitter.com/bcnjs) or to [Google+](https://plus.google.com/u/0/communities/115705669406517039298).'
				};
				$scope.bcnjs.talks.push(empty);
			}

		}
	})
	.directive('backgroundAddress', function () {
		var directiveObject = {
			// A = attribute, E = element, C = class and M = comment
			restrict: 'A',
			scope: {
				'backgroundAddress': '@'
			},
			link: function (scope, element) {

				scope.$watch('backgroundAddress', function (newValue) {

					element.append(createMap(newValue));
				})
				var createMap = function(address) {
					var enc_address = encodeURIComponent(address);
					var map = 'https://maps.googleapis.com/maps/api/staticmap?center=' + enc_address + '&size=1280x1280'
					+'&markers=color:blue%7' + enc_address
					+'&scale=2&zoom=15&sensor=false';
					var backgroundEl = angular.element('<div id="backgroundMap"></div>');
					backgroundEl.css('position', 'fixed');
					backgroundEl.css({'top': '0', 'bottom': 0, 'left': 0, 'right': 0});
					backgroundEl.css('background', 'url("' + map + '") no-repeat center center fixed');
					backgroundEl.css('opacity', '0.2');
					backgroundEl.css('z-index', '-1');
					return backgroundEl;
				}
				// console.log(element);
			}
		};
		return directiveObject;
	});
