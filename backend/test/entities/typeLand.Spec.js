var unitTestHelper = require("../util/unitTestHelper.js");

var expect = require("chai").expect;
var BattleLand, gameStateService;

describe("TypeLand", function(){
    before(function (){
        unitTestHelper.setGlobalVars();
        TypeLand = require("../../modules/cards/entities/TypeLand.js");
        gameStateService = require(cardsModule + '/services/gameStateService.js');
    });
   	describe(".getColors()", function() {
        it("should return all colors when types match", function(){

            var gameState = new gameStateService(undefined, undefined, undefined);
            gameState.setSpellsType('allies');

            var newLand = new TypeLand(
                5, 
                ['colorless'], 
                false, 
                'allies', 
                ['red', 'green', 'blue', 'white', 'black'], 
                gameState
            );
        	expect(newLand.getColors()).eql(['red', 'green', 'blue', 'white', 'black']);
        })

        it("should return default color when types don't match", function(){

            var gameState = new gameStateService(undefined, undefined, undefined);
            gameState.setSpellsType('devoid');

            var newLand = new TypeLand(
                5, 
                ['colorless'], 
                false, 
                'allies', 
                ['red', 'green', 'blue', 'white', 'black'], 
                gameState
            );
            expect(newLand.getColors()).eql(['colorless']);
        })

        it("should return default color if type was not set", function(){

            var gameState = new gameStateService(undefined, undefined, undefined);

            var newLand = new TypeLand(
                5, 
                ['colorless'], 
                false, 
                'allies', 
                ['red', 'green', 'blue', 'white', 'black'], 
                gameState
            );

            expect(newLand.getColors()).eql(['colorless']);
        })
    });


});