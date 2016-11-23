/**
 * Created by kubasek on 11/14/2016.
 */
var types = new Array();

function printType(data) {

    var t = data.definition.ctype;
    var k = t == "class" ? data.definition.cls.replace("eu.teta.tomatoes.conf.commands.", "") : data.definition.keyword;

    t = t.replace(/multiple-|vlan-range-|ip-|iface-/g, "")
    return '<div id="' + data.id + '" class="signature ' + t + '" onmouseover="typeDetail(this);" onmouseout="removeTypeDetail();">' + data.signature + '</div>';
};


function typeDetail(e) {
    var data = types[e.id];
    var w = "";

    $.each(data, function( key, val ) { w += printDetail('definition',key,val); });

    $("<div/>", {
        "id" : "type-detail",
        "class": "detail-window",
        html: w
    }).appendTo("body");
};

function removeTypeDetail() {
    $("#type-detail").remove();
}

function printDetail(type,key,val) {
    var res = "";

    if( val instanceof Array && val.length > 0 || val instanceof Object ) {
        res += '<div class="detail-block detail-'+key+'">' + key;
        var supertype = translateSettings[key] == undefined ? type : key;
        $.each(val, function( key, val ) { res += printDetail(supertype,key,val); });
        res += '</div>';
    } else if( val != null && val != 0 ) {
        if( key == 'ctype') {
            res += ' | ' + val;
        } else if( key == "settings" ) {
            res += '<div class="detail">';
            $.each(settings(type,val),function(key,val) { res += '<div class="key-settings">' + val + '</div>';});
            res += '</div>';
        } else {
            res += '<div class="detail key-' + key + '">' + key + ": " + val + '</div>';
        }
    }

    return res;
}

