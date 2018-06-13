var editIndex = undefined;

function nowRow(index) {
    if (editIndex != index) {
        $('#tb').datagrid('selectRow', index);
        editIndex = index;
    }
}

//弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
    $.messager.alert(title, msgString, msgType);
}

function getdata(){//获取账号信息
    $.get(REQUEST_URL + "get_List_Account", {
        token: TOKEN
    }, function (data) {
        console.log(data);
        if (data.errorDesc = "操作成功") {
            $("#tb-zh").datagrid({
                data: data.result,
                title:"账号列表",//标题
                rownumbers: true,//行号
                fitColumns: true,//自适应宽度
                singleSelect:true,//仅可选一个
                striped: true,//斑马线
                border: true,//边框
                onClickRow: nowRow,
                toolbar: $("tool-zh"),
                pagination:true,//页码
                pageSize:5,//初始化页面个数
                pageList:[5,10,15,20,25],
                columns: [
                    [
                        {field:"name",title:"名字",align:"center"},
                        {field:"position",title:"职位",align:"center"},
                        {field:"gender",title:"性别",align:"center"},
                        {field:"phone",title:"手机",align:"center"},
                        {field:"status",title:"状态",align:"center"},
                        {field:"createTime",title:"创建时间",align:"center"},
                        {field:"modifiedTime",title:"更新时间",align:"center"}
                    ]
                ]
            });
        }
    });
}

function getdata_zw() {//获取职位数据
    $.get(REQUEST_URL + "Get_Department_List", {
        token: TOKEN
    }, function (data) {
        if (data.errorDesc = "操作成功") {
            var myjson = eval(data);
            var str = "";
            for (var i = 0; i < myjson.result.length; i++) {
                str += "<li class='li-bm'" + " dep_id=" + myjson.result[i].id + "><span>" + myjson.result[i].deptName + "</span><ul class='ul-zw'></ul></li>";
            }
            $(".list-zw").append(str);
        }
        $.get(REQUEST_URL + "Get_Position_List", {
            token: TOKEN
        }, function (data) {
            if (data.errorDesc = "操作成功") {
                var myjson = eval(data);
                var str = "";
                var a;
                for (var i = 0; i < $(".li-bm").length; i++) {
                    for (var j = 0; j < myjson.result.length; j++) {
                        a = $(".list-zw .li-bm").eq(i).children("span").html();//部门
                        if (a == myjson.result[j].deptName) {
                            console.log(myjson.result[j].position);
                            $(".list-zw .li-bm").eq(i).find(".ul-zw").append("<li" + " pos_id=" + myjson.result[j].id + ">" + myjson.result[j].position + "</li>");
                        }
                        ;
                    }
                }
                $(".ul-zw li").click(function () {
                    $(".ul-zw li").removeClass("select");
                    $(this).addClass("select");
                });

                console.log(data);
            }
        });
    });
}
getdata_zw();

function append() {//点击新增按钮
    if($(".ul-zw .select").length < 1){
        layer.alert('请先选择一条职位');
        return;
    }else{
        layer.open({
            type: 2,
            title: '新增',
            area: ['50%', '80%'],
            skin: 'layui-layer-demo',
            shadeClose: true,
            content: ['../page/src/add_acount.html'],//弹出新增账号窗口
            success: function () {
                var i1 = window.frames[0];
                i1.document.getElementById("partmentName").innerHTML = $(window.parent.document).find(".select").parent().parent().children("span").html();
                i1.document.getElementById("positionName").innerHTML = $(window.parent.document).find(".select").html();
                i1.document.getElementById("partmentID").innerHTML = $(window.parent.document).find(".select").parent().parent().attr("dep_id");;
                i1.document.getElementById("positionID").innerHTML = $(window.parent.document).find(".select").attr("pos_id");
            }
        });
    }
}

function add() {//增加新的数据
    var i1 = window.frames[0];
    var departmentID = i1.document.getElementById("partmentID").innerHTML;
    var name = i1.document.getElementById("name").value;
    var gender = i1.document.getElementById("gender").value;
    var phone = i1.document.getElementById("phone").value;
    var role = i1.document.getElementById("role").value;
    var password = i1.document.getElementById("password").value;
    var positionID = i1.document.getElementById("positionID").innerHTML;


    console.log("departmentID:"+departmentID);
    console.log("name:"+name);
    console.log("gender:"+gender);
    console.log("phone:"+phone);
    console.log("role:"+role);
    console.log("password:"+password);
    console.log("positionID:"+positionID);
    $.post(REQUEST_URL + "Import_Add_Account", {
        token: TOKEN,
        departmentID: departmentID,
        name: name,
        gender: gender,
        phone: phone,
        role: role,
        password: password,
        positionID: positionID,
    power:JSON.stringify([{
        moduleId:$("#moduleId01").is(':checked')?1:0,
        see:$("#moduleId01_see").is(':checked')?1:0,
        add:$("#moduleId01_add").is(':checked')?1:0,
        update:$("#moduleId01_update").is(':checked')?1:0,
        delete:$("#moduleId01_delete").is(':checked')?1:0
    },{
        moduleId:$("#moduleId02").is(':checked')?1:0,
        see:$("#moduleId02_see").is(':checked')?1:0,
        add:$("#moduleId02_add").is(':checked')?1:0,
        update:$("#moduleId02_update").is(':checked')?1:0,
        delete:$("#moduleId02_delete").is(':checked')?1:0
    }])
    }, function (data) {
        getdata();
        layer.msg('新增成功', {icon: 1});
        console.log(data);
    });
}

function edit() {//修改按钮
    if (editIndex == undefined) {
     /*   layer.alert('请先选择一条账号记录');*/
        msgShow('系统提示', '请先选择一条账号记录', 'warning');
        return;
    } else {
        layer.open({
            type: 2,
            title: '修改',
            area: ['40%', '40%'],
            skin: 'layui-layer-demo',
            shadeClose: true,
            content: ['../page/src/edit_acount.html', 'no'],
            success: function () {
                var selectMsg = $('#tb').datagrid('getSelected');
                var i1 = window.frames[0];
                i1.document.getElementById("deptId").innerHTML = selectMsg.id;
                i1.document.getElementById("deptName").value = selectMsg.deptName;
            }
        });
    }
}

function save() {//保存修改的数据
    var i1 = window.frames[0];
    var departmentID = i1.document.getElementById("deptId").innerHTML;
    var  departmentName= i1.document.getElementById("deptName").value;
    $('#tb').datagrid('updateRow', {index: editIndex, row: {
        id: departmentID,
        deptName: departmentName
    }
    });
    $('#tb').datagrid('acceptChanges');

    $.post(REQUEST_URL + "Import_Update_Ddepartment", {
        token: TOKEN,
        departmentID: departmentID,
        departmentName: departmentName
    }, function (data) {
        getdata();
    });
}

function removeit() {//删除按钮
    var mod_id = $('#tb').datagrid('getSelected').id;
    if (editIndex == undefined) {
        layer.alert('请先选择一条记录')
    } else {
        layer.confirm('您确定要删除吗？', {
            btn: ['确定', '取消']
        }, function () {
            $('#tb').datagrid('cancelEdit', editIndex)
                .datagrid('deleteRow', editIndex);

            $.get(REQUEST_URL + "Delete_Department", {
                token: TOKEN,
                departmentID: mod_id
            }, function (data) {
                editIndex = undefined;
                layer.msg('删除成功', {icon: 1});
            });

        }, function () {
            layer.close();
        });
    }
}
getdata();