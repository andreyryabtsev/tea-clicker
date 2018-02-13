(function(){
var Game = {};
function runGame(){

		var uuu = ');"></div></div></div>';
		const tierHues  = [69 ,   0, -46, -74, -134],
		tierLight = [-10,   50,   40,   5,   7],
		tierSats  = [100, 100, 250, 125,  106];
		var DD = new Date(), infusers =0,cheater=0;
		var mostTea=0,totalTea=0, teaByClicking=0,baseTPS=0,clicksMade=0, tea = 0, baseClickGain = 1, clickGain = 1, additionalClickGain = 0, tps = 0, multiplier = 1.0, aBoost = 1.0, apa=0, maxB=0,sessionOpened=DD.getTime(), timeClosed = DD.getTime(), sessionTime=0, pastTime=0,oldTime=0,planet=0, teaSacrificed=0, teaFromBuildings=[0,0,0,0,0,0,0,0], bTPS=[0,0,0,0,0,0,0,0];
		var prefixLetters = ['','k','M','G','T','P', 'E','Z','Y'], prefixes = ['','kilo', 'mega', 'giga', 'tera', 'peta', 'exa', 'zetta', 'yotta'];
		var settings = {format:1};
		//format: 0-SI prefix grams, 1-metric tons, 2-scientific notation
		Game.recalculate = function(){
			tps = 0;
			for(var i=0;i<8;i++){tps+=currentBuildingTPS[i]*numberOfBuildings[i];bTPS[i]=currentBuildingTPS[i]*numberOfBuildings[i]*multiplier*(1+infusers/100)*aBoost;}
			baseTPS=tps;
			tps*=multiplier*(1+infusers/100)*aBoost;
			document.getElementById("tpsDisplay").innerHTML = Game.formatToUser(tps) + "/sec";
			Game.recalculateClickGain();
			Game.testForAchievements();
		}
		Game.recalculateClickGain = function(){
			clickGain=baseClickGain+tps*additionalClickGain;
		}
		Game.recalculateABoost = function(){
			aBoost=1+apa*unlockedAchievements;
		}
		Game.formatToUser = function(number){
			if(settings.format==2&&number>1000){
				var nod = Math.floor(Math.log(number*1.001) / Math.LN10);
				return Math.floor(number/Math.pow(10,nod)*100)/100+"x10<sup>"+nod+"</sup>g";
			}else if(settings.format==0||number<1000000){
				var t = number/Math.pow(10,Math.floor(Math.log(number*1.001) / Math.LN10 / 3)*3);
				return number>1?t.toFixed(3-String(parseInt(t)).length)+" "+prefixLetters[Math.floor(Math.log(number*1.001) / Math.LN10 / 3)]+"g":(Math.round(number*1000)/1000)+" g";
			}else if(settings.format==1){
				var t = number/Math.pow(10,Math.floor(Math.log(number*1.001) / Math.LN10 / 3)*3);
				return t.toFixed(3-String(parseInt(t)).length)+" "+prefixes[Math.floor(Math.log(number+0.1) / Math.LN10 / 3)-2]+"tons";
			}
		}
		Game.updateFormat = function(event){
			settings.format = document.getElementById('selectFormat').selectedIndex;
			Game.updateBuildings();
			Game.recalculate();
			Game.updateCounter();
		}
		Game.calculateInfusers = function(k){//8e14: first infuser
			return Math.floor(Math.pow(k,0.47)*0.0000001);
		}
		Game.promptSoftReset=function(){
			if(confirm("Note: This will erase all current progress except achievements, in exchange for an advantage in the new game.\nIf you colonize now, you will get a "+(Game.calculateInfusers(totalTea+teaSacrificed)-infusers)+"% boost.\n\nAre you sure you want to proceed?")){
				if(typeof(Storage)!=="undefined")localStorage.clear();
				Game.softReset();
			}
		}
		Game.updateSRButton=function(){
			var g = document.getElementById("softResetButton");
			if(Game.calculateInfusers(totalTea+teaSacrificed)>infusers)g.style.display='block';
			else g.style.display='none';
		}
		sdc=false;
		Game.explainSR=function(){
			var descDisplay = document.getElementById('achieveDescPopup');
			var s = descDisplay.style;
			s.display = 'block';
			sdc=true;
			$('#achieveDescPopup').finish();
			$('#achieveDescPopup').animate({opacity:1},200);
			s.left='250px';
			s.top='325px';
			descDisplay.innerHTML='<div style="position:absolute;left:5px;top:3px;width:283px;height:68px;">Restart the game on a new planet, getting a boost dependent on how much tea you\'ve produced all time.</div>';
		}
		Game.hideSR=function(){
			sdc=false;
			$('#achieveDescPopup').animate({opacity:0},50,"swing",function(){if(!sdc)$('#achieveDescPopup').display = 'none';});
		}
		Game.loadPrestigeScreen = function(){
			winState=4;
			var w = Game.openWindow();
			w.innerHTML='<div style="position:absolute;left:140px;top:5px;width:400px;height:300px;background-image:url(images/infusers.png);"></div>'+
				'<div style="position:absolute;top:297px;width:680px;text-align:center;color:#F1D50E;text-shadow: -1px 0 #A47D09, 0 1px #A47D09, 1px 0 #A47D09, 0 -1px #A47D09;font-size:48px;">+'+(Game.calculateInfusers(totalTea+teaSacrificed)-infusers)+' Golden Infusers'+
				'</div><div style="position:absolute;top:327px;width:680px;text-align:center;color:#A47D09;font-size:20px;"><br>With your acquired knowledge about tea distilled into these infusers, you are ready to restart on a new planet, while recieving an additional boost.</div>';
		}
		var imgObj = document.getElementById('theCup');
		var animationLoop;
		imgObj.style.position= 'absolute'; 
		imgObj.style.left = '15px'; 
		imgObj.style.bottom = '-100px'; 
		imgObj.style.display = 'block';
		imgObj.style.opacity = 0;
		Game.rollRight=function(){
		   imgObj.style.bottom = parseInt(imgObj.style.bottom) + 12 + 'px';
		   imgObj.style.opacity = (parseInt(imgObj.style.bottom)+100)/300;
			if(parseInt(imgObj.style.bottom)>=150)clearInterval(animationLoop);
		}
		animationLoop = setInterval(Game.rollRight,30);
		const buildingNames = ["Tea Bush", "Tea House", "Tea Farm", "Tea City", "Sea Temple", "Asteroid Drill", "Island Teabags", "Planet Tealizer"],
			buildingDescriptions = ["A small bush of tea to produce few leaves per second.",
									"A traditional tea house to make tea production aesthetic and efficient.",
									"An acre of land devoted to producing the finest quality of tea.",
									"An entire city overcome with vigorous growths of various tea.",
									"A sprawling underwater temple slowly brewing an entire sea into tea.",
									"A drill into a giant frozen sphere of tea floating though space.",
									"Islands that function as enormous teabags, scattered around the oceans",
									"A device that slowly transforms the very core of our planet into tea"];
		const colorBlocked = '#B02626', colorAllowed = '#498C33', UcolorBlocked = '#902626', UcolorAllowed = '#6bf75b';
		const BASE_TPS = [ 1, 20,  8000,  57600,   2490000,   95500000,    3210000000,    92460000000];
		const BASE_COST = [30,1000,300000,36000000,3888000000,373248000000,31352832000000,2257400000000000];
		const COST_INCREASE_PER_LEVEL = 1.15;
		var numberOfBuildings = [], currentBuildingCost = [], currentBuildingTPS = [];
		Game.resetBuildings=function(){
			for(var a=0;a<8;a++){
				numberOfBuildings[a]=0;
				teaFromBuildings[a]=0;
				bTPS[a]=0;
				currentBuildingCost[a]=BASE_COST[a];
				currentBuildingTPS[a]=BASE_TPS[a];
			}
		}
		Game.resetBuildings();
		Game.updateCanBuyBuildingsUpgrades=function(){
			for(var i=0;i<8;i++)Game.updateColorOfBuildingTag(i);
			for(var i=0;i<NUMBER_OF_UPGRADES;i++){
				if(upgradeStates[i]==1){
					if(tea>=upgrades[i].cost)document.getElementById('u'+i).style.backgroundImage="url(images/upgradeR.png)";
					else document.getElementById('u'+i).style.backgroundImage="url(images/upgrade.png)";
				}
			}
		}
		Game.updateColorOfBuildingTag=function(n){
			document.getElementById('bc'+n).style.color = (tea>=currentBuildingCost[n])?colorAllowed:colorBlocked;
			if(tea>=BASE_COST[n]&&n+1<8&&document.getElementById('b'+(n+1)).style.display=="none"){var s=document.getElementById('b'+(n+1)).style;s.display='block';if(maxB<n+1){maxB=n+1;s.opacity=0;$('#b'+(n+1)).animate({opacity:1},5000);}}
		}
		Game.updateBuilding = function(n){
			var numDiv = document.getElementById('bn'+n), costDiv = document.getElementById('bc'+n);
			numDiv.innerHTML = numberOfBuildings[n];
			currentBuildingCost[n] = BASE_COST[n]*Math.pow(COST_INCREASE_PER_LEVEL,numberOfBuildings[n]);
			Game.updateColorOfBuildingTag(n);
			costDiv.innerHTML = "Cost: "+Game.formatToUser(currentBuildingCost[n]);
		}
		Game.updateBuildings = function(){for(var h=0;h<8;h++)Game.updateBuilding(h);}
		Game.handleBuildingClick = function(event){
			var k = parseInt(event.target.id.replace( /[^\d.]/g, '' ));
			if(event.shiftKey)for(var g=0;g<10;g++)Game.attemptPurchase(k);
			else Game.attemptPurchase(k);
		}
		Game.attemptPurchase= function(k){
			if(tea>=currentBuildingCost[k]){//purchase
				tea-=currentBuildingCost[k];
				numberOfBuildings[k]++;
				Game.updateBuilding(k);
				Game.recalculate();
				Game.updateCounter();
				Game.updateCanBuyBuildingsUpgrades();
				Game.paintDescription(k);
				Game.updateUpgradeAvailability(false,false);
			}
		}
			Game.paintDescription = function(k){
				var descDisplay = document.getElementById('descPopup');
				var s = descDisplay.style;
				s.display = 'block';
				var b = currentBuildingTPS[k]*numberOfBuildings[k]*multiplier*(1+infusers/100)*aBoost;
				descDisplay.innerHTML='<div class = "description" id="descName">'+buildingNames[k]+'</div><div id="descDesc" class = "description">'+buildingDescriptions[k]+'</div><div id="descStats"class = "description">'+
					'Count: '+numberOfBuildings[k]+'<br>TPS per unit: '+Game.formatToUser(currentBuildingTPS[k]*multiplier*(1+infusers/100)*aBoost)+'/s<br>Total TPS: '+Game.formatToUser(b)+'/s ('+(b/tps*100).toFixed(1)+'%)</div>';
				s.top = (16+50*k)+'px';
			}
			Game.openDescription = function(event){
				var k = parseInt(event.target.id.replace( /[^\d.]/g, '' ));
				Game.paintDescription(k);
			}
			Game.closeDescription = function(event){
				var descDisplay = document.getElementById('descPopup');
				descDisplay.style.display = 'none';
			}
		Game.initiateBuildings = function(){
			var holder = document.getElementById('buildingHolder');
			for(var a=0;a<8;a++){
				holder.innerHTML += '<div id = "b'+a+'" class = "buildings" style="background-image:url(images/building.jpg);top:'+50*(a+1)+'px;"></div>';
				var me = document.getElementById('b'+a);
				me.innerHTML = '<div style = "background-image:url(images/buildings/b'+a+'.png);position:absolute;top:3px;left:3px;width:44px;height:44px;pointer-events:none;"></div><div id = "bname'+a+'" class = "buildingNames"></div><div id = "bn'+a+'" class = "buildingNumbers"></div><div id = "bc'+a+'" class = "buildingCosts"></div>';
				document.getElementById('bname'+a).innerHTML=buildingNames[a];
				me.style.display='none';
				Game.updateBuilding(a);
			}
			$('.buildings').bind("click",Game.handleBuildingClick);
			$('.buildings').bind("mouseenter",Game.openDescription);
			$('.buildings').bind("mouseleave",Game.closeDescription);
		}
		
		Game.initiateBuildings();
		document.getElementById('b0').style.display='block';
		const NUMBER_OF_UPGRADES = 79;
		var upgrades = [], upgradeStates = [],animating=false,redo=false,purchased=0;
		Game.handleUpgradeClick=function(event){
			var k = parseInt(event.target.id.replace( /[^\d.]/g, '' ));
			if(upgradeStates[k]<2&&tea>=upgrades[k].cost){//purchase
				tea-=upgrades[k].cost;
				eval(upgrades[k].effect);
				upgradeStates[k]=2;
				Game.recalculate();
				Game.updateCounter();
				Game.updateCanBuyBuildingsUpgrades();
				//Game.paintUDescription(k);
				Game.updateUpgradeAvailability(false,true);
				Game.closeUDescription();
			}
		}
			function Upgrade(id, name, desc, cost, iconURL, overlayURL, tier, requirement, effect, descEffect){
				this.name=name;
				this.desc=desc;
				this.cost=cost;
				this.iconURL=iconURL;
				this.overlayURL=overlayURL;
				this.tier = tier;
				this.id=id;
				this.requirement=requirement;
				this.effect=effect;
				this.descEffect=descEffect;
				this.getElement=function(){
					return '<div id = "u'+id+'" class="upgrades" style = "cursor:pointer;position:absolute;width:56px;height:56px;background-image:url(images/upgrade.png);display:none;"><div style="position:relative;pointer-events:none;left:6px;top:6px;width:44px;height:44px;cursor:inherit;background-image:url('+iconURL+');"><div style="position:relative;pointer-events:none;left:0px;top:0px;width:44px;height:44px;cursor:inherit;background-image:url('+overlayURL+');-webkit-filter: brightness('+(tierLight[tier-1]+100)/100+') hue-rotate('+tierHues[tier-1]+'deg) saturate('+tierSats[tier-1]/100+uuu;
				}
			}
			Game.clearUpgrades=function(){
				for(var a=0;a<NUMBER_OF_UPGRADES;a++){
					upgradeStates[a]=0;
					document.getElementById('u'+a).style.left='auto';
					document.getElementById('u'+a).style.top='auto';
					document.getElementById('u'+a).style.display='none';
				}
			}
			Game.countAvailibleUpgrades=function(state){var n=0;for(var i=0;i<NUMBER_OF_UPGRADES;i++)if(upgradeStates[i]===state)n++;return n;}
			Game.reorganizeUpgrades=function(firstLoad){
				if(!animating){
					var visibleUpgrades =[], k=0;
					for(var a=0;a<NUMBER_OF_UPGRADES;a++){
						document.getElementById('u'+a).style.display='none';
						if(upgradeStates[a]==1){
							document.getElementById('u'+a).style.display='block';
							visibleUpgrades[k]={id:a, cost:upgrades[a].cost};
							k++;
						}
					}
					visibleUpgrades.sort(function(a,b){return a.cost-b.cost;});
					for(var i=0;i<k;i++){
						animating=true;
						$('#u'+visibleUpgrades[i].id).animate({
							left: 5+60*(i%4)+"px",
							top: 10+60*Math.floor(i/4)+"px"
						},(firstLoad?800:200),"linear",
						function(){animating=false;if(redo){redo=false;Game.reorganizeUpgrades();}});
					}
					Game.adjustSettingButton();
				}
				else redo=true;
			}
			Game.updateUpgradeAvailability = function(fl,forceReorg){
				var g = false;
				for(var i=0;i<NUMBER_OF_UPGRADES;i++){
					if(upgradeStates[i]==0&&eval(upgrades[i].requirement)){
						upgradeStates[i]=1;
						g=true;
					}
				}
				if(g||forceReorg){Game.reorganizeUpgrades(fl);Game.adjustSettingButton();}
			}
			Game.paintUDescription = function(k){
				var descDisplay = document.getElementById('descUPopup');
				var s = descDisplay.style;
				s.display = 'block';
				descDisplay.innerHTML='<div class = "description" id="descUName">'+upgrades[k].name+'</div><div id="descUDesc" class = "description">'+upgrades[k].desc+'</div><div id="descEffect"class = "description">'+upgrades[k].descEffect+'</div>'+
					'<div class = "description" id="descUCost">'+Game.formatToUser(upgrades[k].cost)+'</div>';
				document.getElementById('descUCost').style.color = tea>upgrades[k].cost?UcolorAllowed:UcolorBlocked;
				s.top = parseInt(document.getElementById('u'+k).style.top)-document.getElementById('right').scrollTop+'px';
				s.left= parseInt(document.getElementById('u'+k).style.left)+230+'px';
			}
			Game.openUDescription = function(event){
				var k = parseInt(event.target.id.replace( /[^\d.]/g, '' ));
				if(!animating)Game.paintUDescription(k);
			}
			Game.closeUDescription = function(){
				var descDisplay = document.getElementById('descUPopup');
				descDisplay.style.display = 'none';
			}
			//Tea Bushes
			upgrades[0] = new Upgrade(0, "Deep Roots", "Deeper roots allow the bush to absorb more nutrients and flourish", 200, "images/icons/bushUpgrade.png", "images/icons/bushOverlay.png", 1, "numberOfBuildings[0]>=10","currentBuildingTPS[0]*=2;","<b>Doubles</b> Tea Bush output");
			upgrades[1] = new Upgrade(1, "Vigorous Shoots", "Fast-growing vines sprawl from the bushes, quickly producing fresh leaves", 1700, "images/icons/bushUpgrade.png", "images/icons/bushOverlay.png", 2, "numberOfBuildings[0]>=25","currentBuildingTPS[0]*=3;","<b>Triples</b> Tea Bush output");
			upgrades[2] = new Upgrade(2, "Fertealizer", "A specially designed formula boosts the growth of the bushes to an entire new level", 57000, "images/icons/bushUpgrade.png", "images/icons/bushOverlay.png", 3, "numberOfBuildings[0]>=50","currentBuildingTPS[0]*=2;","<b>Doubles</b> Tea Bush output");
			upgrades[3] = new Upgrade(3, "Water Hose", "A water system so efficient that the leaves of the bushes begin to drip tea", 1900000, "images/icons/bushUpgrade.png", "images/icons/bushOverlay.png", 4, "numberOfBuildings[0]>=75","currentBuildingTPS[0]*=2;","<b>Doubles</b> Tea Bush output");
			upgrades[4] = new Upgrade(4, "Fertealizer", "A specially designed formula boosts the growth of the bushes to an entire new level", 62000000, "images/icons/bushUpgrade.png", "images/icons/bushOverlay.png", 5, "numberOfBuildings[0]>=100","currentBuildingTPS[0]*=4;","<b>Quadruples</b> Tea Bush output");
			//Tea Houses
			upgrades[5] = new Upgrade(5, "Terrace", "Expanding the are of tea houses, these terraces improve the quality control of tea", 7000, "images/icons/houseUpgrade.png", "images/icons/houseOverlay.png", 1, "numberOfBuildings[1]>=10","currentBuildingTPS[1]*=2;","<b>Doubles</b> Tea House output");
			upgrades[6] = new Upgrade(6, "Specialized Bamboo Mats", "Beautiful bamboo mats line the flooring of the tea house, vastly increasing output", 58000, "images/icons/houseUpgrade.png", "images/icons/houseOverlay.png", 2, "numberOfBuildings[1]>=25","currentBuildingTPS[1]*=3;","<b>Triples</b> Tea House output");
			upgrades[7] = new Upgrade(7, "Inspirational Wall Hangings", "These wall hangings inspire the tea masters to work more quickly", 3800000, "images/icons/houseUpgrade.png", "images/icons/houseOverlay.png", 3, "numberOfBuildings[1]>=50","currentBuildingTPS[1]*=2;","<b>Doubles</b> Tea House output");
			upgrades[8] = new Upgrade(8, "House Signs", "Signs that point suppliers to the tea house to increase output", 62000000, "images/icons/houseUpgrade.png", "images/icons/houseOverlay.png", 4, "numberOfBuildings[1]>=75","currentBuildingTPS[1]*=2;","<b>Doubles</b> Tea House output");
			upgrades[9] = new Upgrade(9, "Tea Pagoda", "With many floors, the tea houses become large beautiful structures that convert tea extremely quickly", 2000000000, "images/icons/houseUpgrade.png", "images/icons/houseOverlay.png", 5, "numberOfBuildings[1]>=100","currentBuildingTPS[1]*=4;","<b>Quadruples</b> Tea House output");
			//Tea Farms
			upgrades[10] = new Upgrade(10, "Raised Beds", "A more efficient farming method that doubles the number of plants per acre", 2100000, "images/icons/farmUpgrade.png", "images/icons/farmOverlay.png", 1, "numberOfBuildings[2]>=10","currentBuildingTPS[2]*=2;","<b>Doubles</b> Tea Farm output");
			upgrades[11] = new Upgrade(11, "Greenhouse", "Trap the solar energy and use it to increase your tea supplies even further", 17000000, "images/icons/farmUpgrade.png", "images/icons/farmOverlay.png", 2, "numberOfBuildings[2]>=25","currentBuildingTPS[2]*=3;","<b>Triples</b> Tea Farm output");
			upgrades[12] = new Upgrade(12, "More Fertealizer", "Enough tea fertilizer for an entire farm", 570000000, "images/icons/farmUpgrade.png", "images/icons/farmOverlay.png", 3, "numberOfBuildings[2]>=50","currentBuildingTPS[2]*=2;","<b>Doubles</b> Tea Farm output");
			upgrades[13] = new Upgrade(13, "GMO Tea", "Tea that, very naturally, produces twice the number of leaves of regular plants", 19000000000, "images/icons/farmUpgrade.png", "images/icons/farmOverlay.png", 4, "numberOfBuildings[2]>=75","currentBuildingTPS[2]*=2;","<b>Doubles</b> Tea Farm output");
			upgrades[14] = new Upgrade(14, "Tea Cows", "New farm addition: cows that can be milked for huge amounts of tea", 620000000000, "images/icons/farmUpgrade.png", "images/icons/farmOverlay.png", 5, "numberOfBuildings[2]>=100","currentBuildingTPS[2]*=4;","<b>Quadruples</b> Tea Farm output");
			//Tea cities
			upgrades[15] = new Upgrade(15, "Boulevard", "A beautiful street in the tea city", 255000000, "images/icons/cityUpgrade.png", "images/icons/cityOverlay.png", 1, "numberOfBuildings[3]>=10","currentBuildingTPS[3]*=2;","<b>Doubles</b> Tea City output");
			upgrades[16] = new Upgrade(16, "Train Station", "A train to take you far away", 2100000000, "images/icons/cityUpgrade.png", "images/icons/cityOverlay.png", 2, "numberOfBuildings[3]>=25","currentBuildingTPS[3]*=3;","<b>Triples</b> Tea City output");
			upgrades[17] = new Upgrade(17, "Nuclear Reactor", "Powered by pellets of radioactive tea, this reactor gives the entire city energy", 68000000000, "images/icons/cityUpgrade.png", "images/icons/cityOverlay.png", 3, "numberOfBuildings[3]>=50","currentBuildingTPS[3]*=2;","<b>Doubles</b> Tea City output");
			upgrades[18] = new Upgrade(18, "Overcharged Reactor", "Producing many times the power, this reactor emits radiation into the city", 2200000000000, "images/icons/cityUpgrade.png", "images/icons/cityOverlay.png", 4, "numberOfBuildings[3]>=75","currentBuildingTPS[3]*=2;","<b>Doubles</b> Tea City output");
			upgrades[19] = new Upgrade(19, "Urban Workforce", "Tea mutants emerge from the radioactive city and begin producing tea", 74000000000000, "images/icons/cityUpgrade.png", "images/icons/cityOverlay.png", 5, "numberOfBuildings[3]>=100","currentBuildingTPS[3]*=4;","<b>Quadruples</b> Tea City output");
			//Sea Temples
			upgrades[20] = new Upgrade(20, "Reinforced foundation", "Strong attachment to the sea floor allows the temple to produce tea with greater stability", 27000000000, "images/icons/templeUpgrade.png", "images/icons/templeOverlay.png", 1, "numberOfBuildings[4]>=10","currentBuildingTPS[4]*=2;","<b>Doubles</b> Sea Temple output");
			upgrades[21] = new Upgrade(21, "Desalination Chambers", "Convert the salty tea into freshwater tea, making the product easier to process", 220000000000, "images/icons/templeUpgrade.png", "images/icons/templeOverlay.png", 2, "numberOfBuildings[4]>=25","currentBuildingTPS[4]*=3;","<b>Triples</b> Sea Temple output");
			upgrades[22] = new Upgrade(22, "Tea Fishes", "Small fishes that circle around the temple and breathe by converting water into tea", 7400000000000, "images/icons/templeUpgrade.png", "images/icons/templeOverlay.png", 3, "numberOfBuildings[4]>=50","currentBuildingTPS[4]*=2;","<b>Doubles</b> Sea Temple output");
			upgrades[23] = new Upgrade(23, "Tea Whales", "Huge underwater creatures that swim to the most remote regions and convert water into tea much faster", 240000000000000, "images/icons/templeUpgrade.png", "images/icons/templeOverlay.png", 4, "numberOfBuildings[4]>=75","currentBuildingTPS[4]*=2;","<b>Doubles</b> Sea Temple output");
			upgrades[24] = new Upgrade(24, "Teasunami", "Waves many hundreds of feet in height that clash with the shore splattering tea for miles around", 8000000000000000, "images/icons/templeUpgrade.png", "images/icons/templeOverlay.png", 5, "numberOfBuildings[4]>=100","currentBuildingTPS[4]*=4;","<b>Quadruples</b> Sea Temple output");
			//Asteroid Drills
			upgrades[25] = new Upgrade(25, "Hard Steel Drill Bit", "A powerful drill bit to cut through the icy outer shell", 2600000000000, "images/icons/drillUpgrade.png", "images/icons/drillOverlay.png", 1, "numberOfBuildings[5]>=10","currentBuildingTPS[5]*=2;","<b>Doubles</b> Asteroid Drill output");
			upgrades[26] = new Upgrade(26, "Diamond Drill Bit", "A 3000-carat diamond used to make the asteroid drill the strongest drill ever created", 21000000000000, "images/icons/drillUpgrade.png", "images/icons/drillOverlay.png", 2, "numberOfBuildings[5]>=25","currentBuildingTPS[5]*=3;","<b>Triples</b> Asteroid Drill output");
			upgrades[27] = new Upgrade(27, "Mega Soldering Iron", "Attached to the drill bit, this tool melts the around the drill to make the drilling even faster", 700000000000000, "images/icons/drillUpgrade.png", "images/icons/drillOverlay.png", 3, "numberOfBuildings[5]>=50","currentBuildingTPS[5]*=2;","<b>Doubles</b> Asteroid Drill output");
			upgrades[28] = new Upgrade(28, "Space Elevator Tube", "A huge tube somehow reaching from the planet to the asteroid, allowing speedy delivery of mined tea", 23000000000000000, "images/icons/drillUpgrade.png", "images/icons/drillOverlay.png", 4, "numberOfBuildings[5]>=75","currentBuildingTPS[5]*=2;","<b>Doubles</b> Asteroid Drill output");
			upgrades[29] = new Upgrade(29, "Thermonuclear Mining", "Use repeated detonations of hydrogen bombs to mine into the asteroid", 760000000000000000, "images/icons/drillUpgrade.png", "images/icons/drillOverlay.png", 5, "numberOfBuildings[5]>=100","currentBuildingTPS[5]*=4;","<b>Quadruples</b> Asteroid Drill output");
			//Island Teabags
			upgrades[30] = new Upgrade(30, "Leaf Concentration", "Double the number of leaves per cubic mile of oceanwater", 220000000000000, "images/icons/islandUpgrade.png", "images/icons/islandOverlay.png", 1, "numberOfBuildings[6]>=10","currentBuildingTPS[6]*=2;","<b>Doubles</b> Island Teabags output");
			upgrades[31] = new Upgrade(31, "Leaf Quality", "Higher quality, fresher tea converts oceanwater into tea at a faster rate", 1800000000000000, "images/icons/islandUpgrade.png", "images/icons/islandOverlay.png", 2, "numberOfBuildings[6]>=25","currentBuildingTPS[6]*=3;","<b>Triples</b> Island Teabags output");
			upgrades[32] = new Upgrade(32, "Desalination Shores", "Entire shores devoted to turning oceanwater tea into drinkable product", 59000000000000000, "images/icons/islandUpgrade.png", "images/icons/islandOverlay.png", 3, "numberOfBuildings[6]>=50","currentBuildingTPS[6]*=2;","<b>Doubles</b> Island Teabags output");
			upgrades[33] = new Upgrade(33, "Sugarcube Islands", "Entire foundations of islands are turned into premium sugar to sweeten the drink", 1900000000000000000, "images/icons/islandUpgrade.png", "images/icons/islandOverlay.png", 4, "numberOfBuildings[6]>=75","currentBuildingTPS[6]*=2;","<b>Doubles</b> Island Teabags output");
			upgrades[34] = new Upgrade(34, "Motorized Islands", "Revolutionary tea-based engines drive the island teabags around the oceans", 64000000000000000000, "images/icons/islandUpgrade.png", "images/icons/islandOverlay.png", 5, "numberOfBuildings[6]>=100","currentBuildingTPS[6]*=4;","<b>Quadruples</b> Island Teabags output");
			//Planet Tealizer
			upgrades[35] = new Upgrade(35, "Superheated Tea", "Cutting-edge technology that allows tea to remain liquid at planet core temperatures", 16000000000000000, "images/icons/tealizerUpgrade.png", "images/icons/tealizerOverlay.png", 1, "numberOfBuildings[7]>=10","currentBuildingTPS[7]*=2;","<b>Doubles</b> Earth Tealizer output");
			upgrades[36] = new Upgrade(36, "Convection Tea", "Tea begins replacing magma in the convection cycle", 130000000000000000, "images/icons/tealizerUpgrade.png", "images/icons/tealizerOverlay.png", 2, "numberOfBuildings[7]>=25","currentBuildingTPS[7]*=3;","<b>Triples</b> Earth Tealizer output");
			upgrades[37] = new Upgrade(37, "Reactive Tea", "Molecules in planet core react to produce tea", 4300000000000000000, "images/icons/tealizerUpgrade.png", "images/icons/tealizerOverlay.png", 3, "numberOfBuildings[7]>=50","currentBuildingTPS[7]*=2;","<b>Doubles</b> Earth Tealizer output");
			upgrades[38] = new Upgrade(38, "In-Fused Tea", "Fusion reactions shape tea molecules from the atoms in Earth core", 140000000000000000000, "images/icons/tealizerUpgrade.png", "images/icons/tealizerOverlay.png", 4, "numberOfBuildings[7]>=75","currentBuildingTPS[7]*=2;","<b>Doubles</b> Earth Tealizer output");
			upgrades[39] = new Upgrade(39, "Teaverse Portal", "A portal to a universe entirely filled with tea opens at the very center of Earth", 4600000000000000000000, "images/icons/tealizerUpgrade.png", "images/icons/tealizerOverlay.png", 5, "numberOfBuildings[7]>=100","currentBuildingTPS[7]*=4;","<b>Quadruples</b> Earth Tealizer output");
			
			//Manual Clicks
			upgrades[40] = new Upgrade(40, "Gentle sipping", "Sip like a gentleman.", 30, "images/icons/additionalclickUpgrade.png", "images/icons/additionalclickOverlay.png", 1, "teaByClicking>=40","baseClickGain*=2;Game.recalculateClickGain();", "<b>Double</b> manual sipping power");
			upgrades[41] = new Upgrade(41, "Determined sipping", "Sip like you mean it.", 100, "images/icons/additionalclickUpgrade.png", "images/icons/additionalclickOverlay.png", 1, "teaByClicking>=120","baseClickGain*=2;Game.recalculateClickGain();", "<b>Double</b> manual sipping power");
			upgrades[42] = new Upgrade(42, "Effective sipping", "Sip like you are good at it.", 360, "images/icons/additionalclickUpgrade.png", "images/icons/additionalclickOverlay.png", 1, "teaByClicking>=360","baseClickGain*=2;Game.recalculateClickGain();", "<b>Double</b> manual sipping power");
			upgrades[43] = new Upgrade(43, "Intense sipping", "Sip like you <b>really</b> need it.", 900, "images/icons/additionalclickUpgrade.png", "images/icons/additionalclickOverlay.png", 1, "teaByClicking>=1080","baseClickGain*=2;Game.recalculateClickGain();", "<b>Double</b> manual sipping power");
			upgrades[44] = new Upgrade(44, "Concentrated sipping", "Sip like it is your life goal.", 2700, "images/icons/additionalclickUpgrade.png", "images/icons/additionalclickOverlay.png", 1, "teaByClicking>=3000","baseClickGain*=2;Game.recalculateClickGain();", "<b>Double</b> manual sipping power");
			upgrades[45] = new Upgrade(45, "Meaningful sipping", "Sip like you are discovering truths about the universe.", 8100, "images/icons/additionalclickUpgrade.png", "images/icons/additionalclickOverlay.png", 1, "teaByClicking>=9000","baseClickGain*=2;Game.recalculateClickGain();", "<b>Double</b> manual sipping power");
			upgrades[46] = new Upgrade(46, "Vigorous sipping", "Sip like you are <b>full</b> of energy.", 24000, "images/icons/additionalclickUpgrade.png", "images/icons/additionalclickOverlay.png", 1, "teaByClicking>=27000","baseClickGain*=2;Game.recalculateClickGain();", "<b>Double</b> manual sipping power");
			upgrades[47] = new Upgrade(47, "Chugging", "Sip like... eh, just chug the cup.", 60000, "images/icons/additionalclickUpgrade.png", "images/icons/additionalclickOverlay.png", 2, "teaByClicking>=81000","baseClickGain*=2;Game.recalculateClickGain();", "<b>Double</b> manual sipping power");
			
			upgrades[48] = new Upgrade(48, "Tea cup with sugar", "The sweetness temts you to sip much faster", 160000, "images/icons/baseclickUpgrade.png", "images/icons/baseclickOverlay.png", 1, "tea>200000", "additionalClickGain+=0.02;Game.recalculateClickGain();", "Gain an extra <b>2%</b> tps by sipping");
			upgrades[49] = new Upgrade(49, "Tea cup with milk", "Milky tea tempts you to sip with greater power", 16000000, "images/icons/baseclickUpgrade.png", "images/icons/baseclickOverlay.png", 1, "tea>20000000", "additionalClickGain+=0.02;Game.recalculateClickGain();", "Gain an extra <b>2%</b> tps by sipping");
			upgrades[50] = new Upgrade(50, "Tea cup with spices", "Flavoring your cup makes your sips wield enormous strength", 1600000000, "images/icons/baseclickUpgrade.png", "images/icons/baseclickOverlay.png", 2, "tea>2000000000", "additionalClickGain+=0.02;Game.recalculateClickGain();", "Gain an extra <b>2%</b> tps by sipping");
			upgrades[51] = new Upgrade(51, "Tea cup with heating", "With the tea kept at a constant temperature, you are able to sip consistently", 160000000000, "images/icons/baseclickUpgrade.png", "images/icons/baseclickOverlay.png", 2, "tea>200000000000", "additionalClickGain+=0.02;Game.recalculateClickGain();", "Gain an extra <b>2%</b> tps by sipping");
			upgrades[52] = new Upgrade(52, "Large tea cup", "The bigger cup lets you sip with greater enthusiasm and effectiveness", 16000000000000, "images/icons/baseclickUpgrade.png", "images/icons/baseclickOverlay.png", 3, "tea>20000000000000", "additionalClickGain+=0.02;Game.recalculateClickGain();", "Gain an extra <b>2%</b> tps by sipping");
			upgrades[53] = new Upgrade(53, "Sip you must", "Use the Force to assist your sipping", 1600000000000000, "images/icons/baseclickUpgrade.png", "images/icons/baseclickOverlay.png", 4, "tea>2000000000000000", "additionalClickGain+=0.02;Game.recalculateClickGain();", "Gain an extra <b>2%</b> tps by sipping");
			upgrades[54] = new Upgrade(54, "Reinforced cup", "A cup that can handle your sipping", 160000000000000000, "images/icons/baseclickUpgrade.png", "images/icons/baseclickOverlay.png", 5, "tea>200000000000000000", "additionalClickGain+=0.02;Game.recalculateClickGain();", "Gain an extra <b>2%</b> tps by sipping");
			
			//Teas - 50T
			upgrades[55] = new Upgrade(55, "Basic Black Tea", "Regular black tea", 50000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 1, "tea>5000000000000", "multiplier+=0.15;Game.recalculate();", "Gain extra <b>15%</b> of your base TpS");
			upgrades[56] = new Upgrade(56, "Basic Green Tea", "Regular green tea", 50000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 1, "tea>5000000000000", "multiplier+=0.15;Game.recalculate();", "Gain extra <b>15%</b> of your base TpS");
			upgrades[57] = new Upgrade(57, "Basic Oolong Tea", "Regular oolong tea", 50000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 1, "tea>5000000000000", "multiplier+=0.15;Game.recalculate();", "Gain extra <b>15%</b> of your base TpS");
			upgrades[58] = new Upgrade(58, "Basic Herbal Tea", "Simple camomile tea", 50000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 1, "tea>5000000000000", "multiplier+=0.15;Game.recalculate();", "Gain extra <b>15%</b> of your base TpS");
			upgrades[59] = new Upgrade(59, "Basic Rooibos Tea", "Regular Rooibos tea", 50000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 1, "tea>5000000000000", "multiplier+=0.15;Game.recalculate();", "Gain extra <b>15%</b> of your base TpS");
			//Teas - 5P
			upgrades[60] = new Upgrade(60, "Earl Grey", "Black tea with bergamot", 5000000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 2, "tea>500000000000000", "multiplier+=0.3;Game.recalculate();", "Gain extra <b>30%</b> of your base TpS");
			upgrades[61] = new Upgrade(61, "Lemon Green Tea", "Green tea with lemons", 5000000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 2, "tea>500000000000000", "multiplier+=0.3;Game.recalculate();", "Gain extra <b>30%</b> of your base TpS");
			upgrades[62] = new Upgrade(62, "Flavored Oolong Tea", "Oolong tea with cinnamon", 5000000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 2, "tea>500000000000000", "multiplier+=0.3;Game.recalculate();", "Gain extra <b>30%</b> of your base TpS");
			upgrades[63] = new Upgrade(63, "Peppermint Tea", "Refreshing peppermint tea", 5000000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 2, "tea>500000000000000", "multiplier+=0.3;Game.recalculate();", "Gain extra <b>30%</b> of your base TpS");
			upgrades[64] = new Upgrade(64, "Spiced Rooibos Tea", "Rooibos tea with cardamom", 5000000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 2, "tea>500000000000000", "multiplier+=0.3;Game.recalculate();", "Gain extra <b>30%</b> of your base TpS");
			//Teas - 500P
			upgrades[65] = new Upgrade(65, "Lady Grey", "Delicate variety of Earl Grey with lemon and orange peel", 500000000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 3, "tea>50000000000000000", "multiplier+=0.6;Game.recalculate();", "Gain extra <b>60%</b> of your base TpS");
			upgrades[66] = new Upgrade(66, "Dragonwell Green Tea", "Flavorful green tea from China", 500000000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 3, "tea>50000000000000000", "multiplier+=0.6;Game.recalculate();", "Gain extra <b>60%</b> of your base TpS");
			upgrades[67] = new Upgrade(67, "Pumpkin Spice Oolong Tea", "Fall special tea with lots of spices", 500000000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 3, "tea>50000000000000000", "multiplier+=0.6;Game.recalculate();", "Gain extra <b>60%</b> of your base TpS");
			upgrades[68] = new Upgrade(68, "Coffee tea", "Tea prepared from leaves of the coffee plant", 500000000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 3, "tea>50000000000000000", "multiplier+=0.6;Game.recalculate();", "Gain extra <b>60%</b> of your base TpS");
			upgrades[69] = new Upgrade(69, "Green Rooibos Tea", "Less-processed rooibos tea rich in antioxidants", 500000000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 3, "tea>50000000000000000", "multiplier+=0.6;Game.recalculate();", "Gain extra <b>60%</b> of your base TpS");
			//Teas - 50E
			upgrades[70] = new Upgrade(70, "Black Currant", "Premium berry-scented black tea with exceptional flavor", 50000000000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 4, "tea>5000000000000000000", "multiplier+=1.5;Game.recalculate();", "Gain extra <b>150%</b> of your base TpS");
			upgrades[71] = new Upgrade(71, "Matcha Green Tea", "Japanese green tea made from ground up leaves", 50000000000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 4, "tea>5000000000000000000", "multiplier+=1.5;Game.recalculate();", "Gain extra <b>150%</b> of your base TpS");
			upgrades[72] = new Upgrade(72, "Tung Ting Oolong Tea", "Rare, slightly fermented tea from Taiwan", 50000000000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 4, "tea>5000000000000000000", "multiplier+=1.5;Game.recalculate();", "Gain extra <b>150%</b> of your base TpS");
			upgrades[73] = new Upgrade(73, "Licorice Tea", "Herbal tea with a powerful, unusual flavor", 50000000000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 4, "tea>5000000000000000000", "multiplier+=1.5;Game.recalculate();", "Gain extra <b>150%</b> of your base TpS");
			upgrades[74] = new Upgrade(74, "Caramel Rooibos Tea", "High grade rooibos with a subtle addition of burnt sugar", 50000000000000000000, "images/icons/cupUpgrade.png", "images/icons/cupOverlay.png", 4, "tea>5000000000000000000", "multiplier+=1.5;Game.recalculate();", "Gain extra <b>150%</b> of your base TpS");
			//Achievement based 12:max
			upgrades[75] = new Upgrade(75, "Learning to brew", "Your learned skills are allowing higher production", 333333333, "images/icons/aBoost.png", "images/icons/aOverlay.png", 1, "unlockedAchievements>=10","apa+=0.02;Game.recalculateABoost();", "Gain extra TpS based <br>on the number of earned achievements");
			upgrades[76] = new Upgrade(76, "Advanced brewing", "Your increasing tea knowledge improves production", 333333333333, "images/icons/aBoost.png", "images/icons/aOverlay.png", 2, "unlockedAchievements>=20","apa+=0.04;Game.recalculateABoost();", "Gain extra TpS based <br>on the number of earned achievements");
			upgrades[77] = new Upgrade(77, "Experienced brewing", "Your vast experience speeds up production", 333333333333333, "images/icons/aBoost.png", "images/icons/aOverlay.png", 3, "unlockedAchievements>=30","apa+=0.06;Game.recalculateABoost();", "Gain extra TpS based <br>on the number of earned achievements");
			upgrades[78] = new Upgrade(78, "Professional brewing", "Your professional level of knowledge boosts production", 333333333333333333, "images/icons/aBoost.png", "images/icons/aOverlay.png", 4, "unlockedAchievements>=40","apa+=0.08;Game.recalculateABoost();", "Gain extra TpS based <br>on the number of earned achievements");
		
		
		for(var a = 0; a<NUMBER_OF_UPGRADES;a++)upgradeStates[a]=0;
		Game.initiateUpgrades = function(){
			var holder = document.getElementById('upgradeHolder');
			for(var i=0;i<NUMBER_OF_UPGRADES;i++)holder.innerHTML+=upgrades[i].getElement();
			$('.upgrades').bind("click",Game.handleUpgradeClick);
			//$('.upgrades').bind("mouseenter",Game.openUDescription);
			$('.upgrades').bind("mousemove",Game.openUDescription);
			$('.upgrades').bind("mouseleave",Game.closeUDescription);
		}
		Game.initiateUpgrades();
			var achievements = [], achievementStates = [];
			var NUMBER_OF_ACHIEVEMENTS = 0, unlockedAchievements=0,cancel=false;
			const NUMBER_OF_COLUMNS=10;
			Game.paintAchievementDescription=function(k){
				cancel=true;
				var descDisplay = document.getElementById('achieveDescPopup');
				var s = descDisplay.style;
				s.display = 'block';
				s.opacity = 0;
				$('#achieveDescPopup').finish();
				$('#achieveDescPopup').animate({opacity:1},200);
				descDisplay.innerHTML='<div style="font-size:20px;font-style:bold;margin-top:4px;margin-left:6px;" id="achName"><b>'+achievements[k].name+'</b></div><div id="descUDesc" class = "description">'+achievements[k].desc+'</div>';
				s.top = parseInt(document.getElementById('a'+k).style.top)-document.getElementById('windowContent').scrollTop-18+'px';
				s.left= parseInt(document.getElementById('a'+k).style.left)+56+'px';
				if(parseInt(s.left)>400)s.left='450px';
			}
			Game.openAchievementDescription=function(event){
				var k = parseInt(event.target.id.replace( /[^\d.]/g, '' ));
				Game.paintAchievementDescription(k);
			}
			Game.closeAchievementDescription=function(event){
				var descDisplay = document.getElementById('achieveDescPopup');
				cancel=false;
				$('#achieveDescPopup').animate({opacity:0},50,"swing",function(){if(!cancel)descDisplay.style.display = 'none';});
			}
			Game.loadAchievements = function(){
				winState=3;
				var w = Game.openWindow();
				w.innerHTML='<div style="text-align:center;font-size:36px;color:#422254;">Achievements</div><div style="font-size:18px;text-align:center;">'+
					'Unlocked: '+unlockedAchievements+'/'+NUMBER_OF_ACHIEVEMENTS+'</div><div id="achievementHolder"style=""></div>';
				var holder=document.getElementById('achievementHolder');
				for(var i=0;i<NUMBER_OF_ACHIEVEMENTS;i++){
					holder.innerHTML+='<div id = "a'+i+'" '+(achievementStates[i]?'class="achievement"':'')+' style="background-image:url(images/achievement'+(achievementStates[i]?'Unlocked':'')+'.png);width:56px;height:56px;position:absolute;left:'+(40+60*(i%NUMBER_OF_COLUMNS))+'px; top:'+(80+60*Math.floor(i/NUMBER_OF_COLUMNS))+'px;"><div style="pointer-events:none;position:absolute;width:46px;height:46px;left:5px;top:5px;background-image:url('+(achievementStates[i]?achievements[i].iconURL:"images/icons/lockedAchievement.png")+');-webkit-filter: brightness('+(achievementStates[i]?0.9:0.6)+');"><div style="pointer-events:none;width:46px;height:46px;'+(achievementStates[i]&&achievements[i].overlayURL?'background-image:url('+achievements[i].overlayURL+');':'')+'-webkit-filter: brightness('+(tierLight[achievements[i].tier-1]+100)/100+') hue-rotate('+tierHues[achievements[i].tier-1]+'deg) saturate('+tierSats[achievements[i].tier-1]/100+uuu;
				}
				$('.achievement').bind("mouseenter",Game.openAchievementDescription);
				$('.achievement').bind("mouseleave",Game.closeAchievementDescription);
			}
			
			Game.testForAchievements = function(){
				var popup, ct=0;
				for(var i=0;i<NUMBER_OF_ACHIEVEMENTS;i++){
					if(!achievementStates[i]&&eval(achievements[i].requirement)){
						Game.updateUpgradeAvailability();
						var d=document.getElementById("achievePopup");
						achievementStates[i]=1;
						unlockedAchievements++;
						if(ct==0){
							d.innerHTML="<br><br>"+achievements[i].name;
							d.style.display='block';
							d.style.opacity=0;
							d.style.top='-120px';
							$("#achievePopup").animate({opacity:0.95,top:'20px'},1000,"swing",function(){
								$("#achievePopup").delay(1000).animate({opacity:0,top:'-120px'},1000,"swing",function(){
									$("#achievePopup").display='none';
								});
							});
							popup=i;
						}else{
							d.innerHTML="<br><br>"+achievements[popup].name+"  +"+ct+" more";
						}
						ct++;
					}
				}
				Game.recalculateABoost();
			}
			Game.unlock=function(id){
				if(!achievementStates[id]){
					Game.updateUpgradeAvailability();
					var d=document.getElementById("achievePopup");
					achievementStates[id]=1;
					unlockedAchievements++;
					d.innerHTML="<br><br>"+achievements[id].name;
					d.style.display='block';
					d.style.opacity=0;
					d.style.top='-120px';
					$("#achievePopup").animate({opacity:0.95,top:'20px'},1000,"swing",function(){
						$("#achievePopup").delay(1000).animate({opacity:0,top:'-120px'},1000,"swing",function(){
							$("#achievePopup").display='none';
						});
					});
					Game.recalculateABoost();
				}
			}
			Game.getIdByName=function(s){
				for(var i=0;i<NUMBER_OF_ACHIEVEMENTS;i++)if(achievements[i].name===s)return i;return -1;
			}
			Game.clearAchievements = function(){
				for(var i=0;i<NUMBER_OF_ACHIEVEMENTS;i++){
					achievementStates[i]=0;
				}
				unlockedAchievements=0;
			}
			Game.countUnlockedAchievements=function(){unlockedAchievements=0;for(var i=0;i<NUMBER_OF_ACHIEVEMENTS;i++)if(achievementStates[i]==1)unlockedAchievements++;Game.recalculateABoost();}
			function Achievement(name, desc, iconURL, overlayURL, tier, requirement){
				this.name=name;
				this.desc=desc;
				this.iconURL=iconURL;
				this.overlayURL=overlayURL;
				this.tier=tier;
				this.requirement=requirement;
				this.getElement=function(){return };
			}
			function addAchievement(a){a.id=NUMBER_OF_ACHIEVEMENTS;achievements[NUMBER_OF_ACHIEVEMENTS++]=a;achievementStates[NUMBER_OF_ACHIEVEMENTS-1]=0;}
		Game.initAchievements=function(){
			addAchievement(new Achievement("Morning Cup", "Produce <b>"+Game.formatToUser(1)+"</b> of tea in one game","images/icons/achievementTea.png","images/icons/achievementTeaOverlay.png",1,"totalTea>=1"));
			addAchievement(new Achievement("Tin of Tea", "Produce <b>"+Game.formatToUser(100)+"</b> of tea in one game","images/icons/achievementTea.png","images/icons/achievementTeaOverlay.png",1,"totalTea>=100"));
			addAchievement(new Achievement("Bulk Delivery", "Produce <b>"+Game.formatToUser(10000)+"</b> of tea in one game","images/icons/achievementTea.png","images/icons/achievementTeaOverlay.png",1,"totalTea>=10000"));//10kg
			addAchievement(new Achievement("Tea Bathtub", "Produce <b>"+Game.formatToUser(1000000)+"</b> of tea in one game","images/icons/achievementTea.png","images/icons/achievementTeaOverlay.png",2,"totalTea>=1000000"));//ton
			addAchievement(new Achievement("Tea Room", "Produce <b>"+Game.formatToUser(100000000)+"</b> of tea in one game","images/icons/achievementTea.png","images/icons/achievementTeaOverlay.png",2,"totalTea>=100000000"));
			addAchievement(new Achievement("Opium Trade", "Produce <b>"+Game.formatToUser(10000000000)+"</b> of tea in one game","images/icons/achievementTea.png","images/icons/achievementTeaOverlay.png",2,"totalTea>=10000000000"));
			addAchievement(new Achievement("Mass production", "Produce <b>"+Game.formatToUser(1000000000000)+"</b> of tea in one game","images/icons/achievementTea.png","images/icons/achievementTeaOverlay.png",3,"totalTea>=1000000000000"));//megaton 1Tg
			addAchievement(new Achievement("World-wide Production", "Produce <b>"+Game.formatToUser(100000000000000)+"</b> of tea in one game","images/icons/achievementTea.png","images/icons/achievementTeaOverlay.png",3,"totalTea>=100000000000000"));//100Tg
			addAchievement(new Achievement("Monopoly", "Produce <b>"+Game.formatToUser(10000000000000000)+"</b> of tea in one game","images/icons/achievementTea.png","images/icons/achievementTeaOverlay.png",3,"totalTea>=10000000000000000"));//10 Pg 
			addAchievement(new Achievement("Cosmic Production", "Produce <b>"+Game.formatToUser(1001000000000000000)+"</b> of tea in one game","images/icons/achievementTea.png","images/icons/achievementTeaOverlay.png",4,"totalTea>=1000000000000000000"));//teraton 1Eg
			addAchievement(new Achievement("Interstellar Production", "Produce <b>"+Game.formatToUser(100000000000000000000)+"</b> of tea in one game","images/icons/achievementTea.png","images/icons/achievementTeaOverlay.png",4,"totalTea>=100000000000000000000"));//100 Eg
			addAchievement(new Achievement("Intergalactic Production", "Produce <b>"+Game.formatToUser(10000000000000000000000)+"</b> of tea in one game","images/icons/achievementTea.png","images/icons/achievementTeaOverlay.png",5,"totalTea>=10000000000000000000000"));//10 Zg
			
			addAchievement(new Achievement("A Steady Start", "Produce <b>"+Game.formatToUser(1)+"</b> tea per second", "images/icons/achievementTps.png","images/icons/achievementTpsOverlay.png",1,"tps>=1"));
			addAchievement(new Achievement("Solid Improvement", "Produce <b>"+Game.formatToUser(100)+"</b> tea per second", "images/icons/achievementTps.png","images/icons/achievementTpsOverlay.png",1,"tps>=100"));
			addAchievement(new Achievement("Streamlined Processing", "Produce <b>"+Game.formatToUser(10000)+"</b> tea per second", "images/icons/achievementTps.png","images/icons/achievementTpsOverlay.png",1,"tps>=10000"));
			addAchievement(new Achievement("Waves of Tea", "Produce <b>"+Game.formatToUser(1000000)+"</b> tea per second", "images/icons/achievementTps.png","images/icons/achievementTpsOverlay.png",2,"tps>=1000000"));
			addAchievement(new Achievement("Stream of Tea", "Produce <b>"+Game.formatToUser(100000000)+"</b> tea per second", "images/icons/achievementTps.png","images/icons/achievementTpsOverlay.png",2,"tps>=100000000"));
			addAchievement(new Achievement("River of Tea", "Produce <b>"+Game.formatToUser(10000000000)+"</b> tea per second", "images/icons/achievementTps.png","images/icons/achievementTpsOverlay.png",3,"tps>=10000000000"));
			addAchievement(new Achievement("Waterfall of Tea", "Produce <b>"+Game.formatToUser(1000000000000)+"</b> tea per second", "images/icons/achievementTps.png","images/icons/achievementTpsOverlay.png",3,"tps>=1000000000000"));
			addAchievement(new Achievement("Extreme Engineering", "Produce <b>"+Game.formatToUser(100000000000000)+"</b> tea per second", "images/icons/achievementTps.png","images/icons/achievementTpsOverlay.png",4,"tps>=100000000000000"));
			addAchievement(new Achievement("Tea Power", "Produce <b>"+Game.formatToUser(10000000000000000)+"</b> tea per second", "images/icons/achievementTps.png","images/icons/achievementTpsOverlay.png",5,"tps>=10000000000000000"));
			
			addAchievement(new Achievement("Beginner sipper", "Make <b>"+Game.formatToUser(1000)+"</b> tea by sipping","images/icons/baseclickUpgrade.png","images/icons/baseclickOverlay.png",1,"teaByClicking>=1000"));
			addAchievement(new Achievement("Novice sipper", "Make <b>"+Game.formatToUser(1000000)+"</b> tea by sipping","images/icons/baseclickUpgrade.png","images/icons/baseclickOverlay.png",1,"teaByClicking>=1000000"));
			addAchievement(new Achievement("Learning sipper", "Make <b>"+Game.formatToUser(1000000000)+"</b> tea by sipping","images/icons/baseclickUpgrade.png","images/icons/baseclickOverlay.png",2,"teaByClicking>=1000000000"));//g
			addAchievement(new Achievement("Experienced sipper", "Make <b>"+Game.formatToUser(1000000000000)+"</b> tea by sipping","images/icons/baseclickUpgrade.png","images/icons/baseclickOverlay.png",3,"teaByClicking>=1000000000000"));//t
			addAchievement(new Achievement("Professional sipper", "Make <b>"+Game.formatToUser(1000100000000000)+"</b> tea by sipping","images/icons/baseclickUpgrade.png","images/icons/baseclickOverlay.png",4,"teaByClicking>=1000000000000000"));//p
			addAchievement(new Achievement("Expert sipper", "Make <b>"+Game.formatToUser(1000100000000000000)+"</b> tea by sipping","images/icons/baseclickUpgrade.png","images/icons/baseclickOverlay.png",5,"teaByClicking>=1000000000000000000"));//e
			//build achievs
			addAchievement(new Achievement("Aspiring Gardener", "Own <b>50</b> tea bushes", "images/buildings/b0.png","",1,"numberOfBuildings[0]>=50"));
			addAchievement(new Achievement("Bush Magnate", "Own <b>100</b> tea bushes", "images/buildings/b0.png","",1,"numberOfBuildings[0]>=100"));
			addAchievement(new Achievement("Scrublord", "Own <b>150</b> tea bushes", "images/buildings/b0.png","",1,"numberOfBuildings[0]>=150"));
			addAchievement(new Achievement("Tea Village", "Own <b>50</b> tea houses", "images/buildings/b1.png","",1,"numberOfBuildings[1]>=50"));
			addAchievement(new Achievement("Tea Community", "Own <b>100</b> tea houses", "images/buildings/b1.png","",1,"numberOfBuildings[1]>=100"));
			addAchievement(new Achievement("Tea Township", "Own <b>150</b> tea houses", "images/buildings/b1.png","",1,"numberOfBuildings[1]>=150"));
			addAchievement(new Achievement("Local Farmer", "Own <b>50</b> tea farms", "images/buildings/b2.png","",1,"numberOfBuildings[2]>=50"));
			addAchievement(new Achievement("Commerical Farmer", "Own <b>100</b> tea farms", "images/buildings/b2.png","",1,"numberOfBuildings[2]>=100"));
			addAchievement(new Achievement("Global Farmer", "Own <b>150</b> tea farms", "images/buildings/b2.png","",1,"numberOfBuildings[2]>=150"));
			addAchievement(new Achievement("Tea County", "Own <b>50</b> tea cities", "images/buildings/b3.png","",1,"numberOfBuildings[3]>=50"));
			addAchievement(new Achievement("Tea Province", "Own <b>100</b> tea cities", "images/buildings/b3.png","",1,"numberOfBuildings[3]>=100"));
			addAchievement(new Achievement("Tea Nation", "Own <b>150</b> tea cities", "images/buildings/b3.png","",1,"numberOfBuildings[3]>=150"));
			addAchievement(new Achievement("Marine Priesthood", "Own <b>50</b> sea temples", "images/buildings/b4.png","",1,"numberOfBuildings[4]>=50"));
			addAchievement(new Achievement("Sailing Hazard", "Own <b>100</b> sea temples", "images/buildings/b4.png","",1,"numberOfBuildings[4]>=100"));
			addAchievement(new Achievement("Ally of Poseidon", "Own <b>150</b> sea temples", "images/buildings/b4.png","",1,"numberOfBuildings[4]>=150"));
			addAchievement(new Achievement("Rocket Science", "Own <b>50</b> asteroid drills", "images/buildings/b5.png","",1,"numberOfBuildings[5]>=50"));
			addAchievement(new Achievement("Space fiend", "Own <b>100</b> asteroid drills", "images/buildings/b5.png","",1,"numberOfBuildings[5]>=100"));
			addAchievement(new Achievement("Cosmic sipping", "Own <b>150</b> asteroid drills", "images/buildings/b5.png","",1,"numberOfBuildings[5]>=150"));
			addAchievement(new Achievement("Oceanic Infuser", "Own <b>50</b> island teabags", "images/buildings/b6.png","",1,"numberOfBuildings[6]>=50"));
			addAchievement(new Achievement("Liliuokalani", "Own <b>100</b> island teabags", "images/buildings/b6.png","",1,"numberOfBuildings[6]>=100"));
			addAchievement(new Achievement("MLG Pro", "Own <b>150</b> island teabags", "images/buildings/b6.png","",1,"numberOfBuildings[6]>=150"));
			addAchievement(new Achievement("Earthshaker", "Own <b>50</b> planet tealizers", "images/buildings/b7.png","",1,"numberOfBuildings[7]>=50"));
			addAchievement(new Achievement("Continental Brewer", "Own <b>100</b> planet tealizers", "images/buildings/b7.png","",1,"numberOfBuildings[7]>=100"));
			addAchievement(new Achievement("Plate teatonics", "Own <b>150</b> planet tealizers", "images/buildings/b7.png","",1,"numberOfBuildings[7]>=150"));

			addAchievement(new Achievement("Homegrown", "Produce <b>"+Game.formatToUser(5000000000)+"</b> of tea from the tea bushes alone", "images/buildings/b0.png","",1,"teaFromBuildings[0]>=5000000000"));
			addAchievement(new Achievement("Ceremonial", "Produce <b>"+Game.formatToUser(80010000000)+"</b> of tea from the tea houses alone", "images/buildings/b1.png","",1,"teaFromBuildings[1]>=80000000000"));
			addAchievement(new Achievement("All-Natural", "Produce <b>"+Game.formatToUser(50010000000000)+"</b> of tea from the tea farms alone", "images/buildings/b2.png","",1,"teaFromBuildings[2]>=50000000000000"));
			addAchievement(new Achievement("Overgrown", "Produce <b>"+Game.formatToUser(240000000000000)+"</b> of tea from the tea cities alone", "images/buildings/b3.png","",1,"teaFromBuildings[3]>=240000000000000"));
			addAchievement(new Achievement("Devout", "Produce <b>"+Game.formatToUser(10010000000000000)+"</b> of tea from the sea temples alone", "images/buildings/b4.png","",1,"teaFromBuildings[4]>=10010000000000000"));
			addAchievement(new Achievement("Pioneer", "Produce <b>"+Game.formatToUser(400100000000000000)+"</b> of tea from the asteroid drills alone", "images/buildings/b5.png","",1,"teaFromBuildings[5]>=400100000000000000"));
			addAchievement(new Achievement("Archipelago", "Produce <b>"+Game.formatToUser(13001000000000000000)+"</b> of tea from the island teabags alone", "images/buildings/b6.png","",1,"teaFromBuildings[6]>=13000000000000000000"));
			addAchievement(new Achievement("Overkill", "Produce <b>"+Game.formatToUser(500100000000000000000)+"</b> of tea from the planet tealizers alone", "images/buildings/b7.png","",1,"teaFromBuildings[7]>=500000000000000000000"));
			
			addAchievement(new Achievement("Uberclicker","Click 8 times in a second", "images/icons/baseclickUpgrade.png", "images/icons/baseclickOverlay.png",5,"false"));
			
			addAchievement(new Achievement("A New Beginning", "Sacrifice <b>"+Game.formatToUser(10010000000000000000)+"</b> of tea", "images/icons/aSacrifice.png", "images/icons/aSacrificeOverlay.png", 1,"teaSacrificed>=10000000000000000000"));
			addAchievement(new Achievement("A Tough Loss", "Sacrifice <b>"+Game.formatToUser(100100000000000000000)+"</b> of tea", "images/icons/aSacrifice.png", "images/icons/aSacrificeOverlay.png", 2,"teaSacrificed>=100000000000000000000"));
			addAchievement(new Achievement("Obliviate!", "Sacrifice <b>"+Game.formatToUser(1001000000000000000000)+"</b> of tea", "images/icons/aSacrifice.png", "images/icons/aSacrificeOverlay.png", 3,"teaSacrificed>=1000000000000000000000"));
			addAchievement(new Achievement("No! Not All My Tea!", "Sacrifice <b>"+Game.formatToUser(10010000000000000000000)+"</b> of tea", "images/icons/aSacrifice.png", "images/icons/aSacrificeOverlay.png", 4,"teaSacrificed>=10000000000000000000000"));
			addAchievement(new Achievement("Great Sacrifice", "Sacrifice <b>"+Game.formatToUser(100100000000000000000000)+"</b> of tea", "images/icons/aSacrifice.png", "images/icons/aSacrificeOverlay.png", 5,"teaSacrificed>=100000000000000000000000"));
			
			addAchievement(new Achievement("Master Upgrader", "Purchase all 79 upgrades", "images/icons/aBoost.png", "images/icons/aOverlay.png", 5, "Game.countAvailibleUpgrades(2)===79"));
			//console.log(achievements);
		}

		const MAX_TEXT_PARTICLES_VISIBLE = 20;
		var textParticles = [];
		var particleElements = '';
		for(var i = 0; i <MAX_TEXT_PARTICLES_VISIBLE; i++){
			textParticles[i] = {x:0,y:0,life:-1,text:"",l:null};
			particleElements+='<div id="particle'+i+'" class="addedTeaTextParticle"></div>';
		}
		document.getElementById("txtParticles").innerHTML = particleElements;
		Game.updateTextParticles=function(){
			for(var i in textParticles){
				var me = textParticles[i];
				if(me.life!=-1){
					var y=me.y-(1-Math.pow(1-me.life/40,10))*50;
					me.life++;
					var el = me.l;
					el.style.left=Math.floor(me.x)+'px';
					el.style.bottom=Math.floor(-y)+'px';
					el.style.opacity=1-(me.life/40);
					if (me.life>=40)
					{
						me.life=-1;
						el.style.opacity=0;
						el.style.display='none';
					}
				}
			}
		}
		Game.addTextParticle=function(text){
			var highest=0;
			var highestI=0;
			for (var i=0;i<textParticles.length;i++)
			{
				if (textParticles[i].life==-1) {highestI=i;break;}
				if (textParticles[i].life>highest)
				{
					highest=textParticles[i].life;
					highestI=i;
				}
			}
			var me = textParticles[highestI];
			me.life=0;
			me.x=Math.random()*95+35;
			me.y=170+Math.random()*120;
			if (!me.l) me.l=document.getElementById('particle'+i);
			me.text=text;
			me.l.innerHTML=text;
			me.l.style.left=Math.floor(me.x)+'px';
			me.l.style.bottom=Math.floor(-me.y)+'px';
			me.l.style.display='block';
		}
			/*(function($) {
			$.fn.hasScrollBar = function() {
				return this.get(0).scrollHeight > this.height();
			}
			})(jQuery);*/
			Game.adjustSettingButton=function(){
				var b = document.getElementById('settingsButton');
				var nor = Math.ceil(Game.countAvailibleUpgrades(1)/4);
				if(/*$('#right').hasScrollBar()*/false){b.style.bottom='auto';b.style.top=45+nor*60+'px';b.style.backgroundImage='url(images/settingsButtonShort.jpg)';b.style.width='243px';}
				else {b.style.bottom=0+'px';b.style.top='auto';b.style.backgroundImage='url(images/settingsButton.jpg)';b.style.width='264px';}
			}
		var winState=0;
		Game.closeWindow=function(){
			$("#windowPopup").animate({opacity:0},300,"swing",function(){document.getElementById('windowPopup').style.display='none';});
			if(winState==2)Game.saveGame();
			winState=0;
		}
		Game.openWindow=function(){
			document.getElementById('windowPopup').style.display='block';
			document.getElementById('windowPopup').style.opacity=0;
			$("#windowPopup").animate({opacity:1},300,"swing");
			return document.getElementById('windowContent');
		}
		Game.formatDate=function(theDate){
			var hours = Math.floor(theDate/3600000);
			var minutes = Math.floor((theDate-hours*3600000)/60000);
			var seconds = Math.floor((theDate-hours*3600000-minutes*60000)/1000);
			return (hours<10?"0":"")+hours+":"+(minutes<10?"0":"")+minutes+":"+(seconds<10?"0":"")+seconds;
		}
		Game.loadStats = function(){
			winState=1;
			var w = Game.openWindow();
			w.innerHTML='<div style="text-align:center;font-size:36px;color:#422254;">Statistics</div><div id="leftWindow"style="position:absolute;left:2px;"></div><div id="rightWindow" style="position:absolute;right:2px;width:340px;"></div>'
			var wL=document.getElementById('leftWindow'), wR=document.getElementById('rightWindow');
			wL.innerHTML='<div style="font-size:18px;"> Total base TPS: '+Game.formatToUser(baseTPS)+'/sec<br> Multiplier from tea cups: '+multiplier.toFixed(2)+'<br> Multiplier from achievements: '+aBoost.toFixed(2)+(planet>0?'<br> Multiplier from golden infusers: '+(1+infusers/100).toFixed(2):'')+'<br> Effective TPS: '+Game.formatToUser(tps)+'/sec'+
				'<br><br> Clicks: '+clicksMade+'<br> Tea made by clicking: '+Game.formatToUser(teaByClicking)+' ('+(teaByClicking/totalTea*100).toFixed(1)+'%)<br> Total tea produced'+(planet>0?' this round':'')+': '+Game.formatToUser(totalTea)+'<br><br>'+
				' Time in-game this session: <div id="st" style="display:inline;">'+Game.formatDate(sessionTime)+'</div><br> Time in-game total: <div id="tt"style="display:inline;">'+Game.formatDate(pastTime+sessionTime)+'</div><br>'
				+'<br> Unlocked Achievements: '+unlockedAchievements+'/'+NUMBER_OF_ACHIEVEMENTS+'<br> Purchased Upgrades: '+Game.countAvailibleUpgrades(2)+'/'+NUMBER_OF_UPGRADES+'<br>'
				+'</div>';
			wR.innerHTML='<div style="font-size:18px;"><div id="prestigeStat"></div>'+
				'</div>';
			if(planet>0)document.getElementById('prestigeStat').innerHTML=' Planets colonized: '+planet+'<br>Time including previous planets: <div id="ot"style="display:inline;">'+Game.formatToUser(pastTime+sessionTime+oldTime)+'</div><br>Total tea ever produced: '+Game.formatToUser(teaSacrificed+totalTea)+'<br> Tea sacrificed: '+Game.formatToUser(teaSacrificed)+'<br><div style="color:#F1D50E;text-shadow: -1px 0 #A47D09, 0 1px #A47D09, 1px 0 #A47D09, 0 -1px #A47D09;font-size:22px;display:inline;">Golden Infusers: '+infusers+"</div>";
		}
		Game.loadSettings = function(){
			winState=2;
			var w = Game.openWindow();
			w.innerHTML='<div style="text-align:center;font-family:\'Nirmala UI Semilight\';font-size:36px;color:#422254;">Settings</div>'+
				'<div style="font-size:18px;">Number display mode:   <select id="selectFormat" ><option value="a">SI prefix grams</option><option value="b">SI prefix tonnes</option><option value="c">Scientific Notation</option></select>'+
				'<br><button type = "button"id="hrb">Hard Reset</button><br><button type = "button" id="hash">Get Code</button><button type = "button" id="dehash">Enter Code</button><br><textarea id="hashText" style = "width:80%;height:100px;"></textarea><br><br><br><br><br><br><br>Version 1.2.0<br>&copy; PotatoSlapper 2015'+'</div>';
			document.getElementById("selectFormat").selectedIndex = settings.format;
			$('#selectFormat').bind('change',Game.updateFormat);
			$('#hrb').bind('click', Game.promptHardReset);
			
			$('#hash').bind('click', Game.outputHash);
			$('#dehash').bind('click', Game.inputHash);
			//console.log("bound hash to outputhash");
			//document.getElementById('dehash').addEventListener('click', Game.inputHash);
		}
		Game.promptHardReset = function(){
			if(confirm("Note: This will erase all progress, achievements and prestige.\nAre you sure you want to proceed?")){
				if(confirm("Are you REALLY sure?")){
					if(typeof(Storage)!=="undefined")localStorage.clear();
					Game.resetGame();
				}
			}
		}
		Game.loadGame=function(){
			if(typeof(Storage) === "undefined"){console.log("Unable to load: no storage availible.");Game.initAchievements();return;};
			if(localStorage.gameSave!=="yesV3"){console.log("Unable to load: no save found of the correct version.");Game.initAchievements();return;};
			var sett=JSON.parse(localStorage.settings);
			settings=sett;
			Game.initAchievements();
			var as=JSON.parse(localStorage.achievementStates);
			achievementStates=as;
			Game.countUnlockedAchievements();
			cheater=+localStorage.cheater;
			planet=+localStorage.planet;
			teaSacrificed=+localStorage.teaSacrificed;
			maxB=+localStorage.maxB;
			multiplier = 1.0;
			oldtime=+localStorage.oldTime;
			mostTea=+localStorage.mostTea;
				tea=mostTea;//buildings
				var nob = localStorage.numberOfBuildings;
				numberOfBuildings=JSON.parse(nob);
				for(var i=0;i<8;i++)Game.updateBuilding(i);
				var tfb = localStorage.teaFromBuildings;
				teaFromBuildings=JSON.parse(tfb);
			tea=+localStorage.tea;
			totalTea=+localStorage.totalTea;
			teaByClicking=+localStorage.teaByClicking;
			clicksMade=+localStorage.clicksMade;
			var us=JSON.parse(localStorage.upgradeStates);
			upgradeStates=us;
			for(var j=upgradeStates.length;j<NUMBER_OF_UPGRADES;j++)upgradeStates[j]=0;
			for(var i=0;i<NUMBER_OF_UPGRADES;i++)if(upgradeStates[i]==2)eval(upgrades[i].effect);
			Game.updateUpgradeAvailability(true,true);
			Game.updateCounter();
			Game.updateCanBuyBuildingsUpgrades();
			pastTime=+localStorage.pastTime;
			oldTime=+localStorage.oldTime;
			if(typeof localStorage.timeClosed!=='undefined')timeClosed=+localStorage.timeClosed;
			infusers = Game.calculateInfusers(teaSacrificed);
			Game.updateSRButton();
			//setTimeout(Game.getOfflineTea,2000);
		}
		Game.getOfflineTea=function(){
			var newTea = Math.floor(tps*0.001*(sessionOpened-timeClosed));
			console.log("away for "+(sessionOpened-timeClosed)/1000+" sec");
			tea+=newTea;totalTea+=newTea;
			if(tps>0)alert("While you were away, your tea empire produced "+Game.formatToUser(newTea)+" of tea!");
		}
		Game.resetGame=function(){
			tea=0;
			mostTea=0;
			totalTea=0;
			teaByClicking=0;
			teaSacrificed=0;
			planet=0;
			clicksMade=0;
			maxB=0;
			aBoost=1;
			apa=0;
			additionalClickGain=0;
			baseClickGain=1;
			pastTime=0;
			oldTime=0;
			sessionTime=0;
			infusers=0;
			multiplier = 1.0;
			DD=new Date();
			sessionOpened=DD.getTime();
			Game.resetBuildings();
			for(var a=0;a<8;a++){
				Game.updateBuilding(a);
				if(a>0)document.getElementById('b'+a).style.display='none';
			}
			Game.clearAchievements();
			Game.clearUpgrades();
			Game.recalculate();
			Game.calculateInfusers();
			Game.saveGame();
			Game.adjustSettingButton();
		}
		Game.softReset=function(){
			Game.loadPrestigeScreen();
			tea=0;
			mostTea=0;
			teaSacrificed+=totalTea;
			totalTea=0;
			teaByClicking=0;
			planet++;
			clicksMade=0;
			additionalClickGain=0;
			baseClickGain=1;
			aBoost=1;
			apa=0;
			maxB=0;
			oldTime+=pastTime+sessionTime;
			pastTime=0;
			sessionTime=0;
			multiplier = 1.0;
			DD=new Date();
			sessionOpened=DD.getTime();
			Game.resetBuildings();
			for(var a=0;a<8;a++){
				Game.updateBuilding(a);
				if(a>0)document.getElementById('b'+a).style.display='none';
			}
			for(var a = 0; a<NUMBER_OF_UPGRADES;a++)upgradeStates[a]=0;
			infusers=Game.calculateInfusers(teaSacrificed);
			Game.clearUpgrades();
			Game.updateSRButton();
			Game.recalculate();
			Game.recalculateClickGain();
			Game.saveGame();
			Game.adjustSettingButton();
		}
		Game.outputHash=function(){
			var savedSettings = {};
			
			savedSettings.gameSave="yesV3";
			savedSettings.tea=tea;
			savedSettings.mostTea=mostTea;
			savedSettings.totalTea=totalTea;
			savedSettings.teaByClicking=teaByClicking;
			savedSettings.clicksMade=clicksMade;
			savedSettings.maxB=maxB;
			savedSettings.pastTime=pastTime+sessionTime;
			savedSettings.oldTime=oldTime;
			savedSettings.settings=JSON.stringify(settings);
			savedSettings.numberOfBuildings=JSON.stringify(numberOfBuildings);
			savedSettings.teaFromBuildings=JSON.stringify(teaFromBuildings);
			savedSettings.upgradeStates=JSON.stringify(upgradeStates);
			savedSettings.achievementStates=JSON.stringify(achievementStates);
			savedSettings.teaSacrificed=teaSacrificed;
			savedSettings.planet=planet;
			savedSettings.cheater=cheater;
			savedSettings.timeClosed=(new Date()).getTime();
			
			var ss = JSON.stringify(savedSettings);
			//console.log(ss);
			document.getElementById("hashText").innerHTML = ss;
	    }
		Game.saveGame=function(){
			if(typeof(Storage) === "undefined"){console.log("Unable to save: no storage availible.");return;};
			//localStorage.setItem('gameSave','yesV3');
			localStorage.gameSave="yesV3";
			localStorage.tea=tea;
			localStorage.mostTea=mostTea;
			localStorage.totalTea=totalTea;
			localStorage.teaByClicking=teaByClicking;
			localStorage.clicksMade=clicksMade;
			localStorage.maxB=maxB;
			localStorage.pastTime=pastTime+sessionTime;
			localStorage.oldTime=oldTime;
			localStorage.settings=JSON.stringify(settings);
			localStorage.numberOfBuildings=JSON.stringify(numberOfBuildings);
			localStorage.teaFromBuildings=JSON.stringify(teaFromBuildings);
			localStorage.upgradeStates=JSON.stringify(upgradeStates);
			localStorage.achievementStates=JSON.stringify(achievementStates);
			localStorage.teaSacrificed=teaSacrificed;
			localStorage.planet=planet;
			localStorage.cheater=cheater;
			localStorage.timeClosed=(new Date()).getTime();
			
			
		}
		Game.inputHash = function() {
			var ss = document.getElementById("hashText").value;
			var savedSettings = JSON.parse(ss);
			console.log(savedSettings);
			
			var sett=JSON.parse(savedSettings.settings);
			settings=sett;
			Game.initAchievements();
			var as=JSON.parse(savedSettings.achievementStates);
			achievementStates=as;
			Game.countUnlockedAchievements();
			cheater=+savedSettings.cheater;
			planet=+savedSettings.planet;
			teaSacrificed=+savedSettings.teaSacrificed;
			maxB=+savedSettings.maxB;
			multiplier = 1.0;
			oldtime=+savedSettings.oldTime;
			mostTea=+savedSettings.mostTea;
				tea=mostTea;//buildings
				var nob = savedSettings.numberOfBuildings;
				numberOfBuildings=JSON.parse(nob);
				for(var i=0;i<8;i++)Game.updateBuilding(i);
				var tfb = savedSettings.teaFromBuildings;
				teaFromBuildings=JSON.parse(tfb);
			tea=+savedSettings.tea;
			totalTea=+savedSettings.totalTea;
			teaByClicking=+savedSettings.teaByClicking;
			clicksMade=+savedSettings.clicksMade;
			var us=JSON.parse(savedSettings.upgradeStates);
			upgradeStates=us;
			for(var j=upgradeStates.length;j<NUMBER_OF_UPGRADES;j++)upgradeStates[j]=0;
			for(var i=0;i<NUMBER_OF_UPGRADES;i++)if(upgradeStates[i]==2)eval(upgrades[i].effect);
			Game.updateUpgradeAvailability(true,true);
			Game.updateCounter();
			Game.updateCanBuyBuildingsUpgrades();
			pastTime=+savedSettings.pastTime;
			oldTime=+savedSettings.oldTime;
			if(typeof savedSettings.timeClosed!=='undefined')timeClosed=+savedSettings.timeClosed;
			infusers = Game.calculateInfusers(teaSacrificed);
			Game.updateSRButton();
			setTimeout(Game.getOfflineTea,2000);
		}
		setInterval(Game.saveGame, 60000);//Auto-save every minute

		imgObj.addEventListener("mousedown", function(event){event.preventDefault();if(event.button==0)Game.clickTea();});
		Game.clickTea = function(){
			if(true){
				tea+=clickGain;
				totalTea+=clickGain;
				teaByClicking+=clickGain;
				clicksMade+=1;
				if(tea>mostTea)mostTea=tea;
				Game.updateCounter();
				Game.addTextParticle("+"+Game.formatToUser(clickGain)+" tea");
				if(clicksLastSecond++>=8)Game.unlock(Game.getIdByName("Uberclicker"));
				if(clicksLastSecond++>=36)cheater=1;
			}
			//Game.updateCanBuyBuildingsUpgrades();
			//Game.updateUpgradeAvailability(false,false);
			//Game.testForAchievements();
		}
		Game.updateCounter = function(){
			document.getElementById("teacounter").innerHTML = "Tea: "+Game.formatToUser(tea);
		}
		var clicksLastSecond=0;
		Game.loadGame();//get save
		Game.recalculate();
		Game.secondLoop = function (){//Execute every 1000ms:
			tea+=tps;
			totalTea+=tps;
			clicksLastSecond=0;
			for(var g=0;g<8;g++)teaFromBuildings[g]+=bTPS[g];
			if(tea>mostTea)mostTea=tea;
			DD=new Date();
			sessionTime=DD.getTime()-sessionOpened;
			if(winState==1){
				document.getElementById('st').innerHTML=Game.formatDate(sessionTime);
				document.getElementById('tt').innerHTML=Game.formatDate(sessionTime+pastTime);
				if(planet>0)document.getElementById('ot').innerHTML=Game.formatDate(oldTime+sessionTime+pastTime);
			}
			Game.updateCounter();
			Game.updateCanBuyBuildingsUpgrades();
			Game.updateUpgradeAvailability(false,false);
			Game.testForAchievements();
			Game.updateSRButton();
			setTimeout(Game.secondLoop,1000);
		}
		Game.mainLoop = function(){//Execute frame by frame
			Game.updateTextParticles();
			
			setTimeout(Game.mainLoop,25);
		}
		Game.mainLoop();
		Game.secondLoop();
		document.getElementById('windowCloseButton').addEventListener('click',Game.closeWindow);
		document.getElementById('achievePopup').addEventListener('click',Game.loadAchievements);
		document.getElementById('settingsButton').addEventListener('click',Game.loadSettings);
		document.getElementById('right').addEventListener('scroll',Game.adjustSettingButton);
		document.getElementById('achievementButton').addEventListener('click',Game.loadAchievements);
		document.getElementById('softResetButton').addEventListener('mouseover',Game.explainSR);
		document.getElementById('softResetButton').addEventListener('mouseout',Game.hideSR);
		document.getElementById('softResetButton').addEventListener('click',Game.promptSoftReset);
		document.getElementById('txtParticles').addEventListener('click',Game.clickTea);
		$('#statsButton').bind('click',Game.loadStats);
		$('body').bind('unload',Game.saveGame);
		$('body').bind('contextmenu',function(e){e.preventDefault();return false;});
}
window.onload =runGame;
})();