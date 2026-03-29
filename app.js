import * as THREE from "./assets/vendor/three/three.module.js";
import { OrbitControls } from "./assets/vendor/three/OrbitControls.js";

const panel = document.getElementById("info-panel");
const panelTitle = document.getElementById("panel-title");
const panelSubtitle = document.getElementById("panel-subtitle");
const panelBody = document.getElementById("panel-body");
const panelClose = document.getElementById("panel-close");
const bootOverlay = document.getElementById("boot-overlay");
const bootStatus = document.getElementById("boot-status");
const bootMeterFill = document.getElementById("boot-meter-fill");
const bootSkip = document.getElementById("boot-skip");
const previewPanel = document.getElementById("preview-panel");
const previewClose = document.getElementById("preview-close");
const previewShow = document.getElementById("preview-show");
const previewTitle = document.getElementById("preview-title");
const previewText = document.getElementById("preview-text");
const previewProgress = document.getElementById("preview-progress");
const prevTopicButton = document.getElementById("prev-topic");
const nextTopicButton = document.getElementById("next-topic");
const modeStandardButton = document.getElementById("mode-standard");
const modeBlueprintButton = document.getElementById("mode-blueprint");
const modeCyberButton = document.getElementById("mode-cyber");
const hudMode = document.getElementById("hud-mode");
const hudTopic = document.getElementById("hud-topic");
const timeEl = document.getElementById("local-time");

const topicOrder = ["profile", "competitions", "research", "leadership", "athletics", "resume"];

const modeButtonByKey = {
  standard: modeStandardButton,
  blueprint: modeBlueprintButton,
  cyber: modeCyberButton
};

const modeConfig = {
  standard: {
    label: "STANDARD",
    bodyClass: "",
    exposure: 1.0,
    ringColor: 0x111111,
    ringOpacity: 0.2,
    dustOpacity: 0.3,
    autoRotateSpeed: 0.36
  },
  blueprint: {
    label: "BLUEPRINT",
    bodyClass: "theme-blueprint",
    exposure: 1.08,
    ringColor: 0x2b42bf,
    ringOpacity: 0.24,
    dustOpacity: 0.2,
    autoRotateSpeed: 0.3
  },
  cyber: {
    label: "CYBER",
    bodyClass: "theme-cyber",
    exposure: 0.96,
    ringColor: 0x0f6f5f,
    ringOpacity: 0.24,
    dustOpacity: 0.34,
    autoRotateSpeed: 0.42
  }
};

let activeMode = "standard";

