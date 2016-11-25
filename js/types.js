/**
 * Created by kubasek on 11/14/2016.
 */
function byId(id) {
    for (p in types) {
        if (types[p].id == id) {
            return types[p];
        }
    }
};

/** mapuje json objekty do funkcnich objektu */
function typeMapper(t, o) {
    for (var prop in o) {
        if (prop == 'definition') {
            t[prop] = new Definition(o[prop]);
        } else if (o[prop] instanceof Array) {
            t[prop] = new List(prop, o[prop], function (t, k, o) {
                if (prop == 'subs') {
                    return new Using(t, k, o);
                } else {
                    return new Value(t, k, o);
                }
            });
        } else if (o[prop] instanceof Object) {
            t[prop] = new Value(prop, prop, o[prop]);
        } else {
            t[prop] = o[prop];
        }
    }
};

function TypeData(o) {

    this._t = 'type';
    InPrinter(this);

    this.id;
    this.identificator;
    this.definition;
    this.notes;
    this.signature;
    this.noSignature;

    this.header = function () {
        return this.head()

            + pr.val('id', this.id) + " | " + this.identificator
            + pr.val('signature', this.signature)
            + pr.val('notes', this.notes);
    };

    this.body = function () {
        return pr.complete(this['definition']);
    };

    this.footer = function () {
        return this.foot();
    };

    typeMapper(this, o);
};

function Definition(o) {

    this.ctype;
    this.identificator;
    this.keyword;

    this.header = function () {
        return '<div class="detail-block detail-definition">' + 'type | ' + this.ctype
            + pr.keyVal('keyword', this.keyword);
    };

    this.body = function () {
        var b = pr.settings('definition', this.settings);

        b += pr.complete(this['values']);
        b += pr.complete(this['validators']);
        b += pr.complete(this['dependences']);
        b += pr.complete(this['expects']);
        b += pr.complete(this['events']);

        return b;

    };

    this.footer = function () {
        return '</div>';
    };

    typeMapper(this, o);
};

function List(t, o, f) {

    this.key = t;
    this.values = [];

    this.header = function () {
        return '<div class="detail-block detail-' + this.key + '">' + '+ | ' + this.key;
    };

    this.body = function () {
        var b = '';
        for (prop in this.values) {
            b += pr.complete(this.values[prop]);
        }
        return b;
    };

    this.footer = function () {
        return '</div>';
    };


    for (var prop in o) {
        this.values[prop] = f(t, prop, o[prop]);
    }
};

function Value(t, k, o) {

    this._t = t;
    this._k = k;

    this.forbiden = function (prop) {
        return this[prop] == null || /^_.*/.test(prop) || prop == 'ctype' || prop == 'settings';
    };

    this.header = function () {
        return '<div class="detail-block detail-' + this._t + '">' + this._k + " | " + this.ctype;
    };

    this.body = function () {
        var b = pr.settings(this._t, this.settings);

        for (var prop in this) {
            if (!this.forbiden(prop)) {
                if (this[prop] instanceof Object) {
                    b += pr.complete(this[prop]);
                } else if (!(this[prop] instanceof Function)) {
                    b += pr.keyVal(prop, this[prop]);
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

    var w = pr.complete(new TypeData(byId(e.id)));

    $("<div/>", {
        "id": "type-detail",
        "class": "detail-window",
        html: w
    }).appendTo("body");
};

function removeTypeDetail() {
    $("#type-detail").remove();
};

