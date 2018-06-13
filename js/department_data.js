var editIndex = undefined;

function append() {//点击新增按钮
    $('#win-add-bm').dialog({closed: false});
}

function edit() {//点击修改按钮
    if (editIndex == undefined) {
        $.messager.alert('我的消息', '请先选择一条记录！', 'error');
        return;
    } else {
        /*  console.log("弹出修改窗口")*/
        $('#win-edit-bm').dialog({closed: false});
        var selectMsg = $('#tb').datagrid('getSelected');
        $("#mod").val(selectMsg.deptName);
        /*     console.log('选中的值'+selectMsg.deptName);
         console.log('选中的ID'+selectMsg.id);*/
    }
}

function remove() {//点击删除按钮
    if (editIndex == undefined) {
        $.messager.alert('我的消息', '请先选择一条记录！', 'error');
    } else {
        $.messager.confirm('确认对话框', '您确定要删除吗？', function (r) {
            if (r) {
                //发起添加请求
                $.get(REQUEST_URL + "Delete_Department", {
                        departmentID: $('#tb').datagrid('getSelected').id,
                        token: 1234
                    },
                    function (data) {
                        $.messager.alert('我的消息', '删除成功！', 'info');//弹出信息
                        $('#tb').datagrid('reload');//刷新数据
                        editIndex = undefined;
                    }
                );
            }
        });
    }
}

$(function() {
    function nowRow(index) {
        if (editIndex != index) {
            $('#tb').datagrid('selectRow', index);
            editIndex = index;
        }
    }

    <!--其他向服务器发送的字段：page(页码)、rows(每页行数)-->
    $("#tb").datagrid({
        url: REQUEST_URL + 'Get_Department_List',//表格数据
        method: "get",
        title: "部门列表",//标题
        onClickRow: nowRow,//点击执行
        onDblClickRow: edit,//双击执行
        toolbar: "#tool",//工具栏
        columns: [
            [
                {field: "id", title: "ID", width: 100, align: "center",hidden:true},
                {field: "deptName", title: "部门名称", width: 200, align: "center"}
            ]
        ]
    });

    function add() {
        var form = $("#win-add-bm form");//获取表单
        if (form.form("validate")) {
            $.ajax({
                type: "POST",
                url: REQUEST_URL + "Import_Add_Ddepartment",
                data: $.param({
                    'token': TOKEN
                }) + '&' + form.serialize(),
                dataType: "json",
                success: function (data) {
                    if (data.errorDesc == "操作成功") {
                        $('#win-add-bm').dialog({closed: true});//关闭弹窗
                        $.messager.alert('我的消息', '新增成功！', 'info');//弹出信息
                        $('#tb').datagrid('reload');//刷新数据
                    }
                }
            });
        }
    }

    $('#win-add-bm').dialog({
        title: '新增',
        width:370,
        buttons: [
            {
                text: '保存',
                handler: function () {
                    add();
                }
            },
            {
                text: '关闭',
                handler: function () {
                    $('#win-add-bm').dialog({closed: true});
                }
            }
        ]
    });

    function save() {//保存修改的数据
        //发起添加请求
        $.post(REQUEST_URL + "Import_Update_Ddepartment", {
                departmentID: $('#tb').datagrid('getSelected').id,
                departmentName: $("#mod").val()
            },
            function (data) {
                $('#win-edit-bm').dialog({closed: true});//关闭弹窗
                $.messager.alert('我的消息', '修改成功！', 'info');//弹出信息
                $('#tb').datagrid('reload');//刷新数据
                editIndex = undefined;
            }
        );
    }

    $('#win-edit-bm').dialog({//设置修改窗口
        title: '修改',
        closed: true,
        width:370,
        //  cache: false,
        //  href: 'get_content.php',
        modal: true,
        buttons: [
            {//底部按钮
                text: '保存',
                handler: function () {
                    console.log("点击保存");
                    save();
                }
            },
            {
                text: '关闭',
                handler: function () {
                    $('#win-edit-bm').dialog({closed: true});
                }
            }
        ]
    });





});


