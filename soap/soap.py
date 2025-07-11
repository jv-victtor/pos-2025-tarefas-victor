import requests
from xml.dom.minidom import parseString

url = "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso"


headers = {
    "Content-Type": "text/xml; charset=utf-8",
    "SOAPAction": ""
}

def menu():
    print("Escolha uma das opções:")
    print("1 - Ver moeda de um país")
    print("2 - Ver capital de um país")
    print("3 - Ver bandeira de um país")

def get_input_country_code():
    return input("Digite o código ISO do país (ex: BR, US, FR): ").upper()

def get_currency(country_code):
    soap_body = f"""<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <CountryCurrency xmlns="http://www.oorsprong.org/websamples.countryinfo">
          <sCountryISOCode>{country_code}</sCountryISOCode>
        </CountryCurrency>
      </soap:Body>
    </soap:Envelope>"""

    headers["SOAPAction"] = "http://www.oorsprong.org/websamples.countryinfo/CountryCurrency"
    response = requests.post(url, data=soap_body, headers=headers)
    dom = parseString(response.text)
    currency = dom.getElementsByTagName("m:sName")[0].firstChild.nodeValue
    print(f"Moeda de {country_code}: {currency}")

def get_capital(country_code):
    soap_body = f"""<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <CapitalCity xmlns="http://www.oorsprong.org/websamples.countryinfo">
          <sCountryISOCode>{country_code}</sCountryISOCode>
        </CapitalCity>
      </soap:Body>
    </soap:Envelope>"""

    headers["SOAPAction"] = "http://www.oorsprong.org/websamples.countryinfo/CapitalCity"
    response = requests.post(url, data=soap_body, headers=headers)
    dom = parseString(response.text)
    capital = dom.getElementsByTagName("m:CapitalCityResult")[0].firstChild.nodeValue
    print(f"Capital de {country_code}: {capital}")

def get_flag(country_code):
    soap_body = f"""<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <CountryFlag xmlns="http://www.oorsprong.org/websamples.countryinfo">
          <sCountryISOCode>{country_code}</sCountryISOCode>
        </CountryFlag>
      </soap:Body>
    </soap:Envelope>"""

    headers["SOAPAction"] = "http://www.oorsprong.org/websamples.countryinfo/CountryFlag"
    response = requests.post(url, data=soap_body, headers=headers)
    dom = parseString(response.text)
    flag_url = dom.getElementsByTagName("m:CountryFlagResult")[0].firstChild.nodeValue
    print(f"Bandeira de {country_code}: {flag_url}")


if __name__ == "__main__":
    menu()
    opcao = input("Digite o número da opção desejada: ")

    if opcao in ['1', '2', '3']:
        codigo = get_input_country_code()

        if opcao == '1':
            get_currency(codigo)
        elif opcao == '2':
            get_capital(codigo)
        elif opcao == '3':
            get_flag(codigo)
    else:
        print("Opção inválida.")
