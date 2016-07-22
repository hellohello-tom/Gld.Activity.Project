//retrun pomise and data
(function () {
    appModule.directive('kEditor', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var icoBtn = [
                             'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'cut', 'copy', 'paste',
                             'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                             'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
                             'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
                             'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                             'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'table', 'hr', 'emoticons', 'baidumap',
                             'anchor', 'link', 'unlink', '|', 'about'
                ];
                
                $.getScript("/libs/kindeditor/kindeditor-all.js", function () {
                    KindEditor.basePath = '/libs/kindeditor/';
                    var editor = KindEditor.create('textarea.ceditor', {
                        minWidth: 400,
                        minHeight: 258,
                        uploadJson: '/attrfiles/UploadForEditor',
                        emoticonsPath: '/libs/kindeditor/themes/qq/',
                        afterBlur: function () { this.sync(); },
                        afterChange: function () {
                            ngModel.$setViewValue(this.html());
                        },
                        items: icoBtn
                    });
                });
            }
        }
    });
})();