const topicContent = {
  profile: {
    label: "Academic Profile",
    subtitle: "Lexington High School - Lexington, Massachusetts",
    preview: "I am a sophomore at Lexington High School with a 3.96 GPA and a strong focus on chemistry and biomedical engineering.",
    html: `
      <p>I am a sophomore at Lexington High School in Lexington, Massachusetts. Most of my academic work is centered on chemistry, and I am building toward biomedical engineering.</p>
      <ul>
        <li>I have earned Honor Roll every quarter.</li>
        <li><strong>Cumulative GPA:</strong> 3.96 / 4.00 (unweighted)</li>
        <li>My current AP plan includes Biology, Computer Science A, World History, and Calculus BC.</li>
        <li>I completed advanced JPH chemistry tracks, including Olympiad and organic chemistry coursework.</li>
      </ul>
    `
  },
  competitions: {
    label: "USNCO + Ashdown",
    subtitle: "Chemistry + Science Competition Results",
    preview: "I have focused on chemistry competition for years, with strong recent results in HMCHO and the Ashdown exam.",
    html: `
      <p>I have focused on chemistry competitions for several years, and my recent results reflect that consistency.</p>
      <ul>
        <li><strong>Northeastern ACS Ashdown Exam (USNCO local):</strong> 8th out of 156 test takers, highest-scoring sophomore, Honorable Mention</li>
        <li><strong>USNCO Lexington Pre-Test:</strong> 2nd place, qualified for the March 2026 Ashdown exam</li>
        <li><strong>Harvard MIT Chemistry Olympiad Tournament:</strong> High Honors, top 30 overall</li>
        <li><strong>DOE National Science Bowl:</strong> 5th-place team in New England regionals (9th grade), 2nd-place team in MIT regionals (8th grade)</li>
        <li><strong>Massachusetts Science Olympiad (Division B):</strong> 1st-place state team in 2024, advanced to nationals at Michigan State</li>
      </ul>
      <p><a href="https://www.hmcho.org/past-hmchos" target="_blank" rel="noreferrer">HMCHO results archive</a></p>
    `
  },
  research: {
    label: "Research",
    subtitle: "Computational Oncology Internship",
    preview: "I completed a summer internship in the Franses Lab at UChicago focused on computational oncology image analysis.",
    html: `
      <p>During the summer after 10th grade, I completed a research internship in Dr. Joseph W. Franses's lab at the University of Chicago.</p>
      <ul>
        <li>I analyzed glypican-3 (GPC3) expression in hepatocellular carcinoma tissue samples.</li>
        <li>I used QuPath and related extensions to automate whole-slide image extraction and quantification.</li>
        <li>I built violin-plot visualizations comparing tumor and normal liver samples.</li>
        <li>I presented findings at a lab meeting with an emphasis on protein quantification trends.</li>
      </ul>
    `
  },
  leadership: {
    label: "Leadership + Service",
    subtitle: "School and Community Impact",
    preview: "I lead through teaching, community STEAM work, debate, and long-term team commitment.",
    html: `
      <p>Outside the classroom, I focus on service, mentorship, and communication-intensive work.</p>
      <ul>
        <li><strong>METCO Teaching Assistant:</strong> I mentor incoming freshmen in science, math, and language arts.</li>
        <li><strong>Lexington Youth STEAM Team:</strong> I collaborate with Lexington's Monuments and Memorials Committee on public-facing interactive media.</li>
        <li><strong>MSDL State Championship (2025):</strong> 1st place in Novice Policy Debate</li>
        <li><strong>Music:</strong> 3rd place cellist in Bay State Strings (2025) and Miclot International Music Competition (2025)</li>
      </ul>
    `
  },
  athletics: {
    label: "Athletics",
    subtitle: "Cross Country + Track and Field",
    preview: "I run varsity cross country and track, with steady progression in the 800m, 1000m, mile, and 2-mile.",
    html: `
      <p>I run varsity cross country, indoor track, and outdoor track, and I keep building year over year in middle-distance events.</p>
      <ul>
        <li><strong>2026 Indoor:</strong> mile PB 4:40.19, 2-mile PB 9:57.33, 1000m season best 2:51.48</li>
        <li><strong>2025 Outdoor:</strong> 800m PB 2:16.66, mile season best 4:47.49, 2-mile season best 10:32.57</li>
        <li><strong>2025 Indoor:</strong> 1000m PB 2:51.10, mile season best 4:54.72, 4x400 relay 3:52.34 (2nd place)</li>
        <li><strong>Notable race outcomes:</strong> 4th place at Middlesex League Varsity Championship 2-mile (2026), MIAA Division 1 Indoor qualifier, 6th at Wickham Park Invitational 5K</li>
      </ul>
    `
  },
  resume: {
    label: "Resume",
    subtitle: "Complete Document and Supporting Links",
    preview: "You can open my resume directly here, along with key supporting links.",
    html: `
      <p>My full resume is available directly from the local site asset link below.</p>
      <ul>
        <li><a href="assets/Andrew%20Zhang%20Resume.pdf" target="_blank" rel="noreferrer">Open Resume PDF (local repository asset)</a></li>
        <li><a href="https://drive.google.com/file/d/1FOYeUuRzHAHYVF68dUNEGdGDr6JA3v1y/view" target="_blank" rel="noreferrer">Resume reference link from PDF</a></li>
        <li><a href="https://www.duosmium.org/results/2024-03-09_MA_states_b/" target="_blank" rel="noreferrer">MA Science Olympiad state results</a></li>
        <li><a href="https://www.mitsciencebowl.com/history" target="_blank" rel="noreferrer">MIT Science Bowl history</a></li>
        <li><a href="https://inclusion.engr.uconn.edu/scibowlguest/" target="_blank" rel="noreferrer">UConn Science Bowl regional</a></li>
      </ul>
    `
  }
};

