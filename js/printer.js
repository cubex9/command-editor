/**
 * Created by kubasek on 11/25/2016.
 */
function InPrinter(t) {


    t.head = function () {
        return '<div class="detail-block detail-' + this._t + '">';
    };

    t.foot = function () {
        return '</div>';
    };
};


function Printer() {

    this.keyVal = function(key, val) {
        return '<div class="detail key-' + key + '">' + key + ": " + val + '</div>';
    };

    this.val = function(key, val) {
        return '<div class="detail key-' + key + '">' + val + '</div>';
    };

    this.ins = function( t, vals ) {
        var res = '<div class="detail">';
        for( var v in vals ) {
            if( t[vals[v]] == undefined ) {
                res += '<div class="detail-in">' + '&nbsp' + vals[v] + '&nbsp' +  '</div>';
            } else {
                res += '<div class="detail-in key-' + vals[v] + '">' + t[vals[v]] + '</div>';
            }
        }
        return res + '</div>';
    };

    this.in = function( key, val ) {
        return '<div class="detail-in key-' + key + '">'+  val + '</div>';
    };

    this.settings = function(type, val) {
        if (val != null && val != 0) {

            var b = '<div class="detail">';
            $.each(settings(type, val), function (key, val) {
                b += '<div class="key-settings">' + val + '</div>';
            });

            return b + '</div>';
        }
        return '';
    };

    this.booleans = function(t,keys) {
        //var b = '<div class="detail">';
        var b = '';
        for( k in keys ) {
            if( t[keys[k]] ) {
                b += '<div class="key-boolean-true">' + keys[k].substr(0,1) + '</div>';
            } else {
                b += '<div class="key-boolean-false">' + keys[k].substr(0,1) + '</div>';
            }
        }

        return b; // + '</div>';
    };

    this.complete = function(o) {
        if (o != undefined && o != null && o.header != undefined) {
            return o.header() + o.body() + o.footer();
        }
        return '';
    };
};

var pr = new Printer();
