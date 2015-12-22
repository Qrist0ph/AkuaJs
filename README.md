# AkuaJs
The AkuaJs Visualization Library

# Quick Start
```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    <title>AkuaJs Sample</title>
    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="https://rawgit.com/Qrist0ph/AkuaJs/master/release/Libs/D3/d3.min.js"></script>
    <script data-main="https://rawgit.com/Qrist0ph/AkuaJs/master/release/main.js" src="https://rawgit.com/Qrist0ph/AkuaJs/master/release/Libs/require.js"></script>
    <link rel="stylesheet" href="https://rawgit.com/Qrist0ph/AkuaJs/master/release/Libs/nvd3/nv.d3.min.css" type="text/css" />    
</head>
<body>
    <div id="center"></div>
</body>

<script type="text/javascript">
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

        barchart.getViewCaller(jQuery("#center"));
    });
</script>
</html>
```