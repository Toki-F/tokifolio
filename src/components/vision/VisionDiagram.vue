<template>
  <div class="vision-diagram" :class="`vision-diagram--${type}`" role="img" :aria-label="caption">
    <!-- Intro: Star Dream orbiting network -->
    <svg v-if="type === 'intro'" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="introCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#5dade2" />
          <stop offset="100%" stop-color="#2c3e50" />
        </radialGradient>
        <filter id="introGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle class="diagram-bg" cx="200" cy="140" r="90" fill="none" stroke="#3498db" stroke-width="1" opacity="0.2" />
      <circle class="diagram-bg diagram-orbit" cx="200" cy="140" r="120" fill="none" stroke="#3498db" stroke-width="1" opacity="0.15" />
      <g class="diagram-orbit-group">
        <circle class="diagram-node" cx="200" cy="20" r="8" fill="#3498db" />
        <circle class="diagram-node diagram-node-delay-1" cx="320" cy="140" r="7" fill="#2ecc71" />
        <circle class="diagram-node diagram-node-delay-2" cx="200" cy="260" r="7" fill="#9b59b6" />
        <circle class="diagram-node diagram-node-delay-3" cx="80" cy="140" r="7" fill="#e67e22" />
      </g>
      <line class="diagram-link" x1="200" y1="140" x2="200" y2="28" stroke="#3498db" stroke-width="1.5" opacity="0.5" />
      <line class="diagram-link diagram-link-delay-1" x1="200" y1="140" x2="313" y2="140" stroke="#2ecc71" stroke-width="1.5" opacity="0.5" />
      <line class="diagram-link diagram-link-delay-2" x1="200" y1="140" x2="200" y2="253" stroke="#9b59b6" stroke-width="1.5" opacity="0.5" />
      <line class="diagram-link diagram-link-delay-3" x1="200" y1="140" x2="87" y2="140" stroke="#e67e22" stroke-width="1.5" opacity="0.5" />
      <circle class="diagram-core" cx="200" cy="140" r="28" fill="url(#introCore)" filter="url(#introGlow)" />
      <circle class="diagram-pulse" cx="200" cy="140" r="28" fill="none" stroke="#5dade2" stroke-width="2" transform-origin="200px 140px" />
    </svg>

    <!-- Phase 1: Nexus network -->
    <svg v-else-if="type === 'nexus'" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <rect class="diagram-panel" x="20" y="20" width="360" height="240" rx="12" fill="#f0f4f8" stroke="#dce1e4" />
      <circle class="diagram-core" cx="200" cy="140" r="22" fill="#2c3e50" />
      <text x="200" y="145" text-anchor="middle" fill="#fff" font-size="11" font-weight="600">Nexus</text>
      <g v-for="(node, i) in nexusNodes" :key="i">
        <line
          class="diagram-link"
          :class="`diagram-link-delay-${i % 4}`"
          x1="200" y1="140"
          :x2="node.x" :y2="node.y"
          stroke="#3498db" stroke-width="1.5" opacity="0.4"
        />
        <circle
          class="diagram-node"
          :class="`diagram-node-delay-${i % 4}`"
          :cx="node.x" :cy="node.y" r="14"
          :fill="node.color"
        />
        <circle class="diagram-signal" :cx="node.x" :cy="node.y" r="14" fill="none" :stroke="node.color" stroke-width="1.5" />
      </g>
      <circle class="diagram-data-packet" cx="200" cy="140" r="4" fill="#3498db" />
    </svg>

    <!-- Phase 1: SDA three pillars -->
    <svg v-else-if="type === 'sda'" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <g v-for="(pillar, i) in sdaPillars" :key="i">
        <rect
          class="diagram-pillar"
          :class="`diagram-pillar-delay-${i}`"
          :x="pillar.x" y="80" width="90" height="160" rx="8"
          :fill="pillar.color" opacity="0.15"
          :stroke="pillar.color" stroke-width="2"
        />
        <rect
          class="diagram-pillar-fill"
          :class="`diagram-pillar-delay-${i}`"
          :x="pillar.x + 4" :y="pillar.fillY" width="82" :height="pillar.fillH" rx="6"
          :fill="pillar.color" opacity="0.7"
        />
        <text :x="pillar.x + 45" y="60" text-anchor="middle" :fill="pillar.color" font-size="11" font-weight="700">{{ pillar.label }}</text>
        <circle class="diagram-node" :class="`diagram-node-delay-${i}`" :cx="pillar.x + 45" cy="50" r="6" :fill="pillar.color" />
      </g>
    </svg>

    <!-- Phase 2: Skyhook -->
    <svg v-else-if="type === 'skyhook'" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <circle class="diagram-earth" cx="200" cy="230" r="45" fill="#3498db" opacity="0.8" />
      <ellipse cx="200" cy="230" rx="55" ry="12" fill="none" stroke="#3498db" stroke-width="1" opacity="0.3" />
      <g class="diagram-tether-group">
        <line class="diagram-tether" x1="200" y1="185" x2="200" y2="30" stroke="#2c3e50" stroke-width="3" stroke-dasharray="8 4" />
        <rect class="diagram-counterweight" x="188" y="20" width="24" height="16" rx="3" fill="#e67e22" />
        <circle class="diagram-cargo" cx="200" cy="100" r="6" fill="#2ecc71" />
      </g>
      <path class="diagram-orbit-path" d="M 120 230 A 80 80 0 0 1 280 230" fill="none" stroke="#3498db" stroke-width="1" stroke-dasharray="4 4" opacity="0.4" />
      <circle class="diagram-moon" cx="310" cy="120" r="14" fill="#bdc3c7" />
      <text x="200" y="248" text-anchor="middle" fill="#fff" font-size="10">Earth</text>
    </svg>

    <!-- Phase 2: Fusion reactor -->
    <svg v-else-if="type === 'fusion'" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fusionCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" />
          <stop offset="40%" stop-color="#f1c40f" />
          <stop offset="100%" stop-color="#e74c3c" />
        </radialGradient>
      </defs>
      <circle class="diagram-ring diagram-ring-1" cx="200" cy="140" r="100" fill="none" stroke="#3498db" stroke-width="2" opacity="0.3" />
      <circle class="diagram-ring diagram-ring-2" cx="200" cy="140" r="75" fill="none" stroke="#e67e22" stroke-width="2" opacity="0.4" />
      <circle class="diagram-ring diagram-ring-3" cx="200" cy="140" r="50" fill="none" stroke="#f1c40f" stroke-width="2" opacity="0.5" />
      <circle class="diagram-core diagram-fusion-core" cx="200" cy="140" r="25" fill="url(#fusionCore)" />
      <g v-for="n in 8" :key="n">
        <circle
          class="diagram-particle"
          :class="`diagram-particle-${n}`"
          :cx="200 + 60 * Math.cos((n - 1) * Math.PI / 4)"
          :cy="140 + 60 * Math.sin((n - 1) * Math.PI / 4)"
          r="3"
          fill="#f1c40f"
        />
      </g>
      <text x="200" y="250" text-anchor="middle" fill="#7f8c8d" font-size="11">D–He³ Fusion</text>
    </svg>

    <!-- Phase 2: Mass driver -->
    <svg v-else-if="type === 'mass-driver'" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="180" width="320" height="40" rx="6" fill="#ecf0f1" stroke="#bdc3c7" />
      <rect class="diagram-rail" x="50" y="190" width="300" height="8" rx="4" fill="#2c3e50" />
      <g class="diagram-coil-group">
        <rect v-for="i in 10" :key="i" class="diagram-coil" :x="55 + i * 28" y="175" width="8" height="50" rx="2" fill="#3498db" opacity="0.5" />
      </g>
      <rect class="diagram-payload" x="60" y="170" width="20" height="20" rx="4" fill="#2ecc71" />
      <path class="diagram-trajectory" d="M 80 180 Q 200 60 340 80" fill="none" stroke="#2ecc71" stroke-width="2" stroke-dasharray="6 4" opacity="0.6" />
      <circle class="diagram-orbit-target" cx="340" cy="80" r="10" fill="none" stroke="#3498db" stroke-width="2" stroke-dasharray="3 3" />
    </svg>

    <!-- Phase 3: Mars system -->
    <svg v-else-if="type === 'mars'" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <circle class="diagram-earth" cx="80" cy="200" r="30" fill="#3498db" />
      <circle class="diagram-mars" cx="320" cy="100" r="35" fill="#c0392b" />
      <path class="diagram-route" d="M 110 190 Q 200 80 290 110" fill="none" stroke="#3498db" stroke-width="2" stroke-dasharray="8 5" opacity="0.5" />
      <g class="diagram-cargo-group">
        <circle class="diagram-cargo-route" cx="110" cy="190" r="5" fill="#2ecc71" />
      </g>
      <g class="diagram-orbit-group">
        <ellipse cx="200" cy="140" rx="130" ry="60" fill="none" stroke="#bdc3c7" stroke-width="1" stroke-dasharray="4 6" opacity="0.4" />
      </g>
      <rect class="diagram-base" x="305" y="145" width="30" height="20" rx="3" fill="#2c3e50" opacity="0.7" />
      <text x="80" y="248" text-anchor="middle" fill="#7f8c8d" font-size="10">Earth</text>
      <text x="320" y="155" text-anchor="middle" fill="#fff" font-size="10">Mars</text>
    </svg>

    <!-- Phase 4: Galaxy expansion -->
    <svg v-else-if="type === 'galaxy'" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="galCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" />
          <stop offset="100%" stop-color="#3498db" />
        </radialGradient>
      </defs>
      <ellipse class="diagram-spiral diagram-spiral-1" cx="200" cy="140" rx="140" ry="50" fill="none" stroke="#3498db" stroke-width="1.5" opacity="0.3" transform="rotate(-20 200 140)" />
      <ellipse class="diagram-spiral diagram-spiral-2" cx="200" cy="140" rx="110" ry="38" fill="none" stroke="#9b59b6" stroke-width="1.5" opacity="0.35" transform="rotate(15 200 140)" />
      <circle class="diagram-core" cx="200" cy="140" r="16" fill="url(#galCore)" />
      <circle v-for="(star, i) in galaxyStars" :key="i" class="diagram-star" :class="`diagram-star-${i % 5}`" :cx="star.x" :cy="star.y" r="4" :fill="star.color" />
      <circle class="diagram-expand-ring" cx="200" cy="140" r="16" fill="none" stroke="#3498db" stroke-width="1.5" transform-origin="200px 140px" />
    </svg>

    <!-- Phase 5: Black hole computer -->
    <svg v-else-if="type === 'blackhole'" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bhDisk" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#e67e22" stop-opacity="0" />
          <stop offset="60%" stop-color="#e67e22" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#f1c40f" stop-opacity="0.3" />
        </radialGradient>
      </defs>
      <ellipse class="diagram-accretion" cx="200" cy="140" rx="130" ry="35" fill="url(#bhDisk)" opacity="0.7" />
      <circle class="diagram-core diagram-bh-core" cx="200" cy="140" r="35" fill="#0a0a0a" />
      <circle cx="200" cy="140" r="38" fill="none" stroke="#e67e22" stroke-width="1" opacity="0.5" />
      <g v-for="i in 6" :key="i">
        <line
          class="diagram-data-beam"
          :class="`diagram-beam-${i}`"
          :x1="200 + 50 * Math.cos((i - 1) * Math.PI / 3)"
          :y1="140 + 50 * Math.sin((i - 1) * Math.PI / 3)"
          x2="200" y2="140"
          stroke="#3498db" stroke-width="1" opacity="0.5"
        />
      </g>
      <circle class="diagram-photon" cx="200" cy="60" r="3" fill="#f1c40f" />
      <text x="200" y="250" text-anchor="middle" fill="#7f8c8d" font-size="10">BHIE</text>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  }
})

