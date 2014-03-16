/**
 * Created by marc on 2/1/14.
 */
angular.module("iShareApp")
.directive("cstFocus",
	function(){
		return {
			restrict: "AE",
			link:   function (scope, element, attrs){
						element[0].focus();
					}
		};
	}
)
.directive("cstDate",
	function($parse){
		return {
			restrict: "AE",
			compile: function(element,attrs){
				var inputElem = "<input type='text'>"
				var newElem = $(inputElem);
				return function(scope,element,attrs){
					element.prop("disabled",true);
					var processChange = function(){
						var _date = new Date(element.datepicker('getDate'));
						var year = _date.getFullYear();
						var month = _date.getMonth()+1;
						var month = (month<10 ? 0 : '') + month;
						var date = _date.getDate();
						var newdate =   year + '/' + month + '/' + date;
						scope[attrs.id]=newdate;
					};
					$(element).datepicker({
						onClose: processChange,
						showOn: "both",
						buttonImageOnly: true,
						buttonImage: "images/calendar.gif",
						buttonImageOnly: true,
						dateFormat: attrs.format
					});
				}
			}
		}
}   )
.directive("cstUpload",["$itemController",
	function (){
		return {
			restrict: "AE",
			scope: false,
			link: function(scope,element,attrs){
				element[0].addEventListener("change",function(attrs){itemController.uploadFiles(attrs);});
			}
		}
	}]
)
.directive("path",
	function(){
		return {
			restrict: "E",
			link: function(scope,element,attrs){
				if(!Modernizr.inputtypes.date){
					$(element).append(location.hash.split('/').pop());
				}
			}
		}
	}
)
.directive("showFirst",
	function ($templateCache,$sce){
		return{
			restrict: 'A',
			scope: {item: '@item'},
			link: function(scope,element,attrs){
				scope.$watch('attrs.ngBind',
					function(newVal){
						var text = $(element).html();
						var popup = $templateCache.get('popup');
						var popupData = '';
						//truncate text
						$(element).html(text.length > attrs.showFirst? text.substring(0,attrs.showFirst - 3)+'...' : text);
						$(element).attr('title',text);
						// create popup
						popupData = popup.data.replace(/{{text}}/g,text).replace(/{{attrs.popupClass}}/g,attrs.popupClass);
						popup = $('<div>').html(popupData);
						$(popup).click(function(e){
							e.stopPropagation();
							$(popup).hide();
						});
						$(element).click(function(e){
							$(popup).css({
								top: e.pageY + 'px',
								left: e.pageX + 'px'
							});
							$(popup).show();
						});
						element.append($(popup).hide());
					}
				);
			}
		}
	}
)
.directive("uploadFile",["$parse",function($parse){
	return {
		restrict: 'A',
		link: function(scope,element,attrs){
			element.bind('change',function(){
				var file = element[0].files[0];
				scope.$apply(function(){
					var reader = new FileReader();
					reader.onloadend  = function(){
						scope.item.fileSrc = reader.result;
						scope.item.fileName = file.name;
						scope.item.fileType = file.type;
						scope.item.fileSize = file.size;
					}
					reader.readAsDataURL(file);
				});
			});
		}
	}
}])
.directive('email',function(){
	return{
		restrict: 'A',
		scope: {
			name: '@',
			mailto: '@'
		},
		link: function(scope,element,attrs){
			if(scope.mailto!=undefined && scope.mailto.length){
				var el = '<a href="mailto:' + scope.mailto + '">' + scope.name + '</a>';
			}
			else{
				var el = '<div>' + scope.name + '</div>';
			}
			element.html(el);
		}
	}
});