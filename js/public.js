/**
 * Created by SLAPP on 2018/4/19.
 */
var TOKEN;

//获得地址文件名
function urlFileName(str){
    var a=str.split("/");
    var b=a.length-1;
    return a[b];
}

//字符串转日期:年-月-日 时：分：秒
function timeStamp2String(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}
//字符串转日期:年-月-日
function timeStampString(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return year + "-" + month + "-" + date;
}

/**
 * 获取当前时间
 */
function nowData(){
    function p(s) {
        return s < 10 ? '0' + s: s;
    }
    var myDate = new Date();
    //获取当前年
    var year=myDate.getFullYear();
    //获取当前月
    var month=myDate.getMonth()+1;
    //获取当前日
    var date=myDate.getDate();
    var h=myDate.getHours();       //获取当前小时数(0-23)
    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
    var s=myDate.getSeconds();
    var now=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);
    return now;
}

//
function  formatterMoney(value, row) {
        if (value!=null)  return ('￥'+parseFloat(value).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        else return ("/");
}

/*错误跳转页面*/
function errorToPage(){
/*    location.href = '../page/login.html';*/
}

//设置默认的datagrid参数
if($.fn.datagrid){
    $.fn.datagrid.defaults.height = "100%";//表格高度
    $.fn.datagrid.defaults.width = "100%";//表格宽度
    $.fn.datagrid.defaults.border = true;//边框
    $.fn.datagrid.defaults.striped = true;//斑马线
    $.fn.datagrid.defaults.singleSelect = true;//仅可选一个
    $.fn.datagrid.defaults.fitColumns = true;//自适应宽度
    $.fn.datagrid.defaults.rownumbers = true;//行号
    $.fn.datagrid.defaults.pagination = true;//页码
    $.fn.datagrid.defaults.pageSize = 20;//初始化页面个数
    $.fn.datagrid.defaults.pageList = [20, 40, 60, 80, 100];//初始化页面个数
    $.fn.datagrid.defaults.nowrap = false;//一行显示不下换一行
    $.fn.datagrid.defaults.loadMsg = '加载中……';//加载中的信息
    $.fn.datagrid.defaults.onLoadError=errorToPage;
/*    console.log($.fn.datagrid.defaults);*/
/*    $.fn.datagrid.defaults.queryParams={
        token:"22222"
    };*/
  /*  $.fn.datagrid.defaults.queryParams.push({token:"22222"});*/
/*    $.fn.datagrid.defaults.queryParams="2222";*/
}

//设置默认的dialog参数

if($.fn.dialog){
/*    $.fn.dialog.defaults.height = "500px";//表格高度
    $.fn.dialog.defaults.width = "500px";//表格宽度*/
    $.fn.dialog.defaults.closed = true;//窗口关闭
    $.fn.dialog.defaults.modal = true;//蒙版
}



/**
 * 重新加载指定的easyui-tree
 * @param:dom node
 */
function reloadTree(node){
    node.tree('reload');
}

/*
 * 部门与职位二级联动
 * @param json data:后台发来的部门树（含职位）
 * @param dom select $dep:部门
 * @param don select $pos:职位
 * */
function setApartmentPosition(data,$dep,$pos){
    for (var i = 0; i < data.length; i++) {
        $dep.append("<option value='" + data[i].id + "'>" + data[i].deptName + "</option>");
    }
    $dep.change(function () {
        var deptId = $(this).val();
        $pos.children("option").not(":eq(0)").remove();
        for (i = 0; i < data.length; i++) {
            if (deptId == data[i].id) {
                for (var j = 0; j < data[i].list.length; j++) {
                    $pos.append("<option value='" + data[i].list[j].id + "'>" + data[i].list[j].position + "</option>");
                }
                return;
            }
        }
    });
}

/*
* 清除cookie
* */
function clearCookie(){
    $.cookie('department',null);
    $.cookie('deptID', null);
    $.cookie('gender', null);
    $.cookie('id', null);
    $.cookie('name',null);
    $.cookie('phone',null);
    $.cookie('position', null);
    $.cookie('price',null);
    $.cookie('role',null);
    $.cookie('token',null);
}

function get_length(value){
    return value.length;
}

function isNumber(z_check_value){
    var z_reg = /^(([0-9])|([1-9]([0-9]+)))$/;
    return z_reg.test($.trim(z_check_value));
}

/*自定义验证*/
$.extend($.fn.validatebox.defaults.rules, {
    mobile : {
        validator: function(value){
            return /^1[0-9]{10}$/i.test($.trim(value));
        },
        message: '手机号码格式错误.'
    },
    maxLength:{
        validator:function(value,param){
            return value.length<=param[0]
        },
        message:'最多{0}个字'
    },
    number : {//正整数，包括0（00，01非数字）
        validator: function(value, param){
            return isNumber(value);
        },
        message: '只能输入数字（01非数字）'
    }
});


//初始加载，表格宽度自适应
$(document).ready(function(){
    fitCoulms();
});
//浏览器窗口大小变化后，表格宽度自适应
$(window).resize(function(){
    fitCoulms();
});
function fitCoulms(){
    $.fn.datagrid.defaults.fitColumns = true;//自适应宽度
}




