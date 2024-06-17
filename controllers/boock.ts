import { pool } from "../shared/database";
import { Request, Response, Router } from "express";

export async function listBoock(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  //realiza consulta sql
  try {
    const boocks = await client.query(`select * from boocks`)
    //retorna consulta em formato json
    return res.status(200).json(boocks.rows);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error });
  } finally {
    client.release;
  }
}
export async function saveBoock(req: Request, res: Response) {
  const boocks = req.body;
  //verifica o erro
  console.log(boocks)
  //conecta com o banco
  const client = await pool.connect();
  try {
    //realiza consulta sql
    const response = await client.query(`INSERT INTO boocks (titulo) VALUES ('${boocks.titulo}')`)
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
  res.status(200).json({message: "Registro Excluido"});
}catch (error){ 
res.status(400).json({message: "Erro na Exclusão", error});
}finally{ 
  client.release()
}
}

