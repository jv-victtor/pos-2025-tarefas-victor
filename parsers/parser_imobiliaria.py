import json

with open("C:/Users/20221181110003/Documents/tarefas/pos-2025-tarefas/parsers/imobiliaria.json", encoding="utf-8") as f:
    dados = json.load(f)

imoveis = dados["imoveis"]
mapa_imoveis = {}

print("\n=== LISTA DE IMÓVEIS ===")
for idx, imovel in enumerate(imoveis, start=1):
    print(f"{idx} - {imovel['descricao']}")
    mapa_imoveis[str(idx)] = imovel

escolha = input("\nDigite o ID do imóvel para ver mais detalhes: ")

if escolha in mapa_imoveis:
    imovel = mapa_imoveis[escolha]
    print("\n=== DETALHES DO IMÓVEL ===")
    print(f"Descrição: {imovel['descricao']}")
    print(f"Endereço: {imovel['endereco']}")
    print(f"Características: {imovel['caracteristicas']}")
    print(f"Valor: R$ {imovel['valor']}")
    print("\nProprietário:")
    print(f"  Nome: {imovel['proprietario']['nome']}")

    emails = imovel["proprietario"].get("emails", [])
    telefones = imovel["proprietario"].get("telefones", [])

    if emails:
        print("  Emails:")
        for email in emails:
            print(f"   - {email}")
    else:
        print("  Emails: Nenhum informado")

    if telefones:
        print("  Telefones:")
        for tel in telefones:
            print(f"   - {tel}")
    else:
        print("  Telefones: Nenhum informado")
else:
    print("ID inválido. Tente novamente.")