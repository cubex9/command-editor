/**
 * Created by kubasek on 11/21/2016.
 */
var typesFuller = [];

function makeTypeFuller(data) {
    var res = "";
    $.each(data, function(key,val) {
        if( val != null ) {
            if (typeof(val) == "Object" ) {
                res += makeTypeFuller(val);
            } else {
                res += val;
            }
        }
    });

    return res;
};
