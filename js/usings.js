/**
 * Created by kubasek on 11/21/2016.
 */
var usings = [];

function Using(t,k,o) {

    this._t = 'Using';
    this._k = k;

    this.id;
    this.definition;
    this.parent;
    this.position;
    this.subs;

    this.platform = "IOS";
    this.modelPattern = ".*";
    this.gteVersion = '15.0';
    this.ltVersion = '';

    this.automatic;
    this.rewrite;
    this.hidden;
    this.form;

    this.notes = 'exported';


    this.header = function () {
        return '<div class="detail-block detail-using">' + this.position
            + " | " + this.definition.identificator
                + " | " + pr.booleans(this,[ 'automatic','hidden', 'rewrite' ])
            + pr.val('notes', this.notes);
    };

    this.body = function () {
        b = ''; //detail_booleans(this,[ 'automatic','hidden', 'rewrite' ]);
        b += pr.keyVal('platform', this.platform);
        b += pr.keyVal('modelPattern', this.modelPattern);
        b += pr.keyVal('gteVersion', this.gteVersion);
        b += pr.keyVal('ltVersion', this.ltVersion);

        if( this.subs != undefined && this.subs.values.length > 0 ) {
            b += pr.complete(this.subs);
        }

        return b; // + printComplete(this['definition']);
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

    var w = pr.complete(new Using(null,null,usings[e.id]));

    $("<div/>", {
        "id" : "usings-detail",
        "uid" : e.id,
        "class": "usings-window",
        html: w
    }).appendTo("body");
};
