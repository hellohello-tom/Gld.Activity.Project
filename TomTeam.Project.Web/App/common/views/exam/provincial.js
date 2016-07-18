(function () {

    appModule.controller('common.views.exam.provincial', [
        '$scope', '$uibModal', '$stateParams', 'uiGridConstants', 'abp.services.app.provincialExam',
        function ($scope, $uibModal, $stateParams, uiGridConstants, provincialService) {
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
                            '      <li><a ng-click="grid.appScope.editProvincial(row.entity)">编辑</a></li>' +
                            '      <li><a  ng-click="grid.appScope.deleteProvincial(row.entity)">删除</a></li>' +
                            '    </ul>' +
                            '  </div>' +
                            '</div>'
                    },
                    {
                        name: '题目',
                        field: 'topicName',
                        minWidth: 120
                    },
                    {
                        name: '正确答案',
                        field: 'answerContent',
                        minWidth: 120
                    },
                    {
                        name: '创建时间',
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

                        vm.getExamList();
                    });
                    gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
                        requestParams.skipCount = (pageNumber - 1) * pageSize;
                        requestParams.maxResultCount = pageSize;

                        vm.getExamList();
                    });
                },
                data: []
            };

            vm.getExamList = function () {
                vm.loading = true;
                provincialService.getExamList({
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

            vm.createProvincial = function () {
                openCreateOrEditUserModal(0)
            }

            vm.editProvincial = function (provincial) {
                openCreateOrEditUserModal(provincial.id)
            }

            vm.deleteProvincial = function (provincial) {
                vm.loading = true;
                provincialService.deleteProvincial({
                    id: provincial.id
                }).success(function (result) {
                    vm.getExamList();
                }).finally(function () {
                    vm.loading = false;
                });
            }
            function openCreateOrEditUserModal(provincialId) {
                var modalInstance = $uibModal.open({
                    templateUrl: '~/App/common/views/exam/createOrUpdateProvincial.cshtml',
                    controller: 'common.views.exam.createOrUpdateProvincial as vm',
                    backdrop: 'static',
                    resolve: {
                        provincialId: function () {
                            return provincialId;
                        }
                    }
                });
                modalInstance.result.then(function (result) {
                    vm.getExamList();
                });
            }

            vm.getExamList();
        }]);
})();