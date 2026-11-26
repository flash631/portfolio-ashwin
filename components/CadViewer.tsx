import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import {
  ArrowsOut,
  Camera,
  ChatCircleDots,
  Cube,
  Eye,
  EyeSlash,
  FileText,
  GearSix,
  Hand,
  House,
  MagnifyingGlassPlus,
  Globe,
  PencilLine,
  PersonSimpleWalk,
  Printer,
  Ruler,
  ShareNetwork,
  Scissors,
  SquaresFour,
  TreeStructure,
  X,
} from '@phosphor-icons/react';
import type { CadModel } from '../cadModels';
import { assetUrl } from '../portfolioData';

type Tool = 'orbit' | 'pan' | 'zoom' | 'first' | 'measure' | 'section' | 'explode' | 'markup';
type PanelTab = 'views' | 'browser' | 'properties' | 'settings';
type SettingsTab = 'configuration' | 'navigation' | 'appearance';

interface ViewerSettings {
  disableShadow: boolean;
  progressive: boolean;
  ghost: boolean;
  showEdges: boolean;
  showLines: boolean;
  showCube: boolean;
  orbitPoles: boolean;
  zoomPivot: boolean;
  leftHanded: boolean;
  gravity: boolean;
  scrollSpeed: number;
  dragSpeed: number;
  antialias: boolean;
  ambientShadows: boolean;
  groundShadow: boolean;
  envPreset: 'sharp' | 'room' | 'studio';
  envVisible: boolean;
}

const DEFAULT_SETTINGS: ViewerSettings = {
  disableShadow: true,
  progressive: true,
  ghost: true,
  showEdges: false,
  showLines: false,
  showCube: true,
  orbitPoles: true,
  zoomPivot: false,
  leftHanded: false,
  gravity: true,
  scrollSpeed: 1,
  dragSpeed: 1,
  antialias: true,
  ambientShadows: true,
  groundShadow: true,
  envPreset: 'sharp',
  envVisible: false,
};

interface PartInfo {
  index: number;
  name: string;
  sizeMm: [number, number, number];
  triangles: number;
}

interface ThreeState {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  composer: EffectComposer;
  fxaa: ShaderPass;
  root: THREE.Object3D | null;
  parts: THREE.Object3D[];
  basePositions: THREE.Vector3[];
  partCenters: THREE.Vector3[];
  center: THREE.Vector3;
  size: number;
  materials: THREE.MeshStandardMaterial[];
  edges: THREE.LineSegments[];
  wires: THREE.Mesh[];
  ground: THREE.Mesh | null;
  dirLight: THREE.DirectionalLight;
  cubeScene: THREE.Scene;
  cubeCamera: THREE.PerspectiveCamera;
  cube: THREE.Mesh;
  measureGroup: THREE.Group;
  measurePoints: THREE.Vector3[];
  keys: Set<string>;
  yaw: number;
  pitch: number;
  homePos: THREE.Vector3;
  homeTarget: THREE.Vector3;
  modelScene: THREE.Object3D | null;
  loadModel: ((file: string, keepCamera: boolean) => void) | null;
}

function materialFor(name: string): THREE.MeshStandardMaterial {
  const base = { metalness: 0.85, roughness: 0.38 };
  if (name.includes('ActuatorRod')) return new THREE.MeshStandardMaterial({ color: 0xe9edf2, metalness: 1, roughness: 0.12 });
  if (name.includes('ActuatorCase')) return new THREE.MeshStandardMaterial({ color: 0x474e58, metalness: 0.8, roughness: 0.45 });
  if (name.includes('CableLead')) return new THREE.MeshStandardMaterial({ color: 0x2456a6, metalness: 0.1, roughness: 0.6 });
  if (name.includes('ServoConnector')) return new THREE.MeshStandardMaterial({ color: 0x22262b, metalness: 0.3, roughness: 0.55 });
  if (/Screw|Washer|Nut|Socket|CSK|Key|Bolt/i.test(name)) return new THREE.MeshStandardMaterial({ color: 0x878d96, metalness: 0.95, roughness: 0.3 });
  const ln = name.toLowerCase();
  if (ln.includes('cowling')) return new THREE.MeshStandardMaterial({ color: 0xbdc7d1, metalness: 0.25, roughness: 0.5 });
  if (ln.includes('motor') || ln.includes('at4120')) return new THREE.MeshStandardMaterial({ color: 0x3a4048, metalness: 0.7, roughness: 0.4 });
  if (ln.includes('phase') || ln.includes('xt150') || ln.includes('wire')) return new THREE.MeshStandardMaterial({ color: 0x2456a6, metalness: 0.1, roughness: 0.6 });
  if (ln.includes('silicone') || ln.includes('connector')) return new THREE.MeshStandardMaterial({ color: 0x2a2e33, metalness: 0.2, roughness: 0.6 });
  if (name.includes('Cable')) return new THREE.MeshStandardMaterial({ color: 0x2456a6, metalness: 0.1, roughness: 0.6 });
  if (name.includes('Panel')) return new THREE.MeshStandardMaterial({ color: 0xc3ccd8, metalness: 0.35, roughness: 0.5 });
  if (name.includes('Spring')) return new THREE.MeshStandardMaterial({ color: 0x555c66, metalness: 0.85, roughness: 0.35 });
  const ln2 = name.toLowerCase();
  if (ln2.includes('radiator')) return new THREE.MeshStandardMaterial({ color: 0xd8dee6, metalness: 0.2, roughness: 0.55 });
  if (ln2.includes('accumulator')) return new THREE.MeshStandardMaterial({ color: 0x707882, metalness: 0.8, roughness: 0.35 });
  if (ln2.includes('tube')) return new THREE.MeshStandardMaterial({ color: 0x8fa5b8, metalness: 0.9, roughness: 0.3 });
  if (name.includes('Bearing')) return new THREE.MeshStandardMaterial({ color: 0x6f757e, ...base });
  if (name.includes('Frame')) return new THREE.MeshStandardMaterial({ color: 0x9aa3b1, ...base });
  return new THREE.MeshStandardMaterial({ color: 0xb2b9c4, ...base });
}

