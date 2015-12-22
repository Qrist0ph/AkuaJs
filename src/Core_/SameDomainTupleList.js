function _SDTL(tuplesLinq) {
	if(!tuplesLinq.Select)throw "Feler";
    
	this.tuplesLinq = tuplesLinq       ;
}

_SDTL.prototype.ToAkuaDsl = function () {
	var s="SDTL([";
	s += this.tuplesLinq.ToArray().join(" , "); 
	s += "])";
    return s;
};


_SDTL.prototype.Tuples = function () {
	var me = this;
	return this.tuplesLinq.Select(function (tuple) { return tuple; });
}

_SDTL.prototype.Domain = function () {
	var me = this;
	var first = this.tuplesLinq.FirstOrDefault()
	return first? first.Domain():Domain([]);
}

function GroupTuplesBy(sdtl, domaine)
{
    //var domain = new Domain(domaine.Intersect(sdtl.Domain));
	var domain = domaine;
    var proj = sdtl.Domain().GetProjection(domain);
		
    var exceptProj = sdtl.Domain().GetExceptProjection(domain);
	
	k=0;
	var groups = sdtl.Tuples().GroupBy(function (tuple) { return tuple.ApplyProjection(proj).toString(); }, 
	
	 null,
									 function (key, grouping) {  
									 return {Slicer:eval(key),
									 SameDomainTuplesList:SDTL(grouping)};
									 }
	);
	
	return groups;
}

function FoldOn(sdtl, domaine,foldingFunction){
	//if(!foldingFunction) foldingFunction = Enumerable.From().Sum
	return GroupTuplesBy(sdtl, domaine)
	.Select(function(group){
		var aggregatedValue = group.SameDomainTuplesList.Tuples().Select(function(tuple){return tuple.Payload;}).Sum();
		group.Slicer.Payload = aggregatedValue;
		return group.Slicer;
	}
	);	
}

function WhereExtends(sdtl, orFilters){
if(!sdtl.Select || !orFilters.Select) throw "kein linqjs supplied";
var doExtend = new Array();
return sdtl.Where(function(tuple){
return orFilters.Any(function(filter){return filter.IsSubsetOf(tuple);})
});
}