const nexusNodes = [
  { x: 80, y: 60, color: '#3498db' },
  { x: 320, y: 60, color: '#2ecc71' },
  { x: 340, y: 200, color: '#9b59b6' },
  { x: 60, y: 200, color: '#e67e22' },
  { x: 120, y: 240, color: '#1abc9c' },
  { x: 280, y: 240, color: '#e74c3c' }
]

const sdaPillars = [
  { x: 50, label: 'Discovery', color: '#3498db', fillY: 120, fillH: 120 },
  { x: 155, label: 'Domination', color: '#2c3e50', fillY: 100, fillH: 140 },
  { x: 260, label: 'Harmony', color: '#2ecc71', fillY: 140, fillH: 100 }
]

const galaxyStars = [
  { x: 60, y: 100, color: '#3498db' },
  { x: 340, y: 80, color: '#9b59b6' },
  { x: 310, y: 200, color: '#2ecc71' },
  { x: 90, y: 190, color: '#e67e22' },
  { x: 150, y: 50, color: '#3498db' },
  { x: 260, y: 220, color: '#9b59b6' },
  { x: 350, y: 150, color: '#2ecc71' },
  { x: 50, y: 140, color: '#e67e22' }
]
</script>

<style>
.vision-diagram {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

.vision-diagram svg {
  width: 100%;
  height: auto;
  display: block;
}

/* Hidden until parent is revealed */
.vision-diagram .diagram-core,
.vision-diagram .diagram-node,
.vision-diagram .diagram-link,
.vision-diagram .diagram-pillar,
.vision-diagram .diagram-pillar-fill,
.vision-diagram .diagram-panel,
.vision-diagram .diagram-earth,
.vision-diagram .diagram-mars,
.vision-diagram .diagram-ring,
.vision-diagram .diagram-particle,
.vision-diagram .diagram-rail,
.vision-diagram .diagram-coil,
.vision-diagram .diagram-payload,
.vision-diagram .diagram-trajectory,
.vision-diagram .diagram-route,
.vision-diagram .diagram-base,
.vision-diagram .diagram-spiral,
.vision-diagram .diagram-star,
.vision-diagram .diagram-accretion,
.vision-diagram .diagram-data-beam,
.vision-diagram .diagram-tether,
.vision-diagram .diagram-counterweight,
.vision-diagram .diagram-cargo,
.vision-diagram .diagram-moon,
.vision-diagram .diagram-orbit-path,
.vision-diagram .diagram-orbit-target,
.vision-diagram .diagram-signal,
.vision-diagram .diagram-bg,
.vision-diagram .diagram-cargo-group {
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.is-revealed .vision-diagram .diagram-core,
.is-revealed .vision-diagram .diagram-node,
.is-revealed .vision-diagram .diagram-link,
.is-revealed .vision-diagram .diagram-pillar,
.is-revealed .vision-diagram .diagram-pillar-fill,
.is-revealed .vision-diagram .diagram-panel,
.is-revealed .vision-diagram .diagram-earth,
.is-revealed .vision-diagram .diagram-mars,
.is-revealed .vision-diagram .diagram-ring,
.is-revealed .vision-diagram .diagram-particle,
.is-revealed .vision-diagram .diagram-rail,
.is-revealed .vision-diagram .diagram-coil,
.is-revealed .vision-diagram .diagram-payload,
.is-revealed .vision-diagram .diagram-trajectory,
.is-revealed .vision-diagram .diagram-route,
.is-revealed .vision-diagram .diagram-base,
.is-revealed .vision-diagram .diagram-spiral,
.is-revealed .vision-diagram .diagram-star,
.is-revealed .vision-diagram .diagram-accretion,
.is-revealed .vision-diagram .diagram-data-beam,
.is-revealed .vision-diagram .diagram-tether,
.is-revealed .vision-diagram .diagram-counterweight,
.is-revealed .vision-diagram .diagram-cargo,
.is-revealed .vision-diagram .diagram-moon,
.is-revealed .vision-diagram .diagram-orbit-path,
.is-revealed .vision-diagram .diagram-orbit-target,
.is-revealed .vision-diagram .diagram-signal,
.is-revealed .vision-diagram .diagram-bg,
.is-revealed .vision-diagram .diagram-cargo-group {
  opacity: 1;
}

/* Continuous animations after reveal */
.is-revealed .vision-diagram .diagram-orbit-group {
  animation: diagramOrbit 12s linear infinite;
  transform-origin: 200px 140px;
}

.is-revealed .vision-diagram .diagram-pulse {
  animation: diagramPulse 2.5s ease-in-out infinite;
}

.is-revealed .vision-diagram .diagram-tether-group {
  animation: diagramTetherSwing 4s ease-in-out infinite;
  transform-origin: 200px 230px;
}

.is-revealed .vision-diagram .diagram-fusion-core {
  animation: diagramFusionPulse 1.5s ease-in-out infinite;
}

.is-revealed .vision-diagram .diagram-ring-1 { animation: diagramSpin 8s linear infinite; transform-origin: 200px 140px; }
.is-revealed .vision-diagram .diagram-ring-2 { animation: diagramSpin 6s linear infinite reverse; transform-origin: 200px 140px; }
.is-revealed .vision-diagram .diagram-ring-3 { animation: diagramSpin 4s linear infinite; transform-origin: 200px 140px; }

.is-revealed .vision-diagram .diagram-payload {
  animation: diagramLaunch 3s ease-in-out infinite;
}

.is-revealed .vision-diagram .diagram-cargo-route {
  animation: diagramCargoRoute 4s ease-in-out infinite;
}

.is-revealed .vision-diagram .diagram-expand-ring {
  animation: diagramExpand 3s ease-out infinite;
}

.is-revealed .vision-diagram .diagram-accretion {
  animation: diagramAccretionSpin 6s linear infinite;
  transform-origin: 200px 140px;
}

.is-revealed .vision-diagram .diagram-photon {
  animation: diagramPhotonFall 2s ease-in infinite;
}

.is-revealed .vision-diagram .diagram-data-packet {
  animation: diagramPacketOrbit 3s linear infinite;
  transform-origin: 200px 140px;
}

.is-revealed .vision-diagram .diagram-signal {
  animation: diagramSignalPulse 2s ease-in-out infinite;
}

.is-revealed .vision-diagram .diagram-node-delay-1 { transition-delay: 0.15s; }
.is-revealed .vision-diagram .diagram-node-delay-2 { transition-delay: 0.3s; }
.is-revealed .vision-diagram .diagram-node-delay-3 { transition-delay: 0.45s; }
.is-revealed .vision-diagram .diagram-link-delay-1 { transition-delay: 0.2s; }
.is-revealed .vision-diagram .diagram-link-delay-2 { transition-delay: 0.35s; }
.is-revealed .vision-diagram .diagram-link-delay-3 { transition-delay: 0.5s; }
.is-revealed .vision-diagram .diagram-pillar-delay-0 { transition-delay: 0.1s; }
.is-revealed .vision-diagram .diagram-pillar-delay-1 { transition-delay: 0.25s; }
.is-revealed .vision-diagram .diagram-pillar-delay-2 { transition-delay: 0.4s; }

.is-revealed .vision-diagram .diagram-star-0 { animation: diagramTwinkle 2s ease-in-out infinite; }
.is-revealed .vision-diagram .diagram-star-1 { animation: diagramTwinkle 2.5s ease-in-out 0.3s infinite; }
.is-revealed .vision-diagram .diagram-star-2 { animation: diagramTwinkle 2.2s ease-in-out 0.6s infinite; }
.is-revealed .vision-diagram .diagram-star-3 { animation: diagramTwinkle 2.8s ease-in-out 0.2s infinite; }
.is-revealed .vision-diagram .diagram-star-4 { animation: diagramTwinkle 2.3s ease-in-out 0.5s infinite; }

@keyframes diagramOrbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes diagramPulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.4); opacity: 0; }
}

@keyframes diagramTetherSwing {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

@keyframes diagramFusionPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
}

@keyframes diagramSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes diagramLaunch {
  0% { transform: translate(0, 0); opacity: 1; }
  70% { transform: translate(260px, -100px); opacity: 1; }
  100% { transform: translate(260px, -100px); opacity: 0; }
}

@keyframes diagramCargoRoute {
  0% { transform: translate(0, 0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translate(180px, -80px); opacity: 0; }
}

@keyframes diagramExpand {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(8); opacity: 0; }
}

@keyframes diagramAccretionSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes diagramPhotonFall {
  0% { cy: 60; opacity: 1; }
  100% { cy: 140; opacity: 0; }
}

@keyframes diagramPacketOrbit {
  from { transform: rotate(0deg) translateX(80px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
}

@keyframes diagramSignalPulse {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.5); opacity: 0; }
}

@keyframes diagramTwinkle {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.4); }
}

@media (prefers-reduced-motion: reduce) {
  .is-revealed .vision-diagram * {
    animation: none !important;
  }
}
</style>
