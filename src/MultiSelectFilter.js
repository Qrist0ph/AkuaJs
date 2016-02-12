define(['core/CoreBundle'], function () {
    MultiSelectFilter.prototype = new Apple();        // Here's where the inheritance occurs 
    MultiSelectFilter.prototype.constructor = MultiSelectFilter;       // Otherwise instances of Cat would have a constructor of Mammal 

    function MultiSelectFilter(configObject) {
        Apple.call(this, configObject);       
        var me = this;
    }


    MultiSelectFilter.prototype.getSelection = function () {
        var r = [];
        $(".ui-selected").each(function (k, v) {
            r.push(jQuery(v).data('payload'));
        });
        if (r.length == 0) r.push(T([]));
        return Enumerable.From(r);
    }

    MultiSelectFilter.prototype.getView = function () {

		   var text = '<div> \
	<style> \
#feedback { font-size: 1.4em; } \
#selectable .ui-selecting { background: #FECA40; } \
#selectable .ui-selected { background: #F39814; color: white; } \
#selectable { list-style-type: none; margin: 0; padding: 0; width: 350px; } \
#selectable li { margin: 3px; padding: 1px; float: left; width: 90px; height: 60px;  text-align: center; } \
</style> \
	<ol id="selectable" /></div><div style = "clear: both;" />';
	
        var me = this;
        this.view = $(text);

        $.each(me.axis0.Tuples().ToArray(), function (i, v) {
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


    MultiSelectFilter.prototype.updateValues = function () {

    };


 

    return function (configObject) { return new MultiSelectFilter.prototype.constructor(configObject); };
});