define(["core/CoreBundle"],function(){function b(a){Apple.call(this,a);this.newvalue=a.pkm0?a.pkm0:T([]);this.oldvalue=a.pkm1?a.pkm1:T([]);this.height=a.height?a.height:200}b.prototype=new Apple;b.prototype.constructor=b;b.prototype.getView=function(){this.view=$('<div id="'+this.divid+'" style="height:'+this.height+'px" /> ');this.view.html("<style type='text/css'>  #"+this.divid+"  .change {         position: relative;        vertical-align: baseline;    } #"+this.divid+"    .changePoss:before {       // background: url(/content/boardIcons.png) no-repeat;        content: '<i class='fa fa-caret-up' style='font-size:5vw;'>';        background-position: 0 -2551px;        display: block;        height: 36px;        left: 20;        position: absolute;        top: 6px;        width: 36px;        vertical-align: middle;    }   #"+
this.divid+" .changeNegg:before {        background: url(/content/boardIcons.png) no-repeat;        content: '';        background-position: 0 -2439px;        display: block;        height: 36px;        left: 20;        position: absolute;        top: 6px;        width: 36px;        vertical-align: middle;    }   #"+this.divid+" .foo {position: relative;bottom:-9px;font-size:4vw;}  #"+this.divid+"  .changePos {        color: #78AB49;    }  #"+this.divid+"  .changeNeg {        color: #9d3926;    }#"+
this.divid+"  .outer {display:table;height:100%;width:100%;} #"+this.divid+" .middle {//display:table-cell;vertical-align:middle;text-align:center;}#"+this.divid+" .inner {margin-left:auto;margin-right:auto;}</style><div class='outer'><div class='middle' ><div class='inner' > <div class='visible-md visible-lg'>    <div style='font-size:3vw;' ><strong class='absVal'>137,5K</strong></div>    <div class='change changeNeg'>       <i class='fa fa-caret-down foo' ></i> <span class='changeVal' style='font-size:2vw;'>4,53&euro;</span>        <span class='changePer' style='font-size:2vw; padding-left:20px'>2.96%</span>    </div></div> <div class='visible-sm visible-xs'>    <div style='font-size:3em;' ><strong class='absVal'>137,5K</strong></div>    <div class='change changeNeg'>       <i class='fa fa-caret-down foo' style='font-size:4em' ></i> <span class='changeVal' style='font-size:2em;'>4,53&euro;</span>        <span class='changePer' style='font-size:2em; padding-left:20px'>2.96%</span>    </div></div></div></div></div>");
return this.view};b.prototype.updateValues=function(){var a=this.getValue(this.oldvalue),b=this.getValue(this.newvalue);$("#"+this.divid+" .absVal").html(Number(b).formatMoney(2,",",".","&euro;"));$("#"+this.divid+" .changeVal").html(Number(b-a).formatMoney(2,",",".","&euro;"));$("#"+this.divid+" .changePer").html(Number(100*Math.abs(b/a-1)).formatMoney(2,",",".","%"));b>=a&&($("#"+this.divid+" .change").toggleClass("changePos"),$("#"+this.divid+" .change").toggleClass("changeNeg"),$("#"+this.divid+
" .fa").toggleClass("fa-caret-up"),$("#"+this.divid+" .fa").toggleClass("fa-caret-down"))};return function(a){return new b.prototype.constructor(a)}});