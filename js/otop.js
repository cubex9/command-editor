/**
 * Created by kubasek on 11/29/2016.
 */
function Otop() {
    Otop(this);
}

function Otop(t) {

    t._id = 'undefined';
    t._key = 'undefined';
    t._html = 'undefined';
    t._classes = '';

    t.detail = function() {
        return '<div id="'+this._id+'" + class="'+this._classes+' key-' + this._key + '">' + this._html + '</div>';
    };

    t.edit = function() {
    };

    t.onClick = function() {
    };

    t.onFocus = function() {
    };
}
