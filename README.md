# 💻 PcComponentes Tech Lab 2026 — Reconocimiento de Conectores y Componentes

Juego y banco de pruebas interactivo inspirado en el test de placas base AM4 B550 (`placa_base_2026`), adaptado a los **portátiles más vendidos de PcComponentes** y estructurado en **tecnología web básica pura** (`HTML`, `JS`, `CSS` e `Imágenes`).

---

## 📁 Estructura del Proyecto (Tecnología Web Estándar)

El proyecto está diseñado bajo los estándares web más universales para que funcione al instante en **cualquier navegador**, ya sea abriéndolo directamente desde el disco local (`file:///`) o alojándolo en cualquier servidor web (GitHub Pages, Vercel, Netlify, Apache, etc.):

```text
portatiles_pccomponentes_2026/
├── index.html        # Estructura semántica HTML5 y contenedor responsive
├── style.css         # Hoja de estilos moderna, animaciones HUD y paleta PcComponentes
├── app.js            # Lógica interactiva en Vanilla JS (cero dependencias externas)
├── images/           # Carpeta de recursos gráficos desacoplados
│   ├── lenovo.svg    # Gráfico vectorial detallado del Lenovo IdeaPad Slim 3
│   ├── hp.svg        # Gráfico vectorial detallado del HP Victus 15 Gaming
│   ├── asus.svg      # Gráfico vectorial detallado del ASUS TUF Gaming A15
│   ├── apple.svg     # Gráfico vectorial detallado del Apple MacBook Air M2/M3
│   ├── favicon.svg   # Icono vectorial de pestaña
│   └── logo.svg      # Logotipo de PcComponentes Tech Lab
└── README.md         # Documentación técnica completa
```

---

## 🎯 Portátiles y Conectores Evaluados

| Nº | Portátil | Segmento | Conectores y Elementos para Reconocer |
|---|---|---|---|
| **01** | **Lenovo IdeaPad Slim 3 15IAH8** | *Top 1 Ofimática / Estudiantes* | Webcam con Privacy Shutter, Pantalla FHD, Bloque numérico, Touchpad Mylar, Botón con huella, DC 65W cilíndrico, USB-C (Power Delivery & DP), HDMI 1.4b, Combo Jack 3.5mm, Lector SD, USB 3.2 Gen 1 (azul), USB 2.0 (negro), Rejilla térmica. |
| **02** | **HP Victus 15-fa1000ns** | *Top Seller Gaming Entrada* | Cámara Wide Vision, Panel IPS 144Hz, Teclado gaming con serigrafía 'V', Touchpad Imagepad, Altavoces B&O, Smart Pin 200W, Ethernet RJ-45 abatible (drop-jaw), HDMI 2.1, USB-A Sleep & Charge, USB-C SuperSpeed, SD multiformato, Rejilla posterior dual-flow. |
| **03** | **ASUS TUF Gaming A15** | *Resistencia Militar (MIL-STD-810H)* | Cámara y micrófonos IA, Pantalla 144Hz G-Sync, Teclas WASD translúcidas, Touchpad con logo TUF, Botón trapezoide TUF, DC 240W reforzado, LAN Gigabit Realtek, HDMI 2.1 FRL, USB-C Gen 2 (DP/G-Sync), USB4 40Gbps, USB-A 3.2 izq/der, Hi-Res Jack 3.5mm, Kensington Lock, Rejilla Honeycomb. |
| **04** | **Apple MacBook Air 13.6" (M2 / M3)** | *Top 1 Gama Alta Ultraportátil* | Notch con cámara FaceTime 1080p, Pantalla Liquid Retina (500 nits), Sensor Touch ID, Magic Keyboard tijera, Trackpad Force Touch háptico, Bisagra térmica fanless, Matriz 3 micrófonos de estudio, Altavoces espaciales, Carga MagSafe 3 magnética, 2x Thunderbolt / USB4 (40 Gb/s), Toma 3.5mm alta impedancia. |

---

## 🚀 Cómo Jugar / Reproducir en Cualquier Navegador

1. **Directamente en local (sin servidor ni consola)**:
   - Haz doble clic sobre el archivo `index.html` en tu explorador de Windows o arrástralo directamente a cualquier ventana de **Google Chrome**, **Microsoft Edge**, **Mozilla Firefox** o **Safari**.
   - No requiere instalar Node.js, Python ni configurar permisos especiales.
   - Las imágenes cargan mediante etiquetas estándar `<img>` relativas, garantizando total compatibilidad con el protocolo `file:///` sin bloqueos de origen (CORS).

2. **Interacciones soportadas**:
   - **Arrastrar y Soltar**: Haz clic sostenido sobre cualquier etiqueta de la derecha y arrástrala hacia el conector o componente correspondiente. Al aproximarte se imantará a su posición.
   - **Clic para Colocar (Modo Accesible)**: Haz un clic sobre una etiqueta para seleccionarla (se iluminará) y luego haz clic sobre el círculo reticular deseado para colocarla al instante.
   - **Alternador de Sonido**: Puedes activar o silenciar el sonido sintetizado con el botón `🔊 Sonido / 🔇 Mudo` de la barra superior.
