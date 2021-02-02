# Scrap de Produtos

RF
- Recebe uma URL de produto como entrada e devolver um JSON como saída

- Os dados dos produtos são persistidos em um banco de dados

- Se uma URL for enviada mais de uma vez e o tempo for inferior a 1h, a resposta deve vir do banco de dados, caso contrário, os dados devem ser coletados novamente

RNF
- Utiliza Nodejs
- Utiliza ReactJs
- Utiliza Cheerio

## Installation

```bash
docker run --name scrap_postgres -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres
docker exec -it scrap_postgres /bin/bash
createdb -U postgres scrap
#user: docker password: docker
createuser -U postgres -P -s -e docker
exit
cd backend 
npm install yarn
yarn install
yarn typeorm migration:run
yarn dev:serve -d 
cd ../frontend/
yarn dev

acesso: localhost:8080
```

