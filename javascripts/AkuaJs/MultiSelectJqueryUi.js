define(["core/CoreBundle"],function(){function b(a){Apple.call(this,a);this.options=a.options}b.prototype=new Apple;b.prototype.constructor=b;b.prototype.getSelection=function(){var a=[];$(".ui-selected").each(function(b,c){a.push(jQuery(c).data("payload"))});0==a.length&&a.push(T([]));return Enumerable.From(a)};b.prototype.getView=function(){var a=this;this.view=$(d);$.each(this.options,function(b,c){jQuery(a.view.children()[1]).append($('<li class="ui-state-default"></li>').html(c.ToCaption()).data("payload",
c))});a.view.children().children().click(function(){$(this).toggleClass("ui-selected");if(a.parent)a.parent.onSelectionChanged(a)});return this.view};b.prototype.updateValues=function(){};var d='<div> \r\n\t<style> \r\n#feedback { font-size: 1.4em; } \r\n#selectable .ui-selecting { background: #FECA40; } \r\n#selectable .ui-selected { background: #F39814; color: white; } \r\n#selectable { list-style-type: none; margin: 0; padding: 0; width: 350px; } \r\n#selectable li { margin: 3px; padding: 1px; float: left; width: 90px; height: 60px;  text-align: center; } \r\n</style> \r\n\t<ol id="selectable"></div>';
return function(a){return new b.prototype.constructor(a)}});
