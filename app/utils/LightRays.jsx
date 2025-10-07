// LightRays.jsx
import { useRef, useEffect, useState } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';

const DEFAULT_COLOR = '#ffffff';
const hexToRgb = hex => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};

const getAnchorAndDir = (origin, w, h) => {
  const outside = 0.2;
  switch (origin) {
    case 'top-left': return { anchor: [0, -outside * h], dir: [0, 1] };
    case 'top-right': return { anchor: [w, -outside * h], dir: [0, 1] };
    case 'left': return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case 'right': return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case 'bottom-left': return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
    case 'bottom-center': return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case 'bottom-right': return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
    default: return { anchor: [0.5 * w, -outside * h], dir: [0, 1] }; // top-center
  }
};

const LightRays = ({
  raysOrigin = 'top-center',
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0.0,
  distortion = 0.0,
  className = ''
}) => {
  const containerRef = useRef(null);
  const uniformsRef = useRef(null);
  const rendererRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationIdRef = useRef(null);
  const meshRef = useRef(null);
  const cleanupFunctionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    observerRef.current = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.05 });
    observerRef.current.observe(containerRef.current);
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    if (cleanupFunctionRef.current) cleanupFunctionRef.current();

    const init = async () => {
      await new Promise(r => setTimeout(r, 10));
      if (!containerRef.current) return;

      const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
      rendererRef.current = renderer;
      const gl = renderer.gl;

      // TRANSPARENCE + BLEND réglé pour glow additif sans peindre tout le fond
      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.BLEND);
      // Color additive (SRC_ALPHA, ONE), alpha composite kept sane via separate func:
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      // Canvas overlay CSS pour être certain qu'il recouvre bien et soit transparent
      gl.canvas.style.position = 'absolute';
      gl.canvas.style.inset = '0';
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';
      gl.canvas.style.pointerEvents = 'none';
      gl.canvas.style.zIndex = '50';

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(gl.canvas);

      // vertex/fragment (alpha calculée à partir de l'intensité)
      const vert = `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }`;

      const frag = `
        precision highp float;
        uniform float iTime;
        uniform vec2 iResolution;
        uniform vec2 rayPos;
        uniform vec2 rayDir;
        uniform vec3 raysColor;
        uniform float raysSpeed;
        uniform float lightSpread;
        uniform float rayLength;
        uniform float pulsating;
        uniform float fadeDistance;
        uniform float saturation;
        uniform vec2 mousePos;
        uniform float mouseInfluence;
        uniform float noiseAmount;
        uniform float distortion;
        varying vec2 vUv;

        float noise(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                          float seedA, float seedB, float speed) {
          vec2 sourceToCoord = coord - raySource;
          float dist = length(sourceToCoord);
          vec2 dirNorm = normalize(sourceToCoord);
          float cosAngle = dot(dirNorm, rayRefDirection);
          float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + dist * 0.01) * 0.2;
          float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));
          float maxDistance = iResolution.x * rayLength;
          float lengthFalloff = clamp((maxDistance - dist) / maxDistance, 0.0, 1.0);
          float fadeFalloff = clamp((iResolution.x * fadeDistance - dist) / (iResolution.x * fadeDistance), 0.0, 1.0);
          float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;
          float baseStrength = clamp(
            (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
            (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
            0.0, 2.0
          );
          return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
        }

        void mainImage(out vec4 fragColor, in vec2 fragCoord) {
          vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
          vec2 finalRayDir = rayDir;
          if (mouseInfluence > 0.0) {
            vec2 mouseScreenPos = mousePos * iResolution.xy;
            vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
            finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
          }

          vec3 r1 = vec3(1.0) * rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
          vec3 r2 = vec3(1.0) * rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);

          vec3 col = r1 * 0.5 + r2 * 0.4;

          if (noiseAmount > 0.0) {
            float n = noise(coord * 0.005 + iTime * 0.1);
            col *= (1.0 - noiseAmount + noiseAmount * n);
          }

          // Contraste vertical (pour qu'en haut ce soit plus lumineux)
          float brightnessMask = 1.0 - (coord.y / iResolution.y);
          col *= (0.35 + brightnessMask * 0.95);

          float gray = dot(col, vec3(0.299,0.587,0.114));
          col = mix(vec3(gray), col, saturation);

          // Appliquer la couleur choisie
          col *= raysColor;

          // alpha = intensité locale (contrôlée) -> zones sans rayons resteront transparentes
          float intensity = clamp(max(max(col.r, col.g), col.b), 0.0, 1.0);
          float alpha = pow(intensity, 0.8); // courbe pour un rendu plus doux
          fragColor = vec4(col, alpha);
        }

        void main() {
          vec4 color;
          mainImage(color, gl_FragCoord.xy);
          gl_FragColor = color;
        }`;

      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        rayPos: { value: [0, 0] },
        rayDir: { value: [0, 1] },
        raysColor: { value: hexToRgb(raysColor) },
        raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread },
        rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1.0 : 0.0 },
        fadeDistance: { value: fadeDistance },
        saturation: { value: saturation },
        mousePos: { value: [0.5, 0.5] },
        mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount },
        distortion: { value: distortion }
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, { vertex: vert, fragment: frag, uniforms });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;

      const updatePlacement = () => {
        if (!containerRef.current || !rendererRef.current) return;
        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        renderer.setSize(wCSS, hCSS);
        const dpr = renderer.dpr;
        const w = Math.max(1, Math.floor(wCSS * dpr)), h = Math.max(1, Math.floor(hCSS * dpr));
        uniforms.iResolution.value = [w, h];
        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);
        uniforms.rayPos.value = anchor;
        uniforms.rayDir.value = dir;
      };

      const loop = t => {
        uniforms.iTime.value = t * 0.001;
        if (followMouse && mouseInfluence > 0) {
          const s = 0.92;
          smoothMouseRef.current.x = smoothMouseRef.current.x * s + mouseRef.current.x * (1 - s);
          smoothMouseRef.current.y = smoothMouseRef.current.y * s + mouseRef.current.y * (1 - s);
          uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];
        }
        renderer.render({ scene: mesh });
        animationIdRef.current = requestAnimationFrame(loop);
      };

      window.addEventListener('resize', updatePlacement);
      updatePlacement();
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupFunctionRef.current = () => {
        cancelAnimationFrame(animationIdRef.current);
        window.removeEventListener('resize', updatePlacement);
        try { renderer.gl.getExtension('WEBGL_lose_context')?.loseContext(); } catch (e) {}
        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };
    };

    init();
    return () => cleanupFunctionRef.current?.();
  }, [
    isVisible, raysOrigin, raysColor, raysSpeed, lightSpread, rayLength,
    pulsating, fadeDistance, saturation, followMouse, mouseInfluence, noiseAmount, distortion
  ]);

  // props update -> update uniforms
  useEffect(() => {
    if (!uniformsRef.current) return;
    const u = uniformsRef.current;
    u.raysColor.value = hexToRgb(raysColor);
    u.raysSpeed.value = raysSpeed;
    u.lightSpread.value = lightSpread;
    u.rayLength.value = rayLength;
    u.pulsating.value = pulsating ? 1.0 : 0.0;
    u.fadeDistance.value = fadeDistance;
    u.saturation.value = saturation;
    u.mouseInfluence.value = mouseInfluence;
    u.noiseAmount.value = noiseAmount;
    u.distortion.value = distortion;

    if (containerRef.current && rendererRef.current) {
      const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
      const dpr = rendererRef.current.dpr;
      const { anchor, dir } = getAnchorAndDir(raysOrigin, wCSS * dpr, hCSS * dpr);
      u.rayPos.value = anchor;
      u.rayDir.value = dir;
    }
  }, [raysColor, raysSpeed, lightSpread, raysOrigin, rayLength, pulsating, fadeDistance, saturation, mouseInfluence, noiseAmount, distortion]);

  // mouse listener
  useEffect(() => {
    const handleMouse = e => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
    };
    if (followMouse) {
      window.addEventListener('mousemove', handleMouse);
      return () => window.removeEventListener('mousemove', handleMouse);
    }
  }, [followMouse]);

  // container must overlay content; style ensures it but you can override with className
  return (
    <div
      ref={containerRef}
      className={`w-full scale-100 transform-gpu h-full pointer-events-none overflow-hidden relative ${className}`}
      style={{ position: 'absolute', inset: 0, background: 'transparent', zIndex: 50, pointerEvents: 'none' }}
    />
  );
};

export default LightRays;
