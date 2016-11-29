var tests = [];

function loadTests(url) {
    $.getJSON(url, function(data) { tests = data; });
};

function linkTests(id) {
    var res = [];
    for( t in tests ) {
        if( tests[t].defId == id) {
            res.push(tests[t]);
        }
    }
    return res;
};

function Test(t,k,o) {

    this._t;
    this._k;

    this.id;
    this.difId;
    this.type;
    this.conf;
    this.exp;
    this.status;
    this.message;

    this.header = function () {
        return '<div class="detail detail-test">';
    };

    this.body = function () {

        var b = pr.ins(this,[ 'conf','-&gt','exp' ]);

        return b;

    };

    this.footer = function () {
        return '</div>';
    };

    typeMapper(this, o);
};