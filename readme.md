# UAIpy Device

Este repositório contém o código-fonte para gerenciar e comunicar-se com dispositivos IoT usando o dispositivo UAIpy. Ele é projetado para facilitar a integração de dispositivos IoT com um servidor local, permitindo a coleta e monitoramento de dados em tempo real.

## Funcionalidades

- **Comunicação via MQTT**: Suporte para enviar e receber dados entre dispositivos IoT e o servidor usando o protocolo MQTT.
- **Gerenciamento de Dispositivos**: Ferramentas para adicionar, remover e gerenciar dispositivos conectados.
- **Compatibilidade com ESP8266**: Suporte integrado para dispositivos ESP8266 para receber dados de sensores.
- **Interface de Configuração**: Simples configuração dos dispositivos IoT por meio de arquivos JSON.

## Instalação

1. Clone este repositório:

    ```bash
    git clone https://github.com/uaipy/uaipy-device.git
    cd uaipy-device
    ```

2. Instale as dependências necessárias:

    ```bash
    pip install -r requirements.txt
    ```

3. Configure os dispositivos no arquivo `config.json`.

## Uso

1. Inicie o servidor local:

    ```bash
    python server.py
    ```

2. Conecte seu dispositivo IoT ao servidor.

3. Monitore os dados recebidos no servidor.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um *issue* ou enviar um *pull request*.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---

Sinta-se à vontade para ajustar conforme necessário!
