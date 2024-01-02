import os
from docx import Document
from bs4 import BeautifulSoup as bs
import re

def remove_multiple_newlines(input_string):
    result_string = re.sub(r'\n+', '\n', input_string)
    return result_string

def read_docx(docx_path):
    doc = Document(docx_path)
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    text = remove_multiple_newlines(text)
    return text
##errors might happend with doc files, might be better to change to docx
def read_doc(doc_path):
    soup = bs(open(doc_path, encoding="ISO-8859-1").read())
    [s.extract() for s in soup(['style', 'script'])]
    tmpText = soup.get_text()
    tmpText = remove_multiple_newlines(tmpText)
    text = "\n".join(" ".join(tmpText.split('\t')).split('\n')).strip()
    return text

docx_file_path = "test.docx"
doc_file_path = "oldone.doc"

docx_text = read_docx(docx_file_path)
doc_text = read_doc(doc_file_path)

print("Text from converted DOCX file:")
print(docx_text)

print("Text from converted DOC file:")
print(doc_text)

