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

LimberjQuery.Observable = {
	bind: function(type, callback) {
		this._check_handler(type);
		this._lj_handlers[type].push(callback);
	},
	
	trigger: function() {
		var args = $A(arguments);
		var type = args.shift();
		
		this._check_handler(type).each(function(v) {
			v.apply(this, args);
		});
	},
	
	_check_handler: function(type) {
		if (typeof this._lj_handlers == 'undefined') {
			this._lj_handlers = {};
			this._lj_handlers[type] = [];
		} else if (typeof this._lj_handlers[type] == 'undefined') {
			this._lj_handlers[type] = [];
		}
		
		return this._lj_handlers[type];
	}
};