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
        	expect(cs.play().status).equal(422);
        })

        it("should return rounds and hashes", function(){
        	var colors = [{color: 'green', value: 2}];
        	var lands  = [1,1,1,1,3,3,3,3,5,5,6,6];

        	var cs = new CardsService();
        	cs.setLands(lands);
        	cs.setColors(colors);
        	cs.setGenericMana(0);
        	expect(cs.play().status).equal(undefined);
        	expect(cs.play().data.rounds.length).equal(1000);
        	expect(cs.play().data.hashes).instanceof(Object);

        })
    });
});