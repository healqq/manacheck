var unitTestHelper = require("../util/unitTestHelper.js");

var expect = require("chai").expect;
var CardsService;

describe("CardsService", function(){
    before(function (){
        unitTestHelper.setGlobalVars();
        CardsService = require("../../modules/cards/services/CardsService.js");
    });


    describe(".play()", function() {
        it("should return state 422", function(){
        	var colors = [{color: 'red', value:2},{color: 'green', value: 2}];
        	var lands  = [1,1,1,1,3,3,3,3,5,5,6,6];

        	var cs = new CardsService();
        	cs.setLands(lands);
        	cs.setColors(colors);
        	cs.setGenericMana(0);
            cs.setCardsCount(60);
        	expect(cs.play().status).equal(422);
        })

        it("should return rounds, hashes and mulligans", function(){
        	var colors = [{color: 'green', value: 2}];
        	var lands  = [1,1,1,1,3,3,3,3,5,5,6,6];

        	var cs = new CardsService();
        	cs.setLands(lands);
        	cs.setColors(colors);
        	cs.setGenericMana(0);
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
            var lands  = [24,24,24,24,24,24,24,24,24,24,24];

            var cs = new CardsService();
            cs.setSpellsType('allies');
            cs.setLands(lands);
            cs.setColors(colors);
            cs.setGenericMana(0);
            cs.setCardsCount(60);
            var playResult = cs.play();
            // console.log(playResult);
            expect(playResult.status).equal(undefined);
            expect(playResult.data.rounds.length).equal(1000);
            expect(playResult.data.hashes).instanceof(Object);
            expect(playResult.data.mulligans).instanceof(Object);
            expect(playResult.data.mulligans.from7).to.exist;
            expect(playResult.data.mulligans.from6).to.exist;

        })


    });
});