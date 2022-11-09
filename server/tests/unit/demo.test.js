const mathOperations = {
    sum: function(a,b) {
        return a + b;
    },
    
    diff: function(a,b) {
        return a - b;
    },
    product: function(a,b) {
        return a * b
    }
 }

 describe("Calculator tests", () => {
    test('adding 1 + 2 should return 3', () => {
      var result = mathOperations.sum(1,2)
      expect(result).toBe(3);
    });
   })