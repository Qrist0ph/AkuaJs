define(['Core/CoreBundle'], function () {
    MultiSelectJqueyUi.prototype = new Apple();        // Here's where the inheritance occurs 
    MultiSelectJqueyUi.prototype.constructor = MultiSelectJqueyUi;       // Otherwise instances of Cat would have a constructor of Mammal 

    function MultiSelectJqueyUi(configObject) {
        Apple.call(this, configObject);
        this.options = configObject.axis0.Tuples().ToArray();
        var me = this;
    }


    MultiSelectJqueyUi.prototype.getSelection = function () {
        var r = [];
        $(".ui-selected").each(function (k, v) {
            r.push($(v).parent().data('payload'));
        });
        if (r.length == 0) r.push(T([]));
        return Enumerable.From(r);
    }

    MultiSelectJqueyUi.prototype.getView = function () {

        var me = this;
        this.view = $(text);

        $.each(this.options, function (i, v) {
            $(me.view.children()[1]).append(
                //http://de.wikipedia.org/wiki/Liste_der_politischen_Parteien_in_Deutschland
                $('<li class="wrapper"></li>').html('<div class="ui-state-default parteiButton"><img style="vertical-align: middle" src="Content/Logos/' + v.ToCaption().toLowerCase() + '.png" /></div>').data('payload', v)
            );
        });

        me.view.children().children().click(function () {
            $(this).children().toggleClass("ui-selected");
            if (me.parent) me.parent.onSelectionChanged(me);
        });


        return this.view;
    };


    MultiSelectJqueyUi.prototype.updateValues = function () {

    };


    var text = '<div> \
    <style> \
#feedback { font-size: 1.4em; } \
#selectable .ui-selectedd {  background: #F00 ;  } \
#selectable { list-style-type: none; margin: 0; padding: 0; } \
#selectable li { margin: 3px; padding: 1px; float: left;  height: 60px;  text-align: center; } \
.parteiButton     {height: 55px;display:table-cell; vertical-align:middle;} \
.wrapper {display:table;} \
        </style> \
    <ol id="selectable"></div>';

    return function (configObject) { return new MultiSelectJqueyUi.prototype.constructor(configObject); };
});