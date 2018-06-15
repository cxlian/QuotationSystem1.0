/**
 * Created by SLAPP on 2018/4/27.
 */

$(function () {

    $('#tabs').tabs({
        fit: true,
        border: false,
        onSelect: function (title, index) {
            var selTab = $('#tabs').tabs('getSelected');
            selTab.panel('refresh');
        }
    }).tabs('add', {
        'iconCls': 'icon-house',
        'title': '首页',
        'href': 'home.html',
        'closable': false
    });

    function toTabs(node) {
        if ($("#tabs").tabs('exists', node.text)) {
            $("#tabs").tabs('select', node.text);
            //刷新页面
            var selTab = $('#tabs').tabs('getSelected');
            selTab.panel('refresh');
        } else {
            if (node.url) {
                $("#tabs").tabs("add", {
                    title: node.text,
                    href: node.url,
                    closable: true
                })
            }
        }
    }

    function tabClose() {
        $("#tabs").tabs({onContextMenu: function (e, title, index) {
            $('#mm').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
            e.preventDefault();

            $('#tabs').tabs('select', title);
        }});
    }

    function tabCloseEven() {
        //关闭当前
        $('#mm-tabclose').click(function () {
            var tab = $('#tabs').tabs('getSelected');
            var index = $('#tabs').tabs('getTabIndex', tab);
            $('#tabs').tabs('close', index);
        });
        //全部关闭
        $('#mm-tabcloseall').click(function () {
            $('.tabs-inner span:not(":eq(0)")').each(function (i, n) {
                var t = $(n).text();
                $('#tabs').tabs('close', t);
            });
        });
        //关闭当前右侧的TAB
        $('#mm-tabcloseright').click(function () {
            var nextall = $('.tabs-selected').nextAll();
            if (nextall.length == 0) {
                return false;
            }
            nextall.each(function (i, n) {
                var t = $('a:eq(0) span', $(n)).text();
                $('#tabs').tabs('close', t);
            });
            return false;
        });

        //关闭当前左侧的TAB
        $('#mm-tabcloseleft').click(function () {
            var prevall = $('.tabs-selected').prevAll();
            if (prevall.length == 0) {
                return false;
            }
            var l = prevall.length;
            prevall.each(function (i, n) {
                var t = $('a:eq(0) span', $(n)).text();
                if (i < l - 1) $('#tabs').tabs('close', t);
            });
            return false;
        });
        //关闭除当前之外的TAB
        $('#mm-tabcloseother').click(function () {
            $('#mm-tabcloseright').click();
            $('#mm-tabcloseleft').click();
        });
        //退出
        $("#mm-exit").click(function () {
            $('#mm').menu('hide');
        })
    }

    tabClose();
    tabCloseEven();

    <!--判断是否为管理员-->
    if ($.cookie('role') == 0) {//如果是管理员
//报价管理目录
        $("#bjgl").tree({
            data: [
                {
                    "text": "销售总额",
                    "url": "xsze.html",
                    "iconCls": "icon-zonge"
                },
                {
                    "text": "项目管理",
                    "url": "xmgl.html",
                    "iconCls": "icon-xiangmu"
                },
                {
                    "text": "合同管理",
                    "url": "htgl.html",
                    "iconCls": "icon-het"
                },
                {
                    "text": "连铸设备",
                    "url": "lzsb.html",
                    "iconCls": "icon-lianzhu"
                },
                {
                    "text": "配件管理",
                    "url": "pjgl.html",
                    "iconCls": "icon-peijian"
                },
                {
                    "text": "价格管理",
                    "url": "jggl.html",
                    "iconCls": "icon-jiageguanli"
                },
                {
                    "text": "整机配置",
                    "url": "zjpz.html",
                    "iconCls": "icon-zhengji"
                }/*,
                {
                    "text": "测试编辑表",
                    "url": "test.html",
                    "iconCls": "icon-zhengji"
                }*/
            ],
            onClick: function (node) {
                toTabs(node);//点击跳转页面
            }
        });
    } else {
        //报价管理目录
        $("#bjgl").tree({
            data: [
                {
                    "text": "连铸设备",
                    "url": "lzsb.html",
                    "iconCls": "icon-lianzhu"
                },
                {
                    "text": "配件管理",
                    "url": "pjgl.html",
                    "iconCls": "icon-peijian"
                },
                {
                    "text": "价格管理",
                    "url": "jggl.html",
                    "iconCls": "icon-jiageguanli"
                },
                {
                    "text": "整机配置",
                    "url": "zjpz.html",
                    "iconCls": "icon-zhengji"
                }
            ],
            onClick: function (node) {
                toTabs(node);//点击跳转页面
            }
        });
    }

    //系统管理目录
    $("#xtgl").tree({
        data: [
            {
                "text": "销售人员管理",
                "url": "xsrygl.html",
                "iconCls": "icon-xiaoshourenyuan"
            },
            {
                "text": "账号管理",
                "url": "zhgl.html",
                "iconCls": "icon-zhanghao"
            },
            {
                "text": "职位管理",
                "url": "zwgl.html",
                "iconCls": "icon-zhiwei"
            },
            {
                "text": "部门管理",
                "url": "bmgl.html",
                "iconCls": "icon-bumen"
            }
        ],
        onClick: function (node) {
            toTabs(node);//点击跳转页面
        }
    });

    //通知管理目录
    $("#tzgl").tree({
        data: [
            {
                "text": "通知信息",
                "url": "tzxx.html",
                "iconCls": "icon-tz"
            }
        ],
        onClick: function (node) {
            toTabs(node);//点击跳转页面
        }
    });

    //问题反馈目录
    $("#wtgl").tree({
        data: [
            {
                "text": "问题信息",
                "url": "wtxx.html",
                "iconCls": "icon-wenti"
            }
        ],
        onClick: function (node) {
            toTabs(node);//点击跳转页面
        }
    });

    /*** ajax请求设置全局属性与方法***/
    $.ajaxSetup({
        data: {
            token: TOKEN
        },
        error: errorToPage
    });

});
