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

LimberjQuery.ui.GenericDragger = function(element, options) {
	this.element = element;

	this.dragging = false;
	this.element.mousedown(this.handle_mousedown.bind(this));

	$(document).mouseup(this.handle_mouseup.bind(this));
	$(document).mousemove(this.handle_drag.bind(this));
};

LimberjQuery.ui.GenericDragger.global_dragging = false;

jQuery.extend(LimberjQuery.ui.GenericDragger.prototype, LimberjQuery.Observable, {
	handle_mousedown: function(e) {
		if (this.dragging || LimberjQuery.ui.GenericDragger.global_dragging) return;

		var el = this.element;

		e.stopPropagation();
		e.preventDefault();

		var cancel_drag = false;

		this.drag_data = {
			mouse:   [e.pageX, e.pageY],
			element: el,
			cancel:  function() {
				cancel_drag = true;
			}
		};

		this.dragging = true;
		LimberjQuery.ui.GenericDragger.global_dragging = true;

		this.trigger("dragstart", this.drag_data);

		if (cancel_drag) {
			this.stop_drag();
		}
	},

	handle_mouseup: function(e) {
		if (!this.dragging) return;

		this.stop_drag();

		this.trigger("dragstop", {});
	},

	handle_drag: function(e) {
		if (!this.dragging) return;

		var el = this.element;
		var mouse = [e.pageX, e.pageY];
		var movement = mouse.zip(this.drag_data.mouse, function(a, b) {return a - b;});

		this.trigger("dragmove", {
			element:        el,
			mouse_start:    this.drag_data.mouse,
			mouse:          mouse,
			mouse_movement: movement
		});
	},

	stop_drag: function() {
		this.dragging = false;
		LimberjQuery.ui.GenericDragger.global_dragging = false;
	}
});