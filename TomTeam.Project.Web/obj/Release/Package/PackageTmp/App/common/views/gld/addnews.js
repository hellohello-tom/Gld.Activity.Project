(function () {
    appModule.controller('common.views.gld.addnews', [
        '$scope', '$uibModalInstance', 'abp.services.app.news', 'news',
        function ($scope, $uibModalInstance, newsService, news) {
            var vm = this;

            vm.saving = false;
            vm.news = news;

            vm.save = function () {
                vm.saving = true;
                newsService.addOrUpdate(vm.news).success(function () {
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