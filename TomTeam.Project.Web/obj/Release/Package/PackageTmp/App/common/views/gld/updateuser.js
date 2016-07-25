(function () {
    appModule.controller('common.views.gld.updateuser', [
        '$scope', '$uibModalInstance', 'abp.services.app.userInfo', 'userId',
        function ($scope, $uibModalInstance, userInfoService, userId) {
            var vm = this;
            
            vm.saving = false;
            vm.user = null;

            vm.save = function () {


                vm.saving = true;
                userInfoService.updateUserInfo(vm.user).success(function () {
                    abp.notify.info(app.localize('SavedSuccessfully'));
                    $uibModalInstance.close();
                }).finally(function () {
                    vm.saving = false;
                });
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };

            function init() {
                userInfoService.getUserInfo({
                    id: userId
                }).success(function (result) {
                    vm.user = result;
                });
            }
            init();
        }
    ]);
})();