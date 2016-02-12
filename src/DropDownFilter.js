define(['core/CoreBundle'], function() {
	DropDownFilter.prototype = new Apple();        // Here's where the inheritance occurs 
	DropDownFilter.prototype.constructor=DropDownFilter;       // Otherwise instances of Cat would have a constructor of Mammal 
	function DropDownFilter(configObject){ 	
		Apple.call(this, configObject);
		this.options=configObject.axis0;			
	} 
	
	
	DropDownFilter.prototype.getSelection = function() {    
		r =[];
		$("option:selected", this.view).each(function(){
			r.push(jQuery(this).data());
		});
		return Enumerable.From(r);
	}
	
	DropDownFilter.prototype.getView = function() {
		this.view = jQuery("<select></select>");
		var me = this;	
		var optionse = this.options.Tuples().ToArray();
		//var options = this.options;
		$.each(optionse,function (i,v) {
			me.view.append(
				$('<option></option>').val(v.toString()).html(v.toString()).data(v)
			);
		});
		
		var me = this;
		this.view.change( function(){me.selectionCallback()});
			
		return this.view;
	};
	
	
	DropDownFilter.prototype.selectionCallback = function() {
		this.parent.onSelectionChanged(this);
		 /*
		 str="";
		 this.getSelection().each(function () {
			str += $(this).text() + " ";
		});
		*/
	};
	
	DropDownFilter.prototype.updateValues = function() {
		
	};
	return function (configObject) { return new DropDownFilter.prototype.constructor(configObject); };
});