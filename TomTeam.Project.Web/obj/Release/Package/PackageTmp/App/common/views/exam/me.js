(function () {

    appModule.controller('common.views.exam.me', [
        '$scope', '$uibModal', '$stateParams', 'uiGridConstants', 'abp.services.app.metropolitan',
        function ($scope, $uibModal, $stateParams, uiGridConstants, metropolitanService) {
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
                        name: '标题',
                        field: 'title',
                        minWidth: 120
                    },
                    {
                        name: '上传的用户名',
                        field: 'userDisplayName',
                        minWidth: 120
                    },
                    {
                        name: '点赞数',
                        field: 'likeCount',
                        minWidth: 120
                    },
                    {
                        name: '应得分数',
                        field: 'score',
                        minWidth: 120
                    },

                    {
                        name: '是否超时',
                        field: 'isTimeOut',
                        minWidth: 120,
                        cellTemplate: '<span>{{row.entity.isTimeOut?"是":"否"}}</span>'
                    },
                    {
                        name: '试卷',
                        field: 'examPath',
                        minWidth: 120,
                        cellTemplate: '<a href="{{row.entity.examPath}}" target="_blank">点击下载</a>'
                    },
                    {
                        name: '上传时间',
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

                        vm.getMetropolitanList();
                    });
                    gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
                        requestParams.skipCount = (pageNumber - 1) * pageSize;
                        requestParams.maxResultCount = pageSize;

                        vm.getMetropolitanList();
                    });
                },
                data: []
            };


            vm.create = function () {
                openCreateOrEditUserModal(null)
            }

            vm.edit = function (me) {
                openCreateOrEditUserModal(me)
            }

            function openCreateOrEditUserModal(me) {
                var modalInstance = $uibModal.open({
                    templateUrl: '~/App/common/views/exam/addme.cshtml',
                    controller: 'common.views.exam.addme as vm',
                    backdrop: 'static',
                    resolve: {
                        me: function () {
                            return me;
                        }
                    }
                });
                modalInstance.result.then(function (result) {
                    vm.getMetropolitanList();
                });
            }

            vm.delete = function (me) {
                vm.loading = true;
                metropolitanService.deleteMetropolitan({
                    id: me.id
                }).success(function (result) {
                    vm.getMetropolitanList();
                }).finally(function () {
                    vm.loading = false;
                });
            }
            vm.getMetropolitanList = function () {
                vm.loading = true;
                metropolitanService.getMetropolitanList({
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

         
            vm.getMetropolitanList();
        }]);
})();