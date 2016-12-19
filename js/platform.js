/**
 * Created by kubasek on 12/19/2016.
 */
var platforms = [];

function loadPlatforms(url) {
    $.getJSON(url + 'platforms', function(data) {
        for (var i = 0; i < data.length; i++) {
            platforms.push( new Platform(data[i]));
        }
    });
};

function Platform(o) {
    Otop(this);

    this._key = 'platform';
    this._id = o.id;
    this._classes = 'detail-menu';

    this.name = o.designation;

    this.html = function() {
        return this._id + " | " + this.name;
    };
};