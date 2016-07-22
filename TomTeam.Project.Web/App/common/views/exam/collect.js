(function () {

    appModule.controller('common.views.exam.collect', [
        '$scope', '$uibModal', '$stateParams', 'uiGridConstants', 'abp.services.app.examCollect',
        function ($scope, $uibModal, $stateParams, uiGridConstants, examCollectService) {
            var vm = this;

            vm.loading = false;
            vm.filterText = $stateParams.filterText || '';

            var requestParams = {
                skipCount: 0,
                maxResultCount: app.consts.grid.defaultPageSize,
                sorting: null
            };

            vm.userGridOptions = {
                enableHorizontalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
                enableVerticalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
                paginationPageSizes: app.consts.grid.defaultPageSizes,
                paginationPageSize: app.consts.grid.defaultPageSize,
                useExternalPagination: true,
                useExternalSorting: true,
                appScopeProvider: vm,
                columnDefs: [
                    {
                        name: app.localize('Actions'),
                        enableSorting: false,
                        width: 120,
                        cellTemplate:
                            '<div class=\"ui-grid-cell-contents\">' +
                            '  <div class="btn-group dropdown" uib-dropdown="">' +
                            '    <button class="btn btn-xs btn-primary blue" uib-dropdown-toggle="" aria-haspopup="true" aria-expanded="false"><i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span></button>' +
                            '    <ul uib-dropdown-menu>' +
                            '      <li><a ng-click="grid.appScope.save(row.entity)">保存</a></li>' +
                            '    </ul>' +
                            '  </div>' +
                            '</div>'
                    },
                    {
                        name: '姓名',
                        field: 'userDisplayName',
                        minWidth: 120
                    },
                    {
                        name: '乡试得分',
                        field: 'provincialIntegral',
                        minWidth: 120
                    },
                    {
                        name: '是否完成考试',
                        field: 'isCompleteProvincial',
                        minWidth: 120,
                        cellTemplate: '<input type="checkbox" readonly disabled ng-model="row.entity.isCompleteProvincial">'
                    },
                    {
                        name: '参加会试资格',
                        field: 'isMetropolitanStatus',
                        minWidth: 120,
                        cellTemplate: '<input type="checkbox" ng-model="row.entity.isMetropolitanStatus">'
                    },
                    {
                        name: '确认开始考试时间',
                        field: 'creationTime',
                        cellFilter: 'date:\'yyyy年MM月dd日 HH:mm\'',
                        minWidth: 100
                    }
                ],
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                        if (!sortColumns.length || !sortColumns[0].field) {
                            requestParams.sorting = null;
                        } else {
                            requestParams.sorting = sortColumns[0].field + ' ' + sortColumns[0].sort.direction;
                        }

                        vm.getExamCollectList();
                    });
                    gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
                        requestParams.skipCount = (pageNumber - 1) * pageSize;
                        requestParams.maxResultCount = pageSize;

                        vm.getExamCollectList();
                    });
                },
                data: []
            };

            vm.getExamCollectList = function () {
                vm.loading = true;
                examCollectService.getExamCollectList({
                    skipCount: requestParams.skipCount,
                    maxResultCount: requestParams.maxResultCount,
                    sorting: requestParams.sorting,
                    searchTitle: vm.filterText
                }).success(function (result) {
                    vm.userGridOptions.totalItems = result.totalCount;
                    vm.userGridOptions.data = result.items;
                }).finally(function () {
                    vm.loading = false;
                });
            };

            vm.save = function (entity) {
                examCollectService.update(entity).success(function () {
                    abp.notify.info(app.localize('SavedSuccessfully'));
                    vm.getExamCollectList();
                }).finally(function () {
                });
            }

            vm.getExamCollectList();
        }]);
})();