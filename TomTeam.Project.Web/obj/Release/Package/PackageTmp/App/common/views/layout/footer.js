(function () {
    appModule.controller('common.views.layout.footer', [
        '$rootScope', 'appSession',
        function ($scope, appSession) {
            var vm = this;

            $scope.$on('$includeContentLoaded', function () {
                Layout.initFooter(); // init footer
            });

            vm.getProductNameWithEdition = function() {
                var productName = 'TomTeam——团队全程打造';
                return productName;
            }
        }
    ]);
})();