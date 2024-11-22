// Função para renderizar PDF usando PDF.js
function renderPDF(url) {
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
        const pdfContainer = document.getElementById('pdfContainer');
        pdfContainer.innerHTML = ''; // Limpar o contêiner

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            // Criar um canvas para cada página
            const canvas = document.createElement('canvas');
            canvas.className = 'pdf-page';
            pdfContainer.appendChild(canvas);

            // Renderizar a página
            renderPage(pdf, pageNum, canvas);
        }
    }, function(reason) {
        console.error(reason);
        Swal.fire({
            icon: 'error',
            title: 'Erro ao carregar PDF',
            text: 'Ocorreu um erro ao tentar carregar o PDF.',
        });
    });
}

// Função para renderizar uma página
function renderPage(pdf, pageNum, canvas) {
    pdf.getPage(pageNum).then(function(page) {
        const viewport = page.getViewport({ scale: 1.5 });
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    });
}