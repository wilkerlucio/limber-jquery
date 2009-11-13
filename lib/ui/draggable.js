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

LimberjQuery.ui.Draggable = function(element, options) {
	this.options = {
		containment: null
	};
	
	jQuery.extend(this.options, options);
	
	this.dragger = new LimberjQuery.ui.GenericDragger(element);
	this.dragger.bind("dragstart", this.dragstart.bind(this));
	this.dragger.bind("dragmove", this.dragmove.bind(this));
};

jQuery.extend(LimberjQuery.ui.Draggable.prototype, LimberjQuery.Observable, {
	dragstart: function(e) {
		var o = this.options;
		
		e.element.css("position", "absolute");
		this.base_position = [e.element.offset().left, e.element.offset().top];
		this.base_bounds = e.element.bounds();
		
		if (o.containment) {
			this.bounds = LimberjQuery.ui.containment(e.element, o.containment);
		}
	},

	dragmove: function(e) {
		var o = this.options;
		var position = this.base_position.zip(e.mouse_movement, function(b, m) {return b + m;});
		
		if (this.bounds) {
			var bounds = LimberjQuery.ui.precompute_bounds(this.base_bounds, e.mouse_movement);
			
			if (bounds[0] < this.bounds[0]) position[0] = this.bounds[0];
			if (bounds[1] < this.bounds[1]) position[1] = this.bounds[1];
			if (bounds[2] > this.bounds[2]) position[0] = this.bounds[2] - (bounds[2] - bounds[0]);
			if (bounds[3] > this.bounds[3]) position[1] = this.bounds[3] - (bounds[3] - bounds[1]);
		}
		
		position.zip(['left', 'top'], function(p, t) {
			e.element.css(t, p + 'px');
		});
		
		this.trigger("drag", {position: position});
	}
});

jQuery.fn.lj_draggable = function(options) {
	return new LimberjQuery.ui.Draggable($(this[0]), options);
};