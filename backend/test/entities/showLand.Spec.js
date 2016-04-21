var unitTestHelper = require("../util/unitTestHelper.js");

var expect = require("chai").expect;
var ShowLand, Hand, Land, gameStateService;

describe("ShowLand", function(){
    before(function (){
        unitTestHelper.setGlobalVars();
        ShowLand = require(cardsModule + "/entities/ShowLand.js");
        Hand = require(cardsModule + '/repositories/handRepository.js');
        Land = require(cardsModule + "/entities/Land.js");
        gameStateService = require(cardsModule + '/services/gameStateService.js');
    });
   	describe(".isTapped()", function() {
        it("should be untapped if hand has basic with matching color", function(){

        	var hand = new Hand();
            var gameState = new gameStateService(undefined, hand, undefined);

        	hand.set([
                new Land(1, 'red', true, 'basic'),
            ]);

            var newLand = new ShowLand(5, ['red', 'green'], gameState);
        	expect(newLand.isTapped()).equal(false);
        })

        it("should be tapped if hand does not have basic with matching color", function(){

            var hand = new Hand();
            var gameState = new gameStateService(undefined, hand, undefined);

            hand.set([
                new Land(1, 'red', true, 'basic'),
            ]);

            var newLand = new ShowLand(5, ['blue', 'black'], gameState);
            expect(newLand.isTapped()).equal(true);
        })
    });
});