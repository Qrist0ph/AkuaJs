function _LocalCubeDataProvider() {	
}

_LocalCubeDataProvider.prototype.ExecuteVisualGeruestQuery = function (visualGeruestQuery,connection) {
    
    if(connection){
    var allAusduenner = visualGeruestQuery.GetAllAusduennFilters();
    var cubeTuples = connection.Tuples();
     $.each(allAusduenner.ToArray(), function (key, value) {
       cubeTuples = value.Filter(cubeTuples);
    });
    
    return new _HyperCube(SDTL(cubeTuples));
    }
}

function  DataProviderFacaceAsync(visualGeruestQuery,connection,callback) {
    //console.log("Feuer: "+ visualGeruestQuery.ToAkuaDsl());
    callback( new _LocalCubeDataProvider().ExecuteVisualGeruestQuery(visualGeruestQuery,connection));
}