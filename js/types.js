/**
 * Created by kubasek on 11/14/2016.
 */
function byId(id) {
    for( p in types ) {
        if( types[p].id == id) {
            return types[p];
        }
    }
};

/** mapuje json objekty do funkcnich objektu */
function typeMapper(t, o) {
    for (var prop in o) {
        if (prop == 'definition') {
            t[prop] = new Definition(o[prop]);
        } else if (o[prop] instanceof Array ) {
            t[prop] = new List(prop, o[prop], function (t, k, o) {
                return new Value(t, k, o);
            });
        } else if( o[prop] instanceof Object ) {
            t[prop] = new Value(prop,prop,o[prop]);
        } else {
            t[prop] = o[prop];
        }
    }
};

function detail_key(key, val) {
    return '<div class="detail key-' + key + '">' + key + ": " + val + '</div>';
};

function detail_no_key(key, val) {
    return '<div class="detail key-' + key + '">' + val + '</div>';
}

function detail_settings(type,val) {
    if( val != null && val != 0 ) {

        var b = '<div class="detail">';
        $.each(settings(type, val), function (key, val) {
            b += '<div class="key-settings">' + val + '</div>';
        });

        return b + '</div>';
    }
    return '';
};

function printComplete(o) {
    if (o != undefined && o != null && o.header != undefined) {
        return o.header() + o.body() + o.footer();
    }
    return '';
};

function TypeData(o) {

    this.id;
    this.identificator;
    this.definition;
    this.notes;
    this.signature;
    this.noSignature;

    this.header = function () {
        return '<div class="detail-block detail-type">' + detail_no_key('id',this.id) + " | " + this.identificator
            + detail_no_key('signature', this.signature)
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

function Definition(o) {

    this.ctype;
    this.identificator;
    this.keyword;

    this.header = function () {
        return '<div class="detail-block detail-definition">' + 'type | ' + this.ctype
            + detail_key('keyword', this.keyword);
    };

    this.body = function () {
        var b = detail_settings('definition',this.settings);

        b += printComplete(this['values']);
        b += printComplete(this['validators']);
        b += printComplete(this['dependences']);
        b += printComplete(this['expects']);
        b += printComplete(this['events']);

        return b;

    };

    this.footer = function () {
        return '</div>';
    };

    typeMapper(this, o);
};

function List(t,o,f) {

    this.key = t;
    this.values = [];

    this.header = function () {
        return '<div class="detail-block detail-'+this.key+'">' + '+ | ' + this.key;
    };

    this.body = function () {
        var b = '';
        for( prop in this.values) {
            b += printComplete(this.values[prop]);
        }
        return b;
    };

    this.footer = function () {
        return '</div>';
    };


    for( var prop in o ) {
        this.values[prop] = f(t,prop,o[prop]);
    }
};

function Value(t,k,o) {

    this._t = t;
    this._k = k;

    this.forbiden = function( prop ) {
        return this[prop] == null || /^_.*/.test(prop) || prop == 'ctype' || prop == 'settings';
    };

    this.header = function () {
        return '<div class="detail-block detail-'+this._t+'">' + this._k + " | " + this.ctype;
    };

    this.body = function () {
        var b = detail_settings(this._t,this.settings);

        for(var prop in this) {
            if( !this.forbiden(prop) ) {
                if (this[prop] instanceof Object) {
                    b += printComplete(this[prop]);
                } else if (!(this[prop] instanceof Function)) {
                    b += detail_key(prop, this[prop]);
                }
            }
        }

        return b;
    };

    this.footer = function () {
        return '</div>';
    };

    typeMapper(this, o);
};


var types = new Array();

function printType(data) {

    var t = data.definition.ctype;
    var k = t == "class" ? data.definition.cls.replace("eu.teta.tomatoes.conf.commands.", "") : data.definition.keyword;

    t = t.replace(/list-|multiple-|vlan-range-|ip-|iface-/g, "")
    return '<div id="' + data.id + '" class="signature ' + t + '" onmouseover="typeDetail(this);" onmouseout="removeTypeDetail();">' + data.identificator + '</div>';
};

function typeDetail(e) {

    var w = printComplete(new TypeData(byId(e.id)));

    $("<div/>", {
        "id": "type-detail",
        "class": "detail-window",
        html: w
    }).appendTo("body");
};


function typeDetail2(e) {
    var data = types[e.id];
    var w = "";

    $.each(data, function (key, val) {
        w += printDetail('definition', key, val);
    });

    $("<div/>", {
        "id": "type-detail",
        "class": "detail-window",
        html: w
    }).appendTo("body");
};

function removeTypeDetail() {
    $("#type-detail").remove();
}

function printDetail(type, key, val) {
    var res = "";

    if (val instanceof Array && val.length > 0 || val instanceof Object) {
        res += '<div class="detail-block detail-' + key + '">' + key;
        var supertype = translateSettings[key] == undefined ? type : key;
        $.each(val, function (key, val) {
            res += printDetail(supertype, key, val);
        });
        res += '</div>';
    } else if (val != null && val != 0) {
        if (key == 'ctype') {
            res += ' | ' + val;
        } else if (key == "settings") {
            res += '<div class="detail">';
            $.each(settings(type, val), function (key, val) {
                res += '<div class="key-settings">' + val + '</div>';
            });
            res += '</div>';
        } else {
            res += '<div class="detail key-' + key + '">' + key + ": " + val + '</div>';
        }
    }

    return res;
}