const calloutLayout = {
  profile: {
    desktop: { x: 12.8, y: 27.2 },
    mobile: { x: 23, y: 21 }
  },
  competitions: {
    desktop: { x: 81.5, y: 15.9 },
    mobile: { x: 77, y: 30 }
  },
  research: {
    desktop: { x: 13.5, y: 53.6 },
    mobile: { x: 22, y: 42 }
  },
  leadership: {
    desktop: { x: 82.8, y: 41.2 },
    mobile: { x: 78, y: 50 }
  },
  athletics: {
    desktop: { x: 81.6, y: 64.2 },
    mobile: { x: 77, y: 62 }
  },
  resume: {
    desktop: { x: 18.4, y: 79.2 },
    mobile: { x: 24, y: 72 }
  }
};

const callouts = [...document.querySelectorAll(".callout")];
const calloutByTopic = new Map(callouts.map((callout) => [callout.dataset.topic, callout]));
const svg = document.getElementById("connector-layer");

const connectorMap = new Map();
callouts.forEach((callout) => {
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const square = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  path.setAttribute("class", "connector-line");
  square.setAttribute("class", "connector-anchor");
  square.setAttribute("width", "9");
  square.setAttribute("height", "9");
  group.append(path, square);
  svg.append(group);
  connectorMap.set(callout.dataset.topic, { path, square });
});

let anchorByTopic = {
  profile: 0,
  competitions: 1,
  research: 2,
  leadership: 3,
  athletics: 4,
  resume: 5
};

let calloutNodeCenters = new Map();

const atomPoints = [];
const atomMeshes = [];
const atomsGroup = new THREE.Group();
const bondsGroup = new THREE.Group();

const stage = document.getElementById("molecule-stage");
const canvas = document.getElementById("molecule-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: "high-performance"
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 150);
camera.position.set(0, 0.4, 15);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.rotateSpeed = 0.74;
controls.zoomSpeed = 0.82;
controls.panSpeed = 0.55;
controls.minDistance = 8;
controls.maxDistance = 24;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.36;

let autoRotateResumeTimer;
function pauseAutoRotate() {
  controls.autoRotate = false;
  clearTimeout(autoRotateResumeTimer);
}

function resumeAutoRotateSoon() {
  clearTimeout(autoRotateResumeTimer);
  autoRotateResumeTimer = setTimeout(() => {
    controls.autoRotate = true;
  }, 1400);
}

controls.addEventListener("start", pauseAutoRotate);
controls.addEventListener("end", resumeAutoRotateSoon);

const moleculeGroup = new THREE.Group();
moleculeGroup.add(bondsGroup, atomsGroup);
scene.add(moleculeGroup);

const lights = [
  new THREE.AmbientLight(0xffffff, 0.64),
  new THREE.DirectionalLight(0xffffff, 1.15),
  new THREE.PointLight(0xffffff, 0.6, 100),
  new THREE.PointLight(0xffd8c1, 0.4, 80)
];
lights[1].position.set(8, 12, 10);
lights[2].position.set(-10, 4, 12);
lights[3].position.set(7, -8, -9);
lights.forEach((light) => scene.add(light));

const ringGeometry = new THREE.TorusGeometry(6.4, 0.015, 16, 260);
const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0x111111,
  transparent: true,
  opacity: 0.2
});
const ringA = new THREE.Mesh(ringGeometry, ringMaterial);
const ringB = new THREE.Mesh(ringGeometry, ringMaterial);
ringA.rotation.set(1.2, 0.3, 0.55);
ringB.rotation.set(0.52, -0.38, 1.18);
scene.add(ringA, ringB);

const dustGeometry = new THREE.BufferGeometry();
const dustCount = 260;
const dustPositions = new Float32Array(dustCount * 3);
for (let i = 0; i < dustCount; i += 1) {
  dustPositions[i * 3] = (Math.random() - 0.5) * 34;
  dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 24;
  dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 22;
}
dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
const dust = new THREE.Points(
  dustGeometry,
  new THREE.PointsMaterial({
    size: 0.03,
    color: 0x1d1d1d,
    transparent: true,
    opacity: 0.3
  })
);
scene.add(dust);

function updateModeButtonState(modeKey) {
  Object.entries(modeButtonByKey).forEach(([key, button]) => {
    button.classList.toggle("active", key === modeKey);
  });
}

