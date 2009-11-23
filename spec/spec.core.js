/*
 * Limber jQuery Tools
 *
 * Copyright 2009 Wilker Lucio <wilkerlucio@gmail.com>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. 
 */

describe 'Script alias'
  describe 'core alias'
    it 'should alias $A to jQuery.makeArray'
      $A([1, 2, 3]).should.eql [1, 2, 3]
    end
  end
end

describe 'Function extensions'
  describe 'binding functions'
    it 'should bound arguments to callback'
      var fn = function(a) { return a + 1; }
      var bounded = fn.bind(this, 5)
      
      bounded().should.be 6
    end
    
    it 'should set the context of function execution'
      var fn = function() { return this.arg + ' ok'; }
      var cls = function() { this.arg = 'its'; }
      var obj = new cls()
      var bounded = fn.bind(obj)
      
      bounded().should.be 'its ok'
    end
  end
end

describe 'Array extensions'
  describe 'iterating over array'
    before_each
      data = [1, 2, 3]
    end
    
    it 'should iterate over all items of an array'
      var sum = 0
      data.each(function(n) { sum += n; })
      
      sum.should.be 6
    end
    
    it 'should send the array keys at second argument'
      data.each(function(n, k) { expect(data[k]).should(be, n); })
    end
    
    it 'should start at a given index'
      var sum = 0
      data.each(function(n) { sum += n; }, 1)
      
      sum.should.be 5
    end
  end
  
  describe 'injecting data'
    it 'should inject data'
      [1, 2, 3].inject(0, function(acc, n) { return acc + n; }).should.be 6
    end
  end
  
  describe 'rejecting data'
    it 'should reject data from array'
      [1, 2, 3, 4, 5].reject(function(e) { return (e % 2) == 0 ? true : false; }).should.eql [1, 3, 5]
    end
  end
  
  describe 'selecting elements'
    it 'should get only elements that passed in callback'
      [1, 2, 3, 4, 5].select(function(e) { return (e % 2) == 0 ? true : false; }).should.eql [2, 4]
    end
  end
  
  describe 'partitioning elements'
  	it 'should create a partition by callback'
      var partition = [1, 2, 3, 4, 5].partition(function(e) { return (e % 2) == 0 ? true : false; })
      
      partition[0].should.eql [2, 4]
      partition[1].should.eql [1, 3, 5]
  	end
  end
  
  describe 'concatenating arrays'
    it 'should concatenate and return given array'
      var data = [1, 2];
      
      data.concat([3, 4]).should.eql [1, 2, 3, 4]
      data.should.eql [1, 2, 3, 4]
    end
  end
  
  describe 'zipping data'
    it 'should make the join of data'
      var x = [1, 2, 3]
      var y = [2, 3, 4]
      
      x.zip(y, function(a, b) { return a + b; }).should.eql [3, 5, 7]
    end
    
    it 'should use the first array as reference to iteration'
      var x = [1, 2, 3]
      var y = [2, 3]
      
      x.zip(y, function(a, b) { return a + b; }).should.eql [3, 5, NaN]
      y.zip(x, function(a, b) { return a + b; }).should.eql [3, 5]
    end
  end
end
