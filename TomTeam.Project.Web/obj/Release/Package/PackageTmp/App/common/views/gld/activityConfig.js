(function () {
    appModule.controller('common.views.gld.activityConfig', [
        '$scope','$timeout', 'abp.services.app.activityConfig',
        function ($scope, $timeout, activityService) {
            var vm = this;

            vm.saving = false;
            vm.activity = {};

            var locale = {
                "format": 'YYYY-MM-DD h:mm:ss',
                "separator": " 至 ",
                "applyLabel": "确定",
                "cancelLabel": "取消",
                "fromLabel": "起始时间",
                "toLabel": "结束时间'",
                "customRangeLabel": "自定义",
                "weekLabel": "W",
                "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
                "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                "firstDay": 1
            };

            var todayStartAsString = moment().format('YYYY-MM-DD 00:00:00');
            var todayEndAsString = moment().format('YYYY-MM-DD 23:59:59.999');
            vm.provincial_dateRangeOptions = {
                locale: locale,
                timePicker: true,
                timePicker12Hour: false
            };
            vm.metropolitan_dateRangeOptions = {
                locale: locale,
                timePicker: true,
                timePicker12Hour: false
            };
            vm.palace_dateRangeOptions = {
                locale: locale,
                timePicker: true,
                timePicker12Hour: false
            };
            vm.provincial_dateRangeModel = {
                startDate: vm.activity.provincialStartTime,
                endDate: vm.activity.provincialEndTime
            };

            vm.metropolitan_dateRangeModel = {
                startDate: vm.activity.metropolitanStartTime,
                endDate: vm.activity.metropolitanEndTime
            };

            vm.palace_dateRangeModel = {
                startDate: vm.activity.palaceStartTime,
                endDate: vm.activity.palaceEndTime
            };


            vm.save = function () {
                vm.saving = true;
                vm.activity.provincialStartTime = vm.provincial_dateRangeModel.startDate;
                vm.activity.provincialEndTime = vm.provincial_dateRangeModel.endDate;
                vm.activity.metropolitanStartTime = vm.metropolitan_dateRangeModel.startDate;
                vm.activity.metropolitanEndTime = vm.metropolitan_dateRangeModel.endDate;
                vm.activity.palaceStartTime = vm.palace_dateRangeModel.startDate;
                vm.activity.palaceEndTime = vm.palace_dateRangeModel.endDate;
                activityService.addOrUpdate(vm.activity).success(function (json) {
                    vm.activity.id = json;
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
                        $timeout(function () {
                            vm.provincial_dateRangeModel.startDate=vm.activity.provincialStartTime;
                            vm.provincial_dateRangeModel.endDate = vm.activity.provincialEndTime;
                            var dateprovincial_daterangepicker = $('#dateprovincial').data('daterangepicker');
                            dateprovincial_daterangepicker.setStartDate(vm.activity.provincialStartTime);
                            dateprovincial_daterangepicker.setEndDate(vm.activity.provincialEndTime);
                            $('#dateprovincial').val(dateprovincial_daterangepicker.startDate.format('YYYY-MM-DD h:mm:ss') + ' 至 ' + dateprovincial_daterangepicker.endDate.format('YYYY-MM-DD h:mm:ss'));
                            var datemetropolitan_daterangepicker = $('#datemetropolitan').data('daterangepicker');
                            datemetropolitan_daterangepicker.setStartDate(vm.activity.metropolitanStartTime);
                            datemetropolitan_daterangepicker.setEndDate(vm.activity.metropolitanEndTime);
                            vm.metropolitan_dateRangeModel.startDate = vm.activity.metropolitanStartTime;
                            vm.metropolitan_dateRangeModel.endDate = vm.activity.metropolitanEndTime;
                            $('#datemetropolitan').val(datemetropolitan_daterangepicker.startDate.format('YYYY-MM-DD h:mm:ss') + ' 至 ' + datemetropolitan_daterangepicker.endDate.format('YYYY-MM-DD h:mm:ss'));
                            var datepalace_daterangepicker = $('#datepalace').data('daterangepicker')
                            datepalace_daterangepicker.setStartDate(vm.activity.palaceStartTime);
                            datepalace_daterangepicker.setEndDate(vm.activity.palaceEndTime);
                            vm.palace_dateRangeModel.startDate = vm.activity.palaceStartTime;
                            vm.palace_dateRangeModel.endDate = vm.activity.palaceEndTime;
                            $('#datepalace').val(datepalace_daterangepicker.startDate.format('YYYY-MM-DD h:mm:ss') + ' 至 ' + datepalace_daterangepicker.endDate.format('YYYY-MM-DD h:mm:ss'));
                        });
                    }
                    
                }).finally(function () {
                    vm.loading = false;
                });
            }
            init();
        }
    ]);
})();