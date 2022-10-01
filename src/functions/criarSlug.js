export default function criarSlug(string, numberRandom = true) {
    let nAleatorio = "0";
    if(numberRandom){
        nAleatorio = Math.floor((Math.random() * 9999) + 99);
    }
    let str = String(string + "-" + nAleatorio);

    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáãäâãèéëêìíïîòóõöôùúüûñç·/_,:;";
    var to = "aaaaaaeeeeiiiiooooouuuunc------";

    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    str = str.trim();
    str = str.replace(/\s/g, '');

    return str;
}