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





$(document).ready(function(){
      var $pc = $('#progressController');
      var $pCaption = $('.progress-bar p');
      var iProgress = document.getElementById('inactiveProgress');
      var aProgress = document.getElementById('activeProgress');
      var iProgressCTX = iProgress.getContext('2d');

      
      drawInactive(iProgressCTX);
      
      $pc.on('change', function(){
        var percentage = $(this).val() / 100;
        drawProgress(aProgress, percentage, $pCaption);
      });

      function drawInactive(iProgressCTX){
        iProgressCTX.lineCap = 'square';

        //outer ring
        iProgressCTX.beginPath();
        iProgressCTX.lineWidth = 15;
        iProgressCTX.strokeStyle = '#e1e1e1';
        iProgressCTX.arc(137.5,137.5,129,0,2*Math.PI);
        iProgressCTX.stroke();

        //progress bar
        iProgressCTX.beginPath();
        iProgressCTX.lineWidth = 0;
        iProgressCTX.fillStyle = '#e6e6e6';
        iProgressCTX.arc(137.5,137.5,121,0,2*Math.PI);
        iProgressCTX.fill();

        //progressbar caption
        iProgressCTX.beginPath();
        iProgressCTX.lineWidth = 0;
        iProgressCTX.fillStyle = '#fff';
        iProgressCTX.arc(137.5,137.5,100,0,2*Math.PI);
        iProgressCTX.fill();

      }
      function drawProgress(bar, percentage, $pCaption){
        var barCTX = bar.getContext("2d");
        var quarterTurn = Math.PI / 2;
        var endingAngle = ((2*percentage) * Math.PI) - quarterTurn;
        var startingAngle = 0 - quarterTurn;

        bar.width = bar.width;
        barCTX.lineCap = 'square';

        barCTX.beginPath();
        barCTX.lineWidth = 20;
        barCTX.strokeStyle = '#00B4FF';
        barCTX.arc(137.5,137.5,111,startingAngle, endingAngle);
        barCTX.stroke();

        $pCaption.text( (parseInt(percentage * 100, 10)) + '%');
      }

        var percentage = $pc.val() / 100;
        drawProgress(aProgress, percentage, $pCaption);

      
    });