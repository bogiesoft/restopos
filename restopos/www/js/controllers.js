angular.module('starter.controllers', ['chart.js'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  // $scope.$on('$ionicView.enter', function(e) {
  // });

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/review.html', {
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
})

.controller('HomeCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.tablerows = [
      [{
        "name":"Table 1",
        "class":"table",
        "id":"1"
      },
      {
        "name":"Table 2",
        "class":"table",
        "id":"2"
      },
      {
        "name":"Table 3",
        "class":"table",
        "id":"3"
      }],
      [{
        "name":"Table 4",
        "class":"table",
        "id":"4"
      },
      {
        "name":"Table 5",
        "class":"table",
        "id":"5"
      },
      {
        "name":"Table 6",
        "class":"table",
        "id":"6"
      }],
      [{
        "name":"Table 7",
        "class":"table",
        "id":"7"
      },
      {
        "name":"Table 8",
        "class":"table",
        "id":"8"
      },
      {
        "name":"Table 9",
        "class":"table",
        "id":"9"
      }]
    ];
    $($scope.tablerows).each(function(ind,val){
      $(val).each(function(i,v){
        if(Object.keys(localStorage).indexOf(v.name)!=-1){
          v.class = v.class+" active";
        }
      })
    })
    $scope.$apply();
  });  
})
.controller('TablesCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {    
  });
})
.controller('WelcomeLoginCtrl', function($scope, $stateParams, $location) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.details = {};
    $scope.tableid = 1;
    if($stateParams.tableid){
      $scope.tableid = $stateParams.tableid;
      $scope.tableData = JSON.parse(localStorage.getItem("Table "+$scope.tableid))
      if($scope.tableData && $scope.tableData.userData.name!=""){
        $location.path("/app/homemenu/"+$scope.tableid);
      }
    }    
    $scope.validate = function(){      
      if(!$scope.details.name || $scope.details.name==""){
        $("#name").addClass("required");
        return false;
      }
      if(!$scope.details.email || $scope.details.email==""){
        $("#email").addClass("required");
        return false;
      }
      if(!$scope.details.mobile || $scope.details.mobile==""){
        $("#mobile").addClass("required");
        return false;
      }
      return true;
    }
    $scope.openMenu = function(){
      if($scope.validate()){
        var data = {
          "userData":{
            "name":$scope.details.name,
            "email":$scope.details.email,
            "mobile":$scope.details.mobile
          },
          "isOccupied":true,
          "isOrderConfirmed":false,
          "isOrderComplete":false,
          "isBillRequested":false,
          "isPaymentDone":false,
          "isReviewSubmitted":false,
          "isTableLeft":false,
          "orderedItems":[]
        };
        if(!localStorage.getItem("Table "+$scope.tableid)){
          localStorage.setItem("Table "+$scope.tableid, angular.toJson(data));
        } 
        $location.path("/app/homemenu/"+$scope.tableid)
      }       
    }
  });
})
.controller('DineInCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
  });
})
.controller('HomeMenuCtrl', function($scope, $stateParams, $location) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.tableid = 1;
    $scope.tableData = {};
    $scope.history = false;
    $scope.historyavailable = false;
    $scope.epaper = false;
    $scope.reviews = false;

    $scope.menu = true;    
    
    if($stateParams.tableid){
      $scope.tableid = $stateParams.tableid;
      $scope.tableData = JSON.parse(localStorage.getItem("Table "+$scope.tableid))
      if($scope.tableData && $scope.tableData.userData.name!=""){
        $location.path("/app/homemenu/"+$scope.tableid);
      }
    }
    $scope.showMenu = function(){
      $scope.history = false;
      $scope.epaper = false;
      $scope.reviews = false;      
      $scope.menu = true;
    }
    $scope.showFoodMenu = function(){
      $location.path("/app/menuitems/"+$scope.tableid);         
    }
    $scope.showPaper = function(){
      $scope.menu = false;
      $scope.epaper = true;      
    }
    $scope.showReviews = function(){
      $scope.menu = false;
      $scope.reviews = true;
    }
    $scope.showHistory = function(){
      $scope.menu = false;
      $scope.history = true;
      if(localStorage.getItem($scope.tableData.userData.mobile)){
        $scope.historyavailable = true;
        $scope.historyData = JSON.parse(localStorage.getItem($scope.tableData.userData.mobile));
      }      
      else{
        $scope.historyavailable = false;
      }
    }
  });
})
.controller('MenuItemsCtrl', function($location, $rootScope, $scope, $stateParams, $ionicModal) {
  $scope.$on('$ionicView.enter', function(e) {
      $scope.tableid = $stateParams.tableid;
      $scope.cartItems = [];
      $scope.cartTotal = 0;
      $scope.billRequested = false;
      $scope.isOrderConfirmed = false;
      $scope.isOrderComplete = false;
      $scope.isReviewSubmitted = false;
      $scope.isPaymentDone = false;
      $scope.tableData = {};
      $scope.menuItems = {
        // https://www.zomato.com/bangalore/feast-sheraton-bangalore-hotel-at-brigade-gateway-malleshwaram/menu#tabtop
        "Salads":[
          {
            "name":"Mixed Garden Salad",
            "desc":"Selection of fresh seasonal garden greens garnished with cherry tomatoes and cucumber tossed in balsamic dressing",
            "type":"green",
            "isSelected":false,
            "isCompleted":false,
            "price":4.95
          },
          {
            "name":"Tomato and Mozarella Salad",
            "desc":"Mozarella cheese with fresh tomato, served with basil pesto, balsamic glace and crushed pepper",
            "type":"green",
            "isSelected":false,
            "isCompleted":false,
            "price":5.75
          },
          {
            "name":"International Cheese Platter",
            "desc":"A selection of five international cheese including brie, blue, goat and hard cheese. Served with baguette, butter and fruit mustard",
            "type":"green",
            "isSelected":false,
            "isCompleted":false,
            "price":8.75
          },
          {
            "name":"Smoked Salmon",
            "desc":"Traditional smoked salmon on focaccia bread with herb cream cheese and micro herbs",
            "type":"red",
            "isSelected":false,
            "isCompleted":false,
            "price":6.75
          },
          {
            "name":"The Chicken Caesar Salad",
            "desc":"Fresh Romaine lettuce tossed in caesar dressing, roasted in garlic croutons, anchovies, shaved parmesan and pan fried stripes of chicken breast",
            "type":"red",
            "isSelected":false,
            "isCompleted":false,
            "price":5.25
          }
        ],
        "Soups":[
          {
            "name":"Tomato Cream Soup",
            "desc":"with garlic croutons and basil pesto",
            "type":"green",
            "isSelected":false,
            "isCompleted":false,
            "price":3.45
          },
          {
            "name":"Mushroom Soup",
            "desc":"Creamy soup of mushrooms with aged balsamic vinegar",
            "type":"green",
            "isSelected":false,
            "isCompleted":false,
            "price":3.45
          },
          {
            "name":"Minestrone Soup",
            "desc":"Home style vegetable soup in light tomato broth",
            "type":"green",
            "isSelected":false,
            "isCompleted":false,
            "price":3.45
          },
          {
            "name":"Chicken Noodle Soup",
            "desc":"Tender boiled chicken in light broth with noodles and garden vegetables",
            "type":"green",
            "isSelected":false,
            "isCompleted":false,
            "price":3.95
          }
        ],
        "Pizzas":[
          {
            "name":"Pizza and Pasta",
            "desc":"Margherita Pizza",
            "type":"green",
            "isSelected":false,
            "isCompleted":false,
            "price":4.95
          },
          {
            "name":"Mushroom Pasta",
            "desc":"Wild and gathered mushrooms, mozarella cheese and fresh herbs",
            "type":"green",
            "isSelected":false,
            "isCompleted":false,
            "price":5.85
          },
          {
            "name":"Roasted Capsicum Pizza",
            "desc":"Trio of roasted capsicum, tomato sauce and mozarella cheese",
            "type":"green",
            "isSelected":false,
            "isCompleted":false,
            "price":5.85
          },
          {
            "name":"Tandoori Chicken Pizza",
            "desc":"Chunky pieces of tandoori chicken with spicy tomato sauce",
            "type":"red",
            "isSelected":false,
            "isCompleted":false,
            "price":6.45
          },
          {
            "name":"Pepperoni Pizza",
            "desc":"Spicy pepperoni salami, jalapenos, tomato and mozarella cheese",
            "type":"red",
            "isSelected":false,
            "isCompleted":false,
            "price":6.75
          },
          {
            "name":"Salami Pizza",
            "desc":"Thinly sliced salami, tomato sauce and mozarella cheese",
            "type":"red",
            "isSelected":false,
            "isCompleted":false,
            "price":7.25
          }
        ],
        "Main Course":[
          {
            "name":"Murgh Biryani",
            "desc":"Basmati rice cooked with exotic spices and chicken",
            "type":"red",
            "isSelected":false,
            "isCompleted":false,
            "price":7.75
          },
          {
            "name":"Gosht Biryani",
            "desc":"Marinated lamb, basmati rice cooked with saffron, yogurt, mint and aromatic spices",
            "type":"red",
            "isSelected":false,
            "isCompleted":false,
            "price":7.75
          },
          {
            "name":"Prawn Masala Biryani",
            "desc":"Basmati rice cooked with masala prawns, fried onions, saffron and mint",
            "type":"red",
            "isSelected":false,
            "isCompleted":false,
            "price":8.75
          },
          {
            "name":"Sabz Dum Biryani",
            "desc":"Basmati rice cooked with herbs, aromatic spices and seasonal vegetables",
            "type":"green",
            "isSelected":false,
            "isCompleted":false,
            "price":6.95
          },
          {
            "name":"Kichidi",
            "desc":"Lentil and rice porridge cooked with spices",
            "type":"green",
            "isSelected":false,
            "isCompleted":false,
            "price":2.95
          }
        ],
        "Desserts":[
          {
            "name":"Seasonal Fruit Platter",
            "desc":"Freshly cut seasonal fruits",
            "type":"green",
            "isSelected":false,
            "isCompleted":false,
            "price":2.75
          },
          {
            "name":"Pistachio Phirnee",
            "desc":"Rice pudding with silvered pistachios",
            "type":"green",
            "isSelected":false,
            "isCompleted":false,
            "price":2.75
          },
          {
            "name":"Rasmalai",
            "desc":"Cottage cheese dumplings served in saffron infused milk reduction, garnished with pistachio",
            "type":"green",
            "isSelected":false,
            "isCompleted":false,
            "price":2.75
          },
          {
            "name":"Vanilla Panna Cotta",
            "desc":"Cooked cream, flavored with fresh vanilla and served with fruit compote",
            "type":"red",
            "isSelected":false,
            "isCompleted":false,
            "price":3.25
          },
          {
            "name":"Duet of chocolate",
            "desc":"Dark and white chocolate terrine with brandy mousse, garnished with raspberry sauce and orange compote",
            "type":"red",
            "isSelected":false,
            "isCompleted":false,
            "price":3.45
          }
        ],
      }
      $scope.showMenuItems = [];
      if(localStorage.getItem("Table "+$stateParams.tableid) && JSON.parse(localStorage.getItem("Table "+$stateParams.tableid)).orderedItems && JSON.parse(localStorage.getItem("Table "+$stateParams.tableid)).orderedItems.length>0){
          $scope.tableData = JSON.parse(localStorage.getItem("Table "+$stateParams.tableid));
          $scope.cartItems = $scope.tableData.orderedItems;          
          $($scope.cartItems).each(function(i,v){
            $scope.cartTotal+=v.price            
          })
          $scope.isOrderComplete = $scope.tableData.isOrderComplete;
          $scope.isBillRequested = $scope.tableData.isBillRequested;
          $scope.isOrderConfirmed = $scope.tableData.isOrderConfirmed;
          $scope.isReviewSubmitted = $scope.tableData.isReviewSubmitted;
          $scope.isPaymentDone = $scope.tableData.isPaymentDone;
      }
    // else{      
      $scope.selectedCategory = "";
      // $scope.showMenuItems = $scope.menuItems[$scope.selectedCategory];
      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/review.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $ionicModal.fromTemplateUrl('templates/email.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.emailmodal = modal;
      });

      // Triggered in the login modal to close it
      $scope.closeLogin = function() {
        $scope.modal.hide();
      };

      // Open the login modal
      $scope.login = function() {
        $scope.modal.show();
      };

      $scope.showEmailBill = function(){
        $scope.emailmodal.show();
      }
      $scope.sendEmail = function(){        
        $scope.emailmodal.hide(); 
      }
      $scope.submitReview = function(){
        $scope.isReviewSubmitted = true;
        $scope.tableData.isReviewSubmitted = true;
        localStorage.setItem("Table "+$scope.tableid, angular.toJson($scope.tableData));
        $scope.emailmodal.hide();
      }
      $scope.exitTable = function(){
        $scope.isTableLeft = true;
        $scope.tableData.isTableLeft = true;
        $scope.tableData.date = new Date();
        $scope.tableData.table = "Table "+$scope.tableid;
        if(localStorage.getItem($scope.tableData.userData.mobile)){
          var data = JSON.parse(localStorage.getItem($scope.tableData.userData.mobile));
          data.push($scope.tableData);
          localStorage.setItem($scope.tableData.userData.mobile, angular.toJson(data));
        }
        else{
          var data = [];
          data.push($scope.tableData);
          localStorage.setItem($scope.tableData.userData.mobile, angular.toJson(data));
        }
        if(localStorage.getItem("Table "+$scope.tableid)){
          localStorage.removeItem("Table "+$scope.tableid);        
        }
        $location.path("/app/home");
      }
      $scope.requestBill = function(){
        var x = JSON.parse(localStorage.getItem("Table "+$scope.tableid));
        x.isBillRequested = true;
        $scope.isBillRequested = true;
        localStorage.setItem("Table "+$scope.tableid, angular.toJson(x));
      }      
      $scope.showMenu = function(categoryName, $event){
        $scope.selectedCategory = categoryName;
        $scope.showMenuItems = $scope.menuItems[$scope.selectedCategory];
        if($scope.cartItems.length>0){
          $($scope.showMenuItems).each(function(i,v){
            $($scope.cartItems).each(function(index, value){
              if(value.name==v.name){
                v.isSelected=true;
              }
            })
          })
        }
        $(".categories").removeClass("active");
        $($event.target).addClass("active")      
      }
      $scope.addMenuItem = function(menuItem){
        $scope.showMenuItems[$scope.showMenuItems.indexOf(menuItem)].isSelected = true;
        $scope.cartItems.push(menuItem);
        $scope.cartTotal+=menuItem.price;        
      }
      $scope.removeMenuItem = function(menuItem){
        $($scope.showMenuItems).each(function(i,v){
          if(v.name==menuItem.name){
            v.isSelected=false;
          }
        })
        $scope.cartTotal-=menuItem.price;
        var index = $scope.cartItems.indexOf(menuItem);
        $scope.cartItems.splice(index, 1);
      }
      $scope.confirmOrder = function(){
        $scope.message = "You have ordered "+$scope.cartItems.length+" items, which are ";
        $($scope.cartItems).each(function(i,v){
          $scope.message += v.name+", ";
        })
        var confirm = window.confirm($scope.message);      
        if(confirm){
          var x = JSON.parse(localStorage.getItem("Table "+$scope.tableid));
          x.orderedItems = $scope.cartItems;
          $scope.isOrderConfirmed = true;
          x.isOrderConfirmed = $scope.isOrderConfirmed;
          localStorage.setItem("Table "+$scope.tableid, angular.toJson(x))
        }
      }
      $scope.categories = Object.keys($scope.menuItems);       
    // }    
  });  
})
.controller('ConfirmOrderCtrl', function($rootScope, $scope, $stateParams, $location) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.table = "Table "+$stateParams.tableid;
    $scope.orderedItems = [];
    $scope.cartTotal = 0;
    if(localStorage.getItem($scope.table)){
      $scope.orderedItems = JSON.parse(localStorage.getItem($scope.table)).orderedItems;
      $($scope.orderedItems).each(function(i,v){
        $scope.cartTotal+=v.price;
      })
    }        
    $scope.confirmPayment = function(){
      var x = JSON.parse(localStorage.getItem($scope.table));
      x.isPaymentDone = true;
      x.paidAmount = $scope.cartTotal;
      localStorage.setItem($scope.table, angular.toJson(x));
      $location.path("/app/orders")
    }   
  });
})
.controller('MailReviewCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
  });
})
.controller('KitchenOrdersCtrl', function($rootScope, $scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
    var list = Object.keys(localStorage);
    $scope.orderedItems = {};
    $(list).each(function(i,v){
      if(v.indexOf("Table ")!=-1){
        $scope.orderedItems[v] = JSON.parse(localStorage.getItem(v)).orderedItems;
      }
    })
    $scope.tables = [];
    $scope.tables = Object.keys($scope.orderedItems);

    $scope.completeItem = function(menuItem, table){
      $scope.orderedItems[table][$scope.orderedItems[table].indexOf(menuItem)].isCompleted = true
      var x = JSON.parse(localStorage.getItem(table));
      x.orderedItems = $scope.orderedItems[table];
      localStorage.setItem(table, angular.toJson(x));

      var count = 0;
      $($scope.orderedItems[table]).each(function(i,v){
        if(v.isCompleted==true){
          count++
        }
      })
      if(count==$scope.orderedItems[table].length){
        var y = JSON.parse(localStorage.getItem(table));
        y.isOrderComplete = true;
        localStorage.setItem(table, angular.toJson(y))
        delete $scope.orderedItems[table];
      }      
    }   
  });
})
.controller('OrdersCtrl', function($location, $scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
  });
})
.controller('ConfirmPaymentCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
  });
})
.controller('AskReviewCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
  });
})
.controller('DailyDashboardCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
  });
})
.controller('MonthlyDashboardCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.graph = {};
    $scope.graph.data = [
      [16, 15, 20, 12, 16, 12, 8],
      [8, 9, 4, 12, 8, 12, 14],
      [18, 25, 23, 22, 36, 1, 4]
    ];
    $scope.graph.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    $scope.graph.series = ['Chicken Salad', 'Mushroom Pasta', 'Murgh Biryani'];

    $scope.showMenu = function(categoryName, $event){
      $(".categories").removeClass("active");
      $($event.target).addClass("active")      
    }
  });
})
.controller('TableDashboardCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
  });
})
.controller('MostValuedCustomersCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
  });
})
.controller('CreateCategoryCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
  });
})
// .controller('CreateMenuItemCtrl', function($scope, $stateParams) {
//   $scope.$on('$ionicView.enter', function(e) {
//   });
// })
.controller('ManageEmployeesCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
  });
})
.controller('ManageAttendancenPayCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
  });
})
.controller('CreateMenuItemCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.categories = [
      "Create Menu Item",
      "Manage Employees",
      "Table Assignment",
      "Waiters Attendance/Payroll",
      "Inventory Management",
      "Predictive Analytics",
      "Send Email",
      "Valuable Customers"
    ];
    $scope.show = {
      "Create Menu Item": true,
      "Manage Employees": false,
      "Table Assignment": false,
      "Waiters Attendance/Payroll": false,
      "Inventory Management": false,
      "Predictive Analytics": false,
      "Send Email": false,
      "Valuable Customers": false
    }    
    $scope.showMenu = function(categoryName, $event){
      $.each( $scope.show, function( key, value ) {
        $scope.show[key] = false;
      });
      $scope.show[categoryName] = true;
      $(".categories").removeClass("active");
      $($event.target).addClass("active")      
    }
    $('#modChart').on('shown.bs.modal',function(event){
        var link = $(event.relatedTarget);
        // get data source
        var source = link.attr('data-source').split(',');
        // get title
        var title = link.html();
        // get labels
        var table = link.parents('table');
        var labels = [];
        $('#'+table.attr('id')+'>thead>tr>th').each(function(index,value){
            // without first column
            if(index>0){labels.push($(value).html());}
        });
        // get target source
        var target = [];
        $.each(labels, function(index,value){
            target.push(link.attr('data-target-source'));
        });
        // Chart initialisieren
        var modal = $(this);
        var canvas = modal.find('.modal-body canvas');
        modal.find('.modal-title').html(title);
        var ctx = canvas[0].getContext("2d");
        var chart = new Chart(ctx).Line({        
            responsive: true,
            labels: labels,
            datasets: [{
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: source
            },{
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "#F7464A",
                pointColor: "#FF5A5E",
                pointStrokeColor: "#FF5A5E",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "red",
                data: target
            }]
        },{});
    }).on('hidden.bs.modal',function(event){
        // reset canvas size
        var modal = $(this);
        var canvas = modal.find('.modal-body canvas');
        canvas.attr('width','568px').attr('height','300px');
        // destroy modal
        $(this).data('bs.modal', null);
    });  
  });  
})
.controller('TableAssignmentCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
  });
})
.controller('InventoryMgmtCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
  });
})
.controller('CouponCreationCtrl', function($scope, $stateParams) {
  $scope.$on('$ionicView.enter', function(e) {
  });
});

