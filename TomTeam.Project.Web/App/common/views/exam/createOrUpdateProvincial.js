(function () {
    appModule.controller('common.views.exam.provincial', [
        '$scope', '$timeout', 'abp.services.app.provincialExam',
        function ($scope, $timeout, provincialService) {
            var vm = this;

            vm.saving = false;
            vm.provincial = {};

     


            vm.save = function () {
                vm.saving = true;
            
                provincialService.addOrUpdate(vm.provincial).success(function (json) {
                    vm.provincial.examTopic.id = json;
                    abp.notify.info(app.localize('SavedSuccessfully'));
                }).finally(function () {
                    vm.saving = false;
                });
            };

            vm.addOptions = function () {
                //vm.
            }

            function init() {
                vm.loading = true;
                provincialService.getExam({
                    id: 0
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