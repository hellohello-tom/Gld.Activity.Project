(function () {
    appModule.directive('timezoneCombo', ['abp.services.app.timing',
        function (timingService) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/App/common/directives/timezoneCombo.cshtml',
                scope: {
                    defaultTimezoneScope: '=',
                    selectedTimezone: '=?'
                },
                link: function ($scope, element, attrs) {
                    $scope.timeZones = [];

                    $(element).addClass('edited');

                    timingService.getTimezones({
                        defaultTimezoneScope: $scope.defaultTimezoneScope
                    }).success(function (result) {
                        $scope.timeZones = result.items;
                    });
                }
            };
        }
    ]);
})();