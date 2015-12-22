define(['core/CoreBundle', 'nv.d3.min'], function() {
_CompositeVisel.prototype = new Apple();        // Here's where the inheritance occurs 
_CompositeVisel.prototype.constructor = _CompositeVisel;       // Otherwise instances of Cat would have a constructor of Mammal 
function _CompositeVisel(configObject) {
  
    Apple.call(this, configObject);
}



_CompositeVisel.prototype.getView = function () {
    var view = jQuery('<div id="' + guid() + '"> Composite View</div>');
    var me = this;
    $.each(this.children, function (key, value) {
        var id = guid();
        var subview = jQuery('<div id="' + id + '"> Sub View</div>');
        view.append(subview);
        value.getViewCaller(subview);
        view.append('</br></br></br>jajaj</br></br>');
    });
    return view;
};



return function (configObject) { return new _CompositeVisel.prototype.constructor(configObject); };
});