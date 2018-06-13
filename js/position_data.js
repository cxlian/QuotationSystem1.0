/**
 * Created by SLAPP on 2018/4/27.
 */
var editIndex = undefined;//点击的行号

function nowRow(index) {//点击获取行号
    if (editIndex != index) {
        $('#tb_zw').datagrid('selectRow', index);
        editIndex = index;
    }
}

function getdata_bm(){//获取部门数据
    $.get(REQUEST_URL + "Get_Department_List", {
        token: TOKEN
    }, function (data) {
        if (data.errorDesc = "操作成功") {
            var myjson = eval(data);
            var str = "";
            for (var i = 0; i < myjson.result.length; i++) {
                str += "<li>" + myjson.result[i].deptName +"<span style='display: none'>"+myjson.result[i].id+"</span>"+ "</li>";
            }
            $(".list-bm").append(str);
            $(".list-bm li").click(function(){
                 $(".list-bm li").removeClass("select");
                 $(this).addClass("select");
            });
        }
    });
}
getdata_bm();

function getdata(){//获取职位数据
    $.get(REQUEST_URL + "Get_Position_List", {
        token: TOKEN
    }, function (data) {
        if (data.errorDesc = "操作成功") {
           /* console.log(data);*/
            $("#tb-zw").datagrid({
                data: data.result,
                title:"职位列表",//标题
                rownumbers: true,//行号
                fitColumns: true,//自适应宽度
                singleSelect:true,//仅可选一个
                striped: true,//斑马线
                border: true,//边框
                onClickRow: nowRow,//点击执行
                pagination:true,//页码
                pageSize:5,//初始化页面个数
                pageList:[5,10,15,20,25],
                toolbar: $("tool-zw"),
                columns: [
                    [
                        {field: "position",title: "职位名称",width: 100, align: "center"},
                        {field: "deptName", title: "部门名称", width: 100, align: "center"},
                        {field: "id", title: "职位ID",width: 100, align: "center"},
                        {field: "dept_id",  title: "部门ID",width: 100, align: "center"},
                        {field: "createtime", title: "创建时间", width: 100,align: "center"},
                        {field: "edittime", title: "更新时间",width: 100,  align: "center"}
                    ]
                ]
            });
        }
    });
}

function append_zw() {//点击职位新增
    if($(".list-bm .select").length < 1){
        layer.alert('请先选择一条部门记录');
        return;
    }else{
        layer.open({
            type: 2,
            title: '新增',
            area: ['50%', '50%'],
            skin: 'layui-layer-demo',
            shadeClose: true,
            content: ['../page/src/add_position.html', 'no'],//弹出新增职位窗口
            success: function () {
                var i1 = window.frames[0];
                i1.document.getElementById("departmentID").innerHTML = $(window.parent.document).find(".select").find("span").html();
                i1.document.getElementById("deptName").innerHTML = $(window.parent.document).find(".select").html();
            }
        });
    }
}

function add_zw() {//执行新增职位
    if (editIndex == undefined) {
        layer.alert('请先选择一条记录');
        return;
    } else {
        var i1 = window.frames[0];//获取父框
        var departmentID = i1.document.getElementById("departmentID").innerHTML;
        var positionName=i1.document.getElementById("positionName").value;

        $('#tb-zw').datagrid('acceptChanges');
        $.post(REQUEST_URL + "Import_Add_Position", {
            token: TOKEN,
            departmentID: departmentID,
            positionName: positionName
        }, function (data) {
            getdata();
             layer.msg('新增成功', {icon: 1});
        })
    }
}

function edit_zw() {//修改按钮
    if (editIndex == undefined) {
        layer.alert('请先选择一条职位记录');
        return;
    } else {
        layer.open({
            type: 2,
            title: '修改',
            area: ['40%', '40%'],
            skin: 'layui-layer-demo',
            shadeClose: true,
            content: ['../page/src/edit_position.html', 'no'],
            success: function () {
                var selectMsg = $('#tb-zw').datagrid('getSelected');
                 var i1 = window.frames[0];
                i1.document.getElementById("mod_id").innerHTML = selectMsg.id;
                i1.document.getElementById("mod_departmentID").innerHTML = selectMsg.dept_id;
                i1.document.getElementById("mod_department").innerHTML = selectMsg.deptName;
                i1.document.getElementById("mod_positionName").value = selectMsg.position;
            }
        });
    }
}

function save() {//保存添加的数据
    var i1 = window.frames[0];
    var positionName = i1.document.getElementById("positionName").value;
    var departmentID = i1.document.getElementById("departmentID").innerHTML;


    console.log(positionName+departmentID);


    $.post(REQUEST_URL + "Import_Add_Position", {
        token: TOKEN,
        departmentID: departmentID,
        positionName: positionName
    }, function (data) {
        getdata();
    });
}

function save_edit() {//保存修改的数据
    var i1 = window.frames[0];
    var mod_id = i1.document.getElementById("mod_id").innerHTML;
    var mod_positionName = i1.document.getElementById("mod_positionName").value;
    var mod_departmentID = i1.document.getElementById("mod_departmentID").innerHTML;


    $.post(REQUEST_URL + "Import_Update_Position", {
        id: mod_id,
        positionName: mod_positionName,
        departmentID: mod_departmentID
    }, function (data) {
        getdata();
    });
}

function remove() {//删除按钮

    if (editIndex == undefined) {
        layer.alert('请先选择一条记录')
    } else {
        var mod_id = $('#tb-zw').datagrid('getSelected').id;
        console.log(mod_id);
        layer.confirm('您确定要删除吗？', {
            btn: ['确定', '取消']
        }, function () {


            $('#tb-zw').datagrid('cancelEdit', editIndex)
                .datagrid('deleteRow', editIndex);

            $.get(REQUEST_URL + "Delete_Position", {
                token: TOKEN,
                positionID: mod_id
            }, function (data) {
                editIndex = undefined;
                layer.msg('删除成功', {icon: 1});
            });

        }, function () {
            layer.close();
        });
    }
}

$(function () {
    getdata();
});