using lucid as database

configuring with database

depois de definida a estrutura do código nas reuniões de empresa
ex: um ecommerce
seria definido q a aplicação terá um user, products, categories, ect..
será trago para o mvc da aplicação

aqui entra os modules
os modules seriam como pages/components no front end

no meu caso estou crio um model Moment
o usuario vai cadastrar um momento da vida dele, 
onde ele registrar fotos, descrições, um titulo
outros users irão poder comentar

depois de criados os models preciso refletir isso no database
ai entra as migrations
insiro no folder migrations no file de moments o q quero jogar no db
depois dou o comando para migrar

aqui entra o crud

agora crio os controlles
pra add image install o uuid pra gerar strings aleatórias de get

crio os metodo de apiOnly listados em node ace:list
(show, index store, destroy, update)
