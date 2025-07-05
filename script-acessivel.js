document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica do Acordeão ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        // Inicialização dos atributos ARIA para acessibilidade
        if (!header.hasAttribute('aria-expanded')) {
            header.setAttribute('aria-expanded', 'false');
        }
        if (!header.id) {
            // Gera um ID único se não houver um
            header.id = 'accordion-header-' + Math.random().toString(36).substr(2, 9); 
        }
        
        const content = header.nextElementSibling;
        if (content) {
            if (!content.hasAttribute('role')) {
                content.setAttribute('role', 'region'); // Semântica ARIA para região colapsável
            }
            if (!content.hasAttribute('aria-labelledby')) {
                content.setAttribute('aria-labelledby', header.id); // Associa o conteúdo ao cabeçalho
            }
            if (!content.hasAttribute('tabindex')) {
                // Conteúdo não pode receber foco via tabulação por padrão, exceto se aberto e forçar
                content.setAttribute('tabindex', '-1'); 
            }
            // Garante que o conteúdo esteja oculto visualmente no início, se não for CSS
            content.style.maxHeight = '0';
            content.style.padding = '0 20px'; // Mantém o padding inicial
        }

        header.addEventListener('click', function() {
            const currentContent = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Fecha outros acordeões abertos (comportamento de "apenas um aberto por vez")
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.setAttribute('aria-expanded', 'false');
                    // Garante que o padding seja removido ao fechar
                    otherHeader.nextElementSibling.style.maxHeight = '0';
                    otherHeader.nextElementSibling.style.padding = '0 20px'; 
                }
            });

            // Alterna o estado do acordeão atual
            if (isActive) {
                // Fecha o acordeão
                this.classList.remove('active');
                this.setAttribute('aria-expanded', 'false'); 
                currentContent.style.maxHeight = '0';
                currentContent.style.padding = '0 20px'; 
            } else {
                // Abre o acordeão
                this.classList.add('active');
                this.setAttribute('aria-expanded', 'true'); 
                // Define maxHeight para o scrollHeight (altura real do conteúdo)
                currentContent.style.maxHeight = currentContent.scrollHeight + 'px';
                // Define o padding ao abrir
                currentContent.style.padding = '15px 20px 20px 20px'; 
                // Opcional: Foca no conteúdo ao abrir para melhorar a navegação do teclado
                currentContent.focus(); 
            }
        });

        // Adiciona suporte a teclado para o acordeão (Espaço/Enter)
        header.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Impede a ação padrão da tecla (ex: rolar a página)
                this.click(); // Simula um clique
            }
        });
    });


    // --- Lógica do Menu Hambúrguer ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        // Inicialização dos atributos ARIA para o botão do hambúrguer
        hamburger.setAttribute('aria-controls', 'main-navigation'); // Associa o botão ao menu
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
        
        // Atribui um ID ao nav-links para 'aria-controls'
        navLinks.id = 'main-navigation'; 
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open'); // Para animação do CSS

            // Atualiza os atributos ARIA
            const isExpanded = navLinks.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
            hamburger.setAttribute('aria-label', isExpanded ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
        });

        // Opcional: Fechar o menu ao clicar em um link (útil para Single Page Applications ou para UX)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('open');
                    hamburger.setAttribute('aria-expanded', 'false');
                    hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
                }
            });
        });

        // Opcional: Fechar o menu ao clicar fora dele
        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('open');
                    hamburger.setAttribute('aria-expanded', 'false');
                    hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
                }
            }
        });

        // Opcional: Fechar o menu com a tecla ESC
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
                hamburger.focus(); // Retorna o foco para o botão do hambúrguer
            }
        });
    }
});


// --- Funções de Acessibilidade (Globais, sem DOMContentLoaded) ---

function toggleAccessibilityMenu() {
    const menu = document.getElementById("opcoesAcessibilidade");
    // Verifica se o menu existe antes de manipular
    if (!menu) {
        console.warn("Elemento com ID 'opcoesAcessibilidade' não encontrado.");
        return;
    }

    menu.hidden = !menu.hidden;
    
    const button = document.querySelector('.acessibilidade-menu > button');
    if (button) {
        <button style= "margin-left:20px;">button</button>
        button.setAttribute('aria-expanded', !menu.hidden);
        button.setAttribute('aria-label', menu.hidden ? 'Abrir menu de acessibilidade' : 'Fechar menu de acessibilidade');
        // Opcional: Gerenciar foco para o primeiro item do menu ao abrir
        if (!menu.hidden) {
            menu.querySelector('button, a, input, [tabindex]:not([tabindex="-1"])')?.focus();
        }
    }
    <div style="float: left;">
        <button>button</button>
    </div>
}

function increaseText() {
    document.body.classList.toggle("acessibilidade-grande");
}

function toggleHighContrast() {
    document.body.classList.toggle("acessibilidade-contraste");
}

function highlightLinks() {
    document.body.classList.toggle("acessibilidade-links");
}

function resetStyles() {
    document.body.classList.remove("acessibilidade-grande", "acessibilidade-contraste", "acessibilidade-links");
}