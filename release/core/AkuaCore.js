function _A(a,b){this.crosslists=a;this.Permutation=b}_A.prototype.toString=function(){s="A([";s+=this.crosslists.join(",");return s+"])"};_A.prototype.ToAkuaDsl=function(){return this.toString()};_A.prototype.Tuples=function(){var a=this,b=CartesianProduct(Enumerable.From(this.crosslists).Select(function(a){return a.Tuples()}).ToArray());0==b.length&&b.push(T([]));return Enumerable.From(b).Select(function(b){a.Permutation&&(b.Permutation=a.Permutation);return b})};function _TCL(a){this.tuples=a}_TCL.prototype.Tuples=function(){return Enumerable.From(this.tuples)};_TCL.prototype.toString=function(){s="TCL([";for(i=0;i<this.tuples.length;i++)s+=this.tuples[i].toString()+",";return s+"])"};_TCL.prototype.ToAkuaDsl=function(){return this.toString()};function _LocalCubeDataProvider(){}_LocalCubeDataProvider.prototype.ExecuteVisualGeruestQuery=function(a,b){if(b){var c=a.GetAllAusduennFilters(),d=b.Tuples();_.each(c.ToArray(),function(a,b){d=b.Filter(d)});return new _HyperCube(SDTL(d))}};function DataProviderFacaceAsync(a,b,c){c((new _LocalCubeDataProvider).ExecuteVisualGeruestQuery(a,b))};function _D(a){this.Caption=a}_D.prototype.equals=function(a){return a instanceof _D&&a.Caption===this.Caption};_D.prototype.compareTo=function(a){return this.Caption.localeCompare(a.Caption)};_D.prototype.toString=function(){return"D('"+this.Caption+"')"};_D.prototype.ToAkuaDsl=function(){return this.toString()};function BarChart(){return"BarChart"};function _Domain(a){this.Dimensions=a.sort(function(a,c){return a.Caption.localeCompare(c.Caption)});this.Length=a.length}_Domain.prototype.ToCaption=function(){s="";for(i=0;i<this.Dimensions.length;i++)s+=this.Dimensions[i].Caption+",";return s+""};_Domain.prototype.equals=function(a){return a instanceof _Domain&&arraysEqualHash(this.Dimensions,a.Dimensions)};_Domain.prototype.GetProjection=function(a){return GetProjectionForOrderedSets(this.Dimensions,a.Dimensions)};
_Domain.prototype.GetExceptProjection=function(a){return GetExceptProjectionForOrderedSets(this.Dimensions,a.Dimensions)};_Domain.prototype.ToAkuaDsl=function(){return this.toString()};function T(a,b){return new _T(a,b)}function TCL(a){return new _TCL(a)}function E(a,b){return new _E(a,b)}function D(a){return new _D(a)}function A(a){return new _A(a.crosslists,a.permutation)}function Domain(a){return new _Domain(a)}function SDTL(a){if(Array.isArray(a))return new _SDTL(Enumerable.From(a));if(!a.Select)throw"Error";return new _SDTL(a)}function HyperCube(a){return new _HyperCube(a)}function DumbTupleStore(a){return new _DumbTupleStore(a)}
function VGQ(a){return new _VisualGeruestQuery(a)}function LocalCubeConnection(a){return a}function MultiTupleFilter(a){return Array.isArray(a)?new _SDTL(Enumerable.From(a)):new _MultiTupleFilter(a)}function Enum(a){return Enumerable.From(a)};function _DumbTupleStore(a){if(!a.Tuples)throw"Feler";var b=this;this._sdtl=a;this._hashtable=new Hashtable;this._sdtl.Tuples().ForEach(function(a){b._hashtable.put(a,a.Payload)})}_DumbTupleStore.prototype.get=function(a){return this._hashtable.get(a)};_DumbTupleStore.prototype.Tuples=function(){return this._sdtl.Tuples()};_DumbTupleStore.prototype.ToAkuaDsl=function(){var a;a="DumbTupleStore("+this._sdtl.ToAkuaDsl();return a+")"};function _E(a,b){this.Dimension=a;this.Caption=b}_E.prototype.toString=function(){return"object"==typeof this.Caption?"E("+this.Dimension+",'"+JSON.stringify(this.Caption)+"')":"E("+this.Dimension+",'"+this.Caption+"')"};_E.prototype.equals=function(a){return a instanceof _E&&a.Dimension.equals(this.Dimension)&&a.toString()===this.toString()};_E.prototype.ToAkuaDsl=function(){return this.toString()};function _HyperCube(a){this._sdtl=a;this._memoizationFoldOnCubeCore=new Hashtable}_HyperCube.prototype.get=function(a){return this.FoldOnCubeCore(a.Domain()).get(a)};_HyperCube.prototype.Tuples=function(){return this._sdtl.Tuples()};_HyperCube.prototype.FoldOnCubeCore=function(a){var b=this._memoizationFoldOnCubeCore.get(a);if(b)return b;b=this._FoldOnCubeCore(a);this._memoizationFoldOnCubeCore.put(a,b);return b};
_HyperCube.prototype._FoldOnCubeCore=function(a){var b=new Hashtable;this.__FoldOnCubeCore(a).ForEach(function(a){b.put(a,a.Payload)});return b};_HyperCube.prototype.__FoldOnCubeCore=function(a){return FoldOn(this._sdtl,a)};_HyperCube.prototype.ToAkuaDsl=function(){var a;a="HyperCube("+this._sdtl.ToAkuaDsl();return a+")"};function _MultiTupleFilter(a){if(!a.Select)throw"Kein linqjs";this._tuples=a}_MultiTupleFilter.prototype.Filter=function(a){if(!a.Select)throw"Kein linqjs";return WhereExtends(a,this._tuples)};_MultiTupleFilter.prototype.ToAkuaDsl=function(){var a;a="MultiTupleFilter(["+this._tuples.Select(function(a){return a.ToAkuaDsl()}).ToArray().join(",");return a+"])"};function _SDTL(a){if(!a.Select)throw"Feler";this.tuplesLinq=a}_SDTL.prototype.ToAkuaDsl=function(){var a;a="SDTL(["+this.tuplesLinq.ToArray().join(" , ");return a+"])"};_SDTL.prototype.Tuples=function(){return this.tuplesLinq.Select(function(a){return a})};_SDTL.prototype.Domain=function(){var a=this.tuplesLinq.FirstOrDefault();return a?a.Domain():Domain([])};
function GroupTuplesBy(a,b){var c=a.Domain().GetProjection(b);a.Domain().GetExceptProjection(b);k=0;return a.Tuples().GroupBy(function(a){return a.ApplyProjection(c).toString()},null,function(a,b){return{Slicer:eval(a),SameDomainTuplesList:SDTL(b)}})}function FoldOn(a,b,c){return GroupTuplesBy(a,b).Select(function(a){var b=a.SameDomainTuplesList.Tuples().Select(function(a){return a.Payload}).Sum();a.Slicer.Payload=b;return a.Slicer})}
function WhereExtends(a,b){if(!a.Select||!b.Select)throw"kein linqjs supplied";return a.Where(function(a){return b.Any(function(b){return b.IsSubsetOf(a)})})};String.format||(String.format=function(a){var b=Array.prototype.slice.call(arguments,1);return a.replace(/{(\d+)}/g,function(a,d){return"undefined"!=typeof b[d]?b[d]:a})});Number.prototype.formatNumber=function(a){return this.formatMoney(a[0],a[1],a[2],a[3])};
Number.prototype.formatMoney=function(a,b,c,d){var f=this;a=isNaN(a=Math.abs(a))?2:a;b=void 0==b?".":b;c=void 0==c?",":c;var e=0>f?"-":"",g=parseInt(f=Math.abs(+f||0).toFixed(a))+"",h=3<(h=g.length)?h%3:0;return e+(h?g.substr(0,h)+c:"")+g.substr(h).replace(/(\d{3})(?=\d)/g,"$1"+c)+(a?b+Math.abs(f-g).toFixed(a).slice(2):"")+d};function CssClassDefined(a){for(var b=$("head").children("style"),c=0;c<b.length;c++)if(-1!=$(b[c]).html().indexOf("."+a))return!0;return!1}
function ColorLuminance(a,b){a=String(a).replace(/[^0-9a-f]/gi,"");6>a.length&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]);b=b||0;var c="#",d,f;for(f=0;3>f;f++)d=parseInt(a.substr(2*f,2),16),d=0==d?Math.round(Math.min(d+255*b),255).toString(16):d.toString(16),c+=("00"+d).substr(d.length);return c}function GetProjectionForOrderedSets(a,b){for(var c=[],d=b.length,f=a.length,e=0,g=0;e<d&&g<f;){var h=b[e].compareTo(a[g]);0==h?(c.push(g),c.push(e),g++,e++):-1==h?e++:g++}return c}
function GetExceptProjectionForOrderedSets(a,b){for(var c=[],d=b.length,f=a.length,e=0,g=0,h=0;e<d&&g<f;){var l=b[e].compareTo(a[g]);0==l?(g++,e++):-1==l?e++:(c.push(g++),c.push(h++))}for(;g<f;)c.push(g++),c.push(h++),e++;return c}function GetPermutation(a,b){for(var c=Array(a.length),d=0;d<a.length;d++){c[d]=-1;for(var f=a[d],e=0;e<b.length;e++)f.equals(b[e])&&(c[d]=e)}return c}function truncateString(a,b){return a.length>b?a.substr(0,b-1)+"&hellip;":a}
function arraysEqual2(a,b){if(a.length!==b.length)return!1;for(var c=a.length;c--;)if(a[c]!==b[c])return!1;return!0}function arraysEqualHash(a,b){if(a.length!==b.length)return!1;for(var c=a.length;c--;)if(!a[c].equals(b[c]))return!1;return!0}function Serialize(a){return a}function Selection(a){return a}function ArrayIterator(a){this.index=0;this.array=a}ArrayIterator.prototype.next=function(){if(this.index<this.array.length)return this.array[this.index++]};
ArrayIterator.prototype.reset=function(){this.index=0;return this};function s4(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}function guid(){return"a"+s4()+s4()}function sleep(a){for(var b=(new Date).getTime(),c=0;1E7>c&&!((new Date).getTime()-b>a);c++);};function _T(a,b){a||console.log("dd");this.elements=a.sort(function(a,b){return a.Dimension.compareTo(b.Dimension)});this.Length=a.length;this.Permutation=Enumerable.Range(0,this.Length).ToArray();this.Payload=b?b:0}_T.prototype.toString=function(){s="T([";s+=this.elements.join(",");s+="]";return s+=")"};_T.prototype.ToAkuaDsl=function(){s="T([";s+=this.elements.join(",");s+="]";this.Payload&&(s+=","+this.Payload);return s+=")"};
_T.prototype.Domain=function(){return this._Domain=this._Domain?this._Domain:Domain(Enumerable.From(this.elements).Select(function(a){return a.Dimension}).ToArray())};_T.prototype.ToCaption=function(){s="";for(var a=0;a<this.elements.length;a++)s+=this.elements[a].Caption,a!=this.elements.length-1&&(s+=",");return s+""};_T.prototype.equals=function(a){return a instanceof _T&&arraysEqualHash(this.elements,a.elements)};_T.prototype.And=function(a){return AndTupleElements(!1,this.elements,a.elements)};
_T.prototype.IsSubsetOf=function(a){var b=GetProjectionForOrderedSets(this.Domain().Dimensions,a.Domain().Dimensions);if(b.length/2!=this.elements.length)return!1;for(var c=!0,d=0;d<b.length/2;d++)if(!this.elements[b[2*d]].equals(a.elements[b[2*d+1]])){c=!1;break}return c};
function AndTupleElements(a,b,c){if(0==b.length)return T(c);if(0==c.length)return T(b);for(var d=Array(c.length+b.length),f=0,e=0,g=0;e<c.length||g<b.length;){var h=e<c.length?c[e]:null,l=g<b.length?b[g]:null;if(null==h)d[f++]=l,g++;else if(null==l)d[f++]=h,e++;else if(-1==h.Dimension.compareTo(l.Dimension))d[f++]=h,e++;else if(1==h.Dimension.compareTo(l.Dimension))d[f++]=l,g++;else if(h.equals(l))d[f++]=h,e++,g++;else if(a)d[f++]=l,e++,g++;else return null}return T(d)}
_T.prototype.Permutate=function(){for(var a=0,b=0;b<this.Permutation.length;++b)0<=this.Permutation[b]&&a++;a=Array(a);for(b=0;b<this.elements.length;b++)0<=this.Permutation[b]&&(a[b]=this.elements[this.Permutation[b]]);return a};_T.prototype.ApplyProjection=function(a){return T(this.ApplyCompressedProjection(a,Array(a.length/2)))};_T.prototype.ApplyCompressedProjection=function(a,b){for(var c=0;c<a.length/2;c++)b[a[2*c+1]]=this.elements[a[2*c]];return b};function CartesianProduct(a){a=Enumerable.From(a).Select(function(a){return a.ToArray()}).ToArray();a=0!=a.length?cartesianProductOf.apply(this||window,a):[];return Enumerable.From(a).Select(function(a){return Enumerable.From(a).Aggregate(T([]),function(a,b){return a.And(b)})}).Where(function(a){return null!=a}).ToArray()}function cartesianProductOf(){return _.reduce(arguments,function(a,b){return _.flatten(_.map(a,function(a){return _.map(b,function(b){return a.concat([b])})}),!0)},[[]])}
function Apple(a){this._axes=[];this._pkms=[];this.divid=guid();a&&this.InitFromConfigObject(a);this.configObject=this.type=a;this.parent=null;this.children=[];this.nameIndexes=[];a&&(this.actAsFilter=a.actAsFilter?a.actAsFilter:!1,this.reactOnFilter=a.reactOnFilter?a.reactOnFilter:!1,this.numberFormat=a.numberFormat?a.numberFormat:",.0f",this.colors=a.colors?a.colors:"#FFD700 #F4A460 #66CDAA #a173d1 #DDA0DD #6A5ACD #A0522D".split(" "),this.colorDict=a.colorDict?a.colorDict:{});this.viewFrame=null;
this.locale=a&&"german"==a.locale?{decimal:",",thousands:".",grouping:[3],currency:["\u20ac",""],dateTime:"%a %b %e %X %Y",date:"%d.%m.%Y",time:"%H:%M:%S",periods:["AM","PM"],days:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),shortDays:"Sun Mon Tue Wed Thu Fri Sat".split(" "),months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")}:{decimal:".",thousands:",",
grouping:[3],currency:["$",""],dateTime:"%a %b %e %X %Y",date:"%m/%d/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),shortDays:"Sun Mon Tue Wed Thu Fri Sat".split(" "),months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")}}
Apple.prototype.getColorByName=function(a){var b=this.colorDict[a];if(b)return b;b=this.nameIndexes.indexOf(a);-1==b&&(this.nameIndexes.push(a),b=this.nameIndexes.length-1);return this.colors[b%this.colors.length]};Apple.prototype.InitFromConfigObject=function(a){this.slicer=a.slicer?a.slicer:T([]);this.Connection=a.Connection?a.Connection:null;for(i in a)/axis/.test(i)&&this.InitAxis(a[i]),/pkm/.test(i)&&this.InitPkm(a[i])};Apple.prototype.getSelection=function(){return Enumerable.From([T([])])};
Apple.prototype.getMyAusduennFilters=function(){var a=this.getSelection();if(!a.Select)throw"keinee linqjs ";return a.Any()?[new _MultiTupleFilter(a)]:[]};Apple.prototype.getInfo=function(){alert(this.type);return this.color+" "+this.type+" apple"};Apple.prototype.addChild=function(a){this.children.push(a);a.parent=this};Apple.prototype.updateValuesCaller=function(a){var b=a?a:this;DataProviderFacaceAsync(b.GetVisualGeruestQuery(),b.Connection,function(a){b.DataSet=a;b.updateValues()})};
Apple.prototype.getViewCaller=function(a){var b=this;DataProviderFacaceAsync(this.GetVisualGeruestQuery(),this.Connection,function(c){b.DataSet=c;b.viewFrame&&b.viewFrame.empty();b.viewFrame=jQuery("<div></div> ");a.append(b.viewFrame);b.viewFrame.append(b.getView(b.viewFrame));Apple.prototype.updateValues!=b.updateValues&&b.updateValues()})};Apple.prototype.getView=function(){throw"Bitte in SubClass implementieren";};Apple.prototype.updateValues=function(){this.viewFrame.empty();this.viewFrame.append(this.getView(this.viewFrame))};
Apple.prototype.onSelectionChanged=function(a){$.each(this.children,function(a,c){c.reactOnFilter&&_.defer(c.updateValuesCaller,c)})};Apple.prototype.getValue=function(a){return this.DataSet.get(a.And(this.slicer))};Apple.prototype.GetAllAusduennFilters=function(){var a=this,b=[];if(!this.parent)return Enumerable.From(b);$.each(this.parent.children,function(c,d){if(d!==a){var f=d.getMyAusduennFilters();$.each(f,function(a,c){b.push(c)})}});return Enumerable.From(b)};Apple.prototype.InitPkm=function(a){this._pkms.push(a)};
Apple.prototype.InitAxis=function(a){this._axes.push(a)};Apple.prototype.GetAxes=function(){return Enumerable.From(this._axes)};Apple.prototype.GetPkms=function(){return Enumerable.From(this._pkms)};Apple.prototype.GetVisualGeruestQuery=function(){var a={AusduennFilters:this.GetAllAusduennFilters(),Axes:this.GetAxes(),PKMs:this.GetPkms(),Slicer:this.slicer};return VGQ(a)};Apple.prototype.GetConfigObjectAsAkuaDsl=function(){for(prop in this._configObject);return"{}"};
Apple.prototype.calculateBuckets=function(a,b){for(var c=[],d=Math.abs(b-a)/8,f=Math.abs(b)>Math.abs(a)?Math.abs(b):Math.abs(a),d=Enumerable.Range(0,8).Select("x => "+d+"*x+"+a).ToArray(),e,g,h=0;h<d.length;h++){e=d[h];g=d[h+1];var l=g/f,l=0>l?ColorLuminance("FF0000",1+l):ColorLuminance("00FF00",1-l);c.push({color:l,from:e,to:g})}return c};
Apple.prototype.calculateMinMax=function(a){var b={};a=a?a:this.axis0.Tuples().ToArray();for(var c=-Infinity,d=Infinity,f=0;f<a.length;f++)var e=this.getValue(a[f]),c=e>c?e:c,d=e<d?e:d;b.min=d;b.max=c;return b};Apple.prototype.getGradientColor=function(a,b){var c=a/b;return 0>c?ColorLuminance("FF0000",1+c):ColorLuminance("00FF00",1-c)};Apple.prototype.MakeRemoteCall=function(){return" <div>\r\n        <div id=\"chart_container\">Loading chart...</div> \r\n<script type=\"text/javascript\"> \r\nvar myChart = new JSChart('chart_container', 'bar', ''); \r\nmyChart.setDataArray([['Jun-04', 22.5],['Oct-04', 28],['Feb-05', 32]]); \r\nmyChart.colorize(['#44A622','#A7B629','#CAD857']); \r\nmyChart.setSize(550, 300); \r\nmyChart.setBarValues(false); \r\nmyChart.setBarSpacingRatio(45); \r\nmyChart.setBarOpacity(1); \r\nmyChart.setBarBorderWidth(0); \r\nmyChart.setTitle('Home broadband penetrationnn'); \r\nmyChart.setTitleFontSize(10); \r\nmyChart.setTitleColor('#607985'); \r\nmyChart.setAxisValuesColor('#607985'); \r\nmyChart.setAxisNameX('' ); \r\nmyChart.setAxisNameY('%' ); \r\nmyChart.setGridOpacity(0.8); \r\nmyChart.draw(); \r\n\x3c/script></div> "};function _VisualGeruestQuery(a){this._ausduennFilters=a.AusduennFilters;if(!this._ausduennFilters.Select)throw"Fehler";this._axes=a.Axes;if("[object Array]"===Object.prototype.toString.call(this._axes))this._axes=Enumerable.From(a.Axes);else if(!this._axes.Select)throw"Fehler - Axes kein linq";this._pkms=a.PKMs;if("[object Array]"===Object.prototype.toString.call(this._pkms))this._pkms=Enumerable.From(a.PKMs);else if(!this._pkms.Select)throw"Fehler - Pkms kein linq";this._slicer=a.Slicer}
_VisualGeruestQuery.prototype.GetAllAusduennFilters=function(){return this._ausduennFilters};_VisualGeruestQuery.prototype.ToAkuaDsl=function(){var a;a="VGQ({"+("AusduennFilters:Enum(["+this._ausduennFilters.Select(function(a){return a.ToAkuaDsl()}).ToArray().join(",")+"])");a+=",Axes:["+this._axes.Select(function(a){return a.ToAkuaDsl()}).ToArray().join(",")+"]";a+=",PKMs:["+this._pkms.Select(function(a){return a.ToAkuaDsl()}).ToArray().join(",")+"]";return a+"})"};
