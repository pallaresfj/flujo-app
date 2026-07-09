import React, { useState, useRef, useEffect } from 'react';

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const FilePdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const ImageUploader = ({ label, image, onUpload, onRemove, id }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Guardamos la imagen directamente como Base64 (DataURL) para que html2pdf la renderice sin problemas de CORS
        onUpload({
          name: file.name,
          preview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-4">
      <span className="block text-xs font-semibold text-slate-500 mb-2">{label || 'Adjuntar esquema o referencia (Opcional)'}</span>
      {image ? (
        <div className="relative inline-block border border-slate-200 rounded-xl overflow-hidden bg-slate-50 group">
          <img src={image.preview} alt="Preview" className="h-32 sm:h-36 w-auto object-cover" />
          <div className="absolute inset-0 bg-navy/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button onClick={onRemove} className="bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 shadow-lg transform hover:scale-110 transition-all" title="Eliminar imagen">
              <XIcon />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs px-3 py-2 truncate">
            {image.name}
          </div>
        </div>
      ) : (
        <div>
          <input
            type="file"
            id={id}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <label htmlFor={id} className="flex items-center justify-center gap-3 w-full px-5 py-4 bg-slate-50 hover:bg-navy/5 border-2 border-dashed border-slate-300 hover:border-navy/40 rounded-xl text-sm text-slate-500 hover:text-navy cursor-pointer transition-all duration-200">
            <ImageIcon /> Subir Imagen o Boceto
          </label>
        </div>
      )}
    </div>
  );
};

export default function UserFlowForm() {
  const [formData, setFormData] = useState({
    projectName: '',
    clientName: '',
    profiles: [''],
    onboarding: {
      firstView: '',
      image: null,
      loginMethod: '',
      requiredFields: ''
    },
    dashboard: {
      firstScreen: '',
      image: null,
      keyInfo: '',
      actions: [{ name: '', description: '' }, { name: '', description: '' }]
    },
    workflows: [
      {
        goal: '',
        step1_button: '',
        step2_interaction: '',
        image: null,
        step3_confirmButton: '',
        step4_resultMessage: ''
      }
    ],
    exceptions: {
      errors: '',
      notifications: ''
    }
  });

  const [generatedResult, setGeneratedResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const resultRef = useRef(null);
  const pdfTemplateRef = useRef(null);

  const handleProfileChange = (index, value) => {
    const newProfiles = [...formData.profiles];
    newProfiles[index] = value;
    setFormData({ ...formData, profiles: newProfiles });
  };

  const addProfile = () => setFormData({ ...formData, profiles: [...formData.profiles, ''] });

  const removeProfile = (index) => {
    if (formData.profiles.length > 1) {
      const newProfiles = formData.profiles.filter((_, i) => i !== index);
      setFormData({ ...formData, profiles: newProfiles });
    }
  };

  const handleDashboardActionChange = (index, field, value) => {
    const newActions = [...formData.dashboard.actions];
    newActions[index][field] = value;
    setFormData({ ...formData, dashboard: { ...formData.dashboard, actions: newActions } });
  };

  const addDashboardAction = () => {
    setFormData({
      ...formData,
      dashboard: { ...formData.dashboard, actions: [...formData.dashboard.actions, { name: '', description: '' }] }
    });
  };

  const removeDashboardAction = (index) => {
    const newActions = formData.dashboard.actions.filter((_, i) => i !== index);
    setFormData({ ...formData, dashboard: { ...formData.dashboard, actions: newActions } });
  };

  const handleWorkflowChange = (index, field, value) => {
    const newWorkflows = [...formData.workflows];
    newWorkflows[index][field] = value;
    setFormData({ ...formData, workflows: newWorkflows });
  };

  const addWorkflow = () => {
    setFormData({
      ...formData,
      workflows: [...formData.workflows, { goal: '', step1_button: '', step2_interaction: '', image: null, step3_confirmButton: '', step4_resultMessage: '' }]
    });
  };

  const removeWorkflow = (index) => {
    if (formData.workflows.length > 1) {
      const newWorkflows = formData.workflows.filter((_, i) => i !== index);
      setFormData({ ...formData, workflows: newWorkflows });
    }
  };

  const generatePDF = () => {
    const element = pdfTemplateRef.current;

    // Crear la ventana emergente
    const printWindow = window.open('', '_blank', 'width=900,height=800');
    if (!printWindow) {
      alert("Por favor permite las ventanas emergentes (popups) en tu navegador para generar el PDF.");
      return;
    }

    // Inyectar el HTML y los estilos actuales en la nueva ventana
    printWindow.document.write('<!DOCTYPE html><html><head><title>Reporte de Flujo</title>');

    // Copiar todos los estilos de la ventana principal para que el PDF retenga el diseño de Tailwind
    const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
    styles.forEach((style) => {
      printWindow.document.write(style.outerHTML);
    });

    // Forzar modo claro en el popup del PDF (siempre se imprime sobre papel blanco)
    printWindow.document.write('<style>:root { color-scheme: light !important; } body { background: #fff !important; color: #191c1e !important; } h1,h2,h3 { color: inherit; }</style>');

    printWindow.document.write('</head><body class="bg-white">');
    // Envolvemos la plantilla con un contenedor para mantener la estructura visual
    printWindow.document.write('<div class="max-w-4xl mx-auto">');
    printWindow.document.write(element.outerHTML);
    printWindow.document.write('</div></body></html>');
    printWindow.document.close();

    // Esperar un momento para que los estilos e imágenes se apliquen antes de imprimir
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 800);
  };

  const generateReport = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    let report = `🚀 REPORTE DE FLUJO DE TRABAJO - ${formData.projectName || 'Proyecto Sin Nombre'}\n`;
    report += `👤 Cliente: ${formData.clientName || 'No especificado'}\n`;
    report += `--- \n\n`;

    report += `1️⃣ PERFILES DE USUARIO\n`;
    formData.profiles.forEach((p, i) => report += `- Perfil ${i + 1}: ${p || 'Sin definir'}\n`);
    report += `\n`;

    report += `2️⃣ ACCESO A LA APP (ONBOARDING)\n`;
    report += `- Primera vista: ${formData.onboarding.firstView || 'N/A'}\n`;
    if (formData.onboarding.image) report += `  [🖼️ Imagen de referencia adjunta: ${formData.onboarding.image.name}]\n`;
    report += `- Método de ingreso: ${formData.onboarding.loginMethod || 'N/A'}\n`;
    report += `- Campos requeridos: ${formData.onboarding.requiredFields || 'N/A'}\n\n`;

    report += `3️⃣ PANTALLA PRINCIPAL (DASHBOARD)\n`;
    report += `- Descripción visual: ${formData.dashboard.firstScreen || 'N/A'}\n`;
    if (formData.dashboard.image) report += `  [🖼️ Imagen de referencia adjunta: ${formData.dashboard.image.name}]\n`;
    report += `- Información clave visible: ${formData.dashboard.keyInfo || 'N/A'}\n`;
    report += `- Acciones principales:\n`;
    formData.dashboard.actions.forEach((a, i) => {
      if (a.name) report += `  * Botón [${a.name}]: ${a.description}\n`;
    });
    report += `\n`;

    report += `4️⃣ FLUJOS DE TRABAJO PRINCIPALES\n`;
    formData.workflows.forEach((wf, i) => {
      report += `\n🔸 Flujo ${i + 1}: ${wf.goal || 'Sin título'}\n`;
      report += `  - Paso 1 (Inicio): Clic en botón [${wf.step1_button || '...'}]\n`;
      report += `  - Paso 2 (Interacción): En la nueva pantalla, el usuario ${wf.step2_interaction || '...'}\n`;
      if (wf.image) report += `    [🖼️ Esquema adjunto: ${wf.image.name}]\n`;
      report += `  - Paso 3 (Confirmación): Clic en botón de [${wf.step3_confirmButton || '...'}]\n`;
      report += `  - Paso 4 (Resultado): Mensaje de éxito -> "${wf.step4_resultMessage || '...'}"\n`;
    });
    report += `\n`;

    report += `5️⃣ EXCEPCIONES Y NOTIFICACIONES\n`;
    report += `- Manejo de errores: ${formData.exceptions.errors || 'N/A'}\n`;
    report += `- Notificaciones auto: ${formData.exceptions.notifications || 'N/A'}\n`;

    setGeneratedResult(report);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const copyToClipboard = () => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = generatedResult;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
  };

  const handleClearClick = () => setShowClearModal(true);

  const confirmClear = () => {
    setFormData({
      projectName: '',
      clientName: '',
      profiles: [''],
      onboarding: {
        firstView: '',
        image: null,
        loginMethod: '',
        requiredFields: ''
      },
      dashboard: {
        firstScreen: '',
        image: null,
        keyInfo: '',
        actions: [{ name: '', description: '' }, { name: '', description: '' }]
      },
      workflows: [
        {
          goal: '',
          step1_button: '',
          step2_interaction: '',
          image: null,
          step3_confirmButton: '',
          step4_resultMessage: ''
        }
      ],
      exceptions: {
        errors: '',
        notifications: ''
      }
    });
    setGeneratedResult('');
    setShowClearModal(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-800 dark:text-slate-200">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Encabezado Principal */}
        <div className="text-center space-y-4">
          <div className="flex justify-start mb-4">
            {/* Logo de AS&Servicios.com */}
            <img
              src="/logo_blue.png"
              alt="AS&Servicios.com"
              className="h-20 w-auto object-contain"
              onError={(e) => { e.target.style.display = 'none'; }} // Oculta si no está la imagen aún
            />
          </div>
          <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider">
            Herramienta Interactiva de Requisitos
          </span>
          <h1 className="text-3xl font-extrabold text-navy dark:text-white tracking-tight">AS&Servicios.com - FlujoApp</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
            Completa la información a continuación para documentar con precisión las pantallas, flujos y esquemas visuales de tu aplicación. Al finalizar, podrás exportar un PDF con tus bocetos incluidos.
          </p>
        </div>

        {/* Sección: Información General */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_rgba(0,45,91,0.04)] border border-white/40 dark:border-slate-700/40 overflow-hidden">
          <div className="bg-navy/5 dark:bg-slate-700/50 px-6 py-5 border-b border-navy/10 dark:border-slate-600">
            <h2 className="text-xl font-bold text-navy dark:text-sky-200">Información General</h2>
          </div>
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-navy/80 dark:text-slate-300 mb-2">Nombre del Proyecto / App</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white transition-all text-base placeholder:text-slate-400"
                placeholder="Ej: MiDelivery App"
                value={formData.projectName}
                onChange={e => setFormData({ ...formData, projectName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy/80 dark:text-slate-300 mb-2">Tu Nombre o Nombre de tu Empresa</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white transition-all text-base placeholder:text-slate-400"
                placeholder="Ej: Juan Pérez / InnovaTech"
                value={formData.clientName}
                onChange={e => setFormData({ ...formData, clientName: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Sección 1: Perfiles */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_rgba(0,45,91,0.04)] border border-white/40 dark:border-slate-700/40 overflow-hidden">
          <div className="bg-navy/5 dark:bg-slate-700/50 px-6 py-5 border-b border-navy/10 dark:border-slate-600">
            <h2 className="text-xl font-bold text-navy dark:text-sky-200">1. Perfiles de Usuario</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">¿Quiénes usarán la aplicación? (Ej: Cliente final, Administrador, Repartidor)</p>
          </div>
          <div className="p-6 sm:p-8 space-y-4">
            {formData.profiles.map((profile, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-navy/10 dark:bg-sky-900/30 text-navy dark:text-sky-300 text-xs font-bold shrink-0">{index + 1}</span>
                <input
                  type="text"
                  className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white text-base placeholder:text-slate-400 transition-all"
                  placeholder={`Perfil ${index + 1} (ej: Administrador)`}
                  value={profile}
                  onChange={e => handleProfileChange(index, e.target.value)}
                />
                {formData.profiles.length > 1 && (
                  <button onClick={() => removeProfile(index)} className="p-2.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Eliminar">
                    <TrashIcon />
                  </button>
                )}
              </div>
            ))}
            <button onClick={addProfile} className="flex items-center gap-2 text-sm font-semibold text-navy/70 dark:text-slate-400 hover:text-navy dark:hover:text-sky-200 py-2 px-3 rounded-lg hover:bg-navy/5 transition-all">
              <PlusIcon /> Agregar otro perfil
            </button>
          </div>
        </div>

        {/* Sección 2: Onboarding */}
        { }
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_rgba(0,45,91,0.04)] border border-white/40 dark:border-slate-700/40 overflow-hidden">
          <div className="bg-navy/5 dark:bg-slate-700/50 px-6 py-5 border-b border-navy/10 dark:border-slate-600">
            <h2 className="text-xl font-bold text-navy dark:text-sky-200">2. Acceso a la Aplicación (Onboarding)</h2>
          </div>
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-navy/80 dark:text-slate-300 mb-2">¿Qué ve el usuario al abrir la app por primera vez?</label>
              <textarea
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white resize-none h-28 text-base placeholder:text-slate-400 transition-all"
                placeholder="Ej: Un logo animado y luego una pantalla explicando los beneficios del servicio..."
                value={formData.onboarding.firstView}
                onChange={e => setFormData({ ...formData, onboarding: { ...formData.onboarding, firstView: e.target.value } })}
              ></textarea>
              <ImageUploader
                id="onboarding-img"
                label="Adjuntar mockup o boceto de pantalla de bienvenida / login (Opcional)"
                image={formData.onboarding.image}
                onUpload={(img) => setFormData({ ...formData, onboarding: { ...formData.onboarding, image: img } })}
                onRemove={() => setFormData({ ...formData, onboarding: { ...formData.onboarding, image: null } })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-navy/80 dark:text-slate-300 mb-2">¿Cómo inicia sesión?</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white text-base placeholder:text-slate-400 transition-all"
                  placeholder="Ej: Con Google, Apple ID o correo."
                  value={formData.onboarding.loginMethod}
                  onChange={e => setFormData({ ...formData, onboarding: { ...formData.onboarding, loginMethod: e.target.value } })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy/80 dark:text-slate-300 mb-2">Campos obligatorios de registro</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white text-base placeholder:text-slate-400 transition-all"
                  placeholder="Ej: Nombre, Teléfono, Correo."
                  value={formData.onboarding.requiredFields}
                  onChange={e => setFormData({ ...formData, onboarding: { ...formData.onboarding, requiredFields: e.target.value } })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sección 3: Dashboard */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_rgba(0,45,91,0.04)] border border-white/40 dark:border-slate-700/40 overflow-hidden">
          <div className="bg-navy/5 dark:bg-slate-700/50 px-6 py-5 border-b border-navy/10 dark:border-slate-600">
            <h2 className="text-xl font-bold text-navy dark:text-sky-200">3. Pantalla Principal (Home / Dashboard)</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Lo primero que se ve al entrar exitosamente.</p>
          </div>
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-navy/80 dark:text-slate-300 mb-2">Descripción de la primera pantalla tras loguearse</label>
              <textarea
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white resize-none h-24 text-base placeholder:text-slate-400 transition-all"
                placeholder="Ej: Un mapa con la ubicación actual y una barra de búsqueda..."
                value={formData.dashboard.firstScreen}
                onChange={e => setFormData({ ...formData, dashboard: { ...formData.dashboard, firstScreen: e.target.value } })}
              ></textarea>
              <ImageUploader
                id="dashboard-img"
                label="Adjuntar mockup o boceto de pantalla principal (Opcional)"
                image={formData.dashboard.image}
                onUpload={(img) => setFormData({ ...formData, dashboard: { ...formData.dashboard, image: img } })}
                onRemove={() => setFormData({ ...formData, dashboard: { ...formData.dashboard, image: null } })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy/80 dark:text-slate-300 mb-2">¿Qué información clave debe estar siempre visible?</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white text-base placeholder:text-slate-400 transition-all"
                placeholder="Ej: Saldo de la billetera, notificaciones pendientes."
                value={formData.dashboard.keyInfo}
                onChange={e => setFormData({ ...formData, dashboard: { ...formData.dashboard, keyInfo: e.target.value } })}
              />
            </div>

            {/* Acciones del Dashboard */}
            <div className="bg-navy/[0.03] dark:bg-slate-700/30 p-5 sm:p-6 rounded-xl border border-navy/10 dark:border-slate-600">
              <label className="block text-sm font-bold text-navy/80 dark:text-slate-300 mb-4">Botones o Acciones Principales en esta pantalla</label>
              <div className="space-y-4">
                {formData.dashboard.actions.map((action, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      className="sm:w-1/3 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white text-sm placeholder:text-slate-400 transition-all"
                      placeholder="Nombre del Botón (Ej: Comprar)"
                      value={action.name}
                      onChange={e => handleDashboardActionChange(index, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white text-sm placeholder:text-slate-400 transition-all"
                      placeholder="¿Qué hace? (Ej: Abre el catálogo)"
                      value={action.description}
                      onChange={e => handleDashboardActionChange(index, 'description', e.target.value)}
                    />
                    <button onClick={() => removeDashboardAction(index)} className="p-2.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg self-end sm:self-auto transition-all">
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addDashboardAction} className="mt-4 flex items-center gap-2 text-sm font-semibold text-navy/70 dark:text-slate-400 hover:text-navy dark:hover:text-sky-200 py-2 px-3 rounded-lg hover:bg-navy/5 transition-all">
                <PlusIcon /> Agregar botón
              </button>
            </div>
          </div>
        </div>

        {/* Sección 4: Flujos de trabajo */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-navy dark:text-sky-200">4. Flujos de Trabajo Centrales</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1">El paso a paso para cumplir los objetivos clave de la app (Ej: Hacer una reserva, Pagar).</p>
          </div>

          {formData.workflows.map((workflow, index) => (
            <div key={index} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_rgba(0,45,91,0.04)] border border-white/40 dark:border-slate-700/40 overflow-hidden relative">
              <div className="bg-navy/5 dark:bg-slate-700/50 px-6 py-5 border-b border-navy/10 dark:border-slate-600 flex justify-between items-center">
                <h3 className="text-lg font-bold text-navy dark:text-sky-200">Flujo #{index + 1}</h3>
                {formData.workflows.length > 1 && (
                  <button onClick={() => removeWorkflow(index)} className="text-rose-400 hover:text-rose-600 text-sm font-medium flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-rose-50 transition-all">
                    <TrashIcon /> Eliminar
                  </button>
                )}
              </div>
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-navy/80 dark:text-slate-300 mb-2">Objetivo del Flujo</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white text-base placeholder:text-slate-400 transition-all"
                    placeholder="Ej: Agendar una cita médica"
                    value={workflow.goal}
                    onChange={e => handleWorkflowChange(index, 'goal', e.target.value)}
                  />
                </div>

                <div className="pl-5 border-l-2 border-orange/30 space-y-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange/15 text-orange text-xs font-bold">1</span>
                      <label className="text-xs font-bold text-navy/70 dark:text-slate-400 uppercase tracking-wide">Inicio</label>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2 flex-wrap">
                      <span>El usuario hace clic en el botón</span>
                      <input type="text" className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white text-sm w-full sm:w-48 placeholder:text-slate-400 transition-all" placeholder="Nombre del botón" value={workflow.step1_button} onChange={e => handleWorkflowChange(index, 'step1_button', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange/15 text-orange text-xs font-bold">2</span>
                      <label className="text-xs font-bold text-navy/70 dark:text-slate-400 uppercase tracking-wide">Interacción</label>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">El sistema abre la pantalla donde el usuario puede:</p>
                    <textarea
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white resize-none h-20 text-sm placeholder:text-slate-400 transition-all"
                      placeholder="Ej: Ver el calendario, seleccionar una fecha y hora, y escribir sus síntomas."
                      value={workflow.step2_interaction}
                      onChange={e => handleWorkflowChange(index, 'step2_interaction', e.target.value)}
                    ></textarea>
                    <ImageUploader
                      id={`workflow-img-${index}`}
                      label="Adjuntar flujo visual o boceto de pantalla intermedia (Opcional)"
                      image={workflow.image}
                      onUpload={(img) => handleWorkflowChange(index, 'image', img)}
                      onRemove={() => handleWorkflowChange(index, 'image', null)}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange/15 text-orange text-xs font-bold">3</span>
                      <label className="text-xs font-bold text-navy/70 dark:text-slate-400 uppercase tracking-wide">Confirmación</label>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2 flex-wrap">
                      <span>Para finalizar, presiona el botón</span>
                      <input type="text" className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white text-sm w-full sm:w-48 placeholder:text-slate-400 transition-all" placeholder="Ej: Confirmar Cita" value={workflow.step3_confirmButton} onChange={e => handleWorkflowChange(index, 'step3_confirmButton', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange/15 text-orange text-xs font-bold">4</span>
                      <label className="text-xs font-bold text-navy/70 dark:text-slate-400 uppercase tracking-wide">Resultado</label>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">El sistema muestra el siguiente mensaje o acción:</p>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white text-sm placeholder:text-slate-400 transition-all"
                      placeholder='Ej: "¡Su cita ha sido agendada con éxito!" y redirige al inicio.'
                      value={workflow.step4_resultMessage}
                      onChange={e => handleWorkflowChange(index, 'step4_resultMessage', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button onClick={addWorkflow} className="w-full py-5 border-2 border-dashed border-navy/20 dark:border-slate-600 rounded-2xl text-navy/60 dark:text-slate-400 font-semibold hover:border-orange/50 hover:text-orange hover:bg-orange/5 transition-all flex items-center justify-center gap-2">
            <PlusIcon /> Agregar otro Flujo de Trabajo
          </button>
        </div>

        {/* Sección 5: Excepciones */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_rgba(0,45,91,0.04)] border border-white/40 dark:border-slate-700/40 overflow-hidden">
          <div className="bg-navy/5 dark:bg-slate-700/50 px-6 py-5 border-b border-navy/10 dark:border-slate-600">
            <h2 className="text-xl font-bold text-navy dark:text-sky-200">5. Situaciones Excepcionales</h2>
          </div>
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-navy/80 dark:text-slate-300 mb-2">¿Qué pasa si el usuario comete un error? (Manejo de errores)</label>
              <textarea
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white resize-none h-24 text-base placeholder:text-slate-400 transition-all"
                placeholder="Ej: Si no hay internet muestra un dinosaurio, si la tarjeta rebota muestra 'Fondos insuficientes'..."
                value={formData.exceptions.errors}
                onChange={e => setFormData({ ...formData, exceptions: { ...formData.exceptions, errors: e.target.value } })}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy/80 dark:text-slate-300 mb-2">Notificaciones Automáticas (Push / Email)</label>
              <textarea
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-navy/30 dark:focus:ring-sky-500/30 focus:border-navy dark:focus:border-sky-500 outline-none dark:text-white resize-none h-24 text-base placeholder:text-slate-400 transition-all"
                placeholder="Ej: Enviar un email cuando la cita se confirma, y notificación push 1 hora antes."
                value={formData.exceptions.notifications}
                onChange={e => setFormData({ ...formData, exceptions: { ...formData.exceptions, notifications: e.target.value } })}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Botones de Envío y Generación */}
        <div className="pt-6 pb-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <button
            type="button"
            onClick={handleClearClick}
            className="py-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <TrashIcon />
            Limpiar
          </button>

          <button
            type="button"
            onClick={generateReport}
            className="py-4 bg-navy hover:brightness-110 text-white rounded-lg font-bold text-base shadow-[0_10px_20px_rgba(0,45,91,0.2)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Resumen Texto
          </button>

          <button
            type="button"
            onClick={generatePDF}
            className="py-4 bg-orange hover:brightness-110 text-white rounded-lg font-bold text-base shadow-[0_10px_20px_rgba(255,153,0,0.3)] hover:shadow-[0_15px_30px_rgba(255,153,0,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FilePdfIcon />
            Reporte PDF
          </button>
        </div>

        {/* Modal/Sección de Resultados (Texto) */}
        {generatedResult && (
          <div ref={resultRef} className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden mb-12">
            <div className="bg-slate-800 px-6 py-4 flex justify-between items-center border-b border-slate-700">
              <h2 className="text-white font-bold text-lg">Tu Resumen de Requisitos</h2>
              <button
                onClick={copyToClipboard}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${copied ? 'bg-emerald-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
              >
                {copied ? <><CheckIcon /> ¡Copiado!</> : <><CopyIcon /> Copiar Texto</>}
              </button>
            </div>
            <div className="p-6">
              <p className="text-slate-400 text-sm mb-4">Puedes copiar el formato de texto plano si necesitas pegarlo directamente en un correo electrónico, chat o Slack.</p>
              <textarea
                readOnly
                className="w-full h-96 bg-slate-950 text-emerald-400 font-mono text-sm p-4 rounded-xl border border-slate-700 focus:outline-none scrollbar-thin scrollbar-thumb-slate-600"
                value={generatedResult}
              ></textarea>
            </div>
          </div>
        )}

        {/* ----------------- PLANTILLA OCULTA/RENDERIZADA PARA EL PDF ----------------- */}
        { }
        <div style={{ display: 'none' }}>
          <div ref={pdfTemplateRef} id="pdf-report-print" className="p-10 bg-white font-sans text-navy space-y-6 w-[816px]">

            {/* Cabecera del PDF */}
            <div className="border-b-2 border-navy pb-4">
              <img src="/logo_blue.png" alt="AS&Servicios.com" className="h-12 w-auto mb-4" onError={(e) => { e.target.style.display = 'none'; }} />
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold text-navy">Reporte Técnico de Requisitos de Usuario</h1>
                  <p className="text-xs text-slate-500 uppercase tracking-wide mt-1">Documento generado para propuesta de diseño y desarrollo</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-700">{formData.projectName || 'Proyecto Sin Nombre'}</p>
                  <p className="text-xs text-slate-500">Cliente: {formData.clientName || 'No especificado'}</p>
                </div>
              </div>
            </div>

            {/* Perfiles de Usuario */}
            <div className="space-y-2">
              <h2 className="text-md font-bold text-indigo-800 border-b border-slate-200 pb-1">1. Perfiles de Usuario (Roles de Acceso)</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                {formData.profiles.map((p, i) => (
                  <li key={i}><span className="font-semibold">Perfil {i + 1}:</span> {p || 'Sin definir'}</li>
                ))}
              </ul>
            </div>

            {/* Onboarding */}
            <div className="space-y-3">
              <h2 className="text-md font-bold text-indigo-800 border-b border-slate-200 pb-1">2. Acceso a la Aplicación (Onboarding)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
                <div className="space-y-2">
                  <p><span className="font-semibold">Primera Vista:</span> {formData.onboarding.firstView || 'N/A'}</p>
                  <p><span className="font-semibold">Método de ingreso:</span> {formData.onboarding.loginMethod || 'N/A'}</p>
                  <p><span className="font-semibold">Campos obligatorios:</span> {formData.onboarding.requiredFields || 'N/A'}</p>
                </div>
                {formData.onboarding.image && (
                  <div className="border border-slate-200 rounded p-2 bg-slate-50 text-center flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 block mb-1">Boceto de Onboarding</span>
                    <img src={formData.onboarding.image.preview} alt="Onboarding Sketch" className="max-h-40 w-auto rounded object-contain border border-slate-200" />
                  </div>
                )}
              </div>
            </div>

            {/* Dashboard */}
            <div className="space-y-3">
              <h2 className="text-md font-bold text-indigo-800 border-b border-slate-200 pb-1">3. Pantalla Principal (Dashboard)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
                <div className="space-y-2">
                  <p><span className="font-semibold">Descripción Visual:</span> {formData.dashboard.firstScreen || 'N/A'}</p>
                  <p><span className="font-semibold">Información Clave Visible:</span> {formData.dashboard.keyInfo || 'N/A'}</p>

                  <div className="mt-2">
                    <p className="font-semibold mb-1">Acciones y Botones Principales:</p>
                    <table className="w-full text-xs text-left text-slate-600 border border-slate-200">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-2 py-1 border-b border-slate-200 font-bold">Botón</th>
                          <th className="px-2 py-1 border-b border-slate-200 font-bold">Comportamiento / Función</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.dashboard.actions.filter(a => a.name).map((a, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="px-2 py-1 border-b border-slate-100 font-semibold text-slate-800">{a.name}</td>
                            <td className="px-2 py-1 border-b border-slate-100">{a.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {formData.dashboard.image && (
                  <div className="border border-slate-200 rounded p-2 bg-slate-50 text-center flex flex-col items-center">
                    <span className="text-[10px] text-slate-500 block mb-1">Boceto de Dashboard</span>
                    <img src={formData.dashboard.image.preview} alt="Dashboard Sketch" className="max-h-40 w-auto rounded object-contain border border-slate-200" />
                  </div>
                )}
              </div>
            </div>

            {/* Flujos de Trabajo */}
            <div className="space-y-4">
              <h2 className="text-md font-bold text-indigo-800 border-b border-slate-200 pb-1">4. Flujos de Trabajo Centrales</h2>
              {formData.workflows.map((wf, idx) => (
                <div key={idx} className="border border-slate-100 rounded-lg p-3 bg-slate-50/50 space-y-2" style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-sm font-bold text-navy border-b border-slate-200 pb-1">Flujo #{idx + 1}: {wf.goal || 'Sin título'}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                    <div className="space-y-1.5">
                      <p><span className="font-semibold text-emerald-700">Paso 1 (Inicio):</span> Clic en botón <span className="bg-slate-200 px-1 rounded font-semibold text-navy">[{wf.step1_button || '...'}]</span></p>
                      <p><span className="font-semibold text-emerald-700">Paso 2 (Interacción):</span> En la nueva pantalla, el usuario interactúa: <span className="text-slate-800 italic">"{wf.step2_interaction || '...'}"</span></p>
                      <p><span className="font-semibold text-emerald-700">Paso 3 (Confirmación):</span> Presiona el botón <span className="bg-slate-200 px-1 rounded font-semibold text-navy">[{wf.step3_confirmButton || '...'}]</span> para finalizar.</p>
                      <p><span className="font-semibold text-emerald-700">Paso 4 (Resultado):</span> Mensaje de éxito del sistema: <span className="text-slate-800 italic">"{wf.step4_resultMessage || '...'}"</span></p>
                    </div>
                    {wf.image && (
                      <div className="border border-slate-200 rounded p-1.5 bg-white text-center flex flex-col items-center">
                        <span className="text-[9px] text-slate-500 block mb-1">Esquema del Flujo #{idx + 1}</span>
                        <img src={wf.image.preview} alt={`Workflow ${idx + 1} Sketch`} className="max-h-32 w-auto rounded object-contain border border-slate-150" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Excepciones */}
            <div className="space-y-2">
              <h2 className="text-md font-bold text-indigo-800 border-b border-slate-200 pb-1">5. Excepciones y Notificaciones</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                <p><span className="font-semibold">Manejo de Errores:</span> {formData.exceptions.errors || 'N/A'}</p>
                <p><span className="font-semibold">Notificaciones Automáticas:</span> {formData.exceptions.notifications || 'N/A'}</p>
              </div>
            </div>

            {/* Pie de página del PDF */}
            <div className="text-center text-[10px] text-slate-400 border-t border-slate-200 pt-3 mt-4">
              Este reporte es un documento de trabajo preliminar estructurado por el cliente. Las imágenes adjuntas representan intenciones visuales iniciales.
            </div>

          </div>
        </div>

        {/* Modal Personalizado de Confirmación */}
        {showClearModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-rose-100 text-rose-600 rounded-full">
                  <TrashIcon />
                </div>
                <h3 className="text-xl font-bold text-navy dark:text-sky-200">¿Limpiar todo el formulario?</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6 pl-14">
                Estás a punto de borrar permanentemente todos los datos, flujos y bocetos. Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowClearModal(false)}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmClear}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors shadow-sm cursor-pointer"
                >
                  Sí, vaciar datos
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}