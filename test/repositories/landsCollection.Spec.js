var unitTestHelper = require("../util/unitTestHelper.js");

var expect = require("chai").expect;
var Nonland = require("../../modules/cards/entities/Nonland.js");
var Land = require("../../modules/cards/entities/Land.js");
var LandsCollection, FetchLand, BasicFetchLand;

 
describe("landsCollection", function(){
    before(function (){
        unitTestHelper.setGlobalVars();
        // init dependencies after setting global enviroment
        LandsCollection = require("../../modules/cards/repositories/landsCollection.js");
        FetchLand = require("../../modules/cards/entities/FetchLand.js");
        BasicFetchLand = require("../../modules/cards/entities/BasicFetchLand.js");
    });
   	describe(".set()", function() {
        it("should create new landsCollection", function(){
         	   	
            var landsCollection = new LandsCollection();
            var lands = [
                new Nonland(),
                new Nonland(),
                new Land(1,['green','red'], true, 'gain'),
                new Land(2,['black', 'red'], false, 'battle'),
                new Land(3,['grey'], false, 'basic'),
            ];
             	
            landsCollection.set(lands);

            expect(landsCollection.getLength()).equal(3);
            expect(landsCollection.getSymbols())
              .eql(
                    {
                        red: 2,
                        black: 1,
                        green: 1,
                        blue:0,
                        white:0,
                        grey: 1
                    }
              );
              
        });
    });

    describe(".getLandsOfColor()", function() {
        it("should return all lands, having color", function(){
                
            var landsCollection = new LandsCollection();
            var lands = [
                new Land(1,['green','red'], true, 'gain'),
                new Land(2,['black', 'blue'], true, 'battle'),
                new Land(3,['red'], false, 'basic'),
            ];
            landsCollection.set(lands);

            expect(landsCollection.getLandsOfColor('red', true))
                .eql(         
                [
                    lands[2], lands[0]
                ]
            );
              
        });

        it("should return all lands, having color, with fetches", function(){
                
            var landsCollection = new LandsCollection();
            var lands = [
                new Land(2,['black', 'red'], true, 'battle'),
                new Land(3,['grey'], false, 'basic'),
            ];
            // add a fetchLand to the mix
            lands.push( new FetchLand(4, ['black', 'red'], landsCollection));

            landsCollection.set(lands);
            expect(landsCollection.getLandsOfColor('red', false))
                .eql(         
                [
                    lands[0], lands[2],
                ]
            );
              
        });

        it("should return all lands, having at least one color", function(){
                
            var landsCollection = new LandsCollection();
            var lands = [
                new Land(2,['red'], false, 'basic'),
                new Land(3,['green', 'white'], true, 'battle'),
            ];
            // add a fetchLand to the mix
            lands.push( new FetchLand(4, ['blue', 'black'], landsCollection));

            landsCollection.set(lands);
            expect(landsCollection.getLandsOfColor('generic', false))
                .eql(         
                [
                    lands[1], lands[0]
                ]
            );
              
        });
    });

    describe(".getBasicLands()", function() {
        it("should return all basic lands", function(){
                
            var landsCollection = new LandsCollection();
            var lands = [
                new Nonland(),
                new Nonland(),
                new Land(1,['green'], true, 'basic'),
                new Land(2,['grey'], true, 'basic'),
                new Land(3,['red'], true, 'basic'),
            ];
            landsCollection.set(lands);

            expect(landsCollection.getBasicLands())
                .eql({
                    red: {
                            id: 3,
                            count:1,
                    },
                    green: {
                        id: 1,
                        count: 1,
                    },
                    grey: {
                        id: 2,
                        count: 1
                    },
                    black: {},
                    blue: {},
                    white: {}
                }
            );
              
        });
    });

    describe(".getSymbols()", function() {
        it("should count symbols with fetches correctly", function(){
                
            var landsCollection = new LandsCollection();
            var lands = [
                new Nonland(),
                new Nonland(),
                new Land(1,['green','red'], true, 'battle'),
                new Land(2,['black', 'red'], false, 'battle'),
                
            ];
            // add a fetchLand to the mix
            lands.push( new FetchLand(3, ['black', 'red'], landsCollection));
                
            landsCollection.set(lands);

            expect(landsCollection.getSymbols())
              .eql(
                    {
                        red: 3,
                        black: 2,
                        green: 2,
                        blue:0,
                        white:0,
                        grey: 0,
                    }
              );
              
        });

        it("should count symbols with basic fetches correctly", function(){
                
            var landsCollection = new LandsCollection();
            var lands = [
                new Nonland(),
                new Nonland(),
                new Land(1,['green'], true, 'basic'),
                new Land(2,['grey'], true, 'basic'),
                new Land(3,['red'], true, 'basic'),
            ];

            // add a basic fetchLand to the mix
            lands.push( new BasicFetchLand(4, landsCollection));
            lands.push( new BasicFetchLand(4, landsCollection));
            landsCollection.set(lands);

            expect(landsCollection.getSymbols())
                .eql(
                {
                    red: 3,
                    black: 0,
                    green: 3,
                    blue:0,
                    white:0,
                    grey: 3,
                }
            );
              
        });
    });

    describe(".getSymbolsOrder()", function() {
        it("should return symbols in DESC order", function(){
              
                var landsCollection = new LandsCollection();
                var lands = [
                    new Nonland(),
                    new Nonland(),
                    new Land(1,['green','red'], true, 'gain'),
                    new Land(2,['black', 'red'], false, 'gain'),
                    new Land(3,['black', 'red'], false, 'gain'),
                    new Land(4, ['grey'], false, 'basic'),
                    new Land(3,['black', 'red'], false, 'pain'),
                    new Land(1,['green','red'], true, 'gain'),
                ];
                  
                landsCollection.set(lands);

                expect(landsCollection.getSymbolsOrder())
                  .eql([
                        {color:'grey', value:1},
                        {color:'green', value:2},
                        {color:'black', value:3},
                        {color:'red', value:5},
                        
                    ]
                );
              
        });
    });

    describe(".getFetchedLands()", function() {
        it("should return lands, that can be fetched", function(){
              
            var landsCollection = new LandsCollection();
            var lands = [
                new Nonland(),
                new Nonland(),
                new Land(1,['green','red'], true, 'battle'),
                new Land(2,['black'], false, 'basic'),
                new Land(5,['grey'], false, 'basic'),
                new Land(3,['black', 'red'], true, 'battle'),
                new Land(4,['black', 'blue'], true, 'gain'),
            ];
              
            landsCollection.set(lands);

            expect(landsCollection.getFetchedLands())
                .eql(
                {
                    red: {
                        1: {
                            count:1,
                            colors: ['green', 'red']
                        },
                        3: {
                            count:1,
                            colors: ['black', 'red']
                        },
                    },
                    green: {
                        1: {
                            count:1,
                            colors: ['green', 'red']
                        }
                    },
                    black: {
                        2: {
                            count:1,
                            colors: ['black']
                        },
                        3: {
                            count:1,
                            colors: ['black', 'red']
                        },
                    },
                    grey: {
                        5: {
                            count: 1,
                            colors: ['grey']
                        }
                    },
                    blue: {},
                    white: {}
                }
            );
              
        });
    });

    describe(".splice()", function() {
        it("should splice a land from collection, update symbols and fetches", function(){
              
            var landsCollection = new LandsCollection();
            var lands = [
                new Nonland(),
                new Nonland(),
                new Land(1,['green','red'], true, 'battle'),
                new Land(2,['black'], false, 'basic'),
                new Land(3,['black', 'red'], true, 'battle'),
                new Land(4,['black', 'blue'], true, 'gain'),
            ];
              
            landsCollection.set(lands);
            landsCollection.splice(lands[2]);
            expect(landsCollection.getFetchedLands())
                .eql(
                {
                    red: {
                        1: {
                            count:0,
                            colors: ['green', 'red']
                        },
                        3: {
                            count:1,
                            colors: ['black', 'red']
                        },
                    },
                    green: {
                        1: {
                            count:0,
                            colors: ['green', 'red']
                        }
                    },
                    black: {
                        2: {
                            count:1,
                            colors: ['black']
                        },
                        3: {
                            count:1,
                            colors: ['black', 'red']
                        },
                    },
                    blue: {},
                    white: {},
                    grey: {}
                }
            );
            expect(landsCollection.getSymbols())
                .eql(
                {
                    red: 1,
                    green: 0,
                    white: 0,
                    blue: 1,
                    black: 3,
                    grey: 0,
                }
            );
              
        });
        
        it("should splice a land from collection, update symbols and fetches with fetch lands in deck", function(){
              
            var landsCollection = new LandsCollection();
            var lands = [
                new Nonland(),
                new Nonland(),
                new Land(1,['green','red'], true, 'battle'),
                new Land(2,['black'], false, 'basic'),
                new Land(3,['black', 'red'], true, 'battle'),
                new Land(4,['black', 'blue'], true, 'gain'),
            ];
            lands.push(new FetchLand(5, ['green', 'black'], landsCollection));

            landsCollection.set(lands);
            landsCollection.splice(lands[2]);
            expect(landsCollection.getFetchedLands())
                .eql(
                {
                    red: {
                        1: {
                            count:0,
                            colors: ['green', 'red']
                        },
                        3: {
                            count:1,
                            colors: ['black', 'red']
                        },
                    },
                    green: {
                        1: {
                            count:0,
                            colors: ['green', 'red']
                        }
                    },
                    black: {
                        2: {
                            count:1,
                            colors: ['black']
                        },
                        3: {
                            count:1,
                            colors: ['black', 'red']
                        },
                    },
                    blue: {},
                    white: {},
                    grey: {}
                }
            );
            expect(landsCollection.getSymbols())
                .eql(
                {
                    red: 2,
                    green: 0,
                    white: 0,
                    blue: 1,
                    black: 4,
                    grey: 0,
                }
            );
              
        });
    });
});