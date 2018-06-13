/**
 * Created by SLAPP on 2018/4/28.
 */
$(function(){
    $("#equip").tree({});
    $.get(REQUEST_URL+"Get_Equments_Park_List",{
        token:TOKEN
    },function(data){
        console.log(data);
        for(var i=0;i<data.result.length;i++){
                $('#equip').tree('append', {
                    data: [{
                        id: 23,
                        text: data.result[i].name
                    }]
                });
        }

        $('#int-equip').combobox({
            data:data.result,
            valueField:"id",
            textField:"name"
        });
    });
    $('#equip').tree({
        onClick: function(node){
            $('#int-equip').combobox('select', node.text);
        }
    });


    $('#partlist').datagrid({
        url:'../data/equip.json',
        width:100,
        fit:true,
        fitColumns:true,
        rownumbers:true,
        striped:true,
        border:false,
        pagination:true,
        pageSize:20,
        pageList:[10,20,30,40,50],
        pageNumber:1,
        toolbar: $("#tool"),
        columns:[[
            {align:"center",field:"id",title:"自动编号", checkbox:true},
            {align:"center",field:"a",width:100,title:"名称、规格、代号"},
            {align:"center",field:"b",width:50,title:"材料"},
            {align:"center",field:"c",width:30,title:"单位"},
            {align:"center",field:"d",width:40,title:"单价成本"},
            {align:"center",field:"e",width:40,title:"最低系数"},
            {align:"center",field:"f",width:40,title:"最低价格"},
            {align:"center",field:"g",width:60,title:"正常交易系数"},
            {align:"center",field:"h",width:60,title:"正常交易价格"},
            {align:"center",field:"i",width:100,title:"生产厂家通用情况"},
            {align:"center",field:"j",width:100,title:"备注"},
            {align:"center",field:"k",width:60,title:"创建时间"},
            {align:"center",field:"l",width:60,title:"更新时间"}
        ]]
    });

    $('#win-add').window({
        title: "添加配件",
        href:"test.html"
    });
});