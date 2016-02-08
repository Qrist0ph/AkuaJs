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
            r.push(jQuery(v).data('payload'));
        });
        if (r.length == 0) r.push(T([]));
        return Enumerable.From(r);
    }

    MultiSelectJqueyUi.prototype.getView = function () {

        var me = this;
        this.view = $(text);

        $.each(this.options, function (i, v) {
            jQuery(me.view.children()[1]).append(
				$('<li class="ui-state-default"></li>').html(v.ToCaption()).data('payload', v)
			);
        });

        me.view.children().children().click(function () {
            $(this).toggleClass("ui-selected");
            if (me.parent) me.parent.onSelectionChanged(me);
        });


        return this.view;
    };


    MultiSelectJqueyUi.prototype.updateValues = function () {

    };


    var text = '<div> \
	<style> \
#feedback { font-size: 1.4em; } \
#selectable .ui-selecting { background: #FECA40; } \
#selectable .ui-selected { background: #F39814; color: white; } \
#selectable { list-style-type: none; margin: 0; padding: 0; width: 350px; } \
#selectable li { margin: 3px; padding: 1px; float: left; width: 90px; height: 60px;  text-align: center; } \
</style> \
	<ol id="selectable"></div>';

    return function (configObject) { return new MultiSelectJqueyUi.prototype.constructor(configObject); };
});