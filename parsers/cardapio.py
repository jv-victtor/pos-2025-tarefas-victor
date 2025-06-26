import os
from xml.dom import minidom


caminho_arquivo = os.path.join(os.path.dirname(__file__), 'cardapio.xml')


doc = minidom.parse(caminho_arquivo)


pratos = doc.getElementsByTagName("item")

print("=== MENU DE PRATOS ===")
for i, prato in enumerate(pratos):
    nome = prato.getElementsByTagName("nome")[0].firstChild.nodeValue
    print(f"{i + 1} - {nome}")


escolha = input("\nDigite o número do prato para ver mais detalhes: ")

try:
    index = int(escolha) - 1
    if 0 <= index < len(pratos):
        prato = pratos[index]
        nome = prato.getElementsByTagName("nome")[0].firstChild.nodeValue
        descricao = prato.getElementsByTagName("descricao")[0].firstChild.nodeValue
        ingredientes = prato.getElementsByTagName("ingredientes")[0].firstChild.nodeValue
        preco_element = prato.getElementsByTagName("preco")[0]
        preco = preco_element.firstChild.nodeValue
        moeda = preco_element.getAttribute("moeda") or "BRL"
        calorias = prato.getElementsByTagName("calorias")[0].firstChild.nodeValue
        tempo = prato.getElementsByTagName("tempo_preparo")[0].firstChild.nodeValue

        print(f"\n--- Detalhes do prato ---")
        print(f"Nome: {nome}")
        print(f"Descrição: {descricao}")
        print("Ingredientes:")
        for i, ing in enumerate(ingredientes.split(',')):
            print(f"  {i + 1} - {ing.strip()}")
        print(f"Preço: {'R$' if moeda == 'BRL' else 'USD'} {preco}")
        print(f"Tempo de preparo: {tempo} min")
        print(f"Calorias: {calorias} kcal")
    else:
        print("Número inválido.")
except ValueError:
    print("Entrada inválida. Digite um número.")