// http://codepen.io/ionic/pen/JsHjf - Delete items
// http://codepen.io/bencorywright/full/Ikrny/ - Splitview
// http://codepen.io/ionic/pen/cDbFg - Splitview




//Manually imported the angular-chart.js library because no CDN hosted it.
!function(t){"use strict";"function"==typeof define&&define.amd?define(["angular","chart.js"],t):"object"==typeof exports?module.exports=t(require("angular"),require("chart.js")):t(angular,Chart)}(function(t,e){"use strict";function n(){var n={},r={Chart:e,getOptions:function(e){var r=e&&n[e]||{};return t.extend({},n,r)}};this.setOptions=function(e,r){return r?(n[e]=t.extend(n[e]||{},r),void 0):(r=e,n=t.extend(n,r),void 0)},this.$get=function(){return r}}function r(n){function r(t,e){return t&&e&&t.length&&e.length?Array.isArray(t[0])?t.length===e.length&&t[0].length===e[0].length:e.reduce(a,0)>0?t.length===e.length:!1:!1}function a(t,e){return t+e}function o(e,r,a){if(r.data&&r.data.length){r.getColour="function"==typeof r.getColour?r.getColour:l,r.colours=c(e,r);var o=a[0],u=o.getContext("2d"),s=Array.isArray(r.data[0])?g(r.labels,r.data,r.series||[],r.colours):p(r.labels,r.data,r.colours),f=t.extend({},n.getOptions(e),r.options),h=new n.Chart(u)[e](s,f);return r.$emit("create",h),["hover","click"].forEach(function(t){r[t]&&(o["click"===t?"onclick":"onmousemove"]=i(r,h,t))}),r.legend&&"false"!==r.legend&&v(a,h),h}}function i(t,e,n){return function(r){var a=e.getPointsAtEvent||e.getBarsAtEvent||e.getSegmentsAtEvent;if(a){var o=a.call(e,r);t[n](o,r),t.$apply()}}}function c(r,a){for(var o=t.copy(a.colours||n.getOptions(r).colours||e.defaults.global.colours);o.length<a.data.length;)o.push(a.getColour());return o.map(u)}function u(t){return"object"==typeof t&&null!==t?t:"string"==typeof t&&"#"===t[0]?s(d(t.substr(1))):l()}function l(){var t=[f(0,255),f(0,255),f(0,255)];return s(t)}function s(t){return{fillColor:h(t,.2),strokeColor:h(t,1),pointColor:h(t,1),pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:h(t,.8)}}function f(t,e){return Math.floor(Math.random()*(e-t+1))+t}function h(t,e){return"rgba("+t.concat(e).join(",")+")"}function d(t){var e=parseInt(t,16),n=e>>16&255,r=e>>8&255,a=255&e;return[n,r,a]}function g(e,n,r,a){return{labels:e,datasets:n.map(function(e,n){var o=t.copy(a[n]);return o.label=r[n],o.data=e,o})}}function p(t,e,n){return t.map(function(t,r){return{label:t,value:e[r],color:n[r].strokeColor,highlight:n[r].pointHighlightStroke}})}function v(t,e){var n=t.parent(),r=n.find("chart-legend"),a="<chart-legend>"+e.generateLegend()+"</chart-legend>";r.length?r.replaceWith(a):n.append(a)}function y(t,e,n){Array.isArray(n.data[0])?t.datasets.forEach(function(t,n){(t.points||t.bars).forEach(function(t,r){t.value=e[n][r]})}):t.segments.forEach(function(t,n){t.value=e[n]}),t.update(),n.$emit("update",t)}function C(t){return!t||Array.isArray(t)&&!t.length||"object"==typeof t&&!Object.keys(t).length}return function(e){return{restrict:"CA",scope:{data:"=",labels:"=",options:"=",series:"=",colours:"=?",getColour:"=?",chartType:"=",legend:"@",click:"=",hover:"="},link:function(n,a){function i(r,i){if(!C(r)&&!t.equals(r,i)){var u=e||n.chartType;u&&(c&&c.destroy(),c=o(u,n,a))}}var c,u=document.createElement("div");u.className="chart-container",a.replaceWith(u),u.appendChild(a[0]),"object"==typeof window.G_vmlCanvasManager&&null!==window.G_vmlCanvasManager&&"function"==typeof window.G_vmlCanvasManager.initElement&&window.G_vmlCanvasManager.initElement(a[0]),n.$watch("data",function(t,i){if(t&&t.length&&(!Array.isArray(t[0])||t[0].length)){var u=e||n.chartType;if(u){if(c){if(r(t,i))return y(c,t,n);c.destroy()}c=o(u,n,a)}}},!0),n.$watch("series",i,!0),n.$watch("labels",i,!0),n.$watch("options",i,!0),n.$watch("colours",i,!0),n.$watch("chartType",function(e,r){C(e)||t.equals(e,r)||(c&&c.destroy(),c=o(e,n,a))}),n.$on("$destroy",function(){c&&c.destroy()})}}}}e.defaults.global.responsive=!0,e.defaults.global.multiTooltipTemplate="<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>",e.defaults.global.colours=["#97BBCD","#DCDCDC","#F7464A","#46BFBD","#FDB45C","#949FB1","#4D5360"],t.module("chart.js",[]).provider("ChartJs",n).factory("ChartJsFactory",["ChartJs",r]).directive("chartBase",["ChartJsFactory",function(t){return new t}]).directive("chartLine",["ChartJsFactory",function(t){return new t("Line")}]).directive("chartBar",["ChartJsFactory",function(t){return new t("Bar")}]).directive("chartRadar",["ChartJsFactory",function(t){return new t("Radar")}]).directive("chartDoughnut",["ChartJsFactory",function(t){return new t("Doughnut")}]).directive("chartPie",["ChartJsFactory",function(t){return new t("Pie")}]).directive("chartPolarArea",["ChartJsFactory",function(t){return new t("PolarArea")}])});