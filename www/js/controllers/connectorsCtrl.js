angular.module('starter')

	.controller('ConnectorsCtrl', function($scope, $state, $stateParams, $rootScope, $filter, $ionicPlatform,
										   $ionicActionSheet, $timeout, authService, reminderService, utilsService,
										   connectorsService, $cordovaOauth, bugsnagService, $ionicPopup) {

	    $scope.controller_name = "ConnectorsCtrl";

		console.log('Loading ' + $scope.controller_name);
		
	    $scope.state = {
	    	showMeasurementBox : false,
	    	selectedReminder : false,
	    	reminderDefaultValue : "",
			isDisabled : false,
			title : 'Import Data',
			loading : true
	    };


	    $scope.init = function(){
			if (typeof Bugsnag !== "undefined") { Bugsnag.context = "importData"; }
			if (typeof analytics !== 'undefined')  { analytics.trackView("Import Data Controller"); }
			connectorsService.getConnectors();
			connectorsService.refreshConnectors();
		};

		$scope.showAuthWindow = function (connector) {
			var url = connector.connectInstructions.url;
			var authWindow;
			var windowSize = {
				width: Math.floor(window.outerWidth * 0.8),
				height: Math.floor(window.outerHeight * 0.7)
			};
			if (windowSize.height < 500) {
				windowSize.height = Math.min(500, window.outerHeight);
			}
			if (windowSize.width < 800) {
				windowSize.width = Math.min(800, window.outerWidth);
			}
			windowSize.left = window.screenX + (window.outerWidth - windowSize.width) / 2;
			windowSize.top = window.screenY + (window.outerHeight - windowSize.height) / 8;
			var windowOptions = "width=" + windowSize.width + ",height=" + windowSize.height;
			windowOptions += ",toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0";
			windowOptions += ",left=" + windowSize.left + ",top=" + windowSize.top;

			authWindow = window.open(url, "Authorization", windowOptions);
			if (authWindow) {
				//authWindow.focus();
			}
			//return authWindow;
		};

		$scope.connect = function(connector){

			var scopes;

			if(connector.name === 'github') {
				scopes = ['user', 'repo'];
				$cordovaOauth.github(window.private_keys.GITHUB_CLIENT_ID, window.private_keys.GITHUB_CLIENT_SECRET,
					scopes).then(function(result) {
					console.log("Response Object -> " + JSON.stringify(result));
					var params = {connectorAccessToken: result.access_token};
					connectorsService.connect('github', params).then(function(result){
						console.log(JSON.stringify(result));
						$scope.init();
					}, function (error) {
						bugsnagService.reportError(error);
						alert("Error: " + error);
					});
				}, function(error) {
					bugsnagService.reportError(error);
					alert("Error: " + error);
				});
			}

			if(connector.name === 'withings') {
				$cordovaOauth.withings(window.private_keys.WITHINGS_CLIENT_ID, window.private_keys.WITHINGS_CLIENT_SECRET)
					.then(function(result) {
					console.log("Response Object -> " + JSON.stringify(result));
					var params = {connectorAccessToken: result.access_token};
					connectorsService.connect('withings', params).then(function(result){
						console.log(JSON.stringify(result));
						$scope.init();
					}, function (error) {
						bugsnagService.reportError(error);
						alert("Error: " + error);
					});
				}, function(error) {
					bugsnagService.reportError(error);
					alert("Error: " + error);
				});
			}

			if(connector.name === 'facebook') {
				scopes = ['user_likes', 'user_posts'];
				$cordovaOauth.facebook(window.private_keys.FACEBOOK_APP_ID, scopes)
					.then(function(result) {
						console.log("Response Object -> " + JSON.stringify(result));
						var params = {connectorAccessToken: result.access_token};
						connectorsService.connect('facebook', params).then(function(result){
							console.log(JSON.stringify(result));
							$scope.init();
						}, function (error) {
							bugsnagService.reportError(error);
							alert("Error: " + error);
						});
					}, function(error) {
						bugsnagService.reportError(error);
						alert("Error: " + error);
					});
			}

			if(connector.name === 'googlefit') {
				scopes = [
					"https://www.googleapis.com/auth/fitness.activity.read",
					"https://www.googleapis.com/auth/fitness.body.read",
					"https://www.googleapis.com/auth/fitness.location.read"
				];

				$cordovaOauth.google(window.private_keys.GOOGLE_CLIENT_ID, scopes)
					.then(function(result) {
						console.log("Response Object -> " + JSON.stringify(result));
						var params = {connectorAccessToken: result.access_token};
						connectorsService.connect('googlefit', params).then(function(result){
							console.log(JSON.stringify(result));
							$scope.init();
						}, function (error) {
							bugsnagService.reportError(error);
							alert("Error: " + error);
						});
					}, function(error) {
						bugsnagService.reportError(error);
						alert("Error: " + error);
					});
			}

			if(connector.name === 'googlecalendar') {
				scopes = [
					"https://www.googleapis.com/auth/calendar",
					"https://www.googleapis.com/auth/calendar.readonly"
				];

				$cordovaOauth.google(window.private_keys.GOOGLE_CLIENT_ID, scopes)
					.then(function(result) {
						console.log("Response Object -> " + JSON.stringify(result));
						var params = {connectorAccessToken: result.access_token};
						connectorsService.connect('googlecalendar', params).then(function(result){
							console.log(JSON.stringify(result));
							$scope.init();
						}, function (error) {
							bugsnagService.reportError(error);
							alert("Error: " + error);
						});
					}, function(error) {
						bugsnagService.reportError(error);
						alert("Error: " + error);
					});
			}

			if(connector.name === 'up') {
				scopes = [
					'basic_read',
					'extended_read',
					'location_read',
					'friends_read',
					'mood_read',
					'move_read',
					'sleep_read',
					'meal_read',
					'weight_read',
					'heartrate_read',
					'generic_event_read'
				];

				$cordovaOauth.jawbone(window.private_keys.JAWBONE_CLIENT_ID, window.private_keys.JAWBONE_CLIENT_SECRET, scopes)
					.then(function(result) {
						console.log("Response Object -> " + JSON.stringify(result));
						var params = {connectorAccessToken: result.access_token};
						connectorsService.connect('up', params).then(function(result){
							console.log(JSON.stringify(result));
							$scope.init();
						}, function (error) {
							bugsnagService.reportError(error);
							alert("Error: " + error);
						});
					}, function(error) {
						bugsnagService.reportError(error);
						alert("Error: " + error);
					});
			}

			if(connector.name === 'worldweatheronline') {
				$scope.showPopup = function() {
					$scope.data = {};

					// An elaborate, custom popup
					var myPopup = $ionicPopup.show({
						template: '<input type="text" ng-model="data.wwoLocation">',
						title: 'Enter Your Zip Code',
						subTitle: 'Please use normal things',
						scope: $scope,
						buttons: [
							{ text: 'Cancel' },
							{
								text: '<b>Save</b>',
								type: 'button-positive',
								onTap: function(e) {
									if (!$scope.data.wifi) {
										//don't allow the user to close unless he enters wifi password
										e.preventDefault();
									} else {
										return $scope.data.wwoLocation;
									}
								}
							}
						]
					});

					myPopup.then(function(res) {
						var params = {
							location: $scope.data.wwoLocation
						};
						connectorsService.connect(connector.name, params);
						console.log('Tapped!', res);
					});

					$timeout(function() {
						myPopup.close(); //close the popup after 3 seconds for some reason
					}, 3000);
				};

			}

		};

		$scope.disconnect = function (connector){
			connectorsService.disconnect(connector.name).then(function (){
				$scope.init();
			}, function() {
				console.error("error disconnecting " + connector.name);
			});
		};

		$scope.getItHere = function (connector){
			window.open(connector.getItUrl, '_blank');
		};

    	$scope.$on('$ionicView.enter', function(e) { console.debug("Entering state " + $state.current.name);
			$scope.hideLoader();
    		$scope.init();
    	});

		// Triggered on a button click, or some other target
		$scope.showActionSheetForConnector = function(trackingReminderNotification, $event) {

			$scope.state.trackingReminderNotification = trackingReminderNotification;
			$scope.state.trackingReminder = trackingReminderNotification;
			$scope.state.trackingReminder.id = trackingReminderNotification.trackingReminderId;
			$scope.state.variableObject = trackingReminderNotification;
			$scope.state.variableObject.id = trackingReminderNotification.variableId;
			$scope.state.variableObject.name = trackingReminderNotification.variableName;
			// Show the action sheet
			var hideSheetForNotification = $ionicActionSheet.show({
				buttons: [
					{ text: '<i class="icon ion-android-notifications-none"></i>Edit Reminder'},
					{ text: '<i class="icon ion-ios-star"></i>Add ' + ' to Favorites' },
					{ text: '<i class="icon ion-edit"></i>Record ' + ' Measurement' },
					{ text: '<i class="icon ion-arrow-graph-up-right"></i>' + 'Visualize'},
					{ text: '<i class="icon ion-ios-list-outline"></i>' + 'History'},
					{ text: '<i class="icon ion-settings"></i>' + 'Variable Settings'},
					{ text: '<i class="icon ion-arrow-up-a"></i>Positive Predictors'},
					{ text: '<i class="icon ion-arrow-down-a"></i>Negative Predictors'}
				],
				destructiveText: '<i class="icon ion-trash-a"></i>Skip All Notifications',
				cancelText: '<i class="icon ion-ios-close"></i>Cancel',
				cancel: function() {
					console.log('CANCELLED');
				},
				buttonClicked: function(index) {
					console.log('BUTTON CLICKED', index);
					if(index === 0){
						$scope.editReminderSettingsByNotification($scope.state.trackingReminderNotification);
					}
					if(index === 1){
						$scope.addToFavoritesUsingVariableObject($scope.state.variableObject);
					}
					if(index === 2){
						$scope.goToAddMeasurementForVariableObject($scope.state.variableObject);
					}
					if(index === 3){
						$scope.goToChartsPageForVariableObject($scope.state.variableObject);
					}
					if(index === 4){
						$scope.goToHistoryForVariableObject($scope.state.variableObject);
					}
					if (index === 5) {
						$state.go('app.variableSettings',
							{variableName: $scope.state.trackingReminderNotification.variableName});
					}
					if(index === 6){
						$state.go('app.predictors',
							{
								variableObject: $scope.state.variableObject,
								requestParams: {
									effect:  $scope.state.variableObject.name,
									correlationCoefficient: "(gt)0"
								}
							});
					}
					if(index === 7){
						$state.go('app.predictors',
							{
								variableObject: $scope.state.variableObject,
								requestParams: {
									effect:  $scope.state.variableObject.name,
									correlationCoefficient: "(lt)0"
								}
							});
					}

					return true;
				},
				destructiveButtonClicked: function() {
					console.debug("Skipping all notifications for trackingReminder", $scope.state.trackingReminderNotification);
					var params = {
						trackingReminderId : $scope.state.trackingReminderNotification.trackingReminderId
					};
					$scope.showLoader('Skipping all ' + $scope.state.variableObject.name + ' reminder notifications...');
					reminderService.skipAllReminderNotifications(params)
						.then(function(){
							$scope.hideLoader();
							$scope.init();
						}, function(err){
							$scope.hideLoader();
							if (typeof Bugsnag !== "undefined") {
								Bugsnag.notify(err, JSON.stringify(err), {}, "error");
							}
							console.error(err);
							utilsService.showAlert('Failed to skip all notifications for , Try again!', 'assertive');
						});
					return true;
				}
			});


			$timeout(function() {
				hideSheetForNotification();
			}, 20000);

		};


	});