var app = angular.module('otp', []);

app.directive('countdown', ['$interval', function ($interval) {
  return {
    scope: {
      timer: '=duration',
      callback: '&timeoutCallback'
    },
    restrict: 'E',
    template: '<span>{{minutes}}:{{seconds}}</span>',
    link: function (scope, element, attrs){

      scope.ipromise = $interval(function() {
        var minutes, seconds;
        minutes = parseInt(scope.timer / 60, 10)
        seconds = parseInt(scope.timer % 60, 10);
        scope.minutes = minutes < 10 ? "0" + minutes : minutes;
        scope.seconds = seconds < 10 ? "0" + seconds : seconds;
        if(scope.timer > 0){
             scope.timer--;   
        }else{
          scope.callback();
          $interval.cancel(scope.ipromise);
        }
      }, 1000);
    }
  };
}]);

app.controller('otpCtrl', ['$scope', function($scope) {
    
    $scope.status = 'countdown started ';
    $scope.verifyCodeOtp = '';
    
    
   
    $scope.myFunc = ( myvalue) => {
        var myEl = document.getElementById("otp-number");
        var num1 = document.getElementById("otp-number-input-1");
        var num2 = document.getElementById("otp-number-input-2");
        var num3 = document.getElementById("otp-number-input-3");
        var num4 = document.getElementById("otp-number-input-4");
        
        myEl.value = parseInt(num1.value + num2.value + num3.value + num4.value);
      
        if(num1.value.length === 1){
            num1.classList.add("verif-b-orange"); 
        }else{
           num1.classList.remove("verif-b-orange");
        }
      
        if(num2.value.length === 1){
            num2.classList.add("verif-b-orange"); 
        }else{
           num2.classList.remove("verif-b-orange");
        }
      
        if(num3.value.length === 1){
            num3.classList.add("verif-b-orange"); 
        }else{
           num3.classList.remove("verif-b-orange");
        }
      
        if(num4.value.length === 1){
           num4.classList.add("verif-b-orange"); 
        }else{
           num4.classList.remove("verif-b-orange");
        }
      
        
        var container = document.getElementsByClassName("input-code")[0];
        container.onkeyup = function(e) {
          var target = e.target;
    
          var maxLength = parseInt(target.attributes["maxlength"].value, 10);
          var myLength = target.value.length;
      
          if (myLength >= maxLength) {
            var next = target;
            while (next = next.nextElementSibling) {
                if (next == null)
                  break;
                if (next.tagName.toLowerCase() == "input") {
                  next.focus();
                  break;
                }
            }
        }else if(myLength < maxLength){
            var prev = target;
            while(prev = prev.previousElementSibling){
              if(prev == null)
                break
              
              if(prev.tagName.toLowerCase() == "input"){
                prev.focus();
                break;
              }
            }
        }
      }
    };
  
   
    
}]);

app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});