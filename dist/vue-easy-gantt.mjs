import { Fragment as e, computed as t, createBlock as n, createCommentVNode as r, createElementBlock as i, createElementVNode as a, defineComponent as o, normalizeClass as s, normalizeStyle as c, openBlock as l, ref as u, renderList as d, renderSlot as f, toDisplayString as p, withKeys as m, withModifiers as h } from "vue";
//#region \0rolldown/runtime.js
var g = Object.create, _ = Object.defineProperty, v = Object.getOwnPropertyDescriptor, y = Object.getOwnPropertyNames, b = Object.getPrototypeOf, x = Object.prototype.hasOwnProperty, S = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), C = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = y(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !x.call(e, s) && s !== n && _(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = v(t, s)) || r.enumerable
	});
	return e;
}, w = (e, t, n) => (n = e == null ? {} : g(b(e)), C(t || !e || !e.__esModule || !x.call(e, "default") ? _(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), T = /* @__PURE__ */ S(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs = r();
	})(n, (function() {
		var e = 1e3, t = 6e4, n = 36e5, r = "millisecond", i = "second", a = "minute", o = "hour", s = "day", c = "week", l = "month", u = "quarter", d = "year", f = "date", p = "Invalid Date", m = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, h = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, g = {
			name: "en",
			weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
			months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
			ordinal: function(e) {
				var t = [
					"th",
					"st",
					"nd",
					"rd"
				], n = e % 100;
				return "[" + e + (t[(n - 20) % 10] || t[n] || t[0]) + "]";
			}
		}, _ = function(e, t, n) {
			var r = String(e);
			return !r || r.length >= t ? e : "" + Array(t + 1 - r.length).join(n) + e;
		}, v = {
			s: _,
			z: function(e) {
				var t = -e.utcOffset(), n = Math.abs(t), r = Math.floor(n / 60), i = n % 60;
				return (t <= 0 ? "+" : "-") + _(r, 2, "0") + ":" + _(i, 2, "0");
			},
			m: function e(t, n) {
				if (t.date() < n.date()) return -e(n, t);
				var r = 12 * (n.year() - t.year()) + (n.month() - t.month()), i = t.clone().add(r, l), a = n - i < 0, o = t.clone().add(r + (a ? -1 : 1), l);
				return +(-(r + (n - i) / (a ? i - o : o - i)) || 0);
			},
			a: function(e) {
				return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
			},
			p: function(e) {
				return {
					M: l,
					y: d,
					w: c,
					d: s,
					D: f,
					h: o,
					m: a,
					s: i,
					ms: r,
					Q: u
				}[e] || String(e || "").toLowerCase().replace(/s$/, "");
			},
			u: function(e) {
				return e === void 0;
			}
		}, y = "en", b = {};
		b[y] = g;
		var x = "$isDayjsObject", S = function(e) {
			return e instanceof E || !(!e || !e[x]);
		}, C = function e(t, n, r) {
			var i;
			if (!t) return y;
			if (typeof t == "string") {
				var a = t.toLowerCase();
				b[a] && (i = a), n && (b[a] = n, i = a);
				var o = t.split("-");
				if (!i && o.length > 1) return e(o[0]);
			} else {
				var s = t.name;
				b[s] = t, i = s;
			}
			return !r && i && (y = i), i || !r && y;
		}, w = function(e, t) {
			if (S(e)) return e.clone();
			var n = typeof t == "object" ? t : {};
			return n.date = e, n.args = arguments, new E(n);
		}, T = v;
		T.l = C, T.i = S, T.w = function(e, t) {
			return w(e, {
				locale: t.$L,
				utc: t.$u,
				x: t.$x,
				$offset: t.$offset
			});
		};
		var E = function() {
			function g(e) {
				this.$L = C(e.locale, null, !0), this.parse(e), this.$x = this.$x || e.x || {}, this[x] = !0;
			}
			var _ = g.prototype;
			return _.parse = function(e) {
				this.$d = function(e) {
					var t = e.date, n = e.utc;
					if (t === null) return /* @__PURE__ */ new Date(NaN);
					if (T.u(t)) return /* @__PURE__ */ new Date();
					if (t instanceof Date) return new Date(t);
					if (typeof t == "string" && !/Z$/i.test(t)) {
						var r = t.match(m);
						if (r) {
							var i = r[2] - 1 || 0, a = (r[7] || "0").substring(0, 3);
							return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, a)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, a);
						}
					}
					return new Date(t);
				}(e), this.init();
			}, _.init = function() {
				var e = this.$d;
				this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
			}, _.$utils = function() {
				return T;
			}, _.isValid = function() {
				return this.$d.toString() !== p;
			}, _.isSame = function(e, t) {
				var n = w(e);
				return this.startOf(t) <= n && n <= this.endOf(t);
			}, _.isAfter = function(e, t) {
				return w(e) < this.startOf(t);
			}, _.isBefore = function(e, t) {
				return this.endOf(t) < w(e);
			}, _.$g = function(e, t, n) {
				return T.u(e) ? this[t] : this.set(n, e);
			}, _.unix = function() {
				return Math.floor(this.valueOf() / 1e3);
			}, _.valueOf = function() {
				return this.$d.getTime();
			}, _.startOf = function(e, t) {
				var n = this, r = !!T.u(t) || t, u = T.p(e), p = function(e, t) {
					var i = T.w(n.$u ? Date.UTC(n.$y, t, e) : new Date(n.$y, t, e), n);
					return r ? i : i.endOf(s);
				}, m = function(e, t) {
					return T.w(n.toDate()[e].apply(n.toDate("s"), (r ? [
						0,
						0,
						0,
						0
					] : [
						23,
						59,
						59,
						999
					]).slice(t)), n);
				}, h = this.$W, g = this.$M, _ = this.$D, v = "set" + (this.$u ? "UTC" : "");
				switch (u) {
					case d: return r ? p(1, 0) : p(31, 11);
					case l: return r ? p(1, g) : p(0, g + 1);
					case c:
						var y = this.$locale().weekStart || 0, b = (h < y ? h + 7 : h) - y;
						return p(r ? _ - b : _ + (6 - b), g);
					case s:
					case f: return m(v + "Hours", 0);
					case o: return m(v + "Minutes", 1);
					case a: return m(v + "Seconds", 2);
					case i: return m(v + "Milliseconds", 3);
					default: return this.clone();
				}
			}, _.endOf = function(e) {
				return this.startOf(e, !1);
			}, _.$set = function(e, t) {
				var n, c = T.p(e), u = "set" + (this.$u ? "UTC" : ""), p = (n = {}, n[s] = u + "Date", n[f] = u + "Date", n[l] = u + "Month", n[d] = u + "FullYear", n[o] = u + "Hours", n[a] = u + "Minutes", n[i] = u + "Seconds", n[r] = u + "Milliseconds", n)[c], m = c === s ? this.$D + (t - this.$W) : t;
				if (c === l || c === d) {
					var h = this.clone().set(f, 1);
					h.$d[p](m), h.init(), this.$d = h.set(f, Math.min(this.$D, h.daysInMonth())).$d;
				} else p && this.$d[p](m);
				return this.init(), this;
			}, _.set = function(e, t) {
				return this.clone().$set(e, t);
			}, _.get = function(e) {
				return this[T.p(e)]();
			}, _.add = function(r, u) {
				var f, p = this;
				r = Number(r);
				var m = T.p(u), h = function(e) {
					var t = w(p);
					return T.w(t.date(t.date() + Math.round(e * r)), p);
				};
				if (m === l) return this.set(l, this.$M + r);
				if (m === d) return this.set(d, this.$y + r);
				if (m === s) return h(1);
				if (m === c) return h(7);
				var g = (f = {}, f[a] = t, f[o] = n, f[i] = e, f)[m] || 1, _ = this.$d.getTime() + r * g;
				return T.w(_, this);
			}, _.subtract = function(e, t) {
				return this.add(-1 * e, t);
			}, _.format = function(e) {
				var t = this, n = this.$locale();
				if (!this.isValid()) return n.invalidDate || p;
				var r = e || "YYYY-MM-DDTHH:mm:ssZ", i = T.z(this), a = this.$H, o = this.$m, s = this.$M, c = n.weekdays, l = n.months, u = n.meridiem, d = function(e, n, i, a) {
					return e && (e[n] || e(t, r)) || i[n].slice(0, a);
				}, f = function(e) {
					return T.s(a % 12 || 12, e, "0");
				}, m = u || function(e, t, n) {
					var r = e < 12 ? "AM" : "PM";
					return n ? r.toLowerCase() : r;
				};
				return r.replace(h, (function(e, r) {
					return r || function(e) {
						switch (e) {
							case "YY": return String(t.$y).slice(-2);
							case "YYYY": return T.s(t.$y, 4, "0");
							case "M": return s + 1;
							case "MM": return T.s(s + 1, 2, "0");
							case "MMM": return d(n.monthsShort, s, l, 3);
							case "MMMM": return d(l, s);
							case "D": return t.$D;
							case "DD": return T.s(t.$D, 2, "0");
							case "d": return String(t.$W);
							case "dd": return d(n.weekdaysMin, t.$W, c, 2);
							case "ddd": return d(n.weekdaysShort, t.$W, c, 3);
							case "dddd": return c[t.$W];
							case "H": return String(a);
							case "HH": return T.s(a, 2, "0");
							case "h": return f(1);
							case "hh": return f(2);
							case "a": return m(a, o, !0);
							case "A": return m(a, o, !1);
							case "m": return String(o);
							case "mm": return T.s(o, 2, "0");
							case "s": return String(t.$s);
							case "ss": return T.s(t.$s, 2, "0");
							case "SSS": return T.s(t.$ms, 3, "0");
							case "Z": return i;
						}
						return null;
					}(e) || i.replace(":", "");
				}));
			}, _.utcOffset = function() {
				return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
			}, _.diff = function(r, f, p) {
				var m, h = this, g = T.p(f), _ = w(r), v = (_.utcOffset() - this.utcOffset()) * t, y = this - _, b = function() {
					return T.m(h, _);
				};
				switch (g) {
					case d:
						m = b() / 12;
						break;
					case l:
						m = b();
						break;
					case u:
						m = b() / 3;
						break;
					case c:
						m = (y - v) / 6048e5;
						break;
					case s:
						m = (y - v) / 864e5;
						break;
					case o:
						m = y / n;
						break;
					case a:
						m = y / t;
						break;
					case i:
						m = y / e;
						break;
					default: m = y;
				}
				return p ? m : T.a(m);
			}, _.daysInMonth = function() {
				return this.endOf(l).$D;
			}, _.$locale = function() {
				return b[this.$L];
			}, _.locale = function(e, t) {
				if (!e) return this.$L;
				var n = this.clone(), r = C(e, t, !0);
				return r && (n.$L = r), n;
			}, _.clone = function() {
				return T.w(this.$d, this);
			}, _.toDate = function() {
				return new Date(this.valueOf());
			}, _.toJSON = function() {
				return this.isValid() ? this.toISOString() : null;
			}, _.toISOString = function() {
				return this.$d.toISOString();
			}, _.toString = function() {
				return this.$d.toUTCString();
			}, g;
		}(), D = E.prototype;
		return w.prototype = D, [
			["$ms", r],
			["$s", i],
			["$m", a],
			["$H", o],
			["$W", s],
			["$M", l],
			["$y", d],
			["$D", f]
		].forEach((function(e) {
			D[e[1]] = function(t) {
				return this.$g(t, e[0], e[1]);
			};
		})), w.extend = function(e, t) {
			return e.$i || (e(t, E, w), e.$i = !0), w;
		}, w.locale = C, w.isDayjs = S, w.unix = function(e) {
			return w(1e3 * e);
		}, w.en = b[y], w.Ls = b, w.p = {}, w;
	}));
})), E = /* @__PURE__ */ S(((e, t, n) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs_plugin_isoWeek = r();
	})(n, (function() {
		return function(e, t, n) {
			var r = function(e) {
				return e.add(4 - e.isoWeekday(), "day");
			}, i = t.prototype;
			i.isoWeekYear = function() {
				return r(this).year();
			}, i.isoWeek = function(e) {
				if (!this.$utils().u(e)) return this.add(7 * (e - this.isoWeek()), "day");
				var t, i, a, o, s = r(this), c = (t = this.isoWeekYear(), i = this.$u, a = (i ? n.utc : n)().year(t).startOf("year"), o = 4 - a.isoWeekday(), a.isoWeekday() > 4 && (o += 7), a.add(o, "day"));
				return s.diff(c, "week") + 1;
			}, i.isoWeekday = function(e) {
				return this.$utils().u(e) ? this.day() || 7 : this.day(this.day() % 7 ? e : e - 7);
			};
			var a = i.startOf;
			i.startOf = function(e, t) {
				var n = this.$utils(), r = !!n.u(t) || t;
				return n.p(e) === "isoweek" ? r ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : a.bind(this)(e, t);
			};
		};
	}));
})), D = /* @__PURE__ */ w(T(), 1), O = /* @__PURE__ */ w(E(), 1), k = ["aria-label", "onKeydown"], A = { class: "at-eg-task-bar" }, j = { class: "at-eg-task-title" }, M = {
	key: 0,
	class: "at-eg-task-progress"
}, N = /* @__PURE__ */ o({
	__name: "TaskItem",
	props: {
		task: {
			type: Object,
			required: !0
		},
		floorIndex: {
			type: Number,
			default: 0
		}
	},
	emits: ["task-click"],
	setup(e, { emit: n }) {
		let o = e, u = n, d = t(() => ({
			"--eg-len": o.task.duration,
			"--eg-floor": o.floorIndex,
			"--eg-color": o.task.color
		})), f = t(() => typeof o.task.progress == "number"), g = t(() => Math.min(100, Math.max(0, o.task.progress ?? 0))), _ = () => u("task-click", o.task);
		return (t, n) => (l(), i("div", {
			class: s(["at-eg-task", "at-eg-floor-" + e.floorIndex]),
			style: c(d.value),
			role: "button",
			tabindex: "0",
			"aria-label": e.task.title,
			onClick: _,
			onKeydown: [m(h(_, ["prevent"]), ["enter"]), m(h(_, ["prevent"]), ["space"])]
		}, [a("div", A, [a("span", j, p(e.task.title), 1), f.value ? (l(), i("span", M, [a("i", { style: c({ width: g.value + "%" }) }, null, 4)])) : r("", !0)])], 46, k));
	}
}), P = { class: "at-eg-row" }, F = { class: "at-eg-cell-a" }, I = { class: "at-eg-user" }, L = ["src", "alt"], R = {
	key: 1,
	class: "at-eg-avatar at-eg-avatar--fb"
}, z = { class: "at-eg-user-meta" }, B = { class: "at-eg-name" }, V = { class: "at-eg-sub" }, H = /* @__PURE__ */ o({
	__name: "UserTasks",
	props: {
		user: {
			type: Object,
			required: !0
		},
		dates: {
			type: Array,
			required: !0
		},
		tasks: {
			type: Array,
			required: !0
		}
	},
	emits: ["task-click"],
	setup(r, { emit: o }) {
		let f = r, m = o, h = u(!1), g = t(() => (f.user.name || "?").trim().charAt(0).toUpperCase()), _ = (e) => f.tasks.map((t) => t[e]).filter((e) => typeof e == "object" && !!e), v = (e) => m("task-click", {
			task: e,
			user: f.user
		});
		return (t, o) => (l(), i("tr", P, [a("td", F, [a("div", I, [r.user.avatar && !h.value ? (l(), i("img", {
			key: 0,
			src: r.user.avatar,
			alt: r.user.name,
			class: "at-eg-avatar",
			onError: o[0] || (o[0] = (e) => h.value = !0)
		}, null, 40, L)) : (l(), i("span", R, p(g.value), 1)), a("div", z, [a("p", B, p(r.user.name), 1), a("p", V, p(r.tasks.length) + " tasks this week ", 1)])])]), (l(!0), i(e, null, d(r.dates, (t, o) => (l(), i("td", {
			key: t.date,
			class: s(["at-eg-cell-b", {
				"at-eg-today": t.isToday,
				"at-eg-weekend": t.isWeekend
			}]),
			style: c({ "--eg-col": o })
		}, [a("div", {
			class: "at-eg-tgroup",
			style: c({ "--eg-tall": r.tasks.length })
		}, [(l(!0), i(e, null, d(_(t.date), (e, t) => (l(), n(N, {
			key: e._id || t,
			task: e,
			"floor-index": t,
			onTaskClick: v
		}, null, 8, ["task", "floor-index"]))), 128))], 4)], 6))), 128))]));
	}
});
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/typeof.js
function U(e) {
	"@babel/helpers - typeof";
	return U = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, U(e);
}
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/toPrimitive.js
function W(e, t) {
	if (U(e) != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (U(r) != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/toPropertyKey.js
function G(e) {
	var t = W(e, "string");
	return U(t) == "symbol" ? t : t + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/defineProperty.js
function K(e, t, n) {
	return (t = G(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
//#endregion
//#region src/components/UserTaskParser.ts
D.default.extend(O.default);
var q = class {
	constructor(e, t) {
		K(this, "sdate", void 0), K(this, "items0", void 0), K(this, "total", void 0), K(this, "dates", void 0), K(this, "items", void 0), this.sdate = t, this.items0 = e, this.total = e.length, this.dates = this._getDates(), this._parse(), this.items = this._groupTasks();
	}
	_parse() {
		let e = this.items0.map((e) => ({ ...e }));
		e.forEach((e) => {
			let t = (0, D.default)(e.sdate), n = t.isoWeekday(), r = Math.min(7 - n + 1, e.duration);
			e.edate = t.add(r, "days").format("YYYY-MM-DD"), e.duration = r, e.weekday = n, e.space = 7 - n - e.duration + 1, e.canHasFollowingTasks = this.dates.includes(e.edate);
		}), this.items0 = e.sort((e, t) => (e.weekday ?? 0) - (t.weekday ?? 0));
	}
	_getDates() {
		let e = (0, D.default)(this.sdate), t = 1, n = [];
		for (; t < 8;) n.push(e.isoWeekday(t).format("YYYY-MM-DD")), t++;
		return n;
	}
	_getNextDateOf(e) {
		let t = this.dates.findIndex((t) => t === e);
		return t === this.dates.length - 1 ? null : this.dates[t + 1];
	}
	_getFollowingTask(e, t, n, r) {
		if (n === 0 || t === null) return r;
		let i = e.filter((e) => e.sdate === t && e.duration <= n);
		if (i.sort((e, t) => t.duration - e.duration), i.length > 0) {
			let t = i[0], n = e.findIndex((e) => e._id === t._id);
			return e.splice(n, 1), r.push(t), t.canHasFollowingTasks ? this._getFollowingTask(e, t.edate ?? null, t.space ?? 0, r) : r;
		}
		return this._getFollowingTask(e, this._getNextDateOf(t), n - 1, r);
	}
	_groupTasks() {
		let e = this.items0.slice(), t = [];
		for (; e.length;) {
			let n = e.shift(), r = { sdate: n.sdate };
			if (r[n.sdate] = n, !n.canHasFollowingTasks) {
				t.push(r);
				continue;
			}
			let i = [];
			this._getFollowingTask(e, n.edate ?? null, n.space ?? 0, i), i.forEach((e) => {
				r[e.sdate] = e;
			}), t.push(r);
		}
		return t;
	}
}, J = { class: "at-eg-scroll" }, Y = { class: "at-eg-tb" }, X = {
	key: 0,
	class: "at-eg-wd"
}, Z = { class: "at-eg-dt" }, ee = {
	key: 1,
	class: "at-eg-chip"
}, te = {
	key: 0,
	class: "at-eg-mask"
}, ne = {
	key: 1,
	class: "at-eg-empty"
}, Q = /* @__PURE__ */ o({
	__name: "EasyGantt",
	props: {
		utasks: {
			type: Array,
			default: () => []
		},
		sdate: {
			type: String,
			default: ""
		},
		spinner: {
			type: String,
			default: "ring"
		},
		loading: {
			type: Boolean,
			default: !1
		},
		theme: {
			type: String,
			default: "dark"
		},
		showWeekday: {
			type: Boolean,
			default: !0
		},
		highlightWeekend: {
			type: Boolean,
			default: !0
		},
		highlightToday: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["task-click"],
	setup(o, { emit: c }) {
		D.default.extend(O.default);
		let u = [
			"MON",
			"TUE",
			"WED",
			"THU",
			"FRI",
			"SAT",
			"SUN"
		], m = o, h = c, g = t(() => {
			if (!m.sdate) return [];
			let e = (0, D.default)(m.sdate);
			if (!e.isValid()) return [];
			let t = (0, D.default)().format("YYYY-MM-DD");
			return u.map((n, r) => {
				let i = e.isoWeekday(r + 1), a = i.format("YYYY-MM-DD");
				return {
					date: a,
					weekday: n,
					label: i.format("MM-DD"),
					isToday: m.highlightToday && a === t,
					isWeekend: m.highlightWeekend && r >= 5
				};
			});
		}), _ = t(() => m.sdate ? m.utasks.map((e) => ({
			user: e,
			tasks: new q(e.tasks || [], m.sdate).items
		})) : []), v = (e) => h("task-click", e);
		return (t, c) => (l(), i("div", { class: s(["at-eg", "at-eg--" + o.theme]) }, [a("div", J, [a("table", Y, [a("thead", null, [a("tr", null, [c[0] || (c[0] = a("th", { class: "at-eg-cell-first" }, " # ", -1)), (l(!0), i(e, null, d(g.value, (e) => (l(), i("th", {
			key: e.date,
			class: s({
				"at-eg-today": e.isToday,
				"at-eg-weekend": e.isWeekend
			})
		}, [
			o.showWeekday ? (l(), i("span", X, p(e.weekday), 1)) : r("", !0),
			a("span", Z, p(e.label), 1),
			e.isToday ? (l(), i("span", ee, "TODAY")) : r("", !0)
		], 2))), 128))])]), a("tbody", null, [(l(!0), i(e, null, d(_.value, (e, t) => (l(), n(H, {
			key: e.user._id || t,
			user: e.user,
			dates: g.value,
			tasks: e.tasks,
			onTaskClick: v
		}, null, 8, [
			"user",
			"dates",
			"tasks"
		]))), 128))])])]), o.loading ? (l(), i("div", te, [f(t.$slots, "spinner", {}, () => [a("span", { class: s(["at-eg-spinner", "at-eg-spinner--" + o.spinner]) }, null, 2)])])) : _.value.length ? r("", !0) : (l(), i("div", ne, [...c[1] || (c[1] = [a("svg", {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			"stroke-width": "1.5",
			"aria-hidden": "true"
		}, [a("rect", {
			x: "3",
			y: "5",
			width: "18",
			height: "16",
			rx: "2"
		}), a("path", { d: "M8 3v4M16 3v4M3 10h18" })], -1), a("p", null, "No tasks this week", -1)])]))], 2));
	}
}), $ = Q;
$.install = (e) => {
	e.component("easy-gantt", Q);
};
//#endregion
export { $ as default };