function applyMode(modeKey) {
  const config = modeConfig[modeKey] ?? modeConfig.standard;
  activeMode = modeKey;

  document.body.classList.remove("theme-blueprint", "theme-cyber");
  if (config.bodyClass) {
    document.body.classList.add(config.bodyClass);
  }

  renderer.toneMappingExposure = config.exposure;
  ringMaterial.color.setHex(config.ringColor);
  ringMaterial.opacity = config.ringOpacity;
  dust.material.opacity = config.dustOpacity;
  controls.autoRotateSpeed = config.autoRotateSpeed;

  atomMeshes.forEach((mesh) => {
    const material = mesh.material;
    material.emissive.setHex(modeKey === "standard" ? 0x000000 : modeKey === "blueprint" ? 0x101e66 : 0x052821);
    material.emissiveIntensity = modeKey === "standard" ? 0 : 0.12;
  });

  hudMode.textContent = config.label;
  updateModeButtonState(modeKey);
}

Object.entries(modeButtonByKey).forEach(([key, button]) => {
  button.addEventListener("click", () => {
    applyMode(key);
  });
});

const focusHalo = new THREE.Mesh(
  new THREE.TorusGeometry(0.38, 0.04, 16, 64),
  new THREE.MeshBasicMaterial({ color: 0xb01818, transparent: true, opacity: 0.88 })
);
focusHalo.visible = false;
moleculeGroup.add(focusHalo);

const bondMaterial = new THREE.MeshStandardMaterial({
  color: 0x242424,
  roughness: 0.42,
  metalness: 0.18
});

const atomColorByElement = {
  C: 0x30343a,
  O: 0xb43636,
  N: 0x3d63c0,
  H: 0xd5d7dc,
  fallback: 0x5d6167
};

const atomRadiusByElement = {
  C: 0.24,
  O: 0.27,
  N: 0.25,
  H: 0.16
};

function createAtomMaterial(element) {
  const color = atomColorByElement[element] ?? atomColorByElement.fallback;
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: element === "H" ? 0.42 : 0.34,
    metalness: 0.12,
    clearcoat: 0.22,
    clearcoatRoughness: 0.5
  });
}

function parseSdf(rawSdf) {
  const lines = rawSdf.split(/\r?\n/);
  const countsLineIndex = lines.findIndex((line) => line.includes("V2000"));
  if (countsLineIndex === -1) {
    throw new Error("Invalid SDF format: counts line missing");
  }

  const counts = lines[countsLineIndex].trim().split(/\s+/);
  const atomCount = Number.parseInt(counts[0], 10);
  const bondCount = Number.parseInt(counts[1], 10);

  const atoms = [];
  const bonds = [];

  for (let i = 0; i < atomCount; i += 1) {
    const parts = lines[countsLineIndex + 1 + i].trim().split(/\s+/);
    const [x, y, z, element] = parts;
    atoms.push({
      x: Number.parseFloat(x),
      y: Number.parseFloat(y),
      z: Number.parseFloat(z),
      element
    });
  }

  for (let i = 0; i < bondCount; i += 1) {
    const parts = lines[countsLineIndex + 1 + atomCount + i].trim().split(/\s+/);
    const [a, b, order] = parts;
    bonds.push({
      a: Number.parseInt(a, 10) - 1,
      b: Number.parseInt(b, 10) - 1,
      order: Number.parseInt(order, 10)
    });
  }

  return { atoms, bonds };
}

function addBond(start, end, order = 1) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const unit = direction.clone().normalize();
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

  function createBondCylinder(offset = new THREE.Vector3()) {
    const bondRadius = order >= 2 ? 0.055 : 0.046;
    const geo = new THREE.CylinderGeometry(bondRadius, bondRadius, length, 12);
    const mesh = new THREE.Mesh(geo, bondMaterial);
    mesh.position.copy(mid).add(offset);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), unit);
    bondsGroup.add(mesh);
  }

  if (order === 1) {
    createBondCylinder();
    return;
  }

  const helperAxis = Math.abs(unit.x) > 0.92 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const side = helperAxis.cross(unit).normalize().multiplyScalar(0.105);

  if (order === 2) {
    createBondCylinder(side);
    createBondCylinder(side.clone().multiplyScalar(-1));
    return;
  }

  createBondCylinder();
  createBondCylinder(side);
  createBondCylinder(side.clone().multiplyScalar(-1));
}

