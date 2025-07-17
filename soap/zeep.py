from zeep import Client

WSDL_URL = 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL'
client = Client(wsdl=WSDL_URL)

def main():
    while True:
        entrada = input("Digite um número ou 'sair' para encerrar: ").strip()
        if entrada.lower() in ('Sair'):
            print("Saindo.")
            break

        if not entrada.isdigit():
            print("Valor inválido, digite apenas dígitos.")
            continue

        num = int(entrada)
        resultado = client.service.NumberToWords(ubiNum=num)
        print(f"{num} por extenso {resultado.strip()}")

if __name__ == "__main__":
    main()