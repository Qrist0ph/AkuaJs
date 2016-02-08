if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };
}


Number.prototype.formatMoney = function (c, d, t, symbol) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "") + symbol;
};


function RequiresAkuaJsPlus(libraries, handler) {
    Requires(['libs/jquery-ui', 'libs/linq.min', 'libs/underscore-min', 'libs/jshashtable-2.1', 'libs/d3.v3.min',
        'libs/nv.d3.min', 'Core/DSL', 'Core/Element', 'Core/Dimension', 'Core/VisEl', 'Core/Tuple', 'Core/Domain',
		'Core/Axis', 'Core/VisualGeruestQuery',
		'Core/SameDomainTupleList', 'Core/HyperCube', 'Core/MultiTupleFilter', 'Core/DataProvider', 'Core/Crosslist',
   'Libs/SlickGrid/lib/jquery.event.drag-2.2', 'Libs/SlickGrid/slick.core', 'libs/SlickGrid/slick.grid'].concat(libraries), handler);
}

// Loads libraries and then executes a handler function
function Requires(libraries, handler) {
    // Take first library from the list and load it
    var library = libraries[0];

    // Check if the library has not beed loaded yet
    if (typeof libraries_loaded == 'undefined')
        libraries_loaded = [];

    for (var i = 0; i < libraries_loaded.length; i++)
        if (libraries_loaded[i] == library)
            return;

    // Load script
    var head = document.getElementsByTagName('head').item(0);
    var js = document.createElement('script');

    js.setAttribute('language', 'javascript');
    js.setAttribute('type', 'text/javascript');

    // Initiate loading remainding libraries after this one has been loaded
    js.onload = function () {
        // Remove current library from list as loaded one
        libraries.shift();

        // If all libraries loaded call our code handler
        if (libraries.length == 0) {
            handler.call();
        } else {
            // If more libraries need to be loaded, do it
            Requires.apply(this, [libraries, handler]);
        }
    };

    //js.setAttribute('src', 'https://googledrive.com/host/0B2Od6vq-b27zNWxtRTlaWWJLUU0/AkuaJs/' + library + '.js');
    js.setAttribute('src', '/Scripts/AkuaJs/' + library + '.js');
    //js.setAttribute('src', library + '.js');

    // Add script element to DOM
    head.appendChild(js);

    // Add library to loaded libraries list
    libraries_loaded[libraries_loaded.length] = library;
}

function CssClassDefined(name) {
    var styles = $('head').children("style");
    for (var i = 0; i < styles.length; i++) {
        var text = $(styles[i]).html();
        if (text.indexOf("." + name) != -1) return true;
    }
    return false;
}


function ColorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        //c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        c = c == 0 ? Math.round(Math.min(c + 255 * lum), 255).toString(16) : c.toString(16);
        rgb += ("00" + c).substr(c.length);
    }

    return rgb;
}


function GetProjectionForOrderedSets(left, right) {
    var result = new Array();
    var rightCount = right.length;
    var leftCount = left.length;

    var r = 0, l = 0;
    while (r < rightCount && l < leftCount) {
        var comp = right[r].compareTo(left[l]);
        if (comp == 0) {
            result.push(l);
            result.push(r);
            l++;
            r++;
            continue;
        }

        if (comp == -1)
            r++;
        else
            l++;
    }
    return result;
}

function GetExceptProjectionForOrderedSets(left, right) {
    var result = new Array();
    var rightCount = right.length;
    var leftCount = left.length;

    var r = 0, l = 0, c = 0;;
    while (r < rightCount && l < leftCount) {
        var comp = right[r].compareTo(left[l]);
        if (comp == 0) {

            l++;
            r++;
            continue;
        }

        if (comp == -1)
            r++;
        else {
            result.push(l++);
            result.push(c++);
        }
    }
    while (l < leftCount) {
        result.push(l++);
        result.push(c++);
        r++;
    }
    return result;
}

function GetPermutation(ldims, rdims) {

    var result = new Array(ldims.length);
    for (var i = 0; i < ldims.length; i++) {
        result[i] = -1;
        var c = ldims[i];
        for (var j = 0; j < rdims.length; j++) {
            if (!c.equals(rdims[j])) continue;
            result[i] = j;
        }
    }
    return result;
}




function arraysEqual2(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

function arraysEqualHash(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (!arr1[i].equals(arr2[i]))
            return false;
    }

    return true;
}

function Serialize(vis) { return vis; }

function Selection(selection) { return selection; }



//-------------------------------

function ArrayIterator(array) {
    this.index = 0;
    this.array = array;
}

ArrayIterator.prototype.next = function () {
    if (this.index < this.array.length) return this.array[this.index++];
    return undefined;
}

ArrayIterator.prototype.reset = function () {
    this.index = 0;
    return this;
}
//-------------------------------



function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
};

function guid() {
    return "a" + s4() + s4();// + '-' + s4() + '-' + s4() + '-' +s4() + '-' + s4() + s4() + s4();
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}