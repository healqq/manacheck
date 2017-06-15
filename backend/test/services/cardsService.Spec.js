var unitTestHelper = require("../util/unitTestHelper.js");

var expect = require("chai").expect;
var CardsService;

describe("CardsService", function(){
    before(function (){
        unitTestHelper.setGlobalVars();
        CardsService = require("../../modules/cards/services/cardsService.js");
    });


    describe(".play()", function() {
        it("should return state 422", function(){
        	var colors = [{color: 'red', value:2},{color: 'green', value: 2}];
        	var lands  = [74,74,74,74,74,74,74,74,74,74,74,74,];

        	var cs = new CardsService();
        	cs.setLands(lands);
        	cs.setColors(colors);
        	cs.setGenericMana(0);
            cs.setCardsCount(60);
        	expect(cs.play().status).equal(422);
        })

        it("should return rounds, hashes, starting hand lands count and mulligans", function(){
        	var colors = [{color: 'green', value: 2}];
        	var lands  = [58,58,58,58,58,58,58,58,58,58,58,58,58];

        	var cs = new CardsService();
        	cs.setLands(lands);
        	cs.setColors(colors);
        	cs.setGenericMana(0);
            cs.setCardsCount(60);
            var playResult = cs.play();
        	expect(playResult.status).equal(undefined);
            // rounds
        	expect(playResult.data.rounds.length).equal(1000);
            // hashes
        	expect(playResult.data.hashes).instanceof(Object);
            // starting lands in hand
            expect(playResult.data.hands).instanceof(Object);
            for (var i=0; i<=7; i++) {
                expect(playResult.data.hands[i]).to.exist;
            }
            // mulligans
            expect(playResult.data.mulligans).instanceof(Object);
            expect(playResult.data.mulligans.from7).to.exist;
            expect(playResult.data.mulligans.from6).to.exist;

        })

        it("should return work correctly with generic mana", function(){
            var colors = [{color: 'green', value: 2}];
            var lands  = [58,58,58,58,58,58,58,58,58,58,58,58,58,58,58];

            var cs = new CardsService();
            cs.setLands(lands);
            cs.setColors(colors);
            cs.setGenericMana(2);
            cs.setCardsCount(60);
            var playResult = cs.play();
            expect(playResult.status).equal(undefined);
            expect(playResult.data.rounds.length).equal(1000);
            expect(playResult.data.hashes).instanceof(Object);
            expect(playResult.data.mulligans).instanceof(Object);
            expect(playResult.data.mulligans.from7).to.exist;
            expect(playResult.data.mulligans.from6).to.exist;

        })

        it("should correctly compute colors when type is used", function(){
            var colors = [{color: 'green', value: 2}, ];
            var lands  = [24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];

            var cs = new CardsService();
            cs.setSpellsType('allies');
            cs.setLands(lands);
            cs.setColors(colors);
            cs.setGenericMana(0);
            cs.setCardsCount(60);
            var playResult = cs.play();
            //console.log(playResult);
            expect(playResult.status).equal(undefined);
            expect(playResult.data.rounds.length).equal(1000);
            expect(playResult.data.hashes).instanceof(Object);
            expect(playResult.data.mulligans).instanceof(Object);
            expect(playResult.data.mulligans.from7).to.exist;
            expect(playResult.data.mulligans.from6).to.exist;

        })
        /**
         * This test runs with fetch lands, and those are disabled currently
         */
        // it("should correctly work with fetchlands", function() {
        //     var colors = [
        //         {"color":"red","value":1},
        //         {"color":"green","value":1},
        //         {"color":"blue","value":1},
        //         {"color":"white","value":1},
        //         {"color":"black","value":1},
        //         {"color":"colorless","value":1} 
        //     ];
        //     var lands  = [7,7,7,7,55,56,57,58,59,54,75,77,79,81,
        //         83,24,25,26,27,28,29,32,33,35,37];

        //     var cs = new CardsService();
        //     cs.setLands(lands);
        //     cs.setColors(colors);
        //     cs.setGenericMana(0);
        //     cs.setCardsCount(60);
        //     var playResult = cs.play();
        //     //console.log(playResult);
        //     expect(playResult.status).equal(undefined);
        //     expect(playResult.data.rounds.length).equal(1000);
        //     expect(playResult.data.hashes).instanceof(Object);
        //     expect(playResult.data.mulligans).instanceof(Object);
        //     expect(playResult.data.mulligans.from7).to.exist;
        //     expect(playResult.data.mulligans.from6).to.exist;
        // })


    });
});