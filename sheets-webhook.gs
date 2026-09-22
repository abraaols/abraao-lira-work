// ===========================================
// COLE ISSO EM script.google.com (Apps Script)
// vinculado à sua planilha de leads
// ===========================================
// Estrutura esperada da planilha (linha 1 como header):
// timestamp | name | email | phone | service | budget | message | origin
// ===========================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Se a planilha estiver vazia, cria o header
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'timestamp', 'name', 'email', 'phone',
        'service', 'budget', 'message', 'origin'
      ]);
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.service || '',
      data.budget || '',
      data.message || '',
      data.origin || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Endpoint ativo. Use POST.')
    .setMimeType(ContentService.MimeType.TEXT);
}

// PASSO A PASSO:
// 1. Crie uma planilha nova no Google Sheets
// 2. Menu > Extensões > Apps Script
// 3. Apague o código padrão, cole esse aqui
// 4. Salve (ícone de disquete)
// 5. Clique em "Implantar" > "Nova implantação"
// 6. Tipo: "Web app"
// 7. Executar como: "Eu"
// 8. Quem tem acesso: "Qualquer pessoa"
// 9. Clique em "Implantar"
// 10. Copie a URL e cole em SHEETS_WEBHOOK_URL no .env
