var unitTestHelper = require("../util/unitTestHelper.js");

var expect = require("chai").expect;
var LastRoundLand, Field, gameStateService;

describe("LastRoundLand", function(){
    before(function (){
        unitTestHelper.setGlobalVars();
        LastRoundLand = require(cardsModule + "/entities/LastRoundLand.js");
        gameStateService = require(cardsModule + '/services/gameStateService.js');
    });
   	describe(".getColors()", function() {
        it("should be tapped if it is not the last land", function(){
            var gameState = new gameStateService(undefined, undefined, undefined);
            gameState.setRemainingLandsCount(2);

            var newLand = new LastRoundLand(
                1, 
                ['colorless'], 
                ['red', 'green', 'blue', 'white', 'black'],
                gameState
            );
            expect(newLand.isTapped()).equal(true);
        })

        it("should be untapped if it is not the last land", function(){
            var gameState = new gameStateService(undefined, undefined, undefined);
            gameState.setRemainingLandsCount(1);

            var newLand = new LastRoundLand(
                1, 
                ['colorless'], 
                ['red', 'green', 'blue', 'white', 'black'],
                gameState
            );
            expect(newLand.isTapped()).equal(false);
        })

        it("should return colorless if it is not the last land", function(){

            var gameState = new gameStateService(undefined, undefined, undefined);
            gameState.setRemainingLandsCount(2);

            var newLand = new LastRoundLand(
                1, 
                ['colorless'], 
                ['red', 'green', 'blue', 'white', 'black'],
                gameState
            );
        	expect(newLand.getColors()).eql(['colorless']);
        })

        it("should return colored it is last land", function(){

            var gameState = new gameStateService(undefined, undefined, undefined);
            gameState.setRemainingLandsCount(1);

            var newLand = new LastRoundLand(
                1, 
                ['colorless'], 
                ['red', 'green', 'blue', 'white', 'black'],
                gameState
            );
            expect(newLand.getColors()).eql(['red', 'green', 'blue', 'white', 'black']);
        })
    });


});