define(['Core/CoreBundle'], function () {
    _ScalarChange.prototype = new Apple();        // Here's where the inheritance occurs 
    _ScalarChange.prototype.constructor = _ScalarChange;       // Otherwise instances of Cat would have a constructor of Mammal 
    function _ScalarChange(configObject) {
        Apple.call(this, configObject);
        this.newvalue = configObject.pkm0 ? configObject.pkm0 : T([]);
        this.oldvalue = configObject.pkm1 ? configObject.pkm1 : T([]);
        this.height = configObject.height ? configObject.height : 200;
    }

    //http://www.freeformatter.com/html-escape.htm
    //dann in Sublime \n ersetzen umd alles in eine zeile zu bekommen
    _ScalarChange.prototype.getView = function () {
        var me = this;
        this.view = $('<div id="' + me.divid + '" style="height:' + me.height + 'px" /> ');


        var template = "<style type='text/css'>" +
            "  #" + me.divid + "  .change {" +
            " " +
            "        position: relative;" +
            "        vertical-align: baseline;" +
            "    }" +
            "" +
            " #" + me.divid + "    .changePoss:before {" +
            "       // background: url(/content/boardIcons.png) no-repeat;" +
            "        content: '<i class='fa fa-caret-up' style='font-size:5vw;'>';" +
            "        background-position: 0 -2551px;" +
            "        display: block;" +
            "        height: 36px;" +
            "        left: 20;" +
            "        position: absolute;" +
            "        top: 6px;" +
            "        width: 36px;" +
            "        vertical-align: middle;" +
            "    }" +
            "" +
            "   #" + me.divid + " .changeNegg:before {" +
            "        background: url(/content/boardIcons.png) no-repeat;" +
            "        content: '';" +
            "        background-position: 0 -2439px;" +
            "        display: block;" +
            "        height: 36px;" +
            "        left: 20;" +
            "        position: absolute;" +
            "        top: 6px;" +
            "        width: 36px;" +
            "        vertical-align: middle;" +
            "    }" +
            "" +
             "   #" + me.divid + " .foo {position: relative;bottom:-9px;font-size:4vw;}" +
            "  #" + me.divid + "  .changePos {" +
            "        color: #78AB49;" +
            "    }" +
            "" +
            "" +
            "  #" + me.divid + "  .changeNeg {" +
            "        color: #9d3926;" +
            "    }" +
            "#" + me.divid + "  .outer {" +
            "display:table;" +
            "height:100%;" +
            "width:100%;" +
            "}" +
            "" +
            " #" + me.divid + " .middle {" +
            "//display:table-cell;" +
            "vertical-align:middle;" +
            "text-align:center;" +
            "}" +
            "" +
            "#" + me.divid + " .inner {" +
            "margin-left:auto;" +
            "margin-right:auto;" +
            "}" +
            "</style><div class='outer'><div class='middle' ><div class='inner' >" +
            " <div class='visible-md visible-lg'>  " +
            "  <div style='font-size:3vw;' ><strong class='absVal'>137,5K</strong></div>" +
            "    <div class='change changeNeg'>" +
            "       <i class='fa fa-caret-down foo' ></i> <span class='changeVal' style='font-size:2vw;'>4,53&euro;</span>" +
            "        <span class='changePer' style='font-size:2vw; padding-left:20px'>2.96%</span>" +
            "    </div>" +
            "</div>" +
             " <div class='visible-sm visible-xs'>  " +
            "  <div style='font-size:3em;' ><strong class='absVal'>137,5K</strong></div>" +
            "    <div class='change changeNeg'>" +
            "       <i class='fa fa-caret-down foo' style='font-size:4em' ></i> <span class='changeVal' style='font-size:2em;'>4,53&euro;</span>" +
            "        <span class='changePer' style='font-size:2em; padding-left:20px'>2.96%</span>" +
            "    </div>" +
            "</div>" +
            "</div></div></div>";
        this.view.html(template);
        return this.view;
    };

    _ScalarChange.prototype.updateValues = function () {
        var me = this;
        var oldVal = this.getValue(this.oldvalue);
        var newVal = this.getValue(this.newvalue);
        $('#' + me.divid + ' .absVal').html(Number(newVal).formatMoney(2, ',', '.', '&euro;'));

        $('#' + me.divid + ' .changeVal').html(Number(newVal - oldVal).formatMoney(2, ',', '.', '&euro;'));

        $('#' + me.divid + ' .changePer').html(Number((Math.abs((newVal / oldVal) - 1)) * 100).formatMoney(2, ',', '.', '%'));

        if (newVal >= oldVal) {
        //if (newVal < oldVal) {
            $('#' + me.divid + ' .change').toggleClass("changePos");
            $('#' + me.divid + ' .change').toggleClass("changeNeg");
            $('#' + me.divid + ' .fa').toggleClass("fa-caret-up");
            $('#' + me.divid + ' .fa').toggleClass("fa-caret-down");
        }



    };


    return function (configObject) { return new _ScalarChange.prototype.constructor(configObject); };
});