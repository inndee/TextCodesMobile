angular.module('starter.controllers',  [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    isExist : function ( key ) {
      if ($window.localStorage.getItem(key) === null) {
        return  false;
      }
      return true;
    },
    getAllkeys : function ()
    {
      var keys = [];
      for (var key in $window.localStorage){
         keys.push (key);
      }
      return keys;

    },
    removeObjectLocalStorage : function( key ) {
      $window.localstorage.removeItem(key);
      console.log ( "Key removed" , key );
    }
  }
}])

.factory('Post', function($resource) {
  return $resource('/api/post/:id');
})


.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http ,$localstorage , $stateParams, $state,Post ) {

  var app = new AppFrame();


   if ( ! $localstorage.isExist("customcodes") ) {
    $localstorage.setObject('customcodes', {
      codes: [],
    });
  }; 


  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal


  /*
  http://learn.ionicframework.com/formulas/localstorage/

  $localstorage.set('name', 'Max');
  console.log($localstorage.get('name'));
  $localstorage.setObject('post', {
    name: 'Thoughts',
    text: 'Today was a good day'
  });

  var post = $localstorage.getObject('post');
  console.log(post);
  */

  

  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  //Initiate SideMenu options
  $http.get("config/data.xml").then(function(response)
  {
      $scope.Groups =  app.parseData(response).TextCodes.Group;
  }); 


  console.log($state.params);


  if ( $state.params.id != undefined)
    $scope.GroupId = $state.params.id.substr(1).capitalizeFirstLetter();

  if ( $scope.Groups != undefined )
  {
    app.getArraySubObjects( $scope.Groups ).forEach(function(entry) {
    if ( entry.id == $state.params.id.substr(1) )
      $scope.SubList = entry.SubGroups;
    });
  };

  
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };

   




})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('NewCodeCtrl', function($scope , $localstorage ,$window) {
   $scope.formData = {};

 



   $scope.saveCode = function() {

   var customcodes = $localstorage.getObject("customcodes");
   console.log ( "Got customcodes list " , customcodes );

   customcodes.codes.push({
      name: $scope.formData.name,
      desc: $scope.formData.desc,
      text: $scope.formData.text,
      sento: $scope.formData.sendto,
   });

  $localstorage.setObject("customcodes", customcodes );    
   $scope.formData.sendto ="";
   $scope.formData.name ="";
   $scope.formData.text ="";
   $scope.formData.desc ="";
   alert ('Code save');
  }
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
});
