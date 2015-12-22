define(['core/CoreBundle'], function() {
	MultiSelect.prototype = new Apple();        // Here's where the inheritance occurs 
	MultiSelect.prototype.constructor=MultiSelect;       // Otherwise instances of Cat would have a constructor of Mammal 
	function MultiSelect(configObject){ 	
		Apple.call(this, configObject);
		this.options=configObject.axis0;			
	} 
	
	
	MultiSelect.prototype.getSelection = function() {    
		r =[];
		$("option:selected", this.view).each(function(){
			r.push(jQuery(this).data());
		});
		return Enumerable.From(r);
	}
	
	MultiSelect.prototype.getView = function() {
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
	
	
	MultiSelect.prototype.selectionCallback = function() {
		this.parent.onSelectionChanged(this);
		 /*
		 str="";
		 this.getSelection().each(function () {
			str += $(this).text() + " ";
		});
		*/
	};
	
	MultiSelect.prototype.updateValues = function() {
		
	};
	return function (configObject) { return new MultiSelect.prototype.constructor(configObject); };
});