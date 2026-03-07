import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

const canvas = document.getElementById("hero-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x07171f, 6, 20);

const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
camera.position.set(0, 0.35, 7);

const ambient = new THREE.AmbientLight(0x7ad1ff, 0.6);
scene.add(ambient);

const key = new THREE.PointLight(0x5dfdc2, 1.4, 40);
key.position.set(2.5, 2.8, 2.8);
scene.add(key);

const torus = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1.35, 0.34, 220, 28),
  new THREE.MeshStandardMaterial({ color: 0x6cf1ff, roughness: 0.3, metalness: 0.65, emissive: 0x0d2731 })
);
scene.add(torus);

const starGeometry = new THREE.BufferGeometry();
const starCount = 700;
const pos = new Float32Array(starCount * 3);
for (let i = 0; i < starCount; i += 1) {
  pos[i * 3] = (Math.random() - 0.5) * 18;
  pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
  pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
}
starGeometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));

const stars = new THREE.Points(
  starGeometry,
  new THREE.PointsMaterial({ color: 0x78ffd5, size: 0.03, transparent: true, opacity: 0.8 })
);
scene.add(stars);

function resize() {
  const parent = canvas.parentElement;
  const { width, height } = parent.getBoundingClientRect();
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animate(t) {
  const time = t * 0.001;
  torus.rotation.x = time * 0.45;
  torus.rotation.y = time * 0.58;
  stars.rotation.y = time * 0.035;
  stars.rotation.x = Math.sin(time * 0.25) * 0.05;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener("resize", resize);
resize();
requestAnimationFrame(animate);