function setAnchorsFromGeometry() {
  if (atomPoints.length < topicOrder.length) {
    return;
  }

  const pickBy = {
    profile: { key: "x", mode: "min" },
    competitions: { key: "y", mode: "max" },
    research: { key: "z", mode: "max" },
    leadership: { key: "x", mode: "max" },
    athletics: { key: "y", mode: "min" },
    resume: { key: "z", mode: "min" }
  };

  const used = new Set();

  Object.entries(pickBy).forEach(([topic, rule]) => {
    let bestIndex = 0;

    for (let i = 1; i < atomPoints.length; i += 1) {
      const bestVal = atomPoints[bestIndex][rule.key];
      const nextVal = atomPoints[i][rule.key];
      if ((rule.mode === "max" && nextVal > bestVal) || (rule.mode === "min" && nextVal < bestVal)) {
        bestIndex = i;
      }
    }

    if (used.has(bestIndex)) {
      for (let i = 0; i < atomPoints.length; i += 1) {
        if (!used.has(i)) {
          bestIndex = i;
          break;
        }
      }
    }

    used.add(bestIndex);
    anchorByTopic[topic] = bestIndex;
  });
}

async function loadMolecule() {
  const response = await fetch("assets/molecules/doxorubicin.sdf");
  if (!response.ok) {
    throw new Error("Could not load molecule file");
  }

  const parsed = parseSdf(await response.text());
  const { atoms, bonds } = parsed;

  const centroid = atoms.reduce(
    (acc, atom) => {
      acc.x += atom.x;
      acc.y += atom.y;
      acc.z += atom.z;
      return acc;
    },
    { x: 0, y: 0, z: 0 }
  );

  centroid.x /= atoms.length;
  centroid.y /= atoms.length;
  centroid.z /= atoms.length;

  const scaledPoints = atoms.map((atom) => {
    const point = new THREE.Vector3(atom.x - centroid.x, atom.y - centroid.y, atom.z - centroid.z);
    point.multiplyScalar(0.88);
    atomPoints.push(point);
    return point;
  });

  atoms.forEach((atom, index) => {
    const radius = atomRadiusByElement[atom.element] ?? 0.22;
    const atomGeo = new THREE.SphereGeometry(radius, 22, 22);
    const atomMaterial = createAtomMaterial(atom.element);
    const mesh = new THREE.Mesh(atomGeo, atomMaterial);
    mesh.position.copy(scaledPoints[index]);
    mesh.userData.atomIndex = index;
    atomMeshes.push(mesh);
    atomsGroup.add(mesh);
  });

  bonds.forEach((bond) => {
    const a = scaledPoints[bond.a];
    const b = scaledPoints[bond.b];
    addBond(a, b, bond.order);
  });

  setAnchorsFromGeometry();
}

function updateTime() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
  timeEl.textContent = `LEX ${formatter.format(now)}`;
}

updateTime();
setInterval(updateTime, 30000);

let activeTopic = "profile";
let hoveredCalloutTopic = null;
let hoveredAtomTopic = null;
let focusTopic = "profile";
const focusTarget = new THREE.Vector3(0, 0, 0);
let currentPreviewTopic = "";
let previewDismissed = false;

function hidePreviewPanel() {
  previewDismissed = true;
  previewPanel.classList.add("hidden");
  previewShow?.classList.add("visible");
}

function showPreviewPanel() {
  previewDismissed = false;
  previewPanel.classList.remove("hidden");
  previewShow?.classList.remove("visible");
}

previewClose?.addEventListener("click", hidePreviewPanel);
previewShow?.addEventListener("click", () => {
  showPreviewPanel();
  triggerPreview(activeTopic, { flash: false, force: true });
});

function updateCalloutState() {
  const hoverTopic = hoveredCalloutTopic ?? hoveredAtomTopic;

  topicOrder.forEach((topic) => {
    const callout = calloutByTopic.get(topic);
    const connector = connectorMap.get(topic);

    if (callout) {
      callout.classList.toggle("active", topic === activeTopic);
    }

    if (connector?.path) {
      connector.path.classList.toggle("active", topic === activeTopic || topic === hoverTopic);
    }
  });
}

