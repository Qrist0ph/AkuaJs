 jQuery.sap.declare("AkuaJs.BarChart"); 
//  jQuery.sap.require("AkuaJs.Core");


   
  sap.ui.core.Control.extend("AkuaJs.BarChart", {  
            renderer: function (oRm, oControl) {  
                oRm.write("<div");  
                oRm.writeControlData(oControl);  
                oRm.write("</div>");  
            },  
            onAfterRendering: function (eeee) {  
			
			 require(["BarChartNvd3"], function(TestChart) {
				eJune = E(D("Month"), "June");
				eAugust = E(D("Month"), "August");
				ePoland = E(D("Country"), "Poland");        
				eCar = E(D("Product"), "Car");
				eBike = E(D("Product"), "Bike");
				eBoat = E(D("Product"), "Boat");
				eCost = E(D("Measure"), "Costs");
				eRevenue = E(D("Measure"), "Revenue");

				barchart = TestChart({
					axis0: A({
						crosslists:
						[
							TCL([
								T([eCar]), T([eBike]), T([eBoat])
							]),
							TCL([
								T([eAugust])
							])
						]
					}),
					slicer: T([eCost]),

					Connection : LocalCubeConnection(HyperCube(SDTL([ 
								 T([eAugust, eCar, eCost],440)
								,T([eAugust, eBike, eCost],77)    
								,T([eAugust, eBoat, eCost],120)])))

				});

				barchart.getViewCaller(eeee.srcControl.$());
				
			});
               
            }  
        });  