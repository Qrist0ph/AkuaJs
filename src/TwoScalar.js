define(['core/CoreBundle'], function () {
    _TwoScalar.prototype = new Apple();        // Here's where the inheritance occurs 
    _TwoScalar.prototype.constructor = _TwoScalar;       // Otherwise instances of Cat would have a constructor of Mammal 
    function _TwoScalar(configObject) {
        Apple.call(this, configObject);
        this.value1 = configObject.pkm0 ? configObject.pkm0 : T([]);
        this.value2 = configObject.pkm1 ? configObject.pkm1 : T([]);
        this.height = configObject.height ? configObject.height : 200;
    }

    //http://www.freeformatter.com/html-escape.htm
    //dann in Sublime \n ersetzen umd alles in eine zeile zu bekommen
    _TwoScalar.prototype.getView = function () {
        var me = this;
        this.view = $('<div id="' + me.divid + '" style="height:' + me.height + 'px" /> ');       

        var template = "<style scoped>        \
outer {\
display:table;\
height:100%;\
width:100%;\
}\
\
 #" + me.divid + " .middle {\
//display:table-cell;\
vertical-align:middle;\
text-align:center;\
}\
\
#" + me.divid + " .inner {\
margin-left:auto;\
margin-right:auto;\
}\
\
 #" + me.divid + " .changePositive {\
color:#78AB49;\
}\
\
 #" + me.divid + " .changeNegative {\
color:#9d3926;\
}\
    </style>\
<div class='outer'>\
   <div class='middle' >\
      <div class='inner' >\
         <div class='visible-md visible-lg'> <h1 style='font-size: 3.0vw;' class='changePositive changeVal'><strong>104.133,46 €</strong></h1>\
         <h1 style='font-size: 3.0vw;' class='changePositive changePercent'>                        <strong>                            104,46 %                        </strong>                    </h1>\
       </div></div>\
        \
        \
        <div class='inner'> \
          <div class='visible-sm visible-xs'><h1 style='font-size:3.0em;' class='changePositive changeVal'><strong>104.133,46 €</strong></h1>\
         <h1 style='font-size:3.0em; ' class='changePositive changePercent'>                        <strong>                            104,46 %                        </strong>                    </h1>\
      </div></div>\
   </div>\
</div>";

        //this.view.html($('<div/>').html(encoded).text());
        this.view.html(template);
        return this.view;
    };

    _TwoScalar.prototype.updateValues = function () {
        var me = this;
        var value1 = this.getValue(this.value1);
        var value2 = this.getValue(this.value2);

        $('#' + me.divid + ' .changeVal').html("<strong>" + Number(value1).formatMoney(2, ',', '.', ' &euro;') + "</strong>");

        $('#' + me.divid + ' .changePercent').html("<strong>" + Number(value2).formatMoney(2, ',', '.', ' %') + "</strong>");

        if (value1 < 0) {
            $('#' + me.divid + ' .changeVal').toggleClass("changePositive");
            $('#' + me.divid + ' .changeVal').toggleClass("changeNegative");
            $('#' + me.divid + ' .changePercent').toggleClass("changePositive");
            $('#' + me.divid + ' .changePercent').toggleClass("changeNegative");
        }

        if (value2 >= 0) {

        }

    };


    return function (configObject) { return new _TwoScalar.prototype.constructor(configObject); };
});