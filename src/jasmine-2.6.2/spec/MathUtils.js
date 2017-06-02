//This is a spec suite
describe("Test Suite",function(){
    var calc;
    //This will be called before executing the test cases
    beforeEach(function(){
        calc = new MathUtils();
        spyOn(calc,'add');
    })
    //The test cases start here
    describe("when calc is used to perform math operations",function(){
        //Test case for sum
        it("should be able to return the sum of two numbers",function(){
            //expect(calc.add(3,5)).toEqual(8);
            calc.add(3,5);
            //To verify whether add was called
            expect(calc.add).toHaveBeenCalled();
            //To verify whether add was called with right params
            expect(calc.add).toHaveBeenCalledWith(3,5);
        });

        //Test case for sub
        it("should be able to return the diff between two numbers",function(){
            expect(calc.sub(3,5)).toEqual(-2);
        });

        //Test case for mul
        it("should be able to return the product of the two numbers",function(){
            expect(calc.mul(10,40)).toEqual(400);
        });

        //Test case for division
        it("should be able to return the quotient of two numbers",function(){
            expect(calc.div(5,3)).toEqual(1);
        });

        //Test case for factorial
        xit("should be able to return the factorial of the number or throw an error if the number is negative",function(){
            expect(calc.fact(-9)).toThrowError(Error);
        });
    });
});


