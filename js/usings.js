/**
 * Created by kubasek on 11/21/2016.
 */
var usings = [];

function printUsings(items, data, deep) {

    for (var i = 0; i < data.length; i++) {
        items.push(printUse(data[i],deep));
        if (data[i].subs.length > 0) {
            printUsings(items, data[i].subs, deep + "&nbsp");
        }
    }
};

function printUse(data, deep) {

    data.definition = types[data.definition];
    usings[data.id] = data;

    //var u = types[data.definition];
    var u = data.definition;
    var t = u.definition.ctype;


    // var k = t == "class" ? u.cls.replace("eu.teta.tomatoes.conf.commands.", "") : u.keyword;

    return '<div id="'+data.id+'" class="use" onmouseover="usingsDetail(this);" onmouseout="removeUsingDetail();">' + deep + u.signature + '</div>';
};

function removeUsingDetail() {
    $("#usings-detail").remove();
}

function usingsDetail(e) {
    var w = "";

    $.each(usings[e.id], function( key, val ) { w += printDetail('definition',key,val); });

    $("<div/>", {
        "id" : "usings-detail",
        "class": "usings-window",
        html: w
    }).appendTo("body");
};
