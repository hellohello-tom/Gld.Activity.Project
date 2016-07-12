(function () {

    appModule.controller('common.views.gld.news', [
        '$scope', '$uibModal', '$stateParams', 'uiGridConstants', 'abp.services.app.news',
        function ($scope, $uibModal, $stateParams, uiGridConstants, newsService) {
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
                rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'text-muted\': !row.entity.isActive }"  ui-grid-cell></div>',
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
                            '      <li><a ng-if="grid.appScope.permissions.impersonation && row.entity.id != grid.appScope.currentUserId" ng-click="grid.appScope.impersonate(row.entity)">' + app.localize('LoginAsThisUser') + '</a></li>' +
                            '      <li><a ng-if="grid.appScope.permissions.edit" ng-click="grid.appScope.editUser(row.entity)">' + app.localize('Edit') + '</a></li>' +
                            '      <li><a ng-if="grid.appScope.permissions.changePermissions" ng-click="grid.appScope.editPermissions(row.entity)">' + app.localize('Permissions') + '</a></li>' +
                            '      <li><a ng-if="grid.appScope.permissions.delete" ng-click="grid.appScope.deleteUser(row.entity)">' + app.localize('Delete') + '</a></li>' +
                            '    </ul>' +
                            '  </div>' +
                            '</div>'
                    },
                    {
                        name: app.localize('UserName'),
                        field: 'userName',
                        cellTemplate:
                            '<div class=\"ui-grid-cell-contents\">' +
                            '  <img ng-if="row.entity.profilePictureId" ng-src="' + abp.appPath + 'Profile/GetProfilePictureById?id={{row.entity.profilePictureId}}" width="22" height="22" class="img-rounded img-profile-picture-in-grid" />' +
                            '  <img ng-if="!row.entity.profilePictureId" src="' + abp.appPath + 'Common/Images/default-profile-picture.png" width="22" height="22" class="img-rounded" />' +
                            '  {{COL_FIELD CUSTOM_FILTERS}} &nbsp;' +
                            '</div>',
                        minWidth: 140
                    },
                    {
                        name: '标题',
                        field: 'title',
                        minWidth: 120
                    },
                    {
                        name: '默认图片',
                        field: 'defaultImg',
                        minWidth: 120
                    },
                    {
                        name: '创建时间',
                        field: 'creationTime',
                        cellFilter: 'momentFormat: \'L\'',
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

                        vm.getNewsList();
                    });
                    gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
                        requestParams.skipCount = (pageNumber - 1) * pageSize;
                        requestParams.maxResultCount = pageSize;

                        vm.getNewsList();
                    });
                },
                data: []
            };

            vm.getNewsList = function () {
                vm.loading = true;
                newsService.getNewsList({
                    skipCount: requestParams.skipCount,
                    maxResultCount: requestParams.maxResultCount,
                    sorting: requestParams.sorting,
                    filter: vm.filterText
                }).success(function (result) {
                    vm.userGridOptions.totalItems = result.totalCount;
                    vm.userGridOptions.data = addRoleNamesField(result.items);
                }).finally(function () {
                    vm.loading = false;
                });
            };
            vm.getNewsList();
        }]);
})();