var unitTestHelper = require("../util/unitTestHelper.js");

var expect = require("chai").expect;
var BattleLand, Field, gameStateService;

describe("BattleLand", function(){
    before(function (){
        unitTestHelper.setGlobalVars();
        BattleLand = require(cardsModule + "/entities/BattleLand.js");
        Field = require(cardsModule + '/services/fieldService.js');
        gameStateService = require(cardsModule + '/services/gameStateService.js');
    });
   	describe(".isTapped()", function() {
        it("should be tapped if field has less than two basics", function(){

        	var field = new Field();
            var gameState = new gameStateService(undefined, undefined, field);

        	field.addLand({type:'battle'});
            field.addLand({type:'basic'});

            var newLand = new BattleLand(5, [], gameState);
        	expect(newLand.isTapped()).equal(true);
        })

        it("should be untapped if field has more or equal than two basics", function(){

            var field = new Field();
            var gameState = new gameStateService(undefined, undefined, field);

            field.addLand({type:'basic'});
            field.addLand({type:'basic'});

            var newLand = new BattleLand(5, [], gameState);
            expect(newLand.isTapped()).equal(false);
        })
    });


});