function triggerPreview(topic, options = {}) {
  const flash = options.flash !== false;
  const force = options.force === true;

  if (!force && topic === currentPreviewTopic) {
    return;
  }

  const data = topicContent[topic];
  if (!data) {
    return;
  }

  currentPreviewTopic = topic;
  previewTitle.textContent = data.label.toUpperCase();
  previewText.textContent = data.preview;

  const ratio = topicOrder.indexOf(topic) / Math.max(topicOrder.length - 1, 1);
  previewProgress.style.transform = `scaleX(${1 + ratio * 2.2})`;

  if (previewDismissed) {
    return;
  }

  if (flash) {
    previewPanel.classList.remove("flash");
    void previewPanel.offsetWidth;
    previewPanel.classList.add("flash");
  }
}

function openPanel(topic) {
  const data = topicContent[topic];
  if (!data) {
    return;
  }

  panelTitle.textContent = data.label;
  panelSubtitle.textContent = data.subtitle;
  panelBody.innerHTML = data.html;
  panel.classList.add("open");
}

function closePanel() {
  panel.classList.remove("open");
}

panelClose.addEventListener("click", closePanel);

function setFocusTopic(topic) {
  const atomIndex = anchorByTopic[topic];
  if (atomPoints[atomIndex] === undefined) {
    return;
  }

  focusTopic = topic;
  const p = atomPoints[atomIndex];
  focusTarget.set(p.x * 0.18, p.y * 0.18, p.z * 0.18);

  focusHalo.visible = true;
  focusHalo.position.copy(p);

  hudTopic.textContent = topicContent[topic].label.toUpperCase();
}

function activateTopic(topic, options = {}) {
  const shouldOpenPanel = options.openPanel !== false;

  if (!topicContent[topic]) {
    return;
  }

  activeTopic = topic;
  triggerPreview(topic, { flash: true, force: true });
  updateCalloutState();
  setFocusTopic(topic);

  if (shouldOpenPanel) {
    openPanel(topic);
  }
}

callouts.forEach((callout) => {
  const topic = callout.dataset.topic;
  const button = callout.querySelector("button");

  button.addEventListener("mouseenter", () => {
    hoveredCalloutTopic = topic;
    triggerPreview(topic, { flash: true, force: true });
    updateCalloutState();
  });

  button.addEventListener("mouseleave", () => {
    hoveredCalloutTopic = null;
    triggerPreview(activeTopic, { flash: false, force: true });
    updateCalloutState();
  });

  button.addEventListener("click", () => {
    pauseAutoRotate();
    activateTopic(topic, { openPanel: true });
    resumeAutoRotateSoon();
  });
});

function cycleTopic(direction) {
  const idx = topicOrder.indexOf(activeTopic);
  const next = (idx + direction + topicOrder.length) % topicOrder.length;
  activateTopic(topicOrder[next], { openPanel: true });
}

prevTopicButton.addEventListener("click", () => {
  pauseAutoRotate();
  cycleTopic(-1);
  resumeAutoRotateSoon();
});

nextTopicButton.addEventListener("click", () => {
  pauseAutoRotate();
  cycleTopic(1);
  resumeAutoRotateSoon();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePanel();
  }

  if (event.key === "ArrowLeft") {
    pauseAutoRotate();
    cycleTopic(-1);
    resumeAutoRotateSoon();
  }

  if (event.key === "ArrowRight") {
    pauseAutoRotate();
    cycleTopic(1);
    resumeAutoRotateSoon();
  }

  if (event.key === "Enter") {
    openPanel(activeTopic);
  }
});

function placeCallouts() {
  const mobile = window.matchMedia("(max-width: 780px)").matches;
  const rect = stage.getBoundingClientRect();
  const edgeMargin = mobile ? 10 : 14;

  callouts.forEach((callout) => {
    const topic = callout.dataset.topic;
    const pos = mobile ? calloutLayout[topic].mobile : calloutLayout[topic].desktop;

    let pxX = (pos.x / 100) * rect.width;
    let pxY = (pos.y / 100) * rect.height;

    // Set temporary position so dimensions are available for clamping.
    callout.style.left = `${pos.x}%`;
    callout.style.top = `${pos.y}%`;

    const halfW = callout.offsetWidth / 2;
    const halfH = callout.offsetHeight / 2;

    pxX = Math.max(halfW + edgeMargin, Math.min(rect.width - halfW - edgeMargin, pxX));
    pxY = Math.max(halfH + edgeMargin, Math.min(rect.height - halfH - edgeMargin, pxY));

    callout.style.left = `${(pxX / rect.width) * 100}%`;
    callout.style.top = `${(pxY / rect.height) * 100}%`;
  });
}

