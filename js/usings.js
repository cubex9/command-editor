/**
 * Created by kubasek on 11/21/2016.
 */
var u = {
    "id": 25001,
    "definition": 19767,
    "position": 5,
    "subs": [
        {
            "id": 25003,
            "definition": 19769,
            "parent": 25001,
            "position": 1,
            "subs": [{
                "id": 25004,
                "definition": 19770,
                "parent": 25003,
                "position": 0,
                "subs": [],
                "automatic": false,
                "rewrite": false,
                "hidden": false
            }],
            "automatic": false,
            "rewrite": false,
            "hidden": false
        },
        {
            "id": 25002,
            "definition": 19768,
            "parent": 25001,
            "position": 0,
            "subs": [],
            "automatic": false,
            "rewrite": false,
            "hidden": false
        }
    ],
    "automatic": false,
    "rewrite": false,
    "hidden": false
};


var usings = [];

function Using(p,o) {

    this._parent;

    this.id;
    this.definition;
    this.parent;
    this.position;
    this.subs;

    this.automatic;
    this.rewrite;
    this.hidden;
    this.form;

    this.notes;


    this.header = function () {
        return '<div class="detail-block detail-using">' + detail_no_key('id',this.id) + " | " + this.definition.id
            + detail_no_key('notes', this.notes);
    };

    this.body = function () {
        return printComplete(this['definition']);
    };

    this.footer = function () {
        return '</div>';
    };

    typeMapper(this, o);
};

function printUsings(items, data, deep) {

    data.sort(function(a,b) { return a.position - b.position; } );

    for (var i = 0; i < data.length; i++) {
        items.push(printUse(data[i],deep));
        if (data[i].subs.length > 0) {
            printUsings(items, data[i].subs, deep + "&nbsp");
        }
    }
};

function printUse(data, deep) {

    data.definition = byId(data.definition);
    usings[data.id] = data;

    //var u = types[data.definition];
    var u = data.definition;
    var t = u.definition.ctype;


    // var k = t == "class" ? u.cls.replace("eu.teta.tomatoes.conf.commands.", "") : u.keyword;

    return '<div id="'+data.id+'" class="use" onmousedown="usingsDetail(this);">' + deep + u.signature + '</div>';
};

function removeUsingDetail() {
    $("#usings-detail").remove();
}

function usingsDetail(e) {

    var element = $("#usings-detail");
    if( element.length > 0 ) {
        if( element.attr('uid') != e.id ) {
            removeUsingDetail();
            usingsDetail(e);
        } else {
            removeUsingDetail();
        }
        return;
    }

    var w = "";

    $.each(usings[e.id], function( key, val ) { w += printDetail('definition',key,val); });

    $("<div/>", {
        "id" : "usings-detail",
        "uid" : e.id,
        "class": "usings-window",
        html: w
    }).appendTo("body");
};
