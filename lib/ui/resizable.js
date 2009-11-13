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

LimberjQuery.ui.Resizable = function(element, options) {
	this.element = element;
	this.options = {
		containment: null,
		handles: 'all',
		handlesWindow: 15,
		aspectRatio: null,
		min_size: [0, 0],
		max_size: [0, 0]
	};

	$.extend(this.options, options);

	this.original_cursor = this.element.css('cursor');

	this.element.mousemove(this.handle_moveover.bind(this));

	this.dragger = new LimberjQuery.ui.GenericDragger(element, {});
	this.dragger.bind("dragstart", this.handle_mousedown.bind(this));
	this.dragger.bind("dragmove", this.handle_drag.bind(this));
};

LimberjQuery.ui.Resizable.AXIS_X = 1;
LimberjQuery.ui.Resizable.AXIS_Y = 2;

jQuery.extend(LimberjQuery.ui.Resizable.prototype, LimberjQuery.Observable, {
	handle_moveover: function(e) {
		if (this.dragger.dragging) return;

		var el = this.element;
		var pos = [e.pageX, e.pageY];
		var offset = [el.offset().left, el.offset().top];
		var rel_mouse = pos.zip(offset, function(a, b) {return a - b;});
		var size = [el.outerWidth(), el.outerHeight()];
		var distances = [rel_mouse[0], rel_mouse[1], size[0] - rel_mouse[0], size[1] - rel_mouse[1]];
		var pos_name = this.pos_name(distances);

		this.hover_status = pos_name;
		el.css({cursor: pos_name ? pos_name + '-resize' : this.original_cursor});
	},

	handle_mousedown: function(e) {
		if (!this.hover_status) {
			e.cancel();
			return;
		}

		var el = e.element, o = this.options;

		el.css('position', 'absolute');

		this.initial_size = [el.width(), el.height()];
		this.initial_position = [el.offset().left, el.offset().top];
		this.use_axis = this.calculate_axis(this.hover_status);
		this.axis_directions = this.calculate_axis_directions(this.hover_status);
		this.base_bounds = el.bounds();
		this.min_size = o.min_size;
		this.max_size = o.max_size;

		if (o.containment) {
			this.bounds = LimberjQuery.ui.containment(e.element, o.containment);
		}

		if (o.aspectRatio) {
			this.aspect_x = this.initial_size[0] / this.initial_size[1];
			this.aspect_y = this.initial_size[1] / this.initial_size[0];
			this.aspects = [this.aspect_x, this.aspect_y];
		}
	},

	handle_drag: function(e) {
		var el = this.element, o = this.options, self = this, mouse = e.mouse;
		var axis = [LimberjQuery.ui.Resizable.AXIS_X, LimberjQuery.ui.Resizable.AXIS_Y];
		var movement = e.mouse_movement;
		var asc = [0, 1];
		var rev = [1, 0];

		if (o.aspectRatio) {
			var order = Math.abs(movement[0]) >= Math.abs(movement[1]) ? asc : rev;

			movement[order[1]] = movement[order[0]] * this.aspects[order[0]];
			if (this.axis_directions[order[0]] != this.axis_directions[order[1]]) movement[order[1]] *= -1;
		}

		var size = movement.zip(this.initial_size, this.axis_directions, function(m, o, d) {
			return d == 1 ? o + m : o - m;
		});

		var position = movement.zip(this.initial_position, this.axis_directions, function(m, p, d) {
			return d == 1 ? p : p + m;
		});

		if (this.bounds) {
			var extra_size = [
				e.element.borderWidth() + e.element.paddingWidth(),
				e.element.borderHeight() + e.element.paddingHeight()
			];

			var bounds = [position[0], position[1], position[0] + size[0], position[1] + size[1]];

			asc.each(function(i) {
				var bounded = false;

				if (bounds[i] < self.bounds[i]) {
					position[i] = Math.max(position[i], self.bounds[i]);
					size[i] = Math.min(size[i], bounds[i + 2] - self.bounds[i]);

					bounded = true;
				}

				if ((bounds[i + 2] + extra_size[i]) > self.bounds[i + 2]) {
					size[i] = Math.min(size[i], self.bounds[i + 2] - bounds[i] - extra_size[i]);

					bounded = true;
				}

				if (bounded) {
					if (o.aspectRatio) {
						size[rev[i]] = Math.min(size[rev[i]], size[i] * self.aspects[i]);
						position[rev[i]] = Math.max(position[rev[i]], self.initial_position[rev[i]] - (size[i] - self.initial_size[i]));
					}
				}
			});
		}

		axis.zip(['width', 'height'], ['left', 'top'], size, position, function(a, t, o, s, p) {
			if ((self.use_axis & a) == 0 && self.options.aspectRatio == null) return;

			el.css(o, p + 'px');
			el[t](s);
		});

		this.trigger("resize", {});
	},

	pos_name: function(distances) {
		var tolerance = this.options.handlesWindow;
		var pos = "";
		var index = [1, 3, 0, 2];
		var directions = ["n", "s", "w", "e"];

		index.zip(directions, function(i, d) {
			if (distances[i] <= tolerance) pos += d;
		});

		return pos;
	},

	calculate_axis: function(status) {
		var axis = 0;

		if (status.match(/[ns]/)) axis = axis | LimberjQuery.ui.Resizable.AXIS_Y;
		if (status.match(/[we]/)) axis = axis | LimberjQuery.ui.Resizable.AXIS_X;

		return axis;
	},

	calculate_axis_directions: function(status) {
		var x = 1;
		var y = 1;

		if (status.match(/n/)) y = -1;
		if (status.match(/w/)) x = -1;

		return [x, y];
	}
});

jQuery.fn.lj_resizable = function(options) {
	return new LimberjQuery.ui.Resizable(this, options);
};