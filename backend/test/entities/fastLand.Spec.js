var unitTestHelper = require("../util/unitTestHelper.js");

var expect = require("chai").expect;
var FastLand, Field, gameStateService;

describe("FastLand", function(){
    before(function (){
        unitTestHelper.setGlobalVars();
        FastLand = require(cardsModule + "/entities/FastLand.js");
        Field = require(cardsModule + '/services/fieldService.js');
        gameStateService = require(cardsModule + '/services/gameStateService.js');
    });
   	describe(".isTapped()", function() {
        it("should be tapped if field has more than two lands", function(){

        	var field = new Field();
            var gameState = new gameStateService(undefined, undefined, field);

        	field.addLand({type:'battle'});
            field.addLand({type:'basic'});
            field.addLand({type:'show'});

            var newLand = new FastLand(5, [], gameState);
        	expect(newLand.isTapped()).equal(true);
        });

        it("should be untapped if field has less or equal than two lands", function(){

            var field = new Field();
            var gameState = new gameStateService(undefined, undefined, field);

            field.addLand({type:'battle'});

            var newLand = new FastLand(5, [], gameState);
            expect(newLand.isTapped()).equal(false);
        });
    });


});