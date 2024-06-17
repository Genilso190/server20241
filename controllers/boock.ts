import { pool } from "../shared/database";
import { Request, Response, Router } from "express";

export async function listBoock(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  //realiza consulta sql
  try {
    const boocks = await client.query(`select * from livros`)
    //retorna consulta em formato json
    return res.status(200).json(boocks.rows);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error });
  } finally {
    client.release;
  }
}
export async function saveBoock(req: Request, res: Response) {
  const boock = req.body;
  //verifica o erro
  console.log(boock)
  //conecta com o banco
  const client = await pool.connect();
  try {
    //realiza consulta sql
    const response = await client.query(`INSERT INTO livros (name) VALUES ('${boock.name}')`)
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error });
  } finally {
    client.release();
  }
}

export async function deleteBoock(req: Request, res: Response){
  const client = await pool.connect();
  const id = req.params.id
 try{ 
  const response = await client.query(`delete from boocks where id=${id}`);
  res.status(200).json({message: "Registro Excliido"});
}catch (error){ 
res.status(400).json({message: "Erro na Exclusão", error});
}finally{ 
  client.release()
}
}

