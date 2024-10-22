import requests, re, pytesseract
import fitz

def extract_text_from_pdf(pdf_path: str) -> str:
    doc = fitz.open(pdf_path)
    text = ""
    
    for page in doc:
        text += page.get_text()
        
        if not text.strip():
            img_list = page.get_images(full=True)
            for _, img in enumerate(img_list):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                
                text += pytesseract.image_to_string(image_bytes)
    
    doc.close()
    return text

def extract_fvc_fev1(text: str) -> dict:
    # Regex pattern to capture FVC and FEV1 values
    fvc_pattern = re.compile(r'FVC\s?\[L\]\s(\d+\.\d+)')
    fev1_pattern = re.compile(r'FEV1\s?\[L\]\s(\d+\.\d+)')
    
    # Find all matches for FVC and FEV1
    fvc_values = [float(match) for match in fvc_pattern.findall(text)]
    fev1_values = [float(match) for match in fev1_pattern.findall(text)]
    
    # Get the maximum values for FVC and FEV1
    max_fvc = max(fvc_values) if fvc_values else None
    max_fev1 = max(fev1_values) if fev1_values else None
    
    return {
        "fvc": max_fvc,
        "fev1": max_fev1
    }

text = extract_text_from_pdf('ds/sampleSpirometry1.pdf')
result = extract_fvc_fev1(text)
print(result)