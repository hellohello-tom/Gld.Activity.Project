(function () {
    appModule.controller('common.views.gld.palaceConfig', [
        '$scope', '$timeout', 'abp.services.app.activityConfig',
        function ($scope, $timeout, activityService) {
            var vm = this;

            vm.saving = false;
            vm.activity = {};

          


            vm.save = function () {
                vm.saving = true;
                activityService.addOrUpdate(vm.activity).success(function (json) {
                    abp.notify.info(app.localize('SavedSuccessfully'));
                }).finally(function () {
                    vm.saving = false;
                });
            };

            function init() {
                vm.loading = true;
                activityService.getConfig({
                    id: 0
                }).success(function (result) {
                    vm.activity = result;
                    if (result.id > 0) {
                    }

                }).finally(function () {
                    vm.loading = false;
                });
            }
            init();
        }
    ]);
})();