function cacheCalloutNodeCenters() {
  const stageRect = stage.getBoundingClientRect();
  calloutNodeCenters = new Map();

  callouts.forEach((callout) => {
    const nodeRect = callout.querySelector(".callout-node").getBoundingClientRect();
    calloutNodeCenters.set(callout.dataset.topic, {
      x: nodeRect.left - stageRect.left + nodeRect.width / 2,
      y: nodeRect.top - stageRect.top + nodeRect.height / 2
    });
  });
}

function toScreen(vector3) {
  const projected = vector3.clone().project(camera);
  const rect = stage.getBoundingClientRect();
  return {
    x: ((projected.x + 1) / 2) * rect.width,
    y: ((-projected.y + 1) / 2) * rect.height
  };
}

function updateConnectors() {
  const rect = stage.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);

  topicOrder.forEach((topic) => {
    const connector = connectorMap.get(topic);
    const atomIndex = anchorByTopic[topic];
    const nodeCenter = calloutNodeCenters.get(topic);

    if (!connector || atomPoints[atomIndex] === undefined || !nodeCenter) {
      return;
    }

    const atomWorld = moleculeGroup.localToWorld(atomPoints[atomIndex].clone());
    const origin = toScreen(atomWorld);
    const side = calloutByTopic.get(topic)?.dataset.side === "left" ? -1 : 1;
    const horizontalTravel = Math.max(54, Math.abs(nodeCenter.x - origin.x) * 0.45);
    const cornerX = origin.x + side * horizontalTravel;
    const preNodeX = nodeCenter.x - side * 13;
    const preNodeY = nodeCenter.y;

    connector.path.setAttribute(
      "d",
      `M ${origin.x.toFixed(2)} ${origin.y.toFixed(2)} L ${cornerX.toFixed(2)} ${origin.y.toFixed(2)} L ${preNodeX.toFixed(2)} ${preNodeY.toFixed(2)} L ${nodeCenter.x.toFixed(2)} ${nodeCenter.y.toFixed(2)}`
    );
    connector.square.setAttribute("x", `${(origin.x - 4.5).toFixed(2)}`);
    connector.square.setAttribute("y", `${(origin.y - 4.5).toFixed(2)}`);
  });
}

function resize() {
  const rect = stage.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height, false);
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();

  placeCallouts();
  cacheCalloutNodeCenters();
  updateConnectors();
}

window.addEventListener("resize", () => {
  resize();
});

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(2, 2);
let hoveredAtomIndex = null;
const parallaxTarget = { x: 0, y: 0 };
const parallaxCurrent = { x: 0, y: 0 };

function findNearestTopicForAtom(atomIndex) {
  if (atomPoints[atomIndex] === undefined) {
    return activeTopic;
  }

  let bestTopic = topicOrder[0];
  let bestDistance = Number.POSITIVE_INFINITY;
  const atomPoint = atomPoints[atomIndex];

  topicOrder.forEach((topic) => {
    const anchorIndex = anchorByTopic[topic];
    const anchorPoint = atomPoints[anchorIndex];
    if (!anchorPoint) {
      return;
    }

    const distance = atomPoint.distanceToSquared(anchorPoint);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestTopic = topic;
    }
  });

  return bestTopic;
}

function onPointerMove(event) {
  const rect = canvas.getBoundingClientRect();
  const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const ny = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  pointer.x = nx;
  pointer.y = ny;
  parallaxTarget.x = nx;
  parallaxTarget.y = ny;
}

canvas.addEventListener("pointermove", onPointerMove);
canvas.addEventListener("pointerleave", () => {
  pointer.x = 2;
  pointer.y = 2;
  hoveredAtomIndex = null;
  canvas.style.cursor = "grab";
  parallaxTarget.x = 0;
  parallaxTarget.y = 0;
});
canvas.addEventListener("pointerdown", () => {
  canvas.style.cursor = "grabbing";
});
canvas.addEventListener("pointerup", () => {
  canvas.style.cursor = "grab";
});

canvas.addEventListener("click", () => {
  if (hoveredAtomIndex === null) {
    return;
  }

  const topic = findNearestTopicForAtom(hoveredAtomIndex);
  activateTopic(topic, { openPanel: true });
});