function faceTexture(label: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#eef1f5';
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = '#9aa3af';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 124, 124);
  ctx.fillStyle = '#39424e';
  ctx.font = '700 25px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 64, 66);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const STANDARD_VIEWS: { label: string; dir: [number, number, number] }[] = [
  { label: 'Home', dir: [1, 0.62, 1] },
  { label: 'Top', dir: [0, 1, 0.001] },
  { label: 'Bottom', dir: [0, -1, 0.001] },
  { label: 'Front', dir: [0, 0, 1] },
  { label: 'Back', dir: [0, 0, -1] },
  { label: 'Left', dir: [-1, 0, 0] },
  { label: 'Right', dir: [1, 0, 0] },
  { label: 'Isometric', dir: [1, 0.72, -1] },
];

export default function CadViewer({ model, variant = 'section', fileOverride }: { model: CadModel; variant?: 'section' | 'full'; fileOverride?: string }) {
  const loadedFileRef = useRef(model.file);
  useEffect(() => {
    if (!fileOverride || fileOverride === loadedFileRef.current) return;
    loadedFileRef.current = fileOverride;
    stateRef.current?.loadModel?.(assetUrl(fileOverride), true);
  }, [fileOverride]);
  const hostRef = useRef<HTMLDivElement>(null);
  const cubeHostRef = useRef<HTMLDivElement>(null);
  const frameCameraRef = useRef<(dir?: THREE.Vector3) => void>(() => undefined);
  const markupRef = useRef<HTMLCanvasElement>(null);
  const measureLabelRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<ThreeState | null>(null);
  const toolRef = useRef<Tool>('orbit');
  const settingsRef = useRef<ViewerSettings>(DEFAULT_SETTINGS);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tool, setToolState] = useState<Tool>('orbit');
  const [panelTab, setPanelTab] = useState<PanelTab | null>(variant === 'full' ? 'browser' : null);
  const [settingsTab, setSettingsTab] = useState<SettingsTab>('configuration');
  const [settings, setSettingsState] = useState<ViewerSettings>(DEFAULT_SETTINGS);
  const [parts, setParts] = useState<PartInfo[]>([]);
  const [hidden, setHidden] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<number | null>(null);
  const [measureText, setMeasureText] = useState('');
  const [explode, setExplode] = useState(0);
  const [sectionAxis, setSectionAxis] = useState<'x' | 'y' | 'z'>('y');
  const [sectionValue, setSectionValue] = useState(0);
  const [commentOpen, setCommentOpen] = useState(false);
  const [comment, setComment] = useState(() => window.localStorage.getItem(`cad-comment-${model.id}`) || '');
  const [shared, setShared] = useState(false);

  const setTool = (next: Tool) => {
    toolRef.current = next;
    setToolState(next);
  };
  const setSettings = (patch: Partial<ViewerSettings>) => {
    const next = { ...settingsRef.current, ...patch };
    settingsRef.current = next;
    setSettingsState(next);
  };

  /* ---------- camera helpers ---------- */
  const frameCamera = (dir?: THREE.Vector3) => {
    const s = stateRef.current;
    if (!s) return;
    const direction = (dir || new THREE.Vector3(1, 0.62, 1)).clone().normalize();
    const dist = s.size * 2.1;
    s.camera.position.copy(s.center).addScaledVector(direction, dist);
    s.controls.target.copy(s.center);
    s.controls.update();
  };

  frameCameraRef.current = frameCamera;

  /* ---------- init ---------- */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    renderer.localClippingEnabled = true;
    host.appendChild(renderer.domElement);
    renderer.domElement.className = 'cad-webgl';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.001, 50);
    camera.position.set(0.35, 0.28, 0.35);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const hemi = new THREE.HemisphereLight(0xffffff, 0x8a93a3, 0.55);
    scene.add(hemi);
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.4);
    dirLight.position.set(0.35, 0.55, 0.25);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    dirLight.shadow.bias = -0.0002;
    scene.add(dirLight);
    const fill = new THREE.DirectionalLight(0xdfe8ff, 0.7);
    fill.position.set(-0.4, 0.2, -0.3);
    scene.add(fill);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const fxaa = new ShaderPass(FXAAShader);
    composer.addPass(fxaa);
    composer.addPass(new OutputPass());

    // ViewCube
    const cubeScene = new THREE.Scene();
    const faceMats = ['RIGHT', 'LEFT', 'TOP', 'BOTTOM', 'FRONT', 'BACK'].map(
      (label) => new THREE.MeshBasicMaterial({ map: faceTexture(label) }),
    );
    const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), faceMats);
    cubeScene.add(cube);
    const cubeCamera = new THREE.PerspectiveCamera(32, 1, 0.1, 20);

    const measureGroup = new THREE.Group();
    scene.add(measureGroup);

    const s: ThreeState = {
      renderer, scene, camera, controls, composer, fxaa,
      root: null, parts: [], basePositions: [], partCenters: [],
      center: new THREE.Vector3(), size: 0.3,
      materials: [], edges: [], wires: [],
      ground: null, dirLight, cubeScene, cubeCamera, cube,
      measureGroup, measurePoints: [], keys: new Set(),
      yaw: 0, pitch: 0, homePos: new THREE.Vector3(), homeTarget: new THREE.Vector3(), modelScene: null, loadModel: null,
    };
    stateRef.current = s;

    const loader = new GLTFLoader();
    const loadModel = (file: string, keepCamera: boolean) => {
      if (disposed) return;
      setLoading(true);
      if (s.modelScene) {
        scene.remove(s.modelScene);
        s.modelScene.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) m.geometry.dispose(); });
        s.modelScene = null;
        s.root = null;
        s.parts = []; s.basePositions = []; s.partCenters = [];
        s.materials = []; s.edges = []; s.wires = [];
        if (s.ground) { scene.remove(s.ground); s.ground = null; }
        s.measureGroup.clear();
        s.measurePoints = [];
        setParts([]);
        setSelected(null);
      }
      loader.load(
      file,
      (gltf) => {
        if (disposed) return;
        scene.add(gltf.scene);
        s.modelScene = gltf.scene;
        let root: THREE.Object3D = gltf.scene;
        if (root.children.length === 1 && root.children[0].children.length > 0) {
          root = root.children[0];
        }
        s.root = root;
        const box = new THREE.Box3().setFromObject(root);
        box.getCenter(s.center);
        const sphere = box.getBoundingSphere(new THREE.Sphere());
        s.size = sphere.radius * 2;

        const partInfos: PartInfo[] = [];
        root.children.forEach((part, index) => {
          s.parts.push(part);
          s.basePositions.push(part.position.clone());
          const pBox = new THREE.Box3().setFromObject(part);
          const pCenter = pBox.getCenter(new THREE.Vector3());
          s.partCenters.push(pCenter);
          let tris = 0;
          const partMeshes: THREE.Mesh[] = [];
          part.traverse((obj) => {
            if ((obj as THREE.Mesh).isMesh) partMeshes.push(obj as THREE.Mesh);
          });
          partMeshes.forEach((mesh) => {
            {
              mesh.userData.partMesh = true;
              mesh.material = materialFor(part.name);
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              s.materials.push(mesh.material as THREE.MeshStandardMaterial);
              const geom = mesh.geometry as THREE.BufferGeometry;
              tris += (geom.index ? geom.index.count : geom.attributes.position.count) / 3;
              const edges = new THREE.LineSegments(
                new THREE.EdgesGeometry(geom, 32),
                new THREE.LineBasicMaterial({ color: 0x39424e, transparent: true, opacity: 0.4 }),
              );
              edges.visible = false;
              mesh.add(edges);
              s.edges.push(edges);
              const wire = new THREE.Mesh(
                geom,
                new THREE.MeshBasicMaterial({ color: 0x0757e8, wireframe: true, transparent: true, opacity: 0.12 }),
              );
              wire.visible = false;
              mesh.add(wire);
              s.wires.push(wire);
            }
          });
          const dims = pBox.getSize(new THREE.Vector3());
          partInfos.push({
            index,
            name: part.name || `Part ${index + 1}`,
            sizeMm: [dims.x * 1000, dims.y * 1000, dims.z * 1000],
            triangles: Math.round(tris),
          });
        });
        setParts(partInfos);

        // ground shadow catcher
        const ground = new THREE.Mesh(
          new THREE.PlaneGeometry(4, 4),
          new THREE.ShadowMaterial({ opacity: 0.16 }),
        );
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = box.min.y - 0.001;
        ground.receiveShadow = true;
        scene.add(ground);
        s.ground = ground;

        const sc = dirLight.shadow.camera;
        sc.left = -s.size; sc.right = s.size; sc.top = s.size; sc.bottom = -s.size;
        sc.far = 3;
        dirLight.target.position.copy(s.center);
        scene.add(dirLight.target);

        if (keepCamera) {
          const p = camera.position.clone();
          const t = controls.target.clone();
          frameCamera();
          s.homePos.copy(camera.position);
          s.homeTarget.copy(controls.target);
          camera.position.copy(p);
          controls.target.copy(t);
          controls.update();
        } else {
          frameCamera();
          s.homePos.copy(camera.position);
          s.homeTarget.copy(controls.target);
        }
        setLoading(false);
      },
      undefined,
      () => { if (!disposed) { setError('The model file could not be loaded.'); setLoading(false); } },
      );
    };
    s.loadModel = loadModel;
    loadModel(assetUrl(model.file), false);

    /* ---------- interaction ---------- */
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let downPos: { x: number; y: number } | null = null;

    const castAt = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      if (!s.root) return null;
      const hits = raycaster.intersectObject(s.root, true);
      return hits.find((h) => {
        let o: THREE.Object3D | null = h.object;
        while (o && o.parent !== s.root) o = o.parent;
        return o !== null && (h.object as THREE.Mesh).isMesh;
      }) || null;
    };

    const topPartOf = (obj: THREE.Object3D) => {
      let o: THREE.Object3D | null = obj;
      while (o && o.parent !== s.root) o = o.parent;
      return o;
    };

    const onPointerDown = (event: PointerEvent) => {
      downPos = { x: event.clientX, y: event.clientY };
      if (toolRef.current === 'first') {
        renderer.domElement.requestPointerLock();
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!downPos) return;
      const moved = Math.hypot(event.clientX - downPos.x, event.clientY - downPos.y);
      downPos = null;
      if (moved > 5) return;
      const rect = renderer.domElement.getBoundingClientRect();

      const hit = castAt(event);
      if (toolRef.current === 'measure') {
        if (!hit) return;
        s.measurePoints.push(hit.point.clone());
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(s.size * 0.008, 16, 16),
          new THREE.MeshBasicMaterial({ color: 0x0757e8 }),
        );
        dot.position.copy(hit.point);
        s.measureGroup.add(dot);
        if (s.measurePoints.length === 2) {
          const [a, b] = s.measurePoints;
          const geom = new THREE.BufferGeometry().setFromPoints([a, b]);
          s.measureGroup.add(new THREE.Line(geom, new THREE.LineBasicMaterial({ color: 0x0757e8 })));
          const mm = a.distanceTo(b) * 1000;
          setMeasureText(`${mm.toFixed(1)} mm`);
          s.measurePoints = [];
        }
        return;
      }
      if (toolRef.current === 'orbit' || toolRef.current === 'pan' || toolRef.current === 'zoom') {
        if (!hit) { setSelected(null); return; }
        const part = topPartOf(hit.object);
        if (part) setSelected(s.parts.indexOf(part));
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (toolRef.current !== 'first' || document.pointerLockElement !== renderer.domElement) return;
      s.yaw -= event.movementX * 0.0022;
      s.pitch = THREE.MathUtils.clamp(s.pitch - event.movementY * 0.0022, -1.45, 1.45);
    };
    const onKey = (down: boolean) => (event: KeyboardEvent) => {
      if (toolRef.current === 'first') {
        if (down) s.keys.add(event.key.toLowerCase()); else s.keys.delete(event.key.toLowerCase());
      }
    };
    const keyDown = onKey(true);
    const keyUp = onKey(false);
    const onLockChange = () => {
      if (toolRef.current === 'first' && document.pointerLockElement !== renderer.domElement) {
        // exited first-person; restore orbit around the point ahead
        const ahead = new THREE.Vector3();
        camera.getWorldDirection(ahead);
        controls.target.copy(camera.position).addScaledVector(ahead, s.size * 0.4);
        controls.enabled = true;
        setTool('orbit');
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    document.addEventListener('pointerlockchange', onLockChange);

    /* ---------- resize + loop ---------- */
    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      composer.setSize(w, h);
      const pr = renderer.getPixelRatio();
      (fxaa.material as THREE.ShaderMaterial).uniforms.resolution.value.set(1 / (w * pr), 1 / (h * pr));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const mc = markupRef.current;
      if (mc && (mc.width !== w || mc.height !== h)) { mc.width = w; mc.height = h; }
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (toolRef.current === 'first' && document.pointerLockElement === renderer.domElement) {
        const euler = new THREE.Euler(s.pitch, s.yaw, 0, 'YXZ');
        camera.quaternion.setFromEuler(euler);
        const speed = s.size * 0.55 * dt;
        const fwd = new THREE.Vector3();
        camera.getWorldDirection(fwd);
        if (settingsRef.current.gravity) fwd.y = 0;
        fwd.normalize();
        const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0)).normalize();
        if (s.keys.has('w')) camera.position.addScaledVector(fwd, speed);
        if (s.keys.has('s')) camera.position.addScaledVector(fwd, -speed);
        if (s.keys.has('a')) camera.position.addScaledVector(right, -speed);
        if (s.keys.has('d')) camera.position.addScaledVector(right, speed);
        if (s.keys.has('e')) camera.position.y += speed;
        if (s.keys.has('q')) camera.position.y -= speed;
      } else {
        controls.update();
      }
      if (settingsRef.current.antialias) composer.render(); else renderer.render(scene, camera);

      // measure label follows midpoint
      const label = measureLabelRef.current;
      if (label && s.measureGroup.children.length >= 3) {
        const mid = new THREE.Vector3();
        const dots = s.measureGroup.children.filter((c) => (c as THREE.Mesh).isMesh);
        if (dots.length === 2) {
          mid.addVectors(dots[0].position, dots[1].position).multiplyScalar(0.5).project(camera);
          label.style.left = `${(mid.x * 0.5 + 0.5) * host.clientWidth}px`;
          label.style.top = `${(-mid.y * 0.5 + 0.5) * host.clientHeight}px`;
          label.style.opacity = '1';
        }
      } else if (label) label.style.opacity = '0';

    };
    loop();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('keydown', keyDown);
      document.removeEventListener('keyup', keyUp);
      document.removeEventListener('pointerlockchange', onLockChange);
      controls.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
      stateRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model.id, model.file]);

  /* ---------- apply tool to controls ---------- */
  useEffect(() => {
    const s = stateRef.current;
    if (!s) return;
    const c = s.controls;
    if (tool === 'pan') c.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
    else if (tool === 'zoom') c.mouseButtons = { LEFT: THREE.MOUSE.DOLLY, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
    else c.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
    if (settingsRef.current.leftHanded && tool === 'orbit') {
      c.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE };
    }
    c.enabled = tool !== 'first' && tool !== 'measure' && tool !== 'markup';
    if (tool === 'first') {
      const euler = new THREE.Euler().setFromQuaternion(s.camera.quaternion, 'YXZ');
      s.yaw = euler.y;
      s.pitch = euler.x;
    }
    if (tool !== 'measure') {
      s.measureGroup.clear();
      s.measurePoints = [];
      setMeasureText('');
    }
  }, [tool, loading]);

  /* ---------- apply settings ---------- */
  useEffect(() => {
    const s = stateRef.current;
    if (!s || loading) return;
    s.renderer.shadowMap.enabled = !settings.disableShadow || settings.ambientShadows;
    s.dirLight.castShadow = settings.ambientShadows && !settings.disableShadow;
    if (s.ground) s.ground.visible = settings.groundShadow;
    s.edges.forEach((e) => { e.visible = settings.showEdges; });
    s.wires.forEach((w) => { w.visible = settings.showLines; });
    s.controls.maxPolarAngle = settings.orbitPoles ? Math.PI : Math.PI / 2;
    s.controls.zoomToCursor = settings.zoomPivot;
    s.controls.zoomSpeed = settings.scrollSpeed;
    s.controls.rotateSpeed = settings.dragSpeed;
    s.controls.screenSpacePanning = true;
    s.renderer.setPixelRatio(settings.progressive ? Math.min(window.devicePixelRatio, 2) : 1);
    s.scene.environmentIntensity = settings.envPreset === 'sharp' ? 1.15 : settings.envPreset === 'room' ? 0.85 : 0.55;
    s.scene.background = settings.envVisible ? s.scene.environment : null;
    s.materials.forEach((m) => { m.needsUpdate = true; });
  }, [settings, loading]);

  /* ---------- visibility ---------- */
  useEffect(() => {
    const s = stateRef.current;
    if (!s) return;
    s.parts.forEach((part, i) => {
      const isHidden = hidden.has(i);
      part.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (!mesh.isMesh || !mesh.userData.partMesh) return;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (isHidden && settings.ghost) {
          mesh.visible = true;
          mat.transparent = true;
          mat.opacity = 0.08;
          mat.depthWrite = false;
        } else {
          mesh.visible = !isHidden;
          mat.transparent = false;
          mat.opacity = 1;
          mat.depthWrite = true;
        }
      });
    });
  }, [hidden, settings.ghost, loading]);

  /* ---------- selection highlight ---------- */
  useEffect(() => {
    const s = stateRef.current;
    if (!s) return;
    s.parts.forEach((part, i) => {
      part.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (!mesh.isMesh || !mesh.userData.partMesh) return;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (i === selected) { mat.emissive.set(0x0757e8); mat.emissiveIntensity = 0.38; }
        else { mat.emissive.set(0x000000); mat.emissiveIntensity = 0; }
      });
    });
  }, [selected, loading]);

  /* ---------- explode ---------- */
  useEffect(() => {
    const s = stateRef.current;
    if (!s) return;
    s.parts.forEach((part, i) => {
      const dir = s.partCenters[i].clone().sub(s.center);
      if (dir.lengthSq() < 1e-8) dir.set(0, 1, 0);
      dir.normalize();
      part.position.copy(s.basePositions[i]).addScaledVector(dir, explode * s.size * 0.38);
    });
  }, [explode, loading]);

  /* ---------- section ---------- */
  useEffect(() => {
    const s = stateRef.current;
    if (!s) return;
    if (tool !== 'section') {
      s.materials.forEach((m) => { m.clippingPlanes = null; m.needsUpdate = true; });
      return;
    }
    const normal = new THREE.Vector3(
      sectionAxis === 'x' ? -1 : 0,
      sectionAxis === 'y' ? -1 : 0,
      sectionAxis === 'z' ? -1 : 0,
    );
    const c = sectionAxis === 'x' ? s.center.x : sectionAxis === 'y' ? s.center.y : s.center.z;
    const plane = new THREE.Plane(normal, c + sectionValue * s.size * 0.55);
    s.materials.forEach((m) => { m.clippingPlanes = [plane]; m.clipShadows = true; m.needsUpdate = true; });
  }, [tool, sectionAxis, sectionValue, loading]);

  /* ---------- ViewCube widget (own mini renderer) ---------- */
  useEffect(() => {
    const hostEl = cubeHostRef.current;
    if (!hostEl) return;
    const mini = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    mini.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mini.setSize(104, 104);
    mini.domElement.className = 'cad-cube-canvas';
    hostEl.appendChild(mini.domElement);
    const cubeScene = new THREE.Scene();
    const faceMats = ['RIGHT', 'LEFT', 'TOP', 'BOTTOM', 'FRONT', 'BACK'].map(
      (label) => new THREE.MeshBasicMaterial({ map: faceTexture(label) }),
    );
    const cubeMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), faceMats);
    cubeScene.add(cubeMesh);
    const cubeCam = new THREE.PerspectiveCamera(32, 1, 0.1, 20);
    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const main = stateRef.current;
      if (!main) return;
      const dir = main.camera.position.clone().sub(main.controls.target).normalize();
      cubeCam.position.copy(dir.multiplyScalar(3.1));
      cubeCam.up.copy(main.camera.up);
      cubeCam.lookAt(0, 0, 0);
      mini.render(cubeScene, cubeCam);
    };
    draw();
    const onClick = (event: MouseEvent) => {
      const rect = mini.domElement.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      const ray = new THREE.Raycaster();
      ray.setFromCamera(new THREE.Vector2(nx, ny), cubeCam);
      const hit = ray.intersectObject(cubeMesh)[0];
      if (hit && hit.face) frameCameraRef.current(hit.face.normal.clone());
    };
    mini.domElement.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(raf);
      mini.domElement.removeEventListener('click', onClick);
      mini.dispose();
      hostEl.removeChild(mini.domElement);
    };
  }, [settings.showCube]);

  /* ---------- markup drawing ---------- */
  useEffect(() => {
    const canvas = markupRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let drawing = false;
    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const down = (e: PointerEvent) => {
      if (toolRef.current !== 'markup') return;
      drawing = true;
      const p = pos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    };
    const move = (e: PointerEvent) => {
      if (!drawing) return;
      const p = pos(e);
      ctx.strokeStyle = '#0757e8';
      ctx.lineWidth = 2;
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    };
    const up = () => { drawing = false; };
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [loading]);

  const clearMarkup = () => {
    const canvas = markupRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const clearMeasure = () => {
    const s = stateRef.current;
    if (s) { s.measureGroup.clear(); s.measurePoints = []; }
    setMeasureText('');
  };

  const togglePart = (index: number) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index); else next.add(index);
      return next;
    });
  };

  const screenshot = () => {
    const s = stateRef.current;
    if (!s) return;
    if (settingsRef.current.antialias) s.composer.render(); else s.renderer.render(s.scene, s.camera);
    const a = document.createElement('a');
    a.href = s.renderer.domElement.toDataURL('image/png');
    a.download = `${model.id}-view.png`;
    a.click();
  };

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}?cad=${model.id}`;
    try { await navigator.clipboard.writeText(url); setShared(true); setTimeout(() => setShared(false), 2000); } catch { /* clipboard unavailable */ }
  };

  const saveComment = (value: string) => {
    setComment(value);
    window.localStorage.setItem(`cad-comment-${model.id}`, value);
  };

  const selectedPart = selected !== null ? parts[selected] : undefined;

  const tools: { id: Tool; label: string; icon: React.ReactNode }[] = [
    { id: 'orbit', label: 'Orbit', icon: <Globe size={20} /> },
    { id: 'pan', label: 'Pan', icon: <Hand size={20} /> },
    { id: 'zoom', label: 'Zoom', icon: <MagnifyingGlassPlus size={20} /> },
    { id: 'first', label: '1st Person', icon: <PersonSimpleWalk size={20} /> },
    { id: 'measure', label: 'Measure', icon: <Ruler size={20} /> },
    { id: 'section', label: 'Section', icon: <Scissors size={20} /> },
    { id: 'explode', label: 'Explode', icon: <ArrowsOut size={20} /> },
    { id: 'markup', label: 'Markup', icon: <PencilLine size={20} /> },
  ];

  const Toggle = ({ label, hint, value, onChange }: { label: string; hint?: string; value: boolean; onChange: (v: boolean) => void }) => (
    <div className="cad-setting-row">
      <div>
        <span>{label}</span>
        {hint ? <small>{hint}</small> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        aria-label={label}
        className={`cad-switch${value ? ' is-on' : ''}`}
        onClick={() => onChange(!value)}
      >
        <i />
      </button>
    </div>
  );

  return (
    <div className={`cad-viewer cad-viewer--${variant}`}>
      <div className="cad-canvas-host" ref={hostRef}>
        <canvas ref={markupRef} className="cad-markup" style={{ pointerEvents: tool === 'markup' ? 'auto' : 'none' }} />
        <div ref={measureLabelRef} className="cad-measure-label" style={{ opacity: 0 }}>{measureText}</div>
        {loading && <div className="cad-viewer-status" role="status">Loading model…</div>}
        {error && <div className="cad-viewer-status cad-viewer-status--error">{error}</div>}
        {settings.showCube && <div ref={cubeHostRef} className="cad-cube" title="ViewCube — click a face to snap the view" />}
        {tool === 'first' && <div className="cad-first-hint">Click the model to grab the view — WASD to move, Q / E for down / up, Esc to release</div>}
      </div>

      <div className="cad-panel-tabs" role="tablist" aria-label="Viewer panels">
        {([
          { id: 'views', label: 'Views', icon: <SquaresFour size={16} /> },
          { id: 'browser', label: 'Model browser', icon: <TreeStructure size={16} /> },
          { id: 'properties', label: 'Properties', icon: <FileText size={16} /> },
          { id: 'settings', label: 'Settings', icon: <GearSix size={16} /> },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={panelTab === tab.id}
            className={panelTab === tab.id ? 'is-active' : ''}
            onClick={() => setPanelTab(panelTab === tab.id ? null : tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {panelTab && (
        <div className="cad-panel">
          <div className="cad-panel-head">
            <strong>
              {panelTab === 'views' ? 'Views' : panelTab === 'browser' ? 'Model' : panelTab === 'properties' ? 'Properties' : 'Settings'}
            </strong>
            <button type="button" aria-label="Close panel" onClick={() => setPanelTab(null)}><X size={16} /></button>
          </div>

          {panelTab === 'views' && (
            <div className="cad-panel-body">
              <p className="cad-panel-group">Scenes</p>
              <button type="button" className="cad-scene-row is-active"><Cube size={16} /> Scene</button>
              <p className="cad-panel-group">Standard views</p>
              <div className="cad-view-grid">
                {STANDARD_VIEWS.map((v) => (
                  <button key={v.label} type="button" onClick={() => frameCamera(new THREE.Vector3(...v.dir))}>{v.label}</button>
                ))}
              </div>
            </div>
          )}

          {panelTab === 'browser' && (
            <div className="cad-panel-body cad-browser">
              <div className="cad-tree-root"><Cube size={15} /> {model.fullTitle}</div>
              {parts.map((part) => (
                <div
                  key={part.index}
                  className={`cad-tree-row${selected === part.index ? ' is-selected' : ''}${hidden.has(part.index) ? ' is-hidden-part' : ''}`}
                >
                  <button type="button" className="cad-tree-name" onClick={() => setSelected(part.index)}>{part.name}</button>
                  <button
                    type="button"
                    aria-label={`${hidden.has(part.index) ? 'Show' : 'Hide'} ${part.name}`}
                    onClick={() => togglePart(part.index)}
                  >
                    {hidden.has(part.index) ? <EyeSlash size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              ))}
              <div className="cad-tree-actions">
                <button type="button" onClick={() => setHidden(new Set())}>Show all</button>
                <button type="button" onClick={() => setHidden(new Set(parts.map((p) => p.index)))}>Hide all</button>
              </div>
            </div>
          )}

          {panelTab === 'properties' && (
            <div className="cad-panel-body">
              <p className="cad-prop-file">{model.sourceFile}</p>
              <table className="cad-prop-table">
                <tbody>
                  <tr><th>Name</th><td>{model.sourceFile}</td></tr>
                  {model.fileProperties.map((row) => (
                    <tr key={row.label}><th>{row.label}</th><td>{row.value}</td></tr>
                  ))}
                  <tr><th>Components</th><td>90 placed · 25 unique</td></tr>
                  <tr><th>Envelope</th><td>220.4 × 240.2 × 78.8 mm</td></tr>
                </tbody>
              </table>
              {selectedPart ? (
                <>
                  <p className="cad-panel-group">Selected part</p>
                  <table className="cad-prop-table">
                    <tbody>
                      <tr><th>Part</th><td>{selectedPart.name}</td></tr>
                      <tr><th>Size</th><td>{selectedPart.sizeMm.map((v) => v.toFixed(1)).join(' × ')} mm</td></tr>
                      <tr><th>Triangles</th><td>{selectedPart.triangles.toLocaleString()}</td></tr>
                    </tbody>
                  </table>
                </>
              ) : (
                <p className="cad-prop-hint">Click a part in the model, or in the Model browser, to inspect it.</p>
              )}
            </div>
          )}

          {panelTab === 'settings' && (
            <div className="cad-panel-body">
              <div className="cad-settings-tabs">
                {(['configuration', 'navigation', 'appearance'] as SettingsTab[]).map((tab) => (
                  <button key={tab} type="button" className={settingsTab === tab ? 'is-active' : ''} onClick={() => setSettingsTab(tab)}>
                    {tab[0].toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {settingsTab === 'configuration' && (
                <>
                  <p className="cad-panel-group">Performance optimization</p>
                  <Toggle label="Disable shadow effect" hint="Faster response while navigating" value={settings.disableShadow} onChange={(v) => setSettings({ disableShadow: v })} />
                  <Toggle label="Progressive display" hint="Full pixel ratio rendering" value={settings.progressive} onChange={(v) => setSettings({ progressive: v })} />
                  <p className="cad-panel-group">Display</p>
                  <Toggle label="Ghost hidden objects" hint="Leave hidden objects slightly visible" value={settings.ghost} onChange={(v) => setSettings({ ghost: v })} />
                  <Toggle label="Display edges" hint="Outline of model surfaces" value={settings.showEdges} onChange={(v) => setSettings({ showEdges: v })} />
                  <Toggle label="Display lines" hint="Wireframe overlay on parts" value={settings.showLines} onChange={(v) => setSettings({ showLines: v })} />
                  <div className="cad-setting-row">
                    <div><span>Display units</span></div>
                    <span className="cad-setting-value">File units (mm)</span>
                  </div>
                </>
              )}

              {settingsTab === 'navigation' && (
                <>
                  <p className="cad-panel-group">ViewCube</p>
                  <Toggle label="Show ViewCube" value={settings.showCube} onChange={(v) => setSettings({ showCube: v })} />
                  <p className="cad-panel-group">Orbit</p>
                  <Toggle label="Orbit past world poles" hint="Rotation continues past the North Pole" value={settings.orbitPoles} onChange={(v) => setSettings({ orbitPoles: v })} />
                  <p className="cad-panel-group">Zoom</p>
                  <Toggle label="Zoom toward pivot" hint="Zoom operations center on the cursor" value={settings.zoomPivot} onChange={(v) => setSettings({ zoomPivot: v })} />
                  <div className="cad-setting-row">
                    <div><span>Scroll speed</span></div>
                    <input type="range" min={0.3} max={2.5} step={0.1} value={settings.scrollSpeed} onChange={(e) => setSettings({ scrollSpeed: Number(e.target.value) })} />
                  </div>
                  <div className="cad-setting-row">
                    <div><span>Drag speed</span></div>
                    <input type="range" min={0.3} max={2.5} step={0.1} value={settings.dragSpeed} onChange={(e) => setSettings({ dragSpeed: Number(e.target.value) })} />
                  </div>
                  <p className="cad-panel-group">Mouse</p>
                  <Toggle label="Left-handed mouse setup" hint="Swaps orbit and pan buttons" value={settings.leftHanded} onChange={(v) => setSettings({ leftHanded: v })} />
                  <Toggle label="Enable gravity" hint="First-person movement stays level" value={settings.gravity} onChange={(v) => setSettings({ gravity: v })} />
                </>
              )}

              {settingsTab === 'appearance' && (
                <>
                  <Toggle label="Anti-aliasing" hint="Smooth out jagged edges using FXAA" value={settings.antialias} onChange={(v) => setSettings({ antialias: v })} />
                  <Toggle label="Ambient shadows" hint="Improve shading of occluded surfaces" value={settings.ambientShadows} onChange={(v) => setSettings({ ambientShadows: v })} />
                  <Toggle label="Ground shadow" hint="Simulated ground surface shadow" value={settings.groundShadow} onChange={(v) => setSettings({ groundShadow: v })} />
                  <div className="cad-setting-row">
                    <div><span>Environment preset</span></div>
                    <select value={settings.envPreset} onChange={(e) => setSettings({ envPreset: e.target.value as ViewerSettings['envPreset'] })}>
                      <option value="sharp">Sharp Highlights</option>
                      <option value="room">Room</option>
                      <option value="studio">Studio Soft</option>
                    </select>
                  </div>
                  <Toggle label="Environment image visible" hint="Shows lighting environment as background" value={settings.envVisible} onChange={(v) => setSettings({ envVisible: v })} />
                </>
              )}

              <button
                type="button"
                className="cad-reset-settings"
                onClick={() => { settingsRef.current = DEFAULT_SETTINGS; setSettingsState(DEFAULT_SETTINGS); }}
              >
                Restore all default settings
              </button>
            </div>
          )}
        </div>
      )}

      <div className="cad-topbar">
        <button type="button" onClick={() => setCommentOpen(!commentOpen)}><ChatCircleDots size={16} /> Comments</button>
        <button type="button" onClick={() => window.print()}><Printer size={16} /> Print</button>
        <button type="button" onClick={screenshot}><Camera size={16} /> Screenshot</button>
        <button type="button" onClick={share}><ShareNetwork size={16} /> {shared ? 'Link copied' : 'Share'}</button>
      </div>
      {commentOpen && (
        <div className="cad-comment">
          <label htmlFor={`cad-comment-${variant}`}>Note on this model (saved in your browser)</label>
          <textarea
            id={`cad-comment-${variant}`}
            value={comment}
            onChange={(e) => saveComment(e.target.value)}
            placeholder="Write a note about this model…"
            rows={3}
          />
        </div>
      )}

      {(tool === 'section' || tool === 'explode' || tool === 'measure' || tool === 'markup') && (
        <div className="cad-tool-options">
          {tool === 'section' && (
            <>
              <span>Section plane</span>
              {(['x', 'y', 'z'] as const).map((axis) => (
                <button key={axis} type="button" className={sectionAxis === axis ? 'is-active' : ''} onClick={() => setSectionAxis(axis)}>
                  {axis.toUpperCase()}
                </button>
              ))}
              <input type="range" min={-1} max={1} step={0.01} value={sectionValue} onChange={(e) => setSectionValue(Number(e.target.value))} aria-label="Section position" />
            </>
          )}
          {tool === 'explode' && (
            <>
              <span>Explode</span>
              <input type="range" min={0} max={1} step={0.01} value={explode} onChange={(e) => setExplode(Number(e.target.value))} aria-label="Explode amount" />
              <span>{Math.round(explode * 100)}%</span>
            </>
          )}
          {tool === 'measure' && (
            <>
              <span>{measureText ? `Distance: ${measureText}` : 'Click two points on the model'}</span>
              <button type="button" onClick={clearMeasure}>Clear</button>
            </>
          )}
          {tool === 'markup' && (
            <>
              <span>Draw on the view</span>
              <button type="button" onClick={clearMarkup}>Clear markup</button>
            </>
          )}
        </div>
      )}

      <div className="cad-toolbar" role="toolbar" aria-label="Viewer tools">
        <button type="button" onClick={() => frameCamera()} aria-label="Home view"><House size={20} /><span>Home</span></button>
        <button
          type="button"
          onClick={() => { const s = stateRef.current; if (s) { s.camera.position.copy(s.homePos); s.controls.target.copy(s.homeTarget); } }}
          aria-label="Fit to view"
        >
          <SquaresFour size={20} /><span>Fit</span>
        </button>
        <span className="cad-toolbar-sep" aria-hidden="true" />
        {tools.map((t) => (
          <button
            key={t.id}
            type="button"
            className={tool === t.id ? 'is-active' : ''}
            aria-pressed={tool === t.id}
            onClick={() => setTool(tool === t.id && t.id !== 'orbit' ? 'orbit' : t.id)}
          >
            {t.icon}<span>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
