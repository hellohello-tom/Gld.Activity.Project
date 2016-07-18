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
                            '      <li><a ng-click="grid.appScope.editNews(row.entity)">编辑</a></li>' +
                            '      <li><a  ng-click="grid.appScope.deleteNews(row.entity)">删除</a></li>' +
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
                        name: '创建时间',
                        field: 'creationTime',
                        cellFilter:'date:\'yyyy年MM月dd日 HH:mm\'',
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
                    searchTitle: vm.filterText
                }).success(function (result) {
                    vm.userGridOptions.totalItems = result.totalCount;
                    vm.userGridOptions.data = result.items;
                }).finally(function () {
                    vm.loading = false;
                });
            };

            vm.createNews = function () {
                openCreateOrEditUserModal(null)
            }

            vm.editNews = function (news) {
                openCreateOrEditUserModal(news)
            }

            vm.deleteNews = function (news) {
                vm.loading = true;
                newsService.deleteNews({
                    id: news.id
                }).success(function (result) {
                    vm.getNewsList();
                }).finally(function () {
                    vm.loading = false;
                });
            }
            function openCreateOrEditUserModal(news) {
                var modalInstance = $uibModal.open({
                    templateUrl: '~/App/common/views/gld/addnews.cshtml',
                    controller: 'common.views.gld.addnews as vm',
                    backdrop: 'static',
                    resolve: {
                        news: function () {
                            return news;
                        }
                    }
                });
                modalInstance.result.then(function (result) {
                    vm.getNewsList();
                });
            }

            vm.getNewsList();
        }]);
})();