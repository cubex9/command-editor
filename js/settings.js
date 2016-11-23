var translateSettings = [];
translateSettings['definition'] = [
    {num: 0x00001, text: 'NULLABLE', notes: 'command [$value], no command [[$value]]'},
    {num: 0x00002, text: 'BOOTH', notes: 'command [$value], no command [$value]'},
    {num: 0x00004, text: 'INDELIBLE', notes: 'prikaz nelze smazat pomoci NO'},
    {num: 0x00008, text: 'DIFF COMP', notes: 'oznacuje prikaz jako diff Comparable'},
    {num: 0x00010, text: 'PHYSICAL', notes: 'oznacuje fyzicky nesmazatelny prikaz'},
    {num: 0x00100, text: 'HIDDEN NO', notes: 'upravuje visibilitu, kdyz je prikaz NO je neviditelny'},
    {num: 0x00200, text: 'HIDDEN NOT NO', notes: 'upravuje visibilitu, prikaz ktery neni NO je neviditelny'},
    {
        num: 0x00400,
        text: 'VIS SWITCH',
        notes: 'visibilita je urcena prvnim rewrite prikazem, oposite formy jsou viditelne opacne'
    },
    {
        num: 0x01000,
        text: 'OPOSITE BY NO',
        notes: 'vzdy se chova jako boolean prikaz, oposite urcuje nerovnost isNo()'
    },
    {
        num: 0x02000,
        text: 'REM BEF MOD',
        notes: 'pro prikaz ktery v getCommandsTo potrebuje puvodni nejdrive odmazat ( pomoci no ), a pak teprve nastavit novy, tzn. neni prepisovatelny'
    }
];

translateSettings['values'] = [
    {text: 'IDENTITY', num: 0x0001, notes: 'oznacuje identitu'},
    {text: 'INNO', num: 0x0002, notes: 'je i v no- variante prikazu'},
    {text: 'NULLABLE', num: 0x0004, notes: 'neni povinna, muze byt null, optional'},
    {text: 'NOT SPACE', num: 0x0008, notes: 'pred hodnotou neni mezera'},
    {text: 'DIFF COMP', num: 0x0010, notes: 'hodnota se porovnava primo jako value ne v ramci celeho prikazu'},
    {text: 'OPT SPACE', num: 0x0020, notes: 'mezera neni povinna, pri tisku se ridi podle NOT_SPACE'}
];

translateSettings['target'] = [
    { text: 'ROOT', num: 0x01, notes: 'hledani cile zacina v rootu'},
    { text: 'MULTIPLE', num: 0x02, notes: 'vicenasobny vysledek'}
];


function settings(type, sets) {

    var settings = [];
    $.each(translateSettings[type], function (key, val) {
        if ((val.num & sets) > 0) {
            settings.push(val.text);
        }
    });

    return settings;
};