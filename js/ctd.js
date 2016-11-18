/**
 * Created by kubasek on 11/14/2016.
 */
var types = [];
var usings = [];

function fulltext(o) {
};

function printType(data) {
    var t = data.definition.ctype;
    var k = t == "class" ? data.definition.cls.replace("eu.teta.tomatoes.conf.commands.", "") : data.definition.keyword;

    t = t.replace(/multiple-|vlan-range-|ip-|iface-/g, "")
    return '<div id="' + data.id + '" class="signature ' + t + '">' + data.signature + '</div>';
}

function printUsings(items, data, deep) {

    for (var i = 0; i < data.length; i++) {
        items.push(printUse(data[i],deep));
        if (data[i].subs.length > 0) {
            printUsings(items, data[i].subs, deep + "&nbsp");
        }
    }
};

function printUse(data, deep) {

    var u = types[data.definition];
    var t = u.definition.ctype;
    // var k = t == "class" ? u.cls.replace("eu.teta.tomatoes.conf.commands.", "") : u.keyword;

    return '<div id="'+data.id+'" class="use">' + deep + u.signature + '</div>';
};

