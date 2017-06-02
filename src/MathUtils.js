MathUtils = function(){};

MathUtils.prototype.add = function(number1,number2){
    return number1 + number2;
}

MathUtils.prototype.sub = function(number1,number2){
    return number1 - number2;
}

MathUtils.prototype.mul = function(number1,number2){
    return number1 * number2;
}

MathUtils.prototype.div = function(number1,number2){
    return parseInt(parseInt(number1) / parseInt(number2));
}

MathUtils.prototype.average = function(number1,number2){
    return (number1 + number2) / 2;
}

MathUtils.prototype.fact = function(number){
    if(number < 0)
        throw new Error("Factorials cannot be defined for negative numbers");
    else if(number == 1 || number == 0)
        return 1;
    else 
        return number * this.fact(number - 1); 
}


