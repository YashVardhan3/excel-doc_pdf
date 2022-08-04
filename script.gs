function createBulkPDFS(){
    const docFile = DriveApp.getFileById("196KHQqJZiOBetZ0t3eYJOXe5VxY0loUgwxxkWbyDiys");
    const tempFolder = DriveApp.getFolderById("1_YvkFWj_7Cdqf5Baar2-xhpr2Ppd4FEM");
    const pdfFolder = DriveApp.getFolderById("1laC-oRXRgYCtxWhSTmAoCu0Q2Fbcrhta");
    const currentSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");

    const data = currentSheet.getRange(2, 1,currentSheet.getLastRow()-1,14).getDisplayValues();
    let errors = [];
    data.forEach(row => {
        try{
          createPDF(row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9],row[10],row[11],row[12],docFile,tempFolder,pdfFolder);
        }catch(err) {
          errors.push([""]);
        }
    });
    currentSheet.getRange(2, 13,currentSheet.getLastRow()-1,1).setValues(errors);
}

function createPDF(Invoice,Ravanna,Vehicle,Ton,Date,Client,Address,GSTIN,NetPrice,CGST,SGST,Tax,Total,docFile,tempFolder,pdfFolder,pdfName){
    const tempFile = docFile.makeCopy(tempFolder);
    const tempDocFile = DocumentApp.openById(tempFile.getId());
    const body = tempDocFile.getBody();
    body.replaceText("{Invoice}", Invoice);
    body.replaceText("{Vehicle}", Vehicle);
    body.replaceText("{GSTIN}", GSTIN);
    body.replaceText("{CGST}", CGST);
    body.replaceText("{SGST}", SGST);
    body.replaceText("{Ton}", Ton);
    body.replaceText("{Ravanna}", Ravanna);
    body.replaceText("{Date}", Date);
    body.replaceText("{Client}", Client);
    body.replaceText("{Address}", Address);
    body.replaceText("{NetPrice}", NetPrice);
    body.replaceText("{Tax}", Tax);
    body.replaceText("{Total}", Total);
    tempDocFile.saveAndClose();
    const pdfContentBlob = tempFile.getAs(MimeType.PDF);
    pdfFolder.createFile(pdfContentBlob).setName(Invoice);
    tempFolder.removeFile(tempFile);
}
