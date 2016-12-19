/**
 * Created by kubasek on 11/29/2016.
 */
function Otop() {
    Otop(this);
}

// zobrazeni a prace s objektem
function Otop(t) {

    t._id = 'undefined';
    t._key = 'undefined';
    t._classes = 'detail-block';

    t.detail = function() {
        return
        '<div id="' + this._key + '_' + this._id
            + '" pid="'+this._id
            + '" + class="'+this._classes+' key-' + this._key + '">'
            + this.html()
            + '</div>';
    };

    t.onEdit = function() {
        return null;
    };

    t.onClick = function() {
        return null;
    };

    t.onFocus = function() {
        return null;
    };

    t.html = function() {
        return '';
    };
};


// zobrazeni a prace s boxem ( necim v cem se zobrazuji objekty
function BoxOtop(t) {

    t._key = 'undefined';
    t._id = 'undefined';
    t._classes = 'undefined';

    t.html = function() {
        return '';
    };

    t.show = function() {

        var w = pr.complete(new TypeData(byId(e.id)));

        $("<div/>", {
            "id": this._id,
            "class": this._classes,
            html: this.html()
        }).appendTo("body");
    };

    t.remove = function() {
        $("#" + this._id).remove();
    };
};