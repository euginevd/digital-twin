/* ============================================================
   SHADER BACKDROP  — tasteful flowing amber field (WebGL)
   Usage:
     <canvas class="shader-canvas" data-shader></canvas>
     <script src="shader.js"></script>
   Reads --shader-base / --shader-glow / --shader-alpha from CSS,
   so it re-tints automatically on theme change. Degrades to a
   static CSS gradient if WebGL is unavailable or reduced-motion.
   ============================================================ */
function cssVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}
function hexToRGB(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const n = parseInt(hex, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function initShader(canvas) {
  if (!canvas || canvas.dataset.shaderReady) return;
  canvas.dataset.shaderReady = '1';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false });

  // ---- Fallback: static gradient ----
  if (!gl) {
    canvas.style.background =
      `radial-gradient(60% 60% at 70% 30%, ${cssVar('--shader-glow', '#f97316')}55, transparent 70%), ${cssVar('--shader-base', '#1a1714')}`;
    return;
  }

  const vert = `
    attribute vec2 p;
    void main() { gl_Position = vec4(p, 0.0, 1.0); }
  `;

  // Domain-warped FBM, two slow-drifting glow lobes, gentle grain.
  const frag = `
    precision highp float;
    uniform vec2  u_res;
    uniform float u_time;
    uniform vec3  u_base;
    uniform vec3  u_glow;
    uniform float u_alpha;

    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      vec2 u = f*f*(3.0-2.0*f);
      return mix(mix(hash(i+vec2(0,0)), hash(i+vec2(1,0)), u.x),
                 mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
    }
    float fbm(vec2 p){
      float v = 0.0, a = 0.5;
      for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
      return v;
    }

    void main(){
      vec2 uv = gl_FragCoord.xy / u_res.xy;
      vec2 p = uv;
      p.x *= u_res.x / u_res.y;
      float t = u_time * 0.04;

      // domain warp
      vec2 q = vec2(fbm(p*1.4 + t), fbm(p*1.4 - t + 5.2));
      float f = fbm(p*1.7 + q*1.3 + vec2(0.0, t*0.6));

      // two drifting glow lobes
      vec2 c1 = vec2(0.78 + 0.07*sin(t*1.3), 0.24 + 0.05*cos(t*0.9));
      vec2 c2 = vec2(0.16 + 0.06*cos(t*0.7), 0.82 + 0.05*sin(t*1.1));
      vec2 pr = vec2(uv.x * (u_res.x/u_res.y), uv.y);
      float ar = u_res.x/u_res.y;
      float g1 = smoothstep(0.60, 0.0, distance(pr, vec2(c1.x*ar, c1.y)));
      float g2 = smoothstep(0.70, 0.0, distance(pr, vec2(c2.x*ar, c2.y)));
      float glow = (g1*0.55 + g2*0.30) * (0.40 + 0.60*f);

      vec3 col = u_base;
      col = mix(col, col*1.07, smoothstep(0.2, 0.9, f) * 0.5);
      col += u_glow * glow * u_alpha;

      // subtle vignette + grain
      float vig = smoothstep(1.25, 0.2, length(uv - 0.5));
      col *= mix(0.82, 1.0, vig);
      float grain = (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.025;
      col += grain;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('shader compile error:', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  const vs = compile(gl.VERTEX_SHADER, vert);
  const fs = compile(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) { canvas.style.background = cssVar('--shader-base', '#1a1714'); return; }

  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u_res = gl.getUniformLocation(prog, 'u_res');
  const u_time = gl.getUniformLocation(prog, 'u_time');
  const u_base = gl.getUniformLocation(prog, 'u_base');
  const u_glow = gl.getUniformLocation(prog, 'u_glow');
  const u_alpha = gl.getUniformLocation(prog, 'u_alpha');

  let base = [0.1, 0.09, 0.08], glow = [0.97, 0.45, 0.18], alpha = 0.85;
  function refreshColors() {
    base = hexToRGB(cssVar('--shader-base', '#1a1714'));
    glow = hexToRGB(cssVar('--shader-glow', '#f97316'));
    alpha = parseFloat(cssVar('--shader-alpha', '0.85')) || 0.85;
  }
  refreshColors();

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();

  // Re-tint on theme switch
  const obs = new MutationObserver(() => { refreshColors(); if (reduce) draw(lastT); });
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  let lastT = 0;
  function draw(tMs) {
    const t = tMs * 0.001;
    lastT = t;
    gl.uniform2f(u_res, canvas.width, canvas.height);
    gl.uniform1f(u_time, t);
    gl.uniform3fv(u_base, base);
    gl.uniform3fv(u_glow, glow);
    gl.uniform1f(u_alpha, alpha);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  if (reduce) {
    draw(0); // single static frame
  } else {
    (function loop(t) { draw(t); requestAnimationFrame(loop); })(0);
  }
}

(function () {
  document.querySelectorAll('canvas[data-shader]').forEach(initShader);
})();