let elapsed = 0;
function animate(timestamp) {
  const t = timestamp * 0.001;
  const dt = t - elapsed;
  elapsed = t;

  controls.target.lerp(focusTarget, 0.05);
  controls.update();

  parallaxCurrent.x += (parallaxTarget.x - parallaxCurrent.x) * 0.06;
  parallaxCurrent.y += (parallaxTarget.y - parallaxCurrent.y) * 0.06;
  moleculeGroup.position.x = parallaxCurrent.x * 0.18;
  moleculeGroup.position.y = parallaxCurrent.y * 0.12;

  raycaster.setFromCamera(pointer, camera);
  const intersections = raycaster.intersectObjects(atomMeshes, false);
  hoveredAtomIndex = intersections.length > 0 ? intersections[0].object.userData.atomIndex : null;
  canvas.style.cursor = hoveredAtomIndex !== null ? "pointer" : "grab";

  if (hoveredAtomIndex !== null) {
    hoveredAtomTopic = findNearestTopicForAtom(hoveredAtomIndex);
  } else {
    hoveredAtomTopic = null;
  }

  if (!hoveredCalloutTopic && hoveredAtomTopic && hoveredAtomTopic !== activeTopic) {
    triggerPreview(hoveredAtomTopic, { flash: false });
  } else if (!hoveredCalloutTopic && !hoveredAtomTopic && currentPreviewTopic !== activeTopic) {
    triggerPreview(activeTopic, { flash: false });
  }

  updateCalloutState();

  const focusAtomIndex = anchorByTopic[focusTopic];
  if (atomPoints[focusAtomIndex] !== undefined) {
    focusHalo.visible = true;
    focusHalo.position.copy(atomPoints[focusAtomIndex]);
    const pulse = 1 + Math.sin(t * 4.8) * 0.08;
    focusHalo.scale.setScalar(pulse);
    focusHalo.rotation.y += dt * 0.9;
  }

  ringA.rotation.z += dt * 0.15;
  ringB.rotation.x -= dt * 0.12;
  ringA.position.x = parallaxCurrent.x * 0.2;
  ringB.position.y = parallaxCurrent.y * 0.2;
  dust.rotation.y += dt * 0.02;
  moleculeGroup.rotation.z = Math.sin(t * 0.25) * 0.03;

  renderer.render(scene, camera);
  updateConnectors();

  requestAnimationFrame(animate);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function setBootState(progress, message) {
  bootMeterFill.style.width = `${progress}%`;
  bootStatus.textContent = message;
}

let bootHidden = false;
function finishBootOverlay() {
  if (bootHidden) {
    return;
  }
  bootHidden = true;
  bootOverlay.classList.add("hidden");
  document.body.classList.remove("is-booting");
}

bootSkip.addEventListener("click", finishBootOverlay);

const bootFailSafeTimer = setTimeout(() => {
  setBootState(100, "Ready (fallback)");
  finishBootOverlay();
}, 7000);

(async function init() {
  try {
    setBootState(12, "Preparing renderer and interface...");
    await sleep(220);

    setBootState(34, "Loading molecular geometry from local dataset...");
    await loadMolecule();

    setBootState(68, "Calibrating connectors and interaction controls...");
    await sleep(180);

    resize();
    applyMode("standard");

    setBootState(90, "Finalizing scene transitions...");
    activateTopic("profile", { openPanel: true });
    triggerPreview("profile", { flash: false, force: true });
    canvas.style.cursor = "grab";

    // Re-cache after browser applies web fonts and final text metrics.
    setTimeout(() => {
      cacheCalloutNodeCenters();
      updateConnectors();
    }, 450);

    setBootState(100, "Ready");
    setTimeout(finishBootOverlay, 260);

    requestAnimationFrame(animate);
  } catch (error) {
    setBootState(100, "Initialization fallback");
    finishBootOverlay();
    panelTitle.textContent = "Visualization Error";
    panelSubtitle.textContent = "Could not initialize molecule model";
    panelBody.innerHTML = `<p>${error instanceof Error ? error.message : "Unknown error"}</p>`;
    panel.classList.add("open");
  } finally {
    clearTimeout(bootFailSafeTimer);
  }
})();
