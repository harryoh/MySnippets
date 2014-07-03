app.controller('MainCtrl', function($scope, Coreconfig) {
  $scope.title = 'Default';
  Coreconfig.getData().then(function(response) {
    $scope.model = response.model;
    $scope.name = response.name;
  });
});

app.controller('OnvifCtrl', function($scope, Coreconfig) {
  $scope.title = 'Onvif';
  Coreconfig.setApiSlot('Onvif');
  Coreconfig.getData().then(function(response) {
    $scope.model = response.model;
    $scope.name = response.name;
  });
});

app.controller('UapiCtrl', function($scope, Coreconfig) {
  $scope.title = 'Uapi';
  Coreconfig.setApiSlot('Uapi');
  Coreconfig.getData().then(function(response) {
    $scope.model = response.model;
    $scope.name = response.name;
  });
});
