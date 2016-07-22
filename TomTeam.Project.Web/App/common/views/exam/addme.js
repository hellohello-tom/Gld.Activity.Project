(function () {
    appModule.controller('common.views.exam.addme', [
        '$scope', '$uibModalInstance', 'abp.services.app.metropolitan', 'me',
        function ($scope, $uibModalInstance, metropolitanService, me) {
            var vm = this;

            vm.saving = false;
            vm.me = me;

            vm.save = function () {
                vm.saving = true;
                metropolitanService.update(vm.me).success(function () {
                    abp.notify.info(app.localize('SavedSuccessfully'));
                    $uibModalInstance.close();
                }).finally(function () {
                    vm.saving = false;
                });
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }
    ]);
})();