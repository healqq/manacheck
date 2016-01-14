var expect = require("chai").expect;
var combinationsHelper = require("../../modules/cards/helpers/combinationsHelper.js");
 
describe("combinationsHelper", function(){
 	describe(".createCombination()", function() {
       it("should create new combination", function(){
       	   	var expected = {
				'red': 0,
				'blue': 0,
				'white': 0,
				'green': 0,
		  	'black': 0,
        'colorless': 0
			};
           	var result = combinationsHelper.createCombination();
           	expect(expected).eql(result);
        });
    });

    describe(".combinationFromArray()", function() {
       it("should create combination from array", function(){

       	   	var expected = {
				'red': 2,
				'blue': 0,
				'white': 1,
				'green': 0,
				'black': 3,
        'colorless': 2,
				'count': 8
			};
           	var result = combinationsHelper
           		.combinationFromArray([
           			{color:'red', value:2},
           			{color:'white', value:1},
           			{color:'black', value:3},
                    {color:'colorless', value:2}
           		]);
           	expect(expected).eql(result);
        });
    });

    describe(".combinationToArray()", function() {
       it("should create combination from array", function(){

       	   	var expected = [
       	   		{color:'red', value:2},
       	   		{color:'green', value:0},
       	   		{color:'black', value:3},
       	   		{color:'blue', value:0},
           		{color:'white', value:1},
              {color:'colorless', value:2}
           	];

           	var result = combinationsHelper
           		.combinationToArray(
           		{
					'red': 2,
					'blue': 0,
					'white': 1,
					'green': 0,
					'black': 3,
          'colorless': 2
				}
			);
           	expect(expected).eql(result);
           
        });
    });

    describe(".crossCombinations()", function() {
       it("should return cross of two combinations", function(){
       	   	var expected = {
				'red': 2,
				'blue': 0,
				'white': 0,
				'green': 1,
				'black': 0,
        'colorless': 1,
				'count': 4
			};
           
           	var combination1 = {
           		'red':2,
           		'blue': 1,
           		'white': 0,
           		'green': 3,
              'colorless': 3,
           		'black': 5
           	};

           	var combination2 = {
           		'red':4,
           		'blue': 0,
           		'white': 2,
           		'green': 1,
              'colorless': 1,
           		'black': 0
           	};

           	var result = combinationsHelper.
           		crossCombinations(
           			combination1,
           			combination2
           		);

           	expect(expected).eql(result);
        });
    });

    describe(".substractCombinations()", function() {
       it("should return substraction of two combinations", function(){
       	   	var expected = {
				'red': 3,
				'blue': 0,
				'white': 2,
				'green': 1,
				'black': 0,
        'colorless': 0,
				'count': 6
			};
           
           	var combination1 = {
           		'red':4,
           		'blue': 0,
           		'white': 2,
           		'green': 3,
           		'black': 2,
              'colorless': 0,
           	};

           	var combination2 = {
           		'red':1,
           		'blue': 4,
           		'white': 0,
           		'green': 2,
           		'black': 2,
              'colorless': 2,
           	};

           	var result = combinationsHelper.
           		substractCombinations(
           			combination1,
           			combination2
           		);

           	expect(expected).eql(result);
        });
    });

    describe(".getCombinationCode()", function() {
        it("Gets string representation of a combination", function(){

         		var expected, result, combination;
           	   	expected = 'rrgbuuwc';
               	combination = {
             		'red':2,
             		'blue': 2,
             		'white': 1,
             		'green': 1,
             		'black': 1,
                'colorless': 1,
               	};

         	result = combinationsHelper
         		.getCombinationCode(combination);
         	expect(expected).equal(result);
        });
        it("Gets string representation of a combination with 0 values", function(){
         	expected = 'gbuuwww';
         	combination = {
         		'red':0,
         		'blue': 2,
         		'white': 3,
         		'green': 1,
         		'black': 1,
            'colorless': 0,
         	};

         	result = combinationsHelper
         		.getCombinationCode(combination);
         	expect(expected).equal(result);

         	expected = 'ruc';
         	combination = {
         		'red':1,
         		'blue': 1,
         		'white': 0,
         		'green': 0,
         		'black': 0,
            'colorless': 1,
         	};

         	result = combinationsHelper
         		.getCombinationCode(combination);
         	expect(expected).equal(result);
        });
        it("Gets string representation of an empty combination", function(){
         	combination = {
         		'red': 0,
         		'blue': 0,
         		'white': 0,
         		'green': 0,
         		'black': 0,
            'colorless': 0
            };

         	result = combinationsHelper
         		.getCombinationCode(combination);
         	expect(result).to.be.empty;

        });
    });
});