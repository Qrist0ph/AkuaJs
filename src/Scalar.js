define(['Core/CoreBundle'], function () {
    _Scalar.prototype = new Apple();        // Here's where the inheritance occurs 
    _Scalar.prototype.constructor = _Scalar;       // Otherwise instances of Cat would have a constructor of Mammal 
    function _Scalar(configObject) {
        Apple.call(this, configObject);
        this.newvalue = configObject.pkm0 ? configObject.pkm0 : T([]);
        this.oldvalue = configObject.pkm1 ? configObject.pkm1 : T([]);
        this.height = configObject.height ? configObject.height : 200;
    }


    //http://textmechanic.com/Add-Remove-Line-Breaks.html
    //http://www.htmlescape.net/htmlescape_tool.html
    //oder in Sublime \n ersetzen umd alles in eine zeile zu bekommen
    _Scalar.prototype.getView = function () {
        var me = this;
        this.view = $('<div id="' + me.divid + '" style="height:' + me.height + 'px" /> ');

        var template = "<style scoped>" +
            "    #" + me.divid + " .outer {" +
            "        display: table;" +
            "        height: 100%;" +
            "        width: 100%;" +
            "    }" +
            "" +
            "   #" + me.divid + "  .middle {" +
            "        display: table-cell;" +
            "        vertical-align: middle;" +
            "    }" +
            "" +
            "    #" + me.divid + " .inner {" +
            "        margin-left: auto;" +
            "        margin-right: auto;" +
            "        text-align: center;" +
            "    }" +
            "</style>" +
            "<div class='outer'>" +
            "    <div class='middle'>" +
            "        <div class='inner'>" +
            "           <strong class='absValue visible-md visible-lg' style='font-size:5.5vw; white-space: nowrap;'>104.133 €</strong>" +
            "           <strong class='absValue visible-sm visible-xs' style='font-size:5.5em; white-space: nowrap;'>104.133 €</strong>" +
            "        </div>" +
            "    </div>" +
            "</div>";
        this.view.html(template);
        return this.view;
    };

    _Scalar.prototype.updateValues = function () {
        var me = this;
        var newVal = this.getValue(this.newvalue);
        $('#' + me.divid + ' .absValue').html(Number(newVal).formatMoney(0, ',', '.', ' &euro;'));




    };


    return function (configObject) { return new _Scalar.prototype.constructor(configObject); };
});