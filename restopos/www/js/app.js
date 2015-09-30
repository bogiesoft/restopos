// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.tables', {
    url: '/tables',
    views: {
      'menuContent': {
        templateUrl: 'templates/tables.html',
        controller: 'TablesCtrl'
      }
    }
  })
  .state('app.welcomelogin', {
    url: '/welcomelogin/:tableid',
    views: {
      'menuContent': {
        templateUrl: 'templates/welcomelogin.html',
        controller: 'WelcomeLoginCtrl'
      }
    }
  })
  .state('app.homemenu', {
    url: '/homemenu/:tableid',
    views: {
      'menuContent': {
        templateUrl: 'templates/homemenu.html',
        controller: 'HomeMenuCtrl'
      }
    }
  })
  .state('app.menuitems', {
    url: '/menuitems/:tableid',
    views: {
      'menuContent': {
        templateUrl: 'templates/menuitems.html',
        controller: 'MenuItemsCtrl'
      }
    }
  })
  .state('app.confirmorder', {
    url: '/confirmorder',
    views: {
      'menuContent': {
        templateUrl: 'templates/confirmorder.html',
        controller: 'ConfirmOrderCtrl'
      }
    }
  })
  .state('app.mailreview', {
    url: '/mailreview',
    views: {
      'menuContent': {
        templateUrl: 'templates/mailreview.html',
        controller: 'MailReviewCtrl'
      }
    }
  })
  .state('app.kitchenorders', {
    url: '/kitchenorders',
    views: {
      'menuContent': {
        templateUrl: 'templates/kitchenorders.html',
        controller: 'KitchenOrdersCtrl'
      }
    }
  })
  .state('app.orders', {
    url: '/orders',
    views: {
      'menuContent': {
        templateUrl: 'templates/orders.html',
        controller: 'OrdersCtrl'
      }
    }
  })
  .state('app.tableorder', {
    url: '/orders/:tableid',
    views: {
      'menuContent': {
        templateUrl: 'templates/confirmorder.html',
        controller: 'ConfirmOrderCtrl'
      }
    }
  })
  .state('app.confirmpayment', {
    url: '/confirmpayment',
    views: {
      'menuContent': {
        templateUrl: 'templates/confirmpayment.html',
        controller: 'ConfirmPaymentCtrl'
      }
    }
  })
  .state('app.askreview', {
    url: '/askreview',
    views: {
      'menuContent': {
        templateUrl: 'templates/askreview.html',
        controller: 'AskReviewCtrl'
      }
    }
  })
  .state('app.dailydashboard', {
    url: '/dailydashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dailydashboard.html',
        controller: 'DailyDashboardCtrl'
      }
    }
  })
  .state('app.monthlydashboard', {
    url: '/monthlydashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/monthlydashboard.html',
        controller: 'MonthlyDashboardCtrl'
      }
    }
  })
  .state('app.tabledashboard', {
    url: '/tabledashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/tabledashboard.html',
        controller: 'TableDashboardCtrl'
      }
    }
  })
  .state('app.mostvaluedcustomers', {
    url: '/mostvaluedcustomers',
    views: {
      'menuContent': {
        templateUrl: 'templates/mostvaluedcustomers.html',
        controller: 'MostValuedCustomersCtrl'
      }
    }
  })
  .state('app.createcategory', {
    url: '/createcategory',
    views: {
      'menuContent': {
        templateUrl: 'templates/createcategory.html',
        controller: 'CreateCategoryCtrl'
      }
    }
  })
  .state('app.createmenuitem', {
    url: '/createmenuitem',
    views: {
      'menuContent': {
        templateUrl: 'templates/createmenuitem.html',
        controller: 'CreateMenuItemCtrl'
      }
    }
  })
  .state('app.manageemployees', {
    url: '/manageemployees',
    views: {
      'menuContent': {
        templateUrl: 'templates/manageemployees.html',
        controller: 'ManageEmployeesCtrl'
      }
    }
  })
  .state('app.manageattendancenpay', {
    url: '/manageattendancenpay',
    views: {
      'menuContent': {
        templateUrl: 'templates/manageattendancenpay.html',
        controller: 'ManageAttendancenPayCtrl'
      }
    }
  })
  .state('app.tableassignment', {
    url: '/tableassignment',
    views: {
      'menuContent': {
        templateUrl: 'templates/tableassignment.html',
        controller: 'TableAssignmentCtrl'
      }
    }
  })
  .state('app.inventorymgmt', {
    url: '/inventorymgmt',
    views: {
      'menuContent': {
        templateUrl: 'templates/inventorymgmt.html',
        controller: 'InventoryMgmtCtrl'
      }
    }
  })
  .state('app.couponcreation', {
    url: '/couponcreation',
    views: {
      'menuContent': {
        templateUrl: 'templates/couponcreation.html',
        controller: 'CouponCreationCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
