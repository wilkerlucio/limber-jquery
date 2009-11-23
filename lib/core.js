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

$A = jQuery.makeArray;

Function.prototype.bind = function() {
  var __method = this, args = $A(arguments), object = args.shift();

  return function() {
    return __method.apply(object, args.concat($A(arguments)));
  };
};

Array.prototype.concat = function(data) {
	var self = this;
	data.each(function(e) { self.push(e) });
	
	return this;
};

Array.prototype.each = function(callback, start) {
	start = start || 0;
	
	for (var i = start; i < this.length; i++) {
		callback(this[i], i);
	}

	return this;
};

Array.prototype.inject = function(acc, callback) {
	this.each(function(e) { acc = callback(acc, e)});
	
	return acc;
};

Array.prototype.reject = function(callback) {
	var cleaned = [];
	
	this.each(function(e) {
		if (callback(e)) cleaned.push(e);
	});
	
	return cleaned;
};

Array.prototype.zip = function() {
	var items = $A(arguments);
	items.unshift(this);
	var callback = items.pop();
	var results = [];

	for (var i = 0; i < items[0].length; i++) {
		var line = [];

		for (var x = 0; x < items.length; x++) {
			line.push(items[x][i]);
		};

		results.push(callback.apply(this, line));
	};

	return results;
};

LimberjQuery = {};
