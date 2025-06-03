// client/myPixel.js

(function() {
    // A URL do seu servidor de coleta de dados.
    // Como estamos em ambiente local, ele estará na porta 3000.
    const COLLECTOR_URL = 'http://localhost:3000/collect'; 

    // Função para gerar um ID de usuário (simplificado para teste)
    function generateSimpleId() {
        return Math.random().toString(36).substring(2, 15);
    }

    // Tenta obter um ID de usuário persistente no navegador
    let userId = localStorage.getItem('_my_pixel_uid');
    if (!userId) {
        userId = generateSimpleId();
        localStorage.setItem('_my_pixel_uid', userId);
    }

    // A função principal que será usada para "rastrear" eventos
    window.myPixel = window.myPixel || function(eventType, eventProperties = {}) {
        // Dados básicos que seu pixel vai coletar automaticamente
        const basicData = {
            event: eventType, 
            userId: userId,   
            timestamp: new Date().toISOString(), 
            url: window.location.href,           
            referrer: document.referrer,         
            userAgent: navigator.userAgent       
        };

        // Combina os dados básicos com quaisquer propriedades específicas do evento
        const fullData = { ...basicData, ...eventProperties };

        // Converte o objeto de dados para uma string de parâmetros de URL
        const queryParams = new URLSearchParams(fullData).toString();
        const imageUrl = `${COLLECTOR_URL}?${queryParams}`;

        // Cria um elemento de imagem de 1x1 pixel para disparar a requisição
        const img = new Image(1, 1);
        img.src = imageUrl;
        img.style.display = 'none'; 
        
        document.body.appendChild(img);
        img.remove(); 

        console.log(`[myPixel] Evento enviado: ${eventType}`, fullData);
    };

    // Dispara um evento padrão de "pageview" automaticamente quando o script é carregado
    myPixel('pageview');

})();