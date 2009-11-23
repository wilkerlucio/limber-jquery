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

/**
 * Bind a function with a given context and parameters
 */
Function.prototype.bind = function() {
	var __method = this, args = $A(arguments), object = args.shift();

	return function() {
		return __method.apply(object, args.concat($A(arguments)));
	};
};

/**
 * Concatenate some array data into current array
 *
 * @param {Array} array with data to be concatenated
 * @return current array
 */
Array.prototype.concat = function(data) {
	var self = this;
	data.each(function(e) { self.push(e) });
	
	return this;
};

/**
 * Iterate over elements of array
 *
 * @param {Function} iterator
 * @param {Integer} the initial count for iteration (default: 0)
 * @return current array
 */
Array.prototype.each = function(callback, start) {
	start = start || 0;
	
	for (var i = start; i < this.length; i++) {
		callback(this[i], i);
	}

	return this;
};

/**
 * Give a result calculation of injection at elements of array
 *
 * @param {Mixed} accumulator for injection
 * @param {Function} injector
 * @return {Mixed} final result of calculation
 */
Array.prototype.inject = function(acc, callback) {
	this.each(function(e) { acc = callback(acc, e)});
	
	return acc;
};

/**
 * Reject the elements that doesn't fit into callback restrictions
 *
 * @param {Function} function to test over elements
 * @return new array without rejected elements
 */
Array.prototype.reject = function(callback) {
	var cleaned = [];
	
	this.each(function(e) {
		if (!callback(e)) cleaned.push(e);
	});
	
	return cleaned;
};

/**
 * Select only items that pass into callback
 *
 * @param {Function} callback
 * @return new array with the selected items
 */
Array.prototype.select = function(callback) {
	var cleaned = [];
	
	this.each(function(e) {
		if (callback(e)) cleaned.push(e);
	});
	
	return cleaned;
};

/**
 * Split array into other two
 *
 * @param {Function} function to partition the items
 * @return array with partitioned data, first index with trues, second with falses
 */
Array.prototype.partition = function(callback) {
	var trues = [];
	var falses = [];
	
	this.each(function(e) {
		if (callback(e)) trues.push(e);
		else falses.push(e);
	});
	
	return [trues, falses];
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
