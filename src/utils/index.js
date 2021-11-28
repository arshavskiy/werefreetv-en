const utils = {};

utils.canIsue = (obj, name) => {
    return obj[name];
}

utils.stringToUTF16 = string => {

    let UTF = string.split('').map(s => {
        return s.charCodeAt(0);
    })

    return UTF.join('-');
}

utils.dateForamt = data => {
    // const options = {
    //   year: 'numeric',
    //   month: 'numeric',
    //   day: 'numeric'
    // };
    return new Date(data).toLocaleDateString('en-GB');
}

utils.stringFromTF16 = array => {
    let arr = array.split('-');
    arr = arr.map(char => {
        return String.fromCharCode(char)
    })
    return arr.join('').replaceAll(',', '');
}

utils.cookieParser = val => {
    let tempVal = utils.stringFromTF16(val);
    let temp = document.cookie.split('; ').find(row => row.startsWith(tempVal + '='))
    if (temp) {
        return temp.split('=')[1];
    }
    return false;
}

utils.setCookie = (name, value, options) => {

    options = {
        path: '/survey',
        // add other defaults here if necessary
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

utils.slugToHebrew = text => {
    const sets = [{
        to: 'א',
        from: '[a]'
    },
        {
            to: 'ב',
            from: '[b]'
        },
        {
            to: 'ג',
            from: '[c]'
        },
        {
            to: 'ד',
            from: '[d]'
        },
        {
            to: 'ה',
            from: '[e]'
        },
        {
            to: 'ו',
            from: '[g]'
        },
        {
            to: 'ז',
            from: '[h]'
        },
        {
            to: 'ח',
            from: '[i]'
        },
        {
            to: 'ט',
            from: '[j]'
        },
        {
            to: 'י',
            from: '[ij]'
        },
        {
            to: 'כ',
            from: '[k]'
        },
        {
            to: 'ך',
            from: '[ks]'
        },
        {
            to: 'ל',
            from: '[l]'
        },
        {
            to: 'מ',
            from: '[m]'
        },
        {
            to: 'ם',
            from: '[ms]'
        },
        {
            to: 'נ',
            from: '[n]'
        },
        {
            to: 'ן',
            from: '[ns]'
        },
        {
            to: 'ס',
            from: '[o]'
        },
        {
            to: 'ע',
            from: '[oe]'
        },
        {
            to: 'פ',
            from: '[p]'
        },
        {
            to: 'ר',
            from: '[r]'
        },
        {
            to: 'ש',
            from: '[s]'
        },
        {
            to: 'ק',
            from: '[ck]'
        },
        {
            to: 'ת',
            from: '[t]'
        },
        {
            to: '-',
            from: '[ ]'
        }
    ];

    sets.forEach(set => {
        text = text.replace(new RegExp(set.from, 'gi'), set.to)
    });

    return text

}

utils.contains_heb = str => {
    return (/[\u0590-\u05FF]/).test(str);
}

utils.slugify = text => {
    text = text.toString().toLowerCase().trim();
    let map = text.split('');

    const sets = [{
        to: 'a',
        from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶἀא]'
    },
        {
            to: 'b',
            from: '[bב]'
        },
        {
            to: 'c',
            from: '[ÇĆĈČג]'
        },
        {
            to: 'd',
            from: '[ÐĎĐÞד]'
        },
        {
            to: 'e',
            from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆה]'
        },
        {
            to: 'g',
            from: '[ĜĞĢǴו]'
        },
        {
            to: 'h',
            from: '[ĤḦז]'
        },
        {
            to: 'i',
            from: '[ÌÍÎÏĨĪĮİỈỊח]'
        },
        {
            to: 'j',
            from: '[Ĵט]'
        },
        {
            to: 'ij',
            from: '[Ĳי]'
        },
        {
            to: 'k',
            from: '[Ķכ]'
        },
        {
            to: 'l',
            from: '[ĹĻĽŁל]'
        },
        {
            to: 'm',
            from: '[Ḿמ]'
        },
        {
            to: 'ms',
            from: '[ם]'
        },
        {
            to: 'n',
            from: '[ÑŃŅŇנ]'
        },
        {
            to: 'ns',
            from: '[ן]'
        },
        {
            to: 'o',
            from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠס]'
        },
        {
            to: 'oe',
            from: '[Œע]'
        },
        {
            to: 'p',
            from: '[ṕפ]'
        },
        {
            to: 'r',
            from: '[ŔŖŘר]'
        },
        {
            to: 's',
            from: '[ßŚŜŞŠȘש]'
        },
        {
            to: 'ck',
            from: '[ק]'
        },
        {
            to: 't',
            from: '[ŢŤת]'
        },
        {
            to: 'u',
            from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]'
        },
        {
            to: 'w',
            from: '[ẂŴẀẄ]'
        },
        {
            to: 'x',
            from: '[ẍ]'
        },
        {
            to: 'y',
            from: '[ÝŶŸỲỴỶỸ]'
        },
        {
            to: 'z',
            from: '[ŹŻŽ]'
        },
        {
            to: '-',
            from: '[·/_,:;\']'
        },
    ];

    sets.forEach(set => {
        map = map.map(char => {
            if (char) {


                char.replace(/\s+/g, '-') // Replace spaces with -
                    .replace(new RegExp(set.from, 'gi'), set.to)
                    .replace(/[^-a-zа-я\u0370-\u03ff\u1f00-\u1fff]+/g, '') // Remove all non-word chars
                    .replace(/--+/g, '-') // Replace multiple - with single -
                    .replace(/^-+/, '') // Trim - from start of text
                    .replace(/-+$/, '') // Trim - from end of text
            }
        })

        // text = text.replace(new RegExp(set.from,'gi'), set.to)
    });

    return map

}

export {
    utils as utils
}