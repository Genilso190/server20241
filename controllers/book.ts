import { pool } from "../shared/database";
import { Request, Response, Router } from "express";

export async function listBook(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  //realiza consulta sql
  try {
    const books = await client.query(`select * from books`)
    //retorna consulta em formato json
    return res.status(200).json(books.rows);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error });
  } finally {
    client.release;
  }
}
export async function saveBook(req: Request, res: Response) {
  const book = req.body;
  //verifica o erro
  console.log(book)
  //conecta com o banco
  const client = await pool.connect();
  try {
    //realiza consulta sql
    const response = await client.query(`INSERT INTO books (title, description) VALUES ('${book.title}','${book.description}')`)
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error });
  } finally {
    client.release();
  }
}

export async function deleteBook(req: Request, res: Response){
  const client = await pool.connect();
  const id = req.params.id
 try{ 
  const response = await client.query(`delete from books where id=${id}`);
  res.status(200).json({message: "Registro Excluido"});
}catch (error){ 
res.status(400).json({message: "Erro na Exclusão", error});
}finally{ 
  client.release()
}
}

