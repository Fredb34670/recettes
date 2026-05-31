
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Artisan — Culinary Excellence</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600&family=JetBrains+Mono&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'culinary-bg': 'oklch(98.5% 0.008 85)',
                        'culinary-surface': 'oklch(100% 0 0)',
                        'culinary-fg': 'oklch(25% 0.02 60)',
                        'culinary-muted': 'oklch(60% 0.02 60)',
                        'culinary-border': 'oklch(92% 0.01 80)',
                        'culinary-accent': 'oklch(65% 0.15 45)',
                        'culinary-hover': 'oklch(70% 0.20 55)',
                        'culinary-sage': 'oklch(75% 0.10 130)',
                    },
                    fontFamily: {
                        display: ['Playfair Display', 'serif'],
                        body: ['Inter', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                    },
                    borderRadius: {
                        'culinary': '24px',
                    }
                }
            }
        }
    </script>
    <style>
        [x-cloak] { display: none !important; }
        :root {
            --bg: oklch(98.5% 0.008 85);
            --surface: oklch(100% 0 0);
            --fg: oklch(25% 0.02 60);
            --accent: oklch(65% 0.15 45);
        }
        body {
            background-color: var(--bg);
            color: var(--fg);
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }
        .bento-card {
            background: var(--surface);
            border-radius: 24px;
            box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .bento-card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 60px -15px rgba(0,0,0,0.08);
        }
        .sidebar-item:hover {
            background-color: oklch(95% 0.01 80);
        }
        .active-nav {
            background-color: var(--accent);
            color: white;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Step Progress Line */
        .step-line::before {
            content: '';
            position: absolute;
            left: 19px;
            top: 40px;
            bottom: 0;
            width: 2px;
            background: oklch(92% 0.01 80);
        }
        .step-active::before {
            background: var(--accent);
        }
    </style>
</head>
<body x-data="{ 
    view: 'dashboard', 
    servings: 4, 
    originalServings: 4,
    currentStep: 1,
    productionMode: false,
    ingredients: [
        { item: 'Beurre pommade', amount: 125, unit: 'g' },
        { item: 'Sucre glace', amount: 100, unit: 'g' },
        { item: 'Farine T55', amount: 250, unit: 'g' },
        { item: 'Jaune d\'œuf', amount: 2, unit: '' },
        { item: 'Citrons jaunes bio', amount: 4, unit: 'pces' },
        { item: 'Sucre en poudre', amount: 150, unit: 'g' },
        { item: 'Œufs entiers', amount: 3, unit: 'pces' }
    ],
    scaledAmount(amount) {
        return Math.round((amount * this.servings / this.originalServings) * 10) / 10;
    }
}" class="min-h-screen flex flex-col md:flex-row overflow-hidden bg-culinary-bg">

    <!-- Mobile Header -->
    <header class="md:hidden flex justify-between items-center p-4 border-b border-culinary-border bg-culinary-surface z-50">
        <h1 class="font-display text-xl font-bold text-culinary-accent">Artisan</h1>
        <button @click="view = (view === 'dashboard' ? 'recipe' : 'dashboard')" class="p-2 bento-card">
            <svg x-show="view === 'dashboard'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>
            <svg x-show="view !== 'dashboard'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
    </header>

    <!-- Left Sidebar (Desktop) -->
    <aside x-show="!productionMode" class="w-64 h-screen sticky top-0 border-r border-culinary-border flex flex-col p-6 hidden lg:flex bg-culinary-bg z-40">
        <div class="mb-12">
            <h1 class="font-display text-2xl font-bold text-culinary-accent">Artisan</h1>
        </div>
        
        <nav class="flex-1 space-y-2">
            <button @click="view = 'dashboard'" :class="view === 'dashboard' ? 'active-nav' : 'sidebar-item'" class="w-full flex items-center gap-3 p-3 rounded-xl transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                <span class="font-medium">Tableau de bord</span>
            </button>
            <button @click="view = 'recipe'" :class="view === 'recipe' ? 'active-nav' : 'sidebar-item'" class="w-full flex items-center gap-3 p-3 rounded-xl transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
                <span class="font-medium">Recette Active</span>
            </button>
            <button class="w-full flex items-center gap-3 p-3 rounded-xl sidebar-item transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4 v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span class="font-medium">Communauté</span>
            </button>
        </nav>

        <div class="mt-auto p-4 bento-card bg-culinary-accent/5">
            <p class="text-xs font-bold uppercase tracking-wider text-culinary-muted mb-2">Votre progression</p>
            <div class="h-2 w-full bg-culinary-border rounded-full overflow-hidden">
                <div class="h-full bg-culinary-accent" style="width: 65%"></div>
            </div>
            <p class="text-sm font-medium mt-2">65% maîtrisé</p>
        </div>
    </aside>

    <!-- Main Workspace -->
    <main :class="productionMode ? 'w-full h-screen' : 'flex-1'" class="p-4 lg:p-8 overflow-y-auto no-scrollbar transition-all duration-500">
        
        <!-- View: DASHBOARD -->
        <div x-show="view === 'dashboard'" x-transition x-cloak>
            <header class="flex justify-between items-center mb-10">
                <div>
                    <h2 class="font-display text-3xl md:text-4xl mb-1">Bonjour Chef, prêt ?</h2>
                    <p class="text-culinary-muted text-sm md:text-base">L'excellence pâtissière à portée de main.</p>
                </div>
                <div class="hidden sm:flex items-center gap-4">
                    <button class="p-3 bento-card bento-card-hover">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                    </button>
                    <div class="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-culinary-accent p-1">
                        <img src="https://i.pravatar.cc/150?u=chef-gerald" alt="Avatar" class="w-full h-full rounded-full object-cover">
                    </div>
                </div>
            </header>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div class="grid grid-cols-3 md:col-span-3 gap-4 md:gap-6">
                    <div class="bento-card p-4 md:p-6 flex flex-col justify-center items-center text-center">
                        <p class="text-[10px] md:text-xs text-culinary-muted uppercase tracking-tighter mb-1">Recettes</p>
                        <p class="text-2xl md:text-4xl font-display font-bold text-culinary-accent">12</p>
                    </div>
                    <div class="bento-card p-4 md:p-6 flex flex-col justify-center items-center text-center">
                        <p class="text-[10px] md:text-xs text-culinary-muted uppercase tracking-tighter mb-1">Pratique</p>
                        <p class="text-2xl md:text-4xl font-display font-bold text-culinary-accent">45h</p>
                    </div>
                    <div class="bento-card p-4 md:p-6 flex flex-col justify-center items-center text-center">
                        <p class="text-[10px] md:text-xs text-culinary-muted uppercase tracking-tighter mb-1">Défis</p>
                        <p class="text-2xl md:text-4xl font-display font-bold text-culinary-accent">8</p>
                    </div>
                </div>

                <div @click="view = 'recipe'" class="md:col-span-2 h-[300px] md:h-[450px] bento-card overflow-hidden relative group cursor-pointer bento-card-hover">
                    <img src="https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800" alt="Featured" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                    <div class="absolute inset-0 bg-gradient-to-t from-culinary-fg/80 via-transparent to-transparent p-6 md:p-8 flex flex-col justify-end">
                        <span class="inline-block w-fit bg-culinary-accent text-white px-3 py-1 rounded-full text-[10px] font-bold mb-3 uppercase tracking-widest">En cours</span>
                        <h3 class="font-display text-2xl md:text-4xl text-white mb-2">Tartelette Signature Citron</h3>
                        <div class="flex items-center gap-4 text-white/80 text-xs md:text-sm font-medium">
                            <span>Avancé</span>
                            <span>•</span>
                            <span>2h30</span>
                        </div>
                    </div>
                </div>

                <div class="bento-card p-6 md:p-8 flex flex-col">
                    <h4 class="font-display text-xl md:text-2xl mb-6">Ustensiles</h4>
                    <div class="space-y-4 flex-1">
                        <div class="flex items-center gap-4 p-4 rounded-2xl bg-culinary-bg border border-culinary-border">
                            <div class="w-10 h-10 rounded-full bg-culinary-sage/20 flex items-center justify-center text-culinary-sage">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            </div>
                            <div>
                                <p class="text-sm font-bold">Balance</p>
                                <p class="text-xs text-culinary-muted">Précision OK</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 p-4 rounded-2xl bg-culinary-bg border border-culinary-border">
                            <div class="w-10 h-10 rounded-full bg-culinary-accent/20 flex items-center justify-center text-culinary-accent">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h12Z"/><path d="M5 14h14"/></svg>
                            </div>
                            <div>
                                <p class="text-sm font-bold">Sonde</p>
                                <p class="text-xs text-culinary-muted">Batterie 85%</p>
                            </div>
                        </div>
                    </div>
                    <button @click="view = 'recipe'; productionMode = true" class="w-full py-4 mt-6 bg-culinary-accent text-white rounded-2xl font-bold hover:bg-culinary-hover transition-all shadow-lg shadow-culinary-accent/20 active:scale-95">
                        Lancer la Production
                    </button>
                </div>
            </div>
        </div>

        <!-- View: RECIPE DETAIL -->
        <div x-show="view === 'recipe'" x-transition x-cloak class="relative">
            <!-- Header Back -->
            <div x-show="!productionMode" class="mb-8 flex items-center gap-4">
                <button @click="view = 'dashboard'" class="p-3 bento-card bento-card-hover group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <h2 class="font-display text-2xl md:text-3xl">Tartelette Signature Citron</h2>
            </div>

            <div :class="productionMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'" class="grid gap-8">
                <!-- Left: Content / Steps -->
                <div :class="productionMode ? 'max-w-4xl mx-auto w-full' : 'lg:col-span-2'" class="space-y-8">
                    
                    <!-- Production Controls -->
                    <div x-show="productionMode" class="flex justify-between items-center bg-culinary-accent text-white p-6 rounded-culinary shadow-xl mb-12">
                        <button @click="productionMode = false" class="p-2 bg-white/20 rounded-full hover:bg-white/30">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                        <div class="text-center">
                            <p class="text-[10px] uppercase font-bold tracking-widest opacity-80">Étape {{currentStep}} sur 3</p>
                            <h3 class="font-display text-xl md:text-2xl">Mode Production</h3>
                        </div>
                        <div class="flex items-center gap-3">
                            <button class="p-2 bg-white/20 rounded-full hover:bg-white/30">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
                            </button>
                        </div>
                    </div>

                    <!-- Step-by-Step Production Mode View -->
                    <template x-if="productionMode">
                        <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div class="bento-card overflow-hidden">
                                <div class="h-64 md:h-96 relative">
                                    <img :src="currentStep === 1 ? 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800' : (currentStep === 2 ? 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=800' : 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800')" class="w-full h-full object-cover">
                                    <div class="absolute top-6 right-6 flex gap-3">
                                        <div class="bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 font-mono text-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                            <span x-text="currentStep === 1 ? '60:00' : (currentStep === 2 ? '15:00' : '10:00')"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="p-8 md:p-12">
                                    <h4 class="font-display text-3xl md:text-5xl mb-6" x-text="currentStep === 1 ? 'La Pâte Sablée' : (currentStep === 2 ? 'Le Crémeux Citron' : 'Le Montage Final')"></h4>
                                    <p class="text-xl md:text-2xl leading-relaxed text-culinary-muted mb-10" x-text="currentStep === 1 ? 'Dans la cuve du robot, crémez le beurre avec le sucre glace. Ajoutez les jaunes d\'œufs, puis la farine. Mélangez sans trop travailler.' : (currentStep === 2 ? 'Portez à ébullition le jus et les zestes de citron. Versez sur le mélange œufs-sucre et cuisez à 82°C (nappe).' : 'Garnir les fonds de tarte cuits avec le crémeux citron refroidi. Terminez par la meringue italienne pochée.')"></p>
                                    
                                    <div class="flex flex-col sm:flex-row gap-4">
                                        <button @click="currentStep = Math.min(3, currentStep + 1)" class="flex-1 py-6 bg-culinary-accent text-white rounded-2xl font-bold text-xl hover:bg-culinary-hover transition-all active:scale-95 shadow-xl shadow-culinary-accent/20">
                                            <span x-text="currentStep < 3 ? 'Étape Suivante' : 'Terminer la Recette'"></span>
                                        </button>
                                        <button @click="currentStep = Math.max(1, currentStep - 1)" class="px-8 py-6 border-2 border-culinary-border rounded-2xl font-bold text-xl hover:bg-culinary-bg transition-all">Retour</button>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Production Tip -->
                            <div class="p-8 bg-culinary-sage/10 border border-culinary-sage/20 rounded-culinary flex items-start gap-6">
                                <div class="w-12 h-12 rounded-full bg-culinary-sage text-white flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3-4-3-5.5V2"/><path d="M7 2h10"/><path d="M11 2v2.5"/><path d="M15 2v2.5"/><path d="M12 6v10"/><path d="M13 19h-2"/></svg>
                                </div>
                                <div>
                                    <p class="text-xs font-bold uppercase tracking-widest text-culinary-sage mb-2">Conseil de Production</p>
                                    <p class="text-lg italic font-display" x-text="currentStep === 1 ? 'Ne travaillez pas trop la pâte pour garder son croustillant.' : (currentStep === 2 ? 'Utilisez une maryse pour ne pas incorporer trop d\'air.' : 'Le sirop doit être versé en filet régulier sur le bord de la cuve.')"></p>
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Standard Recipe View -->
                    <template x-if="!productionMode">
                        <div class="space-y-8 animate-in fade-in duration-500">
                            <!-- Hero Image -->
                            <div class="h-64 md:h-[400px] bento-card overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover">
                            </div>

                            <!-- Intro -->
                            <div class="bento-card p-8 md:p-10">
                                <div class="flex flex-wrap gap-4 mb-6">
                                    <span class="bg-culinary-accent/10 text-culinary-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">Pâtisserie</span>
                                    <span class="bg-culinary-sage/10 text-culinary-sage px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">Signature</span>
                                    <span class="bg-culinary-border text-culinary-muted px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">Avancé</span>
                                </div>
                                <h3 class="font-display text-3xl md:text-4xl mb-6">L'Art du Citron Meringué</h3>
                                <p class="text-culinary-muted text-lg leading-relaxed mb-8">Une base sablée croquante, un crémeux citron intense et une meringue italienne soyeuse. Cette recette demande de la précision et du temps, mais le résultat est une harmonie parfaite entre acidité et douceur.</p>
                                
                                <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 bg-culinary-bg rounded-2xl border border-culinary-border">
                                    <div class="text-center">
                                        <p class="text-[10px] font-bold uppercase text-culinary-muted mb-1">Préparation</p>
                                        <p class="font-bold">1h</p>
                                    </div>
                                    <div class="text-center">
                                        <p class="text-[10px] font-bold uppercase text-culinary-muted mb-1">Cuisson</p>
                                        <p class="font-bold">30min</p>
                                    </div>
                                    <div class="text-center">
                                        <p class="text-[10px] font-bold uppercase text-culinary-muted mb-1">Repos</p>
                                        <p class="font-bold">1h</p>
                                    </div>
                                    <div class="text-center">
                                        <p class="text-[10px] font-bold uppercase text-culinary-muted mb-1">Calories</p>
                                        <p class="font-bold">320 kcal</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Steps List -->
                            <div class="space-y-6">
                                <h4 class="font-display text-2xl mb-8">Le Cheminement</h4>
                                <div class="relative">
                                    <div class="space-y-12">
                                        <div class="relative flex gap-8 step-line step-active">
                                            <div class="w-10 h-10 rounded-full bg-culinary-accent text-white flex items-center justify-center font-bold relative z-10 shrink-0">1</div>
                                            <div class="bento-card p-8 flex-1 group">
                                                <h5 class="font-display text-2xl mb-4">La Pâte Sablée</h5>
                                                <p class="text-culinary-muted leading-relaxed mb-6">Dans la cuve du robot, crémez le beurre avec le sucre glace. Ajoutez les jaunes d'œufs, puis la farine. Mélangez sans trop travailler.</p>
                                                <div class="flex items-center gap-4">
                                                    <span class="text-xs font-mono bg-culinary-bg px-3 py-1 rounded-full">60 min</span>
                                                    <button class="text-culinary-accent text-sm font-bold flex items-center gap-1 hover:translate-x-1 transition-transform">
                               