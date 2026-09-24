import http from 'node:http';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const PORTA = 3000;

// BANCO DE DADOS
const db = await open({
    filename: './banco.db',
    driver: sqlite3.Database
});


// Cria a tabela caso ela ainda não exista
await db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
    );
`);


// Alguns usuários para conseguirmos testar
await db.exec(`
    INSERT OR IGNORE INTO usuarios (id, nome, email)
    VALUES
        (1, 'Ana', 'ana@email.com'),
        (2, 'Carlos', 'carlos@email.com'),
        (3, 'Pedro', 'pedro@email.com'),
        (4, 'Mariana', 'mariana@email.com'),
        (5, 'Lucas', 'lucas@email.com');
`);

// EXERCÍCIO 3 - PRODUTOS EM MEMÓRIA
const produtos = [
    {
        id: 1,
        nome: 'Notebook',
        preco: 3500
    },
    {
        id: 2,
        nome: 'Mouse',
        preco: 120
    },
    {
        id: 3,
        nome: 'Teclado',
        preco: 250
    }
];


// EXERCÍCIO 4 - CONTADOR
// precisa ficar fora do createServer

let contador = 0;

// FUNÇÃO AUXILIAR PARA ENVIAR JSON

function enviarJson(res, statusCode, dados) {

    res.statusCode = statusCode;

    res.setHeader(
        'Content-Type',
        'application/json; charset=utf-8'
    );

    res.end(JSON.stringify(dados));
}

// SERVIDOR

const servidor = http.createServer(async (req, res) => {

    try {

        // Pega apenas o caminho da URL.
        //
        // Exemplo:
        // http://localhost:3000/usuario/5?teste=1
        //
        // pathname será:
        // /usuario/5

        const url = new URL(
            req.url,
            `http://${req.headers.host}`
        );

        const pathname = url.pathname;

        // EXERCÍCIO 1
        // /usuario/ID

        if (pathname.startsWith('/usuario/')) {

            const partes = pathname.split('/');

            // /usuario/5
            //
            // partes:
            // ["", "usuario", "5"]

            const idTexto = partes[2];

            const id = Number(idTexto);


            if (!Number.isInteger(id) || id <= 0) {

                return enviarJson(res, 400, {
                    erro: 'ID inválido'
                });
            }


            return enviarJson(res, 200, {
                id: id,
                nome: `Usuário ${id}`
            });
        }


        // EXERCÍCIO 2
        // GET /teste

        if (pathname === '/teste') {

            if (req.method === 'GET') {

                return enviarJson(res, 200, {
                    mensagem: 'Rota /teste acessada com GET'
                });

            }


            res.setHeader('Allow', 'GET');

            return enviarJson(res, 405, {
                erro: `Método ${req.method} não permitido`
            });
        }



        // EXERCÍCIO 3
        // GET /api/produtos

        if (pathname === '/api/produtos') {

            return enviarJson(res, 200, produtos);
        }


        // EXERCÍCIO 3 - EXTENSÃO
        // GET /api/produtos/ID

        if (pathname.startsWith('/api/produtos/')) {

            const partes = pathname.split('/');

            // /api/produtos/2
            //
            // ["", "api", "produtos", "2"]

            const id = Number(partes[3]);


            if (!Number.isInteger(id) || id <= 0) {

                return enviarJson(res, 400, {
                    erro: 'ID inválido'
                });
            }


            const produto = produtos.find(
                produto => produto.id === id
            );


            if (!produto) {

                return enviarJson(res, 404, {
                    erro: 'Produto não encontrado'
                });
            }


            return enviarJson(res, 200, produto);
        }


        // EXERCÍCIO 4
        // GET /contador

        if (pathname === '/contador') {

            contador++;

            return enviarJson(res, 200, {
                acessos: contador
            });
        }



        // EXERCÍCIO 5
        // GET /usuarios/ID
        // BUSCA USUÁRIO NO SQLITE

        if (pathname.startsWith('/usuarios/')) {

            const partes = pathname.split('/');

            const id = Number(partes[2]);


            if (!Number.isInteger(id) || id <= 0) {

                return enviarJson(res, 400, {
                    erro: 'ID inválido'
                });
            }


            try {

                const usuario = await db.get(
                    'SELECT * FROM usuarios WHERE id = ?',
                    id
                );


                if (!usuario) {

                    return enviarJson(res, 404, {
                        erro: 'Usuário não encontrado'
                    });
                }


                return enviarJson(res, 200, usuario);


            } catch (erro) {

                console.error(erro);

                return enviarJson(res, 500, {
                    erro: 'Erro ao buscar usuário'
                });

            }
        }


        // EXERCÍCIO 6
        // GET /usuarios
        // LISTA TODOS OS USUÁRIOS

        if (pathname === '/usuarios') {

            try {

                const usuarios = await db.all(
                    'SELECT * FROM usuarios'
                );


                return enviarJson(res, 200, usuarios);


            } catch (erro) {

                console.error(erro);

                return enviarJson(res, 500, {
                    erro: 'Erro ao buscar usuários'
                });

            }
        }



        // ==================================================
        // ROTA NÃO ENCONTRADA
        // ==================================================

        return enviarJson(res, 404, {
            erro: 'Rota não encontrada'
        });


    } catch (erro) {

        console.error(erro);

        return enviarJson(res, 500, {
            erro: 'Erro interno do servidor'
        });

    }

});


// ======================================================
// INICIAR SERVIDOR
// ======================================================

servidor.listen(PORTA, () => {

    console.log(
        `Servidor rodando em http://localhost:${PORTA}`
    );

});