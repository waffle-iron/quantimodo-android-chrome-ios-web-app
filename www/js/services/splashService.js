angular.module('starter')
    // quantimodoService API implementation
    .factory('splashService', function() {
        var splashService = {};

        splashService.heartAnimation = function () {
            window.requestAnimationFrame =
                window.__requestAnimationFrame ||
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                (function () {
                    return function (callback, element) {
                        var lastTime = element.__lastTime;
                        if (lastTime === undefined) {
                            lastTime = 0;
                        }
                        var currTime = Date.now();
                        var timeToCall = Math.max(1, 33 - (currTime - lastTime));
                        window.setTimeout(callback, timeToCall);
                        element.__lastTime = currTime + timeToCall;
                    };
                })();
            window.isDevice = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(((navigator.userAgent || navigator.vendor || window.opera)).toLowerCase()));
            var loaded = false;
            var init = function () {
                if (loaded) return;
                loaded = true;
                var mobile = window.isDevice;
                var koef = mobile ? 0.5 : 1;
                var canvas = document.getElementById('heart');
                var ctx = canvas.getContext('2d');
                var width = canvas.width = koef * innerWidth;
                var height = canvas.height = koef * innerHeight;
                var rand = Math.random;
                ctx.fillStyle = "rgba(0,0,0,1)";
                ctx.fillRect(0, 0, width, height);

                var heartPosition = function (rad) {
                    //return [Math.sin(rad), Math.cos(rad)];
                    return [Math.pow(Math.sin(rad), 3), -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad))];
                };
                var scaleAndTranslate = function (pos, sx, sy, dx, dy) {
                    return [dx + pos[0] * sx, dy + pos[1] * sy];
                };

                window.addEventListener('resize', function () {
                    width = canvas.width = koef * innerWidth;
                    height = canvas.height = koef * innerHeight;
                    ctx.fillStyle = "rgba(0,0,0,1)";
                    ctx.fillRect(0, 0, width, height);
                });

                var traceCount = mobile ? 20 : 50;
                var pointsOrigin = [];
                var i;
                var dr = mobile ? 0.3 : 0.1;
                for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
                for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0));
                for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));
                var heartPointsCount = pointsOrigin.length;

                var targetPoints = [];
                var pulse = function (kx, ky) {
                    for (i = 0; i < pointsOrigin.length; i++) {
                        targetPoints[i] = [];
                        targetPoints[i][0] = kx * pointsOrigin[i][0] + width / 2;
                        targetPoints[i][1] = ky * pointsOrigin[i][1] + height / 2;
                    }
                };

                var e = [];
                for (i = 0; i < heartPointsCount; i++) {
                    var x = rand() * width;
                    var y = rand() * height;
                    e[i] = {
                        vx: 0,
                        vy: 0,
                        R: 2,
                        speed: rand() + 5,
                        q: ~~(rand() * heartPointsCount),
                        D: 2 * (i % 2) - 1,
                        force: 0.2 * rand() + 0.7,
                        f: "hsla(0," + ~~(40 * rand() + 60) + "%," + ~~(60 * rand() + 20) + "%,.3)",
                        trace: []
                    };
                    for (var k = 0; k < traceCount; k++) e[i].trace[k] = {x: x, y: y};
                }

                var config = {
                    traceK: 0.4,
                    timeDelta: 0.01
                };

                var time = 0;
                var loop = function () {
                    var n = -Math.cos(time);
                    pulse((1 + n) * .5, (1 + n) * .5);
                    time += ((Math.sin(time)) < 0 ? 9 : (n > 0.8) ? .2 : 1) * config.timeDelta;
                    ctx.fillStyle = "rgba(0,0,0,.1)";
                    ctx.fillRect(0, 0, width, height);
                    for (i = e.length; i--;) {
                        var u = e[i];
                        var q = targetPoints[u.q];
                        var dx = u.trace[0].x - q[0];
                        var dy = u.trace[0].y - q[1];
                        var length = Math.sqrt(dx * dx + dy * dy);
                        if (10 > length) {
                            if (0.95 < rand()) {
                                u.q = ~~(rand() * heartPointsCount);
                            }
                            else {
                                if (0.99 < rand()) {
                                    u.D *= -1;
                                }
                                u.q += u.D;
                                u.q %= heartPointsCount;
                                if (0 > u.q) {
                                    u.q += heartPointsCount;
                                }
                            }
                        }
                        u.vx += -dx / length * u.speed;
                        u.vy += -dy / length * u.speed;
                        u.trace[0].x += u.vx;
                        u.trace[0].y += u.vy;
                        u.vx *= u.force;
                        u.vy *= u.force;
                        for (k = 0; k < u.trace.length - 1;) {
                            var T = u.trace[k];
                            var N = u.trace[++k];
                            N.x -= config.traceK * (N.x - T.x);
                            N.y -= config.traceK * (N.y - T.y);
                        }
                        ctx.fillStyle = u.f;
                        for (k = 0; k < u.trace.length; k++) {
                            ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1);
                        }
                    }
                    //ctx.fillStyle = "rgba(255,255,255,1)";
                    //for (i = u.trace.length; i--;) ctx.fillRect(targetPoints[i][0], targetPoints[i][1], 2, 2);

                    window.requestAnimationFrame(loop, canvas);
                };
                loop();
            };

            var s = document.readyState;
            if (s === 'complete' || s === 'loaded' || s === 'interactive') init();
            else document.addEventListener('DOMContentLoaded', init, false);
        };

        splashService.purpleParticleAnimation = function (){
            /*!
             * Particleground
             *
             * @author Jonathan Nicol - @mrjnicol
             * @version 1.1.0
             * @description Creates a canvas based particle system background
             *
             * Inspired by http://requestlab.fr/ and http://disruptivebydesign.com/
             */

            !function (a, b) {
                "use strict";
                function c(a) {
                    a = a || {};
                    for (var b = 1; b < arguments.length; b++) {
                        var c = arguments[b];
                        if (c)for (var d in c)c.hasOwnProperty(d) && ("object" == typeof c[d] ? deepExtend(a[d], c[d]) : a[d] = c[d])
                    }
                    return a
                }

                function d(d, g) {
                    function h() {
                        if (y) {
                            r = b.createElement("canvas"), r.className = "pg-canvas", r.style.display = "block", d.insertBefore(r, d.firstChild), s = r.getContext("2d"), i();
                            for (var c = Math.round(r.width * r.height / g.density), e = 0; c > e; e++) {
                                var f = new n;
                                f.setStackPos(e), z.push(f)
                            }
                            a.addEventListener("resize", function () {
                                k()
                            }, !1), b.addEventListener("mousemove", function (a) {
                                A = a.pageX, B = a.pageY
                            }, !1), D && !C && a.addEventListener("deviceorientation", function () {
                                F = Math.min(Math.max(-event.beta, -30), 30), E = Math.min(Math.max(-event.gamma, -30), 30)
                            }, !0), j(), q("onInit")
                        }
                    }

                    function i() {
                        r.width = d.offsetWidth, r.height = d.offsetHeight, s.fillStyle = g.dotColor, s.strokeStyle = g.lineColor, s.lineWidth = g.lineWidth
                    }

                    function j() {
                        if (y) {
                            u = a.innerWidth, v = a.innerHeight, s.clearRect(0, 0, r.width, r.height);
                            for (var b = 0; b < z.length; b++)z[b].updatePosition();
                            for (var b = 0; b < z.length; b++)z[b].draw();
                            G || (t = requestAnimationFrame(j))
                        }
                    }

                    function k() {
                        i();
                        for (var a = d.offsetWidth, b = d.offsetHeight, c = z.length - 1; c >= 0; c--)(z[c].position.x > a || z[c].position.y > b) && z.splice(c, 1);
                        var e = Math.round(r.width * r.height / g.density);
                        if (e > z.length)for (; e > z.length;) {
                            var f = new n;
                            z.push(f)
                        } else e < z.length && z.splice(e);
                        for (c = z.length - 1; c >= 0; c--)z[c].setStackPos(c)
                    }

                    function l() {
                        G = !0
                    }

                    function m() {
                        G = !1, j()
                    }

                    function n() {
                        switch (this.stackPos, this.active = !0, this.layer = Math.ceil(3 * Math.random()), this.parallaxOffsetX = 0, this.parallaxOffsetY = 0, this.position = {
                            x: Math.ceil(Math.random() * r.width),
                            y: Math.ceil(Math.random() * r.height)
                        }, this.speed = {}, g.directionX) {
                            case"left":
                                this.speed.x = +(-g.maxSpeedX + Math.random() * g.maxSpeedX - g.minSpeedX).toFixed(2);
                                break;
                            case"right":
                                this.speed.x = +(Math.random() * g.maxSpeedX + g.minSpeedX).toFixed(2);
                                break;
                            default:
                                this.speed.x = +(-g.maxSpeedX / 2 + Math.random() * g.maxSpeedX).toFixed(2), this.speed.x += this.speed.x > 0 ? g.minSpeedX : -g.minSpeedX
                        }
                        switch (g.directionY) {
                            case"up":
                                this.speed.y = +(-g.maxSpeedY + Math.random() * g.maxSpeedY - g.minSpeedY).toFixed(2);
                                break;
                            case"down":
                                this.speed.y = +(Math.random() * g.maxSpeedY + g.minSpeedY).toFixed(2);
                                break;
                            default:
                                this.speed.y = +(-g.maxSpeedY / 2 + Math.random() * g.maxSpeedY).toFixed(2), this.speed.x += this.speed.y > 0 ? g.minSpeedY : -g.minSpeedY
                        }
                    }

                    function o(a, b) {
                        return b ? void(g[a] = b) : g[a]
                    }

                    function p() {
                        console.log("destroy"), r.parentNode.removeChild(r), q("onDestroy"), f && f(d).removeData("plugin_" + e)
                    }

                    function q(a) {
                        void 0 !== g[a] && g[a].call(d)
                    }

                    var r, s, t, u, v, w, x, y = !!b.createElement("canvas").getContext, z = [], A = 0, B = 0, C = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), D = !!a.DeviceOrientationEvent, E = 0, F = 0, G = !1;
                    return g = c({}, a[e].defaults, g), n.prototype.draw = function () {
                        s.beginPath(), s.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY, g.particleRadius / 2, 0, 2 * Math.PI, !0), s.closePath(), s.fill(), s.beginPath();
                        for (var a = z.length - 1; a > this.stackPos; a--) {
                            var b = z[a], c = this.position.x - b.position.x, d = this.position.y - b.position.y, e = Math.sqrt(c * c + d * d).toFixed(2);
                            e < g.proximity && (s.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY), g.curvedLines ? s.quadraticCurveTo(Math.max(b.position.x, b.position.x), Math.min(b.position.y, b.position.y), b.position.x + b.parallaxOffsetX, b.position.y + b.parallaxOffsetY) : s.lineTo(b.position.x + b.parallaxOffsetX, b.position.y + b.parallaxOffsetY))
                        }
                        s.stroke(), s.closePath()
                    }, n.prototype.updatePosition = function () {
                        if (g.parallax) {
                            if (D && !C) {
                                var a = (u - 0) / 60;
                                w = (E - -30) * a + 0;
                                var b = (v - 0) / 60;
                                x = (F - -30) * b + 0
                            } else w = A, x = B;
                            this.parallaxTargX = (w - u / 2) / (g.parallaxMultiplier * this.layer), this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10, this.parallaxTargY = (x - v / 2) / (g.parallaxMultiplier * this.layer), this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10
                        }
                        var c = d.offsetWidth, e = d.offsetHeight;
                        switch (g.directionX) {
                            case"left":
                                this.position.x + this.speed.x + this.parallaxOffsetX < 0 && (this.position.x = c - this.parallaxOffsetX);
                                break;
                            case"right":
                                this.position.x + this.speed.x + this.parallaxOffsetX > c && (this.position.x = 0 - this.parallaxOffsetX);
                                break;
                            default:
                                (this.position.x + this.speed.x + this.parallaxOffsetX > c || this.position.x + this.speed.x + this.parallaxOffsetX < 0) && (this.speed.x = -this.speed.x)
                        }
                        switch (g.directionY) {
                            case"up":
                                this.position.y + this.speed.y + this.parallaxOffsetY < 0 && (this.position.y = e - this.parallaxOffsetY);
                                break;
                            case"down":
                                this.position.y + this.speed.y + this.parallaxOffsetY > e && (this.position.y = 0 - this.parallaxOffsetY);
                                break;
                            default:
                                (this.position.y + this.speed.y + this.parallaxOffsetY > e || this.position.y + this.speed.y + this.parallaxOffsetY < 0) && (this.speed.y = -this.speed.y)
                        }
                        this.position.x += this.speed.x, this.position.y += this.speed.y
                    }, n.prototype.setStackPos = function (a) {
                        this.stackPos = a
                    }, h(), {option: o, destroy: p, start: m, pause: l}
                }

                var e = "particleground", f = a.jQuery;
                a[e] = function (a, b) {
                    return new d(a, b)
                }, a[e].defaults = {
                    minSpeedX: .1,
                    maxSpeedX: .7,
                    minSpeedY: .1,
                    maxSpeedY: .7,
                    directionX: "center",
                    directionY: "center",
                    density: 1e4,
                    dotColor: "#666666",
                    lineColor: "#666666",
                    particleRadius: 7,
                    lineWidth: 1,
                    curvedLines: !1,
                    proximity: 100,
                    parallax: !0,
                    parallaxMultiplier: 5,
                    onInit: function () {
                    },
                    onDestroy: function () {
                    }
                }, f && (f.fn[e] = function (a) {
                    if ("string" == typeof arguments[0]) {
                        var b, c = arguments[0], g = Array.prototype.slice.call(arguments, 1);
                        return this.each(function () {
                            f.data(this, "plugin_" + e) && "function" == typeof f.data(this, "plugin_" + e)[c] && (b = f.data(this, "plugin_" + e)[c].apply(this, g))
                        }), void 0 !== b ? b : this
                    }
                    return "object" != typeof a && a ? void 0 : this.each(function () {
                            f.data(this, "plugin_" + e) || f.data(this, "plugin_" + e, new d(this, a))
                        })
                })
            }(window, document), /**
             * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
             * @see: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
             * @see: http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
             * @license: MIT license
             */
                function () {
                    for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c)window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
                    window.requestAnimationFrame || (window.requestAnimationFrame = function (b) {
                        var c = (new Date).getTime(), d = Math.max(0, 16 - (c - a)), e = window.setTimeout(function () {
                            b(c + d)
                        }, d);
                        return a = c + d, e
                    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (a) {
                        clearTimeout(a)
                    })
                }();


            particleground(document.getElementById('particles-foreground'), {
                dotColor: 'rgba(255, 255, 255, 1)',
                lineColor: 'rgba(255, 255, 255, 0.05)',
                minSpeedX: 0.3,
                maxSpeedX: 0.6,
                minSpeedY: 0.3,
                maxSpeedY: 0.6,
                density: 50000, // One particle every n pixels
                curvedLines: false,
                proximity: 250, // How close two dots need to be before they join
                parallaxMultiplier: 10, // Lower the number is more extreme parallax
                particleRadius: 4, // Dot size
            });

            particleground(document.getElementById('particles-background'), {
                dotColor: 'rgba(255, 255, 255, 0.5)',
                lineColor: 'rgba(255, 255, 255, 0.05)',
                minSpeedX: 0.075,
                maxSpeedX: 0.15,
                minSpeedY: 0.075,
                maxSpeedY: 0.15,
                density: 30000, // One particle every n pixels
                curvedLines: false,
                proximity: 20, // How close two dots need to be before they join
                parallaxMultiplier: 20, // Lower the number is more extreme parallax
                particleRadius: 2, // Dot size
            });
        };

        return splashService;
    });
