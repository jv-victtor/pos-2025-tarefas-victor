import os
import json
from xml.dom import minidom


caminho_arquivo = os.path.join(os.path.dirname(__file__), 'imobiliaria.xml')


doc = minidom.parse(caminho_arquivo)


def first_text(node, tag):
    elems = node.getElementsByTagName(tag)
    if elems and elems[0].firstChild:
        return elems[0].firstChild.nodeValue.strip()
    return None


imoveis_nodes = doc.getElementsByTagName('imovel')
imoveis = []
for im in imoveis_nodes:
    descricao = first_text(im, 'descricao')

    prop_node = im.getElementsByTagName('proprietario')[0]
    nome = first_text(prop_node, 'nome')
    telefones = [t.firstChild.nodeValue.strip() for t in prop_node.getElementsByTagName('telefone') if t.firstChild]
    emails = [e.firstChild.nodeValue.strip() for e in prop_node.getElementsByTagName('email') if e.firstChild]

    endereco_node = im.getElementsByTagName('endereco')[0]
    endereco = {
        'rua': first_text(endereco_node, 'rua'),
        'bairro': first_text(endereco_node, 'bairro'),
        'cidade': first_text(endereco_node, 'cidade'),
        'numero': first_text(endereco_node, 'numero')
    }

    car_node = im.getElementsByTagName('caracteristicas')[0]
    caracteristicas = {
        'tamanho': first_text(car_node, 'tamanho'),
        'numQuartos': first_text(car_node, 'numQuartos'),
        'numBanheiros': first_text(car_node, 'numBanheiros')
    }

    valor_text = first_text(im, 'valor')
    try:
        valor = int(valor_text)
    except Exception:
        valor = valor_text

    imoveis.append({
        'descricao': descricao,
        'proprietario': {
            'nome': nome,
            'telefones': telefones,
            'emails': emails
        },
        'endereco': endereco,
        'caracteristicas': caracteristicas,
        'valor': valor
    })


saida = {'imoveis': imoveis}

saida_arquivo = os.path.join(os.path.dirname(__file__), 'imobiliaria.json')
with open(saida_arquivo, 'w', encoding='utf-8') as f:
    json.dump(saida, f, ensure_ascii=False, indent=2)

print(f"Arquivo JSON gerado em: {saida_arquivo}")
