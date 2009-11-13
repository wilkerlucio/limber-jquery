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

LimberjQuery.ui = {};

LimberjQuery.ui.precompute_bounds = function(bounds, movement) {
	var computed = $A(bounds);
	
	computed[0] += movement[0];
	computed[1] += movement[1];
	computed[2] += movement[0];
	computed[3] += movement[1];
	
	return computed;
};

LimberjQuery.ui.containment = function(element, expression) {
	var bounds = null;
	
	if (expression == 'parent') {
		bounds = element.parent().innerBounds();
	} else {
		bounds = $(expression).innerBounds();
	}
	
	return bounds
};

(function($) {
	$.fn.bounds = function() {
		var el = $(this[0]);
		var offset = el.offset();
		
		var bounds = [offset.left, offset.top, offset.left + el.outerWidth(), offset.top + el.outerHeight()];
		
		return bounds;
	};
	
	$.fn.innerBounds = function() {
		var el = $(this[0]);
		
		return el.bounds().zip(['left', 'top', 'right', 'bottom'], [1, 1, -1, -1], function(b, d, m) {
			return b + (
				el.intCss('border-' + d + '-width') + el.intCss('margin-' + d) + el.intCss('padding-' + d)
			) * m;
		});
	};
	
	$.fn.intCss = function(property) {
		return parseInt(this.css(property) || 0);
	};

	$.fn.borderWidth = function() {
		var el = $(this[0]);

		return el.intCss('border-left-width') + el.intCss('border-right-width');
	};

	$.fn.borderHeight = function() {
		var el = $(this[0]);

		return el.intCss('border-top-width') + el.intCss('border-bottom-width');
	};

	$.fn.paddingWidth = function() {
		var el = $(this[0]);

		return el.intCss('padding-left') + el.intCss('padding-right');
	};

	$.fn.paddingHeight = function() {
		var el = $(this[0]);

		return el.intCss('padding-top') + el.intCss('padding-bottom');
	};
})(jQuery);