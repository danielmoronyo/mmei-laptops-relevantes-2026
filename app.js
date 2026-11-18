(() => {
  'use strict';

  const $ = s => document.querySelector(s);
  const stage = $('#stage'), screen = $('#screen');

  /* ---------- Diccionario de Nombres de Componentes y Conectores ---------- */
  const NAMES = {
    // Pantalla y Chasis
    webcam: 'Webcam con Privacy Shutter',
    pantalla: 'Pantalla 15.6" FHD Antirreflejos',
    teclado: 'Teclado con Bloque Numérico',
    touchpad: 'Touchpad Multitáctil Mylar',
    power: 'Botón Encendido + Lector Huella',
    notch: 'Notch Cámara FaceTime HD 1080p',
    retina: 'Pantalla Liquid Retina (500 nits)',
    touchid: 'Sensor Biométrico Touch ID',
    magic_kb: 'Teclado Magic Keyboard Tijera',
    force_touch: 'Trackpad Force Touch Háptico',
    wasd: 'Teclas WASD Translúcidas Gaming',
    power_tuf: 'Botón Encendido Poligonal TUF',
    altavoces: 'Sistema Audio Bang & Olufsen (B&O)',
    bisagra: 'Bisagra Térmica Unibody Fanless',
    mics: 'Matriz Micrófonos Haz Direccional',
    speakers: 'Altavoces Ocultos Audio Espacial',

    // Conectores y Puertos
    dcin: 'Conector de Corriente DC Jack',
    usbc: 'Puerto USB-C 3.2 (PD y DisplayPort)',
    hdmi: 'Salida de Vídeo HDMI',
    audio: 'Combo Jack de Audio 3.5 mm',
    usba1: 'Puerto USB 3.2 Gen 1 (Tipo A)',
    usba2: 'Puerto USB 2.0 (Tipo A)',
    sdcard: 'Lector de Tarjetas SD Completo',
    rejilla: 'Rejilla Ventilación Inferior',
    usba_charge: 'USB-A SuperSpeed (Sleep & Charge)',
    rj45: 'Puerto Ethernet Gigabit RJ-45',
    rejilla_victus: 'Rejilla Posterior Dual-Flow',
    typec_dp: 'USB-C 3.2 Gen 2 (DP / G-Sync)',
    usb4: 'Puerto USB4 / Type-C (40 Gbps)',
    kensington: 'Ranura Seguridad Kensington Lock',
    magsafe: 'Puerto de Carga MagSafe 3',
    tb1: 'Thunderbolt / USB4 #1 (40 Gb/s)',
    tb2: 'Thunderbolt / USB4 #2 (40 Gb/s)',
    jack_apple: 'Toma Audio 3.5 mm Alta Impedancia'
  };

  /* ---------- Coordenadas y Layout de cada Portátil ---------- */
  // [x, y, w, h, cx, cy] respecto a la imagen de 466 x 388 px
  const LAYOUTS = {
    lenovo: {
      w: 466, h: 388, c: {
        webcam: [223, 6, 20, 14, 233, 13],
        pantalla: [160, 30, 146, 50, 233, 55],
        teclado: [320, 110, 68, 52, 354, 136],
        touchpad: [186, 170, 94, 42, 233, 191],
        power: [378, 108, 18, 12, 387, 114],
        dcin: [30, 252, 30, 30, 45, 267],
        usbc: [100, 258, 36, 18, 118, 267],
        hdmi: [174, 255, 40, 24, 194, 267],
        audio: [254, 254, 26, 26, 267, 267],
        sdcard: [30, 332, 70, 20, 65, 342],
        usba1: [138, 331, 42, 22, 159, 342],
        usba2: [216, 331, 42, 22, 237, 342],
        rejilla: [296, 326, 145, 34, 368, 343]
      }
    },
    hp: {
      w: 466, h: 388, c: {
        webcam: [223, 6, 20, 14, 233, 13],
        pantalla: [160, 30, 146, 50, 233, 55],
        teclado: [140, 116, 100, 46, 190, 139],
        touchpad: [186, 170, 94, 42, 233, 191],
        altavoces: [72, 110, 52, 16, 98, 118],
        dcin: [30, 252, 30, 30, 45, 267],
        usba_charge: [100, 256, 42, 22, 121, 267],
        audio: [180, 254, 26, 26, 193, 267],
        sdcard: [246, 257, 70, 20, 281, 267],
        rj45: [30, 327, 44, 28, 52, 341],
        hdmi: [112, 330, 40, 24, 132, 342],
        usbc: [190, 333, 36, 18, 208, 342],
        rejilla_victus: [264, 324, 176, 36, 352, 342]
      }
    },
    asus: {
      w: 466, h: 388, c: {
        webcam: [223, 6, 20, 14, 233, 13],
        pantalla: [160, 30, 146, 50, 233, 55],
        wasd: [98, 122, 38, 28, 117, 136],
        touchpad: [186, 170, 94, 42, 233, 191],
        power_tuf: [380, 108, 18, 12, 389, 114],
        dcin: [22, 252, 30, 30, 37, 267],
        rj45: [76, 253, 42, 28, 97, 267],
        hdmi: [142, 255, 38, 24, 161, 267],
        typec_dp: [204, 258, 34, 18, 221, 267],
        usb4: [262, 258, 34, 18, 279, 267],
        usba1: [320, 256, 40, 22, 340, 267],
        audio: [384, 254, 26, 26, 397, 267],
        kensington: [30, 333, 26, 18, 43, 342],
        usba2: [96, 331, 40, 22, 116, 342]
      }
    },
    apple: {
      w: 466, h: 388, c: {
        notch: [220, 8, 26, 12, 233, 14],
        retina: [150, 32, 166, 50, 233, 57],
        touchid: [364, 114, 18, 18, 373, 123],
        magic_kb: [130, 120, 140, 42, 200, 141],
        force_touch: [180, 170, 106, 44, 233, 192],
        bisagra: [180, 100, 106, 8, 233, 104],
        mics: [80, 114, 24, 16, 92, 122],
        speakers: [304, 100, 56, 8, 332, 104],
        magsafe: [36, 256, 44, 22, 58, 267],
        tb1: [120, 258, 36, 18, 138, 267],
        tb2: [196, 258, 36, 18, 214, 267],
        jack_apple: [36, 329, 26, 26, 49, 342]
      }
    }
  };

  /* ---------- Catálogo de Portátiles más Vendidos en PcComponentes ---------- */
  const LAPTOPS = [
    {
      id: 'lenovo',
      name: 'Lenovo IdeaPad Slim 3 15IAH8',
      sub: 'Intel Core i5 / Ryzen 5 · 16GB RAM · Chasis Arctic Grey · 15.6" FHD',
      badge: 'Nº1 Ventas Ofimática PcComponentes',
      desc: 'El portátil más vendido de PcComponentes para estudiantes y teletrabajo. Incluye obturador de cámara, teclado numérico, USB-C PD y lector de tarjetas SD.',
      L: LAYOUTS.lenovo,
      keys: ['webcam', 'pantalla', 'teclado', 'touchpad', 'power', 'dcin', 'usbc', 'hdmi', 'audio', 'sdcard', 'usba1', 'usba2', 'rejilla']
    },
    {
      id: 'hp',
      name: 'HP Victus 15-fa1000ns Gaming',
      sub: 'Intel Core i5/i7 · NVIDIA GeForce RTX · 144Hz IPS · Mica Silver',
      badge: 'Top Seller Gaming PcComponentes',
      desc: 'El superventas gaming de entrada por excelencia. Refrigeración posterior dual-flow, altavoces B&O, ethernet abatible y HDMI 2.1.',
      L: LAYOUTS.hp,
      keys: ['webcam', 'pantalla', 'teclado', 'touchpad', 'altavoces', 'dcin', 'usba_charge', 'audio', 'sdcard', 'rj45', 'hdmi', 'usbc', 'rejilla_victus']
    },
    {
      id: 'asus',
      name: 'ASUS TUF Gaming A15 FA506 / FA507',
      sub: 'AMD Ryzen 7 · GeForce RTX 4060 · 144Hz G-Sync · MIL-STD-810H',
      badge: 'Resistencia Militar PcComponentes',
      desc: 'Chasis Jaeger Gray antichoques, teclas WASD transparentes, panel lateral con 7 puertos (USB4 a 40Gbps, LAN Gigabit y HDMI 2.1 FRL).',
      L: LAYOUTS.asus,
      keys: ['webcam', 'pantalla', 'wasd', 'touchpad', 'power_tuf', 'dcin', 'rj45', 'hdmi', 'typec_dp', 'usb4', 'usba1', 'audio', 'kensington', 'usba2']
    },
    {
      id: 'apple',
      name: 'Apple MacBook Air 13.6" (Chip M2 / M3)',
      sub: 'Pantalla Liquid Retina · Chasis Unibody Medianoche · Diseño Fanless',
      badge: 'Top Ventas Gama Alta PcComponentes',
      desc: 'Líder en ventas de gama alta. Carga magnética MagSafe 3, dos puertos Thunderbolt / USB4 de 40 Gb/s, notch con cámara 1080p y sensor Touch ID.',
      L: LAYOUTS.apple,
      keys: ['notch', 'retina', 'touchid', 'magic_kb', 'force_touch', 'bisagra', 'mics', 'speakers', 'magsafe', 'tb1', 'tb2', 'jack_apple']
    }
  ];

  /* ---------- Utilidades Generales ---------- */
  const el = (tag, cls, css, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (css) Object.assign(e.style, css);
    if (html != null) e.innerHTML = html;
    return e;
  };
  const px = (e, x, y) => { e.style.left = x + 'px'; e.style.top = y + 'px'; };
  const shuffle = a => {
    const r = [...a];
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  };
  const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  /* ---------- Motor de Audio (Web Audio API) ---------- */
  let ac = null, soundEnabled = true;
  function initAudio() {
    if (!ac) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) ac = new AC();
    }
    if (ac && ac.state === 'suspended') ac.resume();
  }

  function ding() {
    if (!soundEnabled) return;
    initAudio();
    if (!ac) return;
    try {
      const t = ac.currentTime;
      const o1 = ac.createOscillator(), g1 = ac.createGain();
      o1.type = 'triangle';
      o1.frequency.setValueAtTime(880, t); // A5
      o1.frequency.exponentialRampToValueAtTime(1320, t + 0.12); // E6
      g1.gain.setValueAtTime(0.2, t);
      g1.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      o1.connect(g1);
      g1.connect(ac.destination);
      o1.start(t);
      o1.stop(t + 0.35);
    } catch (_) {}
  }

  function flash() {
    const f = $('#flash');
    if (!f) return;
    f.classList.remove('on');
    void f.offsetWidth;
    f.classList.add('on');
    setTimeout(() => f.classList.remove('on'), 300);
  }

  /* ---------- Estado y Pantallas ---------- */
  let player = '', scores = [], cur = 0, state = null, selectedLabel = null;

  const header = (title, right) => `
    <h1>${esc(title)}</h1>
    <div class="head-right">
      <button class="sound-btn" id="snd-toggle" title="Alternar Sonido">${soundEnabled ? '🔊 Sonido' : '🔇 Mudo'}</button>
      <span class="badge-pill">${esc(right)}</span>
    </div>
  `;

  function setupSoundToggle() {
    const btn = $('#snd-toggle');
    if (btn) {
      btn.onclick = () => {
        soundEnabled = !soundEnabled;
        btn.textContent = soundEnabled ? '🔊 Sonido' : '🔇 Mudo';
        if (soundEnabled) ding();
      };
    }
  }

  /* Pantalla Inicial */
  function intro() {
    screen.innerHTML = '';
    screen.append(el('div', 'head', null, header('PcComponentes Tech Lab 2026', 'Test de Hardware')));
    setupSoundToggle();

    const d = el('div', 'intro', null, `
      <div class="intro-card">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
          <img src="images/favicon.svg" width="28" height="28" alt="Logo" style="display:block;">
          <h2><span>PcComponentes</span> · Reconocimiento de Conectores</h2>
        </div>
        <p class="intro-desc">Identifica y arrastra cada etiqueta a su posición exacta en los <b>4 portátiles más vendidos en PcComponentes</b>. Reconoce conectores (USB-C Power Delivery, Thunderbolt 4, HDMI 2.1, LAN Gigabit abatible, MagSafe 3) y elementos clave (webcam con obturador físico, Touch ID, teclas WASD y altavoces).</p>
        <div class="boards-grid">
          ${LAPTOPS.map((b, i) => `
            <div class="board-card">
              <span class="board-num">0${i + 1}</span>
              <div class="board-info">
                <strong>${esc(b.name)}</strong>
                <small>${esc(b.badge)}</small>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="player-input-wrap">
          <label for="pname">Nombre del participante / Técnico</label>
          <input id="pname" maxlength="30" autocomplete="off" placeholder="Escribe tu nombre o alias..." value="${esc(player)}">
        </div>
      </div>
    `);
    screen.append(d);

    const go = el('button', 'nbtn', { left: '240px', top: '422px', width: '160px', height: '38px' }, 'Comenzar Test');
    go.type = 'button';
    go.onclick = () => {
      initAudio();
      player = $('#pname').value.trim();
      scores = [];
      cur = 0;
      showLaptop();
    };
    screen.append(go);
    $('#pname').addEventListener('keydown', e => { if (e.key === 'Enter') go.click(); });
  }

  /* Pantalla de Juego por Portátil */
  function showLaptop() {
    const b = LAPTOPS[cur], L = b.L;
    screen.innerHTML = '';
    selectedLabel = null;

    screen.append(el('div', 'head', null, header(b.name, `Portátil ${cur + 1} / ${LAPTOPS.length}`)));
    setupSoundToggle();

    const flashEl = el('div', '', null);
    flashEl.id = 'flash';
    screen.append(flashEl);

    // Contenedor del portátil cargado desde imagen SVG desacoplada
    const ox = 10, oy = 48;
    const bd = el('div', 'board-wrap', { left: ox + 'px', top: oy + 'px', width: L.w + 'px', height: L.h + 'px' });
    const img = el('img', 'board', { width: L.w + 'px', height: L.h + 'px', display: 'block', pointerEvents: 'none' });
    img.src = `images/${b.id}.svg`;
    img.alt = b.name;
    img.draggable = false;
    bd.append(img);
    screen.append(bd);

    // Ficha técnica en el pie
    const sub = el('div', 'sub', null, `<b>${esc(b.name)}</b> · ${esc(b.sub)} · ${esc(b.desc)}`);
    screen.append(sub);

    // Marcadores reticulares sobre los componentes
    const markers = b.keys.map(k => {
      const c = L.c[k];
      const cx = c[4] != null ? c[4] : c[0] + c[2] / 2;
      const cy = c[5] != null ? c[5] : c[1] + c[3] / 2;
      const m = {
        key: k,
        x: ox + cx,
        y: oy + cy,
        by: null,
        el: el('div', 'mk', { left: ox + cx - 11 + 'px', top: oy + cy - 11 + 'px' })
      };
      m.el.title = 'Haz clic o arrastra una etiqueta aquí';
      m.el.onclick = () => {
        if (selectedLabel) {
          assignLabelToMarker(selectedLabel, m);
          selectedLabel.classList.remove('selected');
          selectedLabel = null;
        }
      };
      screen.append(m.el);
      return m;
    });

    // Etiquetas arrastrables en la columna derecha
    const labels = shuffle(b.keys).map((k, i) => {
      const hx = 486, hy = 44 + i * 27;
      const l = el('div', 'label', null, esc(NAMES[k]));
      l.dataset.k = k;
      l.title = NAMES[k];
      px(l, hx, hy);
      l._home = { x: hx, y: hy };
      l._pos = { x: hx, y: hy };
      l._m = null;
      screen.append(l);
      attachEvents(l);
      return l;
    });

    // Botón Siguiente / Ver Resultados
    const last = cur === LAPTOPS.length - 1;
    const nb = el('button', 'nbtn', { left: '486px', top: '438px', width: '144px', height: '34px' }, last ? 'Ver Resultados' : 'Siguiente');
    nb.type = 'button';
    nb.onclick = finishLaptop;
    screen.append(nb);

    state = { b, markers, labels, z: 10, ox, oy };

    // Asignar etiqueta a marcador
    function assignLabelToMarker(l, m) {
      if (l._m) {
        l._m.by = null;
        l._m.el.classList.remove('has-label');
      }
      if (m.by && m.by !== l) {
        // Devolver la etiqueta anterior a su posición inicial
        const old = m.by;
        old._m = null;
        old._pos = { x: old._home.x, y: old._home.y };
        px(old, old._home.x, old._home.y);
        old.classList.remove('placed');
      }

      m.by = l;
      l._m = m;
      m.el.classList.add('has-label');

      const x = Math.max(0, Math.min(640 - 144, m.x - 72));
      const y = m.y - 11;
      l._pos = { x, y };
      px(l, x, y);
      l.classList.add('placed');

      if (m.key === l.dataset.k) {
        ding();
        flash();
      }
    }

    // Interacción Drag & Drop y Click-to-place nativos
    function attachEvents(l) {
      let d = null;

      // Clic para colocar (Modo accesible)
      l.addEventListener('click', e => {
        if (d && d.hasMoved) return;
        if (l._m) {
          // Si ya estaba colocado, retirarlo de vuelta a la lista
          l._m.by = null;
          l._m.el.classList.remove('has-label');
          l._m = null;
          l._pos = { x: l._home.x, y: l._home.y };
          px(l, l._home.x, l._home.y);
          l.classList.remove('placed', 'selected');
          if (selectedLabel === l) selectedLabel = null;
          return;
        }

        if (selectedLabel === l) {
          l.classList.remove('selected');
          selectedLabel = null;
        } else {
          if (selectedLabel) selectedLabel.classList.remove('selected');
          selectedLabel = l;
          l.classList.add('selected');
        }
      });

      // Pointer Events para arrastre táctil y con ratón
      l.addEventListener('pointerdown', e => {
        if (e.button > 0) return;
        initAudio();
        l.setPointerCapture(e.pointerId);
        const k = stage.getBoundingClientRect().width / 640;
        d = {
          k,
          sx: e.clientX,
          sy: e.clientY,
          x: l._pos.x,
          y: l._pos.y,
          hasMoved: false,
          prev: { x: l._pos.x, y: l._pos.y, m: l._m }
        };
        l.classList.add('drag');
        l.style.zIndex = ++state.z > 50 ? (state.z = 11) : state.z;
      });

      l.addEventListener('pointermove', e => {
        if (!d) return;
        const dx = (e.clientX - d.sx) / d.k;
        const dy = (e.clientY - d.sy) / d.k;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) d.hasMoved = true;
        const x = d.x + dx, y = d.y + dy;
        l._pos = { x, y };
        px(l, x, y);
      });

      const end = e => {
        if (!d) return;
        const r = stage.getBoundingClientRect(), k = d.k;
        const mx = (e.clientX - r.left) / k, my = (e.clientY - r.top) / k;
        l.classList.remove('drag');

        let best = null, bd2 = 30 * 30; // Radio de atracción magnética al conector
        for (const m of markers) {
          const dd = (m.x - mx) ** 2 + (m.y - my) ** 2;
          if (dd < bd2 && (!m.by || m.by === l)) {
            bd2 = dd;
            best = m;
          }
        }

        const prev = d.prev;
        const hasMoved = d.hasMoved;
        d = null;

        if (!hasMoved) return; // Se gestiona en el evento 'click'

        if (best) {
          assignLabelToMarker(l, best);
        } else if (prev.m) {
          prev.m.by = l;
          l._m = prev.m;
          l._pos = { x: prev.x, y: prev.y };
          px(l, prev.x, prev.y);
        } else {
          if (l._m) {
            l._m.by = null;
            l._m.el.classList.remove('has-label');
            l._m = null;
          }
          l._pos = { x: l._home.x, y: l._home.y };
          px(l, l._home.x, l._home.y);
          l.classList.remove('placed');
        }
      };

      l.addEventListener('pointerup', end);
      l.addEventListener('pointercancel', end);
    }
  }

  function currentHits() {
    return state.markers.filter(m => m.by && m.by.dataset.k === m.key).length;
  }

  function finishLaptop() {
    const total = state.markers.length;
    const hits = currentHits();
    scores[cur] = Math.round((hits * 100) / total);

    if (cur < LAPTOPS.length - 1) {
      cur++;
      showLaptop();
    } else {
      results();
    }
  }

  /* Pantalla de Resultados */
  function results() {
    screen.innerHTML = '';
    screen.append(el('div', 'head', null, header('Evaluación Final PcComponentes', player || 'Técnico Hardware')));
    setupSoundToggle();

    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / LAPTOPS.length);
    const tier = avg >= 90 ? '🏆 Nivel: Experto Maestro en Hardware · PcComponentes PRO' :
                 avg >= 75 ? '⭐ Nivel: Técnico Especialista en Conectividad y Portátiles' :
                 avg >= 55 ? '🔧 Nivel: Técnico Junior · Conocimientos Aceptables' :
                             '📚 Repaso Recomendado · Consulta las Fichas de PcComponentes';

    const rows = LAPTOPS.map((b, i) => `
      <tr>
        <td>
          <div class="res-board">
            <strong>${esc(b.name)}</strong>
            <small>${esc(b.badge)}</small>
          </div>
        </td>
        <td>
          <div class="bar-wrap"><div class="bar-fill" style="width: ${scores[i]}%"></div></div>
        </td>
        <td class="res-score">${scores[i]}%</td>
      </tr>
    `).join('');

    screen.append(el('div', 'res', null, `
      <div class="res-card">
        <h2>${player ? 'Informe Técnico de ' + esc(player) : 'Informe de Reconocimiento de Hardware'}</h2>
        <div class="res-badge">${tier}</div>
        <table>
          ${rows}
          <tr class="avg">
            <td><strong>Puntuación Global</strong></td>
            <td><div class="bar-wrap"><div class="bar-fill avg-fill" style="width: ${avg}%"></div></div></td>
            <td class="res-score">${avg}%</td>
          </tr>
        </table>
      </div>
    `));

    const again = el('button', 'nbtn', { left: '240px', top: '426px', width: '160px', height: '36px' }, 'Repetir Test');
    again.type = 'button';
    again.onclick = intro;
    screen.append(again);
  }

  /* ---------- Ajuste Responsive al Escenario 640x480 ---------- */
  function fit() {
    const k = Math.min(innerWidth / 640, innerHeight / 480);
    stage.style.transform = `translate(${(innerWidth - 640 * k) / 2}px, ${(innerHeight - 480 * k) / 2}px) scale(${k})`;
  }
  addEventListener('resize', fit);
  fit();

  // Exportar para interactividad
  window.__app = { LAPTOPS, get state() { return state; }, finishLaptop, get scores() { return scores; }, intro };
  intro();
})();
