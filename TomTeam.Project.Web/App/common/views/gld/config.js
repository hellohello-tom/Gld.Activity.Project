(function () {
    appModule.controller('common.views.gld.config', [
        '$scope', 'abp.services.app.webConfig',
        function ($scope, webconfigService) {
            var vm = this;

            vm.saving = false;
            vm.webconfig = {};

            vm.save = function () {
                vm.saving = true;
                webconfigService.addOrUpdate(vm.webconfig).success(function (result) {
                    vm.webconfig.id = result;
                    abp.notify.info(app.localize('SavedSuccessfully'));
                }).finally(function () {
                    vm.saving = false;
                });
            };



            function init() {
                vm.loading = true;
                webconfigService.getConfig({
                    id: 0
                }).success(function (result) {
                    vm.webconfig = result;
                    KindEditor.html("#activityInfo", vm.webconfig.activityInfo)
                }).finally(function () {
                    vm.loading = false;
                });
            }
            init();
        }
    ]);
})();