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

describe 'Observable'
  describe 'binding events'
    it 'should bound the event and dispatch when called'
      var cls = function() {};
      jQuery.extend(cls.prototype, LimberjQuery.Observable, {
        do_action: function() {
          this.trigger('action');
        },
        
        foo: function() {}
      });
      
      var obj = new cls()
      
      var fn = function() { obj.foo(); };
      
      obj.bind('action', fn);
      obj.should.receive('foo', 'once');
      
      obj.do_action();
    end
    
    it 'should bound the event and dispatch when called with params'
      var cls = function() {};
      jQuery.extend(cls.prototype, LimberjQuery.Observable, {
        do_action: function() {
          this.trigger('action', 3);
        },
        
        foo: function(n) {}
      });
      
      var obj = new cls()
      
      var fn = function(n) { obj.foo(n); };
      
      obj.bind('action', fn);
      obj.should.receive('foo', 'once').with_args(3);
      
      obj.do_action();
    end
  end
end
