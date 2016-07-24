(function () {

    appModule.controller('common.views.gld.userInfo', [
        '$scope', '$uibModal', '$stateParams', 'uiGridConstants', 'abp.services.app.userInfo','abp.services.app.user',
        function ($scope, $uibModal, $stateParams, uiGridConstants, userInfoService,userService) {
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
                             '      <li><a ng-click="grid.appScope.edit(row.entity)">编辑</a></li>' +
                             '      <li><a  ng-click="grid.appScope.delete(row.entity)">删除</a></li>' +
                             '    </ul>' +
                             '  </div>' +
                             '</div>'
                     },
                    {
                        name: '姓名',
                        field: 'name',
                        minWidth: 120
                    },
                    {
                        name: '手机号',
                        field: 'phone',
                        minWidth: 120
                    },
                    {
                        name: '公司名称',
                        field: 'companyName',
                        minWidth: 120
                    },
                    {
                        name: '专业',
                        field: 'major',
                        minWidth: 120
                    },
                    {
                        name: '注册时间',
                        field: 'creationTime',
                        cellFilter: 'date:\'yyyy年MM月dd日 HH:mm\'',
                        minWidth: 100
                    },
                    {
                        name: '最后登录时间',
                        field: 'lastLoginTime',
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

                        vm.getUsers();
                    });
                    gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
                        requestParams.skipCount = (pageNumber - 1) * pageSize;
                        requestParams.maxResultCount = pageSize;

                        vm.getUsers();
                    });
                },
                data: []
            };

            vm.exportToExcel = function () {
                userInfoService.getUsersToExcel({})
                    .success(function (result) {
                        app.downloadTempFile(result);
                    });
            };

            vm.edit = function (user) {
                openCreateOrEditUserModal(user)
            }

            vm.delete = function (user) {

                abp.message.confirm(
                    app.localize('UserDeleteWarningMessage', user.userName),
                    function (isConfirmed) {
                        if (isConfirmed) {
                            userService.deleteUser({
                                id: user.id
                            }).success(function () {
                                vm.getUsers();
                                abp.notify.success(app.localize('SuccessfullyDeleted'));
                            });
                        }
                    }
                );
            }
            function openCreateOrEditUserModal(user) {
                var modalInstance = $uibModal.open({
                    templateUrl: '~/App/common/views/gld/updateuser.cshtml',
                    controller: 'common.views.gld.updateuser as vm',
                    backdrop: 'static',
                    resolve: {
                        userId: function () {
                            return user.id;
                        }
                    }
                });
                modalInstance.result.then(function (result) {
                    vm.getUsers();
                });
            }

            vm.getUsers = function () {
                vm.loading = true;
                userInfoService.getUsers({
                    skipCount: requestParams.skipCount,
                    maxResultCount: requestParams.maxResultCount,
                    sorting: requestParams.sorting,
                    searchFilter: vm.filterText
                }).success(function (result) {
                    vm.userGridOptions.totalItems = result.totalCount;
                    vm.userGridOptions.data = result.items;
                }).finally(function () {
                    vm.loading = false;
                });
            };

            vm.getUsers();
        }]);
})();