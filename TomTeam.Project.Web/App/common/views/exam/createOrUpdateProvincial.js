(function () {
    appModule.controller('common.views.exam.createOrUpdateProvincial', [
        '$scope', '$timeout', '$uibModalInstance', 'abp.services.app.provincialExam', 'provincialId',
        function ($scope, $timeout, $uibModalInstance, provincialService, provincialId) {
            var vm = this;

            vm.saving = false;
            vm.provincial = {
                answers: []
            };

     


            vm.save = function () {
                vm.saving = true;
            
                provincialService.addOrUpdate(vm.provincial).success(function (json) {
                    abp.notify.info(app.localize('SavedSuccessfully'));
                    $uibModalInstance.close();
                }).finally(function () {
                    vm.saving = false;
                });
            };

            vm.addOptions = function () {
                vm.provincial.answers.push({
                    options: "A",
                    content: "答案内容",
                    isTrueAnswer: false
                })
            }

            vm.delOptions = function (index) {
                vm.provincial.answers.splice(index, 1);
            }

            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };

            function init() {
                vm.loading = true;
                provincialService.getExam({
                    id: provincialId
                }).success(function (result) {
                    vm.provincial = result;
                }).finally(function () {
                    vm.loading = false;
                });
            }
            init();
        }
    ]);
})();