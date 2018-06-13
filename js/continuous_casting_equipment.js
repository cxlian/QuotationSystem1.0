/**
 * Created by SLAPP on 2018/4/27.
 */
$(function(){
    $.get(REQUEST_URL+"Get_Continuous_Casting_Equipment_List",{
        token:TOKEN,
        page:1,
        pageSize:10
    },function(data){
        console.log(data);
        if (data.errorDesc = "操作成功") {
            $("#continuous-casting-equipment").datagrid({
                width:500,
                data:data.result,
                rownumbers:true,
                fit:true,
                fitColumns:true,
                striped:true,
                border:false,
                 pagination:true,
                 pageSize:20,
                 pageList:[10,20,30,40,50],
                 pageNumber:1,
                toolbar: $("tool"),
                columns:[[
                    {field:"id",title:"自动编号", checkbox:true},
                    {field:'imageUrl',title:'图片',width:100,align:'center',
                        formatter:function(value,row,index){return '<img src="'+row.imageUrl+'" width=80 height=80/>';}},
                    {field:"equipmentID",title:"设备ID",width:100,align:"center"},
                    {field:"equipmentName",title:"设备名称",width:100,align:"center"},
                    {field:"equipmentType",title:"设备类型",width:100,align:"center"},
                    {field:"equipmentWeight",title:"设备重量",width:100,align:"center"},
                    {field:"time",title:"创建时间",width:100,align:"center"}
                ]]
            });
        }
    });
});