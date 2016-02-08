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

        var encoded = "&lt;style type=&quot;text/css&quot;&gt;    .change {        padding-left: 50px;        position: relative;        font-size: 38px;        vertical-align: baseline;    }    .changePos:before {        background: url(https://d28q98t4icjy0h.cloudfront.net/assets/icons-sa0eda6ec8d-69ac5b493d293863b7c7a8f7f8698e17.png) no-repeat;        content: &quot;&quot;;        background-position: 0 -2551px;        display: block;        height: 36px;        left: 0;        position: absolute;        top: 6px;        width: 36px;        vertical-align: middle;    }    .changeNeg:before {        background: url(https://d28q98t4icjy0h.cloudfront.net/assets/icons-sa0eda6ec8d-69ac5b493d293863b7c7a8f7f8698e17.png) no-repeat;        content: &quot;&quot;;        background-position: 0 -2439px;        display: block;        height: 36px;        left: 0;        position: absolute;        top: 6px;        width: 36px;        vertical-align: middle;    }    .changePos {        color: #78AB49;    }    .changeNeg {        color: #78AB49;    }    .changeNeg {        color: #9d3926;    }&lt;/style&gt;&lt;div&gt;    &lt;div style=&quot;font-size:60px;&quot; class=&quot;absVal&quot;&gt;137,5K&lt;/div&gt;    &lt;div class=&quot;change changeNeg&quot;&gt;        &lt;span class=&quot;changeVal&quot;&gt;4,53&amp;euro;&lt;/span&gt;&lt;span class=&quot;changePer&quot; style=&quot;padding-left:20px&quot;&gt;2.96%&lt;/span&gt;    &lt;/div&gt;&lt;/div&gt;";
        this.view.html($('<div/>').html(encoded).text());
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
            $('#' + me.divid + ' .change').toggleClass("changePos");
            $('#' + me.divid + ' .change').toggleClass("changeNeg");
        }

    };


    return function (configObject) { return new _ScalarChange.prototype.constructor(configObject); };
});