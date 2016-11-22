var typeSettings = [
    { num: 0x00001, text: 'NULLABLE', notes: 'command [$value], no command [[$value]]'},
    { num: 0x00002, text: 'BOOTH', notes: 'command [$value], no command [$value]' },
    { num: 0x00004, text: 'INDELIBLE_BY_NO', notes: 'prikaz nelze smazat pomoci NO' },
    { num: 0x00008, text: 'DIFF_COMPARABLE', notes: 'oznacuje prikaz jako diff Comparable' },
    { num: 0x00010, text: 'PHYSICAL', notes: 'oznacuje fyzicky nesmazatelny prikaz' },
    { num: 0x00100, text: 'HIDDEN_IF_NO', notes: 'upravuje visibilitu, kdyz je prikaz NO je neviditelny' },
    { num: 0x00200, text: 'HIDDEN_IF_NOT_NO', notes: 'upravuje visibilitu, prikaz ktery neni NO je neviditelny' },
    { num: 0x00400, text: 'VISIBILITY_SWITCHER', notes: 'visibilita je urcena prvnim rewrite prikazem, oposite formy jsou viditelne opacne' },
    { num: 0x01000, text: 'OPOSITE_BY_NO', notes: 'vzdy se chova jako boolean prikaz, oposite urcuje nerovnost isNo()' },
    { num: 0x02000, text: 'REMOVE_BEFORE_MODIFY', notes: 'pro prikaz ktery v getCommandsTo potrebuje puvodni nejdrive odmazat ( pomoci no ), a pak teprve nastavit novy, tzn. neni prepisovatelny' }
    //{ num: 0x, text: '', notes: '' },
];


function typeSettings(sets) {

    var settings = [];
    $.each(typeSettings,function(key,val) {
        if( (val.num & sets) > 0) {
            settings.push(val.text);
        }
    });

    return settings